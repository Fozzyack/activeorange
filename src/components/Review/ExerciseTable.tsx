'use client'
import React from 'react'
import { motion } from 'framer-motion'
interface exercises {
    e_name: string,
    m_name: string,
    id: number
}

interface ExerciseComponentProps {
    selectedExercises: {
        name: string;
        id: number;
    }[];
    setSelectedExercises: React.Dispatch<React.SetStateAction<{
        name: string;
        id: number;
    }[]>>;
}

const ExerciseTable = ({ selectedExercises, setSelectedExercises }: ExerciseComponentProps) => {

    const [exercises, setExercises] = React.useState<exercises[]>([])
    const [allExercises, setAllExercises] = React.useState<exercises[]>([])
    const [tableIndex, setTableIndex] = React.useState({
        start: 0,
        finish: 10
    })
    const [showRows, setShowRows] = React.useState<string>('show')
    const [search, setSearch] = React.useState('')
    const tr = {
        hidden: { x: -200, opacity: 0 },
        show: { x: 0, opacity: 1 },
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowRows('hidden')
        setSearch(e.target.value)
        setTableIndex(previousState => { return { ...previousState, start: 0, finish: 10 } })
        setTimeout(() => {
            setShowRows('show')
        }, 1100)
    }
    const goForward = () => {
        setShowRows('hidden')
        setTableIndex(prevState => { return { ...prevState, start: prevState.start + 10, finish: prevState.finish + 10 } })
        setTimeout(() => {
            setShowRows('show')
        }, 1100)
    }
    const goBack = () => {
        setShowRows('hidden')
        if (tableIndex.start - 10 <= 0) {
            setTableIndex(prevState => ({ ...prevState, start: 0, finish: 10 }))
        } else {
            setTableIndex(prevState => ({ ...prevState, start: prevState.start - 10, finish: prevState.finish - 10 }))
        }
        setTimeout(() => {
            setShowRows('show')
        }, 1100)

    }

    const getExercises = async () => {
        const res = await fetch('/api/weights/exercises/getexercises', {
            method: 'GET',
            cache: 'force-cache'
        })
        if (!res.ok) {
            throw new Error('There was an error getting the exercise List')
        }

        const data = await res.json()
        setExercises(data)
        setAllExercises(data)
    }


    const selectExercise = (name: string, id: number) => {
        const newExercises = { name, id }
        setSelectedExercises(prevState => {
            return [...prevState, newExercises]
        })
    }

    React.useEffect(() => {

        setExercises(() => {

            const id_list = selectedExercises.map(exercise => exercise.id)
            return allExercises.filter(exercise => {
                var add = true
                for (var i = 0; i < id_list.length; i++) {
                    if (id_list[i] === exercise.id) {
                        add = false;
                    }
                } if (add === true) {
                    return exercise
                }
            })
        })

    }, [selectedExercises])

    React.useEffect(() => {
        getExercises()
    }, [])
    return (
        <div className='text-white'>
            <div className='flex flex-row gap-4 mb-5 w-full flex-wrap'>
                <input type="text" className='text-black p-3 rounded-xl max-w-full' value={search} onChange={(e) => { handleSearch(e) }} />
                {
                    tableIndex.start != 0 ? <button className='p-4 items-center justify-center rounded-xl bg-orange-600' onClick={() => { goBack() }}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                        </svg>
                    </button> : null
                }
                {
                    tableIndex.finish <= exercises.filter((exercise) => exercise.e_name.toLowerCase().includes(search.toLowerCase())).length - 1 ? <button onClick={() => { goForward() }} className='p-4 flex items-center justify-center rounded-xl bg-orange-600'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                    </button> : null
                }

            </div>
            <table className='table table-fixed border-separate border border-slate-500 w-full'>
                <thead>
                    <tr>
                        <th className='table-cell border border-slate-600 md:p-4 bg-[#DD8233]'>Exercise Name</th>
                        <th className='table-cell border border-slate-600 md:p-4 bg-[#DD8233]'>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exercises.filter((exercise) => exercise.e_name.toLowerCase().includes(search.toLowerCase())).slice(tableIndex.start, tableIndex.finish).map((exercise, index) => (

                            <motion.tr className='text-white'
                                initial={{ opacity: 0, x: -200 }}
                                animate={showRows}
                                variants={tr}
                                transition={{ delay: 0.1 * index }}
                                key={index}
                            >
                                <td className='table-cell border border-slate-700 p-2'>{exercise.e_name}</td>
                                <td className='border w-full border-slate-700 p-2'>
                                    <button className='bg-red-500 p-2 rounded-lg max-w-20 w-full' onClick={() => { selectExercise(exercise.e_name, exercise.id) }}>Select</button></td>
                            </motion.tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ExerciseTable