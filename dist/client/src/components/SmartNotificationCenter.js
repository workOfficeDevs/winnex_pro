import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff, TrendingUp, Target, AlertTriangle, DollarSign, Trophy, Zap, Mail, MessageSquare, Smartphone, Settings, Clock, Filter } from 'lucide-react';
export default function SmartNotificationCenter() {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState([]);
    const [notificationRules, setNotificationRules] = useState([]);
    const [globalSettings, setGlobalSettings] = useState({
        email: true,
        sms: true,
        push: true,
        inApp: true
    });
    const [activeTab, setActiveTab] = useState('notifications');
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        // Generate realistic notifications
        const generateNotifications = () => [
            {
                id: '1',
                type: 'bet_recommendation',
                priority: 'high',
                title: 'High-Value Bet Opportunity',
                message: 'Lakers vs Celtics Over 220.5 points has 15% edge based on AI analysis',
                timestamp: new Date(Date.now() - 5 * 60 * 1000),
                read: false,
                actionRequired: true,
                category: 'AI Predictions',
                metadata: {
                    odds: 1.95,
                    sport: 'Basketball',
                    match: 'Lakers vs Celtics'
                },
                actions: {
                    primary: { label: 'Place Bet', action: 'place_bet' },
                    secondary: { label: 'View Analysis', action: 'view_analysis' }
                }
            },
            {
                id: '2',
                type: 'price_alert',
                priority: 'medium',
                title: 'Bitcoin Price Alert',
                message: 'BTC reached your target price of $43,500. Consider your position.',
                timestamp: new Date(Date.now() - 15 * 60 * 1000),
                read: false,
                actionRequired: false,
                category: 'Price Alerts',
                metadata: {
                    amount: 43500,
                    currency: 'BTC'
                }
            },
            {
                id: '3',
                type: 'win',
                priority: 'high',
                title: 'Congratulations! You Won!',
                message: 'Your bet on Chiefs -3.5 won! $250.50 has been credited to your account.',
                timestamp: new Date(Date.now() - 30 * 60 * 1000),
                read: true,
                actionRequired: false,
                category: 'Winnings',
                metadata: {
                    amount: 250.50,
                    sport: 'Football',
                    match: 'Chiefs vs Bills'
                }
            },
            {
                id: '4',
                type: 'cashout',
                priority: 'urgent',
                title: 'Cash Out Opportunity',
                message: 'Your Arsenal bet has 89% win probability. Secure $180 profit now?',
                timestamp: new Date(Date.now() - 2 * 60 * 1000),
                read: false,
                actionRequired: true,
                category: 'Cash Out',
                metadata: {
                    amount: 180,
                    sport: 'Soccer',
                    match: 'Arsenal vs Chelsea'
                },
                actions: {
                    primary: { label: 'Cash Out Now', action: 'cash_out' },
                    secondary: { label: 'Let It Ride', action: 'dismiss' }
                }
            },
            {
                id: '5',
                type: 'promotion',
                priority: 'medium',
                title: 'VIP Upgrade Available',
                message: 'Complete 3 more bets to unlock VIP status with exclusive benefits!',
                timestamp: new Date(Date.now() - 45 * 60 * 1000),
                read: false,
                actionRequired: false,
                category: 'Promotions',
                actions: {
                    primary: { label: 'View VIP Benefits', action: 'view_vip' },
                    secondary: { label: 'Dismiss', action: 'dismiss' }
                }
            },
            {
                id: '6',
                type: 'security',
                priority: 'high',
                title: 'New Device Login',
                message: 'Someone logged into your account from a new device in London, UK.',
                timestamp: new Date(Date.now() - 60 * 60 * 1000),
                read: true,
                actionRequired: true,
                category: 'Security',
                actions: {
                    primary: { label: 'Secure Account', action: 'security_check' },
                    secondary: { label: 'It Was Me', action: 'confirm_login' }
                }
            }
        ];
        const generateRules = () => [
            {
                id: '1',
                name: 'High-Value Betting Opportunities',
                condition: 'AI confidence > 85% AND expected value > 10%',
                enabled: true,
                channels: { email: true, sms: true, push: true, inApp: true },
                priority: 'high'
            },
            {
                id: '2',
                name: 'Price Alerts for Crypto Holdings',
                condition: 'Crypto price change > 5% in 24h',
                enabled: true,
                channels: { email: true, sms: false, push: true, inApp: true },
                priority: 'medium'
            },
            {
                id: '3',
                name: 'Winning Notifications',
                condition: 'Bet result = win AND amount > $50',
                enabled: true,
                channels: { email: true, sms: true, push: true, inApp: true },
                priority: 'high'
            },
            {
                id: '4',
                name: 'Cash Out Recommendations',
                condition: 'Win probability > 80% AND potential profit > $100',
                enabled: true,
                channels: { email: false, sms: true, push: true, inApp: true },
                priority: 'urgent'
            },
            {
                id: '5',
                name: 'Security Alerts',
                condition: 'Suspicious activity OR new device login',
                enabled: true,
                channels: { email: true, sms: true, push: true, inApp: true },
                priority: 'urgent'
            },
            {
                id: '6',
                name: 'VIP and Promotional Offers',
                condition: 'User eligible for upgrade OR special promotion available',
                enabled: true,
                channels: { email: true, sms: false, push: false, inApp: true },
                priority: 'low'
            }
        ];
        setNotifications(generateNotifications());
        setNotificationRules(generateRules());
    }, []);
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-100 border-red-300 text-red-800';
            case 'high': return 'bg-orange-100 border-orange-300 text-orange-800';
            case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            default: return 'bg-blue-100 border-blue-300 text-blue-800';
        }
    };
    const getPriorityIcon = (type) => {
        switch (type) {
            case 'bet_recommendation': return _jsx(Target, { className: "h-4 w-4" });
            case 'price_alert': return _jsx(TrendingUp, { className: "h-4 w-4" });
            case 'promotion': return _jsx(Zap, { className: "h-4 w-4" });
            case 'security': return _jsx(AlertTriangle, { className: "h-4 w-4" });
            case 'win': return _jsx(Trophy, { className: "h-4 w-4" });
            case 'cashout': return _jsx(DollarSign, { className: "h-4 w-4" });
            default: return _jsx(Bell, { className: "h-4 w-4" });
        }
    };
    const markAsRead = (id) => {
        setNotifications(prev => prev.map(notif => notif.id === id ? { ...notif, read: true } : notif));
    };
    const handleAction = (action, notificationId) => {
        switch (action) {
            case 'place_bet':
                toast({ title: "Redirecting to bet placement...", description: "Opening bet slip" });
                break;
            case 'cash_out':
                toast({ title: "Cash out successful!", description: "Your winnings have been secured" });
                break;
            case 'view_analysis':
                toast({ title: "Opening AI analysis...", description: "Detailed prediction data" });
                break;
            case 'security_check':
                toast({ title: "Security review initiated", description: "Checking account activity" });
                break;
            default:
                toast({ title: "Action completed", description: "Your request has been processed" });
        }
        markAsRead(notificationId);
    };
    const toggleRule = (ruleId) => {
        setNotificationRules(prev => prev.map(rule => rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule));
    };
    const updateRuleChannels = (ruleId, channel, enabled) => {
        setNotificationRules(prev => prev.map(rule => rule.id === ruleId
            ? { ...rule, channels: { ...rule.channels, [channel]: enabled } }
            : rule));
    };
    const filteredNotifications = notifications.filter(notif => {
        if (filter === 'unread')
            return !notif.read;
        if (filter === 'high')
            return notif.priority === 'high' || notif.priority === 'urgent';
        if (filter === 'medium')
            return notif.priority === 'medium';
        if (filter === 'low')
            return notif.priority === 'low';
        return true;
    });
    const unreadCount = notifications.filter(n => !n.read).length;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("h1", { className: "text-4xl font-bold text-white", children: "Notification Center" }), unreadCount > 0 && (_jsxs(Badge, { variant: "destructive", className: "px-3 py-1", children: [unreadCount, " unread"] }))] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2", children: [_jsx("option", { value: "all", children: "All Notifications" }), _jsx("option", { value: "unread", children: "Unread Only" }), _jsx("option", { value: "high", children: "High Priority" }), _jsx("option", { value: "medium", children: "Medium Priority" }), _jsx("option", { value: "low", children: "Low Priority" })] }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-black/40 border-gray-700", children: [_jsxs(TabsTrigger, { value: "notifications", className: "text-white", children: [_jsx(Bell, { className: "h-4 w-4 mr-2" }), "Notifications"] }), _jsxs(TabsTrigger, { value: "rules", className: "text-white", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Smart Rules"] }), _jsxs(TabsTrigger, { value: "settings", className: "text-white", children: [_jsx(Smartphone, { className: "h-4 w-4 mr-2" }), "Preferences"] })] }), _jsx(TabsContent, { value: "notifications", children: _jsx("div", { className: "space-y-4", children: filteredNotifications.length === 0 ? (_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx(BellOff, { className: "h-12 w-12 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-white mb-2", children: "No notifications" }), _jsx("p", { className: "text-gray-400", children: "You're all caught up! No new notifications at the moment." })] }) })) : (filteredNotifications.map((notification) => (_jsx(Card, { className: `border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-blue-50/10 border-blue-300' : 'bg-black/40 border-gray-700'}`, children: _jsx(CardContent, { className: "p-4", children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex items-start space-x-3 flex-1", children: [_jsx("div", { className: `p-2 rounded-lg ${getPriorityColor(notification.priority)}`, children: getPriorityIcon(notification.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "font-semibold text-white", children: notification.title }), !notification.read && (_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" })), _jsx(Badge, { variant: "outline", className: "text-xs", children: notification.category })] }), _jsx("p", { className: "text-gray-300 mb-2", children: notification.message }), notification.metadata && (_jsxs("div", { className: "flex items-center space-x-4 text-sm text-gray-400 mb-3", children: [notification.metadata.sport && (_jsxs("span", { children: ["Sport: ", notification.metadata.sport] })), notification.metadata.amount && (_jsxs("span", { children: ["Amount: $", notification.metadata.amount] })), notification.metadata.odds && (_jsxs("span", { children: ["Odds: ", notification.metadata.odds] }))] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-400", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsx("span", { children: notification.timestamp.toLocaleTimeString() })] }), notification.actions && (_jsxs("div", { className: "flex space-x-2", children: [notification.actions.secondary && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => handleAction(notification.actions.secondary.action, notification.id), children: notification.actions.secondary.label })), notification.actions.primary && (_jsx(Button, { size: "sm", onClick: () => handleAction(notification.actions.primary.action, notification.id), children: notification.actions.primary.label }))] }))] })] })] }) }) }) }, notification.id)))) }) }), _jsx(TabsContent, { value: "rules", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Smart Notification Rules" }), _jsx(CardDescription, { className: "text-gray-400", children: "Configure automated notifications based on AI analysis and market conditions" })] }) }), notificationRules.map((rule) => (_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Switch, { checked: rule.enabled, onCheckedChange: () => toggleRule(rule.id) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white", children: rule.name }), _jsx("p", { className: "text-sm text-gray-400", children: rule.condition })] })] }), _jsx(Badge, { variant: "outline", className: getPriorityColor(rule.priority), children: rule.priority })] }), _jsxs("div", { className: "grid grid-cols-4 gap-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Mail, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-300", children: "Email" }), _jsx(Switch, { checked: rule.channels.email, onCheckedChange: (checked) => updateRuleChannels(rule.id, 'email', checked), disabled: !rule.enabled })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(MessageSquare, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-300", children: "SMS" }), _jsx(Switch, { checked: rule.channels.sms, onCheckedChange: (checked) => updateRuleChannels(rule.id, 'sms', checked), disabled: !rule.enabled })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Smartphone, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-300", children: "Push" }), _jsx(Switch, { checked: rule.channels.push, onCheckedChange: (checked) => updateRuleChannels(rule.id, 'push', checked), disabled: !rule.enabled })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Bell, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "text-sm text-gray-300", children: "In-App" }), _jsx(Switch, { checked: rule.channels.inApp, onCheckedChange: (checked) => updateRuleChannels(rule.id, 'inApp', checked), disabled: !rule.enabled })] })] })] }) }, rule.id)))] }) }), _jsx(TabsContent, { value: "settings", children: _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Global Notification Preferences" }), _jsx(CardDescription, { className: "text-gray-400", children: "Master controls for all notification channels" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Mail, { className: "h-5 w-5 text-blue-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "Email Notifications" }), _jsx("p", { className: "text-sm text-gray-400", children: "Receive detailed notifications via email" })] })] }), _jsx(Switch, { checked: globalSettings.email, onCheckedChange: (checked) => setGlobalSettings(prev => ({ ...prev, email: checked })) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MessageSquare, { className: "h-5 w-5 text-green-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "SMS Notifications" }), _jsx("p", { className: "text-sm text-gray-400", children: "Urgent alerts via text message" })] })] }), _jsx(Switch, { checked: globalSettings.sms, onCheckedChange: (checked) => setGlobalSettings(prev => ({ ...prev, sms: checked })) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Smartphone, { className: "h-5 w-5 text-purple-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "Push Notifications" }), _jsx("p", { className: "text-sm text-gray-400", children: "Real-time alerts on your device" })] })] }), _jsx(Switch, { checked: globalSettings.push, onCheckedChange: (checked) => setGlobalSettings(prev => ({ ...prev, push: checked })) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Bell, { className: "h-5 w-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "In-App Notifications" }), _jsx("p", { className: "text-sm text-gray-400", children: "Notifications within the platform" })] })] }), _jsx(Switch, { checked: globalSettings.inApp, onCheckedChange: (checked) => setGlobalSettings(prev => ({ ...prev, inApp: checked })) })] })] })] }) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Notification Schedule" }), _jsx(CardDescription, { className: "text-gray-400", children: "Set quiet hours and frequency limits" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Quiet Hours Start" }), _jsx("input", { type: "time", defaultValue: "22:00", className: "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Quiet Hours End" }), _jsx("input", { type: "time", defaultValue: "08:00", className: "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-white mb-2", children: "Maximum Notifications Per Hour" }), _jsxs("select", { className: "w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white", children: [_jsx("option", { value: "unlimited", children: "Unlimited" }), _jsx("option", { value: "10", children: "10 notifications" }), _jsx("option", { value: "5", children: "5 notifications" }), _jsx("option", { value: "3", children: "3 notifications" }), _jsx("option", { value: "1", children: "1 notification" })] })] })] })] })] }) })] })] }) }));
}
