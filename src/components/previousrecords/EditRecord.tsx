'use client'
import React from 'react'
import { motion } from 'framer-motion'

type record = {
    id: number
    name: string,
    date_recorded: Date,
    reps: number,
    sets: number,
    weight: string,
    rpe: number
}

type records = {
    error: boolean | null,
    data: record[]
}

const EditRecord = ({ record, setDisplayRecords, records }:
    {
        record: record,
        setDisplayRecords: React.Dispatch<React.SetStateAction<record[]>>,
        records: records
    }
) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        weight: '',
        reps: '',
        sets: '',
        rpe: ''
    })
    const [status, setStatus] = React.useState('unfilled')

    const openModal = () => {
        setIsModalOpen(true);
        setStatus('unfilled')
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            weight: '',
            reps: '',
            sets: '',
            rpe: ''
        })
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const deleteData = async () => {
        setStatus('loading')
        fetch(`/api/weights/record/delete/${record.id}`, {
            method: 'DELETE'
        }).then((response) => {
            if (!response.ok) {
                throw new Error('There was an Error Deleting Data')
            } else {
                setStatus('success');
                
                setDisplayRecords(prev => {
                    console.log(prev)
                    return prev.filter(prev_record => prev_record.id !== record.id)
                    
                })
                records.data = records.data.filter(prev_record => prev_record.id !== record.id)
                setIsModalOpen(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }


    return (
        <div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={closeModal}></div>
            )}

            <button className="p-3 bg-[#DD8233] rounded-xl w-[100px]" onClick={openModal}>
                Edit
            </button>
            <motion.dialog id={`modal-${record.id}`} className=" bg-[#1E2229] text-white shadow-2xl modal fixed z-20 p-8 m-5 rounded-xl top-[25%] left-[100vw/2] md:left-[50%]" open={isModalOpen}
                animate={isModalOpen ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
            >
                <motion.div
                    animate={isModalOpen ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.6 }}
                    className='flex flex-col'
                >
                    <form method="dialog">
                        <button
                            className="absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg ">{record.name}</h3>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Weight:</label>
                                <input onChange={(e) => { handleFormData(e) }} value={formData.weight} name='weight' type="number" className='p-1 text-black rounded-xl' placeholder={record.weight} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Reps:</label>
                                <input onChange={(e) => { handleFormData(e) }} value={formData.reps} name='reps' type="number" className='p-1 text-black rounded-xl' placeholder={record.reps.toString()} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Sets :</label>
                                <input onChange={(e) => { handleFormData(e) }} value={formData.sets} name='sets' type="number" className='p-1 text-black rounded-xl' placeholder={record.sets.toString()} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>RPE :</label>
                                <input onChange={(e) => { handleFormData(e) }} value={formData.rpe} name='rpe' type="number" className='p-1 text-black rounded-xl' placeholder={record.sets.toString()} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mt-3 w-full justify-around items-center'>
                            <button type='submit' className='bg-[#DD8233] rounded-xl text-black py-1 px-2 transition hover:scale-110 delay:150'>Submit</button>
                            <p>OR</p>
                            <button onClick={deleteData} className='border border-red-600 rounded-xl text-red-600 py-1 px-2 transition hover:bg-red-600 hover:text-black delay-150'>Delete</button>
                        </div>

                    </div>
                </motion.div>
            </motion.dialog>
        </div>
    )
}

export default EditRecord