import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './page/Dashboard/Dashboard';
import Login from './page/Login/Login';
import Register from './page/Register/Register';

const App = () => {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={isLogged ? <Dashboard /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
