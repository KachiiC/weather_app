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
      fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${queryCity}&lat=35&lon=139&cnt=3&units=metric%20or%20imperial`, {
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


    const dayWeather = weather.list.map((day) => {

      const weatherDate = new Date(day.dt * 1000)
      const formattedWeatherDate = weatherDate.toLocaleDateString("en-UK", {
          day: "2-digit",
          month: "short",
      })

      return (
            <WeatherCards 
              image="http://via.placeholder.com/356x200.png"
              title={formattedWeatherDate}
              description={day.weather[0].main}
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
            <h1>{queryCity}</h1>
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
