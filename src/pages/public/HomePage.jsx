import React from 'react';
import Banner from "../../components/Banner/Banner";
// import BannerToAbout from "../../components/Banner/BannerToAbout.jsx";
import Products from '../../components/Product/Products';
import Footer from '../../components/Footer/Footer';
import Basket from "../../components/Basket/Basket.jsx";
import Certif from '../../components/Certif/Certif.jsx';
import Instagram from '../../components/Instagram/Instagram.jsx';

  

function HomePage ({currentPage}){

    return (
        <>
            <Basket/>
            
            <Products
                title ="Découvrez nos nouveautés"
            />

            <Banner
                title ="Toute la gamme de Hathyre"
                src = {process.env.PUBLIC_URL + "/present/5.png"}
            />

            <Instagram/>

            <Certif/>

            <Footer/>
            
        </>
    );
};

export default HomePage;