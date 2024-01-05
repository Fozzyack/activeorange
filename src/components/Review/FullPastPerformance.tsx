'use client'
import { getAllRecords } from '@/functions/fetchfunctions'
import { exerciseData } from '@/types/types'
import React, { Fragment } from 'react'

interface exerciseDataExtended extends exerciseData {
    name: string
}
const FullPastPerformance = () => {
    const [records ,setRecords ] = React.useState<exerciseDataExtended[]>([])
    React.useEffect(() => {
        async function getRecords() {
            setRecords(await getAllRecords())
        }
        getRecords()
    })
    return (
        <Fragment>
            <h1 className='text-white text-3xl'>All Past Records</h1>
            <table className='table-auto w-full text-white border bg-[#1B1F38] border-collapse'>
                <thead>
                    <tr>
                        <th className='border md:p-3 py-3'>Exercise</th>
                        <th className='border md:p-3 py-3'>Sets</th>
                        <th className='border md:p-3 py-3'>Reps</th>
                        <th className='border md:p-3 py-3'>Weight</th>
                        <th className='border md:p-3 py-3 hidden md:table-cell'>Log</th>
                        <th className='border md:p-3 py-3 hidden md:table-cell'>Date</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        records.map((record, index) => (
                            <tr key={index}>
                                <td className='border md:p-3 py-3'>{record.name}</td>
                                <td className='border md:p-3 py-3'>{record.sets}</td>
                                <td className='border md:p-3 py-3'>{record.reps}</td>
                                <td className='border md:p-3 py-3'>{record.weight}</td>
                                <td className='border md:p-3 py-3 hidden md:table-cell'>{record.log}</td>
                                <td className='border md:p-3 py-3 hidden md:table-cell'>{new Date(record.date_recorded).toLocaleDateString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default FullPastPerformance