import "./App.css";
import React, { useState, useEffect } from "react";
import { searchImages } from "./img";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const BaseURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=85aba248412905d99e87f633b0d9378b`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await fetch(BaseURL);
        if (response.status === 404) {
          setError(
            "Error: It is likely that there was a mistake when typing the city."
          );
          setData({});
        } else {
          const weatherData = await response.json();
          setData(weatherData);
          setError("");

          // Call searchImages with the weather description
          if (weatherData.weather) {
            const images = await searchImages(
              weatherData.weather[0].description
            );
            setBackgroundImage(images[0].urls.full);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setLocation("");
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await searchImages("Cat");
      setImages(images);
    };
    fetchImages();
  }, []);

  return (
    <div
      key={backgroundImage}
      className="background App flex flex-col items-center h-screen w-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <section className="input-search my-4 w-full px-4 md:w-auto md:px-0">
        <input
          type="text"
          onKeyDown={searchLocation}
          onChange={handleLocationChange}
          className="border rounded p-2"
        />
      </section>

      {error && <p className="text-red-500">{error}</p>}
      <div></div>

      <section className="section-1 text-center flex flex-col mt-20 justify-content bg-gray-200 bg-opacity-50 p-2 rounded-lg">
        <div className="flex">
          <h1 className="text-5xl font-bold ml-0 mr-4 p-4">{data.name}</h1>
          {data.main && (
            <h2 className="text-2xl ml-4 mr-0 p-4">
              {kelvinToCelsius(data.main.temp)}°C
            </h2>
          )}
        </div>
        <div>
          {data.weather ? <h2>{data.weather[0].description}</h2> : null}
        </div>
      </section>

      {data.main && data.wind && (
        <footer className="bg-gray-200 bg-opacity-50 p-2 rounded-lg m-4 mb-32 w-full fixed bottom-0">
          <div className="flex sm:flex-row p-2 justify-between">
            <div className="p-2 my-2 md:my-0">
              <h3 className="font-bold">Humidity</h3>
              <p>{data.main.humidity}%</p>
            </div>
            <div className="p-2 my-2 md:my-0">
              <h3 className="font-bold">Wind Speed</h3>
              <p>{data.wind.speed} m/s</p>
            </div>
            <div className="p-2 my-2 md:my-0">
              <h3 className="font-bold">Max Temp</h3>
              <p>{kelvinToCelsius(data.main.temp_max)}°C</p>
            </div>
            <div className="p-2 my-2 md:my-0">
              <h3 className="font-bold">Min Temp</h3>
              <p>{kelvinToCelsius(data.main.temp_min)}°C</p>
            </div>
          </div>
        </footer>
      )}
      <div className="bg-gray-200 bg-opacity-25 p-1 rounded-lg m-4 fixed bottom-0 text-sm font-sans">
        <div className="flex justify-center mt-4">
          <a
            href="https://github.com/danieljher21/app-weather.git"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/edgar-daniel-jaimes-418b02168/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-center mt-4">Creado por Edgar Daniel Jaimes</p>
      </div>
    </div>
  );
}

export default App;
