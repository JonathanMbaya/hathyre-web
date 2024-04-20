import React from 'react';
import { Link } from "react-router-dom";
import Buttons from "../Button/Button.jsx";
import './bannerToAbout.css';

function BannerToAbout({item1 , title, src}) {
  return (
    <div>

        <h2 style={{ textAlign: 'center' }}>{title}</h2>

        <div className="row">
            
            <div className="box1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
            </div>

            <div className="button-up">
                <Buttons text="Découvrir +"/> 
            </div>

        </div>

    </div>

  )
}

export default BannerToAbout
