
import { options } from '@/app/api/auth/[...nextauth]/options'
import UpdateName from '@/components/settings/UpdateName'
import { Session, getServerSession } from 'next-auth'
import React, { Suspense } from 'react'
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
    if (!session.user) {
        return redirect('/auth/signin')
    }
    console.log(session)
    return (
        <div className='flex flex-col w-full text-white gap-4 items-center md:items-start rounded-xl'>
            <h1 className='text-5xl font-bold underline'>Settings</h1>
            <div className='w-full pr-20 flex flex-col gap-4'>
                <h1 className='underline'>Profile:</h1>
                <div className='flex flex-col md:flex-row justify-between '>
                    <h1 className=''>Edit Display Name: </h1>
                    <UpdateName id={session.user.id} name={session.user.name} email={session.user.email} />
                </div>
                <div className='flex flex-col md:flex-row gap-4 justify-between'>
                    <h1>Profile Picture: </h1>
                    <UploadFile />
                </div>

            </div>

        </div>

    )
}

export default page