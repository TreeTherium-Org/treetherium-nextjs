"use client";

import React from 'react';
import { Chart } from 'react-google-charts';

const GeographicalDistribution = () => {
  const data = [
    ['Country', 'Value'],
    ['Canada', 40],
    ['Malaysia', 35],
    ['Brazil', 20],
    ['Australia', 15],
    ['China', 5],
    ['Netherlands', 5],
    ['Saudi Arabia', 5],
    ['France', 5],
  ];

  const options = {
    colorAxis: { colors: ['#A3A830', '#778B28'] },
    backgroundColor: '#fff',
    datalessRegionColor: '#e8ede9',
    defaultColor: '#f5f5f5',
  };

  // Function to determine the color based on the value
  const getColor = (value) => {
    if (value <= 5) return '#A3A830'; // Low value color
    if (value < 20) return '#D1E4A3'; // Medium value color
    return '#778B28'; // High value color
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Tree Planted Globally</h2>
      <div style={styles.chartContainer}>
        <Chart
          chartType="GeoChart"
          data={data}
          options={options}
          mapsApiKey="AIzaSyCIV9YVytAARkQZ1mLhzaauyJZqRC3anhc" // Replace with your Google Maps API Key
          width="100%"
          height="400px"
          legendToggle
        />
      </div>

      {/* Custom Legend with Two Columns */}
      <div style={styles.legendContainer}>
        <div style={styles.legendColumn}>
          {data.slice(1, 5).map((entry, index) => (
            <div key={`legend-left-${index}`} style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: getColor(entry[1]) }} />
              <span>{entry[0]}: {entry[1]}</span>
            </div>
          ))}
        </div>
        <div style={styles.legendColumn}>
          {data.slice(5).map((entry, index) => (
            <div key={`legend-right-${index}`} style={styles.legendItem}>
              <div style={{ ...styles.legendColor, backgroundColor: getColor(entry[1]) }} />
              <span>{entry[0]}: {entry[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Styling for the card
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    margin: '20px 20px 110px 20px',
    padding: '20px',
    backgroundColor: '#ffffff',

  },
  cardTitle: {
    margin: '0 0 20px',
    fontSize: '20px',
    textAlign: 'center',
    fontWeight:'400'
  },
  chartContainer: {
    width: '100%',
    height: '400px', // Set the height of the chart
  },
  legendContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Distribute space between columns
    marginTop: '10px',
  },
  legendColumn: {
    display: 'flex',
    flexDirection: 'column', // Stack items vertically in each column
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px', // Space between legend items
  },
  legendColor: {
    width: '15px',
    height: '15px',
    marginRight: '5px', // Space between color box and label
    borderRadius: '3px',
  },
};

export default GeographicalDistribution;
