var pathfinder = require("./pathfinder.js");


var testMatrix = [
  [1,1,1,1],
  [1,0,0,1],
  [1,1,0,1],
  [1,1,0,1]
];

console.log(pathfinder.getNextMove({x:1, y:1}, {x: 2, y:3}, testMatrix));
console.log(pathfinder.getNextMove({x:2, y:1}, {x: 2, y:3}, testMatrix));
console.log(pathfinder.getNextMove({x:2, y:2}, {x: 2, y:3}, testMatrix));
