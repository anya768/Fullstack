import axios from "axios";
import { useEffect, useState } from "react";
const API_KEY = process.env.REACT_APP_API_KEY;
const CountryView = ({country}) => {

    const [weatherInfo, setWeatherInfo] = useState({main:{}, wind:{}, weather:[{}]});

    useEffect(()=>{
        const [lat,lon] = country.capitalInfo.latlng
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        .then(result => {
            setWeatherInfo(result.data)
        })
    },[])

    return (<div>

        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital[0]}</p>
        <p>Area: {country.area}</p>
        <strong>Languages:</strong>

        <ul>
            {Object.values(country.languages).map(langObj => (
                <li key={langObj}>{langObj}</li>
            ))}
        </ul>

        <img src={country.flags.png}/>

        <h1>Weather in {country.name.common}</h1>
        <p>Temperature: {weatherInfo.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/`+weatherInfo.weather[0].icon+".png"} />
        <p>Wind speed {weatherInfo.wind.speed} m/s</p>
        
    </div>)
}

export default CountryView;