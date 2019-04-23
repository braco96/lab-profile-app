// Entry point of the React application
// Renders the App component inside the root div and wraps it with routing and auth context

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProviderWrapper } from './context/auth.context';

// Create root render using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* AuthProviderWrapper exposes authentication state to the entire app */}
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
  </BrowserRouter>
);
