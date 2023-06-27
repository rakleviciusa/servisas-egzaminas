import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(() => {
        if(localStorage.getItem("tokens")){
            let tokenData = JSON.parse(localStorage.getItem("tokens")) 
            let accessToken = jwt_decode(tokenData.jwt)
            return accessToken
        }
        return null
    })
    const navigate = useNavigate()

    const login = async(payload) => {
        const apiResponse = await axios.post(
            "http://localhost:8080/auth/login", 
            payload
        )
        let accessToken = jwt_decode(apiResponse.data.jwt)
        setUser(accessToken)
        localStorage.setItem("tokens", JSON.stringify(apiResponse.data))
        navigate("/")
    }

    return <AuthContext.Provider value={{login, user}}>{children}</AuthContext.Provider>
}

export default AuthContext