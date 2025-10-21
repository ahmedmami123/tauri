// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import { Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50, textAlign: 'center' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', padding: 10, marginTop: 20 }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: '100%', padding: 10, marginTop: 10 }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: 10, marginTop: 20 }}
        disabled={loading}
      >
        Login
      </button>

      <p style={{ marginTop: 15 }}>
        <Link to="/reset-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
