'use client'
import React, { useEffect } from 'react'

interface Records {
    sets: number,
    reps: number,
    weight: string,
    rpe: number,
    name: string
}
const RecentlyRecorded = () => {

    const [records, setRecords] = React.useState<Records[]>([]);
    const getrecorded = async () => {
        fetch('/api/weights/getrecent', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(async (res) => {
            if (!res.ok) {
                throw new Error('There was an error getting data')
            }
            setRecords(await res.json())
        })
    }

    React.useEffect(() => {
        getrecorded()
    }, [])

    console.log(records)
    return (
        <div className='flex  w-full '>
            <table className='text-white table-auto bg-slate-800 border-collapse border border-slate-400 border-spacing-2 w-[25%]'>
                <thead>
                    <tr>
                        <th className='border border-slate-400'>Name</th>
                        <th className='border border-slate-400'>Sets</th>
                        <th className='border border-slate-400'>Reps</th>
                        <th className='border border-slate-400'>Weight</th>
                        <th className='border border-slate-400'>RPE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((record, index) => (
                            <tr>
                                <td className=' p-1 border border-slate-400'>{record.name}</td>
                                <td className='p-1  border border-slate-400' >{record.sets}</td>
                                <td className='p-1  border border-slate-400'>{record.reps}</td>
                                <td className='p-1  border border-slate-400'>{record.weight}</td>
                                <td className='p-1  border border-slate-400'>{record.rpe}</td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default RecentlyRecorded