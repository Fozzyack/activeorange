import ExerciseList from '@/components/record/ExerciseList'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className='flex flex-col gap-3 mb-5 text-white border-b'>
                <h1 className='text-4xl font-bold'>Step 1.</h1>
                <p className=''>Choose an Exercise to Record</p>
            </div>

            <ExerciseList />
        </div>
    )
}

export default page