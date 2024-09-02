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

import { Mission } from "./mission.model.js";
import { Rover } from "./rover.model.js";

const missionA = new Mission(4, 8, "LFRFF", { x: 2, y: 3, cardinalDirection: "E" });
const missionB = new Mission(4, 8, "FFLFRFF", { x: 0, y: 2, cardinalDirection: "N" }); // LOST
const missionC = new Mission(4, 8, "FLLFR", { x: 2, y: 3, cardinalDirection: "N" });
const missionD = new Mission(4, 8, "FFRLF", { x: 1, y: 0, cardinalDirection: "S" }); // LOST
const marsRover = new Rover();
marsRover.startMission(missionA);
marsRover.startMission(missionB);
marsRover.startMission(missionC);
marsRover.startMission(missionD);
