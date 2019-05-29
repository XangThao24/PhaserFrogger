import Phaser from "phaser";
import Landing from "./Landing";
import Game from "./Game"
import Score from "./Score"
import "./css/main.css"

// var canvas = document.getElementById("game");
// // var canvasContext = canvas.getContext("2d");
// canvas.width = 800;
// canvas.height = 600;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: document.getElementById("game"),
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: [  Game, Landing, Score ]
}
const game = new Phaser.Game(config);