import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Activity, Users, DollarSign, Eye, Zap, Globe, Smartphone, Monitor as Desktop, Target, BarChart3, LineChart, PieChart, Monitor, Cpu, Database, Network, RefreshCw, Play, Pause } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
const SAMPLE_SESSIONS = [
    {
        id: '1',
        userId: 'USR_001',
        country: 'US',
        device: 'mobile',
        duration: 45,
        betsPlaced: 3,
        totalStaked: 150,
        status: 'betting'
    },
    {
        id: '2',
        userId: 'USR_002',
        country: 'UK',
        device: 'desktop',
        duration: 23,
        betsPlaced: 1,
        totalStaked: 75,
        status: 'active'
    },
    {
        id: '3',
        userId: 'USR_003',
        country: 'CA',
        device: 'mobile',
        duration: 67,
        betsPlaced: 5,
        totalStaked: 340,
        status: 'betting'
    }
];
const REVENUE_STREAMS = [
    {
        source: 'Sports Betting',
        amount: 47892,
        percentage: 68,
        trend: 'up',
        change: 12.5
    },
    {
        source: 'Live Betting',
        amount: 18743,
        percentage: 27,
        trend: 'up',
        change: 8.3
    },
    {
        source: 'Casino Games',
        amount: 3521,
        percentage: 5,
        trend: 'down',
        change: -2.1
    }
];
export default function RealTimeAnalytics() {
    const [activeTab, setActiveTab] = useState('live-metrics');
    const [isLive, setIsLive] = useState(true);
    const [refreshRate, setRefreshRate] = useState(5000);
    const { data: liveMetrics } = useQuery({
        queryKey: ['/api/analytics/live-metrics'],
        refetchInterval: isLive ? refreshRate : false
    });
    const { data: activeSessions } = useQuery({
        queryKey: ['/api/analytics/active-sessions'],
        refetchInterval: isLive ? 10000 : false
    });
    const { data: revenueData } = useQuery({
        queryKey: ['/api/analytics/revenue-streams'],
        refetchInterval: isLive ? 30000 : false
    });
    // Mock live metrics with real-time updates
    const [mockMetrics, setMockMetrics] = useState({
        activeUsers: 1247,
        totalBets: 3891,
        totalVolume: 89432,
        conversionRate: 73.2,
        avgBetSize: 23.45,
        winRate: 47.8,
        timestamp: new Date()
    });
    useEffect(() => {
        if (!isLive)
            return;
        const interval = setInterval(() => {
            setMockMetrics(prev => ({
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
                totalBets: prev.totalBets + Math.floor(Math.random() * 20),
                totalVolume: prev.totalVolume + Math.floor(Math.random() * 500),
                conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() - 0.5) * 2)),
                avgBetSize: Math.max(0, prev.avgBetSize + (Math.random() - 0.5) * 5),
                winRate: Math.max(0, Math.min(100, prev.winRate + (Math.random() - 0.5) * 3)),
                timestamp: new Date()
            }));
        }, refreshRate);
        return () => clearInterval(interval);
    }, [isLive, refreshRate]);
    const getDeviceIcon = (device) => {
        switch (device) {
            case 'mobile': return _jsx(Smartphone, { className: "w-4 h-4" });
            case 'desktop': return _jsx(Desktop, { className: "w-4 h-4" });
            default: return _jsx(Monitor, { className: "w-4 h-4" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'betting': return 'bg-green-500/20 text-green-400';
            case 'active': return 'bg-blue-500/20 text-blue-400';
            case 'idle': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return _jsx(TrendingUp, { className: "w-4 h-4 text-green-400" });
            case 'down': return _jsx(TrendingUp, { className: "w-4 h-4 text-red-400 rotate-180" });
            default: return _jsx(Activity, { className: "w-4 h-4 text-gray-400" });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-winnex-black text-white p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4", children: "Real-Time Analytics Engine" }), _jsx("p", { className: "text-gray-300 text-lg", children: "Live monitoring, user behavior tracking, and revenue analytics" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { onClick: () => setIsLive(!isLive), variant: isLive ? "default" : "outline", className: isLive ? "bg-green-600 hover:bg-green-700" : "border-gray-600", children: isLive ? (_jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-4 h-4 mr-2" }), "Live"] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4 mr-2" }), "Paused"] })) }), _jsxs("select", { value: refreshRate, onChange: (e) => setRefreshRate(Number(e.target.value)), className: "bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm", children: [_jsx("option", { value: 1000, children: "1s" }), _jsx("option", { value: 5000, children: "5s" }), _jsx("option", { value: 10000, children: "10s" }), _jsx("option", { value: 30000, children: "30s" })] })] })] }), isLive && (_jsx("div", { className: "bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-4 mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-3 h-3 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { className: "font-medium", children: "Live Analytics Active" }), _jsxs(Badge, { className: "bg-green-500/20 text-green-400", children: ["Last Update: ", mockMetrics.timestamp.toLocaleTimeString()] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-400", children: [_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }), "Refreshing every ", refreshRate / 1000, "s"] })] }) })), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8", children: [_jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Active Users" }), _jsx("p", { className: "text-2xl font-bold text-green-400", children: mockMetrics.activeUsers })] }), _jsx(Users, { className: "w-8 h-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Total Bets" }), _jsx("p", { className: "text-2xl font-bold text-blue-400", children: mockMetrics.totalBets })] }), _jsx(Target, { className: "w-8 h-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Volume" }), _jsxs("p", { className: "text-2xl font-bold text-purple-400", children: ["$", mockMetrics.totalVolume] })] }), _jsx(DollarSign, { className: "w-8 h-8 text-purple-400" })] }) }) }), _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Conversion" }), _jsxs("p", { className: "text-2xl font-bold text-yellow-400", children: [mockMetrics.conversionRate.toFixed(1), "%"] })] }), _jsx(TrendingUp, { className: "w-8 h-8 text-yellow-400" })] }) }) }), _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Avg Bet" }), _jsxs("p", { className: "text-2xl font-bold text-orange-400", children: ["$", mockMetrics.avgBetSize.toFixed(2)] })] }), _jsx(BarChart3, { className: "w-8 h-8 text-orange-400" })] }) }) }), _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Win Rate" }), _jsxs("p", { className: "text-2xl font-bold text-red-400", children: [mockMetrics.winRate.toFixed(1), "%"] })] }), _jsx(Activity, { className: "w-8 h-8 text-red-400" })] }) }) })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-4 gap-2 h-auto p-1 bg-gray-900", children: [_jsxs(TabsTrigger, { value: "live-metrics", className: "flex items-center gap-2 h-12", children: [_jsx(Activity, { className: "w-4 h-4" }), "Live Metrics"] }), _jsxs(TabsTrigger, { value: "user-sessions", className: "flex items-center gap-2 h-12", children: [_jsx(Users, { className: "w-4 h-4" }), "User Sessions"] }), _jsxs(TabsTrigger, { value: "revenue-analysis", className: "flex items-center gap-2 h-12", children: [_jsx(DollarSign, { className: "w-4 h-4" }), "Revenue Analysis"] }), _jsxs(TabsTrigger, { value: "system-performance", className: "flex items-center gap-2 h-12", children: [_jsx(Cpu, { className: "w-4 h-4" }), "System Performance"] })] }), _jsx(TabsContent, { value: "live-metrics", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(LineChart, { className: "w-6 h-6 text-blue-400" }), "User Activity Heatmap"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Peak Hours (6-10 PM)" }), _jsx("span", { className: "text-green-400 font-bold", children: "94% Activity" })] }), _jsx(Progress, { value: 94, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Prime Time (8-11 PM)" }), _jsx("span", { className: "text-blue-400 font-bold", children: "87% Activity" })] }), _jsx(Progress, { value: 87, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Late Night (11 PM-1 AM)" }), _jsx("span", { className: "text-yellow-400 font-bold", children: "45% Activity" })] }), _jsx(Progress, { value: 45, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Early Morning (6-9 AM)" }), _jsx("span", { className: "text-gray-400 font-bold", children: "23% Activity" })] }), _jsx(Progress, { value: 23, className: "h-3" })] }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Globe, { className: "w-6 h-6 text-purple-400" }), "Geographic Distribution"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDDFA\uD83C\uDDF8 United States" }), _jsx("span", { className: "text-blue-400 font-bold", children: "34%" })] }), _jsx(Progress, { value: 34, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDDEC\uD83C\uDDE7 United Kingdom" }), _jsx("span", { className: "text-green-400 font-bold", children: "23%" })] }), _jsx(Progress, { value: 23, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDDE8\uD83C\uDDE6 Canada" }), _jsx("span", { className: "text-yellow-400 font-bold", children: "18%" })] }), _jsx(Progress, { value: 18, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDDE6\uD83C\uDDFA Australia" }), _jsx("span", { className: "text-purple-400 font-bold", children: "12%" })] }), _jsx(Progress, { value: 12, className: "h-3" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDF0D Others" }), _jsx("span", { className: "text-gray-400 font-bold", children: "13%" })] }), _jsx(Progress, { value: 13, className: "h-3" })] }) })] })] }) }), _jsx(TabsContent, { value: "user-sessions", children: _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "w-6 h-6 text-green-400" }), "Active User Sessions"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: SAMPLE_SESSIONS.map((session) => (_jsx("div", { className: "p-4 bg-gray-800 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getDeviceIcon(session.device), _jsx("span", { className: "font-medium", children: session.userId })] }), _jsx(Badge, { className: getStatusColor(session.status), children: session.status }), _jsxs("span", { className: "text-sm text-gray-400", children: ["\uD83C\uDF0D ", session.country] })] }), _jsxs("div", { className: "flex items-center gap-6 text-sm", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400", children: "Duration" }), _jsxs("p", { className: "font-bold", children: [session.duration, "m"] })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400", children: "Bets" }), _jsx("p", { className: "font-bold text-blue-400", children: session.betsPlaced })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-400", children: "Staked" }), _jsxs("p", { className: "font-bold text-green-400", children: ["$", session.totalStaked] })] })] })] }) }, session.id))) }) })] }) }), _jsx(TabsContent, { value: "revenue-analysis", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(PieChart, { className: "w-6 h-6 text-yellow-400" }), "Revenue Streams"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: REVENUE_STREAMS.map((stream, idx) => (_jsxs("div", { className: "p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "font-semibold", children: stream.source }), _jsxs("div", { className: "flex items-center gap-2", children: [getTrendIcon(stream.trend), _jsxs("span", { className: `text-sm font-bold ${stream.trend === 'up' ? 'text-green-400' :
                                                                                    stream.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`, children: [stream.change > 0 ? '+' : '', stream.change, "%"] })] })] }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsxs("span", { className: "text-2xl font-bold text-blue-400", children: ["$", stream.amount.toLocaleString()] }), _jsxs("span", { className: "text-lg font-medium text-gray-400", children: [stream.percentage, "%"] })] }), _jsx(Progress, { value: stream.percentage, className: "h-2" })] }, idx))) }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-6 h-6 text-green-400" }), "Performance Metrics"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Daily Revenue Goal" }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { children: "$78,000 / $85,000" }), _jsx("span", { className: "text-green-400 font-bold", children: "92%" })] }), _jsx(Progress, { value: 92, className: "h-3" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30", children: [_jsx("h3", { className: "font-semibold mb-2", children: "User Acquisition Target" }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { children: "1,847 / 2,000 new users" }), _jsx("span", { className: "text-blue-400 font-bold", children: "92%" })] }), _jsx(Progress, { value: 92, className: "h-3" })] }), _jsxs("div", { className: "p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-lg border border-purple-500/30", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Retention Rate" }), _jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { children: "87% this month" }), _jsx("span", { className: "text-purple-400 font-bold", children: "Excellent" })] }), _jsx(Progress, { value: 87, className: "h-3" })] })] }) })] })] }) }), _jsx(TabsContent, { value: "system-performance", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Cpu, { className: "w-5 h-5 text-blue-400" }), "CPU Usage"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-blue-400 mb-2", children: "23%" }), _jsx(Progress, { value: 23, className: "h-3 mb-2" }), _jsx("p", { className: "text-sm text-gray-400", children: "Optimal" })] }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Database, { className: "w-5 h-5 text-green-400" }), "Memory"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-green-400 mb-2", children: "67%" }), _jsx(Progress, { value: 67, className: "h-3 mb-2" }), _jsx("p", { className: "text-sm text-gray-400", children: "Good" })] }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Network, { className: "w-5 h-5 text-yellow-400" }), "Network I/O"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-yellow-400 mb-2", children: "1.2GB/s" }), _jsx(Progress, { value: 45, className: "h-3 mb-2" }), _jsx("p", { className: "text-sm text-gray-400", children: "Normal" })] }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5 text-purple-400" }), "Response Time"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-3xl font-bold text-purple-400 mb-2", children: "89ms" }), _jsx(Progress, { value: 95, className: "h-3 mb-2" }), _jsx("p", { className: "text-sm text-gray-400", children: "Excellent" })] }) })] })] }) })] })] }) }));
}
