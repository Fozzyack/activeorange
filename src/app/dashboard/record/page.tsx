import ExerciseList from '@/components/record/ExerciseList'
import React from 'react'

const page = () => {
    return (
        <div>
            <div className='flex flex-col gap-3 mb-5 text-white border-b'>
                <h1 className='text-4xl font-bold'>Step 1.</h1>
                <p className=''>Choose an Exercise to Record</p>
            </div>
            <div className='p-6 bg-[#1B1F38] rounded-xl shadow-xl'>
                <ExerciseList />
            </div>

        </div>
    )
}

export default page