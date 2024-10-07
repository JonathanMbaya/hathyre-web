import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importation de React Query
import { LoginProvider } from './context/login.context.jsx';
import { CartProvider } from './context/card.context.jsx';
import { FavoritesProvider } from './context/favorites.context.jsx';
import { PurchaseProvider } from './context/purchases.context.jsx';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

const queryClient = new QueryClient(); // Création d'un nouveau QueryClient

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}> {/* Utilisation du QueryClientProvider */}
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
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
