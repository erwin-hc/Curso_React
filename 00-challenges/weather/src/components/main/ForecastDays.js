import 'weather-react-icons/lib/css/weather-icons.css';

export function ForecastDays({item}) {

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "wi wi-day-sunny"],
    [[1], "wi wi-day-cloudy"],
    [[2], "wi wi-day-sunny-overcast"],
    [[3], "wi wi-cloudy"],
    [[45, 48], "wi wi-day-fog"],
    [[51, 56, 61, 66, 80], "wi wi-rain"],
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
  return new Intl.DateTimeFormat("pt", {
    weekday: "short",
    timeZone: 'UTC'
  }).format(new Date(strDate));
}

  return (
    <div className="w-[98%] sm:w-[125px] h-[200px] m-2 rounded-xl bg-gray-950/25 ">
        <div className='flex flex-col items-center justify-center'>
             
              <div className='mt-2 w-full text-sm oxygen-regular uppercase tracking-widest'>
                <div className='flex flex-wrap justify-center items-center'>
                  <div className='px-1'>
                    {getWeekName(item["time"])}
                  </div>
                  <div>
                    {
                    new Intl.DateTimeFormat("pt", {
                      day: "2-digit",
                      month:"2-digit",
                      timeZone: 'UTC'
                    }).format(new Date(item["time"]))            
                    }
                  </div>
                </div>
              </div>

              <div className='mt-1 flex justify-center items-center w-full text-5xl oxygen-bold'>
                <i className={getWeatherIcon(item["code"]) + " p-4"}></i>
              </div>

              <div className='flex justify-center items-center w-full text-sm oxygen-bold'>
                <span className='text-red-300 text-2xl'>
                 &uarr;
                </span>
                <span className='text-4xl font-bold'>{Math.ceil(item["maxTemp"])}</span>
                <span className='pt-3 self-start'>°C</span>
              </div>

              <div className='flex justify-center items-center w-full text-sm oxygen-regular'>
                <span className='text-sm text-blue-300'>
                 &darr;
                </span>
                <span className='px-1'>{Math.floor(item["minTemp"])}</span>
                <span className=''>°C</span>
              </div>

        </div>
    </div>
  )
}


