import React from 'react'
import './WeatherCards.css'

const WeatherCards = (props) => {

    return (
        <div className="card-component-container">
            <img className="card-component-image"
                src={props.image}
                alt="Avatar" 
            />
            <div className="card-description-container">
                <h4>{props.title}</h4> 
                <div className="card-description-content">{props.description}</div>
            </div>
        </div>
    )
}

export default WeatherCards