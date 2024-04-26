import React from "react";
import Footer from '../../components/Footer/Footer.jsx';
import SingleProduct from "../../components/Product/SingleProduct.jsx";
import 'animate.css';
import Basket from "../../components/Basket/Basket.jsx";




function SingleProductPage({currentPage}) {

    return (
        <>
            <Basket/>

            <SingleProduct/>

            <Footer/>
        </>
    );
};

export default SingleProductPage;
