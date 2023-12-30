import React, { createContext, useContext } from "react";

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

type formData = {
    weight: string;
    reps: string;
    sets: string;
    rpe: string;
}
type ModalContext ={
    formData: formData
    closeModal: () => void
    handleFormData: (e: React.ChangeEvent<HTMLInputElement>) => void
    setDisplayRecords: React.Dispatch<React.SetStateAction<record[]>>,
    isModalOpen: boolean,
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    records: records,
    record: record,
}
export const ModalContext = createContext<ModalContext | undefined>(undefined)

export const useModalContext = () => {
    const context = useContext(ModalContext)
    if(!context) throw new Error('There was a Context Error')
    return context
}