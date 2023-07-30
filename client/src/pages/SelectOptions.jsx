import React from "react";
import RegionsButton from "../components/ButtonSelect";
import Titular from "../components/Titular";
import '../css/select.css'
import BackButton from "../components/BackButton";
import { Link, useParams  } from 'react-router-dom';

function Select(){
    const { cityName } = useParams();

    return(
        <div className="select">
            <Titular text={cityName}/>
            <Link key={cityName} to={`/Daily/${cityName}`}><RegionsButton text={'Daily Information'}/></Link>
            <Link key={cityName} to={`/Hourly/${cityName}`}><RegionsButton text={'Hourly Information'}/></Link>
            <Link key={cityName} to={`/DB/${cityName}`}><RegionsButton text={'Edit DB'}/></Link>
            <Link to="/">
            <BackButton></BackButton>
            </Link>
            

        </div>
    );
}

export default Select;