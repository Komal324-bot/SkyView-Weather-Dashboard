import React, { useState } from "react";

function WeatherDisplay({ weatherData, forecastData }) {
  const [isCelsius, setIsCelsius] = useState(true);

  // Toggle temperature unit
  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // Convert temperature
  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  if (!weatherData) {
    return (
      <div className="text-center text-lg text-white-500">
        No weather data available.
      </div>
    );
  }

  return (
    <div className="">
      {/* Current Weather */}
      <div className="bg-white text-blue-600 p-4 rounded-lg shadow-xl mb-
       w-11/12 sm:w-1/3 mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-center mb-3">{weatherData.city}</h2>
          <div className="flex items-center space-x-3">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt={weatherData.description}
              className="w-16 h-16"
            />
            <div className="text-center">
              <p className="text-2xl font-bold">
                {convertTemperature(weatherData.temperature).toFixed(1)}°{" "}
                {isCelsius ? "C" : "F"}
              </p>
              <p className="text- text-gray-600">{weatherData.description}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1 text-base">
            <p><strong>Feels Like:</strong> {convertTemperature(weatherData.feels_like).toFixed(1)}° {isCelsius ? "C" : "F"}</p>
            <p><strong>Pressure:</strong> {weatherData.pressure} hPa</p>
            <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind_speed} m/s</p>
          </div>

          <div className="mt-4 flex space-x-4 justify-center">
            <button
              onClick={toggleTemperatureUnit}
              className="px-4 py-1 bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 text-base"
            >
              °C ⇄ °F
            </button>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <h3 className="text-2xl font-bold mt-4 text-center pb-3">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
       gap-6 px-4 pb-4 overflow-y-auto">
        {forecastData.map((forecast, index) => (
          <div
            key={index}
            className="bg-white text-blue-600 p-6 rounded-lg shadow-md"
          >
            <p className="font-semibold text-xl">{forecast.date}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-lg">
                Temp: {convertTemperature(forecast.temperature).toFixed(1)}°{" "}
                {isCelsius ? "C" : "F"}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                alt={forecast.description.toUpperCase()}
                className="w-16 h-16"
              />
            </div>
            <p className="text-sm">Humidity: {forecast.humidity}%</p>
            <p className="text-sm">{forecast.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;
