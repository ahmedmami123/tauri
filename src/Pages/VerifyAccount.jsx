import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, resendVerification, logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const VerifyAccount = () => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user } = useSelector(state => state.auth);

  const handleVerify = () => {
    if (!code.trim()) return alert('Please enter the verification code');
    dispatch(verifyEmail({ userId: user._id, code }));
  };

  const handleResend = () => {
    dispatch(resendVerification({ email: user.email }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Redirect to profile if verified
  useEffect(() => {
    if (user?.isVerified) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50, textAlign: 'center' }}>
      <h2>Account Verification</h2>
      <p>Please enter the verification code sent to your email.</p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '100%', padding: 10, marginTop: 20, marginBottom: 20 }}
      />
      <button
        onClick={handleVerify}
        style={{ width: '100%', padding: 10, backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', marginBottom: 10 }}
        disabled={loading}
      >
        Verify Account
      </button>
      <button
        onClick={handleResend}
        style={{ width: '100%', padding: 10, backgroundColor: '#008CBA', color: 'white', border: 'none', cursor: 'pointer', marginBottom: 10 }}
        disabled={loading}
      >
        Resend Code
      </button>
      <button
        onClick={handleLogout}
        style={{ width: '100%', padding: 10, backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
        disabled={loading}
      >
        Logout
      </button>
    </div>
  );
};

export default VerifyAccount;
