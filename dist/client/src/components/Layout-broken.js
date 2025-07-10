import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Trophy, Activity, Dice1, Gamepad2, Gift, Volleyball, Users, Home, User, Menu, X, Brain, Crown, Play, DollarSign, MessageCircle, Shield, Heart, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import BetSlip from "./BetSlip";
export default function Layout({ children }) {
    const { user } = useAuth();
    const [location] = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { data: balance } = useQuery({
        queryKey: ["/api/user/balance"],
        enabled: !!user,
    });
    const { data: sports } = useQuery({
        queryKey: ["/api/sports"],
    });
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownRef = useRef(null);
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const navigationGroups = [
        { name: "Home", href: "/", icon: Home, current: location === "/" },
        { name: "Dashboard", href: "/integrated-dashboard", icon: Activity, current: location === "/integrated-dashboard" },
        {
            name: "Betting",
            icon: Trophy,
            dropdown: [
                { name: "Sports", href: "/sports", icon: Volleyball, current: location === "/sports" },
                { name: "Live Betting", href: "/live", icon: Activity, current: location === "/live" },
                { name: "Fantasy Sports", href: "/fantasy-sports", icon: Trophy, current: location === "/fantasy-sports" },
                { name: "Social Betting", href: "/social-betting", icon: MessageCircle, current: location === "/social-betting" },
            ]
        },
        {
            name: "Gaming",
            icon: Dice1,
            dropdown: [
                { name: "Casino", href: "/casino", icon: Dice1, current: location === "/casino" },
                { name: "Esports", href: "/esports", icon: Gamepad2, current: location === "/esports" },
                { name: "Live Streaming", href: "/streaming", icon: Play, current: location === "/streaming" },
            ]
        },
        {
            name: "Services",
            icon: Users,
            dropdown: [
                { name: "AI Assistant", href: "/ai-assistant", icon: Brain, current: location === "/ai-assistant" },
                { name: "VIP Program", href: "/vip", icon: Crown, current: location === "/vip" },
                { name: "Payments", href: "/payments", icon: DollarSign, current: location === "/payments" },
                { name: "Promotions", href: "/promotions", icon: Gift, current: location === "/promotions" },
            ]
        },
        {
            name: "Business",
            icon: Shield,
            dropdown: [
                { name: "Affiliate Program", href: "/affiliate-program", icon: Users, current: location === "/affiliate-program" },
                { name: "Responsible Gaming", href: "/responsible-gambling", icon: Heart, current: location === "/responsible-gambling" },
                { name: "Compliance", href: "/compliance", icon: Shield, current: location === "/compliance" },
            ]
        },
    ];
    return (_jsxs("div", { className: "min-h-screen bg-winnex-dark text-white", children: [_jsx("header", { className: "bg-winnex-gray border-b border-gray-700 sticky top-0 z-50", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs("div", { className: "flex items-center space-x-8", children: [_jsxs("button", { className: "flex items-center", onClick: () => window.location.href = '/', children: [_jsx("div", { className: "w-10 h-10 mr-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-black text-lg", children: "W" }) }), _jsxs("span", { className: "text-2xl font-light text-white tracking-wide", children: ["WIN", _jsx("span", { className: "font-black text-green-400", children: "NEX" })] })] }), _jsx("nav", { className: "hidden md:flex space-x-6", children: navigationGroups.map((item) => (item.dropdown ? (_jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsxs("button", { className: `flex items-center space-x-1 transition-colors ${item.dropdown.some(sub => sub.current)
                                                        ? "text-winnex-green font-medium"
                                                        : "hover:text-winnex-green"}`, onClick: () => setOpenDropdown(openDropdown === item.name ? null : item.name), children: [_jsx(item.icon, { className: "w-4 h-4" }), _jsx("span", { children: item.name }), _jsx(ChevronDown, { className: "w-3 h-3" })] }), openDropdown === item.name && (_jsx("div", { className: "absolute top-full left-0 mt-2 w-48 bg-winnex-gray border border-gray-600 rounded-lg shadow-lg z-50", children: item.dropdown.map((subItem) => (_jsxs("button", { className: `w-full text-left flex items-center space-x-2 px-4 py-3 transition-colors hover:bg-winnex-dark cursor-pointer ${subItem.current
                                                            ? "text-winnex-green bg-winnex-dark"
                                                            : "text-gray-300"}`, onClick: () => {
                                                            window.location.href = subItem.href;
                                                            setOpenDropdown(null);
                                                        }, children: [_jsx(subItem.icon, { className: "w-4 h-4" }), _jsx("span", { children: subItem.name })] }, subItem.name))) }))] }, item.name)) : (_jsxs("button", { className: `flex items-center space-x-1 transition-colors cursor-pointer ${item.current
                                                ? "text-winnex-green font-medium"
                                                : "hover:text-winnex-green"}`, onClick: () => {
                                                window.location.href = item.href;
                                            }, children: [_jsx(item.icon, { className: "w-4 h-4" }), _jsx("span", { children: item.name })] }, item.name)))) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [user && (_jsxs("div", { className: "hidden md:flex items-center space-x-2 bg-winnex-dark px-3 py-2 rounded-lg", children: [_jsx("i", { className: "fas fa-wallet text-winnex-green" }), _jsxs("span", { children: ["$", balance?.balance || "0.00"] })] })), _jsx("button", { className: "bg-winnex-green text-black hover:bg-green-400 px-4 py-2 rounded-md font-medium transition-colors", onClick: () => window.location.href = '/deposit', children: "Deposit" }), user ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("img", { src: user.profileImageUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40`, alt: user.firstName || "User", className: "w-10 h-10 rounded-full object-cover" }), _jsx("div", { className: "hidden md:block", children: _jsxs("a", { href: "/profile", className: "text-sm hover:text-winnex-green cursor-pointer", onClick: (e) => {
                                                        e.preventDefault();
                                                        window.location.href = '/profile';
                                                    }, children: [user.firstName, " ", user.lastName] }) })] })) : (_jsx(Button, { onClick: () => window.location.href = "/api/login", variant: "outline", className: "border-winnex-green text-winnex-green hover:bg-winnex-green hover:text-black", children: "Sign In" })), _jsx(Button, { variant: "ghost", size: "sm", className: "md:hidden", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? _jsx(X, {}) : _jsx(Menu, {}) })] })] }) }) }), _jsxs("div", { className: "flex min-h-screen", children: [_jsx(Sidebar, { sports: sports || [] }), _jsx("main", { className: "flex-1 overflow-y-auto", children: children }), _jsx("div", { className: "hidden xl:block w-80", children: _jsx(BetSlip, {}) })] }), _jsxs("nav", { className: "lg:hidden fixed bottom-0 left-0 right-0 bg-winnex-gray border-t border-gray-700 px-4 py-2 z-40", children: [_jsxs("div", { className: "flex justify-around", children: [_jsxs("a", { href: "/", className: `flex flex-col items-center py-2 cursor-pointer ${location === "/" ? "text-winnex-green" : "text-gray-400"}`, onClick: (e) => {
                                    e.preventDefault();
                                    window.location.href = '/';
                                }, children: [_jsx(Home, { size: 20 }), _jsx("span", { className: "text-xs mt-1", children: "Home" })] }), _jsxs("a", { href: "/integrated-dashboard", className: `flex flex-col items-center py-2 cursor-pointer ${location === "/integrated-dashboard" ? "text-winnex-green" : "text-gray-400"}`, onClick: (e) => {
                                    e.preventDefault();
                                    window.location.href = '/integrated-dashboard';
                                }, children: [_jsx(Activity, { size: 20 }), _jsx("span", { className: "text-xs mt-1", children: "Dashboard" })] }), _jsxs("button", { className: `flex flex-col items-center py-2 ${["/sports", "/live", "/fantasy-sports", "/social-betting"].includes(location) ? "text-winnex-green" : "text-gray-400"}`, onClick: () => setOpenDropdown(openDropdown === "mobile-betting" ? null : "mobile-betting"), children: [_jsx(Trophy, { size: 20 }), _jsx("span", { className: "text-xs mt-1", children: "Betting" })] }), _jsxs("button", { className: `flex flex-col items-center py-2 ${["/casino", "/esports", "/streaming"].includes(location) ? "text-winnex-green" : "text-gray-400"}`, onClick: () => setOpenDropdown(openDropdown === "mobile-gaming" ? null : "mobile-gaming"), children: [_jsx(Dice1, { size: 20 }), _jsx("span", { className: "text-xs mt-1", children: "Gaming" })] }), _jsxs("a", { href: "/profile", className: `flex flex-col items-center py-2 cursor-pointer ${location === "/profile" ? "text-winnex-green" : "text-gray-400"}`, onClick: (e) => {
                                    e.preventDefault();
                                    window.location.href = '/profile';
                                }, children: [_jsx(User, { size: 20 }), _jsx("span", { className: "text-xs mt-1", children: "Account" })] })] }), openDropdown === "mobile-betting" && (_jsx("div", { className: "fixed bottom-16 left-0 right-0 bg-winnex-gray border-t border-gray-600 p-4 z-50", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("a", { href: "/sports", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/sports';
                                    }, children: [_jsx(Volleyball, { className: "w-5 h-5" }), _jsx("span", { children: "Sports" })] }), _jsxs("a", { href: "/live", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/live';
                                    }, children: [_jsx(Activity, { className: "w-5 h-5" }), _jsx("span", { children: "Live Betting" })] }), _jsxs("a", { href: "/fantasy-sports", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/fantasy-sports';
                                    }, children: [_jsx(Trophy, { className: "w-5 h-5" }), _jsx("span", { children: "Fantasy Sports" })] }), _jsxs("a", { href: "/social-betting", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/social-betting';
                                    }, children: [_jsx(MessageCircle, { className: "w-5 h-5" }), _jsx("span", { children: "Social Betting" })] })] }) })), openDropdown === "mobile-gaming" && (_jsx("div", { className: "fixed bottom-16 left-0 right-0 bg-winnex-gray border-t border-gray-600 p-4 z-50", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("a", { href: "/casino", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/casino';
                                    }, children: [_jsx(Dice1, { className: "w-5 h-5" }), _jsx("span", { children: "Casino" })] }), _jsxs("a", { href: "/esports", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/esports';
                                    }, children: [_jsx(Gamepad2, { className: "w-5 h-5" }), _jsx("span", { children: "Esports" })] }), _jsxs("a", { href: "/streaming", className: "flex items-center space-x-2 p-3 rounded-lg bg-winnex-dark hover:bg-gray-600 cursor-pointer", onClick: (e) => {
                                        e.preventDefault();
                                        window.location.href = '/streaming';
                                    }, children: [_jsx(Play, { className: "w-5 h-5" }), _jsx("span", { children: "Live Streaming" })] })] }) }))] }), _jsx("div", { className: "fixed bottom-20 right-4 z-50", children: _jsx(Button, { size: "lg", className: "w-14 h-14 rounded-full bg-winnex-green text-black hover:bg-green-400 shadow-lg", children: _jsx("i", { className: "fas fa-comments text-xl" }) }) })] }));
}
