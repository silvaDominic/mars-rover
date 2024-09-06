const ORIENTATION = {
  "N": 0,
  "E": 90,
  "S": 180,
  "W": 270,
}

const CARDINAL_DIRECTION = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
}

const DIRECTION = {
  "L": -90,
  "R": 90,
}

const MOVE_MAP = {
  0: [0, 1],
  90: [1, 0],
  180: [0, -1],
  270: [-1, 0],
}

export class Rover {
  orientation = 0;
  position = [null, null];
  boundaries = {};
  isLost = false;

  startMission(mission) {
    this._land(mission.startingPosition);
    this._establishBoundaries(mission.boundaries);

    mission.instructions.forEach(direction => {
      if (this.isLost) return;

      if (direction === "F") {
        this.move();
      } else {
        this.rotate(direction)
      }
    });

    this.endMission();
  }

  move() {
      const nextPosition = [...this.position];
      nextPosition[0] += MOVE_MAP[this.orientation][0];
      nextPosition[1] += MOVE_MAP[this.orientation][1];
      if (this._isLost(nextPosition)) {
        return;
      }
      this.position = nextPosition;
  }

  rotate(direction) {
    this.orientation = this._calcOrientation(direction);
  }

  endMission() {
    this.printLocation();
    this.orientation = 0;
    this.position = [null, null];
    this.boundaries = {};
    this.isLost = false;
  }

  printLocation() {
    console.log(`(${ this.position },${ CARDINAL_DIRECTION[this.orientation] }) ${this.isLost ? 'LOST' : ''}`);
  }

  _establishBoundaries(boundaries) {
    this.boundaries = boundaries;
  }

  _land(startingPosition) {
    this.orientation = ORIENTATION[startingPosition.cardinalDirection];
    this.position = [startingPosition.x, startingPosition.y];
  }

  _calcOrientation(direction) {
    const newOrientation = this.orientation + DIRECTION[direction];

    if (newOrientation === 360) return 0;
    if (newOrientation < 0) return 270;

    return newOrientation;
  }

  _isLost(position) {
    if (
      (position[0] < this.boundaries.left || position[0] > this.boundaries.right ||
        position[1] > this.boundaries.top || position[1] < this.boundaries.bottom) &&
      this.isLost === false
    ) {
      this.isLost = true;
      return true;
    }
    return false;
  }
}
