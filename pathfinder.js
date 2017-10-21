/* Converts map matrix to 1s and 0s
 * Finds paths for given start points and end points
 */

var PF = require('pathfinding');

/* Create a path array from a map mask
 * Return the next move
 *
 * @param start 
 * @param goal
 * @param mapMask. matrix of 1s and 0s (convert with createMapMask())
 */
exports.getNextMove = function(start, goal, mapMask) {
	var grid = new PF.Grid(mapMask);
	var finder = new PF.AStarFinder();
	var path = finder.findPath(start.x, start.y, goal.x, goal.y, grid);
	var dx = path[1][0] - start.x;
	var dy = path[1][1] - start.y;
	var move = "";
	if (dx != 0) {
		move = (dx == 1) ? "E" : "W";
	} else {
		move = (dy == 1) ? "S" : "N";
	}
	return move;
}

/* Create a mapMask from a map
 */
exports.createMapMask = function(map) {
	var mapMask = createArray(100,100);
	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[x].length; y++) {
			if (map[x][y]) {
				mapMask[x][y] = map[x][y].blocked ? 1 : 0;
			} else {
				mapMask[x][y] = 0;
			}
		}
	}
	return mapMask;
}

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
