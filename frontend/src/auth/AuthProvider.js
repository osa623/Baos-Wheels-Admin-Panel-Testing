// src/context/AuthProvider.js
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null }); // Initialize user state

    const login = (token) => {
        setAuth({ user: true, token }); // Set user state on login
    };

    const logout = () => {
        setAuth({ user: null }); // Clear user state on logout
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
