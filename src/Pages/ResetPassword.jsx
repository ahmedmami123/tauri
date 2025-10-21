// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword, verifyResetCode, resetPassword } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ==================== STEP 1: SEND RESET CODE ====================
  const handleSendCode = async () => {
    if (!email) return;
    const result = await dispatch(forgotPassword({ email }));
    if (result.meta.requestStatus === 'fulfilled') setStep(2);
  };

  // ==================== STEP 2: VERIFY CODE ====================
  const handleVerifyCode = async () => {
    if (!code) return;
    const result = await dispatch(verifyResetCode({ email, code }));
    if (result.meta.requestStatus === 'fulfilled') setStep(3);
  };

  // ==================== STEP 3: RESET PASSWORD ====================
  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) return;
    if (newPassword !== confirmPassword) return;

    const result = await dispatch(resetPassword({ email, code, newPassword }));
    if (result.meta.requestStatus === 'fulfilled') navigate('/login');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Reset Password</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 20 }}
          />
          <button
            onClick={handleSendCode}
            style={{ width: '100%', padding: 10, marginTop: 20 }}
          >
            Send Code
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter code from email"
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{ width: '100%', padding: 10, marginTop: 20 }}
          />
          <button
            onClick={handleVerifyCode}
            style={{ width: '100%', padding: 10, marginTop: 20 }}
          >
            Confirm Code
          </button>
        </>
      )}

      {step === 3 && (
        <>
          {/* New Password */}
          <div style={{ position: 'relative', marginTop: 20 }}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              style={{ width: '100%', padding: 10 }}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {showNewPassword ? '🙈' : '👁️'}
            </span>
          </div>

          {/* Confirm Password */}
          <div style={{ position: 'relative', marginTop: 10 }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{ width: '100%', padding: 10 }}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button
            onClick={handleResetPassword}
            style={{ width: '100%', padding: 10, marginTop: 20 }}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
