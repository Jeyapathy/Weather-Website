import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onGetCurrentLocation }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && location.trim()) {
      onSearch(location);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter location..."
        className="search-input"
      />
      <button onClick={handleSubmit} className="search-button">
        <i className="fas fa-search"></i>
      </button>
      <button onClick={onGetCurrentLocation} className="location-button">
        <i className="fas fa-map-marker-alt"></i>
      </button>
    </div>
  );
};

export default SearchBar;