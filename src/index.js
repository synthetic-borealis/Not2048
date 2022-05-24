const { handlePlayerInput } = require('./player-input');

const GameState = require('./game-state');

const gameState = new GameState();

function checkGameCondition() {
  if (gameState.isWinning()) {
    console.log('You won!');
    process.exit();
  }
  if (gameState.isLosing()) {
    console.log('You lost!');
    process.exit();
  }
}

console.clear();
gameState.renderState();

handlePlayerInput({
  upCallback: () => {
    console.clear();
    if (gameState.moveUp()) {
      gameState.fillRandomTile();
      gameState.renderState();
      checkGameCondition();
    } else {
      gameState.renderState();
    }
  },
  downCallback: () => {
    console.clear();
    if (gameState.moveDown()) {
      gameState.fillRandomTile();
      gameState.renderState();
      checkGameCondition();
    } else {
      gameState.renderState();
    }
  },
  leftCallback: () => {
    console.clear();
    if (gameState.moveLeft()) {
      gameState.fillRandomTile();
      gameState.renderState();
      checkGameCondition();
    } else {
      gameState.renderState();
    }
  },
  rightCallback: () => {
    console.clear();
    if (gameState.moveRight()) {
      gameState.fillRandomTile();
      gameState.renderState();
      checkGameCondition();
    } else {
      gameState.renderState();
    }
  },
  exitCallback: () => {
    process.exit();
  },
});
