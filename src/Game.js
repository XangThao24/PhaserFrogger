import Phaser from "phaser"
import purpleCar from "./assets/images/purpleCar.png"
import fireTruck from "./assets/images/fireTruck.png"
import yellowCar from "./assets/images/yellowCar.png"
import yellowBus from "./assets/images/yellowBus.png"
import grass from "./assets/images/grass.jpg"
import road from "./assets/images/street.png"
import river from "./assets/images/river.gif"
import whiteVan from "./assets/images/whiteVan.png"
import spaceCar from "./assets/images/spaceCar.png"
import greySport from "./assets/images/greySport.png"
import policeCar from "./assets/images/policeCar.png"
import redSport from "./assets/images/redSport.png"
import redCar from "./assets/images/redCar.png"
import greenTruck from "./assets/images/greenTruck.png"
import log from "./assets/images/log.png"
import playingSound from "./assets/sounds/playingSong.mp3"
import frogHopSound from "./assets/sounds/sound-frogger-hop.wav"
import frogSquashSound from "./assets/sounds/sound-frogger-squash.wav"
import frogSplashSound from "./assets/sounds/sound-frogger-plunk.wav"

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
    this.load.image("log", log)
    this.load.audio("playingSound", playingSound)
    this.load.audio("frogHopSound", frogHopSound)
    this.load.audio("frogSplashSound", frogSplashSound)
    this.load.audio("frogSquashSound", frogSquashSound)
  }
  create() {
    const rowHeight = 42.857;
    const halfRowHeight = rowHeight/2;
    const carLogHeight = 600*.065

    let road = this.add.image(400, 10 * rowHeight + halfRowHeight , "road")
    road.displayHeight =  rowHeight * 5
    road.displayWidth=800

    gameState.playingSound = this.sound.add("playingSound")
    gameState.playingSound.play()

    gameState.frogHopSound = this.sound.add("frogHopSound")

    gameState.frogSplashSound = this.sound.add("frogSplashSound")
    gameState.frogSquashSound = this.sound.add("frogSquashSound")

    const river = this.physics.add.staticGroup()
    river.create(400, 4 * rowHeight + halfRowHeight, 'river').setScale(1.2, .28).refreshBody()

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

    var that = this;
    console.log(that)

    let text = this.add.text(50, 50, "testing")
    text.setInteractive()
    text.on("pointerdown", () => {
      gameState.playingSound.stop()
      this.scene.stop('Game')
			this.scene.start('Landing')
    })
    const frogs = this.physics.add.group();
    function genFrog() {
      gameState.frog = frogs.create(400, 13 * rowHeight + halfRowHeight, "purpleCar")
      gameState.frog.displayWidth=800*.05; 
      gameState.frog.displayHeight= carLogHeight;
      gameState.frog.setDepth(3)
      gameState.frog.setCollideWorldBounds(true)
    }
    genFrog()

    
    this.input.keyboard.on('keyup_LEFT', function (event) {
      gameState.frog.x -= rowHeight - 10
      gameState.frogHopSound.play()
    })
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      gameState.frog.x += rowHeight - 10
      gameState.frogHopSound.play()
    })

    this.input.keyboard.on('keyup_DOWN', function (event) {
      gameState.frog.y += rowHeight
      gameState.frogHopSound.play()
    })

    this.input.keyboard.on('keyup_UP', function (event) {
      gameState.frog.y -= rowHeight
      gameState.frogHopSound.play()
    })
   

    const logs1 = this.physics.add.group();
    function genLogs1() {
      let roadY1 = 6 * rowHeight + halfRowHeight
      let log1 = logs1.create(10, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(75)
    }

    const log1GenLoop = this.time.addEvent({
      delay: 4000,
      callback: genLogs1,
      callbackScope: this,
      loop: true
    });

    const logs2 = this.physics.add.group();
    function genLogs2() {
      let roadY1 = 5 * rowHeight + halfRowHeight
      let log1 = logs2.create(800, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(-75)
    }

    const log1GenLoop2 = this.time.addEvent({
      delay: 4000,
      callback: genLogs2,
      callbackScope: this,
      loop: true
    });

    const logs3 = this.physics.add.group();
    function genLogs3() {
      let roadY1 = 4 * rowHeight + halfRowHeight
      let log1 = logs3.create(10, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(75)
    }

    const log1GenLoop3 = this.time.addEvent({
      delay: 4000,
      callback: genLogs3,
      callbackScope: this,
      loop: true
    });

    const logs4 = this.physics.add.group();
    function genLogs4() {
      let roadY1 = 3 * rowHeight + halfRowHeight
      let log1 = logs4.create(800, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(-75)
    }

    const log1GenLoop4 = this.time.addEvent({
      delay: 4000,
      callback: genLogs4,
      callbackScope: this,
      loop: true
    });

    const logs5 = this.physics.add.group();
    function genLogs5() {
      let roadY1 = 2 * rowHeight + halfRowHeight
      let log1 = logs3.create(10, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(75)
    }

    const log1GenLoop5 = this.time.addEvent({
      delay: 4000,
      callback: genLogs5,
      callbackScope: this,
      loop: true
    });

    genLogs1()
    genFrog()

    this.physics.add.collider(frogs, logs1, function(frog, log) {
      if(frog.x > log.x ) {
        //frog.x = log.x + 19
        frog.x = log.x + 10
        frog.y = log.y
      } else {
        frog.x = log.x - 10
        frog.y = log.y
      }
    
    });

    this.physics.add.collider(frogs, logs2, function(frog, log) {
      if(frog.x > log.x ) {
        frog.x = log.x + 10
      } else {
        frog.x = log.x - 10
      }
    
    });

    this.physics.add.collider(frogs, logs3, function(frog, log) {
      if(frog.x > log.x ) {
        frog.x = log.x + 10
      } else {
        frog.x = log.x - 10
      }
    
    });

    this.physics.add.collider(frogs, logs4, function(frog, log) {
      if(frog.x > log.x ) {
        frog.x = log.x + 10
      } else {
        frog.x = log.x - 10
      }
    
    });

    this.physics.add.collider(frogs, logs5, function(frog, log) {
      if(frog.x > log.x ) {
        frog.x = log.x + 10
      } else {
        frog.x = log.x - 10
      }
    
    });

    const vehicles = this.physics.add.group();
  
    function genItem1 (init=10) {
      let cars = ["whiteVan", "policeCar", "purpleCar"]
      let randomCar = Math.floor(Math.random() * 3)
      let roadY1 = 8 * rowHeight + halfRowHeight
      let vehicle = vehicles.create(init, roadY1, cars[randomCar])
      vehicle.displayWidth=800*.1
      vehicle.displayHeight = carLogHeight
      vehicle.setVelocityX(75)
      
    }

    genItem1(60)
    genItem1(250)
    genItem1(400)


    const bugGenLoop = this.time.addEvent({
      delay: 4000,
      callback: genItem1,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(frogs, vehicles, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy();
      vehicle.destroy()
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
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

    this.physics.add.collider(frogs, vehicles2, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy();
      vehicle.destroy()
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
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

    this.physics.add.collider(frogs, vehicles3, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy();
      vehicle.destroy()
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
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

    this.physics.add.collider(frogs, vehicles4, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy();
      vehicle.destroy()
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
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

    this.physics.add.collider(frogs, vehicles5, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy();
      vehicle.destroy()
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.scene.stop('Game')
        this.scene.start('Landing')
        gameState.lives = 3
      }
    }.bind(this));

    const platforms = this.physics.add.staticGroup();

  platforms.create(-150, 300, 'road').setScale(.1, 2).refreshBody();

  const platforms2 = this.physics.add.staticGroup();

  platforms2.create(950, 300, 'road').setScale(.1, 2).refreshBody();

  this.physics.add.collider(platforms, vehicles, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms, vehicles2, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms, vehicles3, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms, vehicles4, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms, vehicles5, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms2, vehicles, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms2, vehicles2, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms2, vehicles3, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms2, vehicles4, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(platforms2, vehicles5, function(plat, vehicle) {
    vehicle.destroy()
  }.bind(this))

  this.physics.add.collider(logs1, platforms, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs1, platforms2, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs2, platforms, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs2, platforms2, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs3, platforms, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs3, platforms2, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs4, platforms, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs4, platforms2, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs5, platforms, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(logs5, platforms2, function(log, platforms) {
    log.destroy()
  }.bind(this))

  this.physics.add.collider(frogs, river, function(frog, river) {
    // this.physics.add.collider(frogs, logs1, function(frog, log) {
    //   console.log("land on log")
    // })
    // frog.destroy()
    // genFrog()
    //   gameState.lives -= 1
    //   gameState.livesLeft.setText(`Lives ${gameState.lives}`)
      
    //   if(gameState.lives === 0) {
    //     this.scene.stop('Game')
    //     this.scene.start('Landing')
    //     gameState.lives = 3
    //   }
  }.bind(this))

    gameState.livesLeft = this.add.text(370, 10, `Lives ${gameState.lives}`)

  }
  update() {

  }
}

export default Game