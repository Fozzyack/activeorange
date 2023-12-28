
import { options } from '@/app/api/auth/[...nextauth]/options'
import UpdateName from '@/components/settings/UpdateName'
import { Session, getServerSession } from 'next-auth'
import React from 'react'
import { redirect } from 'next/navigation'
import UploadFile from '@/components/settings/UploadFile'

interface ExtendedUserSession extends Session {
    user?: {
        id?: string | null,
        name?: string | null | undefined,
        image?: string | null | undefined,
        email?: string | null | undefined
    } | undefined
}

const page = async () => {
    const session = await getServerSession(options) as ExtendedUserSession
    if(!session.user) {
        return redirect('/auth/signin')
    }
    console.log(session)
    return (
        <div className='flex flex-col w-full text-white gap-4 items-center md:items-start'>
            <h1 className='text-5xl font-bold underline'>Settings</h1>
            <UpdateName id={session.user.id} name={session.user.name} email={session.user.email}/>
            <UploadFile />
        </div>

    )
}

export default page