/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction } from '../redux/reducers/auth';
import FormAuth from '../components/FormAuth';
import Modal from '../components/Modal';

import bgImage from '../assets/images/bg-login.jpg';

// Define the structure of the Redux state
interface RootState {
  auth: {
    token: string;
  };
}

const Login: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  
  // const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const authLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    const form = new URLSearchParams();
    form.append('email', email);
    form.append('password', password);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, form.toString());
      const { token: resultToken } = data.results;

      dispatch(loginAction(resultToken));

      setSuccessMessage(`Berhasil Login.`);
      setSuccess(true);
      setIsModalOpen(true);
      setEmail(email);
      setToken(resultToken);

      // Clear the success message 
      setTimeout(() => {
        setSuccess(false);
        setSuccessMessage('');
        setIsModalOpen(false);
        navigate('/login'); 
      }, 10000);
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.response.data.message);

      // Clear the error message 
      setTimeout(() => {
        setError(false);
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className="flex m-0 p-0 h-[38rem] xl:h-screen">
      <div
        className="hidden sm:block sm:w-2/5 md:w-2/6 lg:w-1/4
        w-1/4 bg-center bg-cover" style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="relative flex flex-1 items-center justify-center">
        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-green-400 rounded text-sm flex justify-center items-center font-bold ${success ? 'block' : 'hidden'}`}>
          <h1>{successMessage}</h1>
        </div>
        <div className={`fixed top-10 py-2 px-4 bg-white shadow-md text-red-500 rounded text-sm flex justify-center items-center font-bold ${error ? 'block' : 'hidden'}`}>
          <h1>{errorMessage}</h1>
        </div>
        <FormAuth handleAuth={authLogin} type="Login" />

        <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        message={successMessage} 
        email={email}
        token={token}
        />
      </div>
    </div>
  );
};

export default Login;
