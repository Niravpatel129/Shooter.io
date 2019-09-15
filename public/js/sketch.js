var socket = io();

var player;
var sprite;
var spritesheet;
var speed = 5;
var serverPlayers;
// inital
localPlayer.x = 0;
localPlayer.y = 0;

localPlayer.xstart = 0;
localPlayer.ystart = 0;
localPlayer.skinHeight = 100;
localPlayer.skinWidth = 100;

socket.on("connect", () => {
  console.log("connection was sucessful");
});

// draw function
function setup() {
  createCanvas(displayWidth, displayHeight);

  //load spritesheet
  // spritesheet = loadImage("./assets/spritesheet.png");

  // make a new player object from player.js
  // set the data to it, possiblity hold the data locally?
}

function draw() {
  //translate the scene with player movement keeping it centered
  translate(width / 2 - localPlayer.x, height / 2.5 - localPlayer.y);

  //check for keyboard+mouse input
  checkIfMouseDown();

  //draw temp terrain and background
  background(200);
  fill(1000);
  circle(30, 30, 200);

  // draw client player
  stroke(127, 63, 120);
  fill(100, 40, 192, 127);
  rect(localPlayer.x, localPlayer.y, 90, 90);

  // if there is user on the server Draw them!
  if (serverPlayers) {
    fill(200, 120, 192, 127);
    rect(serverPlayers.x, serverPlayers.y, 90, 90);
  }

  //emit constntly the local player data
  socket.emit("playerData", localPlayer);
}

function mousePressed() {
  console.log("mouse pressed");
}

var checkIfMouseDown = () => {
  if (keyIsDown(37)) {
    localPlayer.x -= speed;
  }
  if (keyIsDown(38)) {
    localPlayer.y -= speed;
  }
  if (keyIsDown(39)) {
    localPlayer.x += speed;
  }
  if (keyIsDown(40)) {
    localPlayer.y += speed;
  }
};

socket.on("playerData", data => {
  serverPlayers = data;
  console.log(serverPlayers);
});
