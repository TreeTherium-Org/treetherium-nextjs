"use client"; 

import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

// Dummy data
const NFTCreatedData = [
    { day: 'Sunday', create: 15 },
    { day: 'Monday', create: 22 },
    { day: 'Tuesday', create: 18 },
    { day: 'Wednesday', create: 20 },
    { day: 'Thursday', create: 25 },
    { day: 'Friday', create: 28 },
    { day: 'Saturday', create: 30 },
];


const TREECirculatingData = [
    { day: 'Sunday', create: 40 },
    { day: 'Monday', create: 30 },
    { day: 'Tuesday', create: 20 },
    { day: 'Wednesday', create: 27 },
    { day: 'Thursday', create: 18 },
    { day: 'Friday', create: 23 },
    { day: 'Saturday', create: 34 },
];


// Card component that renders total metric and a small bar chart
const MetricCard = ({ title, metric, data, fill }) => {
    return (
        <div style={cardStyle}>
            {/* Card Header */}
            <div style={headerStyle}>
                <h2>{title}</h2>
                <p style={{ fontSize: '24px', margin: 0 }}>{metric}</p>
            </div>

            {/* Small Bar Chart */}
            <div style={{ height: 150 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="day" tick={false} /> {/* Hides the X-axis labels */}
                        <Tooltip />
                        <Bar dataKey="create" fill={fill} />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

// Main component rendering side by side cards
const SideBySideCards = () => {
    return (
        <div style={containerStyle}>
            {/* NFT Created Card */}
            <MetricCard
                title="Total NFT Created"
                metric={NFTCreatedData.reduce((acc, curr) => acc + curr.create, 0).toLocaleString()}
                data={NFTCreatedData}
                fill="#778B28"
            />

            {/* TREE Circulating Card */}
            <MetricCard
                title="TREE Circulating"
                metric={TREECirculatingData.reduce((acc, curr) => acc + curr.create, 0).toLocaleString()}
                data={TREECirculatingData}
                fill="#A3A830"
            />
        </div>

    );
};

// Styles
const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // Enable wrapping
    justifyContent: 'space-between', // Space between cards
    gap: '10px', // Space between cards
    margin: '20px',
};

const cardStyle = {
    flex: '1 1 48%', // Each card takes around 48% of the container width
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box', // Ensure padding doesn't affect the card size
    minWidth: '150px', // Set a minimum width to ensure proper display on very small screens
};

// Optional media queries (for minor adjustments on very small screens)
const responsiveStyle = {
    '@media(max-width: 480px)': {
        containerStyle: {
            gap: '5px', // Reduce gap on very small screens
        },
        cardStyle: {
            flex: '1 1 100%', // Each card takes full width on ultra-small screens
        },
    },
};


const headerStyle = {
    marginBottom: '20px',
    textAlign: 'center',
};

export default SideBySideCards;