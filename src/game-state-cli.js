const GameStateBase = require('./game-state');

class GameStateCli extends GameStateBase {
  // eslint-disable-next-line class-methods-use-this
  _padValue(value) {
    if (value >= 1000) {
      return ` ${value} `;
    }
    if (value >= 100) {
      return ` *${value} `;
    }
    if (value >= 10) {
      return ` **${value} `;
    }
    if (value === 0) {
      return ' **** ';
    }
    return ` ***${value} `;
  }

  _printRow(row) {
    const tempRow = row.map(this._padValue);
    console.log(tempRow.join(' '));
  }

  _renderBoard() {
    this.board.forEach((row) => this._printRow(row));
  }

  renderState() {
    // score and additional information can be printed here
    this._renderBoard();
  }
}

module.exports = GameStateCli;
