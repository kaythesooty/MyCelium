import { useState, useEffect } from 'react'
import { Mushrooms } from '@game/scenes/Mushrooms'
import { SlotItem } from '@interfaces'
import items from '../data/items.ts'

const marketData: SlotItem[] = [
  {
    index: 0,
    item: items[1],
  },
  {
    index: 1,
    item: items[7],
  },
  {
    index: 2,
    item: items[5],
  },
  {
    index: 3,
    item: items[3],
  },
  {
    index: 4,
    item: items[9],
  },
]

export default function Market({ scene }: { scene: Mushrooms | null }) {
  const [chest, setChest] = useState<SlotItem[] | []>([])
  const [money, setMoney] = useState<number>(0)
  const [chestSlot, setChestSlot] = useState<number | null>(null)
  const [marketSlot, setMarketSlot] = useState<number | null>(null)
  const market: SlotItem[] = marketData

  useEffect(() => {
    const chestData: SlotItem[] = scene?.registry.get('inventory')
    const moneyData: number = scene?.registry.get('money')
    if (chestData) setChest(chestData)
    if (moneyData) setMoney(moneyData)
  }, [scene?.registry])

  const handleSell = () => {
    if (chestSlot === null) return

    const chestItem = chest.find((item) => item?.index === chestSlot)
    // Removing quantity of the item by one if item exists
    if (!chestItem) return
    // Typescript wants us to make sure that quantity key is indeed there
    else if (chestItem?.quantity) chestItem.quantity--

    setMoney(money + chestItem.item.sellPrice)
    scene?.events.emit(
      'registry:update-money',
      money + chestItem.item.sellPrice,
    )

    // If quantity is 0 - removing it from the array, and updating memory
    if (chestItem.quantity === 0) {
      const chestItemIndex = chest.findIndex(
        (item) => item?.index === chestSlot,
      )
      chest.splice(chestItemIndex, 1)
      setChestSlot(null)
    }

    setChest([...chest])
    scene?.events.emit('registry:update-inventory', chest)
  }

  const handleBuy = () => {
    if (marketSlot === null || market[marketSlot].item.buyPrice > money) return

    let fisrtEmptySlotIndex = 0
    for (let index = 0; index < 30; index++) {
      const exists = chest.find((slot) => slot?.index === index)
      if (exists) continue
      fisrtEmptySlotIndex = index
      break
    }

    const existingSlotIndex = chest.findIndex(
      (slot) => slot?.item.name === market[marketSlot].item.name,
    )

    if (existingSlotIndex >= 0 && chest[existingSlotIndex].quantity) {
      chest[existingSlotIndex].quantity++
      scene?.events.emit('registry:update-inventory', chest)
    } else {
      console.log(existingSlotIndex)
      const newItem = {
        index: fisrtEmptySlotIndex,
        item: market[marketSlot].item,
        quantity: 1,
      }
      setChest([...chest, newItem])
      scene?.events.emit('registry:update-inventory', [...chest, newItem])
    }
    setMoney(money - market[marketSlot].item.buyPrice)
    scene?.events.emit(
      'registry:update-money',
      money - market[marketSlot].item.buyPrice,
    )
  }

  return (
    <div className="flex flex-col rounded-xl bg-white bg-[url('/public/assets/bg_paper2.png')] p-6">
      <div className="flex gap-8 pb-6">
        {/* Sell Button */}
        <button
          disabled={chestSlot === null}
          onClick={handleSell}
          type="button"
          className="flex h-12 w-36 items-center rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all hover:scale-110"
        >
          <span className="pointer-events-none w-full -translate-y-2 text-center text-[#522c13]">
            Sell
          </span>
        </button>

        {/* Money */}
        <div className="flex flex-1 justify-center">
          <div className="flex h-12 w-44 items-center justify-start rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all">
            <img
              src="/assets/icon_cash.png"
              alt=""
              width={96}
              height={96}
              className="pointer-events-none absolute z-10 size-20"
            />
            <span className="pointer-events-none ml-12 mr-6 w-full -translate-y-2 text-right text-[#522c13]">
              ${money}
            </span>
          </div>
        </div>

        {/* Buy Button */}
        <button
          disabled={marketSlot === null}
          onClick={handleBuy}
          type="button"
          className={
            'flex h-12 w-36 items-center rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all hover:scale-110' +
            (marketSlot !== null ? '' : ' opacity-60')
          }
        >
          <span className="pointer-events-none w-full -translate-y-2 text-center text-[#522c13]">
            Buy
          </span>
        </button>
      </div>

      <div className="flex gap-24">
        <div className="grid grid-cols-6 gap-3">
          {new Array(30).fill(null).map((slot, index) => {
            const chestItem = chest.find((item) => item?.index === index)

            return (
              <button
                key={index}
                disabled={!chestItem}
                className={
                  'relative flex size-28 items-center justify-center rounded-lg font-game hover:bg-[#FFA53F]' +
                  (chestSlot === index
                    ? ' bg-[#FFA53F] outline outline-2 outline-offset-2 outline-orange-400'
                    : ' bg-orange-300')
                }
                onClick={() => {
                  setMarketSlot(null)
                  setChestSlot(index)
                }}
              >
                {chestItem && (
                  <>
                    <img src={chestItem.item.img} alt="" className="size-20" />
                    <div className="text-outline absolute bottom-3 right-1 z-10">
                      <span className="mr-1 text-xs">x</span>
                      {chestItem.quantity}
                    </div>
                    <div className="text-outline absolute bottom-4 left-2 z-10 text-xl">
                      ${chestItem.item.sellPrice}
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {new Array(15).fill(null).map((slot, index) => {
            const marketItem = market.find((item) => item?.index === index)

            return (
              <button
                key={index}
                disabled={!marketItem}
                className={
                  'relative flex size-28 items-center justify-center rounded-lg font-game hover:bg-[#74CEF7]' +
                  (marketSlot === index
                    ? ' bg-[#74CEF7] outline outline-2 outline-offset-2 outline-blue-400'
                    : ' bg-blue-300')
                }
                onClick={() => {
                  setChestSlot(null)
                  setMarketSlot(index)
                }}
              >
                {marketItem && (
                  <>
                    <img src={marketItem.item.img} alt="" className="size-20" />
                    <div className="text-outline absolute bottom-4 left-2 z-10 text-xl">
                      ${marketItem.item.buyPrice}
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
