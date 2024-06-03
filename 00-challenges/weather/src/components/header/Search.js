import React, { useEffect, useState } from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import useGeolocation from '../../hooks/useGeolocation'

export function Search() {
  const [query, setQuery] = useState("")
  const { lat, lng, getPosition, getCity, cityName , stateName } = useGeolocation();
  const localName = cityName || stateName ? `${cityName}, ${stateName}` : ""
  
  useEffect(()=>{
    
  },[])

  return (
    <div className='flex items-center justify-center w-full max-w-5xl mx-auto mt-8'>
      <div className='relative w-full h-10'>
      <input value={query} onChange={(e)=> setQuery(e.target.value)} placeholder='Search...' className='w-full h-10 text-white border-none rounded-full outline-none pl-14 bg-blue-300/20 oxygen-bold'></input>
      <MdOutlineMyLocation onClick={() => {
        getPosition()
        getCity()
        setQuery(localName)
        console.log(lat)
        console.log(lng)
        }} className='absolute text-3xl text-white cursor-pointer top-1 left-3 opacity-30 hover:opacity-70'/>
      </div>
    </div>
  )
}


