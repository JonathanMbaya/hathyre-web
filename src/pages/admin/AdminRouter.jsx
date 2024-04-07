import React from 'react';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddProduct from '../../components/Dashboard/ProductDashboard/AddProduct.jsx';
import EditProduct from '../../components/Dashboard/ProductDashboard/EditProduct.jsx';
import AddUser from '../../components/Dashboard/UserDashboard/AddUser.jsx';
import EditUser from '../../components/Dashboard/UserDashboard/EditUser.jsx';

const AdminRouter = () => {
    return (
        <Routes>
            <Route path='/admin' element={<Layout />}>
                {/* Utilisation du chemin relatif pour la route de connexion */}
                <Route path='login' element={<AdminLogin />} />
                <Route path='dashboard' element={<Dashboard/>} />
                <Route path='dashboard/product/add' element={<AddProduct/>} />
                <Route path='dashboard/product/edit/:id' element={<EditProduct/>} />
                <Route path='dashboard/user/add' element={<AddUser/>} />
                <Route path='dashboard/user/edit/:id' element={<EditUser/>} />
            </Route>
        </Routes>
    );
};

export default AdminRouter;
