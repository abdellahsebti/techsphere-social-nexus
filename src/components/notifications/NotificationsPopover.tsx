import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, MessageSquare, Trophy, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/context/NotificationsContext";

const NotificationItem = ({ notification }) => {
  const Icon = notification.icon;
  const { markAsRead } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onClick={() => !notification.read && markAsRead(notification.id)}
      className={`flex items-start gap-4 p-4 rounded-lg transition-colors cursor-pointer ${
        notification.read
          ? "bg-muted/50 hover:bg-muted"
          : "bg-tech-blue/5 hover:bg-tech-blue/10"
      }`}
    >
      <div
        className={`p-2 rounded-full ${
          notification.read ? "bg-muted" : "bg-tech-blue/10"
        }`}
      >
        <Icon
          className={`h-5 w-5 ${
            notification.read ? "text-muted-foreground" : "text-tech-blue"
          }`}
        />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium leading-none">{notification.title}</p>
          <span className="text-xs text-muted-foreground">{notification.time}</span>
        </div>
        <p className="text-sm text-muted-foreground">{notification.content}</p>
      </div>
      {!notification.read && (
        <Badge variant="secondary" className="bg-tech-blue/10 text-tech-blue">
          New
        </Badge>
      )}
    </motion.div>
  );
};

const NotificationsPopover = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-muted"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-tech-blue text-white text-xs flex items-center justify-center"
            >
              {unreadCount}
            </motion.div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-tech-blue hover:text-tech-purple"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full text-tech-blue hover:text-tech-purple"
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover; 