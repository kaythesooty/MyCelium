import { useState, useEffect } from 'react'
import { Mushrooms } from '@game/scenes/Mushrooms'
import { SlotItem } from '@interfaces'

export default function ChestPopup({ scene }: { scene: Mushrooms | null }) {
  const [chest, setChest] = useState<SlotItem[] | []>([])
  const [chestSlot, setChestSlot] = useState<number | null>(null)

  useEffect(() => {
    const chestData: SlotItem[] = scene?.registry.get('inventory')
    if (chestData) setChest(chestData)
  }, [scene])

  return (
    <div className="flex items-center gap-24 bg-[url('/public/assets/bg_paper.png')] p-6">
      {/* Left Side: Tile Grid */}
      <div className="grid grid-cols-6 gap-8">
        {new Array(30).fill(null).map((slot, index) => {
          const chestItem = chest.find((item) => item?.index === index)

          return (
            <button
              key={index}
              disabled={!chestItem}
              className={`relative flex size-20 items-center justify-center rounded-lg font-game hover:bg-orange-400 ${chestSlot === index ? 'bg-[#f4c78c] outline outline-2 outline-offset-2 outline-[#f4c78c]' : 'bg-[#EAD9C3]'}`}
              onClick={() => {
                setChestSlot(index)
              }}
            >
              {chestItem && (
                <>
                  <img src={chestItem.item.img} alt="" className="size-16" />
                  <div className="absolute bottom-2 right-1 z-10 text-xs">
                    x{chestItem.quantity}
                  </div>
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Right Side: Popup Content */}
      <div className="flex h-[550px] w-[280px] flex-col border border-[#8B5E34] bg-[#FDF6E3] shadow-md">
        {/* Welcome Section */}
        {chestSlot === null ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-lg font-bold text-[#4E342E]">Welcome!</h1>
            <p className="text-sm text-[#4E342E]">
              Select a tile on the left to view mushroom details.
            </p>
          </div>
        ) : (
          //Inventory Product Details
          <>
            {/* Product Image */}
            <div className="flex h-[200px] w-[280px] items-center justify-center bg-[#E4B183]">
              <img
                src={chest[chestSlot]?.item.img}
                alt={chest[chestSlot]?.item.name}
                className="h-full w-auto"
              />
            </div>

            {/* Title Section */}
            <div className="flex h-[100px] w-[280px] items-center justify-center bg-[#A67C52] text-[#FDF6E3]">
              <h2 className="text-xl font-bold">
                {chest[chestSlot]?.item.name}
              </h2>
            </div>

            {/* Details Section */}
            <div className="flex h-[250px] w-[280px] items-center justify-center bg-[#D9C5A3] p-4 text-center text-[#4E342E]">
              <p>{chest[chestSlot]?.item.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
