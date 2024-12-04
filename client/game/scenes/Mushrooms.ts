import { Dispatch } from 'react'
import { EventBus } from '../EventBus'
import matrix from '@utils/matrix'
import clamp from '@utils/clamp'
import { MushroomInfobox, Spore, SlotItem, GameTile, Item } from '@interfaces'
import CreateBackground from '@game/scripts/CreateBackground'
import CreateForeground from '@game/scripts/CreateForeground'
import CreateMainCamera from '@game/scripts/CreateMainCamera'
import CreateInventory from '@game/scripts/CreateInventory'
import { Mushroom } from '@game/entities/Mushroom'
import { wateringCan, shovelOne } from '../../audio/audioEngine'
import items from '@data/items'

enum GameState {
  Idle,
  Watering,
  Feeding,
  Planting,
}

export class Mushrooms extends Phaser.Scene {
  IS_DEBUG = true // You know what to do >:-)
  T_SCALE = 5 // Controls the time scale of the game for debugging purposes

  TILE_SIZE = 150
  WORLD_WIDTH = 9
  WORLD_HEIGHT = 7

  GROWTHSPEED = 60 // how long in seconds it takes a mushroom to grow one step
  DRYSPEED = 60 // how long in seconds it takes a dirt tile to dry one step

  camera!: Phaser.Cameras.Scene2D.Camera
  pointer!: Phaser.Input.Pointer
  hoveredTileX!: number
  hoveredTileY!: number
  background!: Phaser.Tilemaps.TilemapLayer | null
  foreground!: Phaser.Tilemaps.TilemapLayer | null

  gameState: GameState = GameState.Idle
  foregroundData!: GameTile[][]
  inventoryData!: SlotItem[]
  moneyData: number = 73

  wateringCan!: Phaser.GameObjects.Image
  trowel!: Phaser.GameObjects.Image
  mushroomPreview!: Phaser.GameObjects.Image
  fertiliser!: Phaser.GameObjects.Image

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

    this.inventoryData = CreateInventory() // Tweak the starting inventory here
    // Setting the registry data for the shared inventory and money
    this.registry.set({
      money: this.moneyData,
      inventory: this.inventoryData,
    })

    this.events.on('registry:update-inventory', (inventory: SlotItem[]) => {
      this.registry.set('inventory', inventory)
    })

    this.events.on('registry:update-money', (value: number) => {
      this.registry.set('money', value)
    })

    this.foregroundData = matrix(this.WORLD_WIDTH, this.WORLD_HEIGHT)
    this.foregroundData[2][3] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[2][4] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[2][5] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[3][4] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[3][5] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[3][3] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[4][4] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[4][5] = { moist: 0, nitrogen: 0, mushroom: null }
    this.foregroundData[4][3] = { moist: 0, nitrogen: 0, mushroom: null }

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
      } else if (this.gameState === GameState.Feeding) {
        this.fertiliser.setPosition(worldPoint.x + 30, worldPoint.y - 30)
      }
    })

    EventBus.emit('current-scene-ready', this)
  }

  update(time: number, delta: number) {
    this.children.each((child) => {
      if (child.name === 'debug') child.destroy()
      // if (child.type === 'Text') child.destroy() // Destroying debug text
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

        const newFood = delta / ((30 * this.DRYSPEED) / this.T_SCALE)
        this.foregroundData[x][y].nitrogen -= newFood
        if (this.foregroundData[x][y].nitrogen <= 0)
          this.foregroundData[x][y].nitrogen = 0

        const mushroom = this.foregroundData[x][y].mushroom
        if (mushroom) {
          const tile = this.foregroundData[x][y]
          // In here should be the multiplier logic for the growth speed
          let multiplier = 1
          if (Math.floor(tile.moist / 100) === mushroom.thirst) {
            multiplier = 0.5
            mushroom.watered = 2
          } else if (Math.floor(tile.moist / 100) === mushroom.thirst - 1) {
            multiplier = 0.8
            mushroom.watered = 1
          } else if (Math.floor(tile.moist / 100) === mushroom.thirst + 1) {
            multiplier = 0.8
            mushroom.watered = 1
          } else if (Math.floor(tile.moist / 100) != mushroom.thirst) {
            multiplier = 100
            mushroom.watered = 0
          }
          if (tile.nitrogen >= 30) mushroom.fed = 2
          else if (tile.nitrogen < 30) mushroom.fed = 1
          if (tile.nitrogen == 0) {
            multiplier = 100
            mushroom.fed = 0
          }

          mushroom.grow(
            delta / ((10 * this.GROWTHSPEED * multiplier) / this.T_SCALE),
          )

          if (this.IS_DEBUG) mushroom.debug() // Debugging
        }

        // Debugging
        if (this.IS_DEBUG) {
          const debugMoistLevel = this.add.text(
            y * this.TILE_SIZE + 10,
            x * this.TILE_SIZE + 10,
            `${Math.floor(this.foregroundData[x][y].moist)}`,
            {
              fontFamily: 'Arial',
              fontSize: '12px',
              color: 'orange',
            },
          )
          debugMoistLevel.depth = 5
          debugMoistLevel.setName('debug')

          const debugGrowthFactor = this.add.text(
            y * this.TILE_SIZE + 120,
            x * this.TILE_SIZE + 10,
            `${Math.floor(this.foregroundData[x][y].nitrogen)}`,
            {
              fontFamily: 'Arial',
              fontSize: '12px',
              color: 'blue',
            },
          )
          debugGrowthFactor.depth = 5
          debugGrowthFactor.setName('debug')
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
        if (!wateringCan.playing()) {
          wateringCan.play()
        }
        this.foregroundData[hoverY][hoverX].moist += (delta / 10) * this.T_SCALE
        if (this.foregroundData[hoverY][hoverX].moist >= 400) {
          this.foregroundData[hoverY][hoverX].moist = 400
        }
      } else {
        if (wateringCan.playing()) {
          wateringCan.stop()
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
        shovelOne.play()
      }
    }

    if (this.gameState === GameState.Feeding) {
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
        this.foregroundData[hoverY][hoverX].nitrogen = 100
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

      if (this.input.mousePointer.isDown && this.pointer.rightButtonDown()) {
        const shroom = this.foregroundData[hoverY][hoverX].mushroom

        if (shroom.grown) {
          this.harvest(this.foregroundData[hoverY][hoverX])
        }
      }
    }
  }

  harvest(tile: GameTile) {
    if (tile.mushroom === null || tile.mushroom === undefined) return

    tile.mushroom.mushroom.destroy()
    tile.mushroom = null

    const inv = this.registry.get('inventory') as SlotItem[]
    console.log('on harvest: ', inv)
    //note this is very hacky. eventually we need to get the actual proper item from the mushroom but for now we only have one so itz okey

    function addItem(item: Item) {
      const chestItem = inv.find((slot) => slot?.item.name === item.name)
      const index = inv.findIndex((slot) => slot?.item.name === item.name)

      if (chestItem && inv[index].quantity) inv[index].quantity++
      else {
        let fisrtEmptySlotIndex = 0
        for (let index = 0; index < 30; index++) {
          const exists = inv.find((slot) => slot?.index === index)
          if (exists) continue
          fisrtEmptySlotIndex = index
          break
        }

        inv.push({ index: fisrtEmptySlotIndex, item, quantity: 1 })
      }
    }

    addItem(items[0])
    addItem(items[1])
  }

  stopEverything() {
    this.gameState = GameState.Idle
    this.input.setDefaultCursor('auto')
    this.camera.zoomTo(1.6, 100)

    if (this.wateringCan) this.wateringCan.destroy()
    if (this.trowel) this.trowel.destroy()
    if (this.fertiliser) this.fertiliser.destroy()
    if (this.mushroomPreview) this.mushroomPreview.destroy()
    if (this.sporeToPlant) this.sporeToPlant = null
    if (this.infoboxCallback) this.infoboxCallback(null)

    // buttonClickTwo.play()
  }

  startWatering() {
    this.gameState = GameState.Watering
    this.startFocus()
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
    this.startFocus()
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

  startFeeding() {
    this.gameState = GameState.Feeding
    this.startFocus()
    if (!this.IS_DEBUG) this.input.setDefaultCursor('none')

    this.fertiliser = this.add.image(-100, -100, 'fertiliser')
    this.fertiliser.setScale(0.5)
    this.fertiliser.depth = 3
  }

  startFocus() {
    this.camera.zoomTo(1.8, 100)
  }
}
