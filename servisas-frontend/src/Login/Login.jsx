import React, { useContext } from 'react'
import { useState } from 'react'
import AuthContext from '../context/AuthContext'
import '../Register/RegisterForm.scss'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const {login} = useContext(AuthContext)

  const sendLoginRequest = async (e) => {
    let payload = {
      username: username,
      password: password
    }
    await login(payload)
  }

  return (
    <div className='register-container login-container'>
        <div className='form register-form'>
          <h2>Log In</h2>
            <div className='register-input'>
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='register-input'>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id='password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}/>
            </div>
            <button 
              type='submit' 
              onClick={sendLoginRequest}>
                Log in
            </button>
        </div>
    </div>
  )
}

export default Login