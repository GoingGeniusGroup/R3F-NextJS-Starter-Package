'use client'
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext/UserContext'
import { motion } from 'framer-motion'
import { UserLogoIcon } from '@/logo/UserLogo'
import { PasswordLogoIcon } from '@/logo/PasswordLogo'

const { log } = console
const SignIn = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateUser } = useUser()

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
        sessionStorage.setItem('token', token) // Store token in sessionStorage
        updateUser(token)
        router.push('/createavatar')
      }
    } catch (error) {
      log('Error: ', error)
    }
  }
  return (
    <>
      <main className='flex relative min-h-full flex-col'>
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='signin flex flex-col items-center rounded-t-3xl sm:h-1/4 lg:h-4/5 p-10 text-white'
        >
          <div className='card flex flex-col items-center justify-center gap-2 lg:w-2/4 h-auto rounded-3xl backdrop-blur-sm shadow-lg shadow-purple-700'>
            <div className='card-title m-0 p-2 mb-5 backdrop-blur-3xl border-y-2 rounded-t-3xl shadow-sm bg-[rgba(254,225,255,0.3)]'>
              <h2 className='p-2 text-xl text-center text-purple-900'>Signin</h2>
            </div>
            <form action='#' className='flex flex-col items-center justify-center gap-2 p-3'>
              <label htmlFor='' className='labels font-semibold text-xl '>
                Email
              </label>
              <div className='input-group m-2 rounded-md flex '>
                <div className='input-icon text-black'>
                  <UserLogoIcon />
                </div>
                <input
                  type='email'
                  name='email'
                  className='p-2 rounded-md text-black '
                  value={email}
                  placeholder='Email'
                  onChange={({ target }) => setEmail(target?.value)}
                />
              </div>

              <label htmlFor='' className='labels font-semibold text-xl'>
                Password
              </label>
              <div className='input-group m-2 rounded-md flex'>
                <div className='input-icon text-black'>
                  <PasswordLogoIcon />
                </div>
                <input
                  type='password'
                  name='password'
                  className='p-2 rounded-md text-black'
                  placeholder='Password'
                  value={password}
                  onChange={({ target }) => setPassword(target?.value)}
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

              <div className='signup-btn w-full p-5 flex items-center justify-center'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className='w-full p-3 px-4 bg-purple-200 rounded-2xl text-black'
                >
                  Signin
                </motion.button>
              </div>
            </form>

            <div className='flex items-end'>
              <hr className='border-solid h-1 text-black w-full' />
              <p className='font-semibold px-5'>or</p>
              <hr className='h-px' />
            </div>
            <div className='flex justify-center gap-16 p-5'>
              <a href=''>
                <LogosGoogleIcon className='logos text-2xl' />
              </a>
              <a href=''>
                <LogosApple className='logos text-2xl' />
              </a>
              <a href=''>
                <LogosFacebook className='logos text-2xl' />
              </a>
            </div>
            <div className='flex items-center justify-center m-5 '>
              <p className=' text-sm'>
                Not a Genius User yet?
                <a href='/signup' className='text-blue-500 ml-1'> 
                  Sign Up Now
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}
export default SignIn