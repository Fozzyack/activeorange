import { getLiftData } from '@/functions/functions'
import { exerciseData, exercises } from '@/types/types'
import React from 'react'

const PastPerformance = ({ id, selectedExercises }: { id: number,  selectedExercises: exercises | null }) => {
    const [data, setData] = React.useState<exerciseData[]>([])
    async function getData() {
        setData(await getLiftData(id))
    }
    if (selectedExercises) {
        React.useLayoutEffect(() => {
            getData()
        }, [selectedExercises])
    } else {
        React.useLayoutEffect(() => {
            getData()
        }, [])
    }

    return (
        <div className='text-white text-center mt-3 '>
            <h1 className='text-xl'>
                Past Performance
            </h1>
            <table className='table-auto w-full border border-slate-400 border-separate bg-[#1B1F38]'>
                <thead>
                    <tr>
                        <th className='border border-slate-500'>Weight:</th>
                        <th className='border border-slate-500'>Reps:</th>
                        <th className='border border-slate-500'>Sets:</th>
                        <th className='border border-slate-500'>RPE:</th>
                        <th className='border border-slate-500'>Log:</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((data, index) => (
                            <tr key={index}>
                                <td className='border border-slate-600'>{data.weight}</td>
                                <td className='border border-slate-600'>{data.sets}</td>
                                <td className='border border-slate-600'>{data.reps}</td>
                                <td className='border border-slate-600'>{data.rpe}</td>
                                <td className='border border-slate-600'>{data.log}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PastPerformance