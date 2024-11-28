import { AUTO, Game } from 'phaser'
import { Boot } from './scenes/Boot'
import { Preloader } from './scenes/Preloader'
import { SpriteGame } from './scenes/SpriteGame'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, SpriteGame],
}

const StartGame = (parent: string) => {
  return new Game({ ...config, parent })
}

export default StartGame
