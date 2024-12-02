import './App.css';
import React, { useState, useEffect } from "react";
import Search from "./Components/Search";
import WeatherDisplay from "./Components/WeatherDisplay";
import Favorites from "./Components/Favorites";
import { fetchWeatherData, fetchFavoriteCities, addFavoriteCity, removeFavoriteCity } from "./Utils/Api";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [unit] = useState("metric");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await fetchFavoriteCities();
        setFavoriteCities(data);
      } catch (error) {
        console.error("Error fetching favorite cities:", error);
      }
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity, unit).then((data) => {
        setWeatherData(data.currentWeather);
        setForecastData(data.forecast);
      });
    }
  }, [selectedCity, unit]);

  const handleSearch = (city) => setSelectedCity(city);

  const handleAddFavorite = async () => {
    if (!selectedCity) return;
    try {
      await addFavoriteCity(selectedCity);
      setFavoriteCities((prevFavorites) => [...prevFavorites,
        { city: selectedCity }]);
    } catch (error) {
      console.error("Error adding favorite city:", error);
    }
  };

  const handleRemoveFavorite = async (city) => {
    try {
      await removeFavoriteCity(city);
      setFavoriteCities((prevFavorites) => prevFavorites.filter((fav) => fav.city !== city));
    } catch (error) {
      console.error("Error removing favorite city:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto  py-6">
        {/* Header */}
        <header className="text-center mb-4">
        <h1 className="text-4xl font-semibold tracking-wide">SkyView - Weather Dashboard</h1>
          <p className="text-lg text-gray-200">Your daily weather updates, simplified</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Left Section */}
          <div className="bg-white/30 backdrop rounded-lg shadow-lg p-4 flex-grow lg:w-1/4">
            <Search onSearch={handleSearch} />
            <Favorites
              cities={favoriteCities}
              onAdd={handleAddFavorite}
              onRemove={handleRemoveFavorite}
              onCityClick={handleSearch} 
            />
          </div>

          {/* Right Section */}
          <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-4 
          flex-grow lg:w-2/3">
            <WeatherDisplay weatherData={weatherData} forecastData={forecastData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


