'use client'
import React from 'react'
import { motion } from 'framer-motion'


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
        <div className='bg-black rounded-xl p-3 md:p-8 flex flex-col md:grid md:grid-cols-3 gap-4'>
            {
                MISSIONS.map((miss, index) => (
                    <motion.div 
                    whileHover={{y: -20}}
                    transition={{duration: 0.3}}
                    key={index} className='p-4 rounded-xl  bg-gradient-to-t from-[#f82500] from-60% to-[#FC8000] text-center md:text-left flex flex-col gap-2 shadow-lg'>
                        <h1 className=' border-b  font-bold text-lg text-white'>{miss.name}</h1>
                        {miss.desc}
                    </motion.div>
                ))
            }
        </div>
    )
}

export default OurMission