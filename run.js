const NodeClient = require('./node-client');

var Unit = require("./Unit");
var Worker = require("./Worker");
var Scout = require("./Scout");

let ip = process.argv.length > 2 ? process.argv[2] : '127.0.0.1';
let port = process.argv.length > 3 ? process.argv[3] : '8080';

let map = [];

for (var i = 0; i<100; i++) {
  map[i] = new Array(100).fill({visible: false, TTL: 0});
}


let mapUnits = [];


function transpose(unit) {
  unit.x += 50;
  unit.y += 50;
  return unit;
}

// console.log(map);


let client = new NodeClient(ip, port, dataUpdates => {
  updateMap(dataUpdates, map);
  updateUnits(dataUpdates);
  updateUnits(dataUpdates);
}, () => {
  let cmds = generateCommands();
  // console.log(cmds);
  return cmds;
});

function updateMap(dataUpdates) {

  for (var key in dataUpdates.tile_updates) {
    tile = dataUpdates.tile_updates[key];
    transpose(tile);
    tile.TTL = 0;

    map[tile.x][tile.y] = tile;
    // console.log("Updated tile " + tile.x + ", " + tile.y);
  }

  // Loop through the map and set the time since update back
  for (var i = 0; i<100; i++) {
    for (var j = 0; j<100; j++) {
      // If the tile exists, then set the TTL back
      if (map[i] && map[i][j] && map[i][j].visible == false) {
        map[i][j].TTL += 1;
      }
    }
  }

  // console.log(map);
}

function updateUnits(dataUpdates) {

  for (var key in dataUpdates.unit_updates) {
    unit_update = dataUpdates.unit_updates[key];

    // Update unit if it exists, otherwise create a new one
    // TODO: delete dead units?
    if (mapUnits[unit_update.id]) {
      mapUnits[unit_update.id].update(unit_update);
    }
    else {

      switch (unit_update.type) {
        case "worker":
          mapUnits[unit_update.id] = new Worker(unit_update);
          break;
        case "scout":
          mapUnits[unit_update.id] = new Scout(unit_update);
          break;
        case "tank":
          mapUnits[unit_update.id] = new Tank(unit_update);
          break;
        case "base":
          //TODO: base stuff
          // mapUnits[unit_update.id] = new Tank(unit_update);
          break;
        default:
          console.log("you done screwed up big time again!");
          console.log(unit_update);

      }

      // mapUnits[unit_update.id] = new Unit(unit_update);
    }
  }

  // // Update your units based on data updates
  // // Currently this code just maintains an array of your unit's ids
  // let ids = units.concat(dataUpdates.unit_updates.map(u => u.id));
  // return ids.filter((val, idx) => ids.indexOf(val) === idx);
}

var didTest = 0;

function generateCommands() {
  var result = [];

  if (!didTest) result.push({command: "CREATE", type: "scout"});
  didTest = 1;

  for (var key in mapUnits) {
    cur_unit = mapUnits[key];

    cur_move = cur_unit.getMove(map);

    if (typeof cur_move != 'undefined') result.push(cur_move);

    // switch (cur_unit.getType()) {
    //   case "worker":
    //     // workerMove(cur_unit);
    //     break;
    //   case "scout":
    //     cur_unit(cur_unit);
    //     break;
    //   case "tank":
    //     // tankMove(cur_unit);
    //     break;
    //   default:
    //     console.log("you done screwed up big time!");
    // }



    // result.push({
    //   command:"MOVE",
    //   dir: ['N','E','S','W'][Math.floor(Math.random() * 4)], unit: parseInt(key)
    // });
  }

  console.log(result);
  return result;
}
