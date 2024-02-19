import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importez d'autres pages au besoin.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/" element={<ProductPage />} />
        {/* Ajoutez d'autres routes au besoin. */}
      </Routes>
    </Router>
  );
}

export default App;
