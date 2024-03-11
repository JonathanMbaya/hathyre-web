import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/admin' element={<Layout />}>
                {/* Utilisation du chemin relatif pour la route de connexion */}
                <Route path='login' element={<AdminLogin />} />
                <Route path='login/dashboard' element={<Dashboard/>} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;
