import React from 'react'


const MISSIONS = [
    {
        name: 'MISSION',
        image: null,
        desc: <p> Empowering individuals with personalized fitness insights and seamless tracking, our mission is to facilitate healthier, more active lives through our innovative app. We're committed to making fitness accessible, motivating, and enjoyable for all.</p>
    },
    {
        name: 'FEATURED TESTIMONIAL',
        image: null,
        desc: <p> Since I started using the fitness app, I've seen incredible results in my strength and endurance. The personalized workouts and tracking features have made it easy for me to stay motivated and on track towards achieving my fitness goals. - Sample Testimonial</p>
    },
    {
        name: 'Pricing',
        image: null,
        desc: <p> Completely Free :)</p>
    },
]
const OurMission = () => {
  return (
    <div className='bg-[#272522] rounded-xl p-3 flex flex-col md:flex-row gap-4'>
        {
            MISSIONS.map((miss, index) => (
                <div key={index} className='p-4 rounded-xl  bg-gradient-to-t from-[#f82500] from-60% to-[#FC8000] text-center md:text-left flex flex-col gap-2'>
                    <h1 className=' border-b  font-bold text-lg text-white'>{miss.name}</h1>
                    {miss.desc}
                </div>
            ))
        }
    </div>
  )
}

export default OurMission