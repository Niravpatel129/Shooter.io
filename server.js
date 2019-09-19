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
    users.addUser(socket.id, data.x, data.y, data.bullets, data.isPlayerAlive);
  });
  socket.on("playerData", data => {
    socket.broadcast.emit("playerData", data);
  });

  socket.on("update", data => {
    users.updateUserCords(socket.id, data.x, data.y, data.bullets);
    io.emit("serverUsers", users);
  });

  socket.on("playerDead", data => {
    socket.broadcast.emit("playerDead", socket.id);
  });

  socket.on("playerBackAlive", data => {
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
