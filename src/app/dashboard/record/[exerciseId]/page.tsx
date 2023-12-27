'use client'

import React  from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const Page = ({ params }: { params: { exerciseId: number } }) => {
    const [date, setDate] = React.useState(new Date())
    const [sets, setSets] = React.useState<number | undefined>()
    const [reps, setReps] = React.useState<number | undefined>()
    const [rpe, setRpe] = React.useState<number | undefined>()
    const [log, setLog] = React.useState<string>('')
    const [weight, setWeight] = React.useState<number | undefined>()
    const [error, setError] = React.useState<string | undefined>()
    const [success, setSuccess] = React.useState<string>('unfilled')

    const handleSets = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSets(Math.round(parseFloat(e.target.value) * 100) / 100)
    }
    const handleReps = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReps(Math.round(parseFloat(e.target.value) * 100) / 100)
    }
    const handleWeights = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWeight(Math.round(parseFloat(e.target.value) * 100) / 100)
    }
    const handleRPE = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRpe(Math.round(parseInt(e.target.value)))
    }
    const handleLog = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLog(e.target.value)
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!sets || !reps || !weight || !rpe || !date) {
            return setError('Please Make sure all fields are filled out')
        }
        setSuccess('loading')
        const res = await fetch('/api/weights/exercises/uploadexercise', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: params.exerciseId,
                sets: sets,
                reps: reps,
                weight: weight,
                date: date,
                rpe: rpe,
                log: log
            })
        })
        if (!res.ok) {
            setSuccess('unfilled')
            setError('Please Make sure all fields are filled out')
            throw new Error('There was an Error Uploading data')
        }

        setSuccess('success')
    }

    return (
        <div className='w-full flex flex-col items-center'>

            <div className='flex flex-col gap-3 mb-5 text-white border-b text-center md:text-left w-full'>
                <h1 className='text-4xl font-bold'>Step 2.</h1>
                <p className=''>Enter your Exercise data</p>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-2 w-full'>
                <div className='hidden md:block col-span-1' style={{backgroundImage: 'url(/icon.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}>

                </div>
                {
                    success === 'unfilled' ?
                        <div className='col-span-1'>
                            <form className='text-white  flex flex-col justify-center items-center p-4 rounded-xl max-w-[400px] border shadow-xl' onSubmit={(e) => { sendData(e) }}>
                                <div className='flex flex-col gap-3 items-center'>
                                    <div className='flex flex-row gap-4'>
                                        <div className='flex flex-col w-[110px]'>
                                            <label > Sets: </label>
                                            <input className='px-4 py-1 text-black rounded-xl' type="number" value={sets} onChange={(e) => { handleSets(e) }} />
                                        </div>
                                        <div className='flex flex-col w-[110px]'>
                                            <label > Reps: </label>
                                            <input className='px-4 py-1 text-black rounded-xl' type="number" value={reps} onChange={(e) => { handleReps(e) }} />
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-4'>
                                        <div className='flex flex-col w-[110px]'>
                                            <label > Weight: </label>
                                            <input className='px-4 py-1 text-black rounded-xl' type="number" value={weight} onChange={(e) => { handleWeights(e) }} />
                                        </div>
                                        <div className='flex flex-col w-[110px]'>
                                            <label > RPE: </label>
                                            <input className='px-4 py-1 text-black rounded-xl' type="number" value={rpe} onChange={(e) => { handleRPE(e) }} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col w-[220px]'>
                                        <label > Log: </label>
                                        <textarea placeholder='Any thoughts on the lift' className='px-4 py-1 text-black rounded-xl' value={log} onChange={(e) => { handleLog(e) }} />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <label > Date: </label>
                                        <div className='text-black'>
                                            <DatePicker selected={date} onChange={(date: any) => { setDate(date) }} className='p-2 rounded-full' />
                                        </div>
                                    </div>
                                </div>
                                <button type='submit' className='mt-2 bg-gradient-to-r py-2 px-3 from-[#F18828] to-[#d60d1e] rounded-xl w-[120px]'>Submit</button>
                                {
                                    error ? <div className='p-3 bg-red-600 rounded-xl mt-6'> {error}</div> : null
                                }
                            </form>
                        </div>
                        :
                        success === 'loading' ?
                            <button type="button" className="bg-[#DD8233] col-span-1 text-white p-3 rounded-xl flex flex-row gap-4 items-center shadow-xl" disabled>
                                <svg aria-hidden="true" className="w-8 h-8 animate-spin text-gray-200 dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            Processing Request
                            </button> :
            <div>
                <h3 className='text-white font-bold text-3xl col-span-1'>Successfully Updated Lift!</h3>
            </div>
                }


        </div>

        </div >
    )
}

export default Page