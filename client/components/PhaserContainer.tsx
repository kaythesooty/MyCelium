import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainMenu } from '@game/scenes/MainMenu'
import '@styles/phaser.scss'
import StartGame from '@game/main'
import { EventBus } from '@game/EventBus'
import { Game, Scene } from 'phaser'

export default function PhaserContainer() {
  const [currentScene, setCurrentScene] = useState<Scene | null>(null)
  const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 })
  // The sprite can only be moved in the MainMenu Scene
  const [isMainMenu, setIsMainMenu] = useState(true)
  const game = useRef<Game | null>(null!)

  const changeScene = () => {
    if (!game.current || !currentScene) return

    const scene = currentScene as MainMenu
    scene.changeScene()
  }

  const moveSprite = () => {
    if (!game.current || !currentScene) return

    if (currentScene.scene.key === 'MainMenu') {
      const scene = currentScene as MainMenu
      scene.moveLogo(({ x, y }) => setSpritePosition({ x, y }))
    }
  }

  const addSprite = () => {
    if (!game.current || !currentScene) return

    const scene = currentScene as MainMenu

    // Add more stars
    const x = Phaser.Math.Between(64, scene.scale.width - 64)
    const y = Phaser.Math.Between(64, scene.scale.height - 64)

    //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
    const star = scene.add.sprite(x, y, 'star')

    //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
    //  You could, of course, do this from within the Phaser Scene code, but this is just an example
    //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
    scene.add.tween({
      targets: star,
      duration: 500 + Math.random() * 1000,
      alpha: 0,
      yoyo: true,
      repeat: -1,
    })
  }

  useLayoutEffect(() => {
    if (game.current === null) game.current = StartGame('game-container')

    return () => {
      if (game.current) {
        game.current.destroy(true) // Destroy game instance
        if (game.current !== null) game.current = null // Reset game instance
      }
    }
  }, [])

  useEffect(() => {
    if (currentScene?.scene.key !== 'MainMenu') setIsMainMenu(false)
    else setIsMainMenu(true)

    EventBus.on('current-scene-ready', (scene: Scene) => {
      setCurrentScene(scene)
    })

    return () => {
      EventBus.removeListener('current-scene-ready')
    }
  }, [currentScene])

  return (
    <main className="relative flex h-dvh w-full items-start justify-center p-12">
      <div
        id="game-container"
        className="absolute inset-0 z-0 flex items-center justify-center"
      />

      <div className="z-10 p-8 flex bg-stone-800 text-stone-100">
        <button className="button" onClick={changeScene}>
          Change Scene
        </button>
        <button disabled={!isMainMenu} className="button" onClick={moveSprite}>
          Toggle Movement
        </button>
        <button className="button" onClick={addSprite}>
          Add New Sprite
        </button>
        <div className="spritePosition">
          Sprite Position:
          <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
        </div>
      </div>
    </main>
  )
}
