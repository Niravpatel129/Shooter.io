socket.emit("getScore");

socket.on("getScore", data => {
  let dataHTML = "";
  for (let i = 0; i < data.length; i++) {
    dataHTML += `<li> ${data[i].name} ${data[i].score}</li>`;
  }
  $("ul").html(dataHTML);
});
