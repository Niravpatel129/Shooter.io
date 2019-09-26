class Player {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-600, 600);
    this.speed = 5;
    this.name = localPlayerName;
    this.bullets = bulletsFired;
    this.color = color(255, 204, 100);
    this.alive = true;
    this.name = localPlayerName;
    this.isPlayerAlive = true;
    this.playerR = playerSize;

    // emit if playing is playing
  }

  emitFirstConnect() {
    socket.emit("firstConnect", this);
  }

  move() {
    let gridRadius = canvasMarginX;
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
    if (this.alive && Playing) {
      shootSound.play();
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
    ellipse(this.x, this.y, this.playerR, this.playerR);

    //TEXT
    fill(255);
    textAlign(CENTER);
    text(this.name, this.x, this.y);

    if (!this.alive) {
      for (let i = 0; i < this.playerR; i++) {
        this.playerR -= 0.1;
      }
    }
  }

  gotHit() {
    deathSound.play();
    shootSound.stop();
    socket.emit("playerDead", selfSocketId);
    this.alive = false;
    this.color = color(1, 1, 1);
    this.playerName = "Dead :X";

    setTimeout(() => {
      socket.emit("playerBackAlive");
      this.color = color(255, 204, 100);
      this.bullets = [];
      this.playerName = localPlayerName;
      this.x = random(-600, 600);
      this.y = random(-600, 600);
      this.alive = true;
      this.playerR = playerSize;
    }, 5000);
  }

  emitToServer() {
    socket.emit("update", this);
  }
}
