import React from 'react';
import Banner from "../../components/Banner/Banner";
// import BannerToAbout from "../../components/Banner/BannerToAbout.jsx";
import Products from '../../components/Product/Products';
import Footer from '../../components/Footer/Footer';

import Certif from '../../components/Certif/Certif.jsx';
import Instagram from '../../components/Instagram/Instagram.jsx';

  

function HomePage ({currentPage}){

    return (
        <>     
            <Products
                title ="Découvrez nos nouveautés"
            />

            <Banner
                title ="Toute la gamme de Hathyre"
                src1 = {process.env.PUBLIC_URL + "/bannerhome/5.avif"}
                src2 = {process.env.PUBLIC_URL + "/bannerhome/huile.webp"}
                src3 = {process.env.PUBLIC_URL + "/bannerhome/accessoire.avif"}
            />

            <Instagram/>

            <Certif/>

            <Footer/>
            
        </>
    );
};

export default HomePage;