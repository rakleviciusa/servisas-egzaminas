import React, { useContext } from 'react'
import './NavbarStyle.scss'
import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext'

const Navbar = ({children}) => {

    const navigate = useNavigate()

    function hasTokenInLocalStorage() {
        return localStorage.getItem("tokens") !== null;
      }

    let userRole = ""

    if (hasTokenInLocalStorage()){

        const localStorageObj = JSON.parse(localStorage.getItem("tokens"));
        userRole = localStorageObj.user.authorities[0].authority

    }

    function removeLocalStorage(){
        localStorage.removeItem("tokens")
        location.reload();
        navigate("/")
    }

    const{user} = useContext(AuthContext)

    return (
        <nav>
            <ul className="nav-links">
                <div className="menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/register">Register</a></li>
                    {!user && <li><a href="/login">Login</a></li>}
                    {user && <li><a href="#">{user.sub}</a></li>}
                    {userRole === "ADMIN" && <li><a href="/admin">ADMIN Page</a></li>}
                    {user && <li><button onClick={removeLocalStorage} className='logout-btn'>Logout</button></li>}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar