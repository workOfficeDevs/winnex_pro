import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, TrendingUp, Users, Zap } from "lucide-react";
export default function PopularityHeatMap() {
    const [animatedValues, setAnimatedValues] = useState({});
    const { data: popularityData } = useQuery({
        queryKey: ['/api/games/popularity'],
        refetchInterval: 30000, // Update every 30 seconds
    });
    useEffect(() => {
        if (popularityData) {
            // Animate values on data update
            const newValues = {};
            popularityData.forEach((game) => {
                newValues[game.sport] = Math.random() * 20 + 80; // Simulate real-time changes
            });
            setAnimatedValues(newValues);
        }
    }, [popularityData]);
    const getHeatIntensity = (level) => {
        if (level >= 90)
            return 'bg-red-500/80 animate-pulse';
        if (level >= 70)
            return 'bg-orange-500/70 animate-pulse';
        if (level >= 50)
            return 'bg-yellow-500/60';
        if (level >= 30)
            return 'bg-green-500/50';
        return 'bg-blue-500/40';
    };
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return _jsx(TrendingUp, { className: "w-4 h-4 text-green-400 animate-bounce" });
            case 'down': return _jsx(TrendingUp, { className: "w-4 h-4 text-red-400 rotate-180 animate-bounce" });
            default: return _jsx(Zap, { className: "w-4 h-4 text-yellow-400" });
        }
    };
    const mockData = [
        {
            sport: "Football",
            emoji: "🏈",
            popularity: 95,
            trend: 'up',
            activeUsers: 2847,
            todayBets: 15420,
            heatLevel: 95
        },
        {
            sport: "Basketball",
            emoji: "🏀",
            popularity: 87,
            trend: 'up',
            activeUsers: 1923,
            todayBets: 8765,
            heatLevel: 87
        },
        {
            sport: "Soccer",
            emoji: "⚽",
            popularity: 92,
            trend: 'stable',
            activeUsers: 3156,
            todayBets: 12340,
            heatLevel: 92
        },
        {
            sport: "Tennis",
            emoji: "🎾",
            popularity: 74,
            trend: 'down',
            activeUsers: 987,
            todayBets: 4521,
            heatLevel: 74
        },
        {
            sport: "Baseball",
            emoji: "⚾",
            popularity: 68,
            trend: 'up',
            activeUsers: 1234,
            todayBets: 6789,
            heatLevel: 68
        },
        {
            sport: "Esports",
            emoji: "🎮",
            popularity: 89,
            trend: 'up',
            activeUsers: 2156,
            todayBets: 9876,
            heatLevel: 89
        }
    ];
    const data = popularityData || mockData;
    return (_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Flame, { className: "w-5 h-5 text-orange-500 animate-pulse" }), "Live Game Popularity Heat Map"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: data.map((game) => (_jsxs("div", { className: `relative rounded-lg p-4 ${getHeatIntensity(game.heatLevel)} 
                         hover:scale-105 transition-all duration-300 cursor-pointer`, children: [_jsx("div", { className: "absolute top-1 right-1", children: getTrendIcon(game.trend) }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-2 animate-bounce", style: { animationDelay: `${Math.random() * 2}s` }, children: game.emoji }), _jsx("div", { className: "text-white font-semibold text-sm mb-1", children: game.sport }), _jsxs("div", { className: "text-xs text-white/80 mb-2", children: [game.popularity, "% Hot"] }), _jsxs("div", { className: "space-y-1 text-xs", children: [_jsxs("div", { className: "flex items-center justify-between text-white/70", children: [_jsx(Users, { className: "w-3 h-3" }), _jsx("span", { children: game.activeUsers.toLocaleString() })] }), _jsxs("div", { className: "flex items-center justify-between text-white/70", children: [_jsx("span", { children: "\uD83D\uDCCA" }), _jsx("span", { children: game.todayBets.toLocaleString() })] })] })] }), _jsx("div", { className: "mt-3 bg-black/30 rounded-full h-2 overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-1000 ease-out", style: {
                                            width: `${animatedValues[game.sport] || game.popularity}%`,
                                            animation: 'pulse 2s infinite'
                                        } }) }), game.heatLevel >= 90 && (_jsx(Badge, { className: "absolute -top-2 -left-2 bg-red-500 text-white animate-pulse", children: "\uD83D\uDD25 HOT" }))] }, game.sport))) }), _jsxs("div", { className: "mt-6 flex flex-wrap gap-4 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-red-500 rounded" }), _jsx("span", { children: "90-100% - Extremely Hot" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-orange-500 rounded" }), _jsx("span", { children: "70-89% - Very Popular" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-yellow-500 rounded" }), _jsx("span", { children: "50-69% - Popular" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded" }), _jsx("span", { children: "30-49% - Moderate" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded" }), _jsx("span", { children: "0-29% - Low Activity" })] })] })] })] }));
}
