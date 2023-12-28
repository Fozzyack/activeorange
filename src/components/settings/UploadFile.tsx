'use client'
import React from 'react'


const UploadFile = () => {
    const [file, setFile] = React.useState<File | null>(); // Change the initial state type to File | null
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
                        className="bg-black p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center"
                    >
                        <h1 className="text-2xl font-bold mb-4">Change Profile Picture</h1>

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

                        {file && (
                            <div className="mt-4">
                                <p className="text-[#737579]">Selected File: {file.name}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="mt-4 bg-orange-500 hover:bg-orange-700 transition ease-in-out duration-150 text-white py-2 px-4 rounded-lg"
                        >
                            Upload
                        </button>
                        {errorMsg &&
                            <div className='flex w-full justify-center mt-4'>
                                <span className='p-3 flex items-center justify-center text-center text-white bg-red-600 rounded-xl'> {errorMsg} </span>
                            </div>
                        }
                    </form>
                    : loading === 'loading' ?

                        <div className='bg-black p-10 rounded-xl'>
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div> :
                        <div className='bg-black p-10 rounded-xl'>
                            <p>Success! Reloading Page ...</p>
                        </div>

            }

        </div>
    );
};

export default UploadFile