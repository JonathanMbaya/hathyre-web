import React, {useState} from 'react';
import { Routes , Route } from "react-router-dom";
import Header from '../../components/Header/Header.jsx';
import HomePage from './HomePage';
import ProductPage from './ProductPage.jsx';
import AboutPage from './AboutPage.jsx';

function PublicRouter ()  {

    const [ currentPage, setCurrentPage] = useState('');
    return (

        <>
            <Header currentPage={currentPage} />

            <Routes>
                <Route
                path="/"
                element={<HomePage />}
                render={() => {
                    setCurrentPage('home');
                    return <HomePage />;
                }}
                />
                <Route
                path="/product"
                element={<ProductPage />}
                render={() => {
                    setCurrentPage('product');
                    return <ProductPage />;
                }}
                />
                <Route
                path="/apropos"
                element={<AboutPage />}
                render={() => {
                    setCurrentPage('about');
                    return <AboutPage />;
                }}
                />
                {/* Ajoutez d'autres routes au besoin. */}
            </Routes>
        </>
    );
};

export default PublicRouter;