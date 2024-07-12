// src/components/Auth/Signup.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../features/api/apiSlice';
import { logout } from '../../features/auth/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const onSubmit = async (data) => {
    try {
      await signup(data).unwrap();
      dispatch(logout());
    } catch (err) {
      console.error('Failed to signup', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        {isError && <p className="text-red-500">{error.data}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isLoading}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
