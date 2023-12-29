import { pool } from '@/utils/db'
import React from 'react'
const UpdateName = ({ id, name, email }: { id: string | null | undefined, name: string | null | undefined , email: string | null | undefined}) => {
    if (!name && !email) {
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
                <input name='name' placeholder={name ? name : email ? email : 'example@email.com'} type="text" className='text-black px-1 py-2 rounded-t-xl' />
                <button type='submit' className='px-2 py-1 bg-orange-600 rounded-b-xl'>Update</button>
            </form>
        </div>
    )
}

export default UpdateName