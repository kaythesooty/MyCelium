import { MushroomName } from '@models/enums'
import { GameObjects, Scene } from 'phaser'

export class Mushroom extends GameObjects.Sprite {
  scene!: Scene
  mushroom!: GameObjects.Sprite
  growth!: number

  constructor(
    scene: Scene,
    x: number,
    y: number,
    size: number,
    mushroom: MushroomName,
  ) {
    super(scene, x * size, y * size, mushroom, 0)

    this.scene = scene
    this.mushroom = this.scene.add.sprite(
      x * size + 80,
      y * size + 50,
      mushroom,
    )
    this.mushroom.depth = 1
    this.growth = 0
  }

  grow(multiplier: number) {
    // Changing textures
    if (this.growth >= 120) this.mushroom.setFrame(3)
    else if (this.growth >= 80) this.mushroom.setFrame(2)
    else if (this.growth >= 40) this.mushroom.setFrame(1)
    else this.mushroom.setFrame(0)

    // Increasing growth
    this.growth += multiplier
  }

  isExistent(x: number, y: number) {
    return this.x === x && this.y === y
  }
}
