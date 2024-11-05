// components/CustomPieChart.js

"use client"; 

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data and Colors
const data = [
  { name: 'Buy', value: 2560 },
  { name: 'Sell', value: 2150 },
  { name: 'Transfer', value: 2780 },
];
const COLORS = ['#A3A830', '#778B28', '#2b3d1d'];

const CustomPieChart = () => {
  // Card styling
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
  };

  const headerStyle = {
    fontSize: '20px',
    fontWeight: '400',
    marginBottom: '20px',
    textAlign: 'center',
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>NFT Transactions</div>

      {/* Pie Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
