import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ForecastGraph.css';

const ForecastGraph = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  // Format the data for the chart
  const chartData = hourlyData.slice(0, 24).map(hour => {
    // Format time for display
    const time = new Date(hour.datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    return {
      time,
      temperature: Math.round(hour.temp),
      precipitation: hour.precipProb
    };
  });

  return (
    <div className="forecast-graph">
      <h3>24-Hour Forecast</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            activeDot={{ r: 8 }}
            name="Temperature (°C)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="precipitation"
            stroke="#0088fe"
            name="Precipitation (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastGraph;