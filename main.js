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
  orientation = 0;
  position = [null, null];
  boundaries = {
    top: null,
    right: null,
    bottom: 0,
    left: 0,
  }
  constructor(m, n) {
    this.boundaries.top = n.length - 1;
    this.boundaries.right = m.length - 1;
  }

  startMission(x, y, cardinalDirection) {
    this.orientation = ORIENTATION[cardinalDirection];
    this.position = [x, y];
  }

  move(direction) {
    // Update orientation
    if (direction !== "F") {
      this.orientation = this._calcOrientation(direction);
      console.log(this.orientation);
    // Move forward
    } else {
      this.position[0] += MOVE_MAP[this.orientation][0];
      this.position[1] += MOVE_MAP[this.orientation][1];
    }
  }

  _calcOrientation(direction) {
    const newOrientation = this.orientation + DIRECTION[direction];

    if (newOrientation === 360) return 0;
    if (newOrientation < 0) return 270;

    return newOrientation;
  }
}




