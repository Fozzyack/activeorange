'use client'
import React from 'react'
import CircleProgress from './CircleProgress'

const DisplayMEV = ({ name }: { name: string }) => {
    return (
        <div className='p-4 bg-[#1B1F38] rounded-xl text-center flex flex-col items-center'>
            
            <h1 className='text-white my-3'>{name}</h1>
            <CircleProgress />
        </div>
    )
}

export default DisplayMEV