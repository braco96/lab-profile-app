// Context used to share authentication state across components

import React, { useState, useEffect } from 'react';
import authService from '../services/auth.service';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  // Store authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Store the JWT token in localStorage for persistence
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  // Remove token from storage
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // Validate token with server and update user state
  const authenticateUser = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await authService.verifyToken(token);
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(response.data);
      } catch (err) {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  // Wrapper for login that stores token and authenticates user
  const logInUser = async (credentials) => {
    const response = await authService.logIn(credentials);
    storeToken(response.data.authToken);
    await authenticateUser();
  };

  // Log out by removing token and updating state
  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []); // run once on mount

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, logInUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
