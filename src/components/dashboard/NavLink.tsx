'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
const NavLink = ({ link, selected, setSelected }: {
    link: { id: number, name: string, href: string, image: JSX.Element },
    selected: number | null,
    setSelected: React.Dispatch<React.SetStateAction<number | null>>
}) => {

    const background = {
        highlight: {opacity: 1, backgroundColor: ['#1E2229', '#DD8233']},
        nohighlight : {}
    }

    return (
        <Link onClick={() => { setSelected(link.id) }} href={link.href} className='flex flex-row gap-2 items-center'>
            
                <motion.div
                variants={background}
                    animate={link.id === selected ? 'highlight' : 'nohighlight'}
                    className='p-3 rounded-xl'
                >
                    {link.image}
                </motion.div>
            <div className='relative group'>
                <span>
                    {link.name}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-[0.12rem] bg-orange-600 transition-all group-hover:w-full"></span>
            </div>

        </Link>
    )
}

export default NavLink