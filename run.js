const NodeClient = require('./node-client');

// var Unit = require("./Unit");
var Worker = require("./Worker");

let ip = process.argv.length > 2 ? process.argv[2] : '127.0.0.1';
let port = process.argv.length > 3 ? process.argv[3] : '8080';

let map = [];

for (var i = 0; i<101; i++) {
  map[i] = new Array(100).fill(null);
}


let mapUnits = [];


function transpose(unit) {
  unit.x += 50;
  unit.y += 50;
  return unit;
}

console.log(map);


let client = new NodeClient(ip, port, dataUpdates => {
  updateMap(dataUpdates, map);
  updateUnits(dataUpdates);
  updateUnits(dataUpdates);
}, () => {
  let cmds = generateCommands(mapUnits, map);
  // console.log(cmds);
  return cmds;
});

function updateMap(dataUpdates) {

  for (var key in dataUpdates.tile_updates) {
    tile = dataUpdates.tile_updates[key];
    transpose(tile);

    map[tile.x][tile.y] = tile;
  }

  // console.log(map[50][50]);
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
        default:
          console.log("you done screwed up big time!");

      }

      mapUnits[unit_update.id] = new Unit(unit_update);
    }
  }

  // // Update your units based on data updates
  // // Currently this code just maintains an array of your unit's ids
  // let ids = units.concat(dataUpdates.unit_updates.map(u => u.id));
  // return ids.filter((val, idx) => ids.indexOf(val) === idx);
}

function generateCommands(units, map) {
  var result = [];

  for (var key in units) {
    unit = units[key];

    switch (unit.type) {
      case "worker":
        workerMove(unit);
        break;
      case "scout":
        scoutMove(unit);
        break;
      case "tank":
        tankMove(unit);
        break;
      default:
        console.log("you done screwed up big time!");

    }



    // result.push({
    //   command:"MOVE",
    //   dir: ['N','E','S','W'][Math.floor(Math.random() * 4)], unit: parseInt(key)
    // });
  }

  // console.log(result);
  return result;
}
