import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastGraph from '../components/ForecastGraph';
import { fetchWeather, fetchWeatherByCoordinates } from '../utils/api';
import './Home.css';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle search by location name
  const handleSearch = async (location) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeather(location);
      setWeatherData(data);
    } catch (err) {
      if (err.message === "API Key not configured") {
        setError('Weather API key not configured. Please add your API key to the .env file.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle getting current location
  const handleGetCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeatherByCoordinates(latitude, longitude);
            setWeatherData(data);
          } catch (err) {
            if (err.message === "API Key not configured") {
        setError('Weather API key not configured. Please add your API key to the .env file.');
      } else {
        setError('Failed to fetch weather data. Please try again.');
      }
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError('Unable to get your location. Please allow location access or search manually.');
          setLoading(false);
          console.error(err);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };

  // Try to get user's location on initial load
  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  return (
    <div className="home-container">
      <h1>Weather App</h1>
      
      <SearchBar 
        onSearch={handleSearch} 
        onGetCurrentLocation={handleGetCurrentLocation} 
      />
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {weatherData && !loading && (
        <div className="weather-content">
          <WeatherCard weatherData={weatherData} />
          <ForecastGraph hourlyData={weatherData.hourly} />
        </div>
      )}
    </div>
  );
};

export default Home;