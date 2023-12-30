import {useModalContext } from '@/context/ModalContext'
import React, { Fragment } from 'react'

const DeleteData = () => {
    const context = useModalContext()
    const deleteData = async () => {
        fetch(`/api/weights/record/delete/${context.record.id}`, {
            method: 'DELETE'
        }).then((response) => {
            if (!response.ok) {
                throw new Error('There was an Error Deleting Data')
            } else {
                
                context.setDisplayRecords(prev => {
                    console.log(prev)
                    return prev.filter(prev_record => prev_record.id !== context.record.id)
                    
                })
                context.records.data = context.records.data.filter(prev_record => prev_record.id !== context.record.id)
                context.setIsModalOpen(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }
  return (
    
    <Fragment>
        <button onClick={deleteData} className='border border-red-600 rounded-xl text-red-600 py-1 px-2 transition hover:bg-red-600 hover:text-black delay-150'>Delete</button>
    </Fragment>
  )
}

export default DeleteData