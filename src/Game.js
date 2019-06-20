import Phaser from "phaser"
//left
import purpleCar from "./assets/images/leftVehicles/purpleCar.png"
import whiteVan from "./assets/images/leftVehicles/whiteVan.png"
import spaceCar from "./assets/images/leftVehicles/spaceCar.png"
import fireTruck from "./assets/images/leftVehicles/fireTruck.png"
import policeCar from "./assets/images/leftVehicles/policeCar.png"
import redSport from "./assets/images/leftVehicles/redSport.png"
import redCar from "./assets/images/leftVehicles/redCar.png"

// right
import yellowCar from "./assets/images/rightVehicles/yellowCar.png"
import yellowBus from "./assets/images/rightVehicles/yellowBus.png"
import greySport from "./assets/images/rightVehicles/greySport.png"
import blackSport from "./assets/images/rightVehicles/blackSport.png"
import jet from "./assets/images/rightVehicles/jet.png"
import tank from "./assets/images/rightVehicles/tank.png"
import blueSport from "./assets/images/rightVehicles/blueSport.png"

// background
import grass from "./assets/images/grass.jpg"
import road from "./assets/images/street.png"
import river from "./assets/images/river2.jpg"
import sidewalk from "./assets/images/sidewalk.jpg"
import scoreBg from "./assets/images/scoreBg.jpg"
import candy from "./assets/images/candy.png"

// frog
import idleFrog from "./assets/images/idleFrog.png"
import jumpLeft from "./assets/images/jumpLeft.png"
import jumpRight from "./assets/images/jumpRight.png"
import jumpUpDown from "./assets/images/jumpUpDown.png"

// explosion
import explosion from "./assets/images/explosion.png"
import frogVehicleCollision from "./assets/images/frogVehicleCollision.png"
import frogSplash from "./assets/images/frogSplash.png"

//log
import log from "./assets/images/log.png"

// sound
import playingSound from "./assets/sounds/playingSong.mp3"
import frogHopSound from "./assets/sounds/sound-frogger-hop.wav"
import frogSquashSound from "./assets/sounds/sound-frogger-squash.wav"
import frogSplashSound from "./assets/sounds/sound-frogger-plunk.wav"
import landSafe from "./assets/sounds/landSafe.wav"
import timeRunningOut from "./assets/sounds/sound-frogger-time.wav"
import vehicleCrash from "./assets/sounds/vehicleCrash.mp3"

let gameState = {
  lives: 3,
  score: 0,
  level: 1,
  candies: 0,
  time: 60,
  rightVelocity: 50,
  leftVelocity: -50
}

const leftVehicles = ["fireTruck", "whiteVan", "policeCar", "purpleCar", "redCar", "redSport", "spaceCar", "blackSport" ]
const rightVehicles = ["yellowBus", "jet", "blueSport", "greySport", "tank", "yellowCar"]

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }

  preload() {
    this.load.image("grass", grass)
    this.load.image("road", road)
    this.load.image("blackSport", blackSport)
    this.load.image("jet", jet)
    this.load.image("tank", tank)
    this.load.image("blueSport", blueSport)
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
    this.load.image("log", log)
    this.load.image("sidewalk", sidewalk)
    this.load.image("scoreBg", scoreBg)
    this.load.image("candy", candy)
    this.load.image("explosion", explosion)
    this.load.image("idleFrog", idleFrog)
    this.load.image("jumpLeft", jumpLeft)
    this.load.image("jumpRight", jumpRight)
    this.load.image("jumpUpDown", jumpUpDown)
    this.load.image("frogVehicleCollision", frogVehicleCollision)
    this.load.image("frogSplash", frogSplash)
  
    this.load.audio("playingSound", playingSound)
    this.load.audio("frogHopSound", frogHopSound)
    this.load.audio("frogSplashSound", frogSplashSound)
    this.load.audio("frogSquashSound", frogSquashSound)
    this.load.audio("landSafe", landSafe)
    this.load.audio("timeRunningOut", timeRunningOut)
    this.load.audio("vehicleCrash", vehicleCrash)
    
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
    gameState.timeRunningOut = this.sound.add("timeRunningOut")
    gameState.frogSplashSound = this.sound.add("frogSplashSound")
    gameState.frogSquashSound = this.sound.add("frogSquashSound")
    gameState.landSafe = this.sound.add("landSafe")
    gameState.vehicleCrash = this.sound.add("vehicleCrash")

    const river = this.physics.add.staticGroup()
    river.create(400, 4 * rowHeight + halfRowHeight, 'river').setScale(1.2, .55).refreshBody()

    const riverWallLeft = this.physics.add.staticGroup()
    riverWallLeft.create(0.05, 4 * rowHeight + halfRowHeight, "river").setScale(.01, .55).refreshBody()

    const riverWallRight = this.physics.add.staticGroup()
    riverWallLeft.create(800, 4 * rowHeight + halfRowHeight, "river").setScale(.01, .55).refreshBody()

    let grass = this.add.image(400, 13 * rowHeight + halfRowHeight, "sidewalk")
    grass.displayHeight =  carLogHeight + 5
    grass.displayWidth=800

    let grass2 = this.add.image(400, 7 * rowHeight + halfRowHeight, "sidewalk")
    grass2.displayHeight =  carLogHeight + 5
    grass2.displayWidth=800

    let nest = this.add.image(400, rowHeight + halfRowHeight, "sidewalk")
    nest.displayHeight =  carLogHeight + 5
    nest.displayWidth=800

    let score = this.add.image(400, halfRowHeight, "scoreBg")
    score.displayHeight =  carLogHeight + 5
    score.displayWidth=800
    
    const candies = this.physics.add.group()
    function genCandy(xPos) {
      let roadY1 = rowHeight + halfRowHeight 
      let candy = candies.create(xPos, roadY1, "candy")
      candy.displayWidth=800*.1
      candy.displayHeight = carLogHeight
      candy.setDepth(2)
    }

    function startCandy() {
      genCandy(200)
      genCandy(400)
      genCandy(600)
    }

    startCandy()

    
    

    const frogs = this.physics.add.group();
    function genFrog() {
      gameState.frog = frogs.create(400, 13 * rowHeight + halfRowHeight, "idleFrog")
      gameState.frog.displayWidth=800*.05; 
      gameState.frog.displayHeight= carLogHeight;
      gameState.frog.setDepth(3)
      gameState.frog.setCollideWorldBounds(true)
    }
    
    this.input.keyboard.on('keyup_LEFT', function (event) {
      gameState.frog.x -= rowHeight - 10
      gameState.frog.setTexture("jumpLeft")
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      gameState.frogHopSound.play()
    })
    this.input.keyboard.on('keyup_RIGHT', function (event) {
      gameState.frog.x += rowHeight - 10
      gameState.frog.setTexture("jumpRight")
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      gameState.frogHopSound.play()
    })

    this.input.keyboard.on('keyup_DOWN', (event) => {
      gameState.frog.y += rowHeight + 0.00001
      gameState.currentX = gameState.frog.y 
      if(gameState.frog.y >= 578) {
        gameState.frog.y = 578.56
      }
      gameState.frog.setTexture("jumpUpDown")
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      this.time.addEvent({
        delay: 30,
        callback: fadePicture,
        callbackScope: this,
        loop: false
      })
      function fadePicture() {
        if(gameState.frog.y < 298 ) {
          if(gameState.currentX === gameState.frog.y) {
            gameState.frogSplashSound.play()
            let frogSplash = this.add.image(gameState.frog.x, gameState.frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
            gameState.frog.destroy()
            
            gameState.lives -= 1
            gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
          } else {
          }
        }
        
      }
      gameState.frogHopSound.play()
    })

    this.input.keyboard.on('keyup_UP', (event) => {
      gameState.frog.y -= rowHeight + 0.00001
      gameState.currentX = gameState.frog.x 
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      gameState.frog.setTexture("jumpUpDown")
      this.time.addEvent({
        delay: 30,
        callback: fadePicture,
        callbackScope: this,
        loop: false
      })
      function fadePicture() {
        if(gameState.frog.y < 297 ) {
          if(gameState.currentX === gameState.frog.x) {
            gameState.frogSplashSound.play()
            if(gameState.frog.y < 65 ){
              let frogBlood = this.add.image(gameState.frog.x, gameState.frog.y, "frogVehicleCollision")
              frogBlood.displayWidth = 800*.1
              frogBlood.displayHeight = carLogHeight
              frogBlood.setDepth(7)
              setTimeout(() => {
                frogBlood.destroy()
              }, 500)
            }
            let frogSplash = this.add.image(gameState.frog.x, gameState.frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
            gameState.frog.destroy()
            gameState.lives -= 1
            gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          this.physics.pause()
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          gameState.lives = 3
        }
        genFrog()
        return
          } else {
          }
        }
        
      }
      
      gameState.frogHopSound.play()
    })
   

    const logs1 = this.physics.add.group();
    function genLogs1() {
      let roadY1 = 6 * rowHeight + halfRowHeight
      let randomSpeed = Math.floor(Math.random() * 20)
      let log1 = logs1.create(-30, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(gameState.rightVelocity + 25 + randomSpeed)
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
      let randomSpeed = Math.floor(Math.random() * 25)
      let log1 = logs2.create(830, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(gameState.leftVelocity - 25 - randomSpeed)
    }

    const log1GenLoop2 = this.time.addEvent({
      delay: 5000,
      callback: genLogs2,
      callbackScope: this,
      loop: true
    });

    const logs3 = this.physics.add.group();
    function genLogs3() {
      let roadY1 = 4 * rowHeight + halfRowHeight
      let randomSpeed = Math.floor(Math.random() * 15)
      let log1 = logs3.create(-30, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(gameState.rightVelocity  + 25 + randomSpeed)
    }

    const log1GenLoop3 = this.time.addEvent({
      delay: 3000,
      callback: genLogs3,
      callbackScope: this,
      loop: true
    });

    const logs4 = this.physics.add.group();
    function genLogs4() {
      let roadY1 = 3 * rowHeight + halfRowHeight
      let log1 = logs4.create(830, roadY1, "log")
      let randomSpeed = Math.floor(Math.random() * 20)
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(gameState.leftVelocity - 25  - randomSpeed)
    }

    const log1GenLoop4 = this.time.addEvent({
      delay: 3500,
      callback: genLogs4,
      callbackScope: this,
      loop: true
    });

    const logs5 = this.physics.add.group();
    function genLogs5() {
      let roadY1 = 2 * rowHeight + halfRowHeight
      let randomSpeed = Math.floor(Math.random() * 10)
      let log1 = logs3.create(-30, roadY1, "log")
      log1.displayWidth=800*.1
      log1.displayHeight = carLogHeight
      log1.setDepth(2)
      log1.setVelocityX(gameState.rightVelocity  + 25 + randomSpeed)
    }

    const log1GenLoop5 = this.time.addEvent({
      delay: 2500,
      callback: genLogs5,
      callbackScope: this,
      loop: true
    });

    genFrog()

    this.physics.add.collider(logs1, logs1, function(log1, log2) {
      log1.destroy()
      log2.destroy()
    })

    this.physics.add.collider(logs2, logs2, function(log1, log2) {
      log1.destroy()
      log2.destroy()
    })

    this.physics.add.collider(logs3, logs3, function(log1, log2) {
      log1.destroy()
      log2.destroy()
    })

    this.physics.add.collider(logs4, logs4, function(log1, log2) {
      log1.destroy()
      log2.destroy()
    })

    this.physics.add.collider(logs5, logs5, function(log1, log2) {
      log1.destroy()
      log2.destroy()
    })

    this.physics.add.collider(frogs, logs1, function(frog, log) {
      if(frog.x < log.x - 45 || frog.x > log.x + 45) {
        let frogSplash = this.add.image(frog.x, frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
        frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
      }
      if(frog.x > log.x ) {
        frog.x = log.x + 19
        frog.y = log.y
      } else {
        frog.x = log.x - 19
        frog.y = log.y
      }
    
    }.bind(this));

    this.physics.add.collider(frogs, logs2, function(frog, log) {
      if(frog.x < log.x - 45 || frog.x > log.x + 45) {
        let frogSplash = this.add.image(frog.x, frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
        frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
      }
      if(frog.x > log.x ) {
        frog.x = log.x + 19
      } else {
        frog.x = log.x - 19
      }
    
    }.bind(this));

    this.physics.add.collider(frogs, logs3, function(frog, log) {
      if(frog.x < log.x - 45 || frog.x > log.x + 45) {
        let frogSplash = this.add.image(frog.x, frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
        frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
      }
      if(frog.x > log.x ) {
        frog.x = log.x + 19
      } else {
        frog.x = log.x - 19
      }
    
    }.bind(this));

    this.physics.add.collider(frogs, logs4, function(frog, log) {
      if(frog.x < log.x - 45 || frog.x > log.x + 45) {
        let frogSplash = this.add.image(frog.x, frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
        frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
      }
      if(frog.x > log.x ) {
        frog.x = log.x + 19
      } else {
        frog.x = log.x - 19
      }
    
    }.bind(this));

    this.physics.add.collider(frogs, logs5, function(frog, log) {
      if(frog.x < log.x - 45 || frog.x > log.x + 45) {
        let frogSplash = this.add.image(frog.x, frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
        frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
      }
      if(frog.x > log.x ) {
        frog.x = log.x + 19
      } else {
        frog.x = log.x - 19
      }
    
    }.bind(this));

    this.physics.add.collider(frogs, riverWallLeft, function(frog, riverWall) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(6)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this))

    this.physics.add.collider(frogs, riverWallRight, function(frog, riverWall) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(6)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this))

    const vehicles = this.physics.add.group();
  
    function genItem1 (init=-80) {
      let randomCar = Math.floor(Math.random() * rightVehicles.length)
      let randomSpeed = Math.floor(Math.random() * 50)
      let roadY1 = 8 * rowHeight + halfRowHeight
      let vehicle = vehicles.create(init, roadY1, rightVehicles[randomCar])
      if(randomCar < 2) {
        vehicle.displayWidth=800*.2
      } else {
        vehicle.displayWidth = 800*.1
      }
      vehicle.displayHeight = carLogHeight
      vehicle.setDepth(2)
      vehicle.setVelocityX(gameState.rightVelocity  + 25 + randomSpeed)
      
    }

    const bugGenLoop = this.time.addEvent({
      delay: 4000,
      callback: genItem1,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(frogs, vehicles, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(1)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles2 = this.physics.add.group();

    function genItem2 () {
      let randomCar = Math.floor(Math.random() * leftVehicles.length)
      let randomSpeed = Math.floor(Math.random() * 50)
      let roadY1 = 9 * rowHeight + halfRowHeight
      let vehicle = vehicles2.create(880, roadY1, leftVehicles[randomCar])
      if(randomCar < 2) {
        vehicle.displayWidth=800*.2
      } else {
        vehicle.displayWidth = 800*.1
      }
      vehicle.displayHeight = carLogHeight
      vehicle.setDepth(2)
      vehicle.setVelocityX(gameState.leftVelocity - 45 - randomSpeed)
      
    }

    const bugGenLoop2 = this.time.addEvent({
      delay: 6000,
      callback: genItem2,
      callbackScope: this,
      loop: true
    });
    this.physics.add.collider(frogs, vehicles2, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(1)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles3 = this.physics.add.group();

    function genItem3 () {
      let randomCar = Math.floor(Math.random() * rightVehicles.length)
      let randomSpeed = Math.floor(Math.random() * 50)
      let roadY1 = 10 * rowHeight + halfRowHeight
      let vehicle = vehicles3.create(-80, roadY1, rightVehicles[randomCar])
      if(randomCar < 2) {
        vehicle.displayWidth=800*.2
      } else {
        vehicle.displayWidth = 800*.1
      }
      vehicle.displayHeight = carLogHeight
      vehicle.setDepth(2)
      vehicle.setVelocityX(gameState.rightVelocity  + 20 + randomSpeed)
      
    }

    const bugGenLoop3 = this.time.addEvent({
      delay: 5000,
      callback: genItem3,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(frogs, vehicles3, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(1)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles4 = this.physics.add.group();

    function genItem4 () {
      let randomCar = Math.floor(Math.random() * leftVehicles.length)
      let randomSpeed = Math.floor(Math.random() * 50)
      let roadY1 = 11 * rowHeight + halfRowHeight
      let vehicle = vehicles4.create(880, roadY1, leftVehicles[randomCar])
      if(randomCar < 2) {
        vehicle.displayWidth=800*.2
      } else {
        vehicle.displayWidth = 800*.1
      }
      vehicle.displayHeight = carLogHeight
      vehicle.setDepth(2)
      vehicle.setVelocityX(gameState.leftVelocity - 35 - randomSpeed)
      
    }

    const bugGenLoop4 = this.time.addEvent({
      delay: 3000,
      callback: genItem4,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(frogs, vehicles4, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(1)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this));

    const vehicles5 = this.physics.add.group();

    function genItem5 () {
      let randomCar = Math.floor(Math.random() * rightVehicles.length)
      let randomSpeed = Math.floor(Math.random() * 25)
      let roadY1 = 12 * rowHeight + halfRowHeight
      let vehicle = vehicles5.create(-80, roadY1, rightVehicles[randomCar])
      if(randomCar < 2) {
        vehicle.displayWidth=800*.2
      } else {
        vehicle.displayWidth = 800*.1
      }
      vehicle.displayHeight = carLogHeight
      vehicle.setDepth(2)
      vehicle.setVelocityX(gameState.rightVelocity  + 5 + randomSpeed)
      
    }

    const bugGenLoop5 = this.time.addEvent({
      delay: 7500,
      callback: genItem5,
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(frogs, vehicles5, function(frog, vehicle) {
      gameState.frogSquashSound.play()
      frog.destroy()
      let frogBlood = this.add.image(frog.x, frog.y, "frogVehicleCollision")
        frogBlood.displayWidth = 800*.1
        frogBlood.displayHeight = carLogHeight
        frogBlood.setDepth(1)
        setTimeout(() => {
          frogBlood.destroy()
        }, 500)
      genFrog()
      gameState.lives -= 1
      gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
      
      if(gameState.lives === 0) {
        gameState.playingSound.stop()
        this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
        this.physics.pause()
        gameState.lives = 3
      }
    }.bind(this));

    this.physics.add.collider(vehicles, vehicles, function(vehicle1, vehicle2) {  
      vehicle1.destroy()
      vehicle2.destroy()
      if( (vehicle1.x > 0 && vehicle1.x < 800) || (vehicle2.x > 0 && vehicle2.x < 800)) {
        let explosion1 = this.add.image(vehicle1.x, vehicle1.y, "explosion")
        explosion1.displayWidth = 800*.1
        explosion1.displayHeight = carLogHeight
        let explosion2 = this.add.image(vehicle2.x, vehicle2.y, "explosion")
        explosion2.displayWidth = 800*.1
        explosion2.displayHeight = carLogHeight
        gameState.vehicleCrash.play()
        setTimeout(() => {
          explosion1.destroy()
          explosion2.destroy()
        }, 500)
      }
    }.bind(this))

    this.physics.add.collider(vehicles2, vehicles2, function(vehicle1, vehicle2) {
      vehicle1.destroy()
      vehicle2.destroy()
      if( (vehicle1.x > 0 && vehicle1.x < 800) || (vehicle2.x > 0 && vehicle2.x < 800)) {
        let explosion1 = this.add.image(vehicle1.x, vehicle1.y, "explosion")
        explosion1.displayWidth = 800*.1
        explosion1.displayHeight = carLogHeight
        let explosion2 = this.add.image(vehicle2.x, vehicle2.y, "explosion")
        explosion2.displayWidth = 800*.1
        explosion2.displayHeight = carLogHeight
        gameState.vehicleCrash.play()
        setTimeout(() => {
          explosion1.destroy()
          explosion2.destroy()
        }, 500)
      }
    }.bind(this))

    this.physics.add.collider(vehicles3, vehicles3, function(vehicle1, vehicle2) {
      vehicle1.destroy()
      vehicle2.destroy()
      if( (vehicle1.x > 0 && vehicle1.x < 800) || (vehicle2.x > 0 && vehicle2.x < 800)) {
        let explosion1 = this.add.image(vehicle1.x, vehicle1.y, "explosion")
        explosion1.displayWidth = 800*.1
        explosion1.displayHeight = carLogHeight
        let explosion2 = this.add.image(vehicle2.x, vehicle2.y, "explosion")
        explosion2.displayWidth = 800*.1
        explosion2.displayHeight = carLogHeight
        gameState.vehicleCrash.play()
        setTimeout(() => {
          explosion1.destroy()
          explosion2.destroy()
        }, 500)
      }
    }.bind(this))

    this.physics.add.collider(vehicles4, vehicles4, function(vehicle1, vehicle2) {
      vehicle1.destroy()
      vehicle2.destroy()
      if( (vehicle1.x > 0 && vehicle1.x < 800) || (vehicle2.x > 0 && vehicle2.x < 800)) {
        let explosion1 = this.add.image(vehicle1.x, vehicle1.y, "explosion")
        explosion1.displayWidth = 800*.1
        explosion1.displayHeight = carLogHeight
        let explosion2 = this.add.image(vehicle2.x, vehicle2.y, "explosion")
        explosion2.displayWidth = 800*.1
        explosion2.displayHeight = carLogHeight
        gameState.vehicleCrash.play()
        setTimeout(() => {
          explosion1.destroy()
          explosion2.destroy()
        }, 500)
      }
    }.bind(this))

    this.physics.add.collider(vehicles5, vehicles5, function(vehicle1, vehicle2) {
      vehicle1.destroy()
      vehicle2.destroy()
      if( (vehicle1.x > 0 && vehicle1.x < 800) || (vehicle2.x > 0 && vehicle2.x < 800)) {
        let explosion1 = this.add.image(vehicle1.x, vehicle1.y, "explosion")
        explosion1.displayWidth = 800*.1
        explosion1.displayHeight = carLogHeight
        let explosion2 = this.add.image(vehicle2.x, vehicle2.y, "explosion")
        explosion2.displayWidth = 800*.1
        explosion2.displayHeight = carLogHeight
        gameState.vehicleCrash.play()
        setTimeout(() => {
          explosion1.destroy()
          explosion2.destroy()
        }, 500)
      }
    }.bind(this))

    const platforms = this.physics.add.staticGroup();

  platforms.create(-750, 300, 'road').setScale(.1, 2).refreshBody();

  const platforms2 = this.physics.add.staticGroup();

  platforms2.create(1550, 300, 'road').setScale(.1, 2).refreshBody();

  this.physics.add.collider(frogs, candies, function(frog, candy) {
    frog.destroy()
    candy.destroy()
    genFrog()
    gameState.time += 15
    gameState.candies ++
    gameState.score += 15
    gameState.landSafe.play()
    gameState.displayScore.setText(`Score: ${gameState.score}`)
    if(gameState.candies === 3) {
      gameState.level ++
      gameState.displayLevel.setText(`Level: ${gameState.level}`)
      gameState.candies = 0
      gameState.rightVelocity += 20
      gameState.leftVelocity -= 20
      startCandy()
    }
  })

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

  gameState.displayTime = this.add.text(`Time: ${gameState.time}`)

  gameState.timeInterval =  setInterval(function() {
      gameState.time --
      if(gameState.time < 10) {
        gameState.timeRunningOut.play()
        gameState.displayTime.setText(`Time: ${gameState.time}`)
      } else {
        gameState.displayTime.setText(`Time: ${gameState.time}`)
      }
      if(gameState.time === 0) {
        gameState.frog.destroy()
        gameState.lives -= 1
        gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        gameState.frogSplashSound.play()
        gameState.time = 30
        genFrog()
      }
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
          gameState.time = 30
          gameState.lives = 3
          clearInterval(gameState.timeInterval)
          genFrog()
          return
        }

    }.bind(this), 1000)

  gameState.livesLeft = this.add.text(270, 10, `Lives: ${gameState.lives}`)
  gameState.displayLevel = this.add.text(100, 10, `Level: ${gameState.level}`)
  gameState.displayScore = this.add.text(450, 10, `Score: ${gameState.score}`)
  gameState.displayTime = this.add.text(600, 10, `Time: ${gameState.time}`)

  gameState.upButton = this.add.rectangle(660, 400, 80, 70,0x0000FF);
  gameState.upButton.setDepth(10)
  gameState.upButton.alpha = .45
  gameState.upButton.setInteractive()
  gameState.upButton.on("pointerup", () => {
    gameState.frog.y -= rowHeight + 0.00001
      gameState.currentX = gameState.frog.x 
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      gameState.frog.setTexture("jumpUpDown")
      this.time.addEvent({
        delay: 30,
        callback: fadePicture,
        callbackScope: this,
        loop: false
      })
      function fadePicture() {
        if(gameState.frog.y < 297 ) {
          if(gameState.currentX === gameState.frog.x) {
            gameState.frogSplashSound.play()
            let frogSplash = this.add.image(gameState.frog.x, gameState.frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
            gameState.frog.destroy()
            gameState.lives -= 1
            gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          this.physics.pause()
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          gameState.lives = 3
        }
        genFrog()
        return
          } else {
            
          }
        }
        
      }
      gameState.frogHopSound.play()
  })

  gameState.downButton = this.add.rectangle(660, 560, 80, 70,0x0000FF);
  gameState.downButton.setDepth(10)
  gameState.downButton.alpha = .45
  gameState.downButton.setInteractive()
  gameState.downButton.on("pointerup", () => {
    gameState.frog.y += rowHeight + 0.00001
      gameState.currentX = gameState.frog.x 
      if(gameState.frog.y >= 578) {
        gameState.frog.y = 578.56
      }
      gameState.frog.setTexture("jumpUpDown")
      setTimeout(() => {
        gameState.frog.setTexture("idleFrog")
      }, 70)
      this.time.addEvent({
        delay: 30,
        callback: fadePicture,
        callbackScope: this,
        loop: false
      })
      function fadePicture() {
        if(gameState.frog.y < 297 ) {
          if(gameState.currentX === gameState.frog.x) {
            gameState.frogSplashSound.play()
            let frogSplash = this.add.image(gameState.frog.x, gameState.frog.y, "frogSplash")
            frogSplash.displayWidth = 800*.1
            frogSplash.displayHeight = carLogHeight
            frogSplash.setDepth(1)
            setTimeout(() => {
              frogSplash.destroy()
            }, 500)
            gameState.frog.destroy()
            
            gameState.lives -= 1
            gameState.livesLeft.setText(`Lives: ${gameState.lives}`)
        
        if(gameState.lives === 0) {
          gameState.playingSound.stop()
          this.input.keyboard.off('keyup_LEFT')
          this.input.keyboard.off('keyup_RIGHT')
          this.input.keyboard.off('keyup_UP')
          this.input.keyboard.off('keyup_DOWN')
          gameState.upButton.off("pointerup")
          gameState.downButton.off("pointerup")
          gameState.leftButton.off("pointerup")
          gameState.rightButton.off("pointerup")
          clearInterval(gameState.timeInterval)
          gameState.reset = this.add.text(180, 310, `Game Over Score is ${gameState.score} Click to Play again`, { fontSize: "20px", fill: '#000000' });
          gameState.reset.setInteractive()
          gameState.reset.on("pointerup", () => {
            gameState = {
              lives: 3,
              score: 0,
              level: 1,
              candies: 0,
              time: 60,
              rightVelocity: 50,
              leftVelocity: -50
            }
            this.scene.restart()
          })
          this.physics.pause()
          gameState.lives = 3
        }
        genFrog()
        return
          } else {
          }
        }
        
      }
      gameState.frogHopSound.play()
  })

  gameState.leftButton = this.add.rectangle(580, 480, 80, 70, 0x0000FF);
  gameState.leftButton.setDepth(10)
  gameState.leftButton.alpha = .45
  gameState.leftButton.setInteractive()
  gameState.leftButton.on("pointerup", () => {
    gameState.frog.x -= rowHeight - 10
    gameState.frog.setTexture("jumpLeft")
    setTimeout(() => {
      gameState.frog.setTexture("idleFrog")
    }, 70)
    gameState.frogHopSound.play()
  })

  gameState.rightButton = this.add.rectangle(740, 480, 80, 70, 0x0000FF);
  gameState.rightButton.setDepth(10)
  gameState.rightButton.alpha = .45
  gameState.rightButton.setInteractive()
  gameState.rightButton.on("pointerup", () => {
    gameState.frog.x += rowHeight - 10
    gameState.frog.setTexture("jumpRight")
    setTimeout(() => {
      gameState.frog.setTexture("idleFrog")
    }, 70)
    gameState.frogHopSound.play()
  })

  }
  update() {

  } 
}

export default Game