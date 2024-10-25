import React from 'react';

export default function Header() {
  return (
    <header className='flex items-center justify-between py-2 md:py-2 px-4 md:px-8 bg-slate-300 shadow-md'>
        <h1 className='uppercase font-medium md:font-bold text-base md:text-xl'>viprops</h1>
        <form className='bg-slate-100 py-1 md:py-2 px-2 md:px-4 rounded-lg w-32 md:w-80 text-sm md:text-base'>
            <input type="text" placeholder='Search...' className='w-full bg-transparent outline-none' />
        </form>
        <ul className='flex md:space-x-12 md:font-medium items-center'>
            <li className='hidden md:inline text-slate-600 hover:cursor-pointer hover:text-slate-900'>Home</li>
            <li className='hidden md:inline text-slate-600 hover:cursor-pointer hover:text-slate-900'>About</li>
            <li className='inline text-slate-600 hover:cursor-pointer hover:text-slate-900'>Sign In</li>
        </ul>
    </header>
  )
}