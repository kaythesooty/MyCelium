import { useEffect, useState } from 'react'
import { EventBus } from '@game/EventBus'
import { Mushrooms } from '@game/scenes/Mushrooms'
import Infobox from '@components/Infobox'
import Chest from '@components/Chest'
import Market from '@components/Market'
import Fungipedia from '@components/Fungipedia'
import Button from '@components/Buttons'
import { PopupName } from '@enums'
import { MushroomInfobox, Spore } from '@interfaces'
import { buttonClickOne, buttonClickTwo } from '../audio/audioEngine.ts'

// Remove later
const tempSpore: Spore = {
  name: "Lover's Redcap",
  texture: 'red-mushroom',
  img: '/assets/item_red_mushroom.png',
  description: 'A red mushroom',
}

export default function UserInterface() {
  const [scene, setScene] = useState<Mushrooms | null>(null)
  const [popup, setPopup] = useState<PopupName | null>(null)
  const [tooltip, setTooltip] = useState<string | null>(null)
  const [sporeItem] = useState<Spore | null>(tempSpore)
  const [infoData, setInfoData] = useState<MushroomInfobox | null>(null)
  const [userMoney, setUserMoney] = useState<number>(0)

  useEffect(() => {
    const handleContext = (event: MouseEvent) => {
      event.preventDefault()
      if (popup || tooltip) handleBackAudio() // Playing the back audio
      if (popup !== null) setPopup(null)
      if (tooltip !== null) setTooltip(null)
      scene?.stopEverything()
    }

    EventBus.on('current-scene-ready', (scene: Mushrooms) => setScene(scene))
    document.addEventListener('contextmenu', handleContext)

    if (infoData) {
      setPopup(PopupName.Infobox)
      setTooltip('Press Right Mouse Button to close Infobox')
      scene?.startFocus()
    }

    const money = scene?.registry.get('money')
    if (money) setUserMoney(money)

    return () => {
      EventBus.removeListener('current-scene-ready')
      document.removeEventListener('contextmenu', handleContext)
    }
  }, [scene, popup, tooltip, infoData, userMoney])

  const handleButtonAudio = () => buttonClickOne.play()
  const handleBackAudio = () => buttonClickTwo.play()

  return (
    <>
      <div
        className={`absolute top-36 flex h-12 w-44 items-center justify-start rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all ${tooltip !== null ? ' -left-64' : 'left-8'}`}
      >
        <img
          src="/assets/icon_cash.png"
          alt=""
          width={96}
          height={96}
          className="pointer-events-none absolute z-10 size-20"
        />
        <span className="pointer-events-none ml-12 mr-6 w-full -translate-y-2 text-right text-[#522c13]">
          ${userMoney}
        </span>
      </div>

      <div
        className={`absolute flex flex-col gap-12 transition-all ${
          tooltip !== null ? ' -left-64' : 'left-8'
        }`}
      >
        <Button
          text="Chest"
          iconSrc={'/assets/icon_chest.png'}
          iconPosition="left"
          onClick={() => {
            setPopup(PopupName.Chest)
            handleButtonAudio()
            setTooltip('Press Right Mouse Button to close Chest')
          }}
        />

        <Button
          text="Market"
          iconSrc={'/assets/icon_market.png'}
          iconPosition="left"
          onClick={() => {
            setPopup(PopupName.Market)
            handleButtonAudio()
            setTooltip('Press Right Mouse Button to close Market')
          }}
        />

        <Button
          text="Fungipedia"
          iconSrc={'/assets/icon_fungipedia.png'}
          iconPosition="left"
          onClick={() => {
            setPopup(PopupName.Fungipedia)
            handleButtonAudio()
            setTooltip('Press Right Mouse Button to close Fungipedia')
          }}
        />
      </div>

      <div
        className={`absolute flex flex-col gap-12 transition-all ${
          tooltip !== null ? ' -right-64' : 'right-8'
        }`}
      >
        <Button
          text="Water"
          iconSrc={'/assets/icon_watering_can.png'}
          iconPosition="right"
          onClick={() => {
            scene?.startWatering()
            handleButtonAudio()
            setTooltip('Press Right Mouse Button to stop Watering')
          }}
        />

        <Button
          text="Fertilise"
          iconSrc={'/assets/icon_fertiliser.png'}
          iconPosition="right"
          onClick={() => {
            handleButtonAudio()
            scene?.startFeeding()
            setTooltip('Press Right Mouse Button to stop Fertilising')
          }}
        />

        <Button
          text="Plant"
          iconSrc={'/assets/icon_trowel.png'}
          iconPosition="right"
          onClick={() => {
            if (!sporeItem) return // Need to figure out the logic for this
            scene?.startPlanting(sporeItem, setInfoData)
            handleButtonAudio()
            setTooltip('Press Right Mouse Button to stop Planting')
          }}
        />

        <Button
          text="Inventory Log"
          iconSrc={'/assets/icon_trowel.png'}
          iconPosition="right"
          onClick={() => {
            console.log(scene?.registry.get("inventory"))
          }}
        />
      </div>

      {tooltip && (
        <p className="pointer-events-none absolute bottom-10 font-game text-4xl text-orange-100">
          {tooltip}
        </p>
      )}

      <div className={`absolute ${infoData && 'right-96'}`}>
        {popup === PopupName.Chest && <Chest scene={scene} />}
        {popup === PopupName.Market && <Market scene={scene} />}
        {popup === PopupName.Fungipedia && <Fungipedia />}
        {infoData !== null && <Infobox infoData={infoData} />}
      </div>
    </>
  )
}
