var Unit = require("./Unit");
class Scout extends Unit {

  constructor(unit_update) {
    super(unit_update);
  }

  getType() {
    return "scout";
  }

  getMove(map) {

    // Algorithm

    // Look for areas of the map that haven't been updated in the longest
    // Go to those areas

    // Convert the map into a 10x10 area , since that is the size of the map
    // divided by range of the scout
    var smallMap = [];
    smallMap = new Array(10).fill(new Array(10).fill(null));


    for (var i = 0; i<100; i++) {
      for (var j = 0; j<100; j++) {

        if (map[i] && map[i][j] && map[i][j].TTL) {
          smallMap[Math.floor(i/10)][Math.floor(j/10)] += map[i][j].TTL;
        }
        // else {
        //   smallMap[Math.floor(i/10)][Math.floor(j/10)] += 10;
        // }
      }
    }

    // for (var i = 0; i<10; i++) {
    //   for (var j = 0; j<10; j++) {
    //     process.stdout.write(smallMap[i][j] + "\t");
    //   }
    //   process.stdout.write("\n");
    // }


    return({command: "MOVE", unit: this.id, dir: ['N','E','S','W'][Math.floor(Math.random() * 4)]});
  }

}
module.exports = Scout;
