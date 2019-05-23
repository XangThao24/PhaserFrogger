import Phaser from "phaser";
import Landing from "./Landing";
import Game from "./Game"
import Score from "./Score"

const config = {
  type: Phaser.AUTO,
  width: "100%",
  height: "100%",
  parent: "game",
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: [ Landing, Game, Score ]
}
const game = new Phaser.Game(config);