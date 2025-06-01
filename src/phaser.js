import PlayScene from "./scenes/PlayScene";



const SHARED_CONFIG = {
  width: 800,
  height: 600,
}

const config = {
  ...SHARED_CONFIG,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
}
export default config