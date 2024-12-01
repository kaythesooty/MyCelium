import { Cameras, Scene, Input } from 'phaser'

export class Camera extends Cameras.Scene2D.Camera {
  scene!: Scene
  camera!: Cameras.Scene2D.Camera
  x!: number
  y!: number
  width!: number
  height!: number

  constructor(
    scene: Scene,
    camera: Cameras.Scene2D.Camera,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    super(x, y, width, height)

    this.scene = scene
    this.camera = camera
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  initialize() {
    this.camera.setZoom(2)
    this.camera.setBounds(this.x, this.y, this.width, this.height)
    this.camera.centerOn(this.width / 2, this.height / 2)

    this.scene.input.on('wheel', (pointer: Input.Pointer) => {
      if (this.camera.zoom >= 1.8 && this.camera.zoom <= 2.5) {
        this.camera.zoom += pointer.deltaY * -0.005
      }
      if (this.camera.zoom <= 1.8) this.camera.zoom = 1.8
      if (this.camera.zoom >= 2.5) this.camera.zoom = 2.5
    })

    this.scene.input.on('pointerdown', () => {
      this.scene.input.on('pointermove', (pointer: Input.Pointer) => {
        this.camera.scrollX -= 0.05 * pointer.velocity.x
        this.camera.scrollY -= 0.05 * pointer.velocity.y
      })
    })

    this.scene.input.on('pointerup', () => {
      this.scene.input.off('pointermove')
    })
  }
}
