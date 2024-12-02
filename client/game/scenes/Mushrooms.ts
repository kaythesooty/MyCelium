import { Dispatch } from 'react'
import { EventBus } from '../EventBus'
import matrix from '@utils/matrix'
import clamp from '@utils/clamp'
import { MushroomInfobox, Spore } from '@interfaces'
import CreateBackground from '@game/scripts/CreateBackground'
import CreateForeground from '@game/scripts/CreateForeground'
import CreateMainCamera from '@game/scripts/CreateMainCamera'
import { Mushroom } from '@game/entities/Mushroom'

interface GameTile {
  moist: number
  nitrogen: number
  mushroom?: Mushroom | null
}

enum GameState {
  Idle,
  Watering,
  Feeding,
  Planting,
}

export class Mushrooms extends Phaser.Scene {
  IS_DEBUG = true // You know what to do >:-)
  T_SCALE = 1 // Controls the time scale of the game for debugging purposes

  TILE_SIZE = 150
  WORLD_WIDTH = 10
  WORLD_HEIGHT = 6

  GROWTHSPEED = 10 // how long in seconds it takes a mushroom to grow one step
  DRYSPEED = 10 // how long in seconds it takes a dirt tile to dry one step

  camera!: Phaser.Cameras.Scene2D.Camera
  pointer!: Phaser.Input.Pointer
  hoveredTileX!: number
  hoveredTileY!: number
  background!: Phaser.Tilemaps.TilemapLayer | null
  foreground!: Phaser.Tilemaps.TilemapLayer | null

  gameState: GameState = GameState.Idle
  foregroundData!: GameTile[][]

  wateringCan!: Phaser.GameObjects.Image
  trowel!: Phaser.GameObjects.Image
  mushroomPreview!: Phaser.GameObjects.Image

  sporeToPlant!: Spore | null
  infoboxCallback!: Dispatch<React.SetStateAction<MushroomInfobox | null>>

  constructor() {
    super('Mushrooms')
  }

  create() {
    this.camera = CreateMainCamera(
      this.WORLD_WIDTH,
      this.WORLD_HEIGHT,
      this.TILE_SIZE,
      this,
    )

    this.background = CreateBackground(
      this.WORLD_WIDTH * this.TILE_SIZE,
      this.WORLD_HEIGHT * this.TILE_SIZE,
      this.TILE_SIZE,
      this,
    )

    this.foreground = CreateForeground(
      this.WORLD_WIDTH * this.TILE_SIZE,
      this.WORLD_HEIGHT * this.TILE_SIZE,
      this.TILE_SIZE,
      this,
    )

    this.foregroundData = matrix(this.WORLD_WIDTH, this.WORLD_HEIGHT)
    this.foregroundData[2][4] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[2][5] = { moist: 300, nitrogen: 0, mushroom: null }
    this.foregroundData[3][4] = { moist: 200, nitrogen: 0, mushroom: null }
    this.foregroundData[3][5] = { moist: 100, nitrogen: 0, mushroom: null }

    this.pointer = this.input.activePointer
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = pointer.positionToCamera(
        this.camera,
      ) as Phaser.Math.Vector2

      this.hoveredTileX = this.background?.worldToTileX(worldPoint.x) || 0
      this.hoveredTileY = this.background?.worldToTileY(worldPoint.y) || 0

      if (this.gameState === GameState.Watering) {
        this.wateringCan.setPosition(worldPoint.x + 30, worldPoint.y - 30)
      } else if (this.gameState === GameState.Planting) {
        this.trowel.setPosition(worldPoint.x + 30, worldPoint.y - 30)
      }
    })

    EventBus.emit('current-scene-ready', this)
  }

  update(time: number, delta: number) {
    this.children.each((child) => {
      if (child.type === 'Text') child.destroy() // Destroying debug text
      if (child.type === 'Graphics') child.destroy()
    })

    for (let y = 0; y < this.WORLD_HEIGHT; y++) {
      for (let x = 0; x < this.WORLD_WIDTH; x++) {
        if (!this.foregroundData[x][y]) continue

        const moistStage = this.foregroundData[x][y].moist / 100
        this.foreground?.putTileAt(clamp(Math.floor(moistStage), 0, 3), y, x)

        const newMoist = delta / ((10 * this.DRYSPEED) / this.T_SCALE)
        this.foregroundData[x][y].moist -= newMoist
        if (moistStage <= 0) this.foregroundData[x][y].moist = 0

        const mushroom = this.foregroundData[x][y].mushroom
        if (mushroom) {
          // In here should be the multiplier logic for the growth speed
          const multiplier = 1

          mushroom.grow(
            delta / ((10 * this.GROWTHSPEED * multiplier) / this.T_SCALE),
          )

          if (this.IS_DEBUG) mushroom.debug() // Debugging
        }

        // Debugging
        if (this.IS_DEBUG) {
          this.add.text(
            y * this.TILE_SIZE + 10,
            x * this.TILE_SIZE + 10,
            `${Math.floor(this.foregroundData[x][y].moist)}`,
            {
              fontFamily: 'Arial',
              fontSize: '12px',
              color: 'orange',
            },
          )
        }
      }
    }

    if (this.gameState === GameState.Watering) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      if (!hoverX || !hoverY || !this.foregroundData[hoverY][hoverX]) return

      this.children.each((child) => {
        if (child.type === 'Graphics') child.destroy()
      })

      const tileXWorld = hoverX * this.TILE_SIZE
      const tileYWorld = hoverY * this.TILE_SIZE
      const graphics = this.add.graphics()
      graphics.fillStyle(0xffffff, 0.1)
      graphics.fillRect(tileXWorld, tileYWorld, this.TILE_SIZE, this.TILE_SIZE)

      if (this.pointer.isDown) {
        this.foregroundData[hoverY][hoverX].moist += (delta / 10) * this.T_SCALE
        if (this.foregroundData[hoverY][hoverX].moist >= 400) {
          this.foregroundData[hoverY][hoverX].moist = 400
        }
      }
    }

    if (this.gameState === GameState.Planting) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      if (!hoverX || !hoverY || !this.foregroundData[hoverY][hoverX]) {
        this.mushroomPreview.setPosition(-100, -100)
        return
      }

      this.mushroomPreview.setPosition(
        hoverX * this.TILE_SIZE + 80,
        hoverY * this.TILE_SIZE + 50,
      )

      const mushroom = this.foregroundData[hoverY][hoverX].mushroom
      if (this.pointer.isDown && !mushroom && this.sporeToPlant) {
        this.foregroundData[hoverY][hoverX].mushroom = new Mushroom(
          this,
          hoverX,
          hoverY,
          this.TILE_SIZE,
          this.sporeToPlant,
        )
      }
    }

    if (this.gameState === GameState.Idle) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      if (
        !hoverX ||
        !hoverY ||
        !this.foregroundData[hoverY][hoverX] ||
        !this.foregroundData[hoverY][hoverX].mushroom
      ) {
        this.input.setDefaultCursor('auto')
        return
      }

      this.input.setDefaultCursor('pointer')

      this.children.each((child) => {
        if (child.type === 'Graphics') child.destroy()
      })

      const tileXWorld = hoverX * this.TILE_SIZE
      const tileYWorld = hoverY * this.TILE_SIZE
      const graphics = this.add.graphics()
      graphics.fillStyle(0xffffff, 0.1)
      graphics.fillRect(tileXWorld, tileYWorld, this.TILE_SIZE, this.TILE_SIZE)

      if (this.input.mousePointer.isDown && this.pointer.leftButtonDown()) {
        this.infoboxCallback(
          this.foregroundData[hoverY][hoverX].mushroom?.getInfo(),
        )
      }
    }
  }

  stopEverything() {
    this.gameState = GameState.Idle
    this.input.setDefaultCursor('auto')
    this.camera.zoomTo(2, 100)

    if (this.wateringCan) this.wateringCan.destroy()
    if (this.trowel) this.trowel.destroy()
    if (this.mushroomPreview) this.mushroomPreview.destroy()
    if (this.sporeToPlant) this.sporeToPlant = null
    if (this.infoboxCallback) this.infoboxCallback(null)
  }

  startWatering() {
    this.gameState = GameState.Watering
    this.camera.zoomTo(2.2, 100)
    if (!this.IS_DEBUG) this.input.setDefaultCursor('none')

    // Creating the watering can sprite
    this.wateringCan = this.add.image(-100, -100, 'watering-can')
    this.wateringCan.setScale(0.5)
    this.wateringCan.depth = 3
  }

  startPlanting(
    spore: Spore,
    callback: Dispatch<React.SetStateAction<MushroomInfobox | null>>,
  ) {
    this.gameState = GameState.Planting
    this.camera.zoomTo(2.2, 100)
    if (!this.IS_DEBUG) this.input.setDefaultCursor('none')

    // Creating the trowel sprite
    this.trowel = this.add.image(-100, -100, 'trowel')
    this.trowel.setScale(0.5)
    this.trowel.depth = 3

    // Creating the mushroom preview sprite
    this.mushroomPreview = this.add.image(-100, -100, spore.texture, 3)
    this.mushroomPreview.setScale(1)
    this.mushroomPreview.depth = 2

    // Setting the spore data and infobox callback for the communication
    this.sporeToPlant = spore
    this.infoboxCallback = callback
  }

  startFocus() {
    this.camera.zoomTo(2.2, 100)
  }
}
