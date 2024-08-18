import React from 'react';
import { Link } from "react-router-dom";
import ButtonNice from '../Button/ButtonNice.jsx';
import './banner.css';

function Banner ({title, item1, src}) {
    return (

    <div>

        <div className='container'>
            <h2>{title}</h2>
        </div>

        <div class="parent">
            <div className="box1 div1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Savons"/>
                    </Link>
                </div>
            </div>
            
            <div className="box1 div2">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Beurres et Huiles"/>
                    </Link>
                </div>
            </div>
            <div className="box1 div3">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Accessoires"/>
                    </Link>
                </div>
            </div>
            <div className="box1 div4">
                <h3>{item1}</h3>
                {/* <img src={src} alt="Strength" /> */}
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Tous les produits"/>
                    </Link>
                </div>
            </div>
        </div>
    </div>

    );
};

export default Banner;