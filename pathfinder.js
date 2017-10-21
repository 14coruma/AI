/* Converts map matrix to 1s and 0s
 * Finds paths for given start points and end points
 */

var exports = module.exports = {};
var PF = require('pathfinding');

/* Create a path array from a map mask
 */
exports.getNextMove = function(start, goal, mapMask) {
	var grid = new PF.Grid();
	var finder = new PF.AStarFinder();
	var path = finder.findPath(start.x, start.y, goal.x, goal.y, grid);
	return path[1];
}

/* Create a mapMask from a map
 */
exports.createMapMask = function(map) {
	return mapMask;
}
