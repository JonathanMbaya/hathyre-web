import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PublicRouter from '../src/pages/public/PublicRouter.jsx';
import AdminRouter from '../src/pages/admin/AdminRouter.jsx';


function App() {

  return (
    <BrowserRouter>
      <PublicRouter/>
      <AdminRouter/>
    </BrowserRouter>

  );
}

export default App;
