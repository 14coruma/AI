// Test patfinder functions

var pathfinder = require('../pathfinder.js');

var map = createArray(100,100);
for (var i = 25; i < 75; i++) {
	for (var j = 25; j < 75; j++) {
		map[i][j] = {
			visible: true,
			x: i,
			y: j,
			blocked: true,
		}
	}
}

var mapMask = pathfinder.createMapMask(map);

var start = { x: 0, y: 0 };
var goal = { x: 20, y: 0 };

var nextMove = pathfinder.getNextMove(start, goal, mapMask);
console.log(nextMove);

/* Create an array with zeros
 */
function createArray(length) {
	var arr = new Array(length || 0),
		i = length;

	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while(i--) arr[length-1 - i] = createArray.apply(this, args);
	}

	return arr;
}

