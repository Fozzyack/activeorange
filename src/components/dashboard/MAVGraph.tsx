'use client'
import { getSets } from '@/functions/functions'
import { exerciseList, EXERCISE_MAV_MIN, EXERCISE_MAV_MAX } from '@/vars/vars'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    BarElement,
    Legend,
    Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// Register ChartJS components using ChartJS.register
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Legend
);

import React from 'react'

type Sets = {
    Back: number,
    Quads: number,
    Hamstrings: number,
    Glutes: number,
    Chest: number,
    "Front Delts": number,
    "Side Delts": number,
    "Rear Delts": number,
    Biceps: number,
    Triceps: number,
    Calves: number,
    Abs: number,
    Traps: number,
    [key: string]: number;
}


const MAVGraph = () => {
    const [sets, setSets] = React.useState<Sets>({
        Back: 0,
        Quads: 0,
        Hamstrings: 0,
        Glutes: 0,
        Chest: 0,
        "Front Delts": 0,
        "Side Delts": 0,
        "Rear Delts": 0,
        Biceps: 0,
        Triceps: 0,
        Calves: 0,
        Abs: 0,
        Traps: 0
    })

    React.useEffect(() => {
        function updateVals() {
            exerciseList.forEach(async (element) => {
                const muscleSets = await getSets(element)
                setSets(prev => { return { ...prev, [element]: muscleSets } })
            })
        }
        updateVals()

    }, [])

    const randomColours = Object.keys(sets).map(() => `rgba(${Math.random() * 255}, ${Math.random() * 255} ,${Math.random() * 255} , 1)`)

    return (
        <div className='w-full'>
            <Bar
                data={{
                    labels: Object.keys(sets),
                    datasets: [{
                        label: 'Max MEV',
                        data: Object.keys(sets).map((key) => {
                            const MAV_MAX = EXERCISE_MAV_MAX.get(key)
                            if (!MAV_MAX) return 0
                            if (sets[key] / MAV_MAX * 100 > 100) return 100
                            return sets[key] / MAV_MAX * 100
                        }),
                        borderColor: randomColours,
                        backgroundColor: randomColours,
                        borderWidth: 5
                    },
                    {
                        label: 'Min MEV',
                        data: Object.keys(sets).map((key) => {
                            const MAV_MIN = EXERCISE_MAV_MIN.get(key)
                            if (!MAV_MIN) return 0
                            if (sets[key] / MAV_MIN * 100 > 100) return 100
                            return sets[key] / MAV_MIN * 100
                        }),
                        borderColor: randomColours,
                        backgroundColor: randomColours,
                        borderWidth: 5
                    }]
                }}
                options={{
                    scales: {
                        y: {
                            min: 0,
                            max: 100
                        }
                    }
                }}
            />
        </div>
    )
}

export default MAVGraph