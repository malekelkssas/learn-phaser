const SKY_KEY = "sky";
const BIRD_KEY = "bird";

const config = {
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 300
      }
    }
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
let bird2;
let totalDelta = 0;
const VELOCITY = 200

function create () {
  this.add.image(0, 0, SKY_KEY).setOrigin(0);
  bird = this.physics.add.sprite(config.width / 2, config.height / 2, BIRD_KEY).setOrigin(0);
  bird.x = bird.x - bird.width / 2;
  bird.y = bird.y - bird.height / 2;

  // bird2 = this.add.sprite(config.width / 2, config.height / 2, BIRD_KEY).setOrigin(0);
  this.input.on("pointerdown", flap)
  this.input.keyboard.on("keydown_SPACE", flap)

  // bird.body.velocity.x = VELOCITY;
  // bird.body.gravity.y = 200;
}

function update (time, delta) {
  // debugger
  // console.log()
  // if(bird.x > config.width - bird.width) bird.body.velocity.x = -VELOCITY;
  // if(bird.x < 0) bird.body.velocity.x = VELOCITY;

  // totalDelta += delta;

  // if(totalDelta < 1000) return;
  // totalDelta = 0;

  // console.log(bird);
  // bird.destroy();
  // console.log(bird2.body.velocity.y);

}

function flap () {
  console.log("keydown")
  // debugger;
  bird.body.velocity.y = -VELOCITY;
}


export default config