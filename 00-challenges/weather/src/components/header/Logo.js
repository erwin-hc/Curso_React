import React from 'react'
import { FaCloudSunRain } from "react-icons/fa6";

export function Logo() {
  return (
    <div className='flex flex-col items-center justify-center gap-3 pt-10'>
      <FaCloudSunRain className='text-8xl fill-blue-200 '/>
      <h4 className='text-center font-bold text-blue-200 text-5xl oxygen-regular'>Simple Weather</h4>  
    </div>
  )
}
