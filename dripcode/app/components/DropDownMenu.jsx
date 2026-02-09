"use client"
import { useState,useEffect,useRef} from 'react'
import React from 'react'
import Link from 'next/link'
import { IoIosArrowDown } from "react-icons/io";
const DropDownMenu = ({data,category,searchParams,isCategory}) => {
    const [isOpen,setIsOpen]=useState(false)
    const active= isCategory ? category :searchParams.sort || "Relevance"
    const menuRef=useRef()
    function hide(e){
      if(menuRef.current && !menuRef.current.contains(e.target))
        setIsOpen(false)
    }
    useEffect(()=>{
      if(isOpen)document.addEventListener("click",hide)
      return ()=>document.removeEventListener("click",hide)
    },[isOpen])
  return (
    <div className=''>
      <div className='p-2 flex justify-between items-center rounded-md border border-neutral-200/20' onClick={()=>setIsOpen(!isOpen)}>
        <span>{active}</span>
        <IoIosArrowDown />
      </div>
      <div className={`${isOpen ? "block":"hidden"} pt-4 absolute bg-neutral-950 w-full p-2 z-20 rounded-md  flex flex-col`} ref={menuRef}>
        {data.map((name,id)=>(
          <div className="w-full bg-neutral-950 mb-1" key={id}>
            <Link href={isCategory ? `/search/${name}?${searchParams}` :`/search/${category}?sort=${name}` }   className={`${active == name ? "underline decoration-white" : ""} text-neutral-300 mb-2 transition duration-100 hover:underline decoration-white cursor-pointer`}>
                {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DropDownMenu
