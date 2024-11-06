// src/components/RegistrationForm.jsx
import { useRegisterUserMutation } from "@/redux/features/user/apiUser";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { StoreToCookies } from "@/Utils/cookie";
import { getButtonStyle, getInputStyle, getLabelStyle, validateEmail } from "@/Utils/helper";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ToastCont from "../ToastCont";
import { toast } from "react-toastify";

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
      setTimeout(() => router.replace('/'), 3000);
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
        data: {
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
      },
    }
    
    console.log('user signup body: ', body);

    toast.promise(
      signUp(body)
        .then((res) => {
          if (res.error) {
            throw new Error(res?.error?.data?.message || 'Request failed')
          }
          return res
        }),
      {
        pending: "Submitted. Please wait...",
        success: {
          render: ({ data }) => data.data.message
        },
        error: {
          render: ({ data }) => data.message || "Something went wrong. Please try again."
        },
      }
    )
  };
  
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <ToastCont />
      <h2 className="text-2xl font-bold text-center mb-6">Registration Form</h2>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className={getLabelStyle()}
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={getInputStyle()}
              value={fname}
              onChange={(e) => set_fname(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className={getLabelStyle()}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={getInputStyle()}
              value={username}
              onChange={(e) => set_username(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={getLabelStyle()}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={getInputStyle()}
              value={email}
              onChange={(e) => set_email(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="institute"
              className={getLabelStyle()}
            >
              Institute
            </label>
            <input
              type="text"
              id="institute"
              name="institute"
              className={getInputStyle()}
              value={institude}
              onChange={(e) => set_institude(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className={getLabelStyle()}
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={getInputStyle()}
              value={phone}
              onChange={(e) => set_phone(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="division"
              className={getLabelStyle()}
            >
              Division
            </label>
            <select
              id="division"
              name="division"
              className={getInputStyle()}
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
              className={getLabelStyle()}
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={getInputStyle()}
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
              className={getLabelStyle()}
            >
              Blood Group
            </label>
            <select
              id="bloodGroup"
              name="bloodGroup"
              className={getInputStyle()}
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
              className={getLabelStyle()}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={getInputStyle()}
              value={password}
              onChange={(e) => set_password(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className={getLabelStyle()}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={getInputStyle()}
              value={confirmPassword}
              onChange={(e) => set_confirmPassword(e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className={getLabelStyle()}
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className={getInputStyle()}
              value={address}
              onChange={(e) => set_address(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className={getButtonStyle()}
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
