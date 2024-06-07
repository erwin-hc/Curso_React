import React, {  useEffect, useState } from 'react'
import { City } from "country-state-city";
import { MdOutlineMyLocation } from "react-icons/md";

import { useGeolocation } from '../../hooks/useGeolocation'

export function Search({ setWeather }) {
  const [pos, setPos] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions ] = useState([]);
    
  const {
    position : { lat, lng },
    cityStateName : {city, state},
    isLoading,
    getPosition,
    error,
    forecast
  } = useGeolocation();
 
  const possibleValues = City.getAllCities().map((c) => {
    const {name, stateCode} = c
    return `${name}, ${stateCode}`
  });

  function handleClick() {
    setSuggestions([])
    getPosition()    
    setQuery(city || state ? `${city}, ${state}` : "")
    if (error) setQuery(error)
    setPos([])  
  
  }

  // async function fetchWeather(lat,lng) {    
  //   const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min`
  //   const res = await fetch(URL)
  //   const data = await res.json()
  //   console.log(lat)
  //   console.log(data)
  // }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 3) {
      const filteredSuggestions = possibleValues
        .filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setWeather({})
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
  };
  
  useEffect(()=>{
    setQuery(city || state ? `${city}, ${state}` : "")
    if (error) setQuery(error)   
    setWeather(forecast.daily)  
  },[city, state, error, forecast, setWeather])

  useEffect(()=>{
    const callback = () => setSuggestions([])    
    document.addEventListener("click", callback)
    return () => document.removeEventListener("click", callback)
  },[])
 
  return (
    <div className='flex items-center justify-center w-full max-w-5xl mx-auto mt-8'>
      <div className='relative w-full h-10'>
      <input value={isLoading ? "Loading ..." : query}
      onChange={handleInputChange}
      placeholder='Search...' 
      className='text-ellipsis text-lg w-full h-10 text-blue-100 border-none rounded-full outline-none pl-14 pr-7 bg-blue-300/20 oxygen-bold'></input>
      <MdOutlineMyLocation onClick={handleClick}
      className='absolute text-3xl text-blue-100 cursor-pointer top-1 left-3 opacity-30 hover:opacity-70'/>
      { suggestions.length > 0 &&
          <div className='absolute w-full rounded-2xl  bg-slate-800 top-12 left-0 flex flex-col items-start py-2 max-h-[240px] overflow-y-auto'>
              <ul className='w-[98%] m-auto'>
              {suggestions.map((suggestion, index) => (
                <li className='hover:rounded-2xl hover:bg-slate-700/50 cursor-pointer w-full text-lg list-none pl-14  text-blue-100 oxygen-regular'key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul> 
          </div>
      }
      </div> 
    </div>
  )
}


