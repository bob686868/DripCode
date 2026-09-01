import React, { Suspense } from 'react'
import { IoMdClose } from "react-icons/io";
import SearchBar from './SearchBar';
import Link from 'next/link'

const Sidebar = ({setIsSidebarOpen}) => {
  return (
    <div className=' w-screen h-screen  inset-0 z-9999 p-3 bg-neutral-950'>
        <div className='p-3 mb-3 w-fit rounded-md border border-neutral-100/20 text-neutral-100 cursor-pointer' onClick={(e)=>{setIsSidebarOpen(false);e.stopPropagation()}}>
            <IoMdClose></IoMdClose>
        </div>
        <div className='flex flex-1 justify-center mb-4'>
          <Suspense fallback={<div className="h-10 w-full animate-pulse bg-neutral-800 rounded-md" />}>
            <SearchBar setIsSidebarOpen={setIsSidebarOpen}></SearchBar>
          </Suspense>
        </div>
        <div className='flex flex-col text-lg text-neutral-100 gap-y-3' onClick={() => setIsSidebarOpen(false)}>
            <Link href="/search/All" className="w-fit hover:underline decoration-white cursor-pointer">All Products</Link>
            <Link href="/search/Shirts" className="w-fit hover:underline decoration-white cursor-pointer">Shirts</Link>
            <Link href="/search/Hoodies" className="w-fit hover:underline decoration-white cursor-pointer">Hoodies</Link>
            <Link href="/search/Jackets" className="w-fit hover:underline decoration-white cursor-pointer">Jackets</Link>
            <Link href="/search/Electronics" className="w-fit hover:underline decoration-white cursor-pointer">Electronics</Link>
            <Link href="/search/Stickers" className="w-fit hover:underline decoration-white cursor-pointer">Stickers</Link>
            <Link href="/chatbot" className="w-fit flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 cursor-pointer mt-2 pt-2 border-t border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              AI Shopping Assistant
            </Link>
        </div>
    </div>
  )
}

export default Sidebar

