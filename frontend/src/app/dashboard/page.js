'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

// Dynamically import the Chart component from 'react-apexcharts'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: true });

export default function Dashboard() {
  // State to hold chart data and errors
  const [chartData, setChartData] = useState({
    candlestick: [],
    line: { labels: [], data: [] },
    bar: { labels: [], data: [] },
    pie: { labels: [], data: [] },
  });
  const [errors, setErrors] = useState({
    candlestick: null,
    line: null,
    bar: null,
    pie: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch chart data from API
    const fetchData = async () => {
      setLoading(true);
      const endpoints = [
        { key: 'candlestick', url: '/api/candlestick-data' },
        { key: 'line', url: '/api/line-chart-data' },
        { key: 'bar', url: '/api/bar-chart-data' },
        { key: 'pie', url: '/api/pie-chart-data' },
      ];

      const newData = { ...chartData };
      const newErrors = { ...errors };

      await Promise.all(endpoints.map(async (endpoint) => {
        try {
          const response = await axios.get(endpoint.url);
          newData[endpoint.key] = response.data;
          newErrors[endpoint.key] = null;
        } catch (error) {
          console.error(`Error fetching ${endpoint.key} data:`, error);
          newErrors[endpoint.key] = `Failed to load ${endpoint.key} data. Please try again later.`;
        }
      }));

      setChartData(newData);
      setErrors(newErrors);
      setLoading(false);
    };

    fetchData();
  }, []);

  const getChartOptions = (chartType, data) => {
    // Function to get chart options based on type
    const baseOptions = {
      chart: {
        type: chartType,
        height: 350,
      },
      xaxis: {
        type: 'category',
      },
      toolbar: { show: false, },
    };

    const formatDate = (dateStr) => {
      if (!dateStr || typeof dateStr !== 'string') {
        return '';
      }
    
      const [year, month, day] = dateStr.split('-'); 
      const date = new Date(year, month - 1, day); 
      const dayNumber = date.getDate();
    
      // Suffix for the day (1st, 2nd, 3rd, etc.)
      const suffix = (dayNumber % 10 === 1 && dayNumber !== 11) ? 'st' :
                     (dayNumber % 10 === 2 && dayNumber !== 12) ? 'nd' :
                     (dayNumber % 10 === 3 && dayNumber !== 13) ? 'rd' : 'th';
    
      const monthName = date.toLocaleString('default', { month: 'long' }); // Get month name
      const yearNumber = date.getFullYear();
    
      return `${dayNumber}${suffix} ${monthName}, ${yearNumber}`;
    };

    // Return options based on chart type
    switch (chartType) {
      case 'candlestick':
        return {
          ...baseOptions,
          title: { text: 'ASSET 1', align: 'center' },
          xaxis: {
            type: 'category',
            labels: {
              formatter: (val) => formatDate(val), 
            },
          },
        };
      case 'line':
        return {
          ...baseOptions,
          title: { text: 'ASSET 1', align: 'center' },
          xaxis: {
            categories: data.labels,
          },
          
        };
      case 'bar':
        return {
          ...baseOptions,
          title: { text: 'ASSET 1', align: 'center' },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          xaxis: {
            categories: data.labels,
          },
          
        };
      case 'pie':
        return {
          ...baseOptions,
          title: { text: 'ASSET 1', align: 'center' },
          labels: data.labels,
        };
      default:
        return baseOptions;
    }
  };

  // Function to get chart series based on type
  const getChartSeries = (chartType, data) => {
    switch (chartType) {
      case 'candlestick':
        return [{
          data: data.data.map(item => ({
            x: item.x,
            y: [item.open, item.high, item.low, item.close]
          }))
        }];
      case 'line':
        return [{ name: 'Data', data: data.data }];
      case 'bar':
        return [{ name: 'Data', data: data.data }];
      case 'pie':
        return data.data;
      default:
        return [];
    }
  };

  // Function to render a chart with options and series
  const renderChart = (chartType, data, error) => {
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }

    const options = getChartOptions(chartType, data);
    const series = getChartSeries(chartType, data);

    return (
      <Chart
        options={options}
        series={series}
        type={chartType === 'candlestick' ? 'candlestick' : chartType}
        height={350}
      />
    );
  };

  // Display loading message or the charts
  if (loading) {
    return (
      <div className="text-center mt-8">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-3xl font-bold mb-4 text-center text-white"></h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(chartData).map(([key, data]) => (
          <div key={key} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2 text-black">{key.charAt(0).toUpperCase() + key.slice(1)} Chart</h2>
            {renderChart(key === 'candlestick' ? 'candlestick' : key.replace('Chart', ''), data, errors[key])}
          </div>
        ))}
      </div>
    </div>
  );
}