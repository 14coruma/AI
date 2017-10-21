var Unit = require("./Unit");
class Tank extends Unit {

  constructor(unit_update) {
    super(unit_update);
  }

  getType() {
    return "tank";
  }

}
module.exports = Tank;
