'use client'
import React from 'react'

const CircleProgress = () => {
    return (
        <div className='text-white rounded-xl relative'>
            <div className='rounded-full w-[100px] h-[100px] shadow-xl' >
                <div className='bg-[#1B1F38]  w-full h-full rounded-full flex items-center justify-center' style={{boxShadow: 'inset 0 10px 15px -3px rgb(0 0 0 / 0.1), inset 0 4px 6px -4px rgb(0 0 0 / 0.1)'}}>
                    <p >65%</p>
                </div>
                
            </div>
            <svg className='absolute top-0 left-0 h-full w-full z-0'>
                <defs>
                    <linearGradient id='GradientColor'>
                        <stop offset='0%' stopColor='#DA22FF' />
                        <stop offset='100%' stopColor='#9733EE' />
                    </linearGradient>
                </defs>
                <circle cx='50' cy='50' r='40' strokeLinecap='round' strokeWidth='10px' strokeDasharray={450}  strokeDashoffset={350} className='fill-none stroke-[url(#GradientColor)]'/>
            </svg>
        </div>
    )
}

export default CircleProgress