import { Mushrooms } from '@game/scenes/Mushrooms'
import { InventoryItem } from '@models/interfaces'
import { useState, useEffect } from 'react'

export default function ChestPopup({
  sceneData,
}: {
  sceneData: Mushrooms | null
}) {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [selectedTile, setSelectedTile] = useState<number | null>(null)
  const [scene, setScene] = useState<Mushrooms | null>(null)

  useEffect(() => {
    setScene(sceneData)
    const inventoryData = scene?.registry.get('inventory')
    if (inventoryData) {
      const length = inventoryData.length
      for (let i = 0; i < 30 - length; i++) inventoryData.push(null)
      setInventory(inventoryData)
    }
  }, [sceneData, scene])

  return (
    <div className="flex h-[700px] w-[1000px] items-center justify-center bg-[url('/public/assets/bg_paper.png')] opacity-90">
      {/* Left Side: Tile Grid */}
      <div className="grid h-[700px] w-[600px] grid-cols-5 gap-2 overflow-y-auto border-r border-[#A67C52] p-4">
        {inventory.map((item, tile) => (
          <button
            key={tile}
            onClick={() => setSelectedTile(tile)} // Set the selected tile on click
            className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-[#A67C52] bg-[#EAD9C3] transition hover:bg-[#C7A88A]"
          >
            {inventory[tile] && (
              <img
                src={inventory[tile].item.img}
                alt={`Item ${tile}`}
                className="absolute top-2 h-10 w-10"
              />
            )}
            <span className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-bold text-black">
              {inventory[tile]?.quantity}
            </span>
          </button>
        ))}
      </div>

      {/* Right Side: Popup Content */}
      <div className="flex h-[700px] w-[400px] items-center justify-center">
        <div className="relative flex h-[550px] w-[280px] flex-col border border-[#8B5E34] bg-[#FDF6E3] shadow-md">
          {/* Welcome Section */}

          {typeof selectedTile === 'number' && (
            //Inventory Product Details
            <>
              {/* Product Image */}
              <div className="flex h-[200px] w-[280px] items-center justify-center bg-[#E4B183]">
                <img
                  src={inventory[selectedTile]?.item.img}
                  alt={inventory[selectedTile]?.item.name}
                  className="h-full w-auto"
                />
              </div>

              {/* Title Section */}
              <div className="flex h-[100px] w-[280px] items-center justify-center bg-[#A67C52] text-[#FDF6E3]">
                <h2 className="text-xl font-bold">
                  {inventory[selectedTile]?.item.name}
                </h2>
              </div>

              {/* Details Section */}
              <div className="flex h-[250px] w-[280px] items-center justify-center bg-[#D9C5A3] p-4 text-center text-[#4E342E]">
                <p>{inventory[selectedTile]?.item.description}</p>
              </div>
            </>
          )}
          {selectedTile === null && (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h1 className="text-lg font-bold text-[#4E342E]">Welcome!</h1>
              <p className="text-sm text-[#4E342E]">
                Select a tile on the left to view mushroom details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
