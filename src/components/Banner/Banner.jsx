import React from 'react';
import { Link } from "react-router-dom";
import ButtonNice from '../Button/ButtonNice.jsx';
import './banner.css';

function Banner ({title, item1, src}) {
    return (

    <div>


        <h2 style={{ textAlign: 'center' }}>{title}</h2>

        <div className="row">
            
            <div className="box1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
            </div>


            <div className="button-up">
                <Link to="/product">
                    <ButtonNice text="Découvrir +"/>
                </Link>
            </div>



            

        </div>

    </div>

    );
};

export default Banner;