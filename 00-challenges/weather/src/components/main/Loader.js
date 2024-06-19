import React from 'react'
import { ImSpinner10 } from "react-icons/im";

export function Loader() {
  return (
    <div className='flex items-center justify-center'>
        <ImSpinner10 size={60} className="loading-icon" />
    </div>
  )
}

