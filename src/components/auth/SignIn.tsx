'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

const SignIn = () => {

    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const emailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        await signIn('email', { email: email, callbackUrl: '/dashboard' })
    }

    const providerSignIn = async (provider: string) => {
        setLoading(true)
        await signIn(provider, { callbackUrl: '/dashboard' })
    }

    const handleError = () => {

        switch (error) {
            case 'OAuthAccountNotLinked':
                return (
                    <div className='flex flex-col'>
                        <p>Sign in with the account you</p>
                        <p>originally signed in with</p>
                    </div>
                )
            case 'OAuthSignin':
            case 'OAuthCallback':
            case 'OAuthCreateAccount':
                return (
                    <div className='flex flex-col'>
                        <p>OAuth Error</p>
                        <p>Please Try again Later</p>
                    </div>
                );
            case 'EmailCreateAccount':
                return (
                    <div className='flex flex-col'>
                        <p>Error signing in with Email</p>
                        <p>Please try again later</p>
                    </div>
                );

            case 'Callback':
                return (
                    <div className='flex flex-col'>
                        <p>Error getting your Credentials - Please try Again</p>
                    </div>
                );

            default:
                return (
                    <div className='flex flex-col'>
                        <p>Error - Please Try Again</p>
                    </div>
                );
        }


    }
    return (
        <div className='bg-black h-screen flex flex-col md:grid md:grid-cols-12'>
            <div className='hidden md:block md:col-span-7 lg:col-span-8' style={{ backgroundImage: 'url(/juice2.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >

            </div>
            <div className='flex px-8 items-center justify-center md:justify-start h-screen md:col-span-5 lg:col-span-4'>
                <div className='flex flex-col items-start justify-center text-white gap-4 text-center md:text-left'>
                    <motion.div className='flex flex-col gap-4'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h3 className='font-bold text-5xl'>Sign In.</h3>
                        <p>Please use an Email or Account to Login.</p>
                    </motion.div>
                    {
                        loading ?
                            <div role="flex flex-col gap-4 items-center justify-center w-full">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#E85817]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            :

                            <div className='flex flex-col gap-4'>
                                <motion.div className='w-full'
                                    initial={{ opacity: 0, x: 200 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <button className='px-4 py-1 flex flex-row items-center justify-center gap-4 bg-white text-black rounded-xl w-full' onClick={() => { providerSignIn('google') }}>
                                        <svg className='col-span-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                                        <span className='col-span-10'>Google</span>
                                    </button>
                                </motion.div>

                                <motion.div className='w-full'
                                    initial={{ opacity: 0, x: 200 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <button className='px-4 py-1 flex flex-row items-center justify-center gap-4 bg-white text-black rounded-xl w-full' onClick={() => { providerSignIn('github') }}>
                                        <Image src={'/github-mark.png'} alt='github' width={48} height={48} />
                                        <span>Github</span>
                                    </button>
                                </motion.div>
                                <motion.div className='w-full'
                                    initial={{ opacity: 0, x: 200 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <form className='flex flex-col w-full gap-2' onSubmit={(e) => { emailSignIn(e) }}>
                                        <div className='flex flex-col'>
                                            <label className='text-center'> Sign in With Email </label>
                                            <input className='text-black px-2 py-2 rounded-xl' type="email" name="signinemail" id="signinemail" value={email} onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} />
                                        </div>


                                        <button className='py-1 px-3 bg-[#F68D31] rounded-xl text-black' type='submit'> Use Email</button>
                                    </form>
                                </motion.div>
                            </div>
                    }

                    {
                        error &&
                        <motion.div className='w-full text-center bg-red-500  px-2 py-4 rounded-xl'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {handleError()}
                        </motion.div>
                    }
                </div>
            </div>

        </div >
    )
}

export default SignIn