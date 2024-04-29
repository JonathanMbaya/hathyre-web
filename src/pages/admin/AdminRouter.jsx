import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddProduct from "../../components/Dashboard/ProductDashboard/AddProduct.jsx";
import EditProduct from "../../components/Dashboard/ProductDashboard/EditProduct.jsx";
import AddUser from "../../components/Dashboard/UserDashboard/AddUser.jsx";
import EditUser from "../../components/Dashboard/UserDashboard/EditUser.jsx";
import { LoginContext } from '../../context/login.context.jsx';

function AdminRouter() {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect ( ()=> {
    if (!user && localStorage.getItem('token') === '') {
      navigate('/admin/login')
    }
  }, [navigate , user])

  return (
    <Routes>
      <Route path="/admin" element={<Layout />}>
        <Route path="login" element={<AdminLogin/>} />
        <Route path="dashboard/:id/:token" element={<Dashboard />} />
        <Route path="dashboard/product/add/:id/:token" element={<AddProduct />} />
        <Route path="dashboard/product/edit/:id" element={<EditProduct />} />
        <Route path="dashboard/user/add/:id/:token" element={<AddUser />} />
        <Route path="dashboard/user/edit/:id" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default AdminRouter;
