import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState(null); // Added

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        setIsLoggedIn(!!token);
        setUserRole(role);
        setIsAdmin(role === "admin");
    }, []);

    const login = (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setIsLoggedIn(true);
        setUserRole(role);
        setIsAdmin(role === "admin");
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUserRole(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, userRole, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
