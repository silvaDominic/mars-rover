/*
START TIME: 10:51 PM EST
END TIME:

INITIAL THOUGHTS
- Problem appears to be straight forward
- Will use a 2D array as a data structure
- Orientation will be held by variable
- Not clear how inputs should be read (via the keyboard? as a string?)
  - I will keep it simple and just interpret a string first
  - Move to keyboard after

ALGO and DSs
- Initial input will define 2D plane
- Coordinates can be entered intuitively as cartesian coordinates (x, y)
For Ex: grid[1][2]
[[00, 01, 02],
[10, 11, ((12))],
[20, 21, 22]]

- Boundaries can be defined intuitively as well
    M -->
[[00, 01, 02],  ^
[10, 11, 12],   |
[20, 21, 22]]   N

leftBoundary = negative
rightBoundary = length of M - 1
topBoundary = length of N - 1
bottomBoundary = negative

- Each command also has an associate orientation
- These orientations can be held in as map
  - L: -90
  - R: +90

 - With this format the values can simply be added to the orientation variable
  - Start N (0)
  - Rotate Left (270)
  - Rotate Left (180)
  - Rotate Right (270)
  - Rotate Right (0)
  - Rotate Right (90)
- The nuance here is constraining the rotation to 360 degrees

I think this is enough considering and exploring.
It is subject to change.
BEGIN CODING: 11:19PM
 */

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

class Mission {
  boundaries = {
    top: null,
    right: null,
    bottom:  0,
    left: 0,
  }
  instructions = [];
  startingPosition = {};

  constructor(m, n, instructions, startingPosition) {
    this.boundaries.right = m ;
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

class Rover {
  orientation = 0;
  position = [null, null];
  boundaries = {};

  isLost = false;
  lostPosition = [];
  lostOrientation = 0;

  startMission(mission) {
    this._land(mission.startingPosition);
    this._establishBoundaries(mission.boundaries);

    mission.instructions.forEach(direction => {
      if (this.isLost) return;

      this.move(direction);
    });

    this.endMission();
  }

  _land(startingPosition) {
    this.orientation = ORIENTATION[startingPosition.cardinalDirection];
    this.position = [startingPosition.x, startingPosition.y];
  }

  move(direction) {
    // Update orientation
    if (direction !== "F") {
      this.orientation = this._calcOrientation(direction);
    // Move forward
    } else {
      const nextPosition = [...this.position];
      nextPosition[0] += MOVE_MAP[this.orientation][0];
      nextPosition[1] += MOVE_MAP[this.orientation][1];
      if (this._checkIfLost(nextPosition)) {
        return;
      }
      this.position = nextPosition;
    }
  }

  _establishBoundaries(boundaries) {
    this.boundaries = boundaries;
  }

  _calcOrientation(direction) {
    const newOrientation = this.orientation + DIRECTION[direction];

    if (newOrientation === 360) return 0;
    if (newOrientation < 0) return 270;

    return newOrientation;
  }

  _checkIfLost(position) {
    if (
      (position[0] < this.boundaries.left || position[0] > this.boundaries.right ||
        position[1] > this.boundaries.top || position[1] < this.boundaries.bottom) &&
      this.isLost === false
    ) {
      this.isLost = true;
      this.lostPosition = [...this.position];
      this.lostOrientation = this.orientation;
      return true;
    }
    return false;
  }

  endMission() {
    this.printLocation();
    this.orientation = 0;
    this.position = [null, null];
    this.boundaries = {};

    this.isLost = false;
    this.lostPosition = [];
    this.lostOrientation = 0;
  }

  printLocation() {
    if (!this.isLost) {
      console.log(`(${this.position},${CARDINAL_DIRECTION[this.orientation]})`)
    } else {
      console.log(`(${this.position},${CARDINAL_DIRECTION[this.orientation]}) LOST`);
    }
  }
}

const missionA = new Mission(4, 8, "LFRFF", {x: 2, y: 3, cardinalDirection: "E"});
const missionB = new Mission(4, 8, "FFLFRFF", {x: 0, y: 2, cardinalDirection: "N"}); // LOST
const missionC = new Mission(4, 8, "FLLFR", {x: 2, y: 3, cardinalDirection: "N"});
const missionD = new Mission(4, 8, "FFRLF", {x: 1, y: 0, cardinalDirection: "S"}); // LOST
const marsRover = new Rover();
marsRover.startMission(missionA);
marsRover.startMission(missionB);
marsRover.startMission(missionC);
marsRover.startMission(missionD);
