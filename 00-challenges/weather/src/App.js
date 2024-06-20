import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer"
import {  useState } from "react";

function App() {
  const [ weather, setWeather ] = useState()
  const [ localName, setLocalName ] = useState("")
  const [ isDay, seTisDay ] = useState(null)
    
    return (
    <div className={
      isDay === 1 
      ? " theme-sun flex flex-col min-h-screen px-6 min-w-72 transition-colors delay-200"
      : " theme-night flex flex-col min-h-screen px-6 min-w-72 transition-colors delay-200"
      }>
      <Header setWeather={setWeather} setLocalName={setLocalName} seTisDay={seTisDay}/>
      <Main weather={weather} localName={localName} isDay={isDay}/>
      <Footer/>
     </div>
  );
}

export default App;
