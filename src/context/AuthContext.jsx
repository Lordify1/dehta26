import { createContext, useContext, useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"

const AuthContext = createContext(null);

export const AuthProvider = ({children, auth}) => {
    
    return(
        <AuthContext.Provider
        value={{ user: auth?.user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)