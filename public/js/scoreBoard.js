socket.emit("getScore");

socket.on("getScore", data => {
  if (data.length > 0) {
    let sortedData = data.sort((a, b) => (a.score < b.score ? 1 : -1));
    let dataHTML = "";
    dataHTML += "<h5>LeaderBoards</h5>";
    for (let i = 0; i < sortedData.length; i++) {
      dataHTML += `<li> ${sortedData[i].name} ${sortedData[i].score}</li>`;
    }
    $("ul").html(dataHTML);
  }
});
