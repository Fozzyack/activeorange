'use client'
import Link from 'next/link'
import React from 'react'

const NavLink = ({ link, selected, setSelected }: {
    link: { id: number, name: string, href: string, image: JSX.Element },
    selected: number | null,
    setSelected: React.Dispatch<React.SetStateAction<number | null>>
}) => {

    return (
        <Link onClick={() => {setSelected(link.id)}} href={link.href} className='flex flex-row gap-2 items-center'>
            {
                selected === link.id ?
                    <div className='p-1 rounded-xl bg-[#F68E31]'>
                        {link.image}
                    </div> :
                    <div className=''>
                        {link.image}
                    </div>
            }
            <p>
                {link.name}
            </p>
        </Link>
    )
}

export default NavLink