'use client'
import React from 'react'
import { motion } from 'framer-motion'


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
type records = {
    name: string;
    exerciseId: number;
}[]
const ExerciseTable = ({ selectedExercises, setSelectedExercises }: ExerciseComponentProps) => {

    const [records, setRecords] = React.useState<records>([])
    const [tableIndex, setTableIndex] = React.useState({
        start: 0,
        finish: 10
    })
    const [showRows, setShowRows] = React.useState<string>('show')
    const [search, setSearch] = React.useState('')
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
    const getRecords = async () => {
        const res = await fetch('/api/weights/record/getrecords', {
            method: 'GET'
        })
        if (!res.ok) throw new Error('Error getting Records from Server')
        const data = await res.json()
        console.log(data)
        setRecords(data)
    }
    React.useEffect(() => {
        getRecords()
    }, [])
    return (
        <div className='text-white'>
            <h3 className='underline text-[2rem] font-bold my-2'>Recorded Exercises</h3>
            <input className='text-black p-2 rounded-xl mt-3' type="text" onChange={(e) => handleSearch(e)} />
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
                {
                    records
                        .filter(record => record.name.toLowerCase().includes(search.toLowerCase()))
                        .filter(record => {
                            var update_record = true;
                            selectedExercises.forEach(element => {
                                if (element.name === record.name) update_record = false;
                            })
                            return update_record
                        })
                        .map((record, index) => (

                            <div className='border-slate-400 p-4 rounded-xl shadow-xl border' key={index} >
                                <div className='flex flex-col text-center items-center justify-center'>
                                    <h3>
                                        {record.name}
                                    </h3>
                                    <button className='bg-[#F87D12] px-3 py-2 rounded-xl bg mt-3 hover:bg-[#8ACB88] transition ease-in-out' onClick={() => {
                                        setSelectedExercises(prev => [...prev, { name: record.name, id: record.exerciseId }])
                                    }}>Select</button>
                                </div>

                            </div>


                        ))
                }
            </div>
        </div >
    )
}

export default ExerciseTable