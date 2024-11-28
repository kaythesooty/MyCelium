import { AUTO, Game, Scale } from 'phaser'
import { Boot } from './scenes/Boot'
import { Preloader } from './scenes/Preloader'
import { SpriteGame } from './scenes/SpriteGame'
import { GameOver } from './scenes/GameOver'

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight


const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  scale: {
    parent: 'game-container',
    width: viewportWidth,
    height: viewportHeight,
    mode: Scale.EXPAND,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 300 },
      debug: false,
    },
  },
  backgroundColor: '#028af8',
  scene: [Boot, Preloader, SpriteGame, GameOver],
}

export default (parent: string) => new Game({ ...config, parent })
