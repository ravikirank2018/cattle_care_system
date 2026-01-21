import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Default to 'Farmer' user to bypass login
    const [user, setUser] = useState({ username: 'Farmer' });
    const [loading, setLoading] = useState(false);

    // No operational login/logout needed for open access
    const login = async () => ({ success: true });
    const register = async () => ({ success: true });
    const logout = () => { }; // Do nothing

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

