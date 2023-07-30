import React, { useEffect, useState } from 'react';
import '../css/info.css';
import { Link, useParams } from 'react-router-dom';

function InfoForDaily() {
  const { cityName } = useParams();
  const [temperatureData, setTemperatureData] = useState({});
  const [currentTemp, setCurrentTemp] = useState(null);
  const formattedData = {};
  
  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/cities/${cityName}`);
        if (!response.ok) {
          throw new Error('Error loading, server side.');
        }
        const data = await response.json();
        const today = new Date().toISOString().slice(0, 10);
        for (const key in data) {
          if (key.includes(today)) {
            formattedData[key] = data[key];
          }
        }
      
  
        setTemperatureData(formattedData);
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        setCurrentTemp(formattedData[now]?.temp ?? null);
      } catch (error) {
        console.error('Error loading, server side:', error);
      }
    };

    fetchTemperatureData();
  }, [cityName]);

  const getHighestTemperature = () => {

    let highestTemp = Number.MIN_SAFE_INTEGER;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10))) {
        const temp = tempData.temp;
        if (temp > highestTemp) {
          highestTemp = temp;
        }
      }
    }
    if (highestTemp === Number.MIN_SAFE_INTEGER) {
      highestTemp = 0;
    }
      return highestTemp;
  };

  const getLowestTemperature = () => {
 
    let lowestTemp = Number.MAX_SAFE_INTEGER;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10))) {
        const temp = tempData.temp;
        if (temp < lowestTemp) {
          lowestTemp = temp;
        }
      }
    }
    if (lowestTemp === Number.MAX_SAFE_INTEGER) {
      lowestTemp = 0;
    }
      return lowestTemp;
  };

  const getAverageDailyRH = () => {
    let totalRH = 0;
    let countRH = 0;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10)) && tempData.rh) {
        totalRH += tempData.rh;
        countRH++;
      }
    }
    if (countRH > 0) {
      return Math.round(totalRH / countRH);
    }
    return null;
  };

  const getMaxDailyWindSpeed = () => {
    if(temperatureData==null){
      return null
    }
    let maxWindSpeed = Number.MIN_SAFE_INTEGER;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10))) {
        const windSpeed = tempData.ws;
        if (windSpeed > maxWindSpeed) {
          maxWindSpeed = windSpeed;
        }
      }
    }
    if (maxWindSpeed === Number.MIN_SAFE_INTEGER) {
      maxWindSpeed = 0;
    }
    return maxWindSpeed;
  };

  const getAverageDailyWindDirection = () => {
    let totalWindDirection = 0;
    let countWindDirection = 0;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10)) && tempData.wd) {
        totalWindDirection += tempData.wd;
        countWindDirection++;
      }
    }
    if (countWindDirection > 0) {
      const averageWindDirection = totalWindDirection / countWindDirection;
      return averageWindDirection.toFixed(2);
    }
    return null;
  };

  const getDailyRainScheme = () => {
    let totalRain = 0;
    for (const [timestamp, tempData] of Object.entries(temperatureData)) {
      if (timestamp.includes(new Date().toISOString().slice(0, 10))) {
        const rain = tempData.rain;
        totalRain += rain;
      }
    }
    return totalRain.toFixed(2);
  };


  return (
    <div className="info">
    
          <button>Temperature: Max {getHighestTemperature()}°/ Min {getLowestTemperature()}°</button>
          <button>Relative Humidity: {getAverageDailyRH()}%</button>
          <button>Wind Speed: {getMaxDailyWindSpeed()} M/S</button>
          <button>Wind Direction: {getAverageDailyWindDirection()}°</button>
          <button>Rain: {getDailyRainScheme()} mm</button>

    </div>
  );
}

export default InfoForDaily;
