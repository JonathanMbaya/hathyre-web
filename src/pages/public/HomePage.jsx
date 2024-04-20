import React from 'react';
import Banner from "../../components/Banner/Banner";
import BannerToAbout from "../../components/Banner/BannerToAbout";
import Products from '../../components/Product/Products';
import Footer from '../../components/Footer/Footer';

  

function HomePage ({currentPage}){

    return (
        <>
            <div id="shadow"></div>
            <Products
                title ="Découvrez nos nouveautés"
            />

            <Banner
                title ="Toute la gamme de Hathyre"
                src = {process.env.PUBLIC_URL + "/present/5.png"}
            />

            <BannerToAbout
                title ="Connaître notre histoire"
                src = {process.env.PUBLIC_URL + "/present/7.png"}
            />

            <Products
                title ="Nos certifications"
            />

            <Footer/>
            
        </>
    );
};

export default HomePage;