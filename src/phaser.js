import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game', // This targets your existing div id="game"
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

function preload() {
  this.load.image('sky', 'assets/sky.png');
}

function create() {
  this.add.image(400, 300, 'sky');
}

export default config;