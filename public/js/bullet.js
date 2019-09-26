function getDirectionTo(mouseX, mouseY, width, height) {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let resultingX = mx;
  let resultingY = my;
  let magnitude = Math.sqrt(Math.pow(resultingX, 2) + Math.pow(resultingY, 2));
  return [resultingX / magnitude, resultingY / magnitude];
}

class bullet {
  constructor(x, y, xSpd, ySpd, bulletShooter, socketid, range) {
    this.startingX = x;
    this.startingY = y;

    this.range = range;
    this.bulletshotBy = bulletShooter;
    this.socketid = socketid;

    this.x = x;
    this.y = y;

    this.xSpd = 12 * xSpd;
    this.ySpd = 12 * ySpd;

    this.color = color(120, 210, 30);

    this.bulletRadius = bulletRadius;
  }

  display() {
    push();
    stroke(55, 255, 0);
    fill(this.color);
    ellipse(this.x, this.y, this.bulletRadius);
    pop();
  }

  update() {
    if (this.xSpd <= 1) {
    }
    this.x += this.xSpd;
    this.y += this.ySpd;
    this.xSpd *= 0.994;
    this.ySpd *= 0.994;
  }

  checkCollison() {
    if (player.alive) {
      let serverBulletVector = createVector(this.x, this.y);
      let localVector = createVector(player.x, player.y);
      let d = p5.Vector.dist(localVector, serverBulletVector);

      if (d <= player.playerR + this.bulletRadius) {
        console.log("hit");
        this.bulletRadius = 0;
        this.x = -9999;
        this.y = -9999;

        player.gotHit();
        socket.emit("showKillMessage", {
          shooterName: `${this.bulletshotBy}`,
          deadPlayerName: `${player.name}`,
          shooterSocketID: `${this.socketid}`,
          deadPlayerSocketID: `${selfSocketId}`
        });
      }
    }
  }

  outOfBounds() {
    let gridRadius = canvasMarginX;
    let xdis = this.startingX - this.x;
    let ydis = this.startingY - this.y;

    if (
      this.x <= -gridRadius ||
      this.x >= gridRadius ||
      this.y <= -gridRadius ||
      this.y >= gridRadius
    ) {
      return true;
    }

    if (
      xdis > this.range ||
      xdis < -this.range ||
      ydis > this.range ||
      ydis < -this.range
    ) {
      return true;
    } else {
      return false;
    }
  }
}
