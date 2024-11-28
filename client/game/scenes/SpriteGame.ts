/* eslint-disable  @typescript-eslint/no-explicit-any */
import Phaser, { Physics, GameObjects, Types, Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class SpriteGame extends Scene {
  background!: GameObjects.Image
  platforms!: Physics.Arcade.StaticGroup
  player!: Physics.Arcade.Sprite
  stars!: GameObjects.Group
  bombs!: GameObjects.Group
  score!: number
  scoreText!: GameObjects.Text
  cursors!: Types.Input.Keyboard.CursorKeys

  constructor() {
    super('SpriteGame')
    this.score = 0
  }

  preload() {
    this.load.image('sky', 'sky.png')
  }

  create() {
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    this.background = this.add.image(
      viewportWidth / 2,
      viewportHeight / 2,
      'sky',
    )

    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })
    this.stars.getChildren().forEach((child: GameObjects.GameObject) => {
      const _child = child as Physics.Arcade.Sprite
      _child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.bombs = this.physics.add.group()

    this.scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
      color: '#000', //was fill before
    })

    if (this.input.keyboard) {
      this.cursors = this.input.keyboard?.createCursorKeys()
    }

    this.anims.create({
      // left sprite animation (uses frames 0-3) runs at 10 frames per second
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1, // tells animation to loop
    })

    this.anims.create({
      // frame 4 for turning
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      // same as left turn
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)
    this.physics.add.collider(this.bombs, this.platforms)

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      undefined,
      this,
    )

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      undefined,
      this,
    )

    EventBus.emit('current-scene-ready', this)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }
    if (this.cursors.up.isDown && this.player.body?.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  collectStar(player: any, star: any) {
    const _player = player as Physics.Arcade.Sprite
    const _star = star as Physics.Arcade.Sprite

    _star.disableBody(true, true)

    this.score += 10
    this.scoreText.setText('Score: ' + this.score)

    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child: GameObjects.GameObject) => {
        const _child = child as Physics.Arcade.Sprite
        _child.enableBody(true, _child.x, 0, true, true)
        return null
      })

      const x =
        _player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400)

      const bomb = this.bombs.create(x, 16, 'bomb')
      bomb.setBounce(1)
      bomb.setCollideWorldBounds(true)
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
    }
  }

  hitBomb(player: any) {
    const _player = player as Physics.Arcade.Sprite

    this.physics.pause()
    _player.setTint(0xff0000)
    _player.anims.play('turn')

    this.scene.start('GameOver')
  }
}
