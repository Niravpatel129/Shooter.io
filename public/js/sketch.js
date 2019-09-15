var socket = io();

var player;
var sprite;
var spritesheet;

// inital
localPlayer.x = 0;
localPlayer.y = 0;

localPlayer.xstart = 0;
localPlayer.ystart = 0;
localPlayer.skinHeight = 120;
localPlayer.skinWidth = 120;

socket.on("connect", () => {
  console.log("connection was sucessful");
});

// draw function
function setup() {
  createCanvas(displayWidth, displayHeight);

  //load spritesheet
  spritesheet = loadImage("./assets/spritesheet.png");

  // make a new player object from player.js
  // set the data to it, possiblity hold the data locally?
}

function draw() {
  background(200);
  // draw client player
  image(
    spritesheet,
    localPlayer.x,
    localPlayer.y,
    (sWidth = 120),
    (sHeight = 120),
    0,
    0,
    100,
    100
  );

  // draw server player

  // draw server + client objects

  // interactions --- should be tough :(
}

function mousePressed() {
  console.log("mouse pressed");
  localPlayer.x += 10;
}
