import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterLogin from './Pages/RegisterLogin';
import Profile from './Pages/Profile';
import VerifyAccount from './Pages/VerifyAccount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from './Pages/ResetPassword';
import OAuthCallback from './Pages/OAuthCallback';

function App() {
  const { user } = useSelector(state => state.auth);

  // ----------------- Auto-update check -----------------
  useEffect(() => {
    async function checkUpdate() {
      try {
        const res = await fetch('https://github.com/ahmedmami123/tauri.git');
        const data = await res.json();

        const lastHash = localStorage.getItem('lastUpdateHash');

        if (lastHash !== data.hash) {
          toast.info(`Update available: ${data.message}`, { autoClose: 5000 });
          localStorage.setItem('lastUpdateHash', data.hash);
        }
      } catch (err) {
        console.error("Failed to check update:", err);
      }
    }

    checkUpdate();
  }, []);
  // ------------------------------------------------------

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
