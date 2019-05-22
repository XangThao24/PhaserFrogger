import Phaser from "phaser";
import Landing from "./landing";
import Game from "./Game"
import Score from "./Score"

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: [ Landing, Game, Score ]
}
const game = new Phaser.Game(config);