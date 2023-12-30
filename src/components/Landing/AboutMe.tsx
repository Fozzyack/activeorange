'use client'
import React from 'react'

const AboutMe = () => {
    return (
        <div id='aboutme' className=" mt-10 md:h-[1024px] md:bg-[url(/OrangeJuice.png)] md:bg-contain bg-center bg-no-repeat text-center" >
            <div className='flex flex-col h-full items-center justify-center'>
                <div className='bg-gradient-to-t from-[#f82500] from-60% to-[#FC8000] p-12 rounded-xl'>
                    <h1 className='text-white text-5xl'>
                        About Me
                    </h1>
                    <p>I am a Software Engineer who likes to lift heavy circles</p>
                    <p>As of creating this it is an online platform to hold all my lifting data.. blah blah blah</p>

                </div>

            </div>



        </div>
    )
}

export default AboutMe