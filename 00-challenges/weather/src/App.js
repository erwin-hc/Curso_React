import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer"
import {  useState } from "react";

function App() {
  const [ weather, setWeather ] = useState()
  const [ localName, setLocalName ] = useState("")
    
    return (
    <div className="flex flex-col  min-h-screen px-6 bg-blue-950">
      <Header setWeather={setWeather} setLocalName={setLocalName}/>
      <Main weather={weather} localName={localName}/>
      <Footer/>
     </div>
  );
}

export default App;
