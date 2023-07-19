import Board from '@/components/board/board'
import Game from '@/components/game/game'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Game/>
      <Board/>
    </main>
  )
}
