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

export type Item = {
  name: string
  img: string
  type: string
  value: number
  description: string
}

export type InventoryItem = {
  item: Item
  quantity: number
} | null

export type Inventory = InventoryItem[]

export type ShopInventoryItem = {
  item: Item
} | null

export type ShopInventory = ShopInventoryItem[]
