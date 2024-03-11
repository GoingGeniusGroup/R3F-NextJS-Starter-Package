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
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'


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
    <main className="flex relative min-h-full flex-col items-center justify-around md:flex-row">
        <motion.div 
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: 0.3 }}
            className='items-center justify-center hidden sm:flex pl-10'
        >
            <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl py-0 px-10'>
                <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                <div className='flex'>
                    <CardItem className='mt-4 w-full'>
                    <Image
                        src='/aa.png'
                        height='1000'
                        width='1000'
                        className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                        alt='thumbnail'
                    />
                    </CardItem>
                    <div className='flex flex-col'>
                    <CardItem translateZ='50' className='text-2xl font-bold text-neutral-600 dark:text-white'>
                        Genius Card
                    </CardItem>
                    <CardItem
                        as='p'
                        translateZ='60'
                        className='mt-2 max-w-sm text-lg text-[#39ff14] dark:text-[#39ff14]'
                    >
                        Coming Soon!
                    </CardItem>
                    <div className='mt-20 flex items-center justify-between'></div>
                    </div>
                </div>
                </CardBody>
            </CardContainer>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .5, delay: 0.4 }}
            className="signup flex flex-col items-center justify-center rounded-t-3xl sm:h-1/4 md:h-2/4py py-10 text-white flex-1"
        >
            <div className="card flex flex-col items-center justify-center gap-2 lg:w-3/5 h-auto rounded-3xl backdrop-blur-sm shadow-lg shadow-purple-700">
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