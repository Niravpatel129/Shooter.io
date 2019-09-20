class powerUpBlob {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw() {
    eclipse(this.x, this.y, this.r);
  }
}

module.exports = { powerUpBlob };
