'use client'
import React from 'react'
import NavLink from './NavLink'
import Image from 'next/image'
import Icon from '@/assets/icon.png'
import { motion } from 'framer-motion'
const LINKS = [
    {
        name: "What This Does",
        href: '#whatthisdoes',
    },
    {
        name: 'About Me',
        href: '#aboutme'
    },
]
const Navbar = () => {
    return (
        <motion.div
        initial={{opacity:0, y: -200}}
        animate={{opacity:1, y: 0}}
        className='fixed flex flex-row justify-center md:justify-between w-full p-5 bg-black bg-opacity-95 items-center'>
            <div className='flex flex-row items-center gap-4'>
                <Image src={Icon.src} alt='logo' width={64} height={64} className='hidden md:block' />
                <h1 className='text-white md:text-3xl py-3 font-bold bg-gradient-to-t from-[#F85800] to-[#FC8000] shadow-xl px-3 rounded-full text-center'>Active Orange</h1>
            </div>
            <div className='hidden md:flex flex-row gap-10'>
                {
                    LINKS.map((link, index) => (
                        <div key={index}>
                            <NavLink link={link} />
                        </div>
                    ))
                }

            </div>

        </motion.div>
    )
}

export default Navbar