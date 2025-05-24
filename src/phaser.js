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
  this.add.image(config.width / 2, config.height / 2, "sky")
}

export default config