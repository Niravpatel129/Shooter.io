var socket = io();

var selfSocketId;

var serverPlayers;
// inital

let bulletsFired = [];
let targetBalloons = [];

//

bullets = [];

socket.on("connect", () => {
  console.log("connection was sucessful");
});

// draw function
function setup() {
  createCanvas(displayWidth, displayHeight);

  player = new Player();
}

function draw() {
  //translate the scene with player movement keeping it centered
  translate(width / 2 - player.x, height / 2 - player.y);

  //check for keyboard+mouse input

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
  player.draw();
  player.move();
  player.emitToServer();

  // draw server player
  if (serverPlayers) {
    for (let j = 0; j < serverPlayers.length; j++) {
      fill(200, 120, 192, 127);
      rect(serverPlayers[j].x, serverPlayers[j].y, 90, 90);
    }
  }
}

function mousePressed() {
  player.shoot();
}

var checkIfKeyDown = () => {
  player.move();
};

socket.on("playerData", data => {
  serverPlayers = data;
});

socket.on("serverUsers", data => {
  var listOfClients = data;
  for (var i = 0; i < listOfClients.users.length; i++) {
    if (data.users[i].id === selfSocketId) {
      listOfClients.users.splice(i, 1);
    }
  }
  serverPlayers = listOfClients.users;
});

socket.on("assignSelfID", data => {
  selfSocketId = data;
});
