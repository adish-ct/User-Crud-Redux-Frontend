// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store/store';
import './App.css';
import Login from './components/login/login';
import Register from './components/register/register';
import Admin from './components/admin/admin';
import { PrivateRoute } from './components/PrivateRoute';
import Profile from './components/profile/profile';
import EditProfile from './components/profile/EditProfile';

function App() {

  return (
    <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
