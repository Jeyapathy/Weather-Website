import axios from 'axios';

/**
 * Fetches weather data from Visual Crossing API
 * @param {string} location - Location name or coordinates (lat,lng)
 * @returns {Promise} - Promise containing weather data
 */
export const fetchWeather = async (location) => {
    const API_KEY = process.env.REACT_APP_VISUAL_CROSSING_API_KEY || "YOUR_VISUAL_CROSSING_API_KEY"; // Use environment variable or fallback to placeholder
    
    if (API_KEY === "YOUR_VISUAL_CROSSING_API_KEY") {
        console.error("API Key not configured. Please set the REACT_APP_VISUAL_CROSSING_API_KEY environment variable.");
        throw new Error("API Key not configured");
    }
    // Use the provided location with US units
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`;
    
    try {
        const response = await axios.get(URL);
        
        // Process and return the weather data in a more usable format
        const { currentConditions, days, resolvedAddress } = response.data;
        
        return {
            current: {
                temp: currentConditions.temp,
                feelsLike: currentConditions.feelslike,
                humidity: currentConditions.humidity,
                windSpeed: currentConditions.windspeed,
                conditions: currentConditions.conditions,
                icon: currentConditions.icon,
                precipProb: currentConditions.precipprob || 0,
                datetime: currentConditions.datetime
            },
            location: resolvedAddress,
            forecast: days.slice(0, 7).map(day => ({
                datetime: day.datetime,
                tempMax: day.tempmax,
                tempMin: day.tempmin,
                icon: day.icon,
                conditions: day.conditions,
                precipProb: day.precipprob || 0
            })),
            hourly: response.data.days[0].hours.map(hour => ({
                datetime: hour.datetime,
                temp: hour.temp,
                icon: hour.icon,
                conditions: hour.conditions,
                precipProb: hour.precipprob || 0
            }))
        };
    } catch (error) {
        console.error("Error fetching weather data", error);
        throw error; // Re-throw to handle in components
    }
};

/**
 * Fetches weather data using geolocation coordinates
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise} - Promise containing weather data
 */
export const fetchWeatherByCoordinates = async (lat, lng) => {
    const locationString = `${lat},${lng}`;
    return fetchWeather(locationString);
};