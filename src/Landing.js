import Phaser from "phaser"

class Landing extends Phaser.Scene {

  constructor() {
    super({key: "Landing"})
  }

  preload() {
    this.load.image("landing", "src/assets/images/landing.png")
  }

  create() {
    this.landing = this.add.image(800/2, 600/2, "landing")
    this.landing.displayWidth = 800;
    this.landing.displayHeight = 600;

    this.input.on('pointerdown', () => {  
			this.scene.stop('Landing')
			this.scene.start('Game')
		})
  }

}

export default Landing