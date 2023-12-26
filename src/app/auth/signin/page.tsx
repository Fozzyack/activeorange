'use client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
type ErrorMsg = string | null | undefined

const page = () => {

    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const [email, setEmail] = React.useState('')
    const emailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn('email', { email: email, callbackUrl: '/dashboard' })
    }

    const providerSignIn = async (provider: string) => {
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
                        <p>Error in Callback - Please try Again</p>
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
        <div className='bg-[#161A23] h-screen flex flex-col md:grid md:grid-cols-2'>
            <div className='hidden md:block' style={{ backgroundImage: 'url(/juice2.png)', backgroundSize: 'cover' }}>

            </div>
            <div className='flex px-8 items-center justify-center md:justify-start h-screen'>
                <div className='flex flex-col items-start justify-center text-white gap-4 text-center md:text-left'>
                    <motion.div className='flex flex-col gap-4'
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                    >
                        <h3 className='font-bold text-5xl'>Sign In.</h3>
                        <p>Please use an Email or Account to Login.</p>
                    </motion.div>

                    <motion.div className='w-full'
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{scale: 1.1}}
                    >
                        <button className='px-4 py-1 flex flex-row items-center justify-center gap-4 bg-white text-black rounded-xl w-full' onClick={() => { providerSignIn('google') }}>
                            <svg className='col-span-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
                            <span className='col-span-10'>Google</span>
                        </button>
                    </motion.div>

                    <motion.div className='w-full'
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{scale: 1.1}}
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
                    {
                        error &&
                        <motion.div className='w-full text-center bg-red-500  px-2 py-4 rounded-xl'
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            {handleError()}
                        </motion.div>
                    }
                </div>
            </div>

        </div >
    )
}

export default page