'use client'
import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const page = ({ params }: { params: { exerciseId: number } }) => {
    const [date, setDate] = React.useState(new Date())
    const [sets, setSets] = React.useState(0)
    const [reps, setReps] = React.useState(0)
    const [rpe, setRpe] = React.useState(0)
    const [log, setLog] = React.useState('')
    const [weight, setWeight] = React.useState(0)
    
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

    const sendData = async () =>{
        const res = await fetch('/api/weights/exercises/uploadexercise', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
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
            throw new Error('There was an Error Uploading data')
        }

        console.log(await res.json())
    }

    return (
        <div className='w-full flex flex-col'>

            <div className='flex flex-col gap-3 mb-5 text-white border-b'>
                <h1 className='text-4xl font-bold'>Step 2.</h1>
                <p className=''>Enter your Exercise data</p>
            </div>

            <form className='text-white  flex flex-col justify-center items-center p-4 bg-[#f5533e] rounded-xl max-w-[400px]' onSubmit={() => {sendData()}}>
                <div className='flex flex-col gap-3 items-center'>
                    <div className='flex flex-col w-[200px]'>
                        <label > Sets: </label>
                        <input className='px-4 py-1 text-black rounded-xl' type="number" value={sets} onChange={(e) => {handleSets(e)}}/>
                    </div>
                    <div className='flex flex-col w-[200px]'>
                        <label > Reps: </label>
                        <input className='px-4 py-1 text-black rounded-xl' type="number" value={reps} onChange={(e) => {handleReps(e)}}/>
                    </div>
                    <div className='flex flex-col w-[200px]'>
                        <label > Weight: </label>
                        <input className='px-4 py-1 text-black rounded-xl' type="number"  value={weight} onChange={(e) => {handleWeights(e)}}/>
                    </div>
                    <div className='flex flex-col w-[200px]'>
                        <label > RPE: </label>
                        <input className='px-4 py-1 text-black rounded-xl' type="number"  value={rpe} onChange={(e) => {handleRPE(e)}}/>
                    </div>
                    <div className='flex flex-col w-[200px]'>
                        <label > Log: </label>
                        <textarea className='px-4 py-1 text-black rounded-xl'  value={log} onChange={(e) => {handleLog(e)}}/>
                    </div>
                    <div className='flex flex-col w-full '>
                        <label > Date: </label>
                        <div className='text-black'>
                            <DatePicker selected={date} onChange={(date: any) => { setDate(date) }} className='p-2 rounded-full' />
                        </div>
                    </div>
                </div>
                <button type='submit' className='mt-2 bg-gradient-to-r py-2 px-3 from-[#F18828] to-[#d60d1e] rounded-xl w-[120px]'>Submit</button>
            </form>
        </div>
    )
}

export default page