import React from 'react';
import ListProducts from '../../components/Catalogue/products/ListProducts.jsx';
// import Filter from '../../components/Filter/Filter.jsx';
import Footer from '../../components/Footer/Footer';
import Basket from "../../components/Basket/Basket.jsx";
import 'animate.css';

function ProductPage() {
    return (
        <>
            <Basket/>
        
            <div id="shadow"></div>
     
            <h1 className='animate__animated animate__fadeInUp' style={{ textAlign: 'center', marginBottom: '10rem', marginTop: '1rem', color : '#895832'  }}> 
                La Boutique | Hathyre 
            </h1>

            {/* <Filter/> */}

            <ListProducts/>

            <Footer/>

        </>
    );
};

export default ProductPage;