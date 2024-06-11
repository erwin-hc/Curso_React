import { useEffect, useState } from "react";
import { TbMapOff } from "react-icons/tb";
import { ForecastDays } from './ForecastDays.js'
import { Today } from "./Today.js";

export function Main({weather, localName}) { 
const [forecast, setForecast] = useState({})

useEffect(()=>{
  setForecast(weather)
},[weather])


const dailyForecast = forecast?.daily?.time?.map((time,index) => (
  {
    time,
    code: forecast.daily.weathercode[index],
    maxTemp: forecast.daily.temperature_2m_max[index],
    minTemp: forecast.daily.temperature_2m_min[index]
  }
))

const current = forecast?.current
    
  return (

  <div className='flex flex-wrap justify-center max-w-5xl mx-auto flex-auto'>
      {
        dailyForecast &&
        <Today current={current} localName={localName}/>
      }
      
      {
      dailyForecast 
       ? dailyForecast?.map((item, index) => <ForecastDays key={index} item={item}/>)
       : <i className="wi wi-cloud-refresh self-center text-9xl text-blue-400"></i>
      //  <TbMapOff size={125} className='self-center  text-blue-400'/>
      }

  </div>  
  )
}
