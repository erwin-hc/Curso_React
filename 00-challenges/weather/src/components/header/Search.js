import React, {  useEffect, useRef, useState } from 'react'
import { City } from "country-state-city";
import { MdOutlineMyLocation } from "react-icons/md";

import { useGeolocation } from '../../hooks/useGeolocation'

export function Search({ setWeather , setLocalName }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [suggestions, setSuggestions ] = useState([]);

  const suggestionListRef = useRef(null)
    
  const {
    cityStateName,
    isLoading,
    getPosition,
    error,
    forecast
  } = useGeolocation();
   
  const possibleValues = City.getAllCities().map((c) => {
    const { name, stateCode, latitude,longitude } = c
    return [ name, stateCode, latitude,longitude ]
  });

  function handleClick() {
    setWeather({})
    setSuggestions([])
    setSelectedIndex(0)
    getPosition()    
    cityStateName.length > 0 && setQuery([cityStateName[0],cityStateName[1]].join(", "))
    if (error) setQuery(error) 
  };

  function handleInputChange(event) {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 3) {
      const filteredSuggestions = possibleValues
        .filter((suggestion) =>
          suggestion[0].toLowerCase().includes(value.toLowerCase())
        )
        .sort((a, b) => a[0].localeCompare(b[0]));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
      setSelectedIndex(0)
      setWeather({})
      }
  };

  function handleSuggestionClick(value) {
    setQuery(`${value[0]}, ${value[1]}`);
    setLocalName(`${value[0]}, ${value[1]}`)
    fetchWeather(value[2],value[3])
    setSuggestions([]);
    setSelectedIndex(0)
  };

  async function fetchWeather(lat,lng) {    
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current=temperature_2m,apparent_temperature,weather_code`
    const res = await fetch(URL)
    const data = await res.json()
    setWeather(data)
  }

  function keyPressHandler(e) {
    const length = suggestions.length;

    if (e.keyCode === 40) {
      setSelectedIndex(selectedIndex + 1);
      if (selectedIndex >= length - 1) {
        setSelectedIndex(0);
      }
     suggestionListRef.current.scrollTo({ top: selectedIndex * 28 + 30 , behavior: "smooth" })
    }

    if (e.keyCode === 38) {
      setSelectedIndex(selectedIndex - 1);
      if (selectedIndex <= 0) {
        setSelectedIndex(length - 1);
      }
      suggestionListRef.current.scrollTo({ top: selectedIndex * 28 - 30 , behavior: "smooth" })
    }

    if (e.keyCode === 13) {
      handleSuggestionClick(suggestions[selectedIndex])
    }    
  }
  
  useEffect(()=>{
    cityStateName.length > 0 && setQuery([cityStateName[0],cityStateName[1]].join(", "))
    setLocalName([cityStateName[0],cityStateName[1]].join(", "))
    if (error) setQuery(error)   
    setWeather(forecast)  
  },[cityStateName, error, forecast, setWeather, setLocalName])
 
  useEffect(()=>{
    setSelectedIndex(0)
    const callback = () => setSuggestions([])    
    document.addEventListener("click", callback)
    return () => document.removeEventListener("click", callback)
  },[])

  return (
    <div className='flex items-center justify-center w-full max-w-5xl mx-auto mt-8'>
      <div className='relative w-full h-10'>
      <input value={isLoading ? "Loading ..." : query}
      onClick={()=>setQuery("")}
      onChange={handleInputChange}
      onKeyDown={keyPressHandler}
      placeholder='Search...' 
      className='text-gray-50 text-ellipsis text-lg w-full h-10 border-none rounded-full outline-none pl-14 pr-7 bg-gray-950/10 oxygen-bold placeholder:text-gray-50/70'></input>
      <MdOutlineMyLocation onClick={handleClick}
      className='absolute text-3xl cursor-pointer top-1 left-3 opacity-50 hover:opacity-70'/>
      { suggestions.length > 0 &&
          <div ref={suggestionListRef} className='absolute w-full rounded-2xl  bg-gray-950/75 top-12 left-0 flex flex-col items-start py-2 max-h-[240px] overflow-y-auto'>
              <ul className='w-[98%] m-auto'>
              {suggestions.map((suggestion, index) => (
                <li 
                className={`hover:rounded-2xl hover:bg-gray-50/20 cursor-pointer w-full text-lg list-none pl-14 oxygen-regular ${selectedIndex === index ? 'active' : ""}`} 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={()=>setSelectedIndex(index)}  
                >
                {suggestion[0]}, {suggestion[1]}
                </li>
              ))}
            </ul> 
          </div>
      }
      </div> 
    </div>
  )
}


