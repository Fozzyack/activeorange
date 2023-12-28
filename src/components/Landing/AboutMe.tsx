import Image from 'next/image'
import React from 'react'

const AboutMe = () => {
    return (
        <div id='aboutme' className='flex flex-col md:grid md:grid-cols-5 w-full items-center mt-24 gap-4 justify-center pb-40 text-center md:text-start'>
            <div className='col-span-3 hidden md:block'>
                <Image src={'/AboutImage.jpg'} width={800} height={800} alt='Weights' className='rounded-xl md:w-[500px] lg:w-[600px]'/>
            </div>

            <div className='col-span-2 flex flex-col gap-2'>
                <h1 className='text-transparent bg-clip-text bg-[#F18828] text-5xl font-bold'>
                    About Me
                </h1>
                <p>I am a Software Engineer who likes to lift heavy circles</p>
                <p>As of creating this it is an online platform to hold all my lifting data.. blah blah blah</p>
            </div>


        </div>
    )
}

export default AboutMe