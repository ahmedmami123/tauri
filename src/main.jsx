// src/main.jsx أو src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store  from './redux/store.js';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <GoogleOAuthProvider clientId="805555498761-cuag31kkmppuhcqtlj9jgbsbiion2q18.apps.googleusercontent.com">
          <BrowserRouter>
<App />
          </BrowserRouter>
      
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);
