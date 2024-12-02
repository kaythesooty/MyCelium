import randomInt from '@utils/randomInt'

export default function CreateBackground(
  width: number,
  height: number,
  tileSize: number,
  scene: Phaser.Scene,
) {
  const map = scene.make.tilemap({
    key: 'background-map',
    width,
    height,
    tileWidth: tileSize,
    tileHeight: tileSize,
  })
  const tileset = map.addTilesetImage('grass', 'grass', tileSize, tileSize)

  // Catching error if tileset image is not found
  if (!tileset) throw new Error('Background layer not found')

  const layer = map.createBlankLayer('background', tileset)

  // Catching error if layer has not been created
  if (!layer) throw new Error('Background layer not found')

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const randomTileTexture = randomInt(0, 3)
      map.putTileAt(randomTileTexture, x, y)
    }
  }

  return layer
}
