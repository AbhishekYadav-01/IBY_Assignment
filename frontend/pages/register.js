import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useRouter } from 'next/router';
import API from '../utils/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post('/auth/register', { username, email, password });
  
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
  
      // Redirect to chat page
      router.push('/chat');
    } catch (error) {
      // Safely access error message
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
  
      console.error('Registration failed:', errorMessage);
      alert(`Registration failed: ${errorMessage}`);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">Register</Button>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </form>
  );
};

export default RegisterPage;
