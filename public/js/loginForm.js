$("input").keydown(function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    inputName = $("input").val();
    socket.emit("getNameValid", inputName);
    socket.on("getNameValid", result => {
      if (result) {
        localPlayerName = inputName.toUpperCase();
        $(".overlap").css("display", "none");
        Playing = true;
        player.name = localPlayerName;
      }
    });
  }
});
