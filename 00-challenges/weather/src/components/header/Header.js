import React from 'react'
import { Logo } from './Logo.js'
import { Search } from './Search.js'

export function Header({setWeather}) {
  return (
    <header className='flex flex-col justify-end basis-48'>
      <Logo/>
      <Search setWeather={setWeather}/>      
    </header>
  )
}
