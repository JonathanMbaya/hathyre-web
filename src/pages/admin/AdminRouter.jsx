import React, { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "./Layout";
import AdminLogin from "./Connexion/AdminLogin.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AddProduct from "../../components/Dashboard/ProductDashboard/AddProduct.jsx";
import EditProduct from "../../components/Dashboard/ProductDashboard/EditProduct.jsx";
import AddUser from "../../components/Dashboard/UserDashboard/AddUser.jsx";
import EditUser from "../../components/Dashboard/UserDashboard/EditUser.jsx";
import { LoginContext } from '../../context/login.context.jsx';


function AdminRouter() {
  const { userConnected } = useContext(LoginContext);

  // Route protégée par l'authentification
  function PrivateRoute({ userConnected }) {
    return userConnected ? <Outlet /> : <Navigate to="/admin/login" /> ;  // Redirection si non authentifié
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/admin/login');
  //   }
  // }, [navigate]);

  return (
    <Routes>
      {/* Route de connexion */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Routes pour l'administration */}
      <Route path="/admin/dashboard" element={<Layout />}>
        {/* Routes protégées */}
        <Route element={<PrivateRoute userConnected={userConnected} />}>
          <Route path="" element={<Dashboard />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="product/edit/:id" element={<EditProduct />} />
          <Route path="user/add" element={<AddUser />} />
          <Route path="user/edit/:id" element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRouter;
