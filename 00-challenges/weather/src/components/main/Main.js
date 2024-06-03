import React from 'react'
import { CardDay } from './CardDay.js'
import { Loader } from './Loader.js'

const cardDays = [1,2,3,4,5,6,7]
const isLoading = false;

export function Main() {
  return (
    <div className='flex flex-wrap justify-center flex-1 max-w-5xl pt-10 mx-auto basis-2/3'>
      {cardDays.map((item, index) => isLoading ? <Loader key={index}/> : <CardDay key={index}/>)}
    </div>
  )
}
