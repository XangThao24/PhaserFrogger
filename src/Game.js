import Phaser from "phaser"
const gameState = {}

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }

  preload() {
    this.load.image("frog", "src/assets/images/landing.png")
  }

  create() {

    this.add.text(50, 50, "testing")
    gameState.frog = this.physics.add.sprite(320, 300, 'frog');
    gameState.frog.scaleX= .1
    gameState.frog.scaleY= .1
    gameState.frog.setCollideWorldBounds(true)
    // gameState.frog.setInteractive()
    // gameState.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keyup_LEFT', function (event) {
      gameState.frog.x -= 10
    })
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      gameState.frog.x += 10
    })

    this.input.keyboard.on('keyup_DOWN', function (event) {
      gameState.frog.y += 10
    })

    this.input.keyboard.on('keyup_UP', function (event) {
      gameState.frog.y -= 10
    })

  }

  update() {
    // if (gameState.cursors.left.isDown) {
    //   gameState.frog.x -= 10
    // } else if(gameState.cursors.right.isDown) {
    //   gameState.frog.x += 10
    // } else if(gameState.cursors.down.isDown) {
    //   gameState.frog.y += 10
    // } else if(gameState.cursors.up.isDown) {
    //   gameState.frog.y -= 10
    // } else {
      
    // }
  }
}

export default Game