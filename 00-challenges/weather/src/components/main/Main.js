import { TbMapOff } from "react-icons/tb";
import { CardDay } from './CardDay.js'
import { useEffect } from "react";

export function Main({weather}) { 
     

const combinedData = weather?.time?.map((date, index) => ({
    date,
    code: weather.weathercode[index],
    maxTemp: weather.temperature_2m_max[index],
    minTemp: weather.temperature_2m_min[index]
}));
    
  return (
    <div className='flex flex-wrap justify-center flex-1 max-w-5xl pt-10 mx-auto basis-2/3'>
      
      {combinedData 
       ? combinedData?.map((item, index) => <CardDay key={index} item={item}/>)
       : <TbMapOff size={125} className='self-center  text-blue-200'/>}
    </div>
  )
}
