var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");

  socket.on("playerData", data => {
    socket.broadcast.emit("playerData", data);
  });
});

http.listen(port, function() {
  console.log("listening on *:", port);
});
