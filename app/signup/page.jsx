'use client'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { UserLogoIcon } from '@/logo/UserLogo'
import { PasswordLogoIcon } from '@/logo/PasswordLogo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'


const { log } = console
export default function Page() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        const submit = {
            email,
            password,
        }

        log('Submit: ', submit)

        try {
        const { data } = await axios({
            url: '/api/users',
            method: 'POST',
            data: submit,
        })
        log('Response:', data)
        if (data != null){
            router.push('/signin')
        }
        } catch (error) {
            log('Error: ', error)
        }
    }

return (
    <main className="flex min-h-screen flex-col bg-black">
        <div className="welcome flex flex-col h-1/5 mb-10 p-3">
            <h1 className='font-bold text-4xl tracking-wide text-white'> GG Users</h1>
            <h2 className='pt-2 text-white text-xl'>Welcome!</h2>
            <p className='pt-2 text-white text-sm'>Join for Free.</p>
            <p className='text-sm text-white'>One Genius Account for all Genius Platform</p>
        </div>
        <div className="signup flex flex-col items-center justify-center rounded-t-3xl bg-slate-50 sm:h-1/4 lg:h-4/5 p-10">
            <div className="card flex flex-col items-center justify-center gap-2 lg:w-2/4 h-auto rounded-2xl">
                <div className="card-title m-0 rounded-t-2xl p-2 mb-5">
                    <h2 className='p-2 text-xl text-center'>Signup</h2>
                </div>
                <form action="#" className='flex flex-col items-center justify-center gap-2 p-3'>
                    <label htmlFor="" className='labels'>Email</label>
                    <div className="input-group m-2 rounded-md flex ">
                        <div className='input-icon'><UserLogoIcon/></div>
                        <input type="email" name="email" className='p-2 rounded-md'
                            value={email}
                            onChange={({ target }) => setEmail(target?.value)}
                        />
                    </div>

                    <label htmlFor="" className='labels'>Password</label>
                    <div className="input-group m-2 rounded-md flex">
                        <div className='input-icon'><PasswordLogoIcon/></div>
                        <input type="password" name="password" className='p-2 rounded-md'
                            value={password}
                            onChange={({ target }) => setPassword(target?.value)}    
                        />
                    </div>
                    <div className="signup-btn w-full p-5 flex items-center justify-center">
                        <button 
                        onClick={handleSubmit}
                        className='w-full p-3 px-4 bg-gray-200 rounded-2xl'>Signup</button>
                    </div>
                </form>

                <div className='flex items-end'>
                    <hr className='border-solid h-1 text-black w-full' />
                    <p className='font-semibold px-5'>or</p>
                    <hr className='h-px'/>
                </div>
                <div className='flex justify-center gap-16 p-5'>
                    <a href=''>
                        <LogosGoogleIcon className="logos text-2xl"/>
                    </a>
                    <a href=''>
                        <LogosApple className="logos text-2xl"/>
                    </a>
                    <a href=''>
                        <LogosFacebook className="logos text-2xl"/>
                    </a>
                </div>
            </div>
        </div>
    </main>
    )   
}