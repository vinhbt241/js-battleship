import { Ship } from "./ship"

test('ship length', () => {
  const shipTestOne = Ship(5);

  expect(shipTestOne.shipLength).toBe(5);
})

test('when a position on the ship get hit, that position is marked', () => {
  const shipTestTwo = Ship(5);
  shipTestTwo.gotHit(3);

  for(let i = 0; i < 5; i++) {
    if(i == 3) {
      expect(shipTestTwo.hitPosition[i]).toBeTruthy();
    } else {
      expect(shipTestTwo.hitPosition[i]).toBeFalsy();
    }
  }
  
}) 

test('ship shanks when all position was hit', () => {
  const shipTestThree = Ship(5);

  for (let i = 0; i < shipTestThree.shipLength; i++) {
    shipTestThree.gotHit(i);
  }

  expect(shipTestThree.isSunk()).toBeTruthy();
})

test('ship does not shunk when there are at least one position does not get hit', () => {
  const shipTestFour = Ship(5);

  for (let i = 0; i < shipTestFour.shipLength - 1; i++) {
    shipTestFour.gotHit(i);
  }

  expect(shipTestFour.isSunk()).toBeFalsy();
})
