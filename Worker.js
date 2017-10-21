var Unit = require("./Unit");
var pathfinder = require("./pathfinder.js");
class Worker extends Unit {

	constructor(unit_update) {
		super(unit_update);
		this.dest = this.start = { x: this.x, y: this.y };
		this.dest = { x: 47, y: 48 };
		this.moveDir = "";
		this.strat = "MOVE_RESOURCE";         // current strategy
	}

	getType() {
		return "worker";
	}

	transposeMat(arr,arrLen) {
	  for (var i = 0; i < arrLen; i++) {
	    for (var j = 0; j <i; j++) {
	      //swap element[i,j] and element[j,i]
	      var temp = arr[i][j];
	      arr[i][j] = arr[j][i];
	      arr[j][i] = temp;
	    }
	  }
	}

	getMove(map) {
		// Override with method to return the next move
		var mapMask = pathfinder.createMapMask(map);
		this.transposeMat(mapMask, 100);

		// for(var i = 0; i<100; i++){
		// 	for(var j = 0; j<100; j++){
		// 		if (i==50 && j==50) {
		// 			process.stdout.write("X");
		// 		}
		// 		else {
		// 			process.stdout.write(""+mapMask[i][j]);
		// 		}
		// 	}
		// 	process.stdout.write("\n");
		// }

		this.start = { x: this.x, y: this.y };
		switch(this.strat) {
			case "MOVE_RESOURCE":
				var resourceDir = canGather(this.start, this.dest, map);
				// this.dest = closestResource(this.start, map, mapMask);
				// if (resourceDir) { // If you can gather, then gather!
				// 	this.strat = "GATHER";
				// 	this.moveDir = resourceDir;
				// } else {
					// Keep moving towards resource
					this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
					if (!this.moveDir) {
						return undefined;
					}
				// }
				break;

// 			case "GATHER":
// 				// We just gathered, so move to base
// 				this.strat = "MOVE_BASE";
// 				this.dest = { x: 50, y: 50 };
// 				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
// 				break;
//
// 			case "MOVE_BASE":
// 					this.strat = "MOVE_RESOURCE";
// 					this.dest = closestResource(this.start, map, mapMask);
// //				if (this.start.x == 50 && this.start.y == 50) { // We made it to base, so move to next resource
// //					this.dest = closestResource(this.start, map, mapMask);
// //					this.strat = "MOVE_RESOURCE";
// //				}
// 				// Make next move (to resource or base)
// 				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
// 				break;
//
// 			default:
// 				this.dest = { x: this.x, y: this.y }; // Don't do anything if no job
// 				this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
		}

		// return the array with the move
		this.moveDir = pathfinder.getNextMove( this.start, this.dest, mapMask);
		var move = "MOVE"
		if (this.strat == "GATHER")
			move = "GATHER";
		console.log("STRAT: " + this.strat + " DIR: " + this.moveDir + " TOWARDS: x=" + this.dest.x + ", y=" + this.dest.y);
		console.log("MY x=" + this.x + " MY y=" + this.y);
		return { command: move, unit: this.id, dir: this.moveDir };
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
	console.log("RESOURCE AT x="+resource.pos.x+" y="+resource.pos.y);
	return resource.pos;
}

// Determine if can gather
function canGather(start, dest, map) {
	if (start.x == dest.x) {
		if (start.y == dest.y - 1) {
			return "W";
		} else if (start.y == dest.y + 1 ) {
			return "E";
		} else {
			return false;
		}
	} else if (start.y == dest.y) {
		if (start.x == dest.x - 1) {
			return "N";
		} else if (start.x == dest.x + 1) {
			return "S";
		} else {
			return false;
		}
	}
	return false;
}
