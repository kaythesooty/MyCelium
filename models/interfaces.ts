export interface Spore {
  name: string
  texture: string
  img: string
  description: string
}

export interface MushroomInfobox {
  name: string
  description: string
  image: string
  stage: number
  position: { x: number; y: number }
}
