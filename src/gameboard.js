import { Ship } from "./ship";

const Gameboard = () => {
  const board = [];
  for(let i = 0; i < 10; i++) {
    board.push(Array(10).fill(0));
  }

  let currentShips = 0;

  const placeShip = (coordinate, shipLength, plane) => {
    let yCoordinate = coordinate[0];
    let xCoordinate = coordinate[1];

    const battleship = Ship(shipLength);
    battleship.anchor = coordinate;

    if(plane == 0) {
      if(xCoordinate + shipLength > 10) {
        return "Can't place ship, incorrect coordinate!";
      } else {
        for (let i = xCoordinate; i < xCoordinate + shipLength; i++) {
          if(isNaN(board[yCoordinate][i])) {
            return "Can't place ship, coordinate is not blank";
          }
        }

        for (let i = xCoordinate; i < xCoordinate + shipLength; i++) {
          board[yCoordinate][i] = battleship;
        }

        currentShips += 1;

        return true;
      }
    } 

    if (plane == 1) {
      if(yCoordinate + shipLength > 10) {
        return "Can't place ship, incorrect coordinate!";
      } else {
        for (let i = yCoordinate; i < yCoordinate + shipLength; i++) {
          if(isNaN(board[i][xCoordinate])) {
            return "Can't place ship, coordinate is not blank";
          }
        }

        for (let i = yCoordinate; i < yCoordinate + shipLength; i++) {
          board[i][xCoordinate] = battleship;
        }

        currentShips += 1;

        return true;
      }
    } else {
      return "Wrong plane, plane can only be 0 for x and 1 for y";
    }
  }

  const receiveAttack = (coordinate) => {
    let yCoordinate = coordinate[0];
    let xCoordinate = coordinate[1];

    if(isNaN(board[yCoordinate][xCoordinate])) {
      const battleship = board[yCoordinate][xCoordinate];

      let index = getHitIndex(battleship.anchor, coordinate);

      battleship.gotHit(index);

      if(battleship.isSunk()) {
        currentShips -= 1;
      }
    } else {
      board[yCoordinate][xCoordinate] = 1;
    }    
  }

  const gameOver = () => {
    return currentShips == 0;
  }

  const getHitIndex = (anchor, coordinate) => {
    let yCoordinate = coordinate[0];
    let xCoordinate = coordinate[1];

    if(anchor[0] == yCoordinate) {
      return Math.abs(xCoordinate - anchor[1]); 
    } else {
      return Math.abs(yCoordinate - anchor[0]);
    }
  }

  return { board, placeShip, receiveAttack, gameOver, getHitIndex }
}

export { Gameboard }
