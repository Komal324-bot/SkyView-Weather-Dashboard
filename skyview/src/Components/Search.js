import React, { useState } from "react";

function Search({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-l-lg border-2 border-white text-blue-600 
          placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-700 px-6 py-3 text-lg rounded-r-lg text-white font-medium 
          hover:bg-blue-800"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
