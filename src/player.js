const Player = () => {
  let turn = false;
  let botMode = false;

  const startTurn = () => {
    turn = true;
  }

  const endTurn = () => {
    turn = false;
  }
  
  const isTurn = () => {
    return turn;
  }

  const attack = (gameboard, coordinate) => {
    gameboard.receiveAttack(coordinate);
  }

  const isBotMode = () => {
    return botMode;
  }

  const toggleBotMode = () => {
    botMode = !botMode;
  }

  const botAttack = (gameboard) => {
    let validPosition = false;

    while (validPosition == false) {
      let yCoordinate = Math.floor(Math.random() * gameboard.board.length);
      let xCoordinate = Math.floor(Math.random() * gameboard.board[0].length);

      if(gameboard.board[yCoordinate][xCoordinate] == 0) {
        validPosition = true;
        attack(gameboard, [yCoordinate, xCoordinate]);
      } else if (isNaN(gameboard.board[yCoordinate][xCoordinate])) {
        const battleship = gameboard.board[yCoordinate][xCoordinate];

        let index = gameboard.getHitIndex(battleship.anchor, [yCoordinate, xCoordinate]);

        if(battleship.hitPosition[index] == false) {
          validPosition = true;
          attack(gameboard, [yCoordinate, xCoordinate]);
        }
      }
    }
  }

  return { isTurn, startTurn, endTurn, attack, isBotMode, toggleBotMode, botAttack }
}

export { Player }
