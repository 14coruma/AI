var Unit = require("./Unit");
class Worker extends Unit {

  constructor(unit_update) {
    super(unit_update);
  }

  getType() {
    return "worker";
  }

  getMove() {
    // Override with method to return the next move

    // return the array with the move
  }

}
module.exports = Worker;
