import { Spore } from '@models/interfaces'
import clamp from '@utils/clamp'
import { GameObjects, Scene } from 'phaser'

export class Mushroom extends GameObjects.Sprite {
  scene!: Scene
  mushroom!: GameObjects.Sprite
  info!: Spore
  tileX!: number
  tileY!: number
  size!: number
  growth!: number
  grown = false
  thirst = 2
  hunger = 0

  constructor(scene: Scene, x: number, y: number, size: number, spore: Spore) {
    super(scene, x * size, y * size, spore.texture, 0)

    this.tileX = x
    this.tileY = y
    this.size = size
    this.info = spore

    this.scene = scene
    this.mushroom = this.scene.add.sprite(
      x * size + 80,
      y * size + 50,
      spore.texture,
    )
    this.mushroom.depth = 1
    this.growth = 0
  }

  grow(value: number) {
    if (this.grown) return

    // Increasing growth
    this.growth += value
    // Changing textures
    const growthStage = this.growth / 100
    this.mushroom.setFrame(clamp(Math.floor(growthStage), 0, 2))

    if (this.growth >= 300) {
      this.grown = true
      this.mushroom.setFrame(3)
    }
  }

  getInfo() {
    const x =
      ((this.mushroom.x - this.scene.cameras.main.worldView.x) *
      this.scene.cameras.main.zoom) + 150
    const y =
      (this.mushroom.y - this.scene.cameras.main.worldView.y) *
      this.scene.cameras.main.zoom - 100

    return {
      name: this.info.name,
      description: this.info.description,
      texture: this.info.texture,
      image: this.info.img,
      stage: Math.floor(this.growth / 100),
      position: { x, y },
    }
  }

  debug() {
    // Debugging
    this.scene.add.text(
      this.x + 10,
      this.y + this.size - 20,
      `${Math.floor(this.growth)}`,
      {
        fontFamily: 'Arial',
        fontSize: '12px',
        color: 'red',
      },
    )
  }
}
