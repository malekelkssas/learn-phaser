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