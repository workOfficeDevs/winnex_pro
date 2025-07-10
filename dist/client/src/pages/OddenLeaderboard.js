import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Crown, Star, TrendingUp, DollarSign, Target, Users, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";
import OddenNav from "@/components/OddenNav";
export default function OddenLeaderboard() {
    const [selectedPeriod, setSelectedPeriod] = useState("weekly");
    const [selectedSport, setSelectedSport] = useState("all");
    const leaderboardData = [
        {
            rank: 1,
            username: "FantasyKing",
            avatar: "👑",
            points: 2847.5,
            winnings: 12450,
            contests: 89,
            winRate: 67.4,
            badge: "Elite Player",
            tier: 'master',
            streak: 12
        },
        {
            rank: 2,
            username: "SportsGenius",
            avatar: "🧠",
            points: 2756.2,
            winnings: 11230,
            contests: 76,
            winRate: 71.1,
            badge: "Consistent Winner",
            tier: 'diamond',
            streak: 8
        },
        {
            rank: 3,
            username: "DraftMaster",
            avatar: "🎯",
            points: 2689.8,
            winnings: 10890,
            contests: 124,
            winRate: 58.9,
            badge: "Volume Expert",
            tier: 'diamond',
            streak: 5
        },
        {
            rank: 4,
            username: "SkillPlayer",
            avatar: "⚡",
            points: 2634.1,
            winnings: 9875,
            contests: 67,
            winRate: 73.1,
            badge: "High Accuracy",
            tier: 'gold',
            streak: 15
        },
        {
            rank: 5,
            username: "ProPicker",
            avatar: "🔥",
            points: 2598.4,
            winnings: 9234,
            contests: 98,
            winRate: 62.2,
            badge: null,
            tier: 'gold',
            streak: 3
        },
        {
            rank: 6,
            username: "ChampionMind",
            avatar: "🏆",
            points: 2487.6,
            winnings: 8756,
            contests: 85,
            winRate: 65.9,
            badge: "Rising Star",
            tier: 'gold',
            streak: 7
        },
        {
            rank: 7,
            username: "AnalyticsAce",
            avatar: "📊",
            points: 2423.8,
            winnings: 8234,
            contests: 112,
            winRate: 59.8,
            badge: null,
            tier: 'silver',
            streak: 2
        },
        {
            rank: 8,
            username: "WinnerCircle",
            avatar: "💫",
            points: 2376.4,
            winnings: 7890,
            contests: 73,
            winRate: 68.5,
            badge: "Clutch Player",
            tier: 'silver',
            streak: 6
        }
    ];
    const achievements = [
        {
            title: "Most Improved",
            description: "+450% win rate this month",
            username: "RookieRiser",
            icon: _jsx(TrendingUp, { className: "w-6 h-6 text-green-400" })
        },
        {
            title: "Biggest Win",
            description: "$25,000 single contest",
            username: "BigWinner99",
            icon: _jsx(DollarSign, { className: "w-6 h-6 text-yellow-400" })
        },
        {
            title: "Perfect Week",
            description: "7 wins out of 7 contests",
            username: "PerfectPicks",
            icon: _jsx(Target, { className: "w-6 h-6 text-purple-400" })
        },
        {
            title: "Longest Streak",
            description: "23 consecutive wins",
            username: "StreakMaster",
            icon: _jsx(Zap, { className: "w-6 h-6 text-orange-400" })
        }
    ];
    const getTierColor = (tier) => {
        switch (tier) {
            case 'master': return 'from-purple-500 to-pink-500';
            case 'diamond': return 'from-blue-400 to-cyan-400';
            case 'gold': return 'from-yellow-400 to-orange-400';
            case 'silver': return 'from-gray-300 to-gray-500';
            case 'bronze': return 'from-amber-600 to-amber-800';
            default: return 'from-gray-400 to-gray-600';
        }
    };
    const getTierIcon = (tier) => {
        switch (tier) {
            case 'master': return _jsx(Crown, { className: "w-5 h-5" });
            case 'diamond': return _jsx(Star, { className: "w-5 h-5" });
            case 'gold': return _jsx(Trophy, { className: "w-5 h-5" });
            case 'silver': return _jsx(Medal, { className: "w-5 h-5" });
            case 'bronze': return _jsx(Award, { className: "w-5 h-5" });
            default: return _jsx(Users, { className: "w-5 h-5" });
        }
    };
    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return _jsx(Crown, { className: "w-6 h-6 text-yellow-400" });
            case 2: return _jsx(Medal, { className: "w-6 h-6 text-gray-300" });
            case 3: return _jsx(Trophy, { className: "w-6 h-6 text-amber-600" });
            default: return _jsx("span", { className: "text-emerald-400 font-bold", children: rank });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Elite Leaderboard" }), _jsx("p", { className: "text-emerald-300", children: "Compete with the best fantasy sports players worldwide" })] }), _jsx("div", { className: "flex justify-center mt-6", children: _jsx(Tabs, { value: selectedPeriod, onValueChange: setSelectedPeriod, className: "w-auto", children: _jsxs(TabsList, { className: "bg-black/50 border border-emerald-500/30", children: [_jsx(TabsTrigger, { value: "daily", className: "data-[state=active]:bg-emerald-600", children: "Daily" }), _jsx(TabsTrigger, { value: "weekly", className: "data-[state=active]:bg-emerald-600", children: "Weekly" }), _jsx(TabsTrigger, { value: "monthly", className: "data-[state=active]:bg-emerald-600", children: "Monthly" }), _jsx(TabsTrigger, { value: "alltime", className: "data-[state=active]:bg-emerald-600", children: "All Time" })] }) }) })] }) }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6 text-center", children: "Top Performers" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 max-w-2xl mx-auto", children: [_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-center", children: _jsx(Card, { className: "bg-gradient-to-br from-gray-400 to-gray-600 border-none", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-4xl mb-2", children: leaderboardData[1].avatar }), _jsx(Medal, { className: "w-8 h-8 text-gray-300 mx-auto mb-2" }), _jsx("h3", { className: "font-bold text-white", children: leaderboardData[1].username }), _jsxs("p", { className: "text-gray-200 text-sm", children: [leaderboardData[1].points, " pts"] }), _jsxs("p", { className: "text-green-300 font-semibold", children: ["$", leaderboardData[1].winnings.toLocaleString()] })] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-center -mt-4", children: _jsx(Card, { className: "bg-gradient-to-br from-yellow-400 to-orange-500 border-none", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "text-5xl mb-3", children: leaderboardData[0].avatar }), _jsx(Crown, { className: "w-10 h-10 text-yellow-300 mx-auto mb-3" }), _jsx("h3", { className: "font-bold text-white text-lg", children: leaderboardData[0].username }), _jsxs("p", { className: "text-yellow-100", children: [leaderboardData[0].points, " pts"] }), _jsxs("p", { className: "text-green-200 font-bold text-lg", children: ["$", leaderboardData[0].winnings.toLocaleString()] }), leaderboardData[0].badge && (_jsx(Badge, { className: "bg-yellow-600 text-white mt-2", children: leaderboardData[0].badge }))] }) }) }), _jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "text-center", children: _jsx(Card, { className: "bg-gradient-to-br from-amber-600 to-amber-800 border-none", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-4xl mb-2", children: leaderboardData[2].avatar }), _jsx(Trophy, { className: "w-8 h-8 text-amber-400 mx-auto mb-2" }), _jsx("h3", { className: "font-bold text-white", children: leaderboardData[2].username }), _jsxs("p", { className: "text-amber-200 text-sm", children: [leaderboardData[2].points, " pts"] }), _jsxs("p", { className: "text-green-300 font-semibold", children: ["$", leaderboardData[2].winnings.toLocaleString()] })] }) }) })] })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Trophy, { className: "w-6 h-6 mr-2 text-emerald-400" }), "Full Leaderboard"] }) }), _jsx(CardContent, { className: "space-y-3", children: leaderboardData.map((entry, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-all", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12", children: getRankIcon(entry.rank) }), _jsx("div", { className: "text-3xl", children: entry.avatar }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-white", children: entry.username }), _jsxs("div", { className: `flex items-center space-x-1 px-2 py-1 rounded-full bg-gradient-to-r ${getTierColor(entry.tier)} text-white text-xs`, children: [getTierIcon(entry.tier), _jsx("span", { className: "capitalize", children: entry.tier })] }), entry.badge && (_jsx(Badge, { className: "bg-purple-600 text-white text-xs", children: entry.badge }))] }), _jsxs("div", { className: "flex items-center space-x-4 text-sm", children: [_jsxs("span", { className: "text-emerald-400", children: [entry.points, " points"] }), _jsxs("span", { className: "text-teal-400", children: [entry.contests, " contests"] }), _jsxs("span", { className: "text-cyan-400", children: [entry.winRate, "% win rate"] }), entry.streak > 0 && (_jsxs("span", { className: "text-orange-400", children: ["\uD83D\uDD25 ", entry.streak, " streak"] }))] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-xl font-bold text-green-400", children: ["$", entry.winnings.toLocaleString()] }), _jsx("div", { className: "text-emerald-300 text-sm", children: "Total Winnings" })] })] }, entry.username))) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Star, { className: "w-5 h-5 mr-2 text-yellow-400" }), "Weekly Achievements"] }) }), _jsx(CardContent, { className: "space-y-4", children: achievements.map((achievement, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center space-x-3 p-3 bg-black/30 rounded-lg", children: [_jsx("div", { children: achievement.icon }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white text-sm", children: achievement.title }), _jsx("p", { className: "text-emerald-300 text-xs", children: achievement.description }), _jsxs("p", { className: "text-emerald-400 text-xs", children: ["@", achievement.username] })] })] }, achievement.title))) })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Crown, { className: "w-5 h-5 mr-2 text-purple-400" }), "Player Tiers"] }) }), _jsx(CardContent, { className: "space-y-3", children: [
                                                { tier: 'master', name: 'Master', min: '2500+', color: 'from-purple-500 to-pink-500' },
                                                { tier: 'diamond', name: 'Diamond', min: '2000+', color: 'from-blue-400 to-cyan-400' },
                                                { tier: 'gold', name: 'Gold', min: '1500+', color: 'from-yellow-400 to-orange-400' },
                                                { tier: 'silver', name: 'Silver', min: '1000+', color: 'from-gray-300 to-gray-500' },
                                                { tier: 'bronze', name: 'Bronze', min: '500+', color: 'from-amber-600 to-amber-800' }
                                            ].map((tier, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${tier.color}`, children: getTierIcon(tier.tier) }), _jsx("span", { className: "text-white font-semibold", children: tier.name })] }), _jsxs("span", { className: "text-emerald-300 text-sm", children: [tier.min, " pts"] })] }, tier.tier))) })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Target, { className: "w-5 h-5 mr-2 text-teal-400" }), "Competition Stats"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-emerald-400", children: "45,789" }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Active Players" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-teal-400", children: "$2.1M" }), _jsx("div", { className: "text-teal-200 text-sm", children: "Weekly Prizes" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-cyan-400", children: "1,247" }), _jsx("div", { className: "text-cyan-200 text-sm", children: "Contests Today" })] })] })] })] })] }) })] }));
}
