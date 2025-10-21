// src/pages/RegisterLogin.jsx
import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';
import Fb from '../components/fb';
import GoogleAuth2 from '../components/GoggleAuth2';



const RegisterLogin = () => {
  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <Register />
      <hr style={{ margin: '20px 0' }} />
      <Login />
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <h3>Or login with Facebook</h3>
        <Fb />
        <h3 style={{ marginTop: 20 }}>Or login with Google</h3>
        <GoogleAuth2 />
      </div>
    </div>
  );
};

export default RegisterLogin;
