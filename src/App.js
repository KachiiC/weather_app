import React from 'react'
// CSS
import './App.css';
import WeatherDisplay from 'Components/WeatherDisplay';
// import WeatherDisplayOffline from 'Components/WeatherDisplayOffline';

const App = ()  => {

    return (
      <div className="App">
        <WeatherDisplay />
        {/* <WeatherDisplayOffline /> */}
      </div>
    );

}

export default App;
