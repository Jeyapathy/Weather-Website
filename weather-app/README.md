# Weather App

A modern React-based weather application that displays current weather conditions and forecasts using the Visual Crossing Weather API.

## Features

- Current weather conditions display
- 24-hour forecast graph
- Location search functionality
- Geolocation support
- Responsive design

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Add your Visual Crossing API key in `src/utils/api.js`
4. Start the development server:
   ```
   npm start
   ```

## API Key

This application uses the Visual Crossing Weather API. You need to sign up for a free API key at [Visual Crossing](https://www.visualcrossing.com/) and replace the placeholder in the `src/utils/api.js` file:

```javascript
const API_KEY = "YOUR_VISUAL_CROSSING_API_KEY";
```

## Technologies Used

- React
- Axios for API requests
- Recharts for data visualization
- CSS for styling

## Project Structure

```
/weather-app
│── /src
│   ├── /components
│   │   ├── WeatherCard.jsx - Displays current weather information
│   │   ├── SearchBar.jsx - Handles location search and geolocation
│   │   ├── ForecastGraph.jsx - Renders the 24-hour forecast chart
│   ├── /pages
│   │   ├── Home.jsx - Main page component
│   ├── /utils
│   │   ├── api.js - API utility functions
│   ├── App.js - Main application component
│   ├── index.js - Entry point
│── /public
│── package.json
│── README.md
```