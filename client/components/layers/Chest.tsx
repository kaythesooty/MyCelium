import { useEffect, useState } from 'react'

interface ChestPopupProps {
  onClose: () => void // Callback to close the popup
}

export default function Chest({ onClose }: ChestPopupProps) {
  const [tiles, setTiles] = useState<number[]>([]) // State to hold tile data
  const [selectedTile, setSelectedTile] = useState<number | null>(null) // State to track the selected tile
  const [mushroomData, setMushroomData] = useState<
    Record<number, { image: string; title: string; details: string }>
  >({}) // State to hold mushroom data

  useEffect(() => {
    // Initialize the grid of 30 tiles when the component mounts
    const tileArray = Array.from({ length: 30 }, (_, index) => index + 1)
    setTiles(tileArray)

    // Simulate mushroom data for each tile (replace with database fetch later)
    const mockData = tileArray.reduce(
      (acc, tile) => {
        acc[tile] = {
          image: `https://via.placeholder.com/150?text=Mushroom+${tile}`, // Placeholder image URL
          title: `Mushroom ${tile}`,
          details: `Details about Mushroom ${tile}`,
        }
        return acc
      },
      {} as Record<number, { image: string; title: string; details: string }>,
    )
    setMushroomData(mockData)
  }, []) // Empty dependency array ensures this runs only once on mount

  const handleTileClick = (tile: number) => {
    setSelectedTile(tile) // Set the selected tile to display mushroom data
  }

  return (
    <div className="flex h-[600px] w-[800px] items-center justify-center bg-white">
      {/* Left Side: Tile Grid */}
      <div className="grid h-[600px] w-[500px] grid-cols-5 gap-2 overflow-y-auto border-r border-gray-400 bg-green-100 p-4">
        {tiles.map((tile, index) => (
          <button
            key={index}
            className="flex h-20 w-full items-center justify-center rounded border border-gray-300 bg-white shadow transition hover:bg-gray-100"
            onClick={() => handleTileClick(tile)}
          >
            Mushroom {tile}
          </button>
        ))}
      </div>

      {/* Right Side: Popup Content */}
      <div className="flex h-[600px] w-[300px] items-center justify-center bg-red-100">
        <div className="relative flex h-[550px] w-[280px] flex-col bg-yellow-500">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded bg-red-500 px-2 py-2 text-sm text-white hover:bg-red-600"
          >
            X
          </button>

          {/* Conditional Content */}
          {selectedTile === null ? (
            // Welcome Note
            <div className="flex h-full flex-col items-center justify-center text-center">
              <h1 className="text-lg font-bold">Welcome!</h1>
              <p className="text-sm">
                Select a tile on the left to view mushroom details.
              </p>
            </div>
          ) : (
            // Mushroom Details
            <>
              {/* Mushroom Image Section */}
              <div className="flex h-[200px] w-[280px] items-center justify-center bg-slate-500">
                <img
                  src={mushroomData[selectedTile]?.image}
                  alt={`Mushroom ${selectedTile}`}
                  className="h-full w-auto"
                />
              </div>

              {/* Title Section */}
              <div className="flex h-[100px] w-[280px] items-center justify-center bg-red-400">
                <h2 className="text-xl font-bold">
                  {mushroomData[selectedTile]?.title}
                </h2>
              </div>

              {/* Details Section */}
              <div className="flex h-[250px] w-[280px] items-center justify-center bg-lime-400 p-4 text-center">
                <p>{mushroomData[selectedTile]?.details}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
