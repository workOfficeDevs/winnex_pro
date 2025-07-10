import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Target, Brain, BarChart3, PieChart, Activity, Zap, Star, Crown, Calendar, RefreshCw, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import OddenNav from '@/components/OddenNav';
export default function OddenAnalytics() {
    const [selectedPeriod, setSelectedPeriod] = useState('7d');
    const [refreshing, setRefreshing] = useState(false);
    // Mock AI-powered analytics data
    const aiInsights = {
        predictionAccuracy: 94.2,
        trendsDetected: 12,
        opportunitiesFound: 8,
        riskAssessment: 'Low',
        recommendedPlayers: 15
    };
    const performanceMetrics = {
        totalContests: 247,
        winRate: 68.4,
        averageScore: 156.7,
        bestStreak: 12,
        totalWinnings: 45670,
        roi: 24.8,
        rank: 156,
        tier: 'Diamond'
    };
    const recentPerformance = [
        { date: '2025-01-28', contest: 'NFL Championship', score: 178.5, rank: 3, winnings: 2500 },
        { date: '2025-01-27', contest: 'NBA Showdown', score: 165.2, rank: 12, winnings: 450 },
        { date: '2025-01-26', contest: 'Soccer Premier', score: 142.8, rank: 8, winnings: 850 },
        { date: '2025-01-25', contest: 'NHL Masters', score: 134.6, rank: 15, winnings: 200 },
        { date: '2025-01-24', contest: 'MLB Classic', score: 189.3, rank: 1, winnings: 5000 }
    ];
    const aiRecommendations = [
        {
            type: 'Player Pick',
            title: 'Josh Allen (QB)',
            confidence: 96,
            reason: 'Favorable matchup vs weak pass defense, 87% win probability',
            impact: 'High',
            category: 'Core Pick'
        },
        {
            type: 'Contrarian Play',
            title: 'Tony Pollard (RB)',
            confidence: 78,
            reason: 'Low ownership (8%) with high ceiling potential',
            impact: 'Medium',
            category: 'GPP Strategy'
        },
        {
            type: 'Stack Strategy',
            title: 'Bills Passing Attack',
            confidence: 91,
            reason: 'Allen + Diggs correlation in high-scoring environment',
            impact: 'High',
            category: 'Tournament Play'
        },
        {
            type: 'Fade Alert',
            title: 'Christian McCaffrey',
            confidence: 84,
            reason: 'Questionable status + tough matchup, high ownership risk',
            impact: 'Medium',
            category: 'Risk Management'
        }
    ];
    const marketTrends = [
        { sport: 'NFL', trend: 'up', change: '+12%', insight: 'QB scoring variance increasing' },
        { sport: 'NBA', trend: 'down', change: '-8%', insight: 'Defense-heavy games trending' },
        { sport: 'Soccer', trend: 'up', change: '+15%', insight: 'Goal totals exceeding projections' },
        { sport: 'NHL', trend: 'neutral', change: '+2%', insight: 'Stable goalie performance' }
    ];
    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setRefreshing(false);
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "AI Analytics Center" }), _jsx("p", { className: "text-emerald-300", children: "Advanced insights powered by artificial intelligence" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { onClick: handleRefresh, disabled: refreshing, className: "bg-emerald-600 hover:bg-emerald-700", children: [refreshing ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(RefreshCw, { className: "w-4 h-4 mr-2" })), "Refresh Data"] }), _jsxs(Button, { variant: "outline", className: "border-emerald-500 text-emerald-300", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Report"] })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "bg-black/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "AI Accuracy" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [aiInsights.predictionAccuracy, "%"] })] }), _jsx(Brain, { className: "w-8 h-8 text-emerald-400" })] }), _jsx("div", { className: "mt-4", children: _jsx(Progress, { value: aiInsights.predictionAccuracy, className: "h-2" }) })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "bg-black/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Trends Detected" }), _jsx("p", { className: "text-2xl font-bold text-white", children: aiInsights.trendsDetected })] }), _jsx(TrendingUp, { className: "w-8 h-8 text-green-400" })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "bg-black/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Opportunities" }), _jsx("p", { className: "text-2xl font-bold text-white", children: aiInsights.opportunitiesFound })] }), _jsx(Target, { className: "w-8 h-8 text-yellow-400" })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "bg-black/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Risk Level" }), _jsx("p", { className: "text-2xl font-bold text-white", children: aiInsights.riskAssessment })] }), _jsx(Activity, { className: "w-8 h-8 text-blue-400" })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "bg-black/50 backdrop-blur-lg border border-emerald-500/30 rounded-xl p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "AI Picks" }), _jsx("p", { className: "text-2xl font-bold text-white", children: aiInsights.recommendedPlayers })] }), _jsx(Star, { className: "w-8 h-8 text-purple-400" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(BarChart3, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Performance Overview"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-emerald-400", children: performanceMetrics.totalContests }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Total Contests" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-3xl font-bold text-green-400", children: [performanceMetrics.winRate, "%"] }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Win Rate" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-yellow-400", children: performanceMetrics.averageScore }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Avg Score" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-purple-400", children: performanceMetrics.bestStreak }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Best Streak" })] })] }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx("div", { className: "bg-emerald-900/50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Total Winnings" }), _jsxs("p", { className: "text-xl font-bold text-white", children: ["$", performanceMetrics.totalWinnings.toLocaleString()] })] }), _jsx(DollarSign, { className: "w-6 h-6 text-green-400" })] }) }), _jsx("div", { className: "bg-emerald-900/50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "ROI" }), _jsxs("p", { className: "text-xl font-bold text-white", children: ["+", performanceMetrics.roi, "%"] })] }), _jsx(TrendingUp, { className: "w-6 h-6 text-green-400" })] }) }), _jsx("div", { className: "bg-emerald-900/50 rounded-lg p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Global Rank" }), _jsxs("p", { className: "text-xl font-bold text-white", children: ["#", performanceMetrics.rank] })] }), _jsx(Crown, { className: "w-6 h-6 text-yellow-400" })] }) })] })] })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Calendar, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Recent Performance"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentPerformance.map((contest, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between p-3 bg-emerald-900/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: `w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${contest.rank <= 3 ? 'bg-yellow-400 text-black' :
                                                                            contest.rank <= 10 ? 'bg-emerald-400 text-black' : 'bg-gray-400 text-white'}`, children: ["#", contest.rank] }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-semibold", children: contest.contest }), _jsx("p", { className: "text-emerald-300 text-sm", children: contest.date })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-white font-semibold", children: [contest.score, " pts"] }), _jsxs("p", { className: "text-green-400 text-sm", children: ["+$", contest.winnings] })] })] }, index))) }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Brain, { className: "w-5 h-5 mr-2 text-emerald-400" }), "AI Recommendations"] }) }), _jsx(CardContent, { className: "space-y-4", children: aiRecommendations.map((rec, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, className: "p-3 bg-emerald-900/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(Badge, { variant: "outline", className: "border-emerald-500 text-emerald-300", children: rec.category }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Zap, { className: "w-3 h-3 text-yellow-400" }), _jsxs("span", { className: "text-xs text-yellow-400", children: [rec.confidence, "%"] })] })] }), _jsx("h4", { className: "text-white font-semibold", children: rec.title }), _jsx("p", { className: "text-emerald-300 text-sm mt-1", children: rec.reason }), _jsx("div", { className: "flex items-center justify-between mt-2", children: _jsxs("span", { className: `text-xs px-2 py-1 rounded ${rec.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                                                                    rec.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                                                        'bg-blue-500/20 text-blue-300'}`, children: [rec.impact, " Impact"] }) })] }, index))) })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(PieChart, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Market Trends"] }) }), _jsx(CardContent, { className: "space-y-3", children: marketTrends.map((trend, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 bg-emerald-900/30 rounded", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-white font-semibold", children: trend.sport }), trend.trend === 'up' ? (_jsx(TrendingUp, { className: "w-4 h-4 text-green-400" })) : trend.trend === 'down' ? (_jsx(TrendingDown, { className: "w-4 h-4 text-red-400" })) : (_jsx(Activity, { className: "w-4 h-4 text-yellow-400" }))] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: `font-semibold ${trend.trend === 'up' ? 'text-green-400' :
                                                                        trend.trend === 'down' ? 'text-red-400' : 'text-yellow-400'}`, children: trend.change }), _jsx("p", { className: "text-xs text-emerald-300", children: trend.insight })] })] }, index))) })] })] })] })] })] }));
}
