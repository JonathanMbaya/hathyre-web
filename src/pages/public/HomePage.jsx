import React from 'react';
// import BannerCatalogue from '../../components/Catalogue/BannerProduct/banner-catalogue.jsx';
// import BannerAbout from '../../components/Catalogue/BannerProduct/banner-about';
import Certif from '../../components/Certif/Certif';
import Footer from '../../components/Footer/Footer';

  
  
  
  

function HomePage ({currentPage}){

    return (
        <>

            <Certif
                title ="Découvrez nos nouveautés"
            />

            <Certif
                title ="Tous nos produits"
            />

            {/* <Certif
                title ="Découvrez l'histoire des produits Hathyre
                et les secrets de nos fabrications"
            /> */}

            {/* <BannerAbout/> */}

            <Certif
                title ="Nos certifications"
            />

            <Footer/>
            
        </>
    );
};

export default HomePage;