class Unit {
  constructor(unit_update) {
    this.id                       = unit_update.id;
    this.player_id                = unit_update.player_id;
    this.x                        = unit_update.x;
    this.y                        = unit_update.y;
    this.status                   = unit_update.status;
    this.health                   = unit_update.health;
    this.can_attack               = unit_update.can_attack;
    this.range                    = unit_update.range;
    this.speed                    = unit_update.speed;
    this.resource                 = unit_update.resource;
    this.attack_damage            = unit_update.attack_damage;
    this.attack_cooldown_duration = unit_update.attack_cooldown_duration;
    this.attack_cooldown          = unit_update.attack_cooldown;
    this.attack_type              = unit_update.attack_type;
  }

  // Changes the unit's mape coordinates to fit into the array correctly
  transpose() {
    this.x += 50;
    this.y += 50;
  }

  update(unit_update) {
    // Check if the ID is the same, otherwise return an error code
    if (unit_update.id != this.id) {
      return false;
    }

    this.x                        = unit_update.x;
    this.y                        = unit_update.y;
    this.status                   = unit_update.status;
    this.health                   = unit_update.health;
    this.can_attack               = unit_update.can_attack;
    this.range                    = unit_update.range;
    this.speed                    = unit_update.speed;
    this.resource                 = unit_update.resource;
    this.attack_damage            = unit_update.attack_damage;
    this.attack_cooldown_duration = unit_update.attack_cooldown_duration;
    this.attack_cooldown          = unit_update.attack_cooldown;
    this.attack_type              = unit_update.attack_type;

    this.transpose(); // Update the map coords
    return true;
  }


  getMove(map) {
    // Override with method to return the next move
  }


}
module.exports = Unit;
