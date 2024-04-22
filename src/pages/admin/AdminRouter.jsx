import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddProduct from "../../components/Dashboard/ProductDashboard/AddProduct.jsx";
import EditProduct from "../../components/Dashboard/ProductDashboard/EditProduct.jsx";
import AddUser from "../../components/Dashboard/UserDashboard/AddUser.jsx";
import EditUser from "../../components/Dashboard/UserDashboard/EditUser.jsx";
import AuthGuardRoutes from "../../Auth/AuthGuardRoutes.jsx"; // Importez le composant Guard

function AdminRouter() {
  return (
    <Routes>

      <Route path="/admin" element={<Layout/>}>
          <Route path="login" element={<AdminLogin />} />

          <Route element={<AuthGuardRoutes/>}>
          <Route path="dashboard/:id/:token" element={<Dashboard />} />
          <Route path="dashboard/product/add" element={<AddProduct />} />
          <Route path="dashboard/product/edit/:id" element={<EditProduct />} />
          <Route path="dashboard/user/add" element={<AddUser />} />
          <Route path="dashboard/user/edit/:id" element={<EditUser />} />
          </Route>
      </Route> 

    </Routes>
  );
}

export default AdminRouter;
