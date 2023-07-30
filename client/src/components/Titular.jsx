import React from "react";
import '../css/Titular.css'

function Titular ({text}){

    return(
        <div className="titular"> Weather in {text}</div>
    );
}

export default Titular;