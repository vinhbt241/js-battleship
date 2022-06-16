const Ship = (shipLength) => {
  const hitPosition = Array(shipLength).fill(false);
  const anchor = undefined;

  const gotHit = function(index) {
    hitPosition[index] = true;
  }

  const isSunk = () => {
    return hitPosition.every(position => { return position == true })
  }

  return { shipLength, hitPosition, anchor, gotHit, isSunk }
}

export { Ship }
