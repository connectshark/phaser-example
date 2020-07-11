import { config } from "../game"

export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' })
  }

  create (score) {
    
    const gameover = this.add.text(config.scale.width / 2, 100, `GAME OVER`, {
      color: '#ff0',
      fontFamily: 'Tahoma',
      fontSize: 40,
      resolution: 2
    }).setOrigin(0.5, 0.5)

    this.restart = this.add.text(config.scale.width / 2, 400, 'restart', {
      color: '#fff',
      fontFamily: 'Tahoma',
      fontSize: 40,
      resolution: 2
    }).setOrigin(0.5, 0.5).setInteractive({useHandCursor: true})
      .on('pointerup',() => {
        this.scene.start('MainScene')
      }, this )
      .on('pointerover', () => {
        this.restart.alpha  = 0.5
      }, )
      .on('pointerout', () => {
        this.restart.alpha  = 1
      })
    this.add.text(config.scale.width / 2, 200, `SCORE: ${score}`, {
      color: '#fff',
      fontFamily: 'Tahoma',
      fontSize: 40,
      resolution: 2
    }).setOrigin(0.5, 0.5)

    this.tweens.add({
      targets: gameover,
      y: { from: 0, to: 100 },
      ease: 'Bounce.easeOut',
      duration: 1000,
      repeat: 0,
      yoyo: false
    })
  }
}