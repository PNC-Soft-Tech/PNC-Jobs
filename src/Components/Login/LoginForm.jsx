// src/components/LoginForm.jsx
import { usePostUserMutation } from '@/redux/features/user/apiUser';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { StoreToCookies } from '@/Utils/cookie';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const LoginForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [
    signIn,
    { isLoading, data, isSuccess, error, isError }
  ] = usePostUserMutation();

  const [email, set_email] = useState('')
  const [password, set_password] = useState('')

  useEffect(() => {
    if (isSuccess) {
      console.log('login data: ', data)
      StoreToCookies.setUserToCookie(data?.data);
      dispatch(setUser(data?.data));
      router.replace('/');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if ('data' in error && error.data) {
        const errorData = error.data;
        // setErrorMsg(errorData.message);
        alert(errorData)
      } else {
        // setErrorMsg('An unknown error occurred');
        console.error('An unknown error occurred:', error);
      }
    }
  }, [isError, error]);

  const signInHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await signIn({
        data: {
          identifier: email,
          password: password,
        },
      });
    } catch (error) {
      console.log('sigin error: ', error);
    }

    // console.log('user~signin', formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            value={email}
            onChange={(e) => set_email(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            value={password}
            onChange={(e) => set_password(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={signInHandler}
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-indigo-600 hover:underline">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
