class blobs {
  constructor() {
    this.blobs = [];
  }

  generateBlobs() {
    for (let i = 0; i < 50; i++) {
      let max = 50;
      let min = 50;
      let x = Math.random() * (max - min) + min;
      let y = Math.random() * (max - min) + min;
      let r = Math.random() * (max - min) + min;
    }
  }
}

module.exports = { Users };
