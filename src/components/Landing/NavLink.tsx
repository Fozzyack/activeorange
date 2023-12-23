import React from 'react'

interface link {
  name: string,
  href: string
}

const NavLink = ({ link }: { link: link }) => {
  return (
    <a href={link.href}>
      <div className='text-white'>
        {link.name}
      </div>
    </a>

  )
}

export default NavLink