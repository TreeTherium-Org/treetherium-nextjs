"use client"; 

import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const formatNumber = (num) => {
    if (num >= 1_000 && num < 1_000_000) {
        return (num / 1_000).toFixed(2) + 'K';
    } else if (num >= 1_000_000 && num < 1_000_000_000) {
        return (num / 1_000_000).toFixed(2) + 'M';
    } else if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(2) + 'B';
    }
    return num;
};

// Updated dummy data with original names
const NFTCreatedData = [
    { day: 'Sunday', create: 1500 },
    { day: 'Monday', create: 2200 },
    { day: 'Tuesday', create: 1800 },
    { day: 'Wednesday', create: 2000 },
    { day: 'Thursday', create: 2500 },
    { day: 'Friday', create: 2800 },
    { day: 'Saturday', create: 3000 },
];

const TREECirculatingData = [
    { day: 'Sunday', create: 400009 },
    { day: 'Monday', create: 300080 },
    { day: 'Tuesday', create: 200900 },
    { day: 'Wednesday', create: 270900 },
    { day: 'Thursday', create: 188000 },
    { day: 'Friday', create: 230000 },
    { day: 'Saturday', create: 340800 },
];

const RoundedBar = (props) => {
    const { x, y, width, height } = props;
    const radius = 10;
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
            <div style={headerStyle}>
                <h5 style={{ fontWeight: '400' }}>{title}</h5>
                <p style={{ fontSize: '30px', margin: 0 }}>{formatNumber(metric)}</p>
            </div>
            <div style={{ height: 150 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <XAxis dataKey="day" tick={false} />
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
            <MetricCard
                title="Total NFT's Created"
                metric={NFTCreatedData.reduce((acc, curr) => acc + curr.create, 0)}
                data={NFTCreatedData}
                fill="#778B28"
            />
            <MetricCard
                title="$TREE Circulating"
                metric={TREECirculatingData.reduce((acc, curr) => acc + curr.create, 0)}
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
    gap: '13px', 
    margin: '40px 50px 0 50px',
};

const cardStyle = {
    flex: '1 1 48%', 
    padding: '10px',
    paddingTop: '50px',
    paddingBottom: '50px',
    borderRadius: '20px',
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
