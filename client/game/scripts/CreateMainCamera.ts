export default function CreateMainCamera(
  width: number,
  height: number,
  tileSize: number,
  scene: Phaser.Scene,
) {
  const camera = scene.cameras.main
  camera.setZoom(2)
  camera.setBounds(0, 0, width * tileSize, height * tileSize)
  camera.centerOn((width * tileSize) / 2, (height * tileSize) / 2)
  return camera
}
