function generateValue() {
  const randomNumber = Math.floor(Math.random() * 10);

  if (randomNumber === 0) {
    return 4;
  }
  return 2;
}

function randomTile() {
  return {
    row: Math.floor(Math.random() * 4),
    column: Math.floor(Math.random() * 4),
  };
}

module.exports = { generateValue, randomTile };
