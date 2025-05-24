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
