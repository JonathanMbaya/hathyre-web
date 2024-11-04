import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY ='pk_test_51QDk8VJNZjtjPF39aaso9xJj39w0Cf81JbzgPJ9aYPYwFnANu89tS5BSQCv8cl7SMjHFtHCw4VnBJgo9M3LcCWoG00y91tPf97';
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
