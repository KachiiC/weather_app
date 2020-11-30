import React from 'react'
import weatherData from 'Data/weatherData'

const WeatherDisplayOffline = () => {

    const weatherCityName = weatherData.city.name

    const dayWeather = weatherData.list.map((day) => {

        const weatherDate = new Date(day.dt * 1000)
        const formattedWeatherDate = weatherDate.toLocaleDateString("en-UK", {
            day: "2-digit",
            month: "short",
        })

        return (
            <div>
                <h1>weather: {day.weather[0].main}</h1>
                <p>{formattedWeatherDate}</p>
            </div>
        )

    })

    return (
        <div>
            <h1>WeatherDisplayOffline</h1>
            <h2>{weatherCityName}</h2>
            {dayWeather}
        </div>
    )

}

export default WeatherDisplayOffline