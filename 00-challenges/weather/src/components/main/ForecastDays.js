import 'weather-react-icons/lib/css/weather-icons.css';

export function ForecastDays({item}) {

  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      // [[0], "☀️"],
      // [[1], "🌤"],
      // [[2], "⛅️"],
      // [[3], "☁️"],
      // [[45, 48], "🌫"],
      // [[51, 56, 61, 66, 80], "🌦"],
      // [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      // [[71, 73, 75, 77, 85, 86], "🌨"],
      // [[95], "🌩"],
      // [[96, 99], "⛈"],
      [[0], "wi wi-day-sunny"],
      [[1], "wi wi-day-cloudy"],
      [[2], "wi wi-day-sunny-overcast"],
      [[3], "wi wi-cloudy"],
      [[45, 48], "wi wi-day-fog"],
      [[51, 56, 61, 66, 80], "wi wi-day-rain"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "wi wi-rain"],
      [[71, 73, 75, 77, 85, 86], "wi wi-snow"],
      [[95], "wi wi-thunderstorm"],
      [[96, 99], "wi wi-storm-showers"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }

  function getWeekName(strDate) {
    return new Date(strDate).toLocaleString('eng', { weekday: 'long'});
  }

  return (
    <div className="w-[98%] sm:w-[125px] h-[180px]  text-blue-50 m-2 rounded-xl bg-blue-300/20 shadow-2xl">
        <ul className='flex flex-col items-center justify-center'>
        {/* <li className='text-gray-200 text-5xl p-2 font-bold'>{getWeatherIcon(item["code"])}</li> */}
          <li className='py-1 text-sm oxygen-ligth uppercase text-blue-400'>{getWeekName(item["time"])}</li>
          <li className='text-gray-200 text-5xl mt-5 font-bold'>
          <i className={getWeatherIcon(item["code"])}></i>
          </li>
          <li className='py-1 text-blue-400 oxygen-bold'><span className='text-4xl  p-2 font-bold'>{item["maxTemp"].toFixed()}</span><span className=''>°C</span></li>
          <li className='text-blue-100 text-sm oxygen-regular'><span>{item["minTemp"].toFixed()}</span><span className=''>°C</span></li>
        </ul>
    </div>
  )
}


