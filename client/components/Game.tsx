import PhaserContainer from './layers/PhaserContainer'
import UserInterface from './layers/UserInterface'
import '@styles/phaser.scss'

export default function GameContainer() {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
      <PhaserContainer />
      <UserInterface />
    </main>
  )
}
