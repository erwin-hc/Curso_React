import React from 'react'

export function CardDay({item}) {


  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  function getWeekName(strDate) {
    return new Date(strDate).toLocaleString('eng', { weekday: 'long'});
  }

  return (
    <div className="w-[200px] text-white sm:w-32 h-48 m-2  rounded-xl bg-blue-300/20 shadow-2xl">
        <>
        <ul className='flex flex-col items-center justify-center'>
          <li className='text-blue-600/95 text-7xl font-bold'>{getWeatherIcon(item["code"])}</li>
          <li className='uppercase pt-2 text-md oxygen-regular'>{getWeekName(item["date"])}</li>
          <li className='text-blue-200 oxygen-regular'><span className='text-5xl  p-2 font-bold'>{item["maxTemp"].toFixed()}</span><span className=''>°C</span></li>
          <li className='text-blue-050 text-xl oxygen-regular'><span>{item["minTemp"].toFixed()}</span><span className=''>°C</span></li>
        </ul>
        </>
    </div>
  )
}

