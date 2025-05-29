import Phaser from "phaser";

const SKY_KEY = "sky";
const BIRD_KEY = "bird";

const config = {
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade"
  },
  scene: {
    preload,
    create,
    update
  }
}

function preload () {
  this.load.image(SKY_KEY, "assets/sky.png")
  this.load.image(BIRD_KEY, "assets/bird.png")
}

let bird;

function create () {
  this.add.image(0, 0, SKY_KEY).setOrigin(0);
  bird = this.physics.add.sprite(config.width / 2, config.height / 2, BIRD_KEY).setOrigin(0);
  bird.x = bird.x - bird.width / 2;
  bird.y = bird.y - bird.height / 2;

  // bird.body.velocity.y = 200;
  bird.body.gravity.y = 200;
}

function update (time, delta) {
  console.log(bird.body.velocity.y);
}


export default config