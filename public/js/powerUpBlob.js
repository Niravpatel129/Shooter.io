class powerUpBlob {
  constructor(id, x, y, r, c1, c2, c3) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;

    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
  }

  draw() {
    fill(color(this.c1, this.c2, this.c3));
    ellipse(this.x, this.y, this.r);
  }

  checkCollision() {
    let d = p5.Vector.dist(
      createVector(this.x, this.y),
      createVector(player.x, player.y)
    );

    if (d <= playerSize + this.r) {
      socket.emit("collisoonWithPowerBlob", this);
      this.r = 0;
      this.x = -9999;
      this.y = -9999;
      deathSound.play();
    }
  }
}
