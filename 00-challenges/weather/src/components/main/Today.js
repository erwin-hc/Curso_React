
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
    <div className="bg-gray-950/50 shadow-2xl rounded-xl w-full my-4 mx-auto grid grid-cols-1 sm:grid-cols-3 ">
       
        <div className="w-full flex p-2 py-4">            
                <div className="flex items-start justify-center">
                    <p className=""><i className="wi wi-storm-warning text-7xl px-4"></i></p>
                </div>
                <div className="flex flex-col oxygen-bold">
                    <span className="text-2xl">{localName.split(",")[0]}</span>
                    {/* <span className="text-xl">{localName.split(",")[1]}</span> */}
                    <div>{new Date(current.time).toDateString()}</div>
                </div>          
        </div> 

        <div className="w-full flex items-center justify-center pt-2">
            <i className={ getWeatherIcon(current.weather_code) + 
            " text-[150px] text-blue-50 my-10"}>              
            </i>
        </div>

        <div className="w-full pb-6 pt-1 self-end">
            <div className="flex items-center justify-end w-full pr-4">
                    <div className="flex justify-center items-center">
                    <i className="wi wi-thermometer text-6xl p-2 mt-3"></i>
                    </div>  
                    <div className="text-8xl oxygen-bold ">{current.temperature_2m.toFixed()}</div>
                    <div className='text-6xl'>°</div>
            </div>
            <div className="flex items-center w-full justify-end pr-4">
                    <div className="text-xl oxygen-bold mr-3">Feels like</div>
                    <div className="text-xl oxygen-bold">{current.apparent_temperature.toFixed()}</div>
                    <div className='text-xl p-1'>°</div>
            </div>
        </div> 

    </div>
  )
}
