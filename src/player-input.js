function handlePlayerInput({
  upCallback,
  downCallback,
  leftCallback,
  rightCallback,
  exitCallback,
}) {
  const { stdin } = process;

  stdin.setRawMode(true);
  stdin.setEncoding('utf8');

  stdin.on('data', (key) => {
    switch (key.toLowerCase()) {
      case 'w':
        upCallback();
        break;

      case 's':
        downCallback();
        break;

      case 'a':
        leftCallback();
        break;

      case 'd':
        rightCallback();
        break;

      case 'q':
      case '\u0003':
        exitCallback();
        break;
      default:
    }
  });
}

module.exports = { handlePlayerInput };
