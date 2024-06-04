import React, {  useEffect, useState } from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import { useGeolocation } from '../../hooks/useGeolocation'
import { City } from "country-state-city";

export function Search() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([]);

  const { cityName, isLoading, getPosition } = useGeolocation();

  const possibleValues = City.getAllCities().map((c) => c.name);

  function handleClick() {
    getPosition()
    setSuggestions([])
    setQuery(cityName)
  }

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
    }
  };

  const handleSuggestionClick = (value) => {
    setQuery(value);
    setSuggestions([]);
  };
  
  useEffect(()=>{
    setQuery(cityName)
  },[cityName])
 
  return (
    <div className='flex items-center justify-center w-full max-w-5xl mx-auto mt-8'>
      <div className='relative w-full h-10'>
      <input value={isLoading ? "Loading ..." : query}
      onChange={handleInputChange}
      placeholder='Search...' 
      className='text-lg w-full h-10 text-blue-100 border-none rounded-full outline-none pl-14 bg-blue-300/20 oxygen-bold'></input>
      <MdOutlineMyLocation onClick={handleClick}
      className='absolute text-3xl text-blue-100 cursor-pointer top-1 left-3 opacity-30 hover:opacity-70'/>
      { suggestions.length > 0 &&
          <div className='absolute w-full rounded-2xl  bg-blue-900/95 top-12 left-0 flex flex-col items-start py-2 max-h-[240px] overflow-y-auto'>
              <ul className='w-full'>
              {suggestions.map((suggestion, index) => (
                <li className='hover:bg-blue-400/20 hover:font-bold cursor-pointer w-full text-lg list-none pl-14  text-blue-100 oxygen-regular'key={index} onClick={() => handleSuggestionClick(suggestion)}>
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


