import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Activity, Settings, Zap, Database, TrendingUp, AlertTriangle, Home, DollarSign, Trophy, Users, Gamepad2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export default function EnhancedNavigation() {
    const [location] = useLocation();
    const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);
    const isActive = (path) => location === path;
    const mainNavItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/sports', label: 'Sports', icon: Trophy },
        { path: '/live', label: 'Live Betting', icon: Activity },
        { path: '/casino', label: 'Casino', icon: Gamepad2 },
        { path: '/deposit', label: 'Deposit', icon: DollarSign },
        { path: '/social', label: 'Social', icon: Users },
    ];
    const monitoringItems = [
        { path: '/system-health', label: 'System Health', icon: Activity, status: 'operational' },
        { path: '/error-tracking', label: 'Error Tracking', icon: AlertTriangle, status: 'monitoring' },
        { path: '/system-diagnostics', label: 'Diagnostics', icon: Database, status: 'active' },
        { path: '/performance-optimizer', label: 'Performance', icon: Zap, status: 'optimizing' },
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'bg-green-500';
            case 'monitoring': return 'bg-blue-500';
            case 'active': return 'bg-purple-500';
            case 'optimizing': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };
    return (_jsxs("nav", { className: "bg-black/90 backdrop-blur-sm border-b border-gray-800", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsx("div", { className: "flex items-center", children: _jsx(Link, { href: "/", children: _jsxs("div", { className: "flex items-center space-x-2 cursor-pointer", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-lg", children: "W" }) }), _jsx("span", { className: "text-white font-bold text-xl", children: "Winnex Pro" }), _jsx(Badge, { className: "bg-green-500 text-white text-xs", children: "100% Operational" })] }) }) }), _jsx("div", { className: "hidden md:block", children: _jsx("div", { className: "ml-10 flex items-baseline space-x-4", children: mainNavItems.map((item) => {
                                    const Icon = item.icon;
                                    return (_jsx(Link, { href: item.path, children: _jsxs("div", { className: `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors cursor-pointer ${isActive(item.path)
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`, children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { children: item.label })] }) }, item.path));
                                }) }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(DropdownMenu, { open: isMonitoringOpen, onOpenChange: setIsMonitoringOpen, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "flex items-center space-x-2", children: [_jsx(Activity, { className: "h-4 w-4" }), _jsx("span", { className: "hidden md:block", children: "System Monitor" }), _jsx(Badge, { className: "bg-green-500 text-white", children: "98.7%" })] }) }), _jsxs(DropdownMenuContent, { className: "w-64 bg-gray-900 border-gray-700", children: [_jsx(DropdownMenuLabel, { className: "text-white", children: "System Monitoring" }), _jsx(DropdownMenuSeparator, { className: "bg-gray-700" }), monitoringItems.map((item) => {
                                                    const Icon = item.icon;
                                                    return (_jsx(Link, { href: item.path, children: _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800 cursor-pointer", onClick: () => setIsMonitoringOpen(false), children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { children: item.label })] }), _jsx("div", { className: `w-2 h-2 rounded-full ${getStatusColor(item.status)}` })] }) }) }, item.path));
                                                }), _jsx(DropdownMenuSeparator, { className: "bg-gray-700" }), _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("span", { children: "System Status" }), _jsx(Badge, { className: "bg-green-500 text-white text-xs", children: "All Systems GO" })] }) })] })] }), _jsxs("div", { className: "hidden lg:flex items-center space-x-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-1 text-green-400", children: [_jsx(Activity, { className: "h-3 w-3" }), _jsx("span", { children: "145ms" })] }), _jsxs("div", { className: "flex items-center space-x-1 text-blue-400", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: "1,247" })] }), _jsxs("div", { className: "flex items-center space-x-1 text-purple-400", children: [_jsx(TrendingUp, { className: "h-3 w-3" }), _jsx("span", { children: "99.97%" })] })] }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { className: "w-48 bg-gray-900 border-gray-700", children: [_jsx(DropdownMenuLabel, { className: "text-white", children: "Platform Settings" }), _jsx(DropdownMenuSeparator, { className: "bg-gray-700" }), _jsx(Link, { href: "/profile", children: _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800 cursor-pointer", children: "Profile Settings" }) }), _jsx(Link, { href: "/security", children: _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800 cursor-pointer", children: "Security Center" }) }), _jsx(Link, { href: "/admin", children: _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800 cursor-pointer", children: "Admin Panel" }) }), _jsx(DropdownMenuSeparator, { className: "bg-gray-700" }), _jsx(DropdownMenuItem, { className: "text-gray-300 hover:bg-gray-800", children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsx("span", { children: "Auto-Optimization" }), _jsx(Badge, { className: "bg-green-500 text-white text-xs", children: "ON" })] }) })] })] })] })] }) }), _jsx("div", { className: "md:hidden", children: _jsxs("div", { className: "px-2 pt-2 pb-3 space-y-1", children: [mainNavItems.map((item) => {
                            const Icon = item.icon;
                            return (_jsx(Link, { href: item.path, children: _jsxs("div", { className: `block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 cursor-pointer ${isActive(item.path)
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`, children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label })] }) }, item.path));
                        }), _jsxs("div", { className: "border-t border-gray-700 pt-2 mt-2", children: [_jsx("div", { className: "text-gray-400 text-sm px-3 py-1", children: "System Monitoring" }), monitoringItems.map((item) => {
                                    const Icon = item.icon;
                                    return (_jsx(Link, { href: item.path, children: _jsxs("div", { className: "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-between cursor-pointer", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "h-5 w-5" }), _jsx("span", { children: item.label })] }), _jsx("div", { className: `w-2 h-2 rounded-full ${getStatusColor(item.status)}` })] }) }, item.path));
                                })] })] }) })] }));
}
