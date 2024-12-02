import './App.css';
import { useState,useEffect } from 'react';

const apiKey = '0b8d8591e06c738d98b217d9df9eb6f6';
const city = 'Warszawa';

function App() {

  const [weatherData,setWeatherData] = useState(null)

  async function fetchWeather() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();
      setWeatherData(data)
  }


useEffect(()=>{
  fetchWeather()
},[])

useEffect(()=>{
  console.log(weatherData)
},[weatherData])



  return (
    <div className="App">
        <p>Miejsce: {weatherData?.name}</p>
        <p>Temperatura: {weatherData?.main.temp}°C</p>
        <p>Pogoda: {weatherData?.weather[0].description}</p>
    </div>
  );
}

export default App;
