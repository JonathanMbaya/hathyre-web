import React from 'react';
import './products.css';
import 'animate.css';

function Products ({title, item1,item2, item3, item4}) {
    return (

    <div className="container animate__animated animate__fadeInUp">

        <h2>{title}</h2>

        <div className="row">
            
            <div className="box">
                <h3>{item1}</h3>
                <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Strength" />
            </div>

            <div className="box">
                <h3>{item2}</h3>
                <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Mobility" />
            </div>

            <div className="box">
                <h3>{item3}</h3>
                <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Drills" />
            </div>

            <div className="box">
                <h3>{item4}</h3>
                <img src={process.env.PUBLIC_URL + "/img-products/baobabsoap.png"} alt="Drills" />
            </div>

        </div>
    </div>

    );
};

export default Products;