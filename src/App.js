import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';

// API config
const apiKey = '0b8d8591e06c738d98b217d9df9eb6f6';
const defaultCity = 'Warszawa';

// Component: Weather
function Weather({city}) {
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city ?? defaultCity}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    setWeatherData(data);
  }

  useEffect(() => {
    fetchWeather();
  }, [city]);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  return (
    <div className="Weather">
      <p>Miejsce: {weatherData?.name}</p>
      <p>Temperatura: {weatherData?.main?.temp}°C</p>
      <p>Pogoda: {weatherData?.weather?.[0]?.description}</p>
    </div>
  );
}

// Component: About
function About() {
  return <h2>Stronę wykonali Paweł i Kacper</h2>;
}

// Component: NoPage
function NoPage() {
  return <h2>Strona nie istnieje</h2>;
}

// Component: Layout
function Layout() {

  const [city, setCity] = useState(defaultCity)

  return (
    <div>
      <Link to="/">Strona głowna</Link>
      <br/>
      <Link to="/about">O nas</Link>
      <h1>Aplikacja Pogodowa</h1>

      <select name="cities" id="cities" onChange={(e)=> setCity(e.target.value)}>
        <option value="warszawa">Warszawa</option>
        <option value="bialystok">Białystok</option>
        <option value="gdansk">Gdańsk</option>
      </select>

      <Routes>
        <Route path="/" element={<Weather city={city}/>} />
        <Route path="about" element={<About/>}  />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
