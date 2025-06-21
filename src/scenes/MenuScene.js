import BaseScene from "./BaseScene"

class MenuScene extends BaseScene {
    constructor(config) {
        super("MenuScene", config);
        this.config = config;
    }

    create() {
        super.create();        

        super.createMenu([
            { playScene: "PlayScene", text: "Play"},
            { playScene: "ScoreScene", text: "Score"}
        ])
    }
}

export default MenuScene;