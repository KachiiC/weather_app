import WeatherCards from 'Components/WeatherCards';
import React, {useEffect, useState} from 'react'
// API Key
import ApiKey from '../../Key/ApiKey';

const WeatherDisplay = ()  => {

    const [queryCity, setQueryCity] = useState("")
    const [weather, setWeather] = useState({
      "city": {
        "name": "",
      },
      "list": [
        {
          "dt": 1606734000,
          "temp": {
            max: 0
          },
          "weather": [
            {"main": "",}
          ]
        }
      ]
    })
    const [weatherCityName, setWeatherCityName] = useState()
    const [showResults, setShowResults] = useState(false)

    const getWeather = data => {
      data.preventDefault()
      setQueryCity(document.getElementById("city").value)
    }

    useEffect(() => {
      if (queryCity !== ""){
      fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${queryCity}&lat=35&lon=139&cnt=3&units=metric`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": ApiKey,
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
          }
      })
      .then(response => response.json())
      .then(weatherData => {
        setWeather(weatherData)
        setWeatherCityName(weatherData.city["name"])
        setShowResults(true)
      })
      .catch(err => console.log(err))
    }} , [queryCity])


    const dayWeather = weather.list.map((day, index) => {

      const weatherDate = new Date(day.dt * 1000)
      const formattedWeatherDate = weatherDate.toLocaleDateString("en-UK", {
          day: "2-digit",
          month: "short",
      })

      const displayTemprature = Math.floor(day.temp.max)

      return (
            <WeatherCards 
              image={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              title={formattedWeatherDate}
              temperature={`${displayTemprature}°C`}
              description={`${day.weather[0].main} (${day.weather[0].description})`}
              key={index}
            />
      )

    })

    return (
      <div className="App">
        <h1>Weather</h1>
        <p>Enter the city name to get your forecast!</p>
        <form onSubmit={getWeather}>
          <input 
            id="city" 
            className="city-search"
          />
        </form>
        { showResults && (
          <div>
            <h1>{weatherCityName}</h1>
            <div className="weather-cards-container">
              {dayWeather}
            </div>
          </div>
          )
        }
      </div>
    );

}

export default WeatherDisplay
