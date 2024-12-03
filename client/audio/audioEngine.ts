// - - IMPORTS - - //

import { Howl } from 'howler'

// - - AUDIO ENGINE - - //

// REACT UI PLAYBACK

export const buttonClickOne = new Howl({
  src: ['/soundfiles/ui-button-click-01.wav'],
  volume: 0.5,
  autoplay: false,
})

export const buttonClickTwo = new Howl({
  src: ['/soundfiles/ui-button-click-02.wav'],
  volume: 0.5,
  autoplay: false,
})

export const buttonClickDown = new Howl({
  src: ['/soundfiles/ui-button-click-down.wav'],
  volume: 0.5,
  autoplay: false,
})

export const buttonClickUp = new Howl({
  src: ['/soundfiles/ui-button-click-up.wav'],
  volume: 0.5,
  autoplay: false,
})

export const pageFlipForward = new Howl({
  src: ['/soundfiles/ui-page-flip-01.wav'],
  volume: 0.5,
  autoplay: false,
})

export const pageFlipBack = new Howl({
  src: ['/soundfiles/ui-page-flip-02.wav'],
  volume: 0.5,
  autoplay: false,
})

// FARM ACTIONS AUDIO

export const wateringCan = new Howl({
  src: ['/soundfiles/farm-watering-can-02.wav'],
  volume: 0.5,
  autoplay: false,
  loop: false,
})

export const shovelOne = new Howl({
  src: ['/soundfiles/farm-shovel-01.wav'],
  volume: 0.5,
  autoplay: false,
})

export const shovelTwo = new Howl({
  src: ['/soundfiles/farm-shovel-02.wav'],
  volume: 0.5,
  autoplay: false,
})

// MUSHROOM AUDIO

// export const mushroomGrown = new Howl({
//   src: ['./soundfiles/mushroom-grown.wav'],
//   volume: 0.5,
// })

// export const mushroomDied = new Howl({
//   src: ['./soundfiles/mushroom-died.wav'],
//   volume: 0.5,
// })

// MARKET AUDIO

export const coinOne = new Howl({
  src: ['/soundfiles/market-coin-01.wav'],
  volume: 0.5,
  autoplay: false,
})

export const coinTwo = new Howl({
  src: ['/soundfiles/market-coin-02.wav'],
  volume: 0.5,
  autoplay: false,
})

export const coinThree = new Howl({
  src: ['/soundfiles/market-coin-03.wav'],
  volume: 0.5,
  autoplay: false,
})

export const transactionOne = new Howl({
  src: ['/soundfiles/market-cash-register-01.wav'],
  volume: 0.5,
  autoplay: false,
})

export const transactionTwo = new Howl({
  src: ['/soundfiles/market-cash-register-02.wav'],
  volume: 0.5,
  autoplay: false,
})
