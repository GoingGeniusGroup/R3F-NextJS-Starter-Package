'use client'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import styles from './signin.module.css'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { useUser } from '@/context/UserContext/UserContext'

const { log } = console
const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useUser()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submit = {
      email,
      password,
    }
    log('Submit: ', submit)

    try {
      const { data } = await axios({
        url: '/api/signin',
        method: 'POST',
        data: submit,
      })
      log('Response:', data)
      const token = data.token
      if (token) {
        const decoded = jwtDecode(token)
        const { data: userData } = await axios.get(`/api/users/${decoded.id}`)
        setUser(userData)
        router.push('/createavatar')
      }
    } catch (error) {
      log('Error: ', error)
    }
  }
  return (
    <div>
      <div className='flex w-full min-h-screen'>
        <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-black min-h-screen w-full pl-28 pt-5 text-white'>
          <div className='flex flex-col space-y-8 justify-between pt-5'>
            <div>
              <h1 className='font-bold text-4xl tracking-wide'> GG Users</h1>
              <h2 className='pt-2 text-white text-xl'>Welcome!</h2>
              <p className='pt-2 text-white text-sm'>Join for Free.</p>
              <p className='text-yellow-300 text-sm'>One Genius Account for all Genius Platform</p>
            </div>
            <div>
              <CardContainer className='hover:shadow-3xl dark:border-none dark:hover:border-none dark:hover:shadow-3xl py-0'>
                <CardBody className='group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-3xl dark:hover:shadow-emerald-500/[0.1]'>
                  <div className='flex'>
                    <CardItem className='mt-4 w-full'>
                      <Image
                        src='/aa.png'
                        height='1000'
                        width='1000'
                        className='size-full rounded-xl object-cover group-hover/card:shadow-xl'
                        alt='thumbnail'
                        priority={true}
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
            </div>

            <div className={styles.container}>
              <div className='bg-white rounded-3xl shadow-lg p-5 text-gray-600 '>
                <h1 className='font-bold text-black justify-center text-center text-3xl'> Sign In</h1>
                <form action='' className='flex flex-col space-y-4 p-3'>
                  <div>
                    <input
                      type='email'
                      placeholder='Email'
                      value={email}
                      onChange={({ target }) => setEmail(target?.value)}
                      className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                    />
                  </div>
                  <div>
                    <input
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={({ target }) => setPassword(target?.value)}
                      className='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300'
                    />
                  </div>
                  <div className=''>
                    <p className='text-blue-500 text-sm flex justify-between'>
                      <a href='' className='text-start' style={{ marginRight: '2.75rem' }}>
                        Mobile Sign In
                      </a>
                      <a href='' className='text-end'>
                        Forgot Password?
                      </a>
                    </p>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className='inline-block bg-black text-white font-bold rounded-lg px-6 py-2 hover:scale-110 transition duration-500 cursor-pointer'
                  >
                    Sign In
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <hr style={{ flex: '1', border: 'none', borderBottom: '0.5px solid black' }} />
                    <p style={{ margin: '0 5px' }}>or</p>
                    <hr style={{ flex: '1', border: 'none', borderBottom: '0.5px solid black' }} />
                  </div>

                  <div className='flex space-x-11 justify-center'>
                    <div className='justify-center p-5 flex hover:scale-125 transition duration-500 cursor-pointer'>
                      <a href=''>
                        <LogosGoogleIcon style={{ fontSize: '24px' }} />
                      </a>
                    </div>
                    <div className='justify-center p-5 flex hover:scale-125 transition duration-500 cursor-pointer'>
                      <a href=''>
                        <LogosApple style={{ fontSize: '24px' }} />
                      </a>
                    </div>
                    <div className='justify-center p-5 flex hover:scale-125 transition duration-500 cursor-pointer'>
                      <a href=''>
                        <LogosFacebook style={{ fontSize: '24px' }} />
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn
