import React from 'react';
import './certif.css';

function Certif ({title, item1,item2, item3}) {
    return (

    <div className="container">

        <h2>{title}</h2>

        <div className="row">
            <div className="box box1">
            <h3>{item1}</h3>
            <i className="fa-solid fa-circle-chevron-right"></i>
            <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Strength" />
            </div>

            <div className="box box2">
            <h3>{item2}</h3>
            <i className="fa-solid fa-circle-chevron-right"></i>
            <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Mobility" />
            </div>

            <div className="box box3">
            <h3>{item3}</h3>
            <i className="fa-solid fa-circle-chevron-right"></i>
            <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Drills" />
            </div>
        </div>
    </div>

    );
};

export default Certif;