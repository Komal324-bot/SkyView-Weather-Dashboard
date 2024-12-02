import axios from "axios";

const API_KEY = "c626cd933e1bf10b14e747b245dd9736";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city, unit) => {
  try {
    const currentWeatherResponse = await axios.get(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`
    );

    const forecastResponse = await axios.get(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`
    );

    return {
      currentWeather: {
        city: currentWeatherResponse.data.name,
        temperature: currentWeatherResponse.data.main.temp,
        feels_like: currentWeatherResponse.data.main.feels_like,
        temp_min: currentWeatherResponse.data.main.temp_min,
        temp_max: currentWeatherResponse.data.main.temp_max,
        pressure: currentWeatherResponse.data.main.pressure,
        humidity: currentWeatherResponse.data.main.humidity,
        wind_speed: currentWeatherResponse.data.wind.speed,
        description: currentWeatherResponse.data.weather[0].description,
        icon: currentWeatherResponse.data.weather[0].icon,
      },
      forecast: forecastResponse.data.list.slice(0, 5).map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.response || error);
    return null;
  }
};


export const fetchFavoriteCities = async () => {
  const response = await axios.get("http://localhost:5000/favorites");
  return response.data;
};

// Add a city to the favorites list
export const addFavoriteCity = async (city) => {
  try {
    await axios.post("http://localhost:5000/favorites", { city }); // Sending POST request to your backend
  } catch (error) {
    console.error("Error adding favorite city:", error);
  }
};

// Remove a city from the favorites list
export const removeFavoriteCity = async (city) => {
  try {
    const response = await axios.get("http://localhost:5000/favorites");
    const cityToDelete = response.data.find((fav) => fav.city === city);
     // Find the city in the list

    if (cityToDelete) {
      await axios.delete(`http://localhost:5000/favorites/${cityToDelete.id}`); 
      // Sending DELETE request to the backend
    }
  } catch (error) {
    console.error("Error removing favorite city:", error);
  }
};
