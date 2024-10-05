import React from 'react';
import ListProducts from '../../components/Catalogue/products/ListProducts.jsx';
// import Filter from '../../components/Filter/Filter.jsx';
import Footer from '../../components/Footer/Footer';
import 'animate.css';

function ProductPage() {
    return (
        <>
        
            <div id="shadow"></div>
     
            <h1 
                className='animate__animated animate__fadeInUp' 
                style={{

                backgroundColor: "blanchedalmond", 
                textAlign: 'center', 
                paddingBottom: '2rem',  
                color : '#895832', 
                height:'25vh',
                display:"flex",
                alignItems:"flex-end" ,
                justifyContent: "center"

                }}
            > 
                La Boutique | Hathyre 
            </h1>

            <p style={{width:"90%", textAlign:"center", fontSize:"18px", paddingLeft: "5%"}}>
                Découvrez notre boutique Hathyre et laissez-vous séduire par 
                notre sélection de soins naturels, conçus pour sublimer votre 
                peau _/
            </p>

            <ListProducts/>

            <Footer/>

        </>
    );
};

export default ProductPage;