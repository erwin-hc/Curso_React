
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
    <div className=" text-blue-50 bg-black/35 rounded-xl w-full min-h-[200px] my-4 mx-auto flex flex-col justify-center">
        <div className="border border-red-400 w-full flex flex-row p-2">
            <div className="flex items-center justify-center">
                <p className=""><i className="wi wi-storm-warning text-4xl mx-5"></i></p>
            </div>
            <div className="flex flex-col text-[20px] oxygen-bold">
                <span>{localName.split(",")[0]}</span>
                <span className="text-sm">{localName.split(",")[1]}</span>
            </div>
        </div> 
        <div className="border border-red-400 w-full flex items-center justify-center">
            <i className={ getWeatherIcon(current.weather_code) + 
            " text-[120px] p-10 text-blue-600/90"}>              
            </i>
        </div>
        <div className="border border-red-400 w-full">
           <div className="flex items-center w-full justify-center">
                <i className="wi wi-thermometer text-red-400 text-6xl"></i>
                <div className="text-8xl oxygen-bold">{current.temperature_2m.toFixed()}</div>
                <div className='text-6xl'>°C</div>
           </div>
             <i className="wi wi-thermometer-exterior"></i>
             <div>{current.temperature_2m.toFixed()}</div>
             <div className=''>°C</div>
        </div> 
    </div>
  )
}
