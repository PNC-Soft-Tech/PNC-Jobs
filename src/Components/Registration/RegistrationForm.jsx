// src/components/RegistrationForm.jsx
import { useRegisterUserMutation } from "@/redux/features/user/apiUser";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { StoreToCookies } from "@/Utils/cookie";
import { validateEmail } from "@/Utils/helper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const RegistrationForm = () => {
  const router = useRouter()
  const [
    signUp, {
      isLoading,
      data,
      isSuccess,
      error,
      isError
    }
  ] = useRegisterUserMutation();
  const dispatch = useAppDispatch()
  
  const [username, set_username] = useState('abc')
  const [fname, set_fname] = useState('abc')
  const [email, set_email] = useState('abc@gmail.com')
  const [institude, set_institude] = useState('bu')
  const [phone, set_phone] = useState('01743')
  const [division, set_division] = useState('Barishal')
  const [gender, set_gender] = useState('Male')
  const [bloodGroup, set_bloodGroup] = useState('AB+')
  const [password, set_password] = useState('123456')
  const [confirmPassword, set_confirmPassword] = useState('123456')
  const [address, set_address] = useState('Kawnia, Barishal.')


  useEffect(() => {
    console.log('signup res data: ', data)
  }, [data])
  useEffect(() => {
    if (isSuccess) {
      StoreToCookies.setUserToCookie(data?.data);
      dispatch(setUser(data?.data));
      router.replace('/');
    }
  }, [isSuccess])
  useEffect(() => {
    console.log('signup res error: ', error)
  }, [error, isError])

  const signUpHandler = async (event) => {
    event.preventDefault();

    if (!username) {
      alert('User Name required!')
      return
    }
    if (!email) {
      alert('Email Required')
      return
    }
    if (!validateEmail(email)) {
      alert('Email must be valid')
      return
    }
    if (!phone) {
      alert('Phone required')
      return
    }
    if (!password) {
      alert('Password Required')
      return
    }
    if (password.length < 6) {
      alert('Password length must contains 6 characters')
      return
    }
    if (password != confirmPassword) {
      alert('Password & Confirm Password must be equal!')
      return
    }

    const body = {
      username,
      fname,
      email,
      institude,
      phone,
      div: division,
      gender,
      bloodGroup,
      password,
      address
    }
    console.log('user signup body: ', body);

    try {
      await signUp({
        data: body,
      });
      // setErrorMsg('');
    } catch (error) {
      console.log('signup error: ', error);
    }

  };

  
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={fname}
              onChange={(e) => set_fname(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={username}
              onChange={(e) => set_username(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={email}
              onChange={(e) => set_email(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="institute"
              className="block text-sm font-medium text-gray-700"
            >
              Institute
            </label>
            <input
              type="text"
              id="institute"
              name="institute"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={institude}
              onChange={(e) => set_institude(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={phone}
              onChange={(e) => set_phone(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="division"
              className="block text-sm font-medium text-gray-700"
            >
              Division
            </label>
            <select
              id="division"
              name="division"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={division}
              onChange={(e) => set_division(e.target.value)}
            >
              <option value="">Select Division</option>
              <option value="Barisal">Barisal</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={gender}
              onChange={(e) => set_gender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="bloodGroup"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={bloodGroup}
              onChange={(e) => set_bloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={confirmPassword}
              onChange={(e) => set_confirmPassword(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={address}
              onChange={(e) => set_address(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            onClick={signUpHandler}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
