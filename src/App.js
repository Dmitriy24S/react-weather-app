import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [weatherState, setWeatherState] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await response.json();
      setWeatherState({
        temp: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        country: data.sys.country,
        city: data.name,
      });
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  };

  const loader = <div className="loader"></div>;
  const weather = (
    <div className="weather">
      <div>
        {weatherState.city
          ? `${weatherState.city}, ${weatherState.country}`
          : ""}
      </div>
      <div>
        <img
          src={weatherState.icon}
          alt={weatherState.description ? weatherState.description : ""}
        />
        <span>{weatherState.temp ? `${weatherState.temp}°C` : ""}</span>
      </div>
      <div>{weatherState.description}</div>
    </div>
  );

  return (
    <div className="App">
      <div className="container text-center py-5">
        <div className="card border-0">
          <h5 className="card-header bg-primary text-white py-3">
            React Weather App
          </h5>
          <div className="card-body ">
            <form
              className="col-6 input-group p-5 d-flex justify-content-center"
              onSubmit={submit}
            >
              <input
                type="text"
                className="col-6 form-control d-flex justify-content-center"
                value={value}
                onChange={handleChange}
                placeholder="Enter City Name"
                required
                pattern="\S+.*"
              />
              <button className="btn btn-primary">Get Weather</button>
            </form>
            <div className="weather-info d-flex justify-content-center">
              {loading ? loader : weather}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
