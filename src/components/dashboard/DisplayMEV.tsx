'use client'
import React from 'react'
import CircleProgress from './CircleProgress'
import { EXERCISE_MEV_INFO } from '@/vars/vars'
import { getSets } from '@/functions/functions'




function getMEV(name: string) {
    const MEV = EXERCISE_MEV_INFO.get(name)
    if (!MEV) return 0
    return MEV
}

const DisplayMEV = ({ name }: { name: string }) => {

    const [sets, setSets] = React.useState(0)

    React.useEffect(() => {
        async function updateVals() {
            setSets(await getSets(name))
        }
        updateVals()
        
    })

    return (
        <div className='p-4 bg-[#1B1F38] rounded-xl text-center flex flex-col items-center'>

            <h1 className='text-white my-3'>{name}</h1>
            <CircleProgress mev={sets} target={getMEV(name)}/>
        </div>
    )
}

export default DisplayMEV