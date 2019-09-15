const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
var connections = [];
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("playerData", data => {
    socket.broadcast.emit("playerData", data);
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
