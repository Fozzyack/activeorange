import { pool } from '@/utils/db'
import React from 'react'
import Button from './Button'
const UpdateName = ({ id, name }: { id: string | null | undefined, name: string | null | undefined }) => {
    if (!name) {
        return (
            <div>Error</div>
        )
    }
    async function updateName(formData: FormData) {
        'use server'
        const name = formData.get('name')
        if (!name) {
            throw new Error('Name must have not be empty')
        }

        else if (name?.toString().length > 22) {
            throw new Error('Name too long')
        }
        const sql = `UPDATE users SET name=$1 WHERE id=$2`
        await pool.query(sql, [name, id])

    }

    return (
        <div className='flex items-center justify-center  text-center md:text-left md:justify-start'>
            <form className='flex flex-col' action={updateName}>
                <label> Update Name: </label>
                <input name='name' placeholder={name} type="text" className='text-black px-1 py-2 rounded-t-xl' />
                <Button />
            </form>
        </div>
    )
}

export default UpdateName