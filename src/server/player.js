const ObjectClass = require('./object');
const Bullet = require('./bullet');
const Constants = require('../shared/constants');
const { getRandomMath } = require('./utils');

class Player extends ObjectClass {
  constructor(id, username, x, y) {
    super(id, x, y, Math.random() * 2 * Math.PI, Constants.PLAYER_SPEED);
    this.username = username;
    this.hp = Constants.PLAYER_MAX_HP;
    this.fireCooldown = 0;
    this.score = 0;
    this.mathQuestion = getRandomMath(1, 10);
  }

  // Returns a newly created bullet, or null.
  update(dt) {
    super.update(dt);

    // Update score
    this.score += dt * Constants.SCORE_PER_SECOND;

    // Make sure the player stays in bounds
    this.x = Math.max(0, Math.min(Constants.MAP_SIZE, this.x));
    this.y = Math.max(0, Math.min(Constants.MAP_SIZE, this.y));

    // Fire a bullet, if needed
    this.fireCooldown -= dt;
    if (this.fireCooldown <= 0) {
      this.fireCooldown += Constants.PLAYER_FIRE_COOLDOWN;
      return new Bullet(this.id, this.x, this.y, this.direction);
    }

    return null;
  }

  takeBulletDamage() {
    this.hp -= Constants.BULLET_DAMAGE;
    this.mathQuestion = getRandomMath(1, 10);
  }

  onDealtDamage() {
    this.score += Constants.SCORE_BULLET_HIT;
  }

  findClosestPlayerFrom(players) {
    // Figures out what player to fire at - should be replaced with something in game.js to point to player with answer needed
    let opponents = {}
    let closest_so_far = 0
    let closest_id = ""
    Object.keys(players).forEach(opponentID => {
      let opponent = players[opponentID]

      console.log(opponentID, this.id)
      if (opponentID != this.id){
        
        let d = this.distanceTo(opponent)
        if (d < closest_so_far || closest_so_far === 0){
          closest_id = opponentID
          closest_so_far = d
        }
        opponents[opponentID] = d;
      }
      
    })
    // Return the opponent with the lowest distance from player
    
    let closest_player = players[closest_id]
    console.log(players, closest_id, closest_player)
    return closest_player
  }
  serializeForUpdate() {
    return {
      ...(super.serializeForUpdate()),
      direction: this.direction,
      hp: this.hp,
    };
  }
}

module.exports = Player;
