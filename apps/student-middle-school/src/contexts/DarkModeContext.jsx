import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const DarkModeContext = createContext();

// Custom hook to use dark mode context
export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

// Provider component
export const DarkModeProvider = ({ children }) => {
    // Initialize state from localStorage or default to false
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    // Apply dark mode class to document element
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save to localStorage
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // Toggle function
    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
