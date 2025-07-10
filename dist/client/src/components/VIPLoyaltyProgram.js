import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, Star, Trophy, Gift, Coins, TrendingUp, Calendar, Diamond, Award } from "lucide-react";
export default function VIPLoyaltyProgram() {
    const [selectedTab, setSelectedTab] = useState('overview');
    const { data: loyaltyData } = useQuery({
        queryKey: ['/api/user/loyalty'],
        refetchInterval: 60000,
    });
    const vipTiers = [
        {
            id: 'bronze',
            name: 'Bronze',
            level: 1,
            minPoints: 0,
            color: 'from-amber-600 to-orange-600',
            icon: _jsx(Award, { className: "w-6 h-6" }),
            benefits: ['Basic customer support', '1% cashback', 'Weekly bonus'],
            cashbackRate: 1.0,
            bonusMultiplier: 1.0,
            withdrawalLimit: 5000,
            personalManager: false
        },
        {
            id: 'silver',
            name: 'Silver',
            level: 2,
            minPoints: 1000,
            color: 'from-gray-400 to-gray-600',
            icon: _jsx(Star, { className: "w-6 h-6" }),
            benefits: ['Priority support', '1.5% cashback', 'Bi-weekly bonus', 'Exclusive tournaments'],
            cashbackRate: 1.5,
            bonusMultiplier: 1.2,
            withdrawalLimit: 10000,
            personalManager: false
        },
        {
            id: 'gold',
            name: 'Gold',
            level: 3,
            minPoints: 5000,
            color: 'from-yellow-400 to-yellow-600',
            icon: _jsx(Trophy, { className: "w-6 h-6" }),
            benefits: ['VIP support', '2% cashback', 'Daily bonus', 'VIP events', 'Higher limits'],
            cashbackRate: 2.0,
            bonusMultiplier: 1.5,
            withdrawalLimit: 25000,
            personalManager: false
        },
        {
            id: 'platinum',
            name: 'Platinum',
            level: 4,
            minPoints: 15000,
            color: 'from-slate-300 to-slate-500',
            icon: _jsx(Diamond, { className: "w-6 h-6" }),
            benefits: ['Personal manager', '3% cashback', 'Custom bonuses', 'Private events', 'No limits'],
            cashbackRate: 3.0,
            bonusMultiplier: 2.0,
            withdrawalLimit: 100000,
            personalManager: true
        },
        {
            id: 'diamond',
            name: 'Diamond',
            level: 5,
            minPoints: 50000,
            color: 'from-cyan-300 to-blue-500',
            icon: _jsx(Crown, { className: "w-6 h-6" }),
            benefits: ['Dedicated manager', '5% cashback', 'Unlimited bonuses', 'Exclusive access', 'Custom terms'],
            cashbackRate: 5.0,
            bonusMultiplier: 3.0,
            withdrawalLimit: 0, // No limit
            personalManager: true
        }
    ];
    const mockUserData = {
        currentTier: 'silver',
        points: 2450,
        nextTierPoints: 5000,
        lifetimePoints: 12340,
        monthlySpent: 2800,
        cashbackEarned: 156.50,
        bonusesReceived: 12,
        vipEventInvites: 3,
        personalManagerAccess: false,
        achievements: [
            {
                id: '1',
                title: 'First Bet',
                description: 'Place your first bet',
                icon: '🎯',
                pointsReward: 100,
                completed: true,
                completedAt: '2024-01-15',
                progress: 1,
                maxProgress: 1
            },
            {
                id: '2',
                title: 'High Roller',
                description: 'Bet $1000+ in a single wager',
                icon: '💎',
                pointsReward: 500,
                completed: true,
                completedAt: '2024-01-20',
                progress: 1,
                maxProgress: 1
            },
            {
                id: '3',
                title: 'Win Streak',
                description: 'Win 10 consecutive bets',
                icon: '🔥',
                pointsReward: 300,
                completed: false,
                progress: 7,
                maxProgress: 10
            },
            {
                id: '4',
                title: 'Monthly Spender',
                description: 'Spend $5000+ in a month',
                icon: '💰',
                pointsReward: 750,
                completed: false,
                progress: 2800,
                maxProgress: 5000
            }
        ],
        recentActivity: [
            {
                id: '1',
                type: 'points_earned',
                title: 'Points Earned',
                description: 'Earned 50 points from betting activity',
                points: 50,
                timestamp: '2 hours ago',
                icon: _jsx(Coins, { className: "w-4 h-4 text-yellow-500" })
            },
            {
                id: '2',
                type: 'cashback',
                title: 'Cashback Received',
                description: '$12.50 cashback credited',
                points: 0,
                timestamp: '1 day ago',
                icon: _jsx(TrendingUp, { className: "w-4 h-4 text-green-500" })
            },
            {
                id: '3',
                type: 'achievement',
                title: 'Achievement Unlocked',
                description: 'High Roller achievement completed',
                points: 500,
                timestamp: '3 days ago',
                icon: _jsx(Trophy, { className: "w-4 h-4 text-purple-500" })
            }
        ]
    };
    // Use API data with mock fallback
    const safeUserData = {
        currentTier: loyaltyData?.currentTier || mockUserData.currentTier,
        points: loyaltyData?.points || mockUserData.points,
        nextTierPoints: loyaltyData?.nextTierPoints || mockUserData.nextTierPoints,
        lifetimePoints: loyaltyData?.lifetimePoints || mockUserData.lifetimePoints,
        monthlySpent: loyaltyData?.monthlySpent || mockUserData.monthlySpent,
        cashbackEarned: loyaltyData?.cashbackEarned || mockUserData.cashbackEarned,
        bonusesReceived: loyaltyData?.bonusesReceived || mockUserData.bonusesReceived,
        vipEventInvites: loyaltyData?.vipEventInvites || mockUserData.vipEventInvites,
        personalManagerAccess: loyaltyData?.personalManagerAccess || mockUserData.personalManagerAccess,
        achievements: loyaltyData?.achievements || mockUserData.achievements,
        recentActivity: loyaltyData?.recentActivity || mockUserData.recentActivity
    };
    const currentTier = vipTiers.find(tier => tier.id === safeUserData.currentTier) || vipTiers[0];
    const nextTier = vipTiers.find(tier => tier.minPoints > safeUserData.points);
    const progressToNext = nextTier && currentTier ? ((safeUserData.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "VIP Loyalty Program" }), _jsx("p", { className: "text-gray-400", children: "Exclusive rewards for our valued players" })] }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "grid md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${currentTier?.color} rounded-full flex items-center justify-center`, children: currentTier?.icon }), _jsxs("h3", { className: "text-xl font-bold text-white", children: [currentTier?.name, " Member"] }), _jsx("p", { className: "text-gray-400", children: "Current Tier" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-yellow-500 mb-2", children: safeUserData.points.toLocaleString() }), _jsx("p", { className: "text-gray-400", children: "Loyalty Points" }), nextTier && (_jsxs("div", { className: "mt-2", children: [_jsx(Progress, { value: progressToNext, className: "h-2" }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [(nextTier.minPoints - safeUserData.points).toLocaleString(), " points to ", nextTier.name] })] }))] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-3xl font-bold text-green-500 mb-2", children: ["$", safeUserData.cashbackEarned] }), _jsx("p", { className: "text-gray-400", children: "Total Cashback" }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [currentTier?.cashbackRate, "% rate"] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-purple-500 mb-2", children: safeUserData.bonusesReceived }), _jsx("p", { className: "text-gray-400", children: "Bonuses Received" }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: [currentTier?.bonusMultiplier, "x multiplier"] })] })] }) }) }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-winnex-gray", children: [_jsx(TabsTrigger, { value: "overview", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Overview" }), _jsx(TabsTrigger, { value: "tiers", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "VIP Tiers" }), _jsx(TabsTrigger, { value: "achievements", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Achievements" }), _jsx(TabsTrigger, { value: "activity", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Activity" })] }), _jsx(TabsContent, { value: "overview", className: "mt-6", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Gift, { className: "w-5 h-5" }), "Your Current Benefits"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-3", children: currentTier?.benefits.map((benefit, index) => (_jsxs("div", { className: "flex items-center gap-3 p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full" }), _jsx("span", { className: "text-white", children: benefit })] }, index))) }), safeUserData.personalManagerAccess && (_jsxs("div", { className: "mt-6 p-4 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg", children: [_jsx("h4", { className: "text-white font-semibold mb-2", children: "Personal VIP Manager" }), _jsx("p", { className: "text-purple-200 text-sm mb-3", children: "Sarah Johnson - Your dedicated account manager" }), _jsx(Button, { className: "bg-white text-purple-600 hover:bg-gray-100", children: "Contact Manager" })] }))] })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Calendar, { className: "w-5 h-5" }), "This Month"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-gray-400", children: "Total Spent" }), _jsxs("span", { className: "text-white font-semibold", children: ["$", safeUserData.monthlySpent.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-gray-400", children: "Points Earned" }), _jsxs("span", { className: "text-yellow-500 font-semibold", children: ["+", Math.floor(safeUserData.monthlySpent / 10)] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-gray-400", children: "Cashback" }), _jsxs("span", { className: "text-green-500 font-semibold", children: ["+$", (safeUserData.monthlySpent * (currentTier?.cashbackRate || 0) / 100).toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-gray-400", children: "VIP Events" }), _jsxs("span", { className: "text-purple-500 font-semibold", children: [safeUserData.vipEventInvites, " invites"] })] })] }) })] })] }) }), _jsx(TabsContent, { value: "tiers", className: "mt-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: vipTiers.map((tier) => (_jsxs(Card, { className: `border-2 transition-all duration-300 ${tier.id === safeUserData.currentTier
                                    ? 'border-green-500 bg-green-900/20'
                                    : 'border-gray-600 bg-winnex-dark hover:border-gray-500'}`, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx("div", { className: `w-8 h-8 bg-gradient-to-br ${tier.color} rounded-full flex items-center justify-center`, children: tier.icon }), tier.name] }), tier.id === safeUserData.currentTier && (_jsx(Badge, { className: "bg-green-600", children: "Current" }))] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-yellow-500", children: [tier.minPoints.toLocaleString(), "+ pts"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Required Points" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Cashback: " }), _jsxs("span", { className: "text-green-400 font-semibold", children: [tier.cashbackRate, "%"] })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Bonus Multiplier: " }), _jsxs("span", { className: "text-purple-400 font-semibold", children: [tier.bonusMultiplier, "x"] })] }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Withdrawal Limit: " }), _jsx("span", { className: "text-blue-400 font-semibold", children: tier.withdrawalLimit === 0 ? 'Unlimited' : `$${tier.withdrawalLimit.toLocaleString()}` })] })] }), _jsx("div", { className: "space-y-1", children: tier.benefits.map((benefit, index) => (_jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-300", children: [_jsx("div", { className: "w-1 h-1 bg-green-400 rounded-full" }), benefit] }, index))) })] }) })] }, tier.id))) }) }), _jsx(TabsContent, { value: "achievements", className: "mt-6", children: _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: safeUserData.achievements.map((achievement) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "text-4xl", children: achievement.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-white font-semibold", children: achievement.title }), achievement.completed && (_jsx(Badge, { className: "bg-green-600", children: "Completed" }))] }), _jsx("p", { className: "text-gray-400 text-sm mb-3", children: achievement.description }), achievement.completed ? (_jsxs("div", { className: "text-xs text-green-400", children: ["Completed ", achievement.completedAt, " \u2022 +", achievement.pointsReward, " points"] })) : (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Progress" }), _jsxs("span", { className: "text-white", children: [achievement.progress, "/", achievement.maxProgress] })] }), _jsx(Progress, { value: (achievement.progress / achievement.maxProgress) * 100, className: "h-2" }), _jsxs("div", { className: "text-xs text-yellow-400", children: ["Reward: +", achievement.pointsReward, " points"] })] }))] })] }) }) }, achievement.id))) }) }), _jsx(TabsContent, { value: "activity", className: "mt-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Recent Loyalty Activity" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: safeUserData.recentActivity.map((activity) => (_jsxs("div", { className: "flex items-center gap-4 p-4 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "flex-shrink-0", children: activity.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-white font-semibold", children: activity.title }), _jsx("span", { className: "text-xs text-gray-400", children: activity.timestamp })] }), _jsx("p", { className: "text-gray-400 text-sm", children: activity.description })] }), activity.points > 0 && (_jsxs("div", { className: "text-yellow-500 font-semibold", children: ["+", activity.points] }))] }, activity.id))) }) })] }) })] })] }));
}
