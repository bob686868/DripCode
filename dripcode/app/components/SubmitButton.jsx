import React from 'react'
import { useFormStatus } from 'react-dom'
import { FaPlus } from "react-icons/fa6";

const SubmitButton = ({text="Add to Cart",loadingText="Adding ...",isDisabled=false}) => {
      const {pending:isAdding}=useFormStatus()
    
  return (
    <div>
      <button type="submit" disabled={isAdding || isDisabled} onClick={()=>window.dispatchEvent(new Event("cart-updated"))}className={`w-full text-neutral-100 rounded-full flex flex-1 justify-between items-center bg-blue-600 hover:brightness-115 disabled:hover:brightness-100 py-3 px-4 text-center ${(isAdding||isDisabled) ? "bg-neutral-800 cursor-default" : "cursor-pointer"}`}>
          <FaPlus className="size-4" />
          <span>{isAdding ? loadingText :text}</span>
          <span></span>
        </button>
    </div>
  )
}

export default SubmitButton
