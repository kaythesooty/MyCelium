import { useState } from 'react'
import data from '@data/data'

export default function Fungipedia() {
  const [currentPage, setCurrentPage] = useState(0)
  const mushroomData = data[0]

  const nextStage = () => {
    setCurrentPage((prev) =>
      prev < mushroomData.stages.length - 1 ? prev + 1 : 0,
    )
  }
  const previousStage = () => {
    setCurrentPage((prev) =>
      prev > 0 ? prev - 1 : mushroomData.stages.length - 1,
    )
  }

  const currentStage = mushroomData.stages[currentPage]

  return (
    <div className='flex h-[700px] w-[800px] rounded-2xl bg-[url("/book.jpg")] bg-contain bg-no-repeat p-6'>
      <div className="flex-1">
        <h1 className="text-brown-800 font-medieval text-center text-4xl font-bold">
          {mushroomData.name}
        </h1>
        <h2 className="text-brown-600 font-medieval text-center text-xl">
          {currentStage.stage}
        </h2>
        {currentStage.img && (
          <div className="flex justify-center">
            <img
              src={currentStage.img}
              alt={currentStage.stage}
              className="h-[200px] w-auto"
            />
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-brown-800">{currentStage.notes}</p>
        <p className="text-gray-700">{currentStage.status}</p>

        <div className="mt-48 flex justify-between">
          {/* <button
        onClick={previousStage}
        className="rounded-lg bg-gray-800 px-6 py-2 text-white shadow-md"
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <button
        onClick={nextStage}
        className="rounded-lg bg-gray-800 px-6 py-2 text-white shadow-md"
        disabled={currentPage === mushroomData.stages.length - 1}
      >
        Next
      </button> */}
        </div>
      </div>
    </div>
  )
}
