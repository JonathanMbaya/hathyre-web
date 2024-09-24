import React from 'react';
import PublicRouter from './pages/public/PublicRouter.jsx';
import AdminRouter from './pages/admin/AdminRouter.jsx';

function App() {
  return (
    <>
    
    
    {/* Route pour les pages publiques */}
    <PublicRouter/>

    {/* Route pour les pages administratives */}
    <AdminRouter/>



    </>
    
    
  );
}

export default App;
