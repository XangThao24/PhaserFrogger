import Phaser from "phaser"
import purpleCar from "./assets/images/purpleCar.png"
import fireTruck from "./assets/images/fireTruck.png"
import yellowCar from "./assets/images/yellowCar.png"
import yellowBus from "./assets/images/yellowBus.png"
import redCar from "./assets/images/red_car.png"
import grass from "./assets/images/grass.jpg"
import road from "./assets/images/road.jpg"
import river from "./assets/images/river.gif"
const gameState = {}

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }
  preload() {
    this.load.image("grass", grass)
    this.load.image("road", road)
    this.load.image("purpleCar", purpleCar)
    this.load.image("fireTruck", fireTruck)
    this.load.image("yellowCar", yellowCar)
    this.load.image("yellowBus", yellowBus)
    this.load.image("redCar", redCar)
    this.load.image("river", river)
  }

  create() {
    const rowHeight = 42.9;
    const halfRowHeight = rowHeight/2;
    const carLogHeight = 600*.065

    let road = this.add.image(400, 10 * rowHeight + halfRowHeight , "road")
    road.displayHeight =  rowHeight * 5
    road.displayWidth=800

    let river = this.add.image(400, 4 * rowHeight + halfRowHeight, "river")
    river.displayHeight =  rowHeight * 5
    river.displayWidth=800

    let grass = this.add.image(400, 13 * rowHeight + halfRowHeight, "grass")
    grass.displayHeight =  carLogHeight
    grass.displayWidth=800

    let grass2 = this.add.image(400, 7 * rowHeight + halfRowHeight, "grass")
    grass2.displayHeight =  carLogHeight
    grass2.displayWidth=800

    let nest = this.add.image(400, rowHeight + halfRowHeight, "grass")
    nest.displayHeight =  carLogHeight
    nest.displayWidth=800

    let score = this.add.image(400, halfRowHeight, "grass")
    score.displayHeight =  carLogHeight
    score.displayWidth=800

    // let road1 = this.add.rectangle(400, 12 * rowHeight + halfRowHeight, 800, rowHeight, '#0fffff')
    // grass.displayHeight =  carLogHeight
    // grass.displayWidth=800

    // let road1 = this.add.rectangle(400, 11 * rowHeight + halfRowHeight, 800, rowHeight, '#0fffff')
    // grass.displayHeight =  carLogHeight
    // grass.displayWidth=800

    // let road1 = this.add.rectangle(400, 10 * rowHeight + halfRowHeight, 800, rowHeight, '#0fffff')
    // grass.displayHeight =  carLogHeight
    // grass.displayWidth=800

    // let road1 = this.add.rectangle(400, 9 * rowHeight + halfRowHeight, 800, rowHeight, '#0fffff')
    // grass.displayHeight =  carLogHeight
    // grass.displayWidth=800

    // let road1 = this.add.rectangle(400, 8 * rowHeight + halfRowHeight, 800, rowHeight, '#0fffff')
    // grass.displayHeight =  carLogHeight
    // grass.displayWidth=800

    gameState.redCar = this.physics.add.sprite(600,  5 * rowHeight + halfRowHeight, "purpleCar")
    gameState.redCar.displayWidth=800*.1; 
    // gameState.redCar.displayHeight=600*.1; 
    // height of the canvas * (13 rows/(2/height))
    // height * (13/(2/height))
    gameState.redCar.displayHeight= carLogHeight;
    gameState.redCar.setCollideWorldBounds(true)

    gameState.redCar1 = this.physics.add.sprite(600, halfRowHeight, "fireTruck")
    gameState.redCar1.displayWidth=800*.2; 
    gameState.redCar1.displayHeight= carLogHeight; 

    gameState.redCar2 = this.physics.add.sprite(600, rowHeight + halfRowHeight, "yellowBus")
    gameState.redCar2.displayWidth=800*.2; 
    gameState.redCar2.displayHeight= carLogHeight; 

    gameState.redCar3 = this.physics.add.sprite(600, 2 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar3.displayWidth=800*.1; 
    gameState.redCar3.displayHeight= carLogHeight; 

    gameState.redCar4 = this.physics.add.sprite(600, 3 * rowHeight + halfRowHeight, "redCar")
    gameState.redCar4.displayWidth=800*.1; 
    gameState.redCar4.displayHeight= carLogHeight; 

    gameState.redCar5 = this.physics.add.sprite(600,  4 * rowHeight + halfRowHeight, "purpleCar")
    gameState.redCar5.displayWidth=800*.1; 
    gameState.redCar5.displayHeight= carLogHeight; 

    gameState.redCar6 = this.physics.add.sprite(600, 6 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar6.displayWidth=800*.1; 
    gameState.redCar6.displayHeight= carLogHeight; 

    gameState.redCar7 = this.physics.add.sprite(600, 7 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar7.displayWidth=800*.1; 
    gameState.redCar7.displayHeight= carLogHeight; 

    gameState.redCar8 = this.physics.add.sprite(600, 8 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar8.displayWidth=800*.1; 
    gameState.redCar8.displayHeight= carLogHeight; 

    gameState.redCar9 = this.physics.add.sprite(600, 9 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar9.displayWidth=800*.1; 
    gameState.redCar9.displayHeight= carLogHeight; 

    gameState.redCar10 = this.physics.add.sprite(600, 10 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar10.displayWidth=800*.1; 
    gameState.redCar10.displayHeight= carLogHeight; 

    gameState.redCar11 = this.physics.add.sprite(600, 11 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar11.displayWidth=800*.1; 
    gameState.redCar11.displayHeight= carLogHeight; 

    gameState.redCar12 = this.physics.add.sprite(600, 12 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar12.displayWidth=800*.1; 
    gameState.redCar12.displayHeight= carLogHeight; 

    gameState.redCar13 = this.physics.add.sprite(600, 13 * rowHeight + halfRowHeight, "yellowCar")
    gameState.redCar13.displayWidth=800*.1; 
    gameState.redCar13.displayHeight= carLogHeight; 

    let text = this.add.text(50, 50, "testing")
    text.setInteractive()
    text.on("pointerdown", () => {
      this.scene.stop('Game')
			this.scene.start('Landing')
    })

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
      gameState.redCar.setVelocityX(100)
      // gameState.redCar.destroy()
      // delete gameState.redCar
    }
    if(gameState.redCar.x >= 500) {
      gameState.redCar.setVelocityX(-100)
    }
    
    // gameState.redCar1.setVelocityX(-100);
    if(gameState.redCar1 && gameState.redCar1.x <= 100) {
      gameState.redCar1.setVelocityX(100)
      // gameState.redCar1.destroy()
      // delete gameState.redCar1
    }
    if(gameState.redCar1.x >= 500) {
      gameState.redCar1.setVelocityX(-100)
    }

    if(gameState.redCar2 && gameState.redCar2.x <= 100) {
      gameState.redCar2.setVelocityX(100)
      // gameState.redCar2.destroy()
      // delete gameState.redCar2
    }
    if(gameState.redCar2.x >= 500) {
      gameState.redCar2.setVelocityX(-100)
    }
  
    if(gameState.redCar3 && gameState.redCar3.x <= 100) {
      gameState.redCar3.setVelocityX(100)
      // gameState.redCar3.destroy()
      // delete gameState.redCar3
    }
    if(gameState.redCar3.x >= 500) {
      gameState.redCar3.setVelocityX(-100)
    }
   
    if(gameState.redCar4 && gameState.redCar4.x <= 100) {
      gameState.redCar4.setVelocityX(100)
      // gameState.redCar4.destroy()
      // delete gameState.redCar4
    }
    if(gameState.redCar4.x >= 500) {
      gameState.redCar4.setVelocityX(-100)
    }
   
    if(gameState.redCar5 && gameState.redCar5.x <= 100) {
      gameState.redCar5.setVelocityX(100)
      // gameState.redCar5.destroy()
      // delete gameState.redCar5
    }
    if(gameState.redCar5.x >= 500) {
      gameState.redCar5.setVelocityX(-100)
    }
    
  }
}

export default Game