import Navbar from '@/components/Landing/Navbar'
import Hero from '@/components/Landing/Hero'
import KeyFeatures from '@/components/Landing/KeyFeatures'
import AboutMe from '@/components/Landing/AboutMe'
import OurMission from '@/components/Landing/OurMission'
export default function Home() {
  return (
      <main className='bg-black min-h-screen'>
        <div className='relative z-20 w-screen'>
          <Navbar />
        </div>

        <div className='text-white relative z-10'>
          <Hero />
        </div>
        <div className='px-12 md:px-24 text-white'>
          <OurMission />
        </div>
        <div id='whatthisdoes' className=' px-12 md:px-24 text-white'>
          <KeyFeatures />
        </div>
        <div className=' px-12 md:px-24 text-white'>
          <AboutMe />
        </div>

      </main>

  )
}
