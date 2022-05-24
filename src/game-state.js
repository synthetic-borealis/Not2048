const { generateValue, randomTile } = require('./utils');

class GameState {
  constructor() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    this.fillRandomTile();
    this.fillRandomTile();
  }

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

  isWinning() {
    return this.board.some((row) => row.some((value) => value === 2048));
  }

  isLosing() {
    const isBoardFull = this.board.every((row) => row.every((value) => value > 0));
    if (isBoardFull && !this.isWinning()) {
      return true;
    }

    // top
    if (this.board[0].some((value) => value === 0)) {
      const nextRows = this.board.slice(1);
      return nextRows.every((row) => row.every((value) => value > 0));
    }
    // bottom
    if (this.board[3].some((value) => value === 0)) {
      const previousRows = this.board.slice(-2);
      return previousRows.every((row) => row.every((value) => value > 0));
    }

    // left & right
    this._transposeBoard();
    let isLosing = false;

    if (this.board[0].some((value) => value === 0)) {
      const nextRows = this.board.slice(1);
      isLosing = nextRows.every((row) => row.every((value) => value > 0));
    } else if (this.board[3].some((value) => value === 0)) {
      const previousRows = this.board.slice(-2);
      isLosing = previousRows.every((row) => row.every((value) => value > 0));
    }

    this._transposeBoard();
    return isLosing();
  }

  fillRandomTile() {
    if (this.isLosing() || this.isWinning()) {
      return;
    }

    let tile = randomTile();

    while (this.board[tile.row][tile.column] > 0) {
      tile = randomTile();
    }
    this.board[tile.row][tile.column] = generateValue();
  }

  moveRowLeft(rowIndex) {
    let hasMoved = false;
    const row = this.board[rowIndex];

    if (row.every((value) => value > 0) || row.every((value) => value === 0)) {
      return hasMoved;
    }

    const firstZero = row.findIndex((value) => value === 0);
    if (row.slice(firstZero).every((value) => value === 0)) {
      return hasMoved;
    }

    for (let i = 0; i < 3; i += 1) {
      row[i] += row[i + 1];
      row[i + 1] = 0;
      hasMoved = true;
    }

    this.board[rowIndex] = row;
    return hasMoved;
  }

  moveLeft() {
    const hasRowMoved = this.board.map((_, index) => this.moveRowLeft(index));
    const hasMoved = hasRowMoved.some((row) => row);

    return hasMoved;
  }

  moveRight() {
    this.board = this.board.map((row) => row.reverse());
    const hasRowMoved = this.board.map((_, index) => this.moveRowLeft(index));
    this.board = this.board.map((row) => row.reverse());
    const hasMoved = hasRowMoved.some((row) => row);

    return hasMoved;
  }

  _transposeBoard() {
    this.board = this.board[0].map((_, index) => this.board.map((row) => row[index]));
  }

  moveUp() {
    this._transposeBoard();
    const hasMoved = this.moveLeft();
    this._transposeBoard();
    return hasMoved;
  }

  moveDown() {
    this._transposeBoard();
    const hasMoved = this.moveRight();
    this._transposeBoard();
    return hasMoved;
  }
}

module.exports = GameState;
