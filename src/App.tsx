import PhaserContainer from '@layers/Phaser'
import UserInterface from '@layers/UserInterface'

export default function App() {
  return (
    <main className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
      <PhaserContainer />
      <UserInterface />
    </main>
  )
}
