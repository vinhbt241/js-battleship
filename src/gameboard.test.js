import { Gameboard } from "./gameboard"

test('gameboard is 10 x 10 array when created', () => {
  const testBoard = Gameboard();

  expect(testBoard.board.length).toBe(10);
  expect(testBoard.board[0].length).toBe(10);
})

test('place ship at correct coordinate', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);

  for(let i = 0; i < 5; i++) {
    expect(isNaN(testBoard.board[0][i])).toBeTruthy();
  }
})

test('place ship at incorrect coordinate', () => {
  const testBoard = Gameboard();

  expect(testBoard.placeShip([0, 9], 5, 0)).toBe("Can't place ship, incorrect coordinate!");
  expect(testBoard.placeShip([9, 0], 5, 1)).toBe("Can't place ship, incorrect coordinate!");
})

test('place ship at wrong plane', () => {
  const testBoard = Gameboard();
  
  expect(testBoard.placeShip([0, 0], 5, 3)).toBe("Wrong plane, plane can only be 0 for x and 1 for y");
})

test('place ship when the coordinate is not blank', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);

  expect(testBoard.placeShip([0, 3], 5, 0)).toBe("Can't place ship, coordinate is not blank");
})

test('when receive attack, that attack position is marked on the board', () => {
  const testBoard = Gameboard();

  testBoard.receiveAttack([4, 5]);
  testBoard.receiveAttack([1, 2]);
  testBoard.receiveAttack([7, 7]);
  
  expect(testBoard.board[4][5]).toBe(1);
  expect(testBoard.board[1][2]).toBe(1);
  expect(testBoard.board[7][7]).toBe(1);
})

test('when an attack hit the ship, gameboard send gotHit() function to the ship', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);
  testBoard.receiveAttack([0, 1]);

  expect(testBoard.board[0][0].hitPosition[1]).toBeTruthy();
})

test('When all part got hit, the ship sunk', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);

  for(let i = 0; i < 5; i++) {
    testBoard.receiveAttack([0, i]);
  }

  expect(testBoard.board[0][0].isSunk()).toBeTruthy();
})

test('When all ship is sunk, game over', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);

  for(let i = 0; i < 5; i++) {
    testBoard.receiveAttack([0, i]);
  }

  expect(testBoard.gameOver()).toBeTruthy();
})

test('When there are ships on the board, game is not over', () => {
  const testBoard = Gameboard();
  testBoard.placeShip([0, 0], 5, 0);
  testBoard.placeShip([1, 0], 5, 0);

  for(let i = 0; i < 5; i++) {
    testBoard.receiveAttack([0, i]);
  }

  expect(testBoard.gameOver()).toBeFalsy();
})
