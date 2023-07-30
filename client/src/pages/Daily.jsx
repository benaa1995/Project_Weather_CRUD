import React from "react";
import '../css/Daily.css'
import BackButton from "../components/BackButton";
import InfoForDaily from "../components/InfoForDaily";
import { Link ,useParams} from 'react-router-dom';
import Titular from "../components/Titular";


function Daily(){
   const { cityName } = useParams();


     return(
        <div className="dialy">
         <Titular text={cityName}></Titular>
        <InfoForDaily></InfoForDaily>
        <Link key={cityName} to={`/select/${cityName}`}> <BackButton></BackButton></Link>
        </div>
     );
}

export default Daily;