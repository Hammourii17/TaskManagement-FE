import React, { useState, useCallback } from 'react';
import { useLoginMutation } from '../features/api/apiSlice';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const history = useHistory();

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const userData = await login({ email, password }).unwrap();
        localStorage.setItem('token', userData.token);
        history.push('/tasks');
      } catch (err) {
        console.error('Login failed:', err);
      }
    },
    [login, history,email,password]
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {isError && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
