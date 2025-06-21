import Phaser from "phaser"; 
import { SKY_KEY } from "../constants/game-object-keys.constants";

class BaseScene extends Phaser.Scene {
    constructor (key, config) { 
        super(key);
        this.config = config;
        this.screenCenter = {
            xCenter: this.config.width / 2,
            yCenter: this.config.height / 3,
        };
        this.yPadding = 42;
    }

    create () {
        this.add.image(0, 0, SKY_KEY).setOrigin(0);
    }

    /**
     * 
     * @param {
     * playScene: the key of the scene
     * text: the scene button text
     * }[] menu 
     */
    createMenu (menu) {
        let lastYPosition = 0;
        menu.forEach(element => {
            this.add.text(
                this.screenCenter.xCenter,
                this.screenCenter.yCenter + lastYPosition,
                element.text,
                { fontSize: "34px", fill: "#CADDFF" }
            ).setOrigin(0.5, 1);
            lastYPosition += this.yPadding;
        });
    }
}

export default BaseScene