// src/components/LoginForm.jsx
import { usePostUserMutation } from '@/redux/features/user/apiUser';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { StoreToCookies } from '@/Utils/cookie';
import { getButtonStyle, getInputStyle, getLabelStyle } from '@/Utils/helper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify'

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
        // alert(errorData)
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
      console.log('login res: ', response)
    } catch (error) {
      console.log('sigin error: ', error);
    }

    // console.log('user~signin', formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="email" className={getLabelStyle()}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={getInputStyle()}
            required
            value={email}
            onChange={(e) => set_email(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className={getLabelStyle()}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={getInputStyle()}
            required
            value={password}
            onChange={(e) => set_password(e.target.value)}
          />
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className={getButtonStyle()}
            onClick={signInHandler}
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <a href="forgotpassword" className="text-indigo-600 hover:underline">
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
