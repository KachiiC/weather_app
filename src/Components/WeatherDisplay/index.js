import React, {useEffect, useState} from 'react'
// API Key
import ApiKey from '../../Key/ApiKey';

const WeatherDisplay = ()  => {

    const [queryCity, setQueryCity] = useState("")
    const [queryCountry, setQueryCountry] = useState("")
    const [weather, setWeather] = useState({})

    const getWeather = data => {
      data.preventDefault()
      setQueryCity(document.getElementById("city-country").value)
    }

    useEffect(() => {
      fetch(`https://community-open-weather-map.p.rapidapi.com/forecast/daily?q=${queryCity}&lat=35&lon=139&cnt=5&units=metric%20or%20imperial`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": ApiKey,
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
          }
      })
      .then(response => response.json())
      .then(weatherData => {
        setWeather(weatherData)
      })
      .catch(err => console.log(err))
    }, [queryCity, queryCountry])

    console.log(weather)

    return (
      <div className="App">
        <h1>Weather</h1>
        <p>Enter the city name to get your forecast!</p>
        <form onSubmit={getWeather}>
          <input 
            id="city-country" 
            className=""
          />
        </form>
        <h1>{queryCity}</h1>
      </div>
    );

}

export default WeatherDisplay
