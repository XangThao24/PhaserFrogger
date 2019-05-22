import Phaser from "phaser"

class Score extends Phaser.Scene {
  constructor() {
    super({key: "Score"})
  }

  create() {
    this.add.text(50, 50, "testing")
  }
}

export default Score