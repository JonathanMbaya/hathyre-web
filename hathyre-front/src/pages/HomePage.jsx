import React from 'react';
import TextHome from '../components/TextHome/TextHome';
import Catalogue from '../components/Catalogue/BannerProduct/catalogue.jsx';
import Certif from '../components/Certif/Certif';
import Footer from '../components/Footer/Footer';


function HomePage ({currentPage}){

    return (
        <>

            <TextHome/>

            <div className='title container'>
                <h3> Nos gammes de produits  | HATHYRE </h3>
            </div>

            <Catalogue/>

            <div className='title container'>
                <h3> Nos certifications</h3>
            </div>

            <Certif/>

            <Footer/>
            
        </>
    );
};

export default HomePage;