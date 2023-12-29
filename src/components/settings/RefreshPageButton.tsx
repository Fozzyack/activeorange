
'use client'
import React from 'react'

const click = () => {
    window.location.reload()
}
const RefreshPageButton = () => {
    return (
        <button type='submit' onClick={click} className='px-2 py-1 bg-orange-600 rounded-b-xl'>Update</button>
    )
}

export default RefreshPageButton