export class Mission {
  boundaries = {
    top: null,
    right: null,
    bottom: 0,
    left: 0,
  }
  instructions = [];
  startingPosition = {};

  constructor(m, n, instructions, startingPosition) {
    this.boundaries.right = m;
    this.boundaries.top = n;
    this.startingPosition = startingPosition;

    if (!Array.isArray(instructions)) {
      this.instructions = instructions.split('');
    } else {
      this.instructions = instructions;
    }
  }

  get instructions() {
    return this.instructions;
  }

  get startingPosition() {
    return this.startingPosition;
  }
}
