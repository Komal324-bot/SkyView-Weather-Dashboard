import React from "react";

const Favorites = ({ cities, onAdd, onRemove, onCityClick }) => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
      <ul className="list-none space-y-2">
        {cities.map((fav, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white text-blue-600 p-3 rounded-lg shadow-md"
          >
            <span
              onClick={() => onCityClick(fav.city)}  // Handle city click to fetch weather data
              className="cursor-pointer hover:text-blue-800"
            >
              {fav.city}
            </span>
            <button
              onClick={() => onRemove(fav.city)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onAdd}
        className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Add current to Favorite
      </button>
    </div>
  );
};

export default Favorites;
