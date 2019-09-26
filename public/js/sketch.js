let socket = io();
let Playing;
let selfSocketId;
let arrayofShots = [];
let serverPlayers;
let onlinePlayers;
// inital

let localPlayerData;

let localPlayerName;
let bulletsFired = [];
//
let mySound;
let backgroundColor = "#cbd4d0";

let serverBlobs = [];
let playerSize = 50;
let bulletRadius = 30;
let canvasMarginX = 1000;
let canvasMarginY = 1000;
//

//
let serverBulletsFired = [];
bullets = [];

socket.on("connect", () => {
  console.log("connection was sucessful");
});

function preload() {
  shootSound = loadSound("assets/shoot.wav");
  deathSound = loadSound("assets/clack.ogg");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  player = new Player();
  onlinePlayers = new OnlinePlayer();
  shootSound.setVolume(0.4);
  deathSound.setVolume(0.8);
}

function draw() {
  if (Playing === true) {
    //translate the scene with player movement keeping it centered
    translate(width / 2 - player.x, height / 2 - player.y);
    ellipseMode(RADIUS);
    //check for keyboard+mouse input
    //draw temp terrain and background
    background(backgroundColor);

    fill("#f5f5f5"); // Set fill to white
    //
    strokeWeight(4);
    stroke(51);
    rect(-canvasMarginX, -canvasMarginX, canvasMarginX * 2, canvasMarginX * 2);

    //draw powerUpBlobs
    for (let i = 0; i < serverBlobs.length; i++) {
      serverBlobs[i].draw();
      serverBlobs[i].checkCollision();
    }

    //draw bullets
    for (let i = 0; i < bulletsFired.length; i++) {
      bulletsFired[i].display();
      bulletsFired[i].update();
      if (bulletsFired[i].outOfBounds()) {
        bulletsFired.splice(i, 1);
      }
    }

    // draw client player
    player.draw();
    player.move();
    player.emitToServer();

    // draw server player
    onlinePlayers.draw();

    // draw server bullets
    for (let l = 0; l < serverBulletsFired.length; l++) {
      serverBulletsFired[l].display();
      serverBulletsFired[l].update();
      serverBulletsFired[l].checkCollison();

      if (serverBulletsFired[l].outOfBounds()) {
        serverBulletsFired.splice(l, 1);
      }
    }
  }
}

function mousePressed() {
  player.shoot();
}

let checkIfKeyDown = () => {
  player.move();
};

socket.on("serverUsers", data => {
  let listOfClients = data;
  for (let i = 0; i < listOfClients.users.length; i++) {
    if (data.users[i].id === selfSocketId) {
      listOfClients.users.splice(i, 1);
    }
  }
  serverPlayers = listOfClients.users;
});

socket.on("assignSelfID", data => {
  selfSocketId = data;
});

socket.on("playerDead", data => {});

socket.on("playerAlive", data => {});

socket.on("showKillMessage", data => {
  showKillMessage(data);
});

socket.on("getblobs", data => {
  serverBlobs = [];
  for (let i = 0; i < data.length; i++) {
    serverBlobs.push(
      new powerUpBlob(
        data[i].id,
        data[i].x,
        data[i].y,
        data[i].r,
        data[i].c2,
        data[i].r,
        data[i].c3
      )
    );
  }
});

socket.on("deleteBlob", id => {
  console.log(id);
  serverBlobs.splice(id - 1, 1);
});

socket.on("shootingData", data => {
  if (data.player.id != selfSocketId) {
    let newBullet = new bullet(
      data.player.x,
      data.player.y,
      data.vector[0],
      data.vector[1],
      data.player.name,
      data.player.id,
      data.player.shootingRange
    );
    serverBulletsFired.push(newBullet);
  }
});
