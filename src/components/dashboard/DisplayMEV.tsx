'use client'
import React, { SetStateAction } from 'react'
import CircleProgress from './CircleProgress'
import { EXERCISE_INFO } from '@/vars/vars'



async function getSets(name: string, setMEV : React.Dispatch<SetStateAction<number>>) {
    
    const res = await fetch(`/api/weights/getMEV/${name}`, {
        method: 'GET'
    })
    if(!res.ok) {
        throw new Error('There was an Error Fetching MEV')
    }
    setMEV(await res.json())
}

function getMEV(name: string) {
    const MEV = EXERCISE_INFO.get(name)
    if (!MEV) return 0
    return MEV
}
const DisplayMEV = ({ name }: { name: string }) => {

    const [sets, setSets] = React.useState(0)

    React.useEffect(() => {
        getSets(name, setSets)
    })

    return (
        <div className='p-4 bg-[#1B1F38] rounded-xl text-center flex flex-col items-center'>

            <h1 className='text-white my-3'>{name}</h1>
            <CircleProgress mev={sets} target={getMEV(name)}/>
        </div>
    )
}

export default DisplayMEV