import { SlotItem } from '@interfaces'

export default function CreateInventory(): SlotItem[] {
  // We return an array of slot items. Each slot item has an index, an item
  // and a quantity.
  return [
    {
      index: 0,
      item: {
        name: "Lover's Redcap",
        img: '/assets/item_redcap.png',
        description: 'An adorable little redcap. It loves you.',
        type: 'cap',
        sellPrice: 10,
        buyPrice: 200,
      },
      quantity: 5,
    },
    {
      index: 1,
      item: {
        img: '/assets/item_sack_redcap.png',
        name: "Spore Sack (Lover's Redcap)",
        id: 'frames_mushroom_red',
        description:
          "Spores from the cute redcap you harvested, it's sad it had to end that way. Can be planted or sold",
        type: 'spores',
        sellPrice: 5,
        buyPrice: 25,
      },
      quantity: 20,
    },
  ]
}
