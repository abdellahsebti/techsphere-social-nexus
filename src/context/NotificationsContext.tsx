import React, { createContext, useContext, useState, useCallback } from "react";
import { MessageSquare, Trophy, UserPlus } from "lucide-react";

export interface Notification {
  id: number;
  type: "message" | "achievement" | "connection";
  title: string;
  content: string;
  time: string;
  read: boolean;
  icon: any;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, "id" | "read">) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "message",
      title: "New Message",
      content: "You have a new message from John Doe",
      time: "2 minutes ago",
      read: false,
      icon: MessageSquare,
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked",
      content: "You've completed the Web Development Challenge!",
      time: "1 hour ago",
      read: false,
      icon: Trophy,
    },
    {
      id: 3,
      type: "connection",
      title: "New Connection",
      content: "Jane Smith wants to connect with you",
      time: "3 hours ago",
      read: true,
      icon: UserPlus,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "read">) => {
    setNotifications((prev) => [
      {
        ...notification,
        id: Math.max(...prev.map((n) => n.id), 0) + 1,
        read: false,
      },
      ...prev,
    ]);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}; 