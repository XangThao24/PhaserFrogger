import Phaser from "phaser";
import Landing from "./landing";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [ Landing ]
}

const game = new Phaser.Game(config);