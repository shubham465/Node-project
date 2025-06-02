import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
      const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

 const HandleClick = async () => {
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const response = await axios.post('http://localhost:5001/api/user/login', {
      email,
      password
    });
    console.log(response.data.accessToken)
    localStorage.setItem("token", JSON.stringify(response.data.accessToken))
    navigate('/api/contacts'); 
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed. Please try again.");
  }
};

  return (
    <>
      {/* Styled to look like a link */}
      <Link to="/">Go to Register</Link>
      <div className="card">
        <input 
          placeholder='Enter Email' 
          value={email} 
          onChange={(e) => handleChange(e, setEmail)}
        /><br />
        <input 
          placeholder='Enter Password' 
          value={password} 
          onChange={(e) => handleChange(e, setPassword)}
        /><br /><br />
        <button 
          onClick={HandleClick} 
          style={{ border: '1px solid black', background: 'pink' }}
        >
          Click me
        </button>
      </div>
    </>
  );
};

export default Register;
