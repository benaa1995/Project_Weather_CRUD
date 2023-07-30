import { Link, useParams  } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import '../css/Temperature.css'
import BackButton from '../components/BackButton'


function Wd(){
    const { cityName } = useParams();
    const [temperatureData, setTemperatureData] = useState({});
    const [currentTemp, setCurrentTemp] = useState(null);
  
    useEffect(() => {
      const fetchTemperatureData = async () => {
        try {
          const response = await fetch(`http://localhost:3003/api/cities/${cityName}`);
          if (!response.ok) {
            throw new Error('Error loading, server side.');
          }
          const data = await response.json();
          setTemperatureData(data);
          const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
          setCurrentTemp(data[now]?.wd ?? null);
        } catch (error) {
          console.error('Error loading, server side:', error);
        }
      };
  
      fetchTemperatureData();
    }, [cityName]);
  
    return (
      <div className='temp'>
        <div>
          {Object.entries(temperatureData).map(([time, tempData]) => (
            <p key={time}>
              Time: {time}, Wind Direction: {tempData.wd}
            </p>
          ))}
        </div>
        <Link key={cityName} to={`/Hourly/${cityName}`}>
            <BackButton></BackButton>
            </Link>
      </div>
    );
  }

export default Wd;