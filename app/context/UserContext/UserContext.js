'use client'
import React, { createContext, useContext, useState, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        fetchUserData(decoded.id, token);
        }
    }, []);

    const fetchUserData = async (userId, token) => {
        try {
        const { data: userData } = await axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const updateUser = (token) => {
        const decoded = jwtDecode(token);
        fetchUserData(decoded.id, token);
    };
    
    const logout = () => {
        sessionStorage.setItem('token', "")
        setUser(null)
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logout }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
