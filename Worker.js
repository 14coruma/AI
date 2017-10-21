var Unit = require("./Unit");
var pathfinder = require("./pathfinder.js");
class Worker extends Unit {

	constructor(unit_update) {
		super(unit_update);
		this.dest = this.start = { x: this.x, y: this.y };
		this.moveDir = "";
		this.strat = "MOVE_BASE";         // current strategy
	}

	getType() {
		return "worker";
	}

	getMove(map) {
		// Override with method to return the next move
		var mapMask = pathfinder.createMapMask(map);

		this.start = { x: this.x, y: this.y };
		switch(this.strat) {
			case "MOVE_RESOURCE":
				var resourceDir = canGather(this.start, this.dest, map);
				if (resourceDir) { // If you can gather, then gather!
					this.strat = "GATHER";
					this.moveDir = resourceDir;
				} else {
					// Keep moving towards resource
					this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
				}
				break;

			case "GATHER":
				// We just gathered, so move to base
				this.strat = "MOVE_BASE";
				this.dest = { x: 0, y: 0 };
				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
				break;

			case "MOVE_BASE":
				if (this.start === this.dest) { // We made it to base, so move to next resource
					this.dest = closestResource(this.start, map, mapMask);
					this.strat = "MOVE_RESOURCE";
				}
				// Make next move (to resource or base)
				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
				break;

			default:
				this.dest = { x: this.x, y: this.y }; // Don't do anything if no job
				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
		}

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

// Determine if can gather
function canGather(start, dest, map) {
	if (start.x == dest.x) {
		if (start.y == dest.y - 1) {
			return "S";
		} else if (start.y == dest.y + 1 ) {
			return "N";
		} else {
			return false;
		}
	} else if (start.y == dest.y) {
		if (start.x == dest.x - 1) {
			return "E";
		} else if (start.x == dest.x + 1) {
			return "W";
		} else {
			return false;
		}
	}
	return false;
}
