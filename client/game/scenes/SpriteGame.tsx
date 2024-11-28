import React from 'react'
import Phaser, { Physics, GameObjects, Scene } from 'phaser'
import { EventBus } from '../EventBus'

export class SpriteGame extends Scene {
  background!: GameObjects.Image
  platforms!: Physics.Arcade.StaticGroup
  player!: GameObjects.Sprite
  stars!: GameObjects.Sprite
  score!: GameObjects.Text

  // physics!: Physics.Arcade.ArcadePhysics
  // cursors!: Scene
  // physics!:

  constructor() {
    super('SpriteGame')
  }

  preload() {
    this.load.image('sky', 'sky.png')
  }

  create() {
    this.background = this.add.image(512, 384, 'sky')

    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(100, 450, 'dude')

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.platforms)

    // this.anims.create({
    //   // left sprite animation (uses frames 0-3) runs at 10 frames per second
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1, // tells animation to loop
    // })

    // this.anims.create({
    //   // frame 4 for turning
    //   key: 'turn',
    //   frames: [{ key: 'dude', frame: 4 }],
    //   frameRate: 20,
    // })

    // this.anims.create({
    //   // same as left turn
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1,
    // })

    // stars = this.physics.add.group({
    //   key: 'star',
    //   repeat: 11,
    //   setXY: { x: 12, y: 0, stepX: 70 }, // stepX means all children will be placed evently accross the screen
    // })

    // stars.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)) // randomly bounce
    // })
    // bombs = this.physics.add.group()

    // cursors = this.input.keyboard.createCursorKeys()

    // this.physics.add.collider(player, platforms)
    // this.physics.add.collider(stars, platforms)
    // this.physics.add.collider(bombs, platforms)

    // this.physics.add.collider(player, bombs, hitBomb, null, this)
    // this.physics.add.overlap(player, stars, collectStar, null, this)
    // scoreText = this.add.text(16, 16, 'score: 0', {
    //   fontSize: '32px',
    //   fill: '#000',
    // })

    EventBus.emit('current-scene-ready', this)
  }

  update() {
    // if (cursors.left.isDown) {
    //   player.setVelocityX(-160)
    //   player.anims.play('left', true)
    // } else if (cursors.right.isDown) {
    //   player.setVelocityX(160)
    //   player.anims.play('right', true)
    // } else {
    //   player.setVelocityX(0)
    //   player.anims.play('turn')
    // }
    // if (cursors.up.isDown && player.body.touching.down) {
    //   player.setVelocityY(-330)
    // }
  }

  // collectStar(player, star) {
  //   star.disableBody(true, true)

  //   score += 10
  //   scoreText.setText('Score: ' + score)

  //   if (stars.countActive(true) === 0) {
  //     stars.children.iterate(function (child) {
  //       child.enableBody(true, child.x, 0, true, true)
  //     })

  //     const x =
  //       player.x < 400
  //         ? Phaser.Math.Between(400, 800)
  //         : Phaser.Math.Between(0, 400)

  //     const bomb = bombs.create(x, 16, 'bomb')
  //     bomb.setBounce(1)
  //     bomb.setCollideWorldBounds(true)
  //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
  //   }
  // }

  // hitBomb(player, bomb) {
  //   this.physics.pause()

  //   player.setTint(0xff0000)

  //   player.anims.play('turn')

  //   gameOver = true
  // }
  changeScene() {
    this.scene.start('MainMenu')
  }
}
