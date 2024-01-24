import { useEffect, useState } from "react";
import './App.css';
import apikey from './apikey';

function App() {
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temperature: ''
  });

  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    setWeather({
      ...weather,
      city: e.target.value
    });
  };

  const fetchWeatherData = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${weather.city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição da API");
        }
        return response.json();
      })
      .then((data) => {
        setWeather({
          ...weather,
          country: data.location.country,
          temperature: data.current.temp_c
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (weather.city) {
      fetchWeatherData();
    }
  }, [weather.city]);

  return (
    <div className="App">
      <div className="show">
        <h1>
          Cidade: <input type="text" value={weather.city} onChange={handleInputChange} />
        </h1>
        <h2>País: {weather.country}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>Temperatura: {weather.temperature} °C</p>
        )}
      </div>
    </div>
  );
}

export default App;
