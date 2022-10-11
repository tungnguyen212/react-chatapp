import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import User from '../assets/user.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      //Create user
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Yohoo Chat</span>
        <img src={User} alt='User' className='user-img' />
        <form className='form' onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>Sign in</button>
        </form>
        <p>
          You don't have an account? <NavLink to='/register'>Register</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
