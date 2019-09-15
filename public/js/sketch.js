var player;

var socket = io();

socket.on("connect", () => {
  console.log("connection was sucessful");
});

// draw function
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(51);
}
