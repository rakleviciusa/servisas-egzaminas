import React from 'react'
import {Routes, Route } from "react-router-dom";
import './App.scss'
import HomePage from "./components/HomePage"
import Navbar from "./components/Navbar"
import Login from "./Login/Login"
import Register from './Register/Register'
import AdminPage from './components/AdminPage'
import { AuthContextProvider } from './context/AuthContext';

function App() {

  return (
    <div className='container'>
      <AuthContextProvider>
        <h1 style={{ textAlign: "center" }}>SERVISAI</h1>
        <Navbar/>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path="/login" element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin' element={<AdminPage />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
