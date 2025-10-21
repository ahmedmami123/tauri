// src/components/Register.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, message, error } = useSelector(state => state.auth);

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Show toast messages and navigate based on user state
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);

    if (user) {
      if (user.isVerified) navigate('/profile');
      else navigate('/verifyaccount');
    }
  }, [message, error, user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(registerData));
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Create a new account</h2>
      <h1>updateeeeeeeeeeeeee</h1>
      <form onSubmit={handleRegister} noValidate>
        <input
          type="text"
          placeholder="Username"
          value={registerData.username}
          onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="text" // use text instead of email to avoid browser validation
          placeholder="Email"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
