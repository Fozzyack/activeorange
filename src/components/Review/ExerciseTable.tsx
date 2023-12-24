'use client'
import React from 'react'

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
    const [search, setSearch] = React.useState('')


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setTableIndex(previousState => { return { ...previousState, start: 0, finish: 10 } })
    }
    const goForward = () => {
        setTableIndex(prevState => { return { ...prevState, start: prevState.start + 10, finish: prevState.finish + 10 } })
    }
    const goBack = () => {
        if (tableIndex.start - 10 <= 0) {
            setTableIndex(prevState => ({ ...prevState, start: 0, finish: 10 }))
        } else {
            setTableIndex(prevState => ({ ...prevState, start: prevState.start - 10, finish: prevState.finish - 10 }))
        }

    }

    const getExercises = async () => {
        const res = await fetch('/api/weights/exercises/getexercises', {
            method: 'GET'
        })
        if (!res.ok) {
            throw new Error('There was an error getting the exercise List')
        }

        const data  = await res.json()
        setExercises(data)
        setAllExercises( data)
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
                    tableIndex.start != 0 ? <button onClick={() => { goBack() }}>Back</button> : null
                }
                {
                    tableIndex.finish <= exercises.filter((exercise) => exercise.e_name.includes(search.charAt(0).toUpperCase() + search.slice(1))).length - 1 ? <button onClick={() => { goForward() }}>Forward</button> : null
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
                        exercises.filter((exercise) => exercise.e_name.includes(search.charAt(0).toUpperCase() + search.slice(1))).slice(tableIndex.start, tableIndex.finish).map((exercise, index) => (
                            <tr className='text-white'>
                                <td className='table-cell border border-slate-700 p-2'>{exercise.e_name}</td>
                                <td className='flex border border-slate-700 p-2 justify-center items-center'>
                                    <button className='bg-red-500 p-2 rounded-lg' onClick={() => { selectExercise(exercise.e_name, exercise.id) }}>Select</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ExerciseTable