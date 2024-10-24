import React, { useEffect, useState } from 'react'

const WeatherCard = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null); // Start with null instead of an empty array

    const fetchWeather = async (city) => {
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5eb4ac91b5034678826172136240710&q=${city}&days=7&aqi=no&alerts=no`);
        const data = await res.json();
        console.log(data);
        setWeather(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
        setCity(""); // Clear input after submission
    }

    useEffect(() => {
        fetchWeather("bhopal");
    }, []);

    return (
        <>
            <div className="container-fluid p-5">
                <div className="card p-5 text-center">
                    <h1>Weather App</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control w-100 my-3"
                            placeholder="Enter City Name"
                            onChange={(e) => setCity(e.target.value)}
                            value={city}
                        />
                        <button type="submit" className="btn btn-success w-100">Search</button>
                    </form>
                </div>

                {weather && weather.current && (
                    <div className="card my-2 d-flex flex-row justify-content-between p-5">
                        <div>
                            <h1>{weather.current.temp_c}°C</h1>
                            <h4>{weather.location.name}</h4>
                        </div>
                        <div>
                            <img src={weather.current.condition.icon} alt="weather icon" style={{ width: "100px" }} />
                            <p>{weather.current.condition.text}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default WeatherCard;
