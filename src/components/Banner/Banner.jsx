import React from 'react';
import { Link } from "react-router-dom";
import ButtonNice from '../Button/ButtonNice.jsx';
import './banner.css';

function Banner ({title, item1, src1 , src2, src3}) {
    return (

    <div>

        <div className='container'>
            <h2>{title}</h2>
            <p style={{width:"88%", textAlign:"justify", fontSize:"18px"}}>
                Explorez la gamme Hathyre et offrez à votre peau une expérience 
                de soin unique, alliant les bienfaits du beurre de karité à des 
                ingrédients naturels pour révéler votre beauté authentique_/
            </p>
        </div>

        <div class="parent">
            <div className="box1 div1">
                <h3>{item1}</h3>
                <img src={src1} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Savons"/>
                    </Link>
                </div>
            </div>
            
            <div className="box2 div2">
                <h3>{item1}</h3>
                <img src={src2} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Beurres et Huiles"/>
                    </Link>
                </div>
            </div>
            <div className="box2 div3">
                <h3>{item1}</h3>
                <img src={src3} alt="Strength" />
                <div className="button-up">
                    <Link to="/product">
                        <ButtonNice text="Accessoires"/>
                    </Link>
                </div>
            </div>
            <div className="box3 div4">
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