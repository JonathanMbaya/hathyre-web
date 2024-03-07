import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('');

  return (
    <Router>
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
    </Router>
  );
}

export default App;
