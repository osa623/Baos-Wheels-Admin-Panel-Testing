import React, { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import bwlogo from '../assests/baoswheelslogo.png';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const REGISTER_URL = 'http://localhost:5000/api/users/reg';

const RegisterPage = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username:user, email, password:pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setUser('');
      setEmail('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <>
      {success ? (
        <section className='bg-primary w-full min-h-screen'>
          <h1 className='text-center font-russoone text-baseprimary'>Success!</h1>
        </section>
      ) : (
        <section className='relative h-screen md:w-full  bg-baseextra4'>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className='flex flex-col h-[20vh] w-full bg-baseextra4 items-center justify-center '>
            <div className='flex h-auto max-w-[40vw] bg-baseextra3 rounded-xl items-center justify-center cursor-default p-4'>
              <h2 className='text-2xl font-russoone text-baseextra4 text-center'>Admin Registration</h2>
            </div>
          </div>

        
          <div className='flex flex-col h-auto w-full bg-baseextra4 items-center justify-center'>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-2 sm:max-w-md xl:p-0 m-4">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-baseextra4 font-kanit">
                    Register here...!
                  </h1>
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-baseextra4">
                      User Name :
                      <FontAwesomeIcon icon={faCheck} className={`text-green-500 ${validName ? "block" : "hidden"}`} />
                      <FontAwesomeIcon icon={faTimes} className={`text-red-500 ${validName || !user ? "hidden" : "block"}`} />
                    </label>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      autoComplete="off"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="User Name"
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                   </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-baseextra4">
                      Email Address:
                      <FontAwesomeIcon icon={faCheck} className={`text-green-500 ${validEmail ? "block" : "hidden"}`} />
                      <FontAwesomeIcon icon={faTimes} className={`text-red-500 ${validEmail || !email ? "hidden" : "block"}`} />
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby="emailnote"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />{'   '}
                      Please enter a valid email address.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                      <FontAwesomeIcon icon={faCheck} className={`text-green-500 ${validPwd ? "block" : "hidden"}`} />
                      <FontAwesomeIcon icon={faTimes} className={`text-red-500 ${validPwd || !pwd ? "hidden" : "block"}`} />
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPwd(e.target.value)}
                      value={pwd}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="••••••••"
                      required
                      aria-invalid={validPwd ? "false" : "true"}
                      aria-describedby="pwdnote"
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />{' '}
                      Allowed special characters: ! @ # $ %
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm Password:
                      <FontAwesomeIcon icon = {faCheck} className={`text-green-500 ${validMatch && matchPwd ? "block" : "hidden"}`} />
                      <FontAwesomeIcon icon = {faTimes} className={`text-red-500 ${validMatch || !matchPwd ? "hidden" : "block"}`} />
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      onChange={(e) => setMatchPwd(e.target.value)}
                      value={matchPwd}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="••••••••"
                      required
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />{' '}
                      Must match the first password input field.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-baseextra4 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    disabled={!validName || !validEmail || !validPwd || !validMatch}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='flex flex-col h-auto w-full bg-baseextra4 items-center justify-center rounded-b-lg mb-4'>
            <h2 className='text-sm font-kanit text-primary text-center'>Powered By Baos Wheels</h2>
            <img src={bwlogo} alt='baoslogo' style={{ objectFit: 'contain', width: '25%' }} />
          </div>
        </section>
      )}
    </>
  );
}

export default RegisterPage;
