import { Dispatch } from 'react'
import Phaser from 'phaser'
import { EventBus } from '../EventBus'
import randomInt from '@utils/randomInt'
import matrix from '@utils/matrix'
import { MushroomName } from '@models/enums'
import { Mushroom } from '@game/entities/Mushroom'
// import { Mushroom, RedMushroom } from '@game/entities/Mushroom'
// import { Camera } from '@game/entities/Camera'

interface GameTile {
  moist: number
  nitrogen: number
  isHovered?: boolean
  isWatered?: boolean
}

enum UserState {
  Idle,
  Watering,
  Feeding,
  Planting,
}

export class Mushrooms extends Phaser.Scene {
  TILE_SIZE = 150
  WORLD_WIDTH = 10
  WORLD_HEIGHT = 6
  IS_DEBUG = false
  GROWTHSPEED = 10 // how long in seconds it takes a mushroom to fully grow given optimal conditions
  DRYSPEED = 0.1 // how long in seconds it takes a dirt tile to dry out

  // camera!: Camera
  camera!: Phaser.Cameras.Scene2D.Camera
  pointer!: Phaser.Input.Pointer
  userState: UserState = UserState.Idle

  wateringCan!: Phaser.GameObjects.Image
  wateringCanX!: number
  wateringCanY!: number
  plantingTool!: Phaser.GameObjects.Image
  plantingMushroom!: Phaser.GameObjects.Image

  hoveredTileX!: number
  hoveredTileY!: number

  dirtLayerData!: GameTile[][]
  mushroomData!: Mushroom[]

  mushroomtimer: number = 0

  grassMap!: Phaser.Tilemaps.Tilemap
  dirtMap!: Phaser.Tilemaps.Tilemap
  grassTiles!: Phaser.Tilemaps.Tileset | null
  dirtTiles!: Phaser.Tilemaps.Tileset | null

  background!: Phaser.Tilemaps.TilemapLayer | null
  foreground!: Phaser.Tilemaps.TilemapLayer | null
  userInterface!: Phaser.Tilemaps.TilemapLayer | null
  devInterface!: Phaser.Tilemaps.TilemapLayer | null

  constructor() {
    super('Mushrooms')
  }

  preload() {
    this.load.image('grass', 'grass.png')
  }

  create() {
    //   this.camera = new Camera(
    //     this,
    //     this.cameras.main,
    //     0,
    //     0,
    //     this.WORLD_WIDTH * this.TILE_SIZE,
    //     this.WORLD_HEIGHT * this.TILE_SIZE,
    //   )
    //   this.camera.initialize()

    this.camera = this.cameras.main
    this.camera.setZoom(2)
    this.camera.setBounds(
      0,
      0,
      this.WORLD_WIDTH * this.TILE_SIZE,
      this.WORLD_HEIGHT * this.TILE_SIZE,
    )
    this.camera.centerOn(
      (this.WORLD_WIDTH * this.TILE_SIZE) / 2,
      (this.WORLD_HEIGHT * this.TILE_SIZE) / 2,
    )

    // this.input.on('wheel', (pointer: Phaser.Input.Pointer) => {
    //   if (this.camera.zoom >= 1.8 && this.camera.zoom <= 2.5) {
    //     this.camera.zoom += pointer.deltaY * -0.005
    //   }
    //   if (this.camera.zoom <= 1.8) this.camera.zoom = 1.8
    //   if (this.camera.zoom >= 2.5) this.camera.zoom = 2.5
    // })

    this.pointer = this.input.activePointer

    // this.input.on('pointerdown', () => {
    //   this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
    //     this.camera.scrollX -= 0.05 * pointer.velocity.x
    //     this.camera.scrollY -= 0.05 * pointer.velocity.y
    //   })
    // })

    // this.input.on('pointerup', () => {
    //   this.input.off('pointermove')
    // })

    this.grassMap = this.make.tilemap({
      key: 'grass map',
      width: this.WORLD_WIDTH,
      height: this.WORLD_HEIGHT,
      tileHeight: this.TILE_SIZE,
      tileWidth: this.TILE_SIZE,
    })

    this.dirtMap = this.make.tilemap({
      key: 'dirt map',
      width: this.WORLD_WIDTH,
      height: this.WORLD_HEIGHT,
      tileHeight: this.TILE_SIZE,
      tileWidth: this.TILE_SIZE,
    })

    this.grassTiles = this.grassMap.addTilesetImage(
      'grass',
      'grass',
      this.TILE_SIZE,
      this.TILE_SIZE,
    )

    this.dirtTiles = this.dirtMap.addTilesetImage(
      'dirt',
      'dry dirt',
      this.TILE_SIZE,
      this.TILE_SIZE,
    )

    // Catching error if tileset is not found
    if (!this.grassTiles || !this.dirtTiles) {
      throw new Error('Tileset not found')
    }

    this.background = this.grassMap.createBlankLayer(
      'Background',
      this.grassTiles,
    )

    this.foreground = this.dirtMap.createBlankLayer(
      'Foreground',
      this.dirtTiles,
    )

    // Catching error if any of layers are not found
    if (!this.background || !this.foreground) {
      throw new Error('Layer not found')
    }

    for (let x = 0; x < this.WORLD_WIDTH; x++) {
      for (let y = 0; y < this.WORLD_HEIGHT; y++) {
        const randomTileTexture = randomInt(0, 3)
        this.grassMap.putTileAt(randomTileTexture, x, y)
      }
    }

    this.dirtLayerData = matrix(this.WORLD_WIDTH, this.WORLD_HEIGHT)
    this.dirtLayerData[2][4] = { moist: 0, nitrogen: 0 }
    this.dirtLayerData[2][5] = { moist: 180, nitrogen: 0 }
    this.dirtLayerData[3][4] = { moist: 120, nitrogen: 0 }
    this.dirtLayerData[3][5] = { moist: 60, nitrogen: 0 }

    this.mushroomData = []

    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = pointer.positionToCamera(
        this.camera,
      ) as Phaser.Math.Vector2

      this.hoveredTileX = this.foreground?.worldToTileX(worldPoint.x) || 0
      this.hoveredTileY = this.foreground?.worldToTileY(worldPoint.y) || 0

      if (this.userState === UserState.Watering) {
        this.wateringCan.setPosition(worldPoint.x + 50, worldPoint.y - 50)
      } else if (this.userState === UserState.Planting) {
        this.plantingTool.setPosition(worldPoint.x + 50, worldPoint.y - 50)
      }
    })

    EventBus.emit('current-scene-ready', this)
  }

  update(time: number, delta: number) {
    this.input.setDefaultCursor('auto')

    this.children.each((child) => {
      if (child.type === 'Text') child.destroy() // Destroying debug text
      if (child.type === 'Graphics') child.destroy()
    })

    for (let x = 0; x < this.WORLD_WIDTH; x++) {
      for (let y = 0; y < this.WORLD_HEIGHT; y++) {
        if (!this.dirtLayerData[x][y]) continue

        // Setting texture based on moisture of the dirt tile
        let texture = 0
        if (this.dirtLayerData[x][y].moist >= 120) texture = 3
        else if (this.dirtLayerData[x][y].moist >= 60) texture = 2
        else if (this.dirtLayerData[x][y].moist > 0) texture = 1
        else texture = 0
        // Putting tile on the map
        this.foreground?.putTileAt(texture, y, x)

        const isWatered = this.dirtLayerData[x][y].isWatered
        this.dirtLayerData[x][y].moist += isWatered ? 1 : -0.1
        if (this.dirtLayerData[x][y].moist < 0) {
          this.dirtLayerData[x][y].moist = 0
        } else if (this.dirtLayerData[x][y].moist > 180) {
          this.dirtLayerData[x][y].moist = 180
        }

        // Debugging
        if (this.IS_DEBUG) {
          this.add.text(
            y * this.TILE_SIZE + 10,
            x * this.TILE_SIZE + 10,
            `${this.dirtLayerData[x][y].moist}`,
            {
              fontFamily: 'Arial',
              fontSize: '12px',
              color: 'orange',
            },
          )
        }
      }

      this.mushroomtimer += delta
      while (this.mushroomtimer > 250 * this.GROWTHSPEED) {
        this.mushroomData.forEach((mushroom) => mushroom.grow(3))
        this.mushroomtimer -= 250 * this.GROWTHSPEED
      }
    }

    if (this.userState === UserState.Idle) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      if (!hoverX || !hoverY || !this.dirtLayerData[hoverY][hoverX]) return

      this.children.each((child) => {
        if (child.type === 'Graphics') child.destroy()
      })

      const tileXWorld = hoverX * this.TILE_SIZE
      const tileYWorld = hoverY * this.TILE_SIZE
      const graphics = this.add.graphics()
      // graphics.fillStyle(0xffffff, 0.1)
      // graphics.fillRect(tileXWorld, tileYWorld, this.TILE_SIZE, this.TILE_SIZE)

      this.mushroomData.forEach((mushroom) => {
        if (mushroom.isExistent(tileXWorld, tileYWorld)) {
          this.input.setDefaultCursor('pointer')

          graphics.fillStyle(0xffffff, 0.3)
          graphics.fillRect(
            tileXWorld,
            tileYWorld,
            this.TILE_SIZE,
            this.TILE_SIZE,
          )
        }
      })
    }

    if (this.userState === UserState.Watering) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      // This is to prevent watering outside of the map
      if (!hoverX || !hoverY || !this.dirtLayerData[hoverY][hoverX]) return

      this.children.each((child) => {
        if (child.type === 'Graphics') child.destroy()
      })

      const tileXWorld = hoverX * this.TILE_SIZE
      const tileYWorld = hoverY * this.TILE_SIZE
      const graphics = this.add.graphics()
      graphics.fillStyle(0xffffff, 0.1)
      graphics.fillRect(tileXWorld, tileYWorld, this.TILE_SIZE, this.TILE_SIZE)

      if (this.pointer.isDown) {
        this.dirtLayerData[hoverY][hoverX].isWatered = true
      } else {
        for (let x = 0; x < this.WORLD_WIDTH; x++) {
          for (let y = 0; y < this.WORLD_HEIGHT; y++) {
            if (!this.dirtLayerData[x][y]) continue
            this.dirtLayerData[x][y].isWatered = false
          }
        }
      }
    }

    if (this.userState === UserState.Planting) {
      const hoverX = this.hoveredTileX
      const hoverY = this.hoveredTileY
      // This is to prevent planting outside of the map
      this.plantingMushroom.setPosition(-100, -100)
      if (!hoverX || !hoverY || !this.dirtLayerData[hoverY][hoverX]) return

      const tileXWorld = hoverX * this.TILE_SIZE
      const tileYWorld = hoverY * this.TILE_SIZE
      this.plantingMushroom.setPosition(tileXWorld + 80, tileYWorld + 50)
    }
  }

  startWatering(reactCallback: Dispatch<React.SetStateAction<string | null>>) {
    this.userState = UserState.Watering
    reactCallback('Press Right Mouse Button to stop watering')
    this.camera.zoomTo(2.2, 100)
    if (!this.IS_DEBUG) this.input.setDefaultCursor('none')

    this.wateringCan = this.add.image(-100, -100, 'watering can')
    this.wateringCan.setScale(0.5)
    this.wateringCan.depth = 3

    this.input.on('pointerdown', () => {
      if (this.pointer.rightButtonDown()) {
        if (this.input.mouse) this.input.mouse.disableContextMenu()

        this.userState = UserState.Idle
        this.wateringCan.destroy()
        this.input.setDefaultCursor('auto')
        this.camera.zoomTo(2, 100)
        reactCallback(null)

        for (let x = 0; x < this.WORLD_WIDTH; x++) {
          for (let y = 0; y < this.WORLD_HEIGHT; y++) {
            if (!this.dirtLayerData[x][y]) continue
            this.dirtLayerData[x][y].isWatered = false
          }
        }

        this.input.off('pointerdown')
      }
    })
  }

  startPlanting(
    mushroom: MushroomName,
    reactCallback: Dispatch<React.SetStateAction<string | null>>,
  ) {
    this.userState = UserState.Planting
    reactCallback('Press Right Mouse Button to stop planting')
    this.camera.zoomTo(2.2, 100)
    if (!this.IS_DEBUG) this.input.setDefaultCursor('none')

    this.plantingTool = this.add.image(-100, -100, 'planting tool')
    this.plantingTool.setScale(0.5)
    this.plantingTool.depth = 3

    this.plantingMushroom = this.add.image(-100, -100, mushroom, 3)
    this.plantingMushroom.setScale(1)
    this.plantingMushroom.depth = 2

    this.input.on('pointerdown', () => {
      if (this.pointer.leftButtonDown()) {
        if (!this.dirtLayerData[this.hoveredTileY][this.hoveredTileX]) return

        this.mushroomData.push(
          new Mushroom(
            this,
            this.hoveredTileX,
            this.hoveredTileY,
            this.TILE_SIZE,
            mushroom,
          ),
        )
        console.log(this.mushroomData)
      }

      if (this.pointer.rightButtonDown()) {
        if (this.input.mouse) this.input.mouse.disableContextMenu()

        this.userState = UserState.Idle
        this.plantingTool.destroy()
        this.plantingMushroom.destroy()
        this.input.setDefaultCursor('auto')
        this.camera.zoomTo(2, 100)
        reactCallback(null)

        this.input.off('pointerdown')
      }
    })
  }
}
