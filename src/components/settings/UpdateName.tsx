'use client'
import React from 'react'
const UpdateName = ({ id, name }: { id: string | null | undefined, name: string | null | undefined }) => {
    if (!name) {
        return (
            <div>Error</div>
        )
    }

    async function updateName(formData: FormData) {
        
        const res = await fetch('/api/settings/changeusername', {
            method: 'POST',
            body: JSON.stringify({name: formData.get('name')}),
            headers: {
                'Content-Type' : 'application/json',
            },
            cache: 'no-cache'
        });
        if (!res.ok) {
            throw new Error('There was an Error');
        }
    
        console.log(await res.json());
    }
    return (
        <div className='flex'>
            <form className='flex flex-col' action={updateName}>
                <label> Name: </label>
                <input name='name' placeholder={name} type="text" className='text-black'/>
                <button className='px-2 py-1 bg-orange-600'>Change Name</button>
            </form>
        </div>
    )
}

export default UpdateName