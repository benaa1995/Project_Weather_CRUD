import React, { useEffect, useState } from "react";
import RegionsButton from "../components/ButtonSelect";
import Titular from "../components/Titular";
import { Link } from 'react-router-dom';

function Main(){
    
    const [cityNames, setCityNames] = useState([]);
    
    useEffect(() => {
      fetch('http://localhost:3003/api/cities')
        .then((response) => response.json())
        .then((data) => setCityNames(data))
        .catch((error) => console.error(' Error loading, server side:', error));
    }, []);
  
    return(
        <div className='buttonForRegions'>
            <Titular text={"Israel"}/>
            {cityNames.map((cityName) => (
                <Link key={cityName} to={`/select/${cityName}`}>
                <RegionsButton text={cityName} />
                </Link>
                ))}                         
        </div>
    ); 
}

export default Main;