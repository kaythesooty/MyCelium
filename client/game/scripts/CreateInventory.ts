import { SlotItem } from '@interfaces'

export default function CreateInventory(): SlotItem[] {
  // We return an array of slot items. Each slot item has an index, an item
  // and a quantity.
  return [
    {
      index: 0,
      item: {
        name: 'Lovers Redcap',
        description: 'It do be a cap doe',
        img: '/assets/item_red_mushroom.png',
        type: 'Cap',
        sellPrice: 10,
        buyPrice: 200,
      },
      quantity: 20,
    },
  ]
}
