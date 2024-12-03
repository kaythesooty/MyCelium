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

export interface Item {
  name: string
  description: string
  img: string
  type: string
  sellPrice: number
  buyPrice: number
}

export interface SlotItem {
  index: number
  item: Item
  quantity?: number
}
