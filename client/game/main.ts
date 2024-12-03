import { AUTO, Game, Scale } from 'phaser'
import { Preloader } from '@game/scenes/Preloader'
import { Mushrooms } from '@game/scenes/Mushrooms'

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
    mode: Scale.ENVELOP,
    autoCenter: Scale.CENTER_BOTH,
  },
  backgroundColor: '#028af8',
  scene: [Preloader, Mushrooms],
}

export default (parent: string) => new Game({ ...config, parent })
