import Phaser from "phaser";

const SKY_KEY = "sky";
const BIRD_KEY = "bird";
const PIPE_KEY = "pipe";
const VELOCITY = 200;
const PIPE_VERTICAL_DISTANCE = [100, 200];
const PIPE_X_SPEED = -200;
const NUM_PIPES = 4;
class PlayScene extends Phaser.Scene {
    constructor(config) {
        // Unique identifier/key for the scene
        super("PlayScene");
        // Configuration object
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.pipeHorizontalDistance = 0;
        this.initialPosition = {
            x: 0,
            y: 0
        };
    }

    preload() {
        this.load.image(SKY_KEY, "assets/sky.png")
        this.load.image(BIRD_KEY, "assets/bird.png")
        this.load.image(PIPE_KEY, "assets/pipe.png")
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.width / 4, this.config.height / 2, BIRD_KEY).setOrigin(0);
        this.bird.x = this.bird.x - this.bird.width / 2;
        this.bird.y = this.bird.y - this.bird.height / 2;
        this.bird.body.gravity.y = 300;
        this.initialPosition = { x: this.bird.x, y: this.bird.y };
    }

    create() {
        this.add.image(0, 0, SKY_KEY).setOrigin(0);
        // Create the bird
        this.createBird();


        // Create the pipes
        this.pipes = this.physics.add.group();
        for (let i = 0; i < NUM_PIPES; i++) {
            const upperPipe = this.pipes.create(0, 0, PIPE_KEY).setOrigin(0, 1);
            const lowerPipe = this.pipes.create(0, 0, PIPE_KEY).setOrigin(0, 0);
            this.placePipe(upperPipe, lowerPipe);
        }
        this.pipes.setVelocityX(PIPE_X_SPEED);

        // Handle input
        this.createHandleInput();

    }

    createHandleInput() {
        this.input.on("pointerdown", this.flap, this)
        this.input.keyboard.on("keydown_SPACE", this.flap, this)
    }

    getTheRightMostPipe() {
        let rightMostPipe = 0;
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.x > rightMostPipe) {
                rightMostPipe = pipe.x;
            }
        })

        return rightMostPipe;
    }

    placePipe(upperPipe, lowerPipe) {
        this.pipeHorizontalDistance = this.getTheRightMostPipe() + this.config.width / 2;
        const pipeDistance = Phaser.Math.Between(...PIPE_VERTICAL_DISTANCE);
        const pipeYPosition = Phaser.Math.Between(0 + 30, this.config.height - pipeDistance - 30);
        upperPipe.y = pipeYPosition;
        lowerPipe.y = pipeYPosition + pipeDistance;
        upperPipe.x = this.pipeHorizontalDistance;
        lowerPipe.x = this.pipeHorizontalDistance;
    }

    recylePipes() {
        const rightMostPipe = this.getTheRightMostPipe() + this.config.width / 2;
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right < 0) {
                pipe.x = rightMostPipe;
            }
        })
    }

    resetBird() {
        this.bird.x = this.initialPosition.x;
        this.bird.y = this.initialPosition.y;
        this.bird.body.velocity.y = 0;
    }

    flap() {
        this.bird.body.velocity.y = -VELOCITY;
    }

    update(time, delta) {
        // Add what you want to track/update here on frame level
        if (this.bird.y > this.config.height || this.bird.y < 0) {
            this.resetBird();
            alert("You lost!")
        }

        this.recylePipes();

        // if(totalDelta < 1000) return;
        // totalDelta = 0;

        // Add what you want to track/update here on second level
    }
}

export default PlayScene;