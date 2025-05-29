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

#### Physics Object
- In case to add sprite object with physics we add it using `this.physics.add.sprite(x, y, key)`
- We can then check/apply/modify anything from `body` Object then inside the sprite (which will just appear when add sprite using physics not a normal sprite) -> e.g. `$.body.gravity = 200`
- The gravity unit is by `pixels/s` and it is almost the same for everything (e.g. the velocity for example and so on)
