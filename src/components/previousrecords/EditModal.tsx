import React, { FormEvent, Fragment } from 'react'
import { motion } from 'framer-motion'
import { useModalContext } from '@/context/ModalContext'
import DeleteData from './DeleteData'
const EditModal = () => {
    const context = useModalContext()

    const submitChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        if(context.formData.weight == '' || context.formData.sets == '' || context.formData.reps == '' || context.formData.rpe == '') throw new Error("Please fill out Form")
        formData.append("weights", context.formData.weight)
        formData.append("sets", context.formData.sets)
        formData.append("reps", context.formData.reps)
        formData.append("rpe", context.formData.rpe)
        formData.append("id", context.record.id.toString())
        const res = await fetch('/api/weights/record/updaterecord', {
            method: 'POST',
            body: formData
        })
        if (!res.ok) throw new Error('There was an Error Updating Data')

    }
    return (
        <Fragment>
            <motion.dialog id={`modal-${context.record.id}`} className=" bg-[#1E2229] text-white shadow-2xl modal fixed z-20 p-8 m-5 rounded-xl top-[25%] left-[100vw/2] md:left-[50%]" open={context.isModalOpen}
                animate={context.isModalOpen ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8 }}
            >
                <motion.div
                    animate={context.isModalOpen ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.6 }}
                    className='flex flex-col'
                >
                    <form method="dialog">
                        <button
                            className="absolute right-2 top-2"
                            onClick={context.closeModal}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg ">{context.record.name}</h3>
                    <form className='flex flex-col gap-4' onSubmit={(e) => submitChanges(e)}>
                        <div className='flex flex-wrap gap-4'>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Weight:</label>
                                <input onChange={(e) => { context.handleFormData(e) }} value={context.formData.weight} name='weight' type="number" className='p-1 text-black rounded-xl' placeholder={context.record.weight} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Reps:</label>
                                <input onChange={(e) => { context.handleFormData(e) }} value={context.formData.reps} name='reps' type="number" className='p-1 text-black rounded-xl' placeholder={context.record.reps.toString()} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>Sets :</label>
                                <input onChange={(e) => { context.handleFormData(e) }} value={context.formData.sets} name='sets' type="number" className='p-1 text-black rounded-xl' placeholder={context.record.sets.toString()} />
                            </div>
                            <div className='flex flex-col max-w-[80px]'>
                                <label>RPE :</label>
                                <input onChange={(e) => { context.handleFormData(e) }} value={context.formData.rpe} name='rpe' type="number" className='p-1 text-black rounded-xl' placeholder={context.record.sets.toString()} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 mt-3 w-full justify-around items-center'>
                            <button type='submit' className='bg-[#DD8233] rounded-xl text-black py-1 px-2 transition hover:scale-110 delay:150'>Submit</button>
                            <p>OR</p>
                            <DeleteData />
                        </div>

                    </form>
                </motion.div>
            </motion.dialog>
        </Fragment>
    )
}

export default EditModal