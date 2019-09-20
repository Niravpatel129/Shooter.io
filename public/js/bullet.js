function getDirectionTo(mouseX, mouseY, width, height) {
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;
  let resultingX = mx;
  let resultingY = my;
  let magnitude = Math.sqrt(Math.pow(resultingX, 2) + Math.pow(resultingY, 2));
  return [resultingX / magnitude, resultingY / magnitude];
}

class bullet {
  constructor(x, y, xSpd, ySpd) {
    this.startingX = player.x;
    this.startingY = player.y;
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

  outOfBounds() {
    let gridRadius = 800;
    let xdis = this.startingX - this.x;
    let ydis = this.startingY - this.y;

    if (this.x <= -800 || this.x >= 800 || this.y <= -800 || this.y >= 800) {
      return true;
    }

    if (xdis > 550 || xdis < -550 || ydis > 550 || ydis < -550) {
      return true;
    } else {
      return false;
    }
  }
}
