import { Scene } from 'phaser'
const viewportWidth = window.innerWidth
const viewportHeight = window.innerHeight
const y = viewportHeight / 2
const x = viewportWidth / 2
export class Preloader extends Scene {
  constructor() {
    super('Preloader')
  }

  init() {
    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(x, y, 468, 32).setStrokeStyle(1, 0xffffff)
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(x - 230, y, 4, 28, 0xffffff)

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress
    })
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath('assets')

    // Tilesets
    this.load.image('grass', 'tileset_grass.png')
    this.load.image('dirt', 'tileset_dirt.png')

    // User interface
    this.load.image('watering-can', 'sprite_watering_can.png')
    this.load.image('trowel', 'sprite_trowel.png')
    this.load.image('fertiliser', 'sprite_fertiliser.png')

    // Mushrooms
    this.load.spritesheet('red-mushroom', 'frames_mushroom_red.png', {
      frameWidth: 150,
      frameHeight: 150,
    })
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('Mushrooms')
  }
}
