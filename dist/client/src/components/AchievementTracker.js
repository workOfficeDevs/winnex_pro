import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Zap, Crown, Award } from "lucide-react";
export default function AchievementTracker() {
    const [newAchievements, setNewAchievements] = useState([]);
    const [levelUpAnimation, setLevelUpAnimation] = useState(false);
    const { data: achievements } = useQuery({
        queryKey: ['/api/user/achievements'],
        refetchInterval: 30000,
    });
    const { data: playerLevel } = useQuery({
        queryKey: ['/api/user/level'],
        refetchInterval: 30000,
    });
    // Mock data for demonstration
    const mockAchievements = [
        {
            id: "first_bet",
            title: "First Bet",
            description: "Place your first bet",
            icon: "🎯",
            category: "betting",
            xpReward: 100,
            progress: 1,
            maxProgress: 1,
            completed: true,
            rarity: "common",
            unlockedAt: "2024-01-15"
        },
        {
            id: "lucky_streak",
            title: "Lucky Streak",
            description: "Win 5 bets in a row",
            icon: "🍀",
            category: "betting",
            xpReward: 500,
            progress: 3,
            maxProgress: 5,
            completed: false,
            rarity: "rare"
        },
        {
            id: "big_winner",
            title: "Big Winner",
            description: "Win $1000 in a single bet",
            icon: "💰",
            category: "milestone",
            xpReward: 1000,
            progress: 750,
            maxProgress: 1000,
            completed: false,
            rarity: "epic"
        },
        {
            id: "social_butterfly",
            title: "Social Butterfly",
            description: "Share 10 winning bets",
            icon: "🦋",
            category: "social",
            xpReward: 300,
            progress: 7,
            maxProgress: 10,
            completed: false,
            rarity: "common"
        },
        {
            id: "perfect_week",
            title: "Perfect Week",
            description: "Win every bet for 7 days",
            icon: "👑",
            category: "betting",
            xpReward: 2000,
            progress: 0,
            maxProgress: 7,
            completed: false,
            rarity: "legendary"
        }
    ];
    const mockLevel = {
        currentLevel: 12,
        currentXP: 2450,
        xpToNextLevel: 550,
        totalXP: 14750,
        title: "Skilled Bettor",
        nextTitle: "Expert Gambler",
        perks: ["5% Bonus on Wins", "Early Access to Promotions", "Custom Avatar"]
    };
    const data = achievements || mockAchievements;
    const level = playerLevel || mockLevel;
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'border-gray-500 bg-gray-500/10';
            case 'rare': return 'border-blue-500 bg-blue-500/10';
            case 'epic': return 'border-purple-500 bg-purple-500/10';
            case 'legendary': return 'border-yellow-500 bg-yellow-500/10 animate-pulse';
            default: return 'border-gray-500 bg-gray-500/10';
        }
    };
    const getRarityBadgeColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'bg-gray-600';
            case 'rare': return 'bg-blue-600';
            case 'epic': return 'bg-purple-600';
            case 'legendary': return 'bg-yellow-600';
            default: return 'bg-gray-600';
        }
    };
    const xpProgress = (level.currentXP / (level.currentXP + level.xpToNextLevel)) * 100;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Crown, { className: "w-5 h-5 text-yellow-500" }), "Player Level & Progress"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-16 h-16 rounded-full border-4 border-yellow-500 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center text-2xl font-bold text-black ${levelUpAnimation ? 'animate-bounce' : ''}`, children: level.currentLevel }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: level.title }), _jsxs("p", { className: "text-gray-400", children: ["Next: ", level.nextTitle] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-2xl font-bold text-winnex-green", children: [level.currentXP.toLocaleString(), " XP"] }), _jsxs("div", { className: "text-sm text-gray-400", children: [level.xpToNextLevel, " XP to next level"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-gray-400", children: ["Level ", level.currentLevel] }), _jsxs("span", { className: "text-gray-400", children: ["Level ", level.currentLevel + 1] })] }), _jsx(Progress, { value: xpProgress, className: "h-3 bg-gray-700" })] }), _jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-semibold text-white mb-2 flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-500" }), "Current Perks"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: level.perks.map((perk, index) => (_jsx(Badge, { className: "bg-winnex-green text-black", children: perk }, index))) })] })] }) })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Trophy, { className: "w-5 h-5 text-yellow-500" }), "Achievements"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: data.map((achievement) => (_jsxs("div", { className: `p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${getRarityColor(achievement.rarity)} ${achievement.completed ? 'opacity-100' : 'opacity-70'}`, children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsx("div", { className: `text-4xl ${achievement.completed ? 'animate-pulse' : 'grayscale'}`, children: achievement.icon }), _jsx(Badge, { className: `${getRarityBadgeColor(achievement.rarity)} text-white capitalize`, children: achievement.rarity })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: `font-bold ${achievement.completed ? 'text-white' : 'text-gray-400'}`, children: achievement.title }), _jsx("p", { className: "text-sm text-gray-400", children: achievement.description }), !achievement.completed && (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-400", children: [_jsx("span", { children: achievement.progress }), _jsx("span", { children: achievement.maxProgress })] }), _jsx(Progress, { value: (achievement.progress / achievement.maxProgress) * 100, className: "h-2 bg-gray-700" })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1 text-sm", children: [_jsx(Zap, { className: "w-4 h-4 text-yellow-500" }), _jsxs("span", { className: "text-yellow-500", children: [achievement.xpReward, " XP"] })] }), achievement.completed && (_jsxs("div", { className: "flex items-center gap-1 text-sm text-green-400", children: [_jsx(Award, { className: "w-4 h-4" }), _jsx("span", { children: "Completed" })] }))] }), achievement.completed && achievement.unlockedAt && (_jsxs("div", { className: "text-xs text-gray-500", children: ["Unlocked: ", new Date(achievement.unlockedAt).toLocaleDateString()] }))] })] }, achievement.id))) }) })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Target, { className: "w-5 h-5 text-blue-500" }), "Achievement Categories"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid md:grid-cols-4 gap-4", children: ['betting', 'social', 'exploration', 'milestone'].map((category) => {
                                const categoryAchievements = data.filter(a => a.category === category);
                                const completed = categoryAchievements.filter(a => a.completed).length;
                                const total = categoryAchievements.length;
                                const progress = total > 0 ? (completed / total) * 100 : 0;
                                return (_jsxs("div", { className: "text-center p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "text-2xl mb-2", children: [category === 'betting' && '🎯', category === 'social' && '👥', category === 'exploration' && '🔍', category === 'milestone' && '🏆'] }), _jsx("h3", { className: "text-white font-semibold capitalize mb-2", children: category }), _jsxs("div", { className: "text-sm text-gray-400 mb-2", children: [completed, "/", total, " completed"] }), _jsx(Progress, { value: progress, className: "h-2 bg-gray-700" })] }, category));
                            }) }) })] })] }));
}
