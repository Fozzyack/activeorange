'use client'
import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import EditRecord from './EditRecord'

type records = {
    error: null | boolean,
    data: record[]
}
type record = {
    id: number
    name: string,
    date_recorded: Date,
    reps: number,
    sets: number,
    weight: string,
    rpe: number
}
const FindExercise = ({ records }: { records: records }) => {
    const dates: string[] = []
    for (var i = 0; i < records.data.length; i++) {
        if (!dates.includes(records.data[i].date_recorded.toDateString())) {
            dates.push(records.data[i].date_recorded.toDateString())
        }
    }

    const [selectedDate, setSelectedDate] = React.useState<string>(dates[0])
    const [show, setShow] = React.useState(true)
    const [displayRecords, setDisplayRecords] = React.useState<record[]>([])
    const variants = {
        show: { opacity: 1 },
        hide: { opacity: 0 }
    }

    useEffect(() => {
        setDisplayRecords(records.data.filter(record => record.date_recorded.toDateString() === selectedDate))
    }, [selectedDate])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changeTo = e.target.value
        const delay = displayRecords.length * 250
        console.log(delay)
        setShow(false)
        setTimeout(() => {
            setSelectedDate(changeTo)
        }, delay)
        setTimeout(() => {
            setShow(true)
        }, delay + 250)


    }
    return (
        <div className='flex flex-col'>
            <label className='text-white text-xl'>Select A Date:</label>
            <select value={selectedDate} className='text-center p-3 rounded-xl' onChange={(e) => { handleChange(e) }}>
                {
                    dates.map((date, index) => {
                        return (
                            <option
                                key={index} value={date}> {date}
                            </option>
                        )
                    })
                }
            </select>
            <div className='flex gap-4 flex-wrap mt-10'>
                {
                    displayRecords.map((record, index) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={show ? 'show' : 'hide'}
                            variants={variants}
                            transition={{ delay: 0.2 * (index + 1) }}
                            className='p-3 bg-[#2e3542] rounded-xl shadow-xl'
                        >
                            <h3 className='text-lg font-bold text-white'>{record.name}</h3>
                            <div className='text-white flex gap-3 flex-wrap justify-center items-center'>
                                <div className='flex flex-col p-1 items-center border border-slate-600 rounded-lg'>
                                    <p>Sets:</p>
                                    <p>{record.sets}</p>
                                </div>
                                <div className='flex flex-col p-1 items-center border border-slate-600 rounded-lg'>
                                    <p>Reps:</p>
                                    <p>{record.reps}</p>
                                </div>
                                <div className='flex flex-col p-1 items-center border border-slate-600 rounded-lg'>
                                    <p>Weight:</p>
                                    <p>{record.weight}</p>
                                </div>
                                <div className='flex flex-col p-1 items-center border border-slate-600 rounded-lg'>
                                    <p>RPE:</p>
                                    <p>{record.rpe}</p>
                                </div>
                                <EditRecord record={record} setDisplayRecords={setDisplayRecords} records={records} />
                            </div>

                        </motion.div>
                    ))
                }
            </div>

        </div>
    )
}

export default FindExercise