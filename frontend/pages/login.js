import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useRouter } from 'next/router';
import API from '../utils/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });

      // Save token to localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect to chat page
      router.push('/chat');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
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
      <Button type="submit">Login</Button>
      <p>
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </form>
  );
};

export default LoginPage;
