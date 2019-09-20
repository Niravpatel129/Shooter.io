const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { Users } = require("./utils/users");
let users = new Users();

const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static("public"));

io.on("connection", function(socket) {
  socket.emit("assignSelfID", socket.id);
  socket.on("firstConnect", data => {
    users.addUser(socket.id, data.x, data.y, data.bullets, data.alive);
  });

  // this is the only function that called on a loop // to transmite the data, i could lower
  // server load by making this a interval instead of a 60tick transmision
  socket.on("update", data => {
    // [] in the future refacor this function
    users.updateUserCords(socket.id, data.x, data.y, data.bullets, data.alive);

    // [] in the future need to refactor this to send data of global objects
    // [] which get genearted when the server is initalized
    io.emit("serverUsers", users); // the details of all connected users to everyone
  });

  socket.on("playerDead", data => {
    console.log("test");
    users.playerDead(data);
    console.log(`user died`);
    socket.broadcast.emit("playerDead", socket.id);
  });

  socket.on("playerBackAlive", data => {
    users.playerAlive(socket.id);
    socket.emit("playerBackAlive", socket.id);
  });

  socket.on("disconnect", function() {
    console.log("user left :(");
    users.removeUser(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
