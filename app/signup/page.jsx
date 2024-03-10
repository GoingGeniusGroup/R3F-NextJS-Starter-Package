'use client'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { UserLogoIcon } from '@/logo/UserLogo'
import { PasswordLogoIcon } from '@/logo/PasswordLogo'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from "framer-motion"


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
    <main className="flex relative min-h-full flex-col">
        <motion.div 
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: 0.4 }}
            className="signup flex flex-col items-center justify-center rounded-t-3xl sm:h-1/4 lg:h-4/5 p-10 text-white"
        >
            <div className="card flex flex-col items-center justify-center gap-2 lg:w-2/4 h-auto rounded-3xl backdrop-blur-sm shadow-lg shadow-purple-700">
                <div className="card-title m-0 p-2 mb-5 backdrop-blur-3xl border-y-2 rounded-t-3xl shadow-sm bg-[rgba(254,225,255,0.3)]">
                    <h2 className='p-2 text-xl text-center text-purple-900'>Signup</h2>
                </div>
                <form action="#" className='flex flex-col items-center justify-center gap-2 p-3'>
                    <label htmlFor="" className='labels font-semibold text-xl'>Email</label>
                    <div 
                        className="input-group m-2 rounded-md flex"
                    >
                        <div className='input-icon text-black'><UserLogoIcon/></div>
                        <input 
                            type="email" 
                            name="email" 
                            className='p-2 rounded-md text-black'
                            value={email}
                            onChange={({ target }) => setEmail(target?.value)}
                        />
                    </div>

                    <label htmlFor="" className='labels font-semibold text-xl'>Password</label>
                    <div className="input-group m-2 rounded-md flex">
                        <div className='input-icon text-black'><PasswordLogoIcon/></div>
                        <input type="password" name="password" className='p-2 rounded-md text-black'
                            value={password}
                            onChange={({ target }) => setPassword(target?.value)}    
                        />
                    </div>
                    <div className="signup-btn w-full p-5 flex items-center justify-center">
                        <motion.button 
                        whileHover={{scale:1.05}}
                        whileTap = {{scale:0.95}}
                        onClick= {handleSubmit}
                        className='w-full p-3 px-4 bg-gray-200 rounded-2xl text-black'>Signup</motion.button>
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
        </motion.div>
    </main>
    )   
}