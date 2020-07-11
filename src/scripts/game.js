import 'phaser'
import '@babel/polyfill'

import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
import EndScene from './scenes/endScene'

const DEFAULT_WIDTH = 800
const DEFAULT_HEIGHT = 600

export const config = {
  type: Phaser.AUTO,
  backgroundColor: '#314157',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, EndScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 300 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
