import React from 'react';
import { Link } from "react-router-dom";
import Buttons from "../Button/Button.jsx";
import './banner.css';

function Banner ({title, item1, src}) {
    return (

    <div>

        {/* <svg className='background-t2' xmlns="http://www.w3.org/2000/svg" width="275" height="419" viewBox="0 0 275 419" fill="none">
            <path d="M274.648 144.331C265.066 98.2731 87.557 28.9195 0 0V419C95.542 346.635 284.231 190.389 274.648 144.331Z" fill="#EACD9A" fill-opacity="0.47"/>
        </svg> */}

        <h2 style={{ textAlign: 'center' }}>{title}</h2>

        <div className="row">
            
            <div className="box1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
            </div>


            <div className="button-up">
                <Link to="/product">
                    <Buttons text="Découvrir +"/> 
                </Link>
            </div>



            

        </div>

    </div>

    );
};

export default Banner;