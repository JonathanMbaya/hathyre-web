import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
// Importez d'autres pages au besoin.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        {/* Ajoutez d'autres routes au besoin. */}
      </Routes>
    </Router>
  );
}

export default App;
