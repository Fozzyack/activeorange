'use client'
import React from 'react'

const UploadFile = () => {
    const [file, setFile] = React.useState<File>()
    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
        try {
            const data = new FormData()
            data.set('file', file)
            const res = await fetch('/api/settings/uploadimg', {
                method: 'POST',
                body: data
            })
            if (!res.ok) throw new Error(await res.text())
        } catch (error : any) {
            console.error(error)

        }
    }
    return (
        <div>
            <form onSubmit={onSubmit} className='flex flex-col p-8 bg-black rounded-xl items-center gap-4'>
                <label >Image Upload</label>
                <input type="file" name='file' onChange={(e) => { setFile(e.target.files?.[0]) }} />
                <button className='p-3 rounded-xl bg-indigo-500'>Upload</button>
            </form>
        </div>
    )
}

export default UploadFile