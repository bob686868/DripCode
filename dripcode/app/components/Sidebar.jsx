import React from 'react'
import { IoMdClose } from "react-icons/io";
import SearchBar from './SearchBar';
import Link from 'next/link'

const Sidebar = ({setIsSidebarOpen}) => {
 
  return (
    <div className=' w-screen h-screen  inset-0 z-9999 p-3 bg-neutral-950'>
        <div className='p-3 mb-3 w-fit rounded-md border border-neutral-100/20 text-neutral-100 cursor-pointer' onClick={(e)=>{setIsOpen(false);e.stopPropagation()}}>
            <IoMdClose></IoMdClose>
        </div>
        <div className='flex flex-1 justify-center mb-4'>
            <SearchBar setIsSidebarOpen={setIsSidebarOpen}></SearchBar>
        </div>
        <div className='flex flex-col text-lg text-neutral-100 gap-y-3'>
            <Link href="/search/All" className="w-fit hover:underline decoration-white cursor-pointer">All</Link>
            <Link href="/search/Shirts" className="w-fit hover:underline decoration-white cursor-pointer">Shirts</Link>
            <Link href="/search/Stickers" className="w-fit hover:underline decoration-white cursor-pointer">Stickers</Link>
        </div>
    </div>
  )
}

export default Sidebar
