import data from '@data/data'
import { useState } from 'react'

export default function Fungipedia() {
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    setCurrentPage((prev) => (prev < data.length - 1 ? prev + 1 : 0))
  }

  const previousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : data.length - 1))
  }

  const currentData = data[currentPage]
  const { type, content } = currentData

  return (
    <div className="relative flex h-[600px] w-[800px] bg-[url('/assets/bg_book.png')] bg-contain bg-no-repeat p-6">
      {currentPage === 0 || currentPage === 1 ? (
        <>
          <div className="mt-10 flex-1 pl-5">
            <h1 className="text-brown-800 pb-16 text-center font-medieval text-3xl">
              {data[0].content.title}
            </h1>
            <img
              src={data[0].content.img}
              alt="fungipedia logo"
              className="mx-auto"
            />
            <p className="pt-4">{data[0].content.description}</p>
          </div>

          <div className="flex-1">
            <h1 className="pb-4 pt-10 text-center text-xl ">Index</h1>
            <div className="flex flex-col pl-7 text-lg underline">
              {data[1].content.mushrooms?.map((mushroom, index) => (
                <p key={index}>{mushroom.name}</p>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-12 pl-12 font-medieval">
            {currentPage === 2 && (
              <>
                <div className="w-1/2 flex-1 px-4 pt-5">
                  <h1 className="text-center">{content.title}</h1>
                  <p>{content.description}</p>
                  <p>{content.specifics}</p>
                  <p>{content.care}</p>
                </div>
                <div className="flex-1 pr-4 pt-5">
                  <h1 className="text-center">{content.title}</h1>
                  <p>{content.description}</p>
                  <p>{content.specifics}</p>
                  <p>{content.care}</p>
                </div>
              </>
            )}
          </div>
          <div className="flex gap-12 pl-10 font-medieval">
            {type === 'mushroom' && (
              <>
                <div className="w-1/2 flex-1 pt-5">
                  <h1 className="text-2xl font-bold">{content.name}</h1>
                  <p className="pb-4 text-lg">
                    <strong>Family: </strong>
                    <em>{content.family}</em>
                  </p>

                  <p>
                    <strong>Properties: </strong>
                    {content.properties}
                  </p>
                  <p className="mb-10 text-red-500"> {content.poisonous}</p>
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
