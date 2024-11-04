import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const MyLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getCryptoPredictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            li: "nash",
            age: 19
          })
        });
        
        if (response.ok) {
          const apiData = await response.json();
          console.log("Raw API Data:", apiData);
          
          // Transform the API data into the format recharts expects
          const formattedData = apiData.dates.map((date, index) => ({
            date: date,
            price: apiData.prices[index]
          }));
          
          console.log("Formatted Data:", formattedData);
          setChartData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', padding: '20px' }}>
      {chartData && chartData.length > 0 ? (
        <LineChart
          width={800}
          height={400}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fill: '#000' }}
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis 
            tick={{ fill: '#000' }}
            domain={['auto', 'auto']}
          />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            name="Predicted Price"
          />
        </LineChart>
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default MyLineChart;