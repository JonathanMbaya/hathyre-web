import React from 'react';
import ListProducts from '../../components/Catalogue/products/ListProducts.jsx';
// import Filter from '../../components/Filter/Filter.jsx';
import Footer from '../../components/Footer/Footer';
import 'animate.css';

function ProductPage() {
    return (
        <>
        
            <div id="shadow"></div>
     
            <h1 className='animate__animated animate__fadeInUp' style={{ textAlign: 'center', marginBottom: '2rem',  color : '#895832', marginTop:'30vh'  }}> 
                La Boutique | Hathyre 
            </h1>

            {/* <Filter/> */}

            <ListProducts/>

            <Footer/>

        </>
    );
};

export default ProductPage;