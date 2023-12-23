'use client'
import Link from 'next/link'
import React from 'react'

const NavLink = ({ link }: {
    link: { name: string, href: string, image: JSX.Element }
}) => {
    return (
        <Link href={link.href} className='flex flex-row gap-2 items-center'>
            {link.image}
            <p>
                {link.name}
            </p>
        </Link>
    )
}

export default NavLink