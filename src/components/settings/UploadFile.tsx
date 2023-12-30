'use client'
import React from 'react'
import Loader from '../common/Loader';


const UploadFile = () => {
    const [file, setFile] = React.useState<File | null>();
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
    const [loading, setLoading] = React.useState('noupload')
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setErrorMsg('Please Upload a File')
            return console.error('Please choose a file to upload');
        }

        try {
            const data = new FormData();
            data.append('file', file);
            setLoading('loading')
            const res = await fetch('/api/settings/img', {
                method: 'POST',
                body: data,
                cache: 'no-cache'
            });
            if (!res.ok) {
                const resultString = await res.json();
                setLoading('noupload')
                throw new Error(resultString.error || 'An unknown error occurred');
            }
            setLoading('success')
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="flex flex-col">

            {
                loading === 'noupload' ?
                    <form
                        onSubmit={onSubmit}
                        className="bg-black p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4 justify-center items-center text-center"
                    >
                        <label className="cursor-pointer bg-orange-500 hover:bg-orange-700 transition ease-in-out duration-150 text-white py-2 px-4 rounded-lg">
                            <span>Select File</span>
                            <input
                                type="file"
                                name="file"
                                className="hidden"
                                onChange={(e) => {
                                    setFile(e.target.files?.[0]);
                                }}
                            />
                        </label>

                        {
                            file ? (
                                <div className="">
                                    <p className="text-[#737579]">{file.name}</p>
                                </div>
                            ) :
                                <div className="">
                                    <p className="text-[#737579]">No File Selected</p>
                                </div>
                        }

                        <button
                            type="submit"
                            className=" bg-orange-500 hover:bg-orange-700 transition ease-in-out duration-150 text-white py-2 px-4 rounded-lg"
                        >
                            Change Picture
                        </button>
                        {
                            errorMsg &&
                            <div className='flex w-full justify-center'>
                                <span className='p-3 flex items-center justify-center text-center text-white bg-red-600 rounded-xl'> {errorMsg} </span>
                            </div>
                        }
                    </form>

                    : loading === 'loading' ?

                        <div className='bg-black p-10 rounded-xl'>
                            <Loader />
                        </div> :
                        <div className='bg-black p-10 rounded-xl'>
                            <p>Success! Reloading Page ...</p>
                        </div>

            }

        </div>
    );
};

export default UploadFile