# Flappy Bird Clone with Phaser 3

A Flappy Bird clone implementation using Phaser 3 and Webpack 5.

## Phaser 3 Game Development Notes

### 1. Preload Function
```javascript
preload() {
    // Loading assets like images, music animations ...etc
}
```
- It is inserted inside the config -> scene object
- The Phaser file/game will have the context/scene object in the `this` keyword -> This because it is inside the scene object
- We Init object using `this.add.$` e.g.
  - `this.add.image(x, y, key)` -> (the key of the loaded asset in the preload function)

### 2. Create Function
```javascript
create() {
    // Init all the game objects inside it
}
```
- It is inserted inside the config -> scene object
- The Phaser file/game will have the context/scene object in the `this` keyword -> This because it is inside the scene object
- This will use mainly `this.load.$` e.g.
  - `this.add.image(key, path)` -> the key is any name we choose for it

### 3. Coordinate System
- The scene origin is on top left
  - The positive x is to right
  - The positive y is down
- The Image and resources
  - Its origin at the center of the image/resource
  - To make an image aligned with the scene origin you may do something like this:
    ```javascript
    this.add.image(config.width / 2, config.height / 2, key)
    ```
  - OR you can change the origin of the images by using setOrigin option:
    ```javascript
    this.add.image(0, 0, key).setOrigin(0, 0)
    ```
    This will make the origin of the image at the top left like the scene not in the middle
  - `setOrigin(x, y)` takes values between [0, 1] as:
    - The top left of the image is (0, 0)
    - Bottom right is (1, 1)
    - Whatever is the image size
  - Can have a short to one number if the `x` the same as `y` e.g. `setOrigin(0)`
  - ![Screenshot_٢٠٢٥٠٥٢٥_٠١٥٤٢٠](https://github.com/user-attachments/assets/ef2d7d42-891e-4dac-9f0d-fa608949f536)

### 4. Sprites
```javascript
// Like the images we add sprites the same way
this.add.sprite(x, y, key)
```
- The sprite Object like image object also have `setOrigin` func
- The main difference between the normal Image Object and Sprite is that we have much more control on the Sprite -> e.g. By destroying it and so on
- But in case we want to apply physics to the body (For this we must enable physics for the game first e.g. Arcade) -> then it is better to use `this.physics.sprite.add` -> then we will be able to use things like velocity and so on

### 5. Update Function
```javascript
update(time, delta) {
    // Game loop code here
}
```
- Mainly it is like the Game loop
- The Phaser file/game will have the context/scene object in the `this` keyword -> This because it is inside the scene object
- By default the game is updating by 60 fps
- It can be empty `update()` or have two main params `update(time, delta)`:
  - `time`: the time since the games started in ms
  - `delta`: the last frame update in ms
- Pretty example by setting the velocity in create function and tracking it then try to set the gravity and track the velocity

### 6. Physics
There are different options/plugins for physics in Phaser that manage physics simulations:
- arcade - a lightweight physics config

#### Physics Configuration
We can apply physics to every sprite game object by setting it inside the game config from the chosen physics model:
```javascript
const config = {
  // ... other config options
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 200
      }
    }
  }
}
```

#### Physics Object
- In case to add sprite object with physics we add it using `this.physics.add.sprite(x, y, key)`
- We can then check/apply/modify anything from `body` Object then inside the sprite (which will just appear when add sprite using physics not a normal sprite) -> e.g. `$.body.gravity = 200`
- The gravity unit is by `pixels/s` and it is almost the same for everything (e.g. the velocity for example and so on)

#### Physics Groups
Physics groups are collections of physics-enabled game objects that can be managed together. They're useful for handling multiple similar objects (like pipes in Flappy Bird):

```javascript
// Create a physics group
this.pipes = this.physics.add.group();

// Add sprites to the group
const upperPipe = this.pipes.create(0, 0, PIPE_KEY).setOrigin(0, 1);
const lowerPipe = this.pipes.create(0, 0, PIPE_KEY).setOrigin(0, 0);

// Apply physics properties to all objects in the group
this.pipes.setVelocityX(PIPE_X_SPEED);

// Access all objects in the group
this.pipes.getChildren().forEach(pipe => {
    // Do something with each pipe
});
```

Key features of physics groups:
- Create multiple physics objects with shared properties
- Apply physics operations to all objects at once
- Easily iterate through all objects in the group
- Manage similar game objects (like obstacles, enemies, or collectibles) efficiently

#### Controlling Update Frequency
We can control the update by tracking the total delta time. For example, if we want to perform an action every second (1000ms):

```javascript
let totalDelta = 0;

function update(time, delta) {
    totalDelta += delta;

    if(totalDelta < 1000) return;  // Skip if less than 1 second
    totalDelta = 0;  // Reset counter

    // Perform actions here
    console.log(bird);
    bird.destroy();
}
```

This pattern is useful when you want to perform actions at specific intervals rather than every frame.

### 7. Input Handling
Phaser provides several ways to handle user input, including mouse/touch and keyboard events. Here's how to set up basic input handling:

#### Mouse/Touch Input
```javascript
// In the create function
this.input.on("pointerdown", callbackFunction)
```
- `pointerdown` event works for both mouse clicks and touch events
- The callback function will be executed whenever the user clicks or touches the screen

#### Keyboard Input
```javascript
// In the create function
this.input.keyboard.on("keydown_SPACE", callbackFunction)
```
- The format is `keydown_` followed by the key name (e.g., SPACE, A, B, etc.)
- The callback function will be executed when the specified key is pressed

#### Example from our Flappy Bird Clone
```javascript
function create() {
    // ... other create code ...
    
    // Handle both mouse/touch and spacebar input
    this.input.on("pointerdown", flap)
    this.input.keyboard.on("keydown_SPACE", flap)
}

function flap() {
    // This function will be called when either:
    // 1. The user clicks/touches the screen
    // 2. The user presses the spacebar
    bird.body.velocity.y = -VELOCITY;
}
```

This setup allows for multiple input methods to trigger the same action, making the game more accessible across different devices and user preferences.

it is also created in the create function
