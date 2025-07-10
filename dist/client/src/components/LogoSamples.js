import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, Crown, Gem, Star, TrendingUp, Activity } from "lucide-react";
export default function LogoSamples() {
    const logoVariations = [
        {
            id: 1,
            name: "Classic Trophy",
            description: "Traditional gaming symbol with modern styling",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx(Trophy, { className: "text-3xl text-yellow-400 mr-3" }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 2,
            name: "Lightning Strike",
            description: "High-energy design emphasizing speed and excitement",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "relative", children: [_jsx(Zap, { className: "text-3xl text-blue-400 mr-3 animate-pulse" }), _jsx("div", { className: "absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" })] }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 3,
            name: "Target Precision",
            description: "Focus on accuracy and winning strategies",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "relative", children: [_jsx(Target, { className: "text-3xl text-red-500 mr-3" }), _jsx("div", { className: "absolute inset-0 animate-spin-slow", children: _jsx("div", { className: "w-1 h-1 bg-green-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" }) })] }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 4,
            name: "Royal Crown",
            description: "Premium VIP experience with luxury appeal",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx(Crown, { className: "text-3xl text-yellow-500 mr-3 animate-bounce", style: { animationDuration: '3s' } }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-400 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 5,
            name: "Diamond Elite",
            description: "Exclusive and sophisticated design",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx(Gem, { className: "text-3xl text-cyan-400 mr-3 animate-pulse" }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 6,
            name: "Star Champion",
            description: "Achievement and success focused branding",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsxs("div", { className: "relative", children: [_jsx(Star, { className: "text-3xl text-yellow-400 mr-3 fill-current" }), _jsx("div", { className: "absolute inset-0 animate-ping", children: _jsx(Star, { className: "text-3xl text-yellow-300 opacity-20 fill-current" }) })] }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 7,
            name: "Trending Up",
            description: "Growth and success trajectory emphasis",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx(TrendingUp, { className: "text-3xl text-green-400 mr-3 animate-bounce" }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 8,
            name: "Activity Pulse",
            description: "Live action and real-time betting focus",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx(Activity, { className: "text-3xl text-pink-500 mr-3 animate-pulse" }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 9,
            name: "Custom Symbol",
            description: "Unique geometric design representing winning",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 mr-3 relative", children: _jsxs("svg", { viewBox: "0 0 40 40", className: "w-full h-full", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "winGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#10B981" }), _jsx("stop", { offset: "50%", stopColor: "#3B82F6" }), _jsx("stop", { offset: "100%", stopColor: "#8B5CF6" })] }) }), _jsx("polygon", { points: "20,2 35,15 35,25 20,38 5,25 5,15", fill: "url(#winGradient)", className: "animate-pulse" }), _jsx("text", { x: "20", y: "24", textAnchor: "middle", fill: "white", fontSize: "16", fontWeight: "bold", children: "W" })] }) }), _jsx("span", { className: "text-3xl font-black bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent", children: "WINNEX" })] }))
        },
        {
            id: 10,
            name: "Minimalist Modern",
            description: "Clean, contemporary design for universal appeal",
            component: (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-10 h-10 mr-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-black text-lg", children: "W" }) }), _jsxs("span", { className: "text-3xl font-light text-white tracking-wide", children: ["WIN", _jsx("span", { className: "font-black text-green-400", children: "NEX" })] })] }))
        }
    ];
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6", children: [_jsxs("div", { className: "mb-8 text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-4", children: "Winnex Logo Design Samples" }), _jsx("p", { className: "text-gray-400 text-lg", children: "Choose from these professionally designed logo variations" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: logoVariations.map((logo) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-105", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-white text-lg", children: logo.name }), _jsxs(Badge, { className: "bg-green-500 text-black", children: ["Sample ", logo.id] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "bg-winnex-dark p-8 rounded-lg mb-4 flex items-center justify-center min-h-[120px]", children: logo.component }), _jsx("p", { className: "text-gray-400 text-sm", children: logo.description }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsx("div", { className: "text-xs text-gray-500 mb-2", children: "Preview on different backgrounds:" }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx("div", { className: "bg-black p-2 rounded flex justify-center", children: _jsx("div", { className: "scale-50 origin-center", children: logo.component }) }), _jsx("div", { className: "bg-white p-2 rounded flex justify-center", children: _jsx("div", { className: "scale-50 origin-center", children: logo.component }) }), _jsx("div", { className: "bg-gray-800 p-2 rounded flex justify-center", children: _jsx("div", { className: "scale-50 origin-center", children: logo.component }) })] })] })] })] }, logo.id))) }), _jsx("div", { className: "mt-12", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Implementation Guide" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-gray-300 space-y-4", children: [_jsx("p", { children: "Each logo design is fully responsive and includes:" }), _jsxs("ul", { className: "list-disc list-inside space-y-2 ml-4", children: [_jsx("li", { children: "Animated elements for enhanced user engagement" }), _jsx("li", { children: "Gradient color schemes matching the Winnex brand" }), _jsx("li", { children: "Multiple size variations for different use cases" }), _jsx("li", { children: "Dark and light theme compatibility" }), _jsx("li", { children: "SVG-based graphics for crisp scaling" })] }), _jsxs("div", { className: "mt-6 p-4 bg-gray-800 rounded-lg", children: [_jsx("p", { className: "text-sm text-yellow-400 mb-2", children: "\uD83C\uDFA8 Design Recommendation:" }), _jsx("p", { className: "text-sm", children: "The \"Lightning Strike\" and \"Custom Symbol\" designs offer the best balance of modernity, uniqueness, and brand recognition for a cutting-edge betting platform." })] })] }) })] }) })] }));
}
