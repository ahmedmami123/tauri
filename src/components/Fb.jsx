// src/components/FB.jsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { facebookLogin } from '../redux/authSlice';

const Fb = () => {
  const dispatch = useDispatch();

  const handleFacebookResponse = (response) => {
    if (!response.accessToken) {
      alert('Facebook login failed!');
      return;
    }
    dispatch(facebookLogin({ accessToken: response.accessToken, userID: response.userID }));
  };

  return (
    <FacebookLogin
      appId="2556186038056525"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleFacebookResponse}
      icon="fa-facebook"
      textButton="Login with Facebook"
    />
  );
};

export default Fb;
