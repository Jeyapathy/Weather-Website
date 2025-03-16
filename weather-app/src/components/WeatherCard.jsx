import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { current, location } = weatherData;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get weather icon class
  const getWeatherIconClass = (iconCode) => {
    // Map Visual Crossing icon codes to Font Awesome icons
    const iconMap = {
      'clear-day': 'fas fa-sun',
      'clear-night': 'fas fa-moon',
      'partly-cloudy-day': 'fas fa-cloud-sun',
      'partly-cloudy-night': 'fas fa-cloud-moon',
      'cloudy': 'fas fa-cloud',
      'rain': 'fas fa-cloud-rain',
      'showers-day': 'fas fa-cloud-sun-rain',
      'showers-night': 'fas fa-cloud-moon-rain',
      'fog': 'fas fa-smog',
      'wind': 'fas fa-wind',
      'snow': 'fas fa-snowflake',
      'sleet': 'fas fa-cloud-meatball',
      'thunder-rain': 'fas fa-bolt',
      'thunder-showers-day': 'fas fa-bolt',
      'thunder-showers-night': 'fas fa-bolt',
      'hail': 'fas fa-cloud-meatball'
    };
    
    return iconMap[iconCode] || 'fas fa-cloud'; // Default to cloud if icon not found
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2 className="location">{location}</h2>
        <p className="date">{formatDate(new Date())}</p>
      </div>
      
      <div className="weather-body">
        <div className="weather-icon">
          <i className={getWeatherIconClass(current.icon)}></i>
        </div>
        
        <div className="weather-info">
          <h2 className="temperature">{Math.round(current.temp)}°C</h2>
          <p className="condition">{current.conditions}</p>
          
          <div className="weather-details">
            <p>
              <i className="fas fa-wind"></i> Wind: {current.windSpeed} km/h
            </p>
            <p>
              <i className="fas fa-tint"></i> Rain: {current.precipProb}%
            </p>
            <p>
              <i className="fas fa-thermometer-half"></i> Feels like: {Math.round(current.feelsLike)}°C
            </p>
            <p>
              <i className="fas fa-water"></i> Humidity: {current.humidity}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;