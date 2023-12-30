'use client'
import React from 'react'
interface link {
  name: string,
  href: string
}

const NavLink = ({ link }: { link: link }) => {
  return (
    <a href={link.href}>
      <div className='text-white group relative'>
        {link.name}
        <span className='absolute -bottom-1 h-[0.12rem] left-0 w-0 group-hover:w-full transition-all ease-in-out bg-orange-600'></span>
      </div>
    </a>

  )
}

export default NavLink