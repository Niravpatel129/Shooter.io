const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { Users } = require("./utils/users");
const { Blobs } = require("./utils/blobs");

let users = new Users();
let blobs = new Blobs();

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static("public"));

io.on("connection", function(socket) {
  socket.emit("assignSelfID", socket.id);
  blobs.generateBlobs();
  let blobsData = blobs.getBlobs();
  io.emit("getblobs", blobsData);
  socket.on("firstConnect", data => {
    users.addUser(
      socket.id,
      data.x,
      data.y,
      data.bullets,
      data.alive,
      data.name,
      0
    );
  });

  socket.on("update", data => {
    // [] in the future refacor this function
    users.updateUserCords(
      socket.id,
      data.x,
      data.y,
      data.bullets,
      data.alive,
      data.name
    );

    // [] in the future need to refactor this to send data of global objects
    // [] which get genearted when the server is initalized
    io.emit("serverUsers", users); // the details of all connected users to everyone
  });

  socket.on("playerDead", data => {
    users.playerDead(data);
    socket.broadcast.emit("playerDead", socket.id);
  });

  socket.on("playerBackAlive", data => {
    users.playerAlive(socket.id);
    socket.emit("playerBackAlive", socket.id);
  });

  socket.on("updatePoints", function(data) {
    let players = data.split(" ");
    let killer = players[0];
    let deadPlayer = players[1];
    users.updateScore(killer, deadPlayer);
  });

  socket.on("disconnect", function() {
    users.removeUser(socket.id);
    io.emit("getScore", users.getScore());
  });

  socket.on("getNameValid", function(data) {
    socket.emit("getNameValid", users.checkNameValid(data));
  });

  socket.on("getScore", function() {
    io.emit("getScore", users.getScore());
  });

  socket.on("showKillMessage", function(data) {
    io.emit("showKillMessage", data);
  });

  socket.on("collisoonWithPowerBlob", data => {
    blobs.remmoveBlob(data);
    io.emit("deleteBlob", data.id);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
