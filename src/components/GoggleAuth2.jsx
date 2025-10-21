// src/components/GoogleAuth.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { googleLogin } from '../redux/authSlice';

const GoogleAuth2 = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            dispatch(googleLogin({ token: credentialResponse.credential }));
          }
        }}
        onError={() => alert('Google login failed')}
      />
    </div>
  );
};

export default GoogleAuth2;
