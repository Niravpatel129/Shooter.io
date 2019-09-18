var socket = io();

var player;
var sprite;
var spritesheet;
var speed = 5;
var serverPlayers;
// inital

let bulletsFired = [];
let targetBalloons = [];
let mainTurrent;
let turPosX = 300;
let turPosY = 300;
let targetTimer = 0;
let balloonSpawnMultiplier = 2;
let balloonSizeMultiplier = 2;
let score = 0;
let Retry;

//
localPlayer.x = 0;
localPlayer.y = 0;

localPlayer.xstart = 0;
localPlayer.ystart = 0;
localPlayer.skinHeight = 100;
localPlayer.skinWidth = 100;

bullets = [];

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
  // translate(-localPlayer.x, -localPlayer.y);

  //check for keyboard+mouse input
  checkIfMouseDown();

  //draw temp terrain and background
  background(200);
  fill(1000);
  circle(30, 30, 200);

  //draw bullets
  for (var i = 0; i < bulletsFired.length; i++) {
    bulletsFired[i].display();
    bulletsFired[i].update();
    if (bulletsFired[i].outOfBounds()) {
      bulletsFired.splice(i, 1);
    }
  }

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
  let mouseVector = getDirectionTo(
    localPlayer.x,
    localPlayer.y,
    mouseX,
    mouseY
  );
  console.log(mouseVector);
  oneBullet = new bullet(mouseVector[0], mouseVector[1]);
  bulletsFired.push(oneBullet);
}

var checkIfMouseDown = () => {
  if (keyIsDown(37) || keyIsDown(65)) {
    localPlayer.x -= speed;
  }
  if (keyIsDown(38) || keyIsDown(87)) {
    localPlayer.y -= speed;
  }
  if (keyIsDown(39) || keyIsDown(68)) {
    localPlayer.x += speed;
  }
  if (keyIsDown(40) || keyIsDown(83)) {
    localPlayer.y += speed;
  }
};

socket.on("playerData", data => {
  serverPlayers = data;
  console.log(serverPlayers);
});
