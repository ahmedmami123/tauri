// src/pages/Profile.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50 }}>
      <h2>Welcome, {user.username || user.name}</h2>
      <p>Email: {user.email}</p>
      {user.profilePic && <img src={user.profilePic} alt="Profile" width={80} />}
      <button onClick={handleLogout} disabled={loading}>Logout</button>
    </div>
  );
};

export default Profile;
