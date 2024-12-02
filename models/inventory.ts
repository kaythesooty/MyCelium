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
