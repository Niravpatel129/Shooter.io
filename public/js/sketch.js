var player;

var socket = io();

socket.on("connect", () => {
  console.log("connection was sucessful");
});

// draw function
function setup() {
  createCanvas(640, 480);
}

function draw() {}
