import React from "react";
import { Link,useParams } from "react-router-dom";
import Titular from "../components/Titular";
import RegionsButton from "../components/ButtonSelect";
import BackButton from '../components/BackButton'
import '../css/Hourly.css'


function Hourly() {
   
   const { cityName } = useParams(); 
   
   return (
   <div className="hourly">
      <Titular text={cityName}/>

      
         <Link key={cityName} to={`/Temperature/${cityName}`}>  <RegionsButton text={'Temperature'}/></Link>
         <Link key={cityName} to={`/Rh/${cityName}`}><RegionsButton text={'Relative Humidity'}/></Link>
         <Link key={cityName} to={`/Ws/${cityName}`}><RegionsButton text={'Wind Speed'}/></Link>
         <Link key={cityName} to={`/Wd/${cityName}`}><RegionsButton text={'Wind Direction'}/></Link> 
         <Link key={cityName} to={`/Rain/${cityName}`}><RegionsButton text={'Rain'}/></Link>
         <Link key={cityName} to={`/select/${cityName}`}> <BackButton></BackButton></Link>

    </div>
    
  );
}

export default Hourly;
