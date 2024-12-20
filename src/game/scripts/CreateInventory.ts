import { SlotItem } from 'src/models/interfaces.ts'
import items from '../../data/items.ts'

export default function CreateInventory(): SlotItem[] {
  // We return an array of slot items. Each slot item has an index, an item
  // and a quantity.
  return [
    {
      index: 0,
      item: items[0],
      quantity: 5,
    },
    {
      index: 1,
      item: items[1],
      quantity: 20,
    },
    {
      index: 2,
      item: items[2],
      quantity: 13,
    },
    {
      index: 3,
      item: items[4],
      quantity: 3,
    },
    {
      index: 4,
      item: items[6],
      quantity: 6,
    },
    {
      index: 5,
      item: items[8],
      quantity: 9,
    },
  ]
}
