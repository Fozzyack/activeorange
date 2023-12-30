'use client'
import Loader from '@/components/common/Loader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { Fragment } from 'react'

const ProfilePicture = () => {


    const { data: session } = useSession({
        required: true
    })
    const [uploadedImage, setUploadedImage] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    const [imageSrc, setImageSrc] = React.useState('');

    const getProfilePicture = async () => {
        const res = await fetch('/api/settings/img', {
            method: 'GET'
        })
        if (!res.ok) throw new Error('Error getting Data')
        const data = await res.json()
        if (data.uploaded_image) {
            const base64String = Buffer.from(data.image_data.data).toString('base64');
            const imageSrc = `data:${data.image_type};base64,${base64String}`
            setImageSrc(imageSrc)
            setUploadedImage(true)
        } else {
            setUploadedImage(false)
        }
        setLoading(false)
    }

    React.useLayoutEffect(() => {
        getProfilePicture()
    }, []);

    const classnames = 'rounded-full p-1'
    return (
        <Fragment>
            <div className='bg-gradient-to-t from-[#E85817] from-60% to-[#e0bf9a] rounded-full'>
                {
                    loading ?
                        <div className='p-4 flex flex-col items-center gap-4'>
                            <Loader />
                            <span>Getting Image</span>
                        </div>

                        :
                        session?.user?.image || uploadedImage ?
                            uploadedImage ? <Image src={imageSrc} alt='Profile Picture' width={100} height={100} className={classnames} />
                                : <Image src={session?.user?.image as string} alt='Profile Picture' width={100} height={100} className={classnames} />
                            : null
                }
            </div>

        </Fragment>
    )
}

export default ProfilePicture