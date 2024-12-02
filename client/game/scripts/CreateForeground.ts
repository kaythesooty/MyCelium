export default function CreateForeground(
  width: number,
  height: number,
  tileSize: number,
  scene: Phaser.Scene,
) {
  const map = scene.make.tilemap({
    key: 'dirt-map',
    width,
    height,
    tileWidth: tileSize,
    tileHeight: tileSize,
  })
  const tileset = map.addTilesetImage('dirt', 'dirt', tileSize, tileSize)

  // Catching error if tileset image is not found
  if (!tileset) throw new Error('Background layer not found')

  const layer = map.createBlankLayer('background', tileset)

  // Catching error if layer has not been created
  if (!layer) throw new Error('Background layer not found')

  return layer
}
