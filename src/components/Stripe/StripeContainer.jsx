import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY ='pk_test_51PFebILEHh2o4MgiZRVOwf0yvjOK8C5uN1ysHCBanVxGoi3ts9YJ3mVDFuqWKsP7arENteb286YTY3o4LqvX68co00PLkFQnEE';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
    

    return (
        <>
            <h1 style={{textAlign: 'center', marginTop: '10vh'}}>Récapitulatif de votre commande</h1>
            <Elements stripe={stripeTestPromise}>
                <CheckoutForm/> 
            </Elements>
        </>

    )
}

export default StripeContainer;
