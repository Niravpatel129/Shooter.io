// when game is launched / started it should get a array of all the players on the server
// array of online players
// x, y of online players
// skin
// direction facing

class OnlinePlayer {
  constructor() {
    this.color = color(255);
    this.text = "OPPONENT";
    this.bulletRadius = bulletRadius;
  }

  draw() {
    if (serverPlayers) {
      for (let j = 0; j < serverPlayers.length; j++) {
        fill(200, 120, 192);
        ellipse(serverPlayers[j].x, serverPlayers[j].y, playerSize, playerSize);

        //text
        textAlign(CENTER);
        fill(this.color);
        text(this.text, serverPlayers[j].x, serverPlayers[j].y);

        //draw server bullets
        if (serverPlayers[j].bullets.length > 0) {
          for (let m = 0; m < serverPlayers[j].bullets.length; m++) {
            ellipse(
              serverPlayers[j].bullets[m].x,
              serverPlayers[j].bullets[m].y,
              this.bulletRadius
            );
          }
        }
      }
    }
  }
}
