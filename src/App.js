import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Admin from "./components/admin/admin";
import { PrivateRoute } from "./components/PrivateRoute";
import Profile from "./components/profile/profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
