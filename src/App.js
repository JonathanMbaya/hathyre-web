import React, { useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import PublicRouter from '../src/pages/public/PublicRouter.jsx';
import AdminRouter from '../src/pages/admin/AdminRouter.jsx';
import { LoginContext } from './context/login.context.jsx';

function App() {
  // Récupérer les valeurs du contexte
  const { user, logout } = useContext(LoginContext);

  return (
    // Fournir les valeurs du contexte aux composants enfants
    <LoginContext.Provider value={{ user, logout }}>
      <PublicRouter />
      <AdminRouter />
    </LoginContext.Provider>
  );
}

export default App;
