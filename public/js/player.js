class Player {
  constructor() {
    this.id = selfSocketId;
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
    this.shootingRange = 500;
    // emit if playing is playing
    localPlayerData = this;

    socket.emit("update", localPlayerData);
  }

  emitFirstConnect() {
    socket.emit("firstConnect", this);
  }

  move() {
    let gridRadius = canvasMarginX;
    let endColor = "#e35656";

    if (this.alive) {
      if (keyIsDown(37) || keyIsDown(65)) {
        socket.emit("update", localPlayerData);

        //LEFT
        if (this.x >= -gridRadius) {
          this.x -= this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(38) || keyIsDown(87)) {
        socket.emit("update", localPlayerData);

        //UP
        if (this.y >= -gridRadius) {
          this.y -= this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(39) || keyIsDown(68)) {
        socket.emit("update", localPlayerData);

        if (this.x <= gridRadius) {
          //RIGHT
          this.x += this.speed;
          backgroundColor = "#cbd4d0";
        } else {
          backgroundColor = endColor;
        }
      }
      if (keyIsDown(40) || keyIsDown(83)) {
        socket.emit("update", localPlayerData);

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

      socket.emit("mouseVector", { player: this, vector: mouseVector });
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
    }, 3000);
  }

  emitToServer() {
    localPlayerData = this;
  }
}
