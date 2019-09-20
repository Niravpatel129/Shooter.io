function showKillMessage(data) {
  $(".killMessage").css("display", "block");

  for (let i = 0; i < deadPlayersMessage.length; i++) {
    let deadPlayersMessages = deadPlayersMessage[i].split(" ");
    var x = $(".killMessage").html(
      `${deadPlayersMessages[0]} <b style="color: red">KILLED</b> ${
        deadPlayersMessages[1]
      }`
    );
  }

  setInterval(() => {
    deadPlayersMessage.pop();
    $(".killMessage").css("display", "none");
  }, 5000);
}
