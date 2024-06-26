import React from 'react'
import { Logo } from './Logo.js'
import { Search } from './Search.js'

export function Header({setWeather, setLocalName, seTisDay, setWcode }) {
  return (
    <header className='flex flex-col mt-5 items-start'>
      <Logo/>
      <Search setWeather={setWeather} setLocalName={setLocalName} seTisDay={seTisDay} setWcode={setWcode}/>      
    </header>
  )
}
