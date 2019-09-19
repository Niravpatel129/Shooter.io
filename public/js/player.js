class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    this.bullets = bulletsFired;
    this.color = color(255, 204, 100);
    this.alive = true;
    socket.emit("firstConnect", this);
    this.playerName = "You";
    this.isPlayerAlive = true;
  }

  move() {
    let gridRadius = 800;
    let endColor = "#e35656";

    if (this.alive) {
      if (keyIsDown(37) || keyIsDown(65)) {
        //LEFT
        if (this.x >= -gridRadius) {
          this.x -= this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(38) || keyIsDown(87)) {
        //UP
        if (this.y >= -gridRadius) {
          this.y -= this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(39) || keyIsDown(68)) {
        if (this.x <= gridRadius) {
          //RIGHT
          this.x += this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(40) || keyIsDown(83)) {
        //DOWN
        if (this.y <= gridRadius) {
          this.y += this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
    }
  }

  shoot() {
    if (this.alive) {
      let mouseVector = getDirectionTo(mouseX, mouseY, width, height);
      let oneBullet = new bullet(
        this.x,
        this.y,
        mouseVector[0],
        mouseVector[1]
      );
      bulletsFired.push(oneBullet);
    }
  }

  draw() {
    this.bullets = bulletsFired;
    stroke(127, 63, 120);
    fill(this.color);
    ellipse(this.x, this.y, playerSize, playerSize);

    //TEXT
    fill(255);
    textAlign(CENTER);
    text(this.playerName, this.x, this.y);
  }

  checkCollision() {
    if (this.alive) {
      let localVector = createVector(this.x, this.y);
      if (serverPlayers) {
        for (let j = 0; j < serverPlayers.length; j++) {
          if (serverPlayers[j].bullets.length > 0) {
            for (let m = 0; m < serverPlayers[j].bullets.length; m++) {
              let d = p5.Vector.dist(
                localVector,
                createVector(
                  serverPlayers[j].bullets[m].x,
                  serverPlayers[j].bullets[m].y
                )
              );
              if (d < playerSize + 30) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      }
    }
  }

  gotHit() {
    socket.emit("playerDead", selfSocketId);
    this.alive = false;
    this.color = color(1, 1, 1);
    this.playerName = "Dead :X";
    setTimeout(() => {
      socket.emit("playerBackAlive");
      this.color = color(255, 204, 100);
      this.bullets = [];
      this.x = 0;
      this.playerName = "You";
      this.y = 0;
      this.alive = true;
    }, 5000);
  }

  emitToServer() {
    socket.emit("update", this);
  }
}
