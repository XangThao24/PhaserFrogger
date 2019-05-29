import Phaser from "phaser"
import landing from "./assets/images/landing.png"
import landingSound from "./assets/sounds/LandingSound.mp3"

const gameState = {}

class Landing extends Phaser.Scene {

  constructor() {
    super({key: "Landing"})
  }

  preload() {
    this.load.image("landing", landing)
    this.load.audio("landingSound", landingSound)
  }
  create() {
    this.landing = this.add.image(800/2, 600/2, "landing")
    this.landing.displayWidth = 800;
    this.landing.displayHeight = 600;
    gameState.sound = this.sound.add("landingSound")
    gameState.sound.play()

    this.input.on('pointerdown', () => {  
      gameState.sound.stop()
      this.scene.stop('Landing')
      this.scene.start('Game')
		})
  }

}

export default Landing