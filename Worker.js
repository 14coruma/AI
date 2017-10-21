var Unit = require("./Unit");
var pathfinder = require("./pathfinder.js");
class Worker extends Unit {

	constructor(unit_update) {
		super(unit_update);
		this.dest = this.start = { x: this.x, y: this.y }; // my next destination
		this.moveDir = "";
		this.strat = "FIND_RESOURCE";         // current strategy
	}

	getType() {
		return "worker";
	}

	getMove(map) {
		// Override with method to return the next move
		var mapMask = pathfinder.createMapMask(map);

		switch(this.strat) {
			case "FIND_RESOURCE":
				this.dest = closestResource(this.start, map, mapMask);
				this.strat = "MOVING";
				break;
			case "MOVING":
				if (this.dest === this.start )
					this.strat = "FIND_RESOURCE";
				break;
			default:
				this.dest = { x: this.x, y: this.y }; // Don't do anything if no job
		}

		// calculate next move
		this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);

		// return the array with the move
		return { command: "MOVE", unit: this.id, dir: this.moveDir };
	}

}
module.exports = Worker;

// Find the closest resource to start position
function closestResource(start, map, mapMask) {
	var resource = { pos: start, dist: 999 };
	for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[x].length; y++) {
			if (map[x][y].resources) {
				var dist = pathfinder.distance(start, { x: x, y: y }, mapMask );
				if (dist < resource.dist) {
					resource.pos = { x: x, y: y };
					resource.dist = dist;
				}
			}
		}
	}

	return resourcePos;
}
