import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer"
import {  useEffect, useState } from "react";

function App() {
  const [ weather, setWeather ] = useState()
  const [ localName, setLocalName ] = useState("")
  const [ isDay, seTisDay ] = useState(null)
  const [ color, setColor] = useState("theme-default")
  const [ wcode, setWcode ] = useState(null)

  const appStyle = " flex flex-col min-h-screen px-6 min-w-72 transition-all delay-300"

  function getWeatherIcon(wcode) {
    const icons = new Map([
        [[0], "theme-sun"],
        [[1], "theme-sun"],
        [[2], "theme-sun"],
        [[3], "theme-cloud"],
        [[45, 48], "theme-fog"],
        [[51, 56, 61, 66, 80], "theme-rain"],
        [[53, 55, 63, 65, 57, 67, 81, 82], "theme-rain"],
        [[71, 73, 75, 77, 85, 86], "theme-fog"],
        [[95], "theme-rain"],
        [[96, 99], "theme-rain"],
    ]);
    if (isDay === 1 ) {
      const arr = [...icons.keys()].find((key) => key.includes(wcode));
      if (!arr) return;
      return icons.get(arr);
    } 
    if (isDay === 0 ) {
      return "theme-night"
    }
    if (isDay === null || isDay === undefined) {
      return "theme-default"
    }     
}

  useEffect(()=>{
    setColor(getWeatherIcon(wcode))
    console.log(wcode)  
  },[wcode])

  

    return (
    <div className={`${color} ${appStyle}`}>
      <Header setWeather={setWeather} setLocalName={setLocalName} seTisDay={seTisDay} setWcode={setWcode}/>
      <Main weather={weather} localName={localName} isDay={isDay}/>
      <Footer/>
     </div>
  );
}

export default App;
