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

const RoundedBar = (props) => {
    const { x, y, width, height } = props;
    const radius = 10; // Adjust this value for more or less rounding
    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={radius}
                ry={radius}
                fill={props.fill}
            />
        </g>
    );
};


// Card component that renders total metric and a small bar chart
const MetricCard = ({ title, metric, data, fill }) => {
    return (
        <div style={cardStyle}>
            {/* Card Header */}
            <div style={headerStyle}>
                <h5 style={{ fontWeight: '400' }}>{title}</h5>
                <p style={{ fontSize: '30px', margin: 0 }}>{metric}</p>
            </div>

            {/* Small Bar Chart */}
            <div style={{ height: 150 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="day" tick={false} /> {/* Hides the X-axis labels */}
                        <Tooltip />
                        <Bar dataKey="create" shape={(props) => <RoundedBar {...props} fill={fill} />} />
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
                title="Total NFT's Created"
                metric={NFTCreatedData.reduce((acc, curr) => acc + curr.create, 0).toLocaleString()}
                data={NFTCreatedData}
                fill="#778B28"
            />

            {/* TREE Circulating Card */}
            <MetricCard
                title="$TREE Circulating"
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
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    gap: '10px', 
    marginTop: '20px',
    margin: '60px'
};

const cardStyle = {
    flex: '1 1 48%', 
    padding: '10px',
    paddingTop: '50px',
    paddingBottom: '50px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box', 
    minWidth: '150px', 
};


const headerStyle = {
    marginBottom: '20px',
    textAlign: 'center',
};

export default SideBySideCards;