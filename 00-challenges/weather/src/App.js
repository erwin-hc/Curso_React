import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer"
import { useEffect, useState } from "react";

function App() {
  const [ weather, setWeather ] = useState()

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 bg-blue-950">
      <Header setWeather={setWeather}/>
      <Main/>
      <Footer/>
     </div>
  );
}

export default App;
