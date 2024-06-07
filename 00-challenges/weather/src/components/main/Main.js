import { TbMapOff } from "react-icons/tb";
import { CardDay } from './CardDay.js'
import { useEffect } from "react";

export function Main({weather}) { 
    
  
  useEffect(()=>{    
    console.log(weather)
    // setForecast(weather)       
  }, [weather])
    
  return (
    <div className='flex flex-wrap justify-center flex-1 max-w-5xl pt-10 mx-auto basis-2/3'>
      
      {weather?.time  
       ? weather?.time?.map((item, index) => <CardDay key={index}/>)
       : <TbMapOff size={125} className='self-center  text-blue-200'/>}
    </div>
  )
}
