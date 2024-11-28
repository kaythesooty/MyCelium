import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Game, Scene } from 'phaser'
import StartGame from '@game/main'
import { EventBus } from '@game/EventBus'
import '@styles/phaser.scss'

export default function PhaserContainer() {
  const [currentScene, setCurrentScene] = useState<Scene | null>(null)
  const game = useRef<Game | null>(null!)

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
    EventBus.on('current-scene-ready', (scene: Scene) => {
      setCurrentScene(scene)
    })

    return () => {
      EventBus.removeListener('current-scene-ready')
    }
  }, [currentScene])

  const handleWater = () => {}
  const handleFeed = () => {}
  const handlePlant = () => {}

  return (
    <main className="relative flex h-dvh w-full items-start justify-center p-12">
      <div
        id="game-container"
        className="absolute inset-0 z-0 flex items-center justify-center"
      />

      <div className="z-10 place-self-end flex gap-4">
        <button className="w-24 bg-lime-200 p-4" onClick={handleWater}>
          Water
        </button>
        <button className="w-24 bg-lime-200 p-4" onClick={handleFeed}>
          Feed
        </button>
        <button className="w-24 bg-lime-200 p-4" onClick={handlePlant}>
          Plant
        </button>
      </div>
    </main>
  )
}
