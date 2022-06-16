import { Player } from "./player"
import { Gameboard } from "./gameboard"

test("If a player attack a blank position on board, that position is marked", () => {
  const p = Player();
  const g = Gameboard();
  p.attack(g, [0, 0]);
  
  expect(g.board[0][0]).toBe(1);
})

test("When a player was created, player's isTurn is false", () => {
  const p = Player();

  expect(p.isTurn()).toBeFalsy();
})

test("If startTurn function is called, player's isTurn is true", () => {
  const p = Player();
  p.startTurn();

  expect(p.isTurn()).toBeTruthy();
})


test("If endTurn function is called, player's isTurn is false", () => {
  const p = Player();
  p.startTurn();
  p.endTurn();

  expect(p.isTurn()).toBeFalsy();
})

test("when created, isBotMode default is false", () => {
  const p = Player();

  expect(p.isBotMode()).toBeFalsy();
})

test("When use toggleBotMode, isBotMode is true", () => {
  const p = Player();
  p.toggleBotMode();

  expect(p.isBotMode()).toBeTruthy();
})
