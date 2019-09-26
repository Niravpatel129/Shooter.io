class Blobs {
  constructor() {
    this.blobs = [];
  }

  generateBlobs() {
    if (this.blobs.length === 0) {
      for (let i = 0; i < 50; i++) {
        let id = i;
        let max = 1000;
        let min = -1000;
        let x = Math.random() * (max - min) + min;
        let y = Math.random() * (max - min) + min;
        let r = Math.random() * (35 - 10) + 10;

        let c1 = Math.floor(Math.random() * 255);
        let c2 = Math.floor(Math.random() * 255);
        let c3 = Math.floor(Math.random() * 255);

        this.blobs.push({ id, x, y, r, c1, c2, c3 });
      }
    } else {
      return this.blobs;
    }
  }

  getBlobs() {
    return this.blobs;
  }

  remmoveBlob(data) {
    this.blobs.splice(data.id, 1);
  }
}

module.exports = { Blobs };
