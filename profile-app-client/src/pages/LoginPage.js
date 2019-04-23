// Page allowing existing users to log into the application

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Access logIn function from auth context
  const { logInUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logInUser(credentials);
      navigate('/profile'); // Redirect to profile on success
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={credentials.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
