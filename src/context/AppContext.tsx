
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our context
type AppContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotification: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
};

// Create context with default values
const AppContext = createContext<AppContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
  notifications: [],
  addNotification: () => {},
  clearNotification: () => {},
  favorites: [],
  toggleFavorite: () => {},
});

// Create provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  return (
    <AppContext.Provider value={{ 
      darkMode, 
      toggleDarkMode, 
      notifications, 
      addNotification, 
      clearNotification,
      favorites,
      toggleFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Create custom hook for using the context
export const useAppContext = () => useContext(AppContext);
