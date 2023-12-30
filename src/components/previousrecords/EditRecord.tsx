'use client'
import React from 'react'
import { ModalContext } from '@/context/ModalContext'
import EditModal from './EditModal'

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
        weight: record.weight,
        reps: record.reps.toString(),
        sets: record.sets.toString(),
        rpe: record.sets.toString()
    })


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            weight: record.weight,
            reps: record.reps.toString(),
            sets: record.sets.toString(),
            rpe: record.sets.toString()
        })
    };

    const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }




    return (
        <ModalContext.Provider value={{ formData, closeModal, handleFormData, setDisplayRecords, isModalOpen, setIsModalOpen, records, record }}>
            <div>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={closeModal}></div>
                )}

                <button className="p-3 bg-[#DD8233] rounded-xl w-[100px]" onClick={openModal}>
                    Edit
                </button>
                <EditModal />
            </div>
        </ModalContext.Provider>
    )
}

export default EditRecord