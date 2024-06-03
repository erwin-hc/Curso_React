import { useEffect, useState } from "react";

export default function useGeolocation() {  
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [cityName, setCityName] = useState(null)
    const [stateName, setStateName] = useState(null)

    if (!navigator.geolocation) {
      console.log('Sem localização')
    }

    function getPosition() {     
      navigator.geolocation.getCurrentPosition((position)=>{
      const { coords } = position;
      setLat(coords.latitude)
      setLng(coords.longitude)
    })    
    }
     
    async function getCity() {
    const YOUR_PRIVATE_TOKEN = `pk.bbc27fd22d82fd79345d3a03093148df`
    const URL = `https://us1.locationiq.com/v1/reverse.php?key=${YOUR_PRIVATE_TOKEN}&lat=${lat}&lon=${lng}&format=json`

    const res = await fetch(URL)
    const data = await res.json()
      if (data.address) {
        setCityName(data.address.city)
        setStateName(data.address.state)
      }
    }

    useEffect(()=> getPosition(),[])
    
    return { lat, lng, getPosition, getCity , cityName, stateName}
  }