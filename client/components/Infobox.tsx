import { MushroomInfobox } from '@models/interfaces'

export default function Infobox({ infoData }: { infoData: MushroomInfobox }) {
  // console.log(infoData.position.x, infoData.position.y)
  return (
    <div className="h-[450px] w-[300px] rounded-2xl bg-[#DFE0C0] font-game text-xl text-[#642B22] shadow-md shadow-[#A53333]">
      <div className="flex h-full flex-col justify-around text-center">
        <h1 className="font-bold">{infoData.name}!</h1>
        <p className="font-bold">{infoData.description}</p>
        {infoData.watered === 2 && <div>It&apos;s really well hydrated!</div>}
        {infoData.watered === 1 && <div> It&apos;s hydrated.</div>}
        {infoData.watered === 0 && <div>It&apos;s looking real dry!</div>}
        {infoData.fed === 2 && <div>It&apos;s fully fertilized</div>}
        {infoData.fed === 1 && <div>It&apos;s fertilized.</div>}
        {infoData.fed === 0 && <div>It really needs some fertilizer!</div>}
        <div>
          {infoData.stage === 4 && <div>It&apos;s fully grown!</div>}
          {infoData.stage === 3 && (
            <div>It&apos;s getting close to harvest!</div>
          )}
          {infoData.stage === 2 && <div>It&apos;s still growing!</div>}
          {infoData.stage === 1 && <div>It&apos;s a baby!</div>}
          {infoData.stage === 0 && <div>It&apos;s been planted!</div>}
        </div>
      </div>
    </div>
  )
}
