class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 5;
    this.bullets = bulletsFired;
    socket.emit("firstConnect", this);
  }

  move() {
    if (keyIsDown(37) || keyIsDown(65)) {
      this.x -= this.speed;
    }
    if (keyIsDown(38) || keyIsDown(87)) {
      this.y -= this.speed;
    }
    if (keyIsDown(39) || keyIsDown(68)) {
      this.x += this.speed;
    }
    if (keyIsDown(40) || keyIsDown(83)) {
      this.y += this.speed;
    }
  }

  shoot() {
    let mouseVector = getDirectionTo(mouseX, mouseY, width, height);
    let oneBullet = new bullet(this.x, this.y, mouseVector[0], mouseVector[1]);
    bulletsFired.push(oneBullet);
  }

  draw() {
    this.bullets = bulletsFired;
    stroke(127, 63, 120);
    fill(100, 40, 192, 127);
    ellipse(this.x, this.y, 90, 90);
  }

  emitToServer() {
    socket.emit("update", this);
  }
}
