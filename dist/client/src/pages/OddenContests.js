import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, Clock, Search, Filter, Star, Target, Crown, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import OddenNav from "@/components/OddenNav";
export default function OddenContests() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSport, setSelectedSport] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const contests = [
        {
            id: 1,
            name: "NFL Sunday Showdown",
            sport: "Football",
            type: "GPP",
            entryFee: 25,
            prizePool: 50000,
            participants: 1847,
            maxEntries: 5000,
            timeLeft: "2h 15m",
            difficulty: "Beginner",
            guaranteed: true,
            featured: true
        },
        {
            id: 2,
            name: "NBA Championship Special",
            sport: "Basketball",
            type: "Tournament",
            entryFee: 50,
            prizePool: 100000,
            participants: 1234,
            maxEntries: 2000,
            timeLeft: "4h 32m",
            difficulty: "Expert",
            guaranteed: true,
            featured: true
        },
        {
            id: 3,
            name: "Premier League Fantasy",
            sport: "Soccer",
            type: "Head-to-Head",
            entryFee: 10,
            prizePool: 18,
            participants: 1,
            maxEntries: 2,
            timeLeft: "1d 6h",
            difficulty: "Intermediate",
            guaranteed: false,
            featured: false
        },
        {
            id: 4,
            name: "MLB Diamond Challenge",
            sport: "Baseball",
            type: "50/50",
            entryFee: 5,
            prizePool: 4500,
            participants: 456,
            maxEntries: 1000,
            timeLeft: "3h 45m",
            difficulty: "Beginner",
            guaranteed: true,
            featured: false
        },
        {
            id: 5,
            name: "NHL Ice Breaker",
            sport: "Hockey",
            type: "GPP",
            entryFee: 15,
            prizePool: 15000,
            participants: 678,
            maxEntries: 1500,
            timeLeft: "5h 12m",
            difficulty: "Intermediate",
            guaranteed: true,
            featured: false
        },
        {
            id: 6,
            name: "Tennis Grand Slam",
            sport: "Tennis",
            type: "Tournament",
            entryFee: 30,
            prizePool: 25000,
            participants: 234,
            maxEntries: 800,
            timeLeft: "2d 14h",
            difficulty: "Expert",
            guaranteed: false,
            featured: false
        }
    ];
    const filteredContests = contests.filter(contest => {
        const matchesSearch = contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contest.sport.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = selectedSport === "all" || contest.sport === selectedSport;
        const matchesType = selectedType === "all" || contest.type === selectedType;
        return matchesSearch && matchesSport && matchesType;
    });
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-600';
            case 'Intermediate': return 'bg-yellow-600';
            case 'Expert': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'GPP': return _jsx(Trophy, { className: "w-4 h-4" });
            case 'Tournament': return _jsx(Crown, { className: "w-4 h-4" });
            case 'Head-to-Head': return _jsx(Target, { className: "w-4 h-4" });
            case '50/50': return _jsx(TrendingUp, { className: "w-4 h-4" });
            default: return _jsx(Star, { className: "w-4 h-4" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-6", children: [_jsx("h1", { className: "text-3xl font-bold text-white", children: "Fantasy Contests" }), _jsxs("nav", { className: "hidden md:flex space-x-6", children: [_jsx("button", { className: "text-emerald-400 hover:text-emerald-300 font-medium", children: "All Contests" }), _jsx("button", { className: "text-emerald-200 hover:text-emerald-300 font-medium", children: "My Entries" }), _jsx("button", { className: "text-emerald-200 hover:text-emerald-300 font-medium", children: "Live Scoring" }), _jsx("button", { className: "text-emerald-200 hover:text-emerald-300 font-medium", children: "Results" })] })] }), _jsxs(Button, { className: "bg-emerald-600 hover:bg-emerald-700", children: [_jsx(Crown, { className: "w-4 h-4 mr-2" }), "Create Contest"] })] }) }) }), _jsx("section", { className: "py-6 bg-black/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 min-w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search contests...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-black/50 border-emerald-500/30 text-white placeholder-emerald-300" })] }), _jsxs("select", { value: selectedSport, onChange: (e) => setSelectedSport(e.target.value), className: "bg-black/50 border border-emerald-500/30 text-white px-4 py-2 rounded-md", children: [_jsx("option", { value: "all", children: "All Sports" }), _jsx("option", { value: "Football", children: "Football" }), _jsx("option", { value: "Basketball", children: "Basketball" }), _jsx("option", { value: "Baseball", children: "Baseball" }), _jsx("option", { value: "Soccer", children: "Soccer" }), _jsx("option", { value: "Hockey", children: "Hockey" }), _jsx("option", { value: "Tennis", children: "Tennis" })] }), _jsxs("select", { value: selectedType, onChange: (e) => setSelectedType(e.target.value), className: "bg-black/50 border border-emerald-500/30 text-white px-4 py-2 rounded-md", children: [_jsx("option", { value: "all", children: "All Types" }), _jsx("option", { value: "GPP", children: "GPP" }), _jsx("option", { value: "Tournament", children: "Tournament" }), _jsx("option", { value: "Head-to-Head", children: "Head-to-Head" }), _jsx("option", { value: "50/50", children: "50/50" })] }), _jsxs(Button, { variant: "outline", className: "border-emerald-500 text-emerald-400", children: [_jsx(Filter, { className: "w-4 h-4 mr-2" }), "More Filters"] })] }) }) }), _jsx("section", { className: "py-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("h2", { className: "text-2xl font-bold text-white mb-6 flex items-center", children: [_jsx(Star, { className: "w-6 h-6 text-yellow-400 mr-2" }), "Featured Contests"] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8", children: filteredContests.filter(c => c.featured).map((contest, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, children: _jsxs(Card, { className: "bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border-emerald-400/50 hover:border-emerald-300 transition-all", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { className: `${getDifficultyColor(contest.difficulty)} text-white`, children: contest.difficulty }), _jsxs(Badge, { className: "bg-emerald-600 text-white flex items-center", children: [getTypeIcon(contest.type), _jsx("span", { className: "ml-1", children: contest.type })] }), contest.guaranteed && (_jsxs(Badge, { className: "bg-yellow-600 text-black", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "Guaranteed"] }))] }), _jsxs("div", { className: "flex items-center text-emerald-400", children: [_jsx(Clock, { className: "w-4 h-4 mr-1" }), _jsx("span", { className: "text-sm font-semibold", children: contest.timeLeft })] })] }), _jsx(CardTitle, { className: "text-white text-xl", children: contest.name }), _jsx("div", { className: "text-emerald-300", children: contest.sport })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: ["$", contest.prizePool.toLocaleString()] }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Total Prizes" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-teal-400", children: ["$", contest.entryFee] }), _jsx("div", { className: "text-teal-200 text-sm", children: "Entry Fee" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-cyan-400", children: contest.participants }), _jsx("div", { className: "text-cyan-200 text-sm", children: "Entries" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-emerald-200", children: "Progress" }), _jsxs("span", { className: "text-white", children: [contest.participants.toLocaleString(), "/", contest.maxEntries.toLocaleString()] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-3", children: _jsx("div", { className: "bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full", style: { width: `${Math.min((contest.participants / contest.maxEntries) * 100, 100)}%` } }) })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsxs(Button, { className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2" }), "Enter Contest"] }), _jsx(Button, { variant: "outline", className: "border-emerald-400 text-emerald-400", children: "View Details" })] })] })] }) }, contest.id))) })] }) }), _jsx("section", { className: "py-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "All Contests" }), _jsxs("div", { className: "text-emerald-300", children: [filteredContests.length, " contests found"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredContests.filter(c => !c.featured).map((contest, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, children: _jsxs(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all h-full", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(Badge, { className: `${getDifficultyColor(contest.difficulty)} text-white text-xs`, children: contest.difficulty }), _jsxs("div", { className: "flex items-center text-emerald-400 text-sm", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), contest.timeLeft] })] }), _jsx(CardTitle, { className: "text-white text-lg", children: contest.name }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300 text-sm", children: contest.sport }), _jsxs("div", { className: "flex items-center text-emerald-400 text-sm", children: [getTypeIcon(contest.type), _jsx("span", { className: "ml-1", children: contest.type })] })] })] }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-emerald-400", children: ["$", contest.prizePool.toLocaleString()] }), _jsx("div", { className: "text-emerald-200 text-xs", children: "Prizes" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-teal-400", children: ["$", contest.entryFee] }), _jsx("div", { className: "text-teal-200 text-xs", children: "Entry" })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-emerald-200", children: "Entries" }), _jsxs("span", { className: "text-white", children: [contest.participants, "/", contest.maxEntries] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full", style: { width: `${Math.min((contest.participants / contest.maxEntries) * 100, 100)}%` } }) })] }), _jsxs(Button, { className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white", children: ["Enter $", contest.entryFee] })] })] }) }, contest.id))) })] }) }), _jsx("section", { className: "py-12 bg-black/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-8 text-center", children: "Contest Types" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
                                {
                                    type: "GPP",
                                    icon: _jsx(Trophy, { className: "w-8 h-8 text-yellow-400" }),
                                    title: "Guaranteed Prize Pool",
                                    description: "Large tournaments with guaranteed prizes regardless of entries"
                                },
                                {
                                    type: "Tournament",
                                    icon: _jsx(Crown, { className: "w-8 h-8 text-purple-400" }),
                                    title: "Tournaments",
                                    description: "Multi-round competitions with escalating prize pools"
                                },
                                {
                                    type: "Head-to-Head",
                                    icon: _jsx(Target, { className: "w-8 h-8 text-red-400" }),
                                    title: "Head-to-Head",
                                    description: "One-on-one contests where winner takes most of the prize"
                                },
                                {
                                    type: "50/50",
                                    icon: _jsx(TrendingUp, { className: "w-8 h-8 text-green-400" }),
                                    title: "50/50 Contests",
                                    description: "Top half of entrants double their money"
                                }
                            ].map((type, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30 text-center h-full", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "mb-4", children: type.icon }), _jsx("h3", { className: "font-semibold text-white mb-2", children: type.title }), _jsx("p", { className: "text-emerald-200 text-sm", children: type.description })] }) }) }, type.type))) })] }) })] }));
}
