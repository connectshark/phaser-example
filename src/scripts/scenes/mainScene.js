export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  preload () {
    this.score = 0
  }

  create() {
    this.add.image(400, 300, 'sky')
    this.platforms = this.physics.add.staticGroup()
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()
    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')
    this.player = this.physics.add.sprite(100, 450, 'dude')
        .setBounce(0.2)
        .setCollideWorldBounds(true)

    this.physics.add.collider(this.player, this.platforms)


    this.cursors = this.input.keyboard.createCursorKeys()

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    this.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(this.player, this.stars, collectStar, null, this)
    
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      color: '#fff',
      resolution: 2,
      fontFamily: 'Tahoma'
    })

    this.bombs = this.physics.add.group()

    this.physics.add.collider(this.bombs, this.platforms)

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this)

    this.over = this.tweens.add({
      targets: this.player,
      y: '+=600',
      duration: 5000,
      paused: true,
      ease: 'Bounce.easeOut'
    })
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
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
    }
  }

function hitBomb (player, bomb){
  this.physics.pause()

  player.setTint(0xff0000)

  player.anims.play('turn')
  this.over.play()

  setTimeout(() => {
    this.scene.start('EndScene', this.score)
  }, 5000)
  
  
}
function collectStar (player, star) {
  star.disableBody(true, true)
  this.score += 10
  this.scoreText.setText(`Score: ${this.score}`)
  if (this.stars.countActive(true) === 0){
    this.stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    })

    const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    const bomb = this.bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}