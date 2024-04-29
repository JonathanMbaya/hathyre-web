import React from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
import PublicRouter from '../src/pages/public/PublicRouter.jsx';
import AdminRouter from '../src/pages/admin/AdminRouter.jsx';

function App() {

  return (
   <>
      <PublicRouter />
      <AdminRouter />
   </> // Fournir les valeurs du contexte aux composants enfants


  );
}

export default App;
