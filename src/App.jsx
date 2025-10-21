import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterLogin from './Pages/RegisterLogin';
import Profile from './Pages/Profile';
import VerifyAccount from './Pages/VerifyAccount';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Pages/ResetPassword';
import OAuthCallback from './Pages/OAuthCallback';

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <div>
  <Routes>
        <Route 
          path="/" 
          element={
            !user ? <Navigate to="/registerlogin" /> : 
            !user.isVerified ? <Navigate to="/verifyaccount" /> :
            <Profile />
          } 
        />
        <Route 
          path="/registerlogin" 
          element={
            user && user.isVerified ? <Navigate to="/" /> : <RegisterLogin />
          } 
        />
        <Route 
          path="/verifyaccount" 
          element={
            !user ? <Navigate to="/registerlogin" /> : 
            user.isVerified ? <Navigate to="/" /> : 
            <VerifyAccount />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
         <Route path="/reset-password" element={<ResetPassword />} />
                 <Route path="/oauth-callback" element={<OAuthCallback />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
