import Navbar from '@/components/Landing/Navbar'
import Hero from '@/components/Landing/Hero'
import KeyFeatures from '@/components/Landing/KeyFeatures'
import AboutMe from '@/components/Landing/AboutMe'

export default function Home() {
  return (
    <main className='bg-gradient-to-tr to-[#DD8233] via-black from-[#1A1D24] flex flex-col min-h-screen'>
      <div className='relative z-20'>
        <Navbar />
      </div>

      <div className='pt-32 p-5 md:p-24 md:pt-32 text-white relative z-10'>
        <Hero />
      </div>
      <div className='bg-black w-fill py-5'></div>
      <div className=' px-12 md:px-24 text-white'>
        <KeyFeatures />
      </div>
      <div className=' px-12 md:px-24 text-white'>
        <AboutMe />
      </div>

    </main>
  )
}
