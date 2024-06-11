export function Today({ current, localName }) {

function getWeatherIcon(wmoCode) {
    const icons = new Map([
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

  return (
    <div className="bg-black/35 rounded-xl w-full min-h-[200px] my-4 mx-auto flex flex-col justify-center">
        <div className="self-center">
            <i className={ getWeatherIcon(current.weather_code) + 
                " text-8xl text-blue-600/90 p-8 text-center"}></i>
        </div>
        <div>
        <h2><i className="wi wi-thermometer"></i><span>{current.temperature_2m.toFixed()}</span><span className=''>°C</span></h2>  
        <h2>Feels Like: <span>{current.temperature_2m.toFixed()}</span><span className=''>°C</span></h2>  
           
           
            {localName}
        </div>  
    </div>
  )
}
