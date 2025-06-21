import Phaser from "phaser";
import { BIRD_KEY, PIPE_KEY, SKY_KEY } from "../constants/game-object-keys.constants";

class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super("PreloadScene");
        this.config = config;
    }

    preload() {
        this.load.image(SKY_KEY, "assets/sky.png")
        this.load.image(BIRD_KEY, "assets/bird.png")
        this.load.image(PIPE_KEY, "assets/pipe.png")
    }

    create () {
        this.scene.start("MenuScene")
    }
}

export default PreloadScene;