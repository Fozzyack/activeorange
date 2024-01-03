'use client'
import ExerciseChart from '@/components/Review/ExerciseChart';
import ExerciseTable from '@/components/Review/ExerciseTable'
import PastPerformance from '@/components/Review/PastPerformance';
import React from 'react'

interface Exercise {
    name: string;
    id: number;
}
const Page = () => {
    const [selectedExercises, setSelectedExercises] = React.useState<Exercise[]>([])

    const remove = (id: number) => {
        setSelectedExercises(prevState => {
            return prevState.filter(exercise => exercise.id !== id)
        })
    }
    return (
        <div className='flex flex-col gap-4 w-full'>
            <h1 className='text-4xl text-white underline'>Select Exercise to View</h1>
            <div className=' p-6 text-white'>
                <ExerciseTable setSelectedExercises={setSelectedExercises} selectedExercises={selectedExercises} />
            </div>
            <div className=' align-start justify-items-start gap-4 flex flex-row flex-wrap'>
                {
                    selectedExercises.map((exercise, index) => (
                        <div key={index} className='flex flex-row text-white bg-slate-600 rounded-xl p-3 gap-3 items-center justify-center'>
                            <p>{exercise.name}</p>
                            <button onClick={() => { remove(exercise.id) }}>
                                <svg className="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                    ))
                }
            </div>
            {
                selectedExercises.map((exercise, index) => (
                    <div className='w-full' key={index}>
                        <h1 className='text-orange-600 font-bold text-2xl text-center'>{exercise.name}</h1>
                        <ExerciseChart id={exercise.id} selectedExercises={selectedExercises}/>
                        <PastPerformance id={exercise.id} selectedExercises={selectedExercises}/>
                    </div>
                ))
            }
        </div>

    )
}

export default Page