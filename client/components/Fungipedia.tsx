import { useState } from 'react'
import data from '@data/data'
import { pageFlipBack, pageFlipForward } from '@audio/audioEngine'

export default function Fungipedia() {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    setCurrentPage((prev) => (prev < data.length - 1 ? prev + 1 : 0))
    handleFlipForwardAudio()
  }

  const previousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : data.length - 1))
    handleFlipBackAudio()
  }

  const currentData = data[currentPage]
  const { type, content } = currentData

  const handleFlipForwardAudio = () => pageFlipForward.play()
  const handleFlipBackAudio = () => pageFlipBack.play()

  return (
    <div className="relative flex h-[600px] w-[800px] bg-[url('/assets/bg_book.png')] bg-contain bg-no-repeat p-6">
      {currentPage === 0 ? (
        <>
          <div className="mt-10 flex-1 pl-5">
            <h1 className="text-brown-800 pb-16 text-center font-game text-3xl">
              {data[0].content.title}
            </h1>
            <img
              src={data[0].content.img}
              alt="fungipedia logo"
              className="h-[200px] w-[200px] mx-auto"
            />
            <p className="pt-4">{data[0].content.description}</p>
          </div>

          <div className="flex-1">
            <h1 className="pb-4 pt-10 pr-8 text-center text-xl font-game">Index</h1>
            <div className="flex flex-col pl-7 text-lg underline">
              {data[0].content.mushrooms?.map((mushroom, index) => (
                <button
                 key={index}
                 onClick={() => setCurrentPage(index + 2)}
                 className='items-center text-left font-medieval'
                 >
                  {mushroom.name}
                 </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-12 pl-12">
            {currentPage === 1 && (
              <>
                <div className="w-1/2 flex-1 px-4 pt-5">
                  <h1 className="text-center text-xl font-game pb-4">{content.title}</h1>
                  <p className="font-medieval">{content.description}</p>
                </div>
                <div className="flex-1 pr-4 pt-5">
                  <h1 className="text-center text-xl font-game pb-4">How to play</h1>
                  <p className="font-medieval">{content.play}</p>
                  <p className="font-medieval">{content.care}</p>
                  <p className="font-medieval">{content.growth}</p>
                  <img 
                  src='/assets/frames_mushroom_red.png'
                  alt='the stages of growth'
                  className='pr-8'
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex gap-12 pl-10">
            {type === 'mushroom' && (
              <>
                <div className="w-1/2 flex-1 pt-5">
                  <h1 className="text-2xl font-game pb-4">{content.name}</h1>
                  <p className="pb-4 text-lg">
                    <strong>Family: </strong>
                    <em>{content.family}</em>
                  </p>

                  <p>
                    <strong>Properties: </strong>
                    {content.properties}
                  </p>
                  <p className="mb-10 text-red-500"> {content.toxicity}</p>
                  <img
                    src={`/assets/${content.img}`}
                    alt={content.name}
                    className="h-auto w-auto"
                  />
                </div>
                <div className="flex-1 pr-16 pt-5">
                  <p className="pb-2">
                    <strong>Location: </strong>
                    {content.location}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {content.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {/* Pagination Buttons */}
      <div className="absolute bottom-16 left-20 right-20 flex justify-between">
        <button onClick={previousPage} className="">
          Previous
        </button>
        <button onClick={nextPage} className="">
          Next
        </button>
      </div>
    </div>
  )
}
