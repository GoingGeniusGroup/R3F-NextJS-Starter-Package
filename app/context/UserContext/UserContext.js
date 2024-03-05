'use client'
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null)
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
