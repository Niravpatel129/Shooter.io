const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { Users } = require("./utils/users");
var users = new Users();

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static("public"));

io.on("connection", function(socket) {
  socket.emit("assignSelfID", socket.id);
  socket.on("firstConnect", data => {
    users.addUser(socket.id, data.x, data.y, data.bullets);
  });
  socket.on("playerData", data => {
    socket.broadcast.emit("playerData", data);
  });

  socket.on("update", data => {
    users.updateUserCords(socket.id, data.x, data.y, data.bullets);
    io.emit("serverUsers", users);
  });

  socket.on("updateBullets", data => {
    // id, array
    users.addBullets(data.id, data.bullets);
  });

  socket.on("disconnect", function() {
    console.log("user left :(");
    users.removeUser(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
