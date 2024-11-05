"use client"; 

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

// Dummy data
const yearData = [
    { label: 'Jan', otherUserTree: 5000, myTree: 200 },
    { label: 'Feb', otherUserTree: 8500, myTree: 150 },
    { label: 'Mar', otherUserTree: 7000, myTree: 180 },
    { label: 'Apr', otherUserTree: 5780, myTree: 220 },
    { label: 'May', otherUserTree: 4890, myTree: 170 },
    { label: 'Jun', otherUserTree: 8000, myTree: 250 },
    { label: 'Jul', otherUserTree: 4890, myTree: 210 },
    { label: 'Aug', otherUserTree: 3780, myTree: 230 },
    { label: 'Sep', otherUserTree: 7800, myTree: 190 },
    { label: 'Oct', otherUserTree: 5780, myTree: 160 },
    { label: 'Nov', otherUserTree: 4780, myTree: 140 },
    { label: 'Dec', otherUserTree: 7500, myTree: 180 },
];


const weekData = [
    { label: 'Day 1', otherUserTree: 100, myTree: 30 },
    { label: 'Day 2', otherUserTree: 200, myTree: 0 }, // No planting on this day
    { label: 'Day 3', otherUserTree: 150, myTree: 25 },
    { label: 'Day 4', otherUserTree: 300, myTree: 20 },
    { label: 'Day 5', otherUserTree: 250, myTree: 15 },
    { label: 'Day 6', otherUserTree: 400, myTree: 35 },
    { label: 'Day 7', otherUserTree: 350, myTree: 0 }, // No planting on this day
];


const monthData = [
    { label: 'Week 1', otherUserTree: 1200, myTree: 90 },
    { label: 'Week 2', otherUserTree: 1500, myTree: 110 },
    { label: 'Week 3', otherUserTree: 1700, myTree: 95 },
    { label: 'Week 4', otherUserTree: 2000, myTree: 100 },
];


const TotalTreePlanted = () => {
    const [data, setData] = useState(yearData); // Default to yearData

    const handleClick = (dataType) => {
        switch (dataType) {
            case 'week':
                setData(weekData);
                break;
            case 'month':
                setData(monthData);
                break;
            case 'year':
                setData(yearData);
                break;
            default:
                setData(yearData);
        }
    };

    // Button styles
    const buttonStyle = {
        padding: '10px 20px',
        margin: '0 10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4F3738 ',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#2b3d1d',
    };

    // Card styling
    const cardStyle = {
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        margin: '20px auto', // This centers the card and adds top and bottom margin
        maxWidth: '900px', // You can adjust this based on your layout
        marginLeft: '20px', // Left margin for spacing
        marginRight: '20px', // Right margin for spacing
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
            <div style={headerStyle}>Total Trees Planted</div>

            {/* Buttons to switch between week, month, and year */}
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4F3738'}
                    onClick={() => handleClick('week')}
                >
                    Week
                </button>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4F3738'}
                    onClick={() => handleClick('month')}
                >
                    Month
                </button>
                <button
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#4F3738'}
                    onClick={() => handleClick('year')}
                >
                    Year
                </button>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="myTree" stackId="a" fill="#A3A830" name="My Tree" />
                    <Bar dataKey="otherUserTree" stackId="a" fill="#778B28" name="Total Tree Planted" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalTreePlanted;