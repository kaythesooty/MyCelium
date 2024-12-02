import { MushroomInfobox } from '@models/interfaces'

export default function Infobox({ infoData }: { infoData: MushroomInfobox }) {
  console.log(infoData.position.x, infoData.position.y)
  return <div className="h-[660px] w-96 bg-white">{infoData.name}</div>
}
