import { useLayoutEffect, useRef } from "react"
import { Game } from "phaser"
import StartGame from '@game/main'

export default function PhaserContainer() {
  const game = useRef<Game | null>(null!)

  useLayoutEffect(() => {
    if (game.current === null) game.current = StartGame('game-container')

    return () => {
      if (game.current) {
        game.current.destroy(true) // Destroy game instance
        if (game.current !== null) game.current = null // Reset game instance
      }
    }
  }, [])
  
  return <div id="game-container" className="z-0 h-dvh w-full" />
}
