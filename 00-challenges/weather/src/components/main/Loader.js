import React from 'react'
import { ImSpinner10 } from "react-icons/im";

export function Loader() {
  return (
    <div className='w-[200px] sm:w-32 h-48 m-2  rounded-xl bg-blue-300/20 shadow-2xl flex items-center justify-center'>
        <ImSpinner10 size={60} className="loading-icon" />
    </div>
  )
}

