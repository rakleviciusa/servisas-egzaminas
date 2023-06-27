import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";
import './RegisterForm.scss'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirection, setRedirection] = useState(false)

    const navigate = useNavigate();

    const api = "http://localhost:8080/auth/register"

    const handleSubmit = (e) => {
        e.preventDefault()
        const register = {username, password}
    
        fetch(api, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(register)
        })
            .then(res => res.json())
            .then(data => {
                setRedirection(true)
                navigate('/login');
            })

            if (redirection == true){
                return redirect("/login");
            }
            return null
    }

    

  return (
    <div className='register-container'>
        
        <div className='register-form'>
            <h1>Uzsiregistruokite Serviso Vizitui</h1>
            <h4>Esate Vartotojas? Tuomet <a href="/login">Prisijunkite</a></h4>
            <div className='register-input'>
                <label htmlFor="username">Vartotojo Vardas</label>
                <input 
                    type="text" 
                    id='username'
                    placeholder='Your Username'
                    value={username} 
                    onChange={e => setUsername(e.target.value)}/>
            </div>
            <div className='register-input'>
                <label htmlFor="password">Slapyvardis</label>
                <input 
                    type="password" 
                    id='password' 
                    placeholder='Must have at least 6 characters'
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type='submit' onClick={handleSubmit}>Create an account</button>
        </div>
    </div>
  )
}

export default Register