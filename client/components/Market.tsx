import { useState, useEffect } from 'react'
import { Mushrooms } from '@game/scenes/Mushrooms'
import { SlotItem } from '@interfaces'

const marketData: SlotItem[] = [
  {
    index: 0,
    item: {
      img: '/assets/item_sack.png',
      name: "Spore Sack (Lover's Redcap)",
      id: 'frames_mushroom_red',
      description:
        "Spores from the cute redcap you harvested, it's sad it had to end that way. Can be planted or sold",
      type: 'spores',
      sellPrice: 5,
      buyPrice: 25,
    },
    quantity: 20,
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

    const chestItemIndex = chest.findIndex((slot) => slot?.index === chestSlot)
    // Removing quantity of the item by one if item exists
    if (chestItemIndex === -1) return
    // Typescript wants us to make sure that quantity key is indeed there
    else if (chest[chestItemIndex]?.quantity) chest[chestItemIndex].quantity--
    setMoney(money + chest[chestSlot].item.sellPrice)
    scene?.events.emit(
      'registry:update-money',
      money + chest[chestSlot].item.sellPrice,
    )
    // Now if quantity is 0 - removing it from the array, and updating state
    if (chest[chestItemIndex].quantity === 0) {
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
    } else {
      console.log(existingSlotIndex)
      const newItem = {
        index: fisrtEmptySlotIndex,
        item: market[marketSlot].item,
        quantity: 1,
      }
      setChest([...chest, newItem])
    }
    scene?.events.emit('registry:update-inventory', chest)
    setMoney(money - market[marketSlot].item.buyPrice)
    scene?.events.emit(
      'registry:update-money',
      money - market[marketSlot].item.buyPrice,
    )
  }

  return (
    <div className="flex flex-col bg-white p-6">
      <div className="flex gap-8 pb-6">
        <button
          disabled={chestSlot === null}
          onClick={handleSell}
          type="button"
          className={
            'flex h-12 w-36 items-center rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all hover:scale-110' +
            (chestSlot !== null ? '' : ' opacity-60')
          }
        >
          <span className="pointer-events-none w-full -translate-y-2 text-center text-[#522c13]">
            Sell
          </span>
        </button>

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

        <div className="ml-auto flex h-12 w-44 items-center justify-start rounded-full border-2 border-[#704B2C] bg-[#E3E4B2] bg-texture font-game transition-all">
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

      <div className="flex gap-24">
        <div className="grid grid-cols-6 gap-3">
          {new Array(30).fill(null).map((slot, index) => {
            const chestItemIndex = chest.findIndex(
              (chestItem) => chestItem?.index === index,
            )

            return (
              <button
                key={index}
                disabled={chestItemIndex === -1}
                className={`relative flex size-28 items-center justify-center font-game hover:bg-orange-400 ${chestSlot === index ? 'bg-orange-400 outline outline-2 outline-offset-2 outline-orange-400' : 'bg-orange-300'}`}
                onClick={() => {
                  setMarketSlot(null)
                  setChestSlot(index)
                }}
              >
                {chestItemIndex >= 0 && (
                  <>
                    <img
                      src={chest[index].item.img}
                      alt=""
                      className="size-24"
                    />
                    <div className="absolute bottom-3 right-1 z-10 text-sm">
                      x{chest[index].quantity}
                    </div>
                    <div className="absolute bottom-3 left-1 z-10">
                      ${chest[index].item.sellPrice}
                    </div>
                  </>
                )}
              </button>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {new Array(15).fill(null).map((slot, index) => {
            const marketItemIndex = market.findIndex(
              (marketItem) => marketItem?.index === index,
            )

            return (
              <button
                key={index}
                disabled={marketItemIndex === -1}
                className={`relative flex size-28 items-center justify-center font-game hover:bg-blue-400 ${marketSlot === index ? 'bg-blue-400 outline outline-2 outline-offset-2 outline-blue-400' : 'bg-blue-300'}`}
                onClick={() => {
                  setChestSlot(null)
                  setMarketSlot(index)
                }}
              >
                {marketItemIndex >= 0 && (
                  <>
                    <img
                      src={market[index].item.img}
                      alt=""
                      className="size-24"
                    />
                    <div className="absolute bottom-3 right-1 z-10 text-sm">
                      x{market[index].quantity}
                    </div>
                    <div className="absolute bottom-3 left-1 z-10">
                      ${market[index].item.buyPrice}
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
