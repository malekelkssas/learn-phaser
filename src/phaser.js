import MenuScene from "./scenes/MenuScene";
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/PreloadScene";



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
  scene: [ PreloadScene, new MenuScene(SHARED_CONFIG) ,new PlayScene(SHARED_CONFIG)]
}
export default config