import { Gameboard } from "./gameboard"
import { Player } from "./player"
import { randomCoordinate, initBoard, initGameplay, renderBoard } from "./render"
import './style.css';

const player = Player();

const playerBoard = Gameboard();
const botBoard = Gameboard();

const botShipLength = [2, 3, 3, 4, 5];

while(botShipLength.length != 0) {
  let shipLength = botShipLength[botShipLength.length - 1];
  let plane = Math.floor(Math.random() * 2);
  let coordinate = randomCoordinate(botBoard);

  let result = botBoard.placeShip(coordinate, shipLength, plane);

  if(result == true) {
    console.log(shipLength, plane, coordinate);
    botShipLength.pop();
  }
}

document.getElementById("board1").appendChild(renderBoard(playerBoard, "player-board"));
document.getElementById("board2").appendChild(renderBoard(botBoard, "bot-board"));

const determineAnchorLocation = (arrShipLength, plane, board, boardID) => {
  if(arrShipLength.length == 0) {
    initBoard(player, botBoard, "bot-board");
    initGameplay(player, playerBoard, "player-board", botBoard, "bot-board");

    const phaseMessage = document.getElementById("phase-message");
    phaseMessage.innerText = "Now try to sunk all of the bot's ships, before it sunk all of your ships ψ(｀∇´)ψ"

    return;
  } 

  document.addEventListener('keypress', (e) => {
    if(e.key == "r") {
      plane = (plane == 0 ? 1 : 0);
    }

    const oldBoard = document.getElementById(boardID);
    oldBoard.parentNode.replaceChild(renderBoard(board, boardID), oldBoard);

    determineAnchorLocation(arrShipLength, plane, board, boardID);
  });

  let shipLength = arrShipLength[arrShipLength.length - 1];
  

  const positions = document.getElementById(boardID).querySelectorAll(".position");

  for(const position of positions) {
    position.addEventListener("mouseenter", (e) => {
      let strCoordinate = e.target.getAttribute("coordinate").split(" ");
      let yCoordinate = Number(strCoordinate[0]);
      let xCoordinate = Number(strCoordinate[1]);

      if(plane == 0) {
        for(let i = xCoordinate; i < ((xCoordinate + shipLength) > 10 ? 10 : (xCoordinate + shipLength)); i++) {
          const shipPosition = document.querySelector(`[coordinate="${yCoordinate} ${i}"]`);

          shipPosition.style.backgroundColor = "#83def1";
          shipPosition.style.color = "#006a94";

          if(xCoordinate + shipLength <= 10) {  
            shipPosition.innerText = "⛴";
          } else {
            shipPosition.innerText = "🚫";
          }
        }
      }

      if(plane == 1) {
        for(let i = yCoordinate; i < ((yCoordinate + shipLength) > 10 ? 10 : (yCoordinate + shipLength)); i++) {
          const shipPosition = document.querySelector(`[coordinate="${i} ${xCoordinate}"]`);
          
          shipPosition.style.backgroundColor = "#83def1";
          shipPosition.style.color = "#006a94";

          if(yCoordinate + shipLength <= 10) {
            shipPosition.innerText = "⛴";
          } else {
            shipPosition.innerText = "🚫"; 
          }
        }
      }
    })

    position.addEventListener("mouseleave", (e) => {
      let strCoordinate = e.target.getAttribute("coordinate").split(" ");
      let yCoordinate = Number(strCoordinate[0]);
      let xCoordinate = Number(strCoordinate[1]);

      if(plane == 0) {
        for(let i = xCoordinate; i < ((xCoordinate + shipLength) > 10 ? 10 : (xCoordinate + shipLength)); i++) {
          const shipPosition = document.querySelector(`[coordinate="${yCoordinate} ${i}"]`);
          shipPosition.style.backgroundColor = "#006a94";
          shipPosition.style.color = "#83def1";
          shipPosition.innerText = (isNaN(board.board[yCoordinate][i]) ? "⛴" : "") ;
        }
      }

      if(plane == 1) {
        for(let i = yCoordinate; i < ((yCoordinate + shipLength) > 10 ? 10 : (yCoordinate + shipLength)); i++) {
          const shipPosition = document.querySelector(`[coordinate="${i} ${xCoordinate}"]`);
          shipPosition.style.backgroundColor = "#006a94";
          shipPosition.style.color = "#83def1";
          shipPosition.innerText = (isNaN(board.board[i][xCoordinate]) ? "⛴" : "");
        }
      }
    })

    position.addEventListener("click", (e) => {
      let strCoordinate = e.target.getAttribute("coordinate").split(" ");
      let yCoordinate = Number(strCoordinate[0]);
      let xCoordinate = Number(strCoordinate[1]);

      let result = board.placeShip([yCoordinate, xCoordinate], shipLength, plane);

      if(result == true) {
        arrShipLength.pop();

        const oldBoard = document.getElementById(boardID);
        oldBoard.parentNode.replaceChild(renderBoard(board, boardID), oldBoard);

        determineAnchorLocation(arrShipLength, plane, board, boardID);
      }
    })
  }
}

const arrShipLength = [2, 3, 3, 4, 5];

determineAnchorLocation(arrShipLength, 0, playerBoard, "player-board");
