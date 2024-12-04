import { Item } from "@interfaces"

const items: Item[] = [
  {
    name: "Lover's Redcap",
    img: '/assets/item_redcap.png',
    description: 'An adorable little redcap. It loves you.',
    type: 'cap',
    sellPrice: 10,
    buyPrice: 200,
  },
  {
    img: '/assets/item_sack_redcap.png',
    name: "Spore Sack (Lover's Redcap)",
    id: 'frames_mushroom_red',
    description:
      "Spores from the cute redcap you harvested, it's sad it had to end that way. Can be planted or sold",
    type: 'spores',
    sellPrice: 5,
    buyPrice: 25,
  },
  {
    img: 'something.png',
    name: 'Hollow Snakehead Cap',
    description: 'brief description of said item',
    type: 'what kind of object it is eg. spore',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: 'something.png',
    name: 'Spore Sack (Hollow Snakehead)',
    id: 'reference to growth frames',
    description: 'brief description of said item',
    type: 'what kind of object it is eg. spore',
    sellPrice: 10,
    buyPrice: 25,
  },
]

export default items
