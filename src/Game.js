import Phaser from "phaser"
import purpleCar from "./assets/images/purpleCar.png"
import fireTruck from "./assets/images/fireTruck.png"
import yellowCar from "./assets/images/yellowCar.png"
import yellowBus from "./assets/images/yellowBus.png"
import grass from "./assets/images/grass.jpg"
import road from "./assets/images/road.jpg"
import river from "./assets/images/river.gif"
import whiteVan from "./assets/images/whiteVan.png"
import spaceCar from "./assets/images/spaceCar.png"
import greySport from "./assets/images/greySport.png"
import policeCar from "./assets/images/policeCar.png"
import redSport from "./assets/images/redSport.png"
import redCar from "./assets/images/redCar.png"
import greenTruck from "./assets/images/greenTruck.png"

const gameState = {
  lives: 3
}

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
    this.load.image("river", river)
    this.load.image("whiteVan", whiteVan)
    this.load.image("spaceCar", spaceCar)
    this.load.image("greySport", greySport)
    this.load.image("policeCar", policeCar)
    this.load.image("redCar", redCar)
    this.load.image("redSport", redSport)
    this.load.image("greenTruck", greenTruck)
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



    gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
    gameState.redCar.displayWidth=800*.1; 
    gameState.redCar.displayHeight= carLogHeight;
    gameState.redCar.setCollideWorldBounds(true)


    let text = this.add.text(50, 50, "testing")
    text.setInteractive()
    text.on("pointerdown", () => {
      this.scene.stop('Game')
			this.scene.start('Landing')
    })

    const vehicles = this.physics.add.group();
  
    function genItem1 () {
      let cars = ["whiteVan", "policeCar", "purpleCar"]
      let randomCar = Math.floor(Math.random() * 3)
      let roadY1 = 8 * rowHeight + halfRowHeight
      let vehicle = vehicles.create(10, roadY1, cars[randomCar])
      vehicle.displayWidth=800*.1
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(75)
      
    }

    const bugGenLoop = this.time.addEvent({
      delay: 4000,
      callback: genItem1,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(gameState.redCar, vehicles, function(redCar) {
      redCar.destroy();
      // delete gameState.redCar
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
        gameState.redCar.displayWidth=800*.1; 
        gameState.redCar.displayHeight= carLogHeight;
        gameState.redCar.setCollideWorldBounds(true)
      if(gameState.lives === 0) {
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles2 = this.physics.add.group();

    function genItem2 () {
      let cars = ["redCar", "spaceCar", "whiteVan"]
      let randomCar = Math.floor(Math.random() * 3)
      let roadY1 = 9 * rowHeight + halfRowHeight
      let vehicle = vehicles2.create(800, roadY1, cars[randomCar])
      vehicle.displayWidth=800*.1
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(-95)
      
    }

    const bugGenLoop2 = this.time.addEvent({
      delay: 6000,
      callback: genItem2,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(gameState.redCar, vehicles2, function(redCar) {
      redCar.destroy();
      // delete gameState.redCar
      gameState.lives -= 1
      if(gameState.lives > 0) {
        gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
        gameState.redCar.displayWidth=800*.1; 
        gameState.redCar.displayHeight= carLogHeight;
        gameState.redCar.setCollideWorldBounds(true)
      } else {
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles3 = this.physics.add.group();

    function genItem3 () {

      let roadY1 = 10 * rowHeight + halfRowHeight
      let vehicle = vehicles3.create(10, roadY1, 'purpleCar')
      vehicle.displayWidth=800*.1
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(70)
      
    }

    const bugGenLoop3 = this.time.addEvent({
      delay: 5000,
      callback: genItem3,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(gameState.redCar, vehicles3, function(redCar) {
      redCar.destroy();
      // delete gameState.redCar
      gameState.lives -= 1
      gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
        gameState.redCar.displayWidth=800*.1; 
        gameState.redCar.displayHeight= carLogHeight;
        gameState.redCar.setCollideWorldBounds(true)
      if(gameState.lives === 0) {
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles4 = this.physics.add.group();

    function genItem4 () {
      let cars = ["yellowCar", "spaceCar", "greySport"]
      let randomCar = Math.floor(Math.random() * 3)

      let roadY1 = 11 * rowHeight + halfRowHeight
      let vehicle = vehicles4.create(800, roadY1, cars[randomCar])
      vehicle.displayWidth=800*.1
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(-85)
      
    }

    const bugGenLoop4 = this.time.addEvent({
      delay: 3000,
      callback: genItem4,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(gameState.redCar, vehicles4, function(redCar) {
      redCar.destroy();
      // delete gameState.redCar
      gameState.lives -= 1
      if(gameState.lives > 0) {
        gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
        gameState.redCar.displayWidth=800*.1; 
        gameState.redCar.displayHeight= carLogHeight;
        gameState.redCar.setCollideWorldBounds(true)
      } else {
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles5 = this.physics.add.group();

    function genItem5 () {
      let cars = ["fireTruck", "yellowBus", "whiteVan"]
      let randomCar = Math.floor(Math.random() * 3)

      let roadY1 = 12 * rowHeight + halfRowHeight
      let vehicle = vehicles5.create(10, roadY1, cars[randomCar])
      vehicle.displayWidth=800*.2
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(55)
      
    }

    const bugGenLoop5 = this.time.addEvent({
      delay: 7500,
      callback: genItem5,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(gameState.redCar, vehicles5, function(redCar) {
      redCar.destroy();
      // delete gameState.redCar
      gameState.lives -= 1
      if(gameState.lives > 0) {
        gameState.redCar = this.physics.add.sprite(400,  13 * rowHeight + halfRowHeight, "purpleCar")
        gameState.redCar.displayWidth=800*.1; 
        gameState.redCar.displayHeight= carLogHeight;
        gameState.redCar.setCollideWorldBounds(true)
      } else {
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    this.input.keyboard.on('keyup_LEFT', function (event) {
      gameState.redCar.x -= rowHeight
    })
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      gameState.redCar.x += rowHeight
    })

    this.input.keyboard.on('keyup_DOWN', function (event) {
      gameState.redCar.y += rowHeight
    })

    this.input.keyboard.on('keyup_UP', function (event) {
      gameState.redCar.y -= rowHeight
    })

    gameState.livesLeft = this.add.text(400, 10, `Lives ${gameState.lives}`)

  }

  update() {
    

    // if(gameState.redCar && gameState.redCar.x <= 100) {
    //   gameState.redCar.setVelocityX(100)
    //   // gameState.redCar.destroy()
      // delete gameState.redCar
    // }
    
  }
}

export default Game