let socket = io();

let selfSocketId;
var arrayofShots = [];
let serverPlayers;
let onlinePlayers;
// inital

let bulletsFired = [];

//

let backgroundColor = "#cbd4d0";

let playerSize = 50;
let bulletRadius = 30;
//

bullets = [];

socket.on("connect", () => {
  console.log("connection was sucessful");
});

function setup() {
  createCanvas(displayWidth, displayHeight);

  player = new Player();
  onlinePlayers = new OnlinePlayer();
}

function draw() {
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
  rect(-800, -800, 1600, 1600);

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
