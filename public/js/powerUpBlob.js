class powerUpBlob {
  constructor(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;

    this.c1 = Math.floor(Math.random() * 255);
    this.c2 = Math.floor(Math.random() * 255);
    this.c3 = Math.floor(Math.random() * 255);
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
      // socket.emit("collisoonWithPowerBlob", this);
      console.log("collision");
      this.r = 0;
      this.x = -9999;
      this.y = -9999;
    }
  }
}
