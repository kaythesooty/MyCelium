import { useEffect, useState } from 'react'
import { EventBus } from '@game/EventBus'
import { Mushrooms } from '@game/scenes/Mushrooms'
import { MushroomName } from '@models/enums'
import Fungipedia from '@components/layers/Fungipedia'
import Chest from '@components/layers/Chest'

enum Popup {
  Chest,
  Market,
  Fungipedia,
}

export default function UserInterface() {
  const [currentScene, setCurrentScene] = useState<Mushrooms | null>(null)
  const [currentPopup, setCurrentPopup] = useState<Popup | null>(null)
  const [tooltip, setTooltip] = useState<string | null>(null)

  const redMushroom = MushroomName.RedMushroom

  const handleWater = () => currentScene?.startWatering(setTooltip)
  const handleFeed = () => console.log('Handling Feed')
  const handlePlant = () => currentScene?.startPlanting(redMushroom, setTooltip)

  useEffect(() => {
    EventBus.on('current-scene-ready', (scene: Mushrooms) => {
      setCurrentScene(scene)
    })

    return () => {
      EventBus.removeListener('current-scene-ready')
    }
  }, [currentScene])

  return (
    <>
      <div
        className={`absolute top-36 flex h-14 w-36 items-center justify-center bg-yellow-500 transition-all ${tooltip !== null ? ' -left-56' : 'left-8'}`}
      >
        $73
      </div>

      <div
        className={`absolute flex flex-col gap-12 transition-all ${
          tooltip !== null ? ' -left-56' : 'left-8'
        }`}
      >
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

      <div
        className={`absolute flex flex-col gap-12 transition-all ${
          tooltip !== null ? ' -right-56' : 'right-8'
        }`}
      >
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

      {tooltip && (
        <p className="font-game absolute bottom-10 text-4xl text-orange-100">
          {tooltip}
        </p>
      )}

      <div className="absolute">
        {currentPopup === Popup.Chest && (
          <Chest onClose={() => setCurrentPopup(null)} />
        )}
        {currentPopup === Popup.Market && <PopupElement />}
        {currentPopup === Popup.Fungipedia && <Fungipedia />}
      </div>
    </>
  )
}

function PopupElement() {
  return null
}
