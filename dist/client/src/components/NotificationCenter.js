import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, X, Check, AlertCircle, Gift, Trophy } from "lucide-react";
export default function NotificationCenter() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: notifications = [] } = useQuery({
        queryKey: ["/api/notifications"],
    });
    const unreadCount = notifications.filter((n) => !n.read).length;
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'bet_settled':
                return _jsx(Trophy, { className: "text-winnex-green", size: 20 });
            case 'promotion':
                return _jsx(Gift, { className: "text-winnex-orange", size: 20 });
            case 'match_starting':
                return _jsx(AlertCircle, { className: "text-winnex-blue", size: 20 });
            default:
                return _jsx(Bell, { className: "text-white", size: 20 });
        }
    };
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        return `${days}d ago`;
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setIsOpen(!isOpen), className: "relative p-3 glass-hover rounded-xl transition-all duration-300", children: [_jsx(Bell, { size: 20, className: "text-white" }), unreadCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse", children: unreadCount }))] }), isOpen && (_jsxs("div", { className: "absolute right-0 top-full mt-2 w-96 max-h-96 overflow-y-auto card-modern z-50", children: [_jsxs("div", { className: "p-4 border-b border-white/10 flex items-center justify-between", children: [_jsx("h3", { className: "font-bold text-lg", children: "Notifications" }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-white/60 hover:text-white", children: _jsx(X, { size: 16 }) })] }), _jsx("div", { className: "max-h-80 overflow-y-auto", children: notifications.length === 0 ? (_jsxs("div", { className: "p-8 text-center text-white/60", children: [_jsx(Bell, { className: "mx-auto mb-3", size: 24 }), _jsx("p", { children: "No notifications yet" })] })) : (notifications.map((notification) => (_jsx("div", { className: `p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${!notification.read ? 'bg-winnex-green/10' : ''}`, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "mt-1", children: getNotificationIcon(notification.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-sm truncate", children: notification.title }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-xs text-white/60", children: formatTime(notification.createdAt) }), !notification.read && (_jsx("div", { className: "w-2 h-2 bg-winnex-green rounded-full" }))] })] }), _jsx("p", { className: "text-sm text-white/70 mt-1", children: notification.message })] })] }) }, notification.id)))) }), notifications.length > 0 && unreadCount > 0 && (_jsx("div", { className: "p-4 border-t border-white/10", children: _jsxs("button", { className: "btn-secondary w-full text-sm", children: [_jsx(Check, { size: 16, className: "mr-2" }), "Mark All as Read"] }) }))] }))] }));
}
