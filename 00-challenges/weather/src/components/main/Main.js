import { useEffect, useState } from "react";
import { ForecastDays } from './ForecastDays.js'
import { Today } from "./Today.js";

export function Main({weather, localName, isDay}) { 
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
        <Today current={current} localName={localName} isDay={isDay}/>
      }      
      {
      dailyForecast 
       ? dailyForecast?.map((item, index) => <ForecastDays key={index} item={item} isToday={index===0}/>)
       : <i className="wi wi-cloud-refresh self-center text-9xl"></i>     
      }

    </div>
   
  )
}
