import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('cattle_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { username, password });
            if (res.data.success) {
                const userData = { username: res.data.username }; // Adjust if backend sends full user object
                const token = res.data.token;

                setUser(userData);
                localStorage.setItem('cattle_user', JSON.stringify(userData));
                if (token) localStorage.setItem('cattle_token', token);

                return { success: true };
            }
        } catch (error) {
            console.error("Login Error", error);
            return {
                success: false,
                error: error.response?.data?.error || "Login Failed"
            };
        }
    };

    const register = async (username, password) => {
        try {
            await axios.post('http://127.0.0.1:5000/api/auth/register', { username, password });
            return await login(username, password);
        } catch (error) {
            console.error("Registration Error", error);
            return {
                success: false,
                error: error.response?.data?.error || "Registration Failed"
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cattle_user');
        localStorage.removeItem('cattle_token');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
