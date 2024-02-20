import React from 'react';
const SignIn = () => {
    return (
        // <div className='bg-cover bg-black text-white md:flex'>
            <div className='flex w-full min-h-screen '>
                    <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-black w-full p-8 text-white'>
                        <div className='flex flex-col space-y-8 justify-between pt-5'>
                            <div>
                                <h1 className='font-bold text-4xl tracking-wide'> GG Users</h1>
                                <h2 className='pt-2 text-white text-xl'>Welcome!</h2>
                                <p className='pt-2 text-white text-sm'>Join for Free.</p>
                                <p className='text-yellow-300 text-sm'>One Genius Account for all Genius Platform</p>
                            </div>
                            <div className='bg-white rounded-3xl shadow-lg p-5 text-gray-600 md:w-80'>
                                <h1 className='font-bold text-black justify-center text-center text-3xl'> Sign In</h1>
                                <form action='' class="flex flex-col space-y-4 p-3">
                                    <div>
                                        <input type="email"
                                        placeholder='Email'
                                        class='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300' />
                                    </div>
                                    <div>
                                        <input type="password"
                                        placeholder='Password'
                                        class='ring-1 ring-gray-300 w-full rounded-md px-4 py-2 mt-2 outline-none focus:ring-2 focus:ring-yellow-300' />
                                    </div>
                                    <p className='text-blue-500 text-sm'>
                                        <a href='' className='text-start'>Mobile Sign In</a>
                                        <a href='' className='text-end'>Forgot Password?</a>
                                    </p>
                                    <button className='inline-block bg-black text-white font-bold rounded-lg px-6 py-2'>Sign In</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        // </div>
    );
};

export default SignIn