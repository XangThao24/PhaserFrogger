import Phaser from "phaser"

class Game extends Phaser.Scene {
  constructor() {
    super({key: "Game"})
  }

  create() {
    this.add.text(50, 50, "testing")
  }
}

export default Game