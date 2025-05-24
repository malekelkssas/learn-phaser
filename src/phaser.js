import Phaser from "phaser";

const config = {
  width: 800,
  height: 600,
  parent: "game",
  physics: {
    default: "arcade"
  },
  scene: {
    preload,
    create
  }
}

function preload () {
  this.load.image("sky", "assets/sky.png")
}

function create () {
  this.add.image(0, 0, "sky").setOrigin(0);
}

export default config