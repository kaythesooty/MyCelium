const data = [
  {
    type: 'welcome',
    content: {
      title: 'Welcome to Fungipedia',
      description: '',
      img: '/assets/sprite_fungipedia.png',
      header: 'Index',
      mushrooms: [
        { name: "Lover's redcap" },
        { name: 'Hollow Snakehead' },
        { name: "Fool's Bolete" },
        { name: 'Cerulean Bonnet' },
        { name: 'Cumulo Puffball' },
        { name: 'Silly-kitty Bolete' },
      ],
    },
  },
  {
    type: 'tutorial',
    content: {
      title: 'Tutorial',
      description:
        "Welcome to My Celium! Firstly, select the plant action by clicking on the button labeled plant, then select the tile you wish to plant your first spore in and click once more. Congratulations, you've just started cultivating your first mushroom! Sell your goods at the market to purchase rare and unique mushrooms.",
      play: 'To start play, you click on the fertiliser button to plant your first spore.',
      care: 'To care for the spore you have to watch for signs in the soil and growth, one of the biggest challenges is draught, as the soil gets lighter the mushroom growth will slow. They like moisture and fertisation to click their spirits high, experiment with how much to feed/water.',
      growth:
        'The growth stage should look something like this below, if it gets to fully grown. Try your luck in selling at the local Market, level up to buy rare spores.',
    },
  },

  {
    type: 'mushroom',
    content: {
      img: 'item_red_mushroom.png',
      name: "Lover's Redcap",
      family: '(Amantes vertice rubrum)',
      properties: 'edible, medicinal',
      toxicity: 'N/A',
      location:
        'Found within moist meadows, hiding in shaded areas where the morning dew lingers throughout the day',
      description:
        'A stout mushroom with a thick and hardy stem, and a conical crimson cap covered in beautiful white spots. It is also notable for being one of the few mushrooms that is entirely non-toxic and can therefore be eaten without preparation. It tends to be sold as curative, improving mood and reinvigorating those who can stand its admittedly bitter taste.',
    },
  },
  {
    type: 'mushroom',
    content: {
      img: 'item_morel.png',
      name: 'Hollow Snakehead',
      family: '(Cavae anguis caput morchella)',
      properties: 'edible, tasty',
      toxicity: 'POISONOUS',
      location:
        'Often spotted under the shade of tree canopies , utilising decaying wood to sustain itself',
      description:
        "A thin, pointed mushroom with a sturdy neck-like stem, and a thoroughly perforated cap.The holes that are this morel's namesake nestle away pockets of a potent toxin, which can only be neutralised by thoroughly cooking them. The Snakehead is a highly regarded delicacy that can prove difficult to grow in many biomes, and as such will always have people clambering to get their hands on them.",
    },
  },
  {
    type: 'mushroom',
    content: {
      img: 'item_bolete.png',
      name: "Fool's Bolete",
      family: '(boletus stultus)',
      properties: 'magic, deadly',
      toxicity: 'POISONOUS',
      location:
        'Found amongst long dead carcasses of any variety,subsisting off of the dry bones',
      description:
        'A deceptively archetypal bolete, complete with an innocuous brown cap and stubby stem.This fungi excels in the art of mimicry, looking virtually indistinct from many other edible mushrooms of its variety. What sets it apart is its utterly lethal poison, which has no known antidote as of yet, and there may never be one given its mysterious necrotic nature. This makes it a favourite amongst assassins and warlocks alike, as well as a fitting last meal for those moronic enough to eat something harvested from remains.',
    },
  },
  {
    type: 'mushroom',
    content: {
      img: 'item_blue_pinkgill.png',
      name: 'Cerulean Bonnet',
      family: '(cserulus mitram)',
      properties: 'magic, mysterious',
      toxicity: 'unknown',
      location:
        'known to prefer drier areas,  this mushroom is most commonly found wherever deadwood is plentiful ',
      description:
        'Characterised by an exceedingly thin stem and comparatively large cap, this species flaunts a magnificent cobalt colouration.These little colorful champignons are full of mystique,with little being known about their biology or potential uses. So far not a single soul has had the stomach nor the bravery to ingest one of these for long enough to find out what effects it may have on the human body. It has become notorious over the years for being a pain to grow without near perfect conditions, so it can still fetch a dandy price if you can find a curious (and strange) enough buyer.',
    },
  },
  {
    type: 'mushroom',
    content: {
      img: 'item_puffball.png',
      name: 'Cumulo Puffball',
      family: '(cumulo vento-pila)',
      properties: 'edible, tasty',
      toxicity: 'POISONOUS',
      location:
        'Thriving within warmer climates,this particular puffball prefers to bask in the sun surrounded by decomposing vegetation',
      description:
        "Renowned for its size relative to other fungi, the puffball also stands out amongst the crowd because of its distinct lack of any real exterior form, foregoing the usual stem-cap arrangement for a more amorphous, cloud-like approach. This species in particular is notable for being fairly volatile, dispersing its toxic spores as a defense mechanism if it is disturbed too much before adequate preparation/disarmament. They are very popular amongst traders given just how many spores you can produce from a single body, but consequently don't sell for huge amounts.",
    },
  },
  {
    type: 'mushroom',
    content: {
      img: 'item_red_mushroom.png',
      name: 'Silly-kitty bolete',
      family: 'Ferruktus felis',
      properties: 'Edible, tasty',
      toxicity: 'POISONOUS',
      location:
        'Found in damp woods, hidden amongst the vegetation of the forest floor',
      description:
        "A tall mushroom sporting a narrow stem, and a wide cap speckled in orange, black, and white. It's a delicious mushroom, but only when boiled beforehand to neutralise its potent toxins. It’ll fetch a solid price at any market given its popularity amongst discerning mycophiles.",
    },
  },
]

export default data
