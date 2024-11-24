import { useRef, useState, useEffect} from 'react';
import axios from 'axios';
import bwlogo from '../assests/baoswheelslogo.png';
import useAuth from '../hooks/useAuth';
import {  useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();

  const navigate = useNavigate();



  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const { token } = response.data;
      console.log('token :', token);
      alert("Login Sucessfully");
      

      // Save token in the AuthContext and localStorage
      login(token);

      setEmail('');
      setPassword('');
      navigate('/Dashboard', { replace: true });
      setLoading(false);

    } catch (err) {
      setLoading(false);
      if (!err?.response) {
        setErrMsg('No server response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email and Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current.focus();
    }
  };

  return (

        <div className='relative h-screen w-full bg-baseextra4'>
          <div className='flex flex-col h-[20vh] w-full bg-baseextra4 items-center justify-center'>
            <div className='flex h-[10vh] w-[20vw] bg-baseextra3 rounded-xl items-center justify-center cursor-default'>
              <h2 className='text-4xl font-russoone text-baseextra4 text-center'>
                Admin Login
              </h2>
            </div>
          </div>

          <div className='flex flex-col h-auto w-full bg-baseextra4 items-center justify-center'>
            <div className='w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 m-4'>
              <div className='p-6 space-y-4 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-baseextra4 md:text-2xl font-kanit'>
                  Sign in to your account
                </h1>
                {errMsg && (
                  <div
                    ref={errRef}
                    className='text-red-500 text-sm mb-4'
                  >
                    {errMsg}
                  </div>
                )}
                <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-baseextra4'
                    >
                      Email Address
                    </label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      ref={userRef} 
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      placeholder='name@company.com'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-baseextra4'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      placeholder='••••••••'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type='submit'
                    className='w-full text-white bg-baseextra4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='flex flex-col h-auto w-full bg-baseextra4 items-center justify-center rounded-b-lg mb-4'>
            <h2 className='text-sm font-kanit text-primary text-center'>
              Powered By Baos Wheels
            </h2>
            <img
              src={bwlogo}
              alt='baoslogo'
              style={{
                objectFit: 'contain',
                width: '25%',
              }}
            />
          </div>
        </div>
    
 
  );
};

export default LoginPage;
