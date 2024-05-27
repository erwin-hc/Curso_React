import './index.css'
import { useGeolocation } from './useGeoLocation';
import { useState } from "react";

// function useGeolocation() {}

export default function App() {
  const [countClicks, setCountClicks] = useState(0);

  const {isLoading, position : { lat, lng }, error, getPosition} = useGeolocation();
  
  // const { lat, lng } = position;

  function handleClick() {
    getPosition()
    setCountClicks(prev=>prev+1)
  }
  return (
    <div className='h-screen bg-slate-800 '> 
    <div className='flex flex-col items-center justify-center h-screen max-w-4xl m-auto'>
      <button className='p-3 mb-5 text-white bg-blue-800 rounded-xl hover:opacity-75 ' onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      <div className='flex items-center justify-center min-h-20'>
      {isLoading && <p className='text-2xl text-yellow-300'>Loading position...</p>}
      {error && <p className='text-2xl text-white'>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p className='text-xl text-white'>
          Your GPS position:{" "}
          <a
            className='text-2xl text-red-400'
            target="_blank"
            rel="noreferrer"
            href={`http://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}
      </div>

      <p className='mt-4 text-xl text-green-400'>You requested position <span className='text-2xl text-yellow-400'>{countClicks}</span> times</p>
    </div>
    </div>
  );
}

