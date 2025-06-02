import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function App() {
    const navigate = useNavigate();
  const [email, setEmail]  = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleChange = (e, setState) => {
    setState(e.target.value)
  }

 const HandleClick = async () => {
    await axios.post(
      'http://localhost:5001/api/user/register',
      { username, email, password }
    ).then((res)=> {
      console.log('Registration successful:', res.data);
     navigate('/user/register')
    }).catch((err)=> {
      alert(err.message)
    console.error('Registration failed:', err.response?.data || err.message);
    })
};


  return (
    <>
          <button 
        onClick={() => navigate('/user/register')} 
        style={{ 
          background: 'none', 
          border: 'none', 
          padding: 0, 
          color: 'blue', 
          textDecoration: 'none', 
          cursor: 'pointer',
          fontSize: '1rem',
          marginBottom: '10px'  
        }}
      >
       Go to Login
      </button>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
       <input placeholder='Enter Username' value={username} onChange={(e)=> handleChange(e, setUsername)}/><br/>
       <input placeholder='Enter Email' value={email} onChange={(e)=> handleChange(e, setEmail)}/><br/>
       <input placeholder='Enter Password' value={password} onChange={(e)=> handleChange(e, setPassword)}/><br/><br/>
       <button onClick={HandleClick} style={{border: '1px solid black', background: 'pink'}}>Click me</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
