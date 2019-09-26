function showKillMessage(data) {
  for (let i = 0; i < serverPlayers.length; i++) {
    if (serverPlayers[i].id === data.deadPlayerSocketID) {
      serverPlayers[i].x = -9999;
      serverPlayers[i].y = -9999;
      serverPlayers[i].alive = false;
    }
  }
}
