function showKillMessage() {
  if (deadPlayersMessage.length > 0) {
    $(".killMessage").css("display", "block");

    for (let i = 0; i < deadPlayersMessage.length; i++) {
      let playersInMessage = deadPlayersMessage[i].split(" ");
      if (playersInMessage[0] === socket.id) {
        playersInMessage[0] = `<b style='color: blue'>${player.name}</b>`;
      }

      if (playersInMessage[1] === socket.id) {
        playersInMessage[1] = `<b style='color: blue'>${player.name}</b>`;
      }
      let x = $(".killMessage").html(
        `${playersInMessage[0]} <b style="color: red">KILLED</b> ${
          playersInMessage[1]
        }`
      );
      setInterval(() => {
        deadPlayersMessage.splice(i, 1);
        showKillMessage();
      }, 5000);
    }
  } else {
    $(".killMessage").css("display", "none");
  }
}
