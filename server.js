const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
var connections = [];
const { Users } = require("./utils/users");
var users = new Users();

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static("public"));

io.on("connection", function(socket) {
  console.log("a user connected");
  // users.addUser(socket.id, params.name, params.room);
  // console.log(users);
  socket.on("playerData", data => {
    socket.broadcast.emit("playerData", data);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
