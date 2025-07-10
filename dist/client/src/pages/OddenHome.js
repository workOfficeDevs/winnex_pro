import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Trophy, Users, TrendingUp, Zap, Target, Crown, Gamepad2, Star, Award, Timer, BarChart3, Brain, Bitcoin, ArrowRight, Shield } from "lucide-react";
import { motion } from "framer-motion";
export default function OddenHome() {
    const [selectedSport, setSelectedSport] = useState("all");
    const { data: contests = [] } = useQuery({
        queryKey: ["/api/fantasy/contests"],
        retry: false,
    });
    const { data: leaderboard = [] } = useQuery({
        queryKey: ["/api/fantasy/leaderboard"],
        retry: false,
    });
    const featuredContests = [
        {
            id: 1,
            name: "NFL Sunday Showdown",
            sport: "Football",
            entryFee: 25,
            prizePool: 50000,
            participants: 1847,
            maxEntries: 5000,
            timeLeft: "2h 15m",
            difficulty: "Beginner"
        },
        {
            id: 2,
            name: "NBA Championship Special",
            sport: "Basketball",
            entryFee: 50,
            prizePool: 100000,
            participants: 1234,
            maxEntries: 2000,
            timeLeft: "4h 32m",
            difficulty: "Expert"
        },
        {
            id: 3,
            name: "Premier League Fantasy",
            sport: "Soccer",
            entryFee: 10,
            prizePool: 25000,
            participants: 2456,
            maxEntries: 3000,
            timeLeft: "1d 6h",
            difficulty: "Intermediate"
        }
    ];
    const topPerformers = [
        { rank: 1, username: "FantasyKing", points: 2847.5, winnings: 12450 },
        { rank: 2, username: "SportsGenius", points: 2756.2, winnings: 11230 },
        { rank: 3, username: "DraftMaster", points: 2689.8, winnings: 10890 },
        { rank: 4, username: "SkillPlayer", points: 2634.1, winnings: 9875 },
        { rank: 5, username: "ProPicker", points: 2598.4, winnings: 9234 }
    ];
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx("header", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Link, { href: "/odden", children: _jsxs(motion.div, { className: "flex items-center space-x-3 cursor-pointer", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 }, children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center", children: _jsx(Gamepad2, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Odden" }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Fantasy Sports Excellence" })] })] }) }), _jsxs("div", { className: "hidden md:flex items-center space-x-8", children: [_jsx(Link, { href: "/odden/contests", children: _jsx("span", { className: "text-emerald-100 hover:text-emerald-400 cursor-pointer transition-colors font-medium", children: "Contests" }) }), _jsx(Link, { href: "/odden/draft", children: _jsx("span", { className: "text-emerald-100 hover:text-emerald-400 cursor-pointer transition-colors font-medium", children: "Draft Room" }) }), _jsx(Link, { href: "/odden/leaderboard", children: _jsx("span", { className: "text-emerald-100 hover:text-emerald-400 cursor-pointer transition-colors font-medium", children: "Leaderboard" }) }), _jsx(Link, { href: "/", children: _jsx(Button, { variant: "outline", size: "sm", className: "border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-emerald-900", children: "Back to Winnex" }) })] }), _jsx("div", { className: "md:hidden flex items-center space-x-2", children: _jsx(Button, { size: "sm", variant: "ghost", className: "text-emerald-400", children: _jsx(Trophy, { className: "w-5 h-5" }) }) })] }) }) }), _jsxs("section", { className: "relative py-20 overflow-hidden", children: [_jsx("div", { className: "max-w-7xl mx-auto px-6 text-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsxs("h2", { className: "text-5xl md:text-6xl font-bold text-white mb-6", children: ["Master the Art of", _jsxs("span", { className: "bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent", children: [" ", "Fantasy Sports"] })] }), _jsx("p", { className: "text-xl text-emerald-100 mb-8 max-w-3xl mx-auto", children: "Build your dream teams, compete with skilled players, and win real prizes in the ultimate fantasy sports experience." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [_jsxs(Button, { className: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg", children: [_jsx(Crown, { className: "w-5 h-5 mr-2" }), "Start Playing Now"] }), _jsxs(Button, { variant: "outline", className: "border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-4 text-lg", children: [_jsx(Target, { className: "w-5 h-5 mr-2" }), "View Contests"] })] })] }) }), _jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: Array.from({ length: 8 }).map((_, i) => (_jsx(motion.div, { className: "absolute w-4 h-4 bg-emerald-400/20 rounded-full", style: {
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }, animate: {
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3]
                            }, transition: {
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2
                            } }, i))) })] }), _jsx("section", { className: "bg-black/40 backdrop-blur-lg py-6", children: _jsx("div", { className: "max-w-7xl mx-auto px-6", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [_jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "text-3xl font-bold text-emerald-400", children: "$2.5M+" }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Prizes Awarded" })] }), _jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "text-3xl font-bold text-teal-400", children: "150K+" }), _jsx("div", { className: "text-teal-200 text-sm", children: "Active Players" })] }), _jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "text-3xl font-bold text-cyan-400", children: "500+" }), _jsx("div", { className: "text-cyan-200 text-sm", children: "Daily Contests" })] }), _jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, children: [_jsx("div", { className: "text-3xl font-bold text-emerald-400", children: "95%" }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Payout Rate" })] })] }) }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "Featured Contests" }), _jsx("p", { className: "text-emerald-200", children: "Join the action in our most popular fantasy competitions" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: featuredContests.map((contest, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, children: _jsxs(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Badge, { className: `${contest.difficulty === 'Beginner' ? 'bg-green-600' :
                                                                contest.difficulty === 'Intermediate' ? 'bg-yellow-600' : 'bg-red-600'} text-white`, children: contest.difficulty }), _jsxs("div", { className: "flex items-center text-emerald-400", children: [_jsx(Timer, { className: "w-4 h-4 mr-1" }), _jsx("span", { className: "text-sm", children: contest.timeLeft })] })] }), _jsx(CardTitle, { className: "text-white", children: contest.name }), _jsx("div", { className: "text-emerald-300", children: contest.sport })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: ["$", contest.prizePool.toLocaleString()] }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Total Prizes" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-teal-400", children: ["$", contest.entryFee] }), _jsx("div", { className: "text-teal-200 text-sm", children: "Entry Fee" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-emerald-200", children: "Entries" }), _jsxs("span", { className: "text-white", children: [contest.participants.toLocaleString(), "/", contest.maxEntries.toLocaleString()] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full", style: { width: `${(contest.participants / contest.maxEntries) * 100}%` } }) })] }), _jsxs(Button, { className: "w-full bg-emerald-600 hover:bg-emerald-700 text-white", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2" }), "Enter Contest"] })] })] }) }, contest.id))) })] }) }), _jsx("section", { className: "py-16 bg-black/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "Top Performers" }), _jsx("p", { className: "text-emerald-200", children: "See who's dominating the fantasy sports world" })] }), _jsx(Card, { className: "bg-black/50 border-emerald-500/30", children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "space-y-4", children: topPerformers.map((player, index) => (_jsxs(motion.div, { className: "flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-black/40 transition-colors", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center font-bold ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                                                            player.rank === 2 ? 'bg-gray-400 text-black' :
                                                                player.rank === 3 ? 'bg-amber-600 text-white' :
                                                                    'bg-emerald-600 text-white'}`, children: player.rank }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-white", children: player.username }), _jsxs("div", { className: "text-emerald-300 text-sm", children: [player.points, " points"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-semibold text-emerald-400", children: ["$", player.winnings.toLocaleString()] }), _jsx("div", { className: "text-emerald-200 text-sm", children: "Total Winnings" })] })] }, player.rank))) }) }) })] }) }), _jsx("section", { className: "py-16", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "Choose Your Sport" }), _jsx("p", { className: "text-emerald-200", children: "Master fantasy contests across all major sports" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                                { name: 'Football', icon: '🏈', contests: 156 },
                                { name: 'Basketball', icon: '🏀', contests: 89 },
                                { name: 'Baseball', icon: '⚾', contests: 67 },
                                { name: 'Soccer', icon: '⚽', contests: 134 },
                                { name: 'Hockey', icon: '🏒', contests: 45 },
                                { name: 'Golf', icon: '⛳', contests: 23 },
                                { name: 'Tennis', icon: '🎾', contests: 18 },
                                { name: 'MMA', icon: '🥊', contests: 12 }
                            ].map((sport, index) => (_jsx(motion.div, { whileHover: { scale: 1.05, y: -5 }, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all cursor-pointer", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "text-4xl mb-3", children: sport.icon }), _jsx("h4", { className: "font-semibold text-white mb-2", children: sport.name }), _jsxs("p", { className: "text-emerald-300 text-sm", children: [sport.contests, " contests"] })] }) }) }, sport.name))) })] }) }), _jsx("section", { className: "py-16 bg-black/30", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx("h3", { className: "text-3xl font-bold text-white mb-4", children: "Why Choose Odden?" }), _jsx("p", { className: "text-emerald-200", children: "The ultimate fantasy sports experience" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
                                {
                                    icon: _jsx(Zap, { className: "w-8 h-8 text-emerald-400" }),
                                    title: "Lightning Fast",
                                    description: "Real-time scoring and instant payouts"
                                },
                                {
                                    icon: _jsx(Trophy, { className: "w-8 h-8 text-teal-400" }),
                                    title: "Massive Prizes",
                                    description: "Million-dollar tournaments every week"
                                },
                                {
                                    icon: _jsx(Star, { className: "w-8 h-8 text-cyan-400" }),
                                    title: "Expert Analysis",
                                    description: "Pro insights and player projections"
                                },
                                {
                                    icon: _jsx(Users, { className: "w-8 h-8 text-emerald-400" }),
                                    title: "Active Community",
                                    description: "Join 150K+ passionate fantasy players"
                                },
                                {
                                    icon: _jsx(BarChart3, { className: "w-8 h-8 text-teal-400" }),
                                    title: "Advanced Stats",
                                    description: "Deep analytics and performance tracking"
                                },
                                {
                                    icon: _jsx(Award, { className: "w-8 h-8 text-cyan-400" }),
                                    title: "Fair Play",
                                    description: "Skill-based contests with verified results"
                                }
                            ].map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all h-full", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx("div", { className: "mb-4", children: feature.icon }), _jsx("h4", { className: "font-semibold text-white mb-2", children: feature.title }), _jsx("p", { className: "text-emerald-200", children: feature.description })] }) }) }, feature.title))) })] }) }), _jsx("section", { className: "py-20 bg-black/30 backdrop-blur-lg", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx("h3", { className: "text-4xl font-bold text-white mb-4", children: "Enterprise-Grade Features" }), _jsx("p", { className: "text-xl text-emerald-200", children: "Powered by cutting-edge technology and AI innovation" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: [
                                {
                                    icon: _jsx(Brain, { className: "w-10 h-10 text-purple-400" }),
                                    title: "AI Analytics Center",
                                    description: "94.2% prediction accuracy with advanced player insights, market trends, and personalized recommendations",
                                    link: "/odden/analytics"
                                },
                                {
                                    icon: _jsx(Bitcoin, { className: "w-10 h-10 text-yellow-400" }),
                                    title: "Crypto Wallet",
                                    description: "Secure multi-currency wallet supporting Bitcoin, Ethereum, USDT, and more with instant payouts",
                                    link: "/odden/wallet"
                                },
                                {
                                    icon: _jsx(Users, { className: "w-10 h-10 text-blue-400" }),
                                    title: "Community Hub",
                                    description: "Connect with 150K+ players, join challenges, follow expert tipsters, and share strategies",
                                    link: "/odden/social"
                                },
                                {
                                    icon: _jsx(TrendingUp, { className: "w-10 h-10 text-green-400" }),
                                    title: "Real-Time Data",
                                    description: "Live scoring updates, injury alerts, weather impacts, and instant lineup adjustments",
                                    link: "/odden/contests"
                                },
                                {
                                    icon: _jsx(Shield, { className: "w-10 h-10 text-emerald-400" }),
                                    title: "Bank-Level Security",
                                    description: "Enterprise security with 2FA, cold storage, multi-sig wallets, and insurance coverage",
                                    link: "/odden/wallet"
                                },
                                {
                                    icon: _jsx(Zap, { className: "w-10 h-10 text-orange-400" }),
                                    title: "Lightning Fast",
                                    description: "Sub-second contest entry, real-time leaderboards, and instant cryptocurrency payouts",
                                    link: "/odden/contests"
                                }
                            ].map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -5 }, children: _jsx(Link, { href: feature.link, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer h-full", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center mb-4", children: [feature.icon, _jsx("h4", { className: "text-xl font-bold text-white ml-3", children: feature.title })] }), _jsx("p", { className: "text-emerald-200 leading-relaxed", children: feature.description }), _jsxs("div", { className: "mt-4 flex items-center text-emerald-400 text-sm font-semibold", children: ["Explore Feature", _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] })] }) }) }) }, feature.title))) })] }) }), _jsx("section", { className: "py-20 text-center", children: _jsx("div", { className: "max-w-4xl mx-auto px-6", children: _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx("h3", { className: "text-4xl font-bold text-white mb-6", children: "Ready to Dominate Fantasy Sports?" }), _jsx("p", { className: "text-xl text-emerald-200 mb-8", children: "Join thousands of skilled players competing for life-changing prizes" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsxs(Button, { className: "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-4 text-lg", children: [_jsx(Crown, { className: "w-5 h-5 mr-2" }), "Join Odden Today"] }), _jsxs(Button, { variant: "outline", className: "border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-white px-8 py-4 text-lg", children: [_jsx(Target, { className: "w-5 h-5 mr-2" }), "Browse Contests"] })] })] }) }) }), _jsx("footer", { className: "bg-black/50 border-t border-emerald-500/20 py-12", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center", children: _jsx(Gamepad2, { className: "w-5 h-5 text-white" }) }), _jsx("h4", { className: "text-xl font-bold text-white", children: "Odden" })] }), _jsx("p", { className: "text-emerald-200", children: "The ultimate fantasy sports experience" })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-white mb-4", children: "Sports" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Football" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Basketball" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Baseball" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Soccer" })] })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-white mb-4", children: "Support" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Help Center" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Contact Us" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Rules" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Fair Play" })] })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-semibold text-white mb-4", children: "Legal" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Terms of Service" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Privacy Policy" }), _jsx("div", { className: "text-emerald-200 hover:text-emerald-400 cursor-pointer", children: "Responsible Play" })] })] })] }), _jsx("div", { className: "border-t border-emerald-500/20 mt-8 pt-8 text-center", children: _jsx("p", { className: "text-emerald-200", children: "\u00A9 2025 Odden. All rights reserved. Play responsibly." }) })] }) })] }));
}
