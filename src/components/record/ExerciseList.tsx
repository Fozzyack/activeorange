'use client'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { matchWords } from '@/functions/functions'
import { exercises2 } from '@/types/types'
const ExerciseList = () => {

    const [exercises, setExercises] = React.useState<exercises2>([])
    const [tableIndex, setTableIndex] = React.useState({
        start: 0,
        finish: 10
    })
    const [search, setSearch] = React.useState('')
    const [showRows, setShowRows] = React.useState<string>('show')
    const tr = {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
    }


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowRows('hidden')

        setTimeout(() => {
            setSearch(e.target.value)
            setTableIndex(previousState => { return { ...previousState, start: 0, finish: 10 } })
        }, 1000)

        setTimeout(() => {
            setShowRows('show')
        }, 1100)
    }
    const goForward = () => {
        setShowRows('hidden')
        setTimeout(() => {
            setTableIndex(prevState => { return { ...prevState, start: prevState.start + 10, finish: prevState.finish + 10 } })
        }, 1000)

        setTimeout(() => {
            setShowRows('show')
        }, 1100)
    }
    const goBack = () => {
        setShowRows('hidden')
        setTimeout(() => {
            if (tableIndex.start - 10 <= 0) {
                setTableIndex(prevState => ({ ...prevState, start: 0, finish: 10 }))
            } else {
                setTableIndex(prevState => ({ ...prevState, start: prevState.start - 10, finish: prevState.finish - 10 }))
            }
        }, 1000)

        setTimeout(() => {
            setShowRows('show')
        }, 1100)

    }

    const getExercises = async () => {
        const res = await fetch('/api/weights/exercises/getexercises', {
            method: 'GET',
            next: { revalidate: 1800 }
        })
        if (!res.ok) {
            throw new Error('There was an error getting the exercise List')
        }

        setExercises(await res.json())

    }


    React.useEffect(() => {
        getExercises()
    }, [])

    console.log(exercises)
    return (
        <div className='text-white'>
            <div className='flex flex-row gap-4 mb-5 w-full flex-wrap'>
                <input type="text" className='text-black p-3 rounded-xl max-w-full' onChange={(e) => { handleSearch(e) }} />
                {
                    tableIndex.start != 0 ? <button onClick={() => { goBack() }} className='p-4 items-center justify-center rounded-xl bg-orange-600'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                        </svg>
                    </button> : null
                }
                {
                    tableIndex.finish <= exercises.filter((exercise) => matchWords(exercise.e_name, search) || matchWords(exercise.m_name.join(''), search)).length - 1 ? <button className='p-4 items-center justify-center rounded-xl bg-orange-600' onClick={() => { goForward() }}><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                    </svg></button> : null
                }

            </div>


            <table className='table table-fixed border-separate border border-slate-500 w-full'>
                <thead>
                    <tr>
                        <th className='table-cell border border-slate-600 md:p-4 bg-[#DD8233]'>Exercise Name</th>
                        <th className='table-cell border border-slate-600 md:p-4 bg-[#DD8233]'>Muscle Groups</th>
                        <th className='table-cell border border-slate-600 md:p-4 bg-[#DD8233]'>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.filter((exercise) => matchWords(exercise.e_name, search) || matchWords(exercise.m_name.join(''), search))
                            .slice(tableIndex.start, tableIndex.finish).map((exercise, index) => (
                                <motion.tr key={index}
                                    initial={{ opacity: 0 }}
                                    animate={showRows}
                                    variants={tr}
                                    transition={{ delay: 0.1 * index }}
                                    className='text-white'>
                                    <td className='table-cell border border-slate-700 p-2'>{exercise.e_name}</td>
                                    <td className='table-cell border border-slate-700 p-2'>{
                                        <div className='flex text-center flex-col'>
                                            {
                                                exercise.m_name.map((name, index) => (
                                                    <p key={index}>{name}</p>
                                                ))
                                            }
                                        </div>

                                    }</td>
                                    <td className='border border-slate-700 p-2 justify-center items-center'>
                                        <Link className='bg-red-500 p-2 rounded-lg' href={`/dashboard/record/${exercise.id}`}>Select</Link></td>
                                </motion.tr>
                            ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ExerciseList