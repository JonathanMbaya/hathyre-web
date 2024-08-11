import React from "react";
import Footer from '../../components/Footer/Footer.jsx';
import SingleProduct from "../../components/Product/SingleProduct.jsx";
import 'animate.css';


function SingleProductPage({currentPage}) {

    return (
        <>

            <SingleProduct/>

            <Footer/>
        </>
    );
};

export default SingleProductPage;
