var Unit = require("./Unit");
class Scout extends Unit {

  constructor(unit_update) {
    super(unit_update);
  }

  getType() {
    return "scout";
  }

}
module.exports = Scout;
