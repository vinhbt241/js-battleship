const renderBoard = (board, boardID) => {
  const container = document.createElement("div");

  container.style.display = "grid";
  container.style.gridTemplateRows = `repeat(${board.board.length}, 3.5vw)`;
  container.style.gridTemplateColumns = `repeat(${board.board[0].length}, 3.5vw)`;
  container.style.justifyContent = "center";

  container.classList.add("board");
  container.setAttribute("id", boardID);

  for(let i = 0; i < board.board.length; i ++) {
    for (let j = 0; j < board.board[0].length; j++) {
      const position = document.createElement("button");

      position.classList.add("position");

      if(isNaN(board.board[i][j])) {
        const battleship = board.board[i][j];
        let index = board.getHitIndex(battleship.anchor, [i, j]);

        if(battleship.hitPosition[index] == true || boardID == "player-board") {
          if(battleship.isSunk()) {
            position.innerText = "💀";
            position.classList.add("sunk");
          } else {
            position.innerText = "⛴";

            if(battleship.hitPosition[index] == true && boardID == "player-board") {
              position.classList.add("hit")
            }
          }

          position.disabled = true;
        }
      } else {
        if(board.board[i][j] == 1) {
          position.innerText = "✗";
          position.classList.add("marked");

          position.disabled = true;
        }
      }

      position.setAttribute("coordinate", `${i} ${j}`);

      container.appendChild(position);
    }
  }

  return container;
}

const initBoard = (player, board, boardID) => {
  const positions = document.getElementById(boardID).querySelectorAll(".position");

  for(const position of positions) {
    position.addEventListener("click", (e) => {
      let strCoordinate = e.target.getAttribute("coordinate").split(" ");
      let yCoordinate = Number(strCoordinate[0]);
      let xCoordinate = Number(strCoordinate[1]);

      player.attack(board, [yCoordinate, xCoordinate]);

      const oldBoard = document.getElementById(boardID);
      oldBoard.parentNode.replaceChild(renderBoard(board, boardID), oldBoard);

      initBoard(player, board, boardID);
    })
  }
}

const initGameplay = (bot, playerBoard, playerBoardID, botBoard, botBoardID) => {
  const positions = document.getElementById(botBoardID).querySelectorAll(".position");

  for(const position of positions) {
    position.addEventListener("click", () => {
      bot.botAttack(playerBoard);

      const oldPlayerBoard = document.getElementById(playerBoardID);
      oldPlayerBoard.parentNode.replaceChild(renderBoard(playerBoard, playerBoardID), oldPlayerBoard);

      initGameplay(bot, playerBoard, playerBoardID, botBoard, botBoardID);
    })
  }

  if(botBoard.gameOver() || playerBoard.gameOver()) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.style.display = "flex";

    const restartBtn = document.getElementById("restart");
    restartBtn.onclick = () => {
      window.location.reload();
    }
  }
}

const randomCoordinate = (gameboard) => {
  let yCoordinate = Math.floor(Math.random() * gameboard.board.length);
  let xCoordinate = Math.floor(Math.random() * gameboard.board[0].length);

  return [yCoordinate, xCoordinate];
}

export { renderBoard, initBoard, initGameplay, randomCoordinate }
