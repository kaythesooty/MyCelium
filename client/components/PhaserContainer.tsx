import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Game, Scene } from 'phaser'
import StartGame from '@game/main'
import { EventBus } from '@game/EventBus'
import Fungipedia from './Fungipedia'
import '@styles/phaser.scss'

enum Popup {
  Chest,
  Market,
  Fungipedia,
}

export default function PhaserContainer() {
  const [currentScene, setCurrentScene] = useState<Scene | null>(null)
  const [currentPopup, setCurrentPopup] = useState<Popup | null>(null)
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

  const handleWater = () => console.log('Handling Water')
  const handleFeed = () => console.log('Handling Feed')
  const handlePlant = () => console.log('Handling Plant')

  return (
    <main className="relative flex h-dvh w-full items-center justify-center">
      {/* Game Layer */}
      <div id="game-container" className="z-0 h-dvh w-full" />

      {/* UI Layer */}
      <div className="absolute inset-0 z-10 flex flex-col">
        <div className="flex h-24 w-full flex-col items-start justify-end pl-8">
          <div className="flex h-14 w-36 items-center justify-center bg-yellow-500">
            $73
          </div>
        </div>
        <div className="flex w-full flex-1">
          <div className="flex flex-1 flex-col items-start justify-center gap-8 pl-8">
            <button
              onClick={() => setCurrentPopup(Popup.Chest)}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Chest
            </button>

            <button
              onClick={() => setCurrentPopup(Popup.Market)}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Market
            </button>

            <button
              onClick={() => setCurrentPopup(Popup.Fungipedia)}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Fungipedia
            </button>
          </div>

          <div className="flex flex-1 flex-col items-end justify-center gap-8 pr-8">
            <button
              onClick={handleWater}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Water
            </button>

            <button
              onClick={handleFeed}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Feed
            </button>

            <button
              onClick={handlePlant}
              className="flex h-14 w-56 items-center justify-center bg-yellow-500"
            >
              Plant
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up Layer */}
      <div className="absolute z-20">
        <PopupComponent popup={currentPopup} />
      </div>
    </main>
  )
}

interface PopupComponentProps {
  popup: Popup | null
}

function PopupComponent({ popup }: PopupComponentProps) {
  if (popup === null) return null
  // else if (popup === Popup.Chest) return <ChestPopup />
  // else if (popup === Popup.Market) return <MarketPopup />
  else if (popup === Popup.Fungipedia) return <Fungipedia />
}
