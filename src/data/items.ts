import { Item } from '@interfaces'

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
      "Spores from the cute redcap you harvested, it's sad it had to end that way. Can be planted or sold.",
    type: 'spores',
    sellPrice: 5,
    buyPrice: 25,
  },
  {
    img: '/assets/item_bonnet.png',
    name: 'Cerulean Bonnet Cap',
    description:
      'A beautiful blue cap that looks weirdly appetising. You almost want to eat it, but are scared of its unknowable power. Can be planted or sold.',
    type: 'cap',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_sack_bonnet.png',
    name: 'Spore Sack (Cerulian Bonnet)',
    id: 'reference to growth frames',
    description:
      'Spores to grow your own bountiful batch of brilliant blue bonnets. Can be planted or sold.',
    type: 'spores',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_snakehead.png',
    name: 'Hollow Snakehead cap',
    description:
      "The genuine head of the snake. The cap that lives rent free in every trypophobe's nightmares. Can be sold",
    type: 'cap',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_sack_snakehead.png',
    name: 'Spore Sack (Hollow Snakehead)',
    id: 'reference to growth frames',
    description:
      'Spores to grow your own freaky perforated morels. Can be planted or sold.',
    type: 'spores',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_fbolete.png',
    name: "Fool's Bolete cap",
    description:
      "The cap of the bolete that was making fun of you for thinking about eating it. Who's the fool now, huh? Can be sold",
    type: 'cap',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_sack_fbolete.png',
    name: "Spore Sack (Fool's Bolete)",
    id: 'reference to growth frames',
    description:
      'Spores to grow your own deathtraps, keep track of where you cultivate them. Can be planted or sold.',
    type: 'spores',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_puffball.png',
    name: 'Cumulo Puffball puff',
    description:
      "The fluffy white blob you harvested. This thing definitely isn't a cap, what on earth would even you even call it? Can be sold.",
    type: 'cap',
    sellPrice: 10,
    buyPrice: 25,
  },
  {
    img: '/assets/item_sack_puffball.png',
    name: 'Spore Sack (Cumulo Puffball)',
    id: 'reference to growth frames',
    description:
      "Spores to grow your own cloud-shrooms. Cultivate enough and you'll make your own little sky.Can be planted or sold.",
    type: 'spore',
    sellPrice: 10,
    buyPrice: 25,
  },
]

export default items
