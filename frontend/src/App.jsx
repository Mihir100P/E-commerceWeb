import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import Order from "./Pages/Order";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import NotFound from './Pages/NotFound';
import AdminLogin from './Pages/AdminLogin';
import AdminRegister from './Pages/AdminRegister';
import AdminHome from './Pages/AdminHome';
import AdminNew from './Pages/AdminNew';
import AdminOrder from './Pages/AdminOrder';
import AdminEdit from './Pages/AdminEdit';
import ProtectedRoute from './context/protectedRoute';

import { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [search,setSearch] = useState("");
  return (
    <>
      <Navbar setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route element={<ProtectedRoute />}>
           <Route path="/cart" element={<Cart />} />
           <Route path="/orders" element={<Order />} />
           <Route path="/admin/home" element={<AdminHome />} />
           <Route path="/admin/orders" element={<AdminOrder />} />
           <Route path="/admin/edit/:id" element={<AdminEdit />} />
           <Route path="/admin/new" element={<AdminNew />} />
        </Route>
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" />
    </>
  );
}

export default App;
