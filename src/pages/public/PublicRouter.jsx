import React, {useState} from 'react';
import { Routes , Route  } from "react-router-dom";
import Header from '../../components/Header/Header.jsx';
import HomePage from './HomePage';
import ProductPage from './ProductPage.jsx';
import AboutPage from './AboutPage.jsx';
import SignUp from "../admin/Connexion/SignUp.jsx";
import AccountPage from "./AccountPage.jsx";
import SingleProductPage from './SingleProductPage.jsx';
import StripeContainer from '../../components/Stripe/StripeContainer.jsx';
import Faq from "../../components/FAQ/Faq.jsx";
import LegalMentions from "./LegalMentions.jsx";
import PolitiqueConfidentialite from './PolitiqueConfidentialite.jsx';
import TermsConditions from './TermsConditions.jsx';
import Error from './Error.jsx';
import ValidationPayment from './ValidationPayment.jsx';

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
                    path="/signup"
                    element={<SignUp/>}
                    render={() => {
                        setCurrentPage('signup');
                        return <SignUp/>;
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

                <Route
                    path="/politique-de-confidentialite"
                    element={<PolitiqueConfidentialite/>}
                    render={() => {
                        setCurrentPage('PolitiqueConfidentialite');
                        return <PolitiqueConfidentialite />;
                    }}
                />

                <Route
                    path="/conditions-ventes"
                    element={<TermsConditions/>}
                    render={() => {
                        setCurrentPage('PolitiqueConfidentialite');
                        return <TermsConditions />;
                    }}
                />

                <Route
                    path="/confirm-account"
                    element={<Error/>}
                    render={() => {
                        setCurrentPage('Error');
                        return <Error/>;
                    }}
                />


                <Route
                    path="/payment-validate/3D-secure/"
                    element={<ValidationPayment/>}
                    render={() => {
                        setCurrentPage('Error');
                        return <ValidationPayment/>;
                    }}
                />
            </Routes>
        </>
    );
};

export default PublicRouter;