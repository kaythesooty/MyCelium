import { useState } from "react"
import data from '../data/data'

export default function Fungipedia() {
  const [currentPage, setCurrentPage] = useState(0)
  const mushroomData = data[0]

  const nextStage = () => {
    setCurrentPage((prev) => 
      prev < mushroomData.stages.length - 1 ? prev + 1 : 0
    )
  }
  const previousStage = () => {
    setCurrentPage((prev) => 
      prev > 0 ? prev - 1 : mushroomData.stages.length - 1
    )
  }
  
  const currentStage = mushroomData.stages[currentPage]
 
  return (
    <div className='absolute bg-slate-400 p-6 rounded-2xl shadow-2xl w-[614px] h-[445px] border-2 border-gray-500'>
      <h1 className='text-4xl font-serif font-bold text-center text-brown-800'>
        {mushroomData.name}
        </h1>
        <h2 className='text-xl font-serif text-center text-brown-600'>
          {currentStage.stage}
        </h2>
      { currentStage.img && (
        <img 
        src={currentStage.img}
        alt={currentStage.stage}
        className='rounded-lg shadow-md'
        />
      )}
      <p className='text-brown-800 text-lg italic'>{currentStage.notes}</p>
      <p className='text-gray-700'>{currentStage.status}</p>

      <div className='mt-48 flex justify-between'>
        <button
          onClick={previousStage}
            className='bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md'
          disabled={currentPage === 0}
          >
          Previous
        </button>
        <button
          onClick={nextStage}
            className='bg-gray-800 text-white px-6 py-2 rounded-lg shadow-md'
          disabled={currentPage === mushroomData.stages.length - 1}
          >
          Next
        </button>
      </div>
    </div>
  )
}