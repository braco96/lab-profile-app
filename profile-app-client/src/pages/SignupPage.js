// Page where new users can register

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

function SignupPage() {
  // Store form values locally
  const [form, setForm] = useState({
    username: '',
    password: '',
    campus: '',
    course: ''
  });

  const navigate = useNavigate();

  // Update state when inputs change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the sign-up request to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signUp(form);
      navigate('/login'); // Redirect to login on success
    } catch (err) {
      console.error('Sign up failed', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input name="username" value={form.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Campus
          <input name="campus" value={form.campus} onChange={handleChange} />
        </label>
        <br />
        <label>
          Course
          <input name="course" value={form.course} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}

export default SignupPage;
