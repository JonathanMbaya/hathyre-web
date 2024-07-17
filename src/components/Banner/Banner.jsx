import React from 'react';
import { Link } from "react-router-dom";
import ButtonNice from '../Button/ButtonNice.jsx';
import './banner.css';

function Banner ({title, item1, src}) {
    return (

    <div className='block-catalogue'>


        <h1 style={{ textAlign: 'center' }}>{title}</h1>

        {/* <div className="row">
            
            <div className="box1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
            </div>


            <div className="button-up">
                <Link to="/product">
                    <ButtonNice text="Découvrir +"/>
                </Link>
            </div>


        </div> */}

        <div class="parent">
            <div className="box1 div1">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Savon"/>
                    </Link>
                </div>
            </div>
            
            <div className="box1 div2">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Crème"/>
                    </Link>
                </div>
            </div>
            <div className="box1 div3">
                <h3>{item1}</h3>
                <img src={src} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Acessoires"/>
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