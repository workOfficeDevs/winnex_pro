import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Target, Zap, Crown, Star, BarChart3, Activity } from "lucide-react";
export default function EnhancedDashboard() {
    const [timeRange, setTimeRange] = useState('week');
    const [activeTab, setActiveTab] = useState('overview');
    // Mock dashboard data
    const stats = {
        balance: 2847.50,
        totalProfit: 1542.75,
        totalBets: 247,
        winRate: 68.4,
        roi: 23.8,
        avgOdds: 2.14,
        currentStreak: 8,
        streakType: 'win',
        weeklyProfit: 342.50,
        monthlyProfit: 1249.25,
        todaysBets: 5,
        pendingBets: 3
    };
    const recentBets = [
        {
            id: '1',
            match: 'Liverpool vs Arsenal',
            selection: 'Over 2.5 Goals',
            odds: 1.85,
            stake: 50,
            status: 'won',
            profit: 42.50,
            timestamp: '2024-06-14T16:30:00Z',
            sport: 'Football'
        },
        {
            id: '2',
            match: 'Lakers vs Celtics',
            selection: 'Lakers -2.5',
            odds: 1.92,
            stake: 75,
            status: 'pending',
            profit: 0,
            timestamp: '2024-06-14T18:00:00Z',
            sport: 'Basketball'
        },
        {
            id: '3',
            match: 'Chiefs vs Bills',
            selection: 'Chiefs Win',
            odds: 1.75,
            stake: 100,
            status: 'won',
            profit: 75,
            timestamp: '2024-06-14T14:15:00Z',
            sport: 'Football'
        },
        {
            id: '4',
            match: 'Barcelona vs PSG',
            selection: 'Both Teams Score',
            odds: 1.65,
            stake: 25,
            status: 'lost',
            profit: -25,
            timestamp: '2024-06-14T12:45:00Z',
            sport: 'Football'
        }
    ];
    const profitChart = [
        { date: 'Mon', profit: 125, cumulative: 125 },
        { date: 'Tue', profit: 87, cumulative: 212 },
        { date: 'Wed', profit: -45, cumulative: 167 },
        { date: 'Thu', profit: 203, cumulative: 370 },
        { date: 'Fri', profit: 95, cumulative: 465 },
        { date: 'Sat', profit: 156, cumulative: 621 },
        { date: 'Sun', profit: 78, cumulative: 699 }
    ];
    const goals = [
        {
            id: '1',
            title: 'Weekly Profit Target',
            target: 500,
            current: 342.50,
            deadline: '2 days',
            type: 'profit',
            reward: '$50 bonus'
        },
        {
            id: '2',
            title: 'Win Rate Challenge',
            target: 70,
            current: 68.4,
            deadline: '1 week',
            type: 'winrate',
            reward: 'VIP status'
        },
        {
            id: '3',
            title: 'Monthly Volume',
            target: 50,
            current: 37,
            deadline: '2 weeks',
            type: 'volume',
            reward: '5% cashback'
        }
    ];
    const getStatusColor = (status) => {
        switch (status) {
            case 'won': return 'text-green-400';
            case 'lost': return 'text-red-400';
            case 'pending': return 'text-yellow-400';
            case 'void': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'won': return '✅';
            case 'lost': return '❌';
            case 'pending': return '⏳';
            case 'void': return '⭕';
            default: return '';
        }
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4", children: [_jsx(Card, { className: "bg-gradient-to-r from-winnex-green/20 to-green-500/20 border-winnex-green/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(DollarSign, { className: "w-6 h-6 mx-auto mb-2 text-winnex-green" }), _jsx("div", { className: "text-2xl font-bold text-winnex-green", children: formatCurrency(stats.balance) }), _jsx("div", { className: "text-xs text-gray-400", children: "Balance" })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-blue-500/20 to-winnex-blue/20 border-blue-500/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingUp, { className: "w-6 h-6 mx-auto mb-2 text-blue-400" }), _jsx("div", { className: "text-2xl font-bold text-blue-400", children: formatCurrency(stats.totalProfit) }), _jsx("div", { className: "text-xs text-gray-400", children: "Total Profit" })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Target, { className: "w-6 h-6 mx-auto mb-2 text-yellow-400" }), _jsxs("div", { className: "text-2xl font-bold text-yellow-400", children: [stats.winRate, "%"] }), _jsx("div", { className: "text-xs text-gray-400", children: "Win Rate" })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(BarChart3, { className: "w-6 h-6 mx-auto mb-2 text-purple-400" }), _jsxs("div", { className: "text-2xl font-bold text-purple-400", children: [stats.roi, "%"] }), _jsx("div", { className: "text-xs text-gray-400", children: "ROI" })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Zap, { className: "w-6 h-6 mx-auto mb-2 text-orange-400" }), _jsx("div", { className: "text-2xl font-bold text-orange-400", children: stats.currentStreak }), _jsxs("div", { className: "text-xs text-gray-400", children: [stats.streakType, " streak"] })] }) }), _jsx(Card, { className: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Activity, { className: "w-6 h-6 mx-auto mb-2 text-cyan-400" }), _jsx("div", { className: "text-2xl font-bold text-cyan-400", children: stats.totalBets }), _jsx("div", { className: "text-xs text-gray-400", children: "Total Bets" })] }) })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-winnex-dark", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "goals", children: "Goals" }), _jsx(TabsTrigger, { value: "insights", children: "AI Insights" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: ["Recent Bets", _jsx(Button, { size: "sm", variant: "outline", className: "border-gray-600", children: "View All" })] }) }), _jsx(CardContent, { className: "space-y-3", children: recentBets.map((bet) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-winnex-dark rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("span", { className: "font-medium text-sm", children: bet.match }), _jsx(Badge, { variant: "outline", className: "text-xs", children: bet.sport })] }), _jsxs("div", { className: "text-xs text-gray-400", children: [bet.selection, " @ ", bet.odds, " \u2022 ", formatCurrency(bet.stake)] }), _jsx("div", { className: "text-xs text-gray-500", children: new Date(bet.timestamp).toLocaleDateString() })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("span", { className: "text-sm", children: getStatusIcon(bet.status) }), _jsx("span", { className: `text-sm font-medium ${getStatusColor(bet.status)}`, children: bet.status.toUpperCase() })] }), _jsxs("div", { className: `text-sm font-bold ${bet.profit > 0 ? 'text-green-400' :
                                                                        bet.profit < 0 ? 'text-red-400' : 'text-gray-400'}`, children: [bet.profit > 0 ? '+' : '', formatCurrency(bet.profit)] })] })] }, bet.id))) })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Quick Actions" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsx(Button, { className: "w-full bg-winnex-green text-black hover:bg-green-400", children: "Place Quick Bet" }), _jsx(Button, { className: "w-full bg-winnex-blue text-white hover:bg-blue-400", children: "View Live Matches" }), _jsx(Button, { className: "w-full bg-orange-500 text-white hover:bg-orange-400", children: "Crypto Deposit" }), _jsx(Button, { variant: "outline", className: "w-full border-gray-600", children: "Cash Out Bets" })] })] }), _jsxs(Card, { className: "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(Crown, { className: "w-5 h-5 mr-2 text-yellow-400" }), "VIP Progress"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Next Tier: Platinum" }), _jsx("span", { children: "78%" })] }), _jsx(Progress, { value: 78, className: "h-2" }), _jsx("div", { className: "text-xs text-gray-400", children: "$1,200 more volume needed" })] }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("div", { className: "text-yellow-400 font-medium", children: "Current Benefits:" }), _jsxs("ul", { className: "text-xs text-gray-300 space-y-1", children: [_jsx("li", { children: "\u2022 2% daily cashback" }), _jsx("li", { children: "\u2022 Priority support" }), _jsx("li", { children: "\u2022 Exclusive promotions" })] })] })] })] })] })] }) }), _jsx(TabsContent, { value: "performance", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Weekly Profit Trend" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: profitChart.map((day, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: day.date }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: `text-sm font-medium ${day.profit > 0 ? 'text-green-400' : 'text-red-400'}`, children: [day.profit > 0 ? '+' : '', formatCurrency(day.profit)] }), _jsx("div", { className: "w-24 bg-winnex-dark rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full ${day.profit > 0 ? 'bg-green-400' : 'bg-red-400'}`, style: { width: `${Math.abs(day.profit) / 250 * 100}%` } }) })] })] }, day.date))) }) })] }), _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Breakdown" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center p-3 bg-winnex-dark rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-winnex-green", children: formatCurrency(stats.weeklyProfit) }), _jsx("div", { className: "text-xs text-gray-400", children: "This Week" })] }), _jsxs("div", { className: "text-center p-3 bg-winnex-dark rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-winnex-blue", children: formatCurrency(stats.monthlyProfit) }), _jsx("div", { className: "text-xs text-gray-400", children: "This Month" })] }), _jsxs("div", { className: "text-center p-3 bg-winnex-dark rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-yellow-400", children: stats.avgOdds }), _jsx("div", { className: "text-xs text-gray-400", children: "Avg Odds" })] }), _jsxs("div", { className: "text-center p-3 bg-winnex-dark rounded-lg", children: [_jsx("div", { className: "text-lg font-bold text-orange-400", children: stats.todaysBets }), _jsx("div", { className: "text-xs text-gray-400", children: "Today's Bets" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { children: "Win Rate Progress" }), _jsxs("span", { children: [stats.winRate, "%"] })] }), _jsx(Progress, { value: stats.winRate, className: "h-2" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { children: "ROI Performance" }), _jsxs("span", { children: [stats.roi, "%"] })] }), _jsx(Progress, { value: stats.roi > 25 ? 100 : (stats.roi / 25) * 100, className: "h-2" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "goals", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: goals.map((goal) => (_jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: goal.title }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Deadline: ", goal.deadline] })] }), _jsx(Badge, { className: "bg-winnex-green text-black", children: goal.reward })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Progress" }), _jsxs("span", { children: [goal.current, goal.type === 'winrate' ? '%' : goal.type === 'profit' ? '' : ' bets', " /", goal.target, goal.type === 'winrate' ? '%' : goal.type === 'profit' ? '' : ' bets'] })] }), _jsx(Progress, { value: (goal.current / goal.target) * 100, className: "h-3" }), _jsxs("div", { className: "text-xs text-gray-400", children: [((goal.current / goal.target) * 100).toFixed(1), "% complete"] })] })] }) }, goal.id))) }) }), _jsx(TabsContent, { value: "insights", className: "space-y-4", children: _jsxs("div", { className: "grid gap-4", children: [_jsxs(Card, { className: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Star, { className: "w-5 h-5 mr-2 text-blue-400" }), "AI Performance Analysis"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-medium", children: "Optimal Betting Times" }), _jsxs("div", { className: "text-xs text-gray-400", children: ["\u2022 Weekends: 2-6 PM (78% win rate)", _jsx("br", {}), "\u2022 Live betting: During 2nd half (65% win rate)", _jsx("br", {}), "\u2022 Value bets: Tuesday-Thursday (best odds)"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm font-medium", children: "Strength Analysis" }), _jsxs("div", { className: "text-xs text-gray-400", children: ["\u2022 Football totals: 73% accuracy", _jsx("br", {}), "\u2022 Basketball spreads: 69% accuracy", _jsx("br", {}), "\u2022 Live betting: 62% accuracy"] })] })] }), _jsxs("div", { className: "bg-winnex-dark rounded-lg p-3", children: [_jsx("div", { className: "font-medium text-sm text-winnex-green mb-2", children: "AI Recommendation" }), _jsx("div", { className: "text-sm text-gray-300", children: "Focus on football over/under bets during weekend prime time. Your historical data shows 78% success rate in this category. Consider reducing live betting volume to improve overall ROI." })] })] })] }), _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Risk Management Alert" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-green-400", children: "Bankroll Health: Excellent" }), _jsx("div", { className: "text-sm text-gray-400", children: "Current risk level: Low" })] }), _jsx("div", { className: "text-green-400", children: "\u2705" })] }), _jsxs("div", { className: "text-sm text-gray-300", children: [_jsx("strong", { children: "Recommended Actions:" }), _jsx("br", {}), "\u2022 Maintain current stake sizing (2-3% of bankroll)", _jsx("br", {}), "\u2022 Continue diversifying across sports", _jsx("br", {}), "\u2022 Consider increasing stakes on high-confidence AI picks"] })] }) })] })] }) })] })] }));
}
