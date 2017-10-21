var Unit = require("./Unit");
var pathfinder = require("./pathfinder.js");
class Scout extends Unit {

  constructor(unit_update) {
    super(unit_update);

    this.stickyPath = 5; // Number of turns to attempt to reach the spot

    this.pathCountdown = this.stickyPath;
    this.destX;
    this.destY;

    this.randomMove;
  }

  getType() {
    return "scout";
  }

  changeRandomDest() {
    // this.pathCountdown = this.stickyPath;
    //
    // this.destX = Math.random()*50;
    // this.destX = Math.random()*50;

  }

  changeRandomMove() {
    this.randomMove = {command: "MOVE", unit: this.id, dir: ['N','E','S','W'][Math.floor(Math.random() * 4)]};
  }

  getMove(map) {

    // if (this.pathCountdown < 0) {
    //   this.pathCountdown = this.stickyPath;
    //   this.changeRandomMove();
    // }
    // this.pathCountdown--;
    //
    // return(this.randomMove);


    var nextMove = pathfinder.getNextMove({x: this.x, y: this.y}, {x: 20,y: 20}, pathfinder.createMapMask(map));

    console.log(nextMove);

    this.randomMove = {command: "MOVE", unit: this.id, dir: nextMove};

  }

}
module.exports = Scout;
