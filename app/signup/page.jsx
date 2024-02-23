import Link from 'next/link';
import { LogosGoogleIcon } from '@/logo/LogosGoogleIcon'
import { LogosApple } from '@/logo/LogosApple'
import { LogosFacebook } from '@/logo/LogosFacebook'
    
export default function Page() {
return (
    // These are Tailwind classes:
    <main className="flex min-h-screen flex-col bg-black">
        <div className="welcome flex flex-col h-1/5 mb-10 p-3">
            <h1 className='font-bold text-4xl tracking-wide text-white'> GG Users</h1>
            <h2 className='pt-2 text-white text-xl'>Welcome!</h2>
            <p className='pt-2 text-white text-sm'>Join for Free.</p>
            <p className='text-sm text-white'>One Genius Account for all Genius Platform</p>
        </div>
        <div className="signup flex flex-col items-center justify-center rounded-t-3xl bg-slate-50 h-4/5 p-10">
            <div className="card flex flex-col items-center justify-center gap-2 lg:w-1/4 h-auto rounded-2xl">
                <div className="card-title m-0 rounded-t-2xl p-2 mb-5">
                    <h2 className='pt-2 text-xl text-center'>Signup</h2>
                </div>
                <form action="#" className='flex flex-col items-center justify-center gap-2 p-3'>
                    <label htmlFor="" className='labels'>Email</label>
                    <div className="input-group m-2 rounded-md">
                        <span>@</span>
                        <input type="email" name="email" className='p-2 rounded-md'/>
                    </div>

                    <label htmlFor="" className='labels'>Password</label>
                    <div className="input-group m-2 rounded-md">
                        <span>*</span>
                        <input type="password" name="password" className='p-2 rounded-md'/>
                    </div>
                    <div className="signup-btn w-full p-5 flex items-center justify-center">
                        <button className='w-full p-3 px-4 bg-gray-400 rounded-2xl'>Signup</button>
                    </div>
                </form>

                <div className='flex items-center'>
                    <hr className='border-solid'/>
                    <p className='font-semibold'>or</p>
                    <hr/>
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