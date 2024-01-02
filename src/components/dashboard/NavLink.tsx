'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

type link = {
    link: { id: number, name: string, href: string, image: JSX.Element }
}
const NavLink = ({ link }: link) => {
    const path = usePathname()
    const background = {
        highlight: { opacity: 1, backgroundColor: ['#1B1F38', '#F87D12'] },
        nohighlight: {}
    }
    return (
        <Link href={link.href} className='flex flex-row gap-2 items-center'>

            <motion.div
                animate={path === link.href ? 'highlight' : 'nohighlight'}
                variants={background}
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