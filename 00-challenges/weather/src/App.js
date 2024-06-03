import { Header } from "./components/header/Header";
import { Main } from "./components/main/Main";
import { Footer } from "./components/footer/Footer"

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen px-6 bg-blue-950">
      <Header/>
      <Main/>
      <Footer/>
     </div>
  );
}

export default App;
