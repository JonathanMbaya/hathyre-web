import React, {useState} from 'react';
import { Routes , Route } from "react-router-dom";
import Header from '../../components/Header/Header.jsx';
import HomePage from './HomePage';
import ProductPage from './ProductPage.jsx';
import AboutPage from './AboutPage.jsx';
import Login from "../admin/Connexion/Login.jsx";
import AccountPage from "./AccountPage.jsx";
import SingleProductPage from './SingleProductPage.jsx';
import StripeContainer from '../../components/Stripe/StripeContainer.jsx';
import Faq from "../../components/FAQ/Faq.jsx";
import LegalMentions from "./LegalMentions.jsx";

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

                <Route
                path="/login"
                element={<Login/>}
                render={() => {
                    setCurrentPage('account');
                    return <Login/>;
                }}
                />

                <Route
                path="/account"
                element={<AccountPage />}
                render={() => {
                    setCurrentPage('account');
                    return <AccountPage/>;
                }}
                />

                <Route
                    path="/product/:id"
                    element={<SingleProductPage />}
                    render={() => {
                        setCurrentPage('SingleProductPage');
                        return <SingleProductPage />;
                    }}
                />

                <Route
                    path="/checkout"
                    element={<StripeContainer />}
                    render={() => {
                        setCurrentPage('StripeContainer');
                        return <StripeContainer />;
                    }}
                />

                <Route
                    path="/faq"
                    element={<Faq />}
                    render={() => {
                        setCurrentPage('Faq');
                        return <Faq />;
                    }}
                />

                <Route
                    path="/mentions-legales"
                    element={<LegalMentions/>}
                    render={() => {
                        setCurrentPage('LegalMentions');
                        return <LegalMentions />;
                    }}
                />

            </Routes>
        </>
    );
};

export default PublicRouter;