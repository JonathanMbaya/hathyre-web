import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated to import createRoot from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './context/login.context.jsx'; // Import the provider for login context
import { CartProvider } from './context/card.context.jsx';
import { FavoritesProvider } from './context/favorites.context.jsx';
import { PurchaseProvider } from './context/purchases.context.jsx';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot here

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <FavoritesProvider>
          <PurchaseProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </PurchaseProvider>
        </FavoritesProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
