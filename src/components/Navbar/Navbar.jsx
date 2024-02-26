'use client'

import Link from "next/link";

const Navbar = () => {
    return (
        <div className="container mx-auto flex items-center justify-center border-b-2 px-6 py-2 h-20 sticky top-0 backdrop-blur-2xl shadow-md rounded-2xl">
            <Link href="" className="flex relative items-center justify-center p-1 mx-4">
                <img src="/aa.png" className="rounded-full h-20 p-2"></img>
            </Link>

            <div className="grow">
                <div className="flex items-center justify-center gap-2 md:gap-8">
                    <Link href="#" className="hover:border-b-2 hover:text-sky-600 py-5">Link1</Link>
                    <Link href="#" className="hover:border-b-2 hover:text-sky-600 py-5">Link2</Link>
                    <Link href="#" className="hover:border-b-2 hover:text-sky-600 py-5">Link3</Link>
                </div>
            </div>
            <div className="relative group flex items-center justify-center">
                <span className="px-2 font-medium text-lg">John Doe</span>
                <button type="button" className="flex items-center justify-end focus:outline-none z-10 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 rounded-full" id="user-menu-button">
                    <img src="/aa.png" alt="" className="h-10 rounded-full p-1" />
                </button>   

                <div class="absolute hidden group-hover:block transition-all right-0 top-7 -z-10 mt-2 w-48 origin-top-right rounded-2xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300" role="menuitem" id="profile">Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300" role="menuitem" id="sign-out">Sign out</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;