import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Dashboard from './page/Dashboard/Dashboard';
import Login from './page/Login/Login';
import Register from './page/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  const isLogged = useSelector((state) => state.user.isLogged);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/login'} />} />
          <Route
            path="/login"
            element={
              <div>
                <Header />
                <Login />
                <Footer />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div>
                <Header />
                <Register />
                <Footer />
              </div>
            }
          />
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
