import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddProduct from '../../components/Dashboard/ProductDashboard/AddProduct.jsx';
import EditProduct from '../../components/Dashboard/ProductDashboard/EditProduct.jsx';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/admin' element={<Layout />}>
                {/* Utilisation du chemin relatif pour la route de connexion */}
                <Route path='login' element={<AdminLogin />} />
                <Route path='dashboard' element={<Dashboard/>} />
                <Route path='dashboard/product/add' element={<AddProduct/>} />
                <Route path='dashboard/product/edit/:id' element={<EditProduct/>} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;
