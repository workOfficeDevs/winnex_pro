import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Volleyball, Dumbbell, Target, Zap, Gamepad2, Dice1, Coins, Spade } from "lucide-react";
const sportIcons = {
    football: Volleyball,
    basketball: Dumbbell,
    tennis: Target,
    hockey: Zap,
    esports: Gamepad2,
};
export default function Sidebar({ sports }) {
    return (_jsx("aside", { className: "w-64 bg-winnex-gray border-r border-gray-700 hidden lg:block", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider", children: "Popular Sports" }), _jsx("div", { className: "space-y-1", children: sports.map((sport) => {
                                const Icon = sportIcons[sport.slug] || Volleyball;
                                return (_jsxs(Link, { href: "/sports", className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-winnex-dark transition-colors cursor-pointer", children: [_jsx(Icon, { className: "text-winnex-orange", size: 16 }), _jsx("span", { children: sport.name }), _jsx(Badge, { variant: "secondary", className: "ml-auto bg-winnex-green text-black text-xs", children: Math.floor(Math.random() * 200) + 50 })] }, sport.id));
                            }) })] }), _jsxs("div", { className: "mt-8 space-y-2", children: [_jsx("div", { className: "text-xs font-semibold text-gray-400 uppercase tracking-wider", children: "Casino" }), _jsxs("div", { className: "space-y-1", children: [_jsxs(Link, { href: "/casino", className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-winnex-dark transition-colors cursor-pointer", children: [_jsx(Dice1, { className: "text-winnex-orange", size: 16 }), _jsx("span", { children: "Live Casino" })] }), _jsxs(Link, { href: "/casino", className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-winnex-dark transition-colors cursor-pointer", children: [_jsx(Coins, { className: "text-winnex-orange", size: 16 }), _jsx("span", { children: "Slots" })] }), _jsxs(Link, { href: "/casino", className: "flex items-center space-x-3 p-2 rounded-lg hover:bg-winnex-dark transition-colors cursor-pointer", children: [_jsx(Spade, { className: "text-winnex-orange", size: 16 }), _jsx("span", { children: "Table Games" })] })] })] })] }) }));
}
