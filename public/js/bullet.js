function getDirectionTo(blockX, blockY, mouseX, mouseY) {
  let resultingX = mouseX - blockX;
  let resultingY = mouseY - blockY;
  let magnitude = Math.sqrt(Math.pow(resultingX, 2) + Math.pow(resultingY, 2));
  return [resultingX / magnitude, resultingY / magnitude];
}

class bullet {
  constructor(xSpd, ySpd) {
    this.x = localPlayer.x;
    this.y = localPlayer.y;
    this.xSpd = 12 * xSpd;
    this.ySpd = 12 * ySpd;
  }

  display() {
    push();
    stroke(55, 255, 0);
    fill(55, 55, 55, 135);
    ellipse(this.x, this.y, 60);
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
    return false;
  }

  //   hitScan() {
  //     for (var i = 0; i < targetBalloons.length; i++) {
  //       var collideOrNot = collideCircleCircle(
  //         this.x,
  //         this.y,
  //         10,
  //         targetBalloons[i].myX(),
  //         targetBalloons[i].myY(),
  //         targetBalloons[i].myR()
  //       );
  //       if (collideOrNot) {
  //         targetBalloons.splice(i, 1);
  //         score += 1;
  //         return true;
  //       }
  //     }
  //     return false;
  //   }
}
