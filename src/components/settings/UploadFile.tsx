'use client'
import React from 'react'


const UploadFile = () => {
    const [file, setFile] = React.useState<File | null>(); // Change the initial state type to File | null
    const [errorMsg, setErrorMsg] = React.useState<string | null>(null)
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            setErrorMsg('Please Upload a File')
            return console.error('Please choose a file to upload');
        }

        try {
            const data = new FormData();
            data.append('file', file);
            const res = await fetch('/api/settings/uploadimg', {
                method: 'POST',
                body: data,
                cache: 'no-cache'
            });
            if (!res.ok) {
                const resultString = await res.json();
            
                throw new Error(resultString.error || 'An unknown error occurred');
            }
            window.location.reload();
        } catch (error: any) {
            console.error(error);
            setErrorMsg(error.message);
        }
    };

    return (
        <div className="flex flex-col">
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
        </div>
    );
};

export default UploadFile