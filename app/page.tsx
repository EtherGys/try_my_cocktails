import Feed from '@/components/Feed'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="mx-10 min-h-screen">
    <div className="">
    Plateforme pour partager et échanger vos cocktails préférés !
    <section>
    <h1 className='text-center font-bold'>Tous nos cocktails sont près pour vous</h1>
    <Feed/>
    
    </section>
    </div>
    </main>
    )
  }
  