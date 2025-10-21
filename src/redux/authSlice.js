// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ==================== Helper ====================
const handleErrors = (error) => {
  const errorData = error.response?.data;
  if (errorData?.errors) {
    errorData.errors.forEach(e => toast.error(e.msg));
    return errorData.errors.map(e => e.msg).join(', ');
  } else if (errorData?.message) {
    toast.error(errorData.message);
    return errorData.message;
  } else {
    toast.error(error.message);
    return error.message;
  }
};

// ==================== REGISTER + AUTO LOGIN ====================
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
        email: userData.email,
        password: userData.password
      });
      return loginRes.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== LOGIN ====================
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== FACEBOOK LOGIN ====================
export const facebookLogin = createAsyncThunk(
  'auth/facebookLogin',
  async (fbData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/facebook-auth', fbData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== GOOGLE LOGIN ====================
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (tokenData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google-auth', tokenData);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== VERIFY EMAIL ====================
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async ({ userId, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-email', { userId, code });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== RESEND VERIFICATION ====================
export const resendVerification = createAsyncThunk(
  'auth/resendVerification',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== FORGOT PASSWORD ====================
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== VERIFY RESET CODE ====================
export const verifyResetCode = createAsyncThunk(
  'auth/verifyResetCode',
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-reset-code', { email, code });
      toast.success(response.data.message || 'Code verified successfully!');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== RESET PASSWORD ====================
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, code, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', { email, code, newPassword });
      toast.success(response.data.message || 'Password reset successfully!');
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// ==================== SLICE ====================
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success(action.payload.user.isVerified 
          ? 'Registration & login successful!' 
          : 'Registration successful! Please verify your email.'
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register';
      })

      // Login
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success(action.payload.user.isVerified 
          ? 'Login successful!' 
          : 'Login successful! Please verify your email.'
        );
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to login';
      })

      // Facebook Login
      .addCase(facebookLogin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success('Facebook login successful!');
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Facebook login failed';
      })

      // Google Login
      .addCase(googleLogin.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        toast.success('Google login successful!');
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Google login failed';
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        if (state.user) {
          state.user.isVerified = true;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
        toast.success('Account verified successfully!');
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Verification failed';
      })

      // Resend Verification
      .addCase(resendVerification.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resendVerification.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload.message);
      })
      .addCase(resendVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to resend verification code';
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(forgotPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to send reset code';
      })

      // Verify Reset Code
      .addCase(verifyResetCode.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyResetCode.fulfilled, (state) => { state.loading = false; })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Invalid reset code';
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset password';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
