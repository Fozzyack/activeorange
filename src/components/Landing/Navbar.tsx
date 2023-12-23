import React from 'react'
import NavLink from './NavLink'
import Image from 'next/image'
import Icon from '@/assets/icon.png'
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
        <div className='fixed flex flex-row justify-between w-full p-5 bg-[#161A23] items-center'>
            <div className='flex flex-row items-center'>
                <Image src={Icon.src} alt='logo' width={64} height={64}/>
                <h1 className='text-white text-4xl font-bold'>Active Orange</h1>
            </div>
            <div className='hidden md:flex flex-row gap-10'>
                {
                    LINKS.map((link, index) => (
                        <div key={index}>
                            <NavLink link={link}/>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default Navbar