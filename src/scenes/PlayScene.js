import Phaser from "phaser";
import { SKY_KEY, BIRD_KEY, PIPE_KEY } from "../constants/game-object-keys.constants";
import BaseScene from "./BaseScene";

const VELOCITY = 200;
const PIPE_VERTICAL_DISTANCE = [100, 200];
const PIPE_X_SPEED = -200;
const NUM_PIPES = 4;
class PlayScene extends BaseScene {
    constructor(config) {
        // Unique identifier/key for the scene
        super("PlayScene", config);
        // Configuration object
        this.config = config;
        this.bird = null;
        this.pipes = null;
        this.pipeHorizontalDistance = 0;
        this.initialPosition = {
            x: 0,
            y: 0
        };
        this.score = 0;
        this.scoreText = new String();
        this.isScenePaused = false;
    }

    createBird() {
        this.bird = this.physics.add.sprite(this.config.width / 4, this.config.height / 2, BIRD_KEY).setOrigin(0);
        this.bird.x = this.bird.x - this.bird.width / 2;
        this.bird.y = this.bird.y - this.bird.height / 2;
        this.bird.body.gravity.y = 300;
        this.bird.setCollideWorldBounds(true);
        this.initialPosition = { x: this.bird.x, y: this.bird.y };
    }

    create() {
        super.create();
        // Create the bird
        this.createBird();


        // Create the pipes
        this.pipes = this.physics.add.group();
        for (let i = 0; i < NUM_PIPES; i++) {
            const upperPipe = this.pipes.create(0, 0, PIPE_KEY)
            .setImmovable(true) // Prevent the collision effect with the bird (Bounce effect)
            .setOrigin(0, 1);

            const lowerPipe = this.pipes.create(0, 0, PIPE_KEY)
            .setImmovable(true) // Prevent the collision effect with the bird (Bounce effect)
            .setOrigin(0, 0);

            this.placePipe(upperPipe, lowerPipe);
        }
        this.pipes.setVelocityX(PIPE_X_SPEED);

        // Handle input
        this.createHandleInput();

        // Create the collider
        this.createCollider();

        // Create the score text
        this.createScoreText();

    }

    createScoreText() {
        this.score = 0;
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: 24, fill: "#fff" });
        
    }

    createCollider() {
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    }

    createHandleInput() {
        this.input.on("pointerdown", this.flap, this)
        this.input.keyboard.on("keydown_SPACE", this.flap, this)
        this.input.keyboard.on("keydown_P", () => {
            if (this.isScenePaused) {
                this.physics.resume();
            } else {
                this.physics.pause();
            }
            this.isScenePaused = !this.isScenePaused;
        }, this)
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
        let isScoreIncremented = false;
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right < 0) {
                pipe.x = rightMostPipe;
                if (!isScoreIncremented) {
                    this.incrementScore();
                    isScoreIncremented = true;
                }
            }
        })
    }

    resetBird() {
        this.bird.x = this.initialPosition.x;
        this.bird.y = this.initialPosition.y;
        this.bird.body.velocity.y = 0;
    }

    gameOver() {
        this.bird.body.velocity.y = 0;
        this.bird.setTint(0xff0000);
        this.physics.pause();
        // key event if the space key is pressed
        this.input.keyboard.on("keydown_SPACE", () => {
            this.scene.restart();
        })

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.scene.restart();
            },
            loop: false
        })
    }

    flap() {
        this.bird.body.velocity.y = -VELOCITY;
    }

    update(time, delta) {
        // Add what you want to track/update here on frame level
        if (this.bird.getBounds().bottom >= this.config.height || this.bird.getBounds().top <= 0) {
            this.gameOver();
        }

        this.recylePipes();

        // if(totalDelta < 1000) return;
        // totalDelta = 0;

        // Add what you want to track/update here on second level
    }
    
    incrementScore() {
        this.score++;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}

export default PlayScene;