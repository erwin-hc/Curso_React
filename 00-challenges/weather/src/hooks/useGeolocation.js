import { useState } from "react";

export function useGeolocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    const [cityStateName, setCityStateName] = useState({});
    const [forecast, setForecast ] = useState({})

     function getPosition() {
      if (!navigator.geolocation)
          return setError("Not supported in your browser!");
    
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            });
            fetchCityName(pos.coords.latitude, pos.coords.longitude)
            fetchWeather(pos.coords.latitude, pos.coords.longitude)
            setIsLoading(false);
          },
          (error) => {
            setError(error.message);
            console.error(error)
            setIsLoading(false);
          }
        );
    }
    
    async function fetchCityName(lat, lng) {      
        const YOUR_PRIVATE_TOKEN = `pk.bbc27fd22d82fd79345d3a03093148df`
        const URL = `https://us1.locationiq.com/v1/reverse.php?key=${YOUR_PRIVATE_TOKEN}&lat=${lat}&lon=${lng}&format=json`

        const res = await fetch(URL)
        const data = await res.json()
          if (data.address) {
            setCityStateName(
              {
                "city" : data.address.city,
                "state" : data.address.state
              })            
          }        
    } 

    async function fetchWeather(lat,lng) {    
      const URL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=weathercode,temperature_2m_max,temperature_2m_min&current=temperature_2m,apparent_temperature,weather_code`
      const res = await fetch(URL)
      const data = await res.json()
      setForecast(data)
    }
        
    return { isLoading, position, error, cityStateName, getPosition, forecast , fetchWeather }
  
}