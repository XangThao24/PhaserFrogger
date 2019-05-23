import Phaser from "phaser"
import purpleCar from "./assets/images/purpleCar.png"
const gameState = {}

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }

  preload() {
    this.load.image("purpleCar", purpleCar)
  }

  create() {

    let text = this.add.text(50, 50, "testing")
    text.setInteractive()
    text.on("pointerdown", () => {
      this.scene.stop('Game')
			this.scene.start('Landing')
    })

    gameState.redCar = this.physics.add.sprite(600, 600, "purpleCar")
    gameState.redCar.displayWidth=800*.1; 
    gameState.redCar.displayHeight=600*.1; 
    gameState.redCar.setCollideWorldBounds(true)

    gameState.redCar1 = this.physics.add.sprite(600, 100, "purpleCar")
    gameState.redCar1.displayWidth=800*.1; 
    gameState.redCar1.displayHeight=600*.1; 

    gameState.redCar2 = this.physics.add.sprite(600, 200, "purpleCar")
    gameState.redCar2.displayWidth=800*.1; 
    gameState.redCar2.displayHeight=600*.1; 

    gameState.redCar3 = this.physics.add.sprite(600, 300, "purpleCar")
    gameState.redCar3.displayWidth=800*.1; 
    gameState.redCar3.displayHeight=600*.1; 

    gameState.redCar4 = this.physics.add.sprite(600, 400, "purpleCar")
    gameState.redCar4.displayWidth=800*.1; 
    gameState.redCar4.displayHeight=600*.1; 

    gameState.redCar5 = this.physics.add.sprite(600, 500, "purpleCar")
    gameState.redCar5.displayWidth=800*.1; 
    gameState.redCar5.displayHeight=600*.1; 

    this.input.keyboard.on('keyup_LEFT', function (event) {
      gameState.redCar.x -= 18.4
    })
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      gameState.redCar.x += 18.4
    })

    this.input.keyboard.on('keyup_DOWN', function (event) {
      gameState.redCar.y += 18.4
    })

    this.input.keyboard.on('keyup_UP', function (event) {
      gameState.redCar.y -= 18.4
    })

  }

  update() {
    

    if(gameState.redCar && gameState.redCar.x <= 100) {
      gameState.redCar.setVelocityX(55)
      // gameState.redCar.destroy()
      // delete gameState.redCar
    }
    if(gameState.redCar.x >= 500) {
      gameState.redCar.setVelocityX(-55)
    }
    
    // gameState.redCar1.setVelocityX(-55);
    if(gameState.redCar1 && gameState.redCar1.x <= 100) {
      gameState.redCar1.setVelocityX(55)
      // gameState.redCar1.destroy()
      // delete gameState.redCar1
    }
    if(gameState.redCar1.x >= 500) {
      gameState.redCar1.setVelocityX(-55)
    }

    if(gameState.redCar2 && gameState.redCar2.x <= 100) {
      gameState.redCar2.setVelocityX(55)
      // gameState.redCar2.destroy()
      // delete gameState.redCar2
    }
    if(gameState.redCar2.x >= 500) {
      gameState.redCar2.setVelocityX(-55)
    }
  
    if(gameState.redCar3 && gameState.redCar3.x <= 100) {
      gameState.redCar3.setVelocityX(55)
      // gameState.redCar3.destroy()
      // delete gameState.redCar3
    }
    if(gameState.redCar3.x >= 500) {
      gameState.redCar3.setVelocityX(-55)
    }
   
    if(gameState.redCar4 && gameState.redCar4.x <= 100) {
      gameState.redCar4.setVelocityX(55)
      // gameState.redCar4.destroy()
      // delete gameState.redCar4
    }
    if(gameState.redCar4.x >= 500) {
      gameState.redCar4.setVelocityX(-55)
    }
   
    if(gameState.redCar5 && gameState.redCar5.x <= 100) {
      gameState.redCar5.setVelocityX(55)
      // gameState.redCar5.destroy()
      // delete gameState.redCar5
    }
    if(gameState.redCar5.x >= 500) {
      gameState.redCar5.setVelocityX(-55)
    }
    
  }
}

export default Game