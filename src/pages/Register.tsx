/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormAuth from '../components/FormAuth';

import bgImage from '../assets/images/bg-register.jpg';

// Define the structure of form event target
interface FormEventTarget extends EventTarget {
  fullName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  address: HTMLInputElement;
}

// Define the props for FormAuth if necessary
interface FormAuthProps {
  handleAuth: (event: FormEvent<HTMLFormElement>) => void;
  type: string;
}

const Register: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const authRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Type casting for event target
    const { value: fullName } = (event.target as FormEventTarget).fullName;
    const { value: email } = (event.target as FormEventTarget).email;
    const { value: password } = (event.target as FormEventTarget).password;
    const { value: confirmPassword } = (event.target as FormEventTarget).confirmPassword;
    const { value: address } = (event.target as FormEventTarget).address;

    const form = new URLSearchParams();
    form.append('email', email);
    form.append('password', password);
    form.append('confirmPassword', confirmPassword);
    form.append('fullName', fullName);
    form.append('address', address);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, form.toString());
      console.log(data);

      setSuccessMessage(data.message);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'An error occurred');
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  return (
    <div className="flex m-0 p-0 h-[46rem] 2xl:h-screen">
      <div
        className="hidden sm:block sm:w-2/5 md:w-2/6 lg:w-1/4 bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="flex flex-1 items-center justify-center">
        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-green-400 rounded text-sm flex justify-center items-center font-bold ${success ? 'block' : 'hidden'}`}>
          <h1>{successMessage}</h1>
        </div>

        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-red-500 rounded text-sm flex justify-center items-center font-bold ${error ? 'block' : 'hidden'}`}>
          <h1>{errorMessage}</h1>
        </div>

        <FormAuth handleAuth={authRegister} type="Register" />
      </div>
    </div>
  );
};

export default Register;
