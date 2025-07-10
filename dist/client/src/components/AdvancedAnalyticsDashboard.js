import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Target, Users, DollarSign, Zap, Activity, Clock, MapPin } from 'lucide-react';
export default function AdvancedAnalyticsDashboard() {
    const [analytics, setAnalytics] = useState(null);
    const [timeRange, setTimeRange] = useState('24h');
    const [activeTab, setActiveTab] = useState('overview');
    useEffect(() => {
        // Simulate real-time analytics data
        const generateAnalytics = () => ({
            userMetrics: {
                totalUsers: 12847 + Math.floor(Math.random() * 100),
                activeUsers24h: 3241 + Math.floor(Math.random() * 50),
                newUsers24h: 287 + Math.floor(Math.random() * 20),
                userRetention: 78.5 + Math.random() * 5,
                avgSessionTime: '24m 35s',
                topCountries: [
                    { country: 'United States', users: 4892, percentage: 38.1 },
                    { country: 'United Kingdom', users: 2156, percentage: 16.8 },
                    { country: 'Canada', users: 1834, percentage: 14.3 },
                    { country: 'Australia', users: 1425, percentage: 11.1 },
                    { country: 'Germany', users: 967, percentage: 7.5 }
                ]
            },
            bettingMetrics: {
                totalBets24h: 8945 + Math.floor(Math.random() * 200),
                totalVolume24h: 2847592 + Math.floor(Math.random() * 50000),
                winRate: 52.3 + Math.random() * 3,
                avgBetSize: 47.85 + Math.random() * 10,
                popularSports: [
                    { sport: 'Football (NFL)', volume: 892450, percentage: 31.3 },
                    { sport: 'Basketball (NBA)', volume: 645230, percentage: 22.7 },
                    { sport: 'Soccer', volume: 523180, percentage: 18.4 },
                    { sport: 'Baseball (MLB)', volume: 387920, percentage: 13.6 },
                    { sport: 'Tennis', volume: 298760, percentage: 10.5 }
                ],
                peakHours: Array.from({ length: 24 }, (_, i) => ({
                    hour: i,
                    volume: Math.floor(50000 + Math.sin(i * Math.PI / 12) * 30000 + Math.random() * 10000)
                }))
            },
            financialMetrics: {
                revenue24h: 142879 + Math.floor(Math.random() * 5000),
                deposits24h: 789542 + Math.floor(Math.random() * 20000),
                withdrawals24h: 634218 + Math.floor(Math.random() * 15000),
                profitMargin: 23.7 + Math.random() * 2,
                cryptoBreakdown: [
                    { currency: 'Bitcoin (BTC)', amount: 18.45, percentage: 42.3 },
                    { currency: 'Ethereum (ETH)', amount: 234.7, percentage: 28.9 },
                    { currency: 'USDT', amount: 156789, percentage: 19.8 },
                    { currency: 'Litecoin (LTC)', amount: 892.3, percentage: 6.2 },
                    { currency: 'Dogecoin (DOGE)', amount: 245670, percentage: 2.8 }
                ]
            },
            performanceMetrics: {
                apiUptime: 99.97 + Math.random() * 0.03,
                avgResponseTime: 145 + Math.floor(Math.random() * 20),
                errorRate: 0.12 + Math.random() * 0.05,
                throughput: 2847 + Math.floor(Math.random() * 100),
                systemLoad: 67 + Math.floor(Math.random() * 15)
            }
        });
        setAnalytics(generateAnalytics());
        // Update every 30 seconds
        const interval = setInterval(() => {
            setAnalytics(generateAnalytics());
        }, 30000);
        return () => clearInterval(interval);
    }, [timeRange]);
    if (!analytics) {
        return _jsx("div", { className: "flex items-center justify-center h-96", children: "Loading analytics..." });
    }
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };
    const getStatusColor = (value, thresholds) => {
        if (value >= thresholds.good)
            return 'text-green-600';
        if (value >= thresholds.warning)
            return 'text-yellow-600';
        return 'text-red-600';
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Advanced Analytics" }), _jsx("p", { className: "text-gray-300", children: "Real-time platform performance and business metrics" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("select", { value: timeRange, onChange: (e) => setTimeRange(e.target.value), className: "bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2", children: [_jsx("option", { value: "1h", children: "Last Hour" }), _jsx("option", { value: "24h", children: "Last 24 Hours" }), _jsx("option", { value: "7d", children: "Last 7 Days" }), _jsx("option", { value: "30d", children: "Last 30 Days" })] }), _jsxs(Badge, { variant: "outline", className: "text-green-400 border-green-400", children: [_jsx(Activity, { className: "h-3 w-3 mr-1" }), "Live Data"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Revenue (24h)" }), _jsx("p", { className: "text-2xl font-bold text-green-400", children: formatCurrency(analytics.financialMetrics.revenue24h) }), _jsxs("p", { className: "text-green-400 text-sm flex items-center", children: [_jsx(TrendingUp, { className: "h-3 w-3 mr-1" }), "+12.5% vs yesterday"] })] }), _jsx(DollarSign, { className: "h-8 w-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Active Users" }), _jsx("p", { className: "text-2xl font-bold text-blue-400", children: formatNumber(analytics.userMetrics.activeUsers24h) }), _jsxs("p", { className: "text-blue-400 text-sm flex items-center", children: [_jsx(TrendingUp, { className: "h-3 w-3 mr-1" }), "+8.3% vs yesterday"] })] }), _jsx(Users, { className: "h-8 w-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "Total Bets (24h)" }), _jsx("p", { className: "text-2xl font-bold text-purple-400", children: formatNumber(analytics.bettingMetrics.totalBets24h) }), _jsxs("p", { className: "text-purple-400 text-sm flex items-center", children: [_jsx(TrendingUp, { className: "h-3 w-3 mr-1" }), "+15.7% vs yesterday"] })] }), _jsx(Target, { className: "h-8 w-8 text-purple-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-400 text-sm", children: "System Uptime" }), _jsxs("p", { className: `text-2xl font-bold ${getStatusColor(analytics.performanceMetrics.apiUptime, { good: 99.9, warning: 99.5 })}`, children: [analytics.performanceMetrics.apiUptime.toFixed(2), "%"] }), _jsxs("p", { className: "text-green-400 text-sm flex items-center", children: [_jsx(Zap, { className: "h-3 w-3 mr-1" }), "Excellent"] })] }), _jsx(Activity, { className: "h-8 w-8 text-green-400" })] }) }) })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-black/40 border-gray-700", children: [_jsx(TabsTrigger, { value: "overview", className: "text-white", children: "Overview" }), _jsx(TabsTrigger, { value: "users", className: "text-white", children: "Users" }), _jsx(TabsTrigger, { value: "betting", className: "text-white", children: "Betting" }), _jsx(TabsTrigger, { value: "performance", className: "text-white", children: "Performance" })] }), _jsx(TabsContent, { value: "overview", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Financial Overview" }), _jsx(CardDescription, { className: "text-gray-400", children: "24-hour financial metrics" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Deposits" }), _jsx("span", { className: "text-green-400 font-semibold", children: formatCurrency(analytics.financialMetrics.deposits24h) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Withdrawals" }), _jsx("span", { className: "text-red-400 font-semibold", children: formatCurrency(analytics.financialMetrics.withdrawals24h) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Net Inflow" }), _jsx("span", { className: "text-blue-400 font-semibold", children: formatCurrency(analytics.financialMetrics.deposits24h - analytics.financialMetrics.withdrawals24h) })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Profit Margin" }), _jsxs("span", { className: "text-green-400 font-semibold", children: [analytics.financialMetrics.profitMargin.toFixed(1), "%"] })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Cryptocurrency Breakdown" }), _jsx(CardDescription, { className: "text-gray-400", children: "Volume by currency" })] }), _jsx(CardContent, { className: "space-y-4", children: analytics.financialMetrics.cryptoBreakdown.map((crypto, index) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: crypto.currency }), _jsxs("span", { className: "text-white font-semibold", children: [crypto.percentage, "%"] })] }), _jsx(Progress, { value: crypto.percentage, className: "h-2" })] }, index))) })] })] }) }), _jsx(TabsContent, { value: "users", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "User Statistics" }), _jsx(CardDescription, { className: "text-gray-400", children: "User engagement metrics" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-blue-400", children: formatNumber(analytics.userMetrics.totalUsers) }), _jsx("p", { className: "text-gray-400 text-sm", children: "Total Users" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-green-400", children: formatNumber(analytics.userMetrics.newUsers24h) }), _jsx("p", { className: "text-gray-400 text-sm", children: "New Users (24h)" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "User Retention Rate" }), _jsxs("span", { className: "text-green-400 font-semibold", children: [analytics.userMetrics.userRetention.toFixed(1), "%"] })] }), _jsx(Progress, { value: analytics.userMetrics.userRetention, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Avg Session Time" }), _jsx("span", { className: "text-blue-400 font-semibold", children: analytics.userMetrics.avgSessionTime })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Geographic Distribution" }), _jsx(CardDescription, { className: "text-gray-400", children: "Users by country" })] }), _jsx(CardContent, { className: "space-y-4", children: analytics.userMetrics.topCountries.map((country, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MapPin, { className: "h-4 w-4 text-gray-400" }), _jsx("span", { className: "text-gray-300", children: country.country })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-white font-semibold", children: formatNumber(country.users) }), _jsxs("p", { className: "text-gray-400 text-sm", children: [country.percentage, "%"] })] })] }, index))) })] })] }) }), _jsx(TabsContent, { value: "betting", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Betting Performance" }), _jsx(CardDescription, { className: "text-gray-400", children: "24-hour betting metrics" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-purple-400", children: formatCurrency(analytics.bettingMetrics.totalVolume24h) }), _jsx("p", { className: "text-gray-400 text-sm", children: "Total Volume" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-2xl font-bold text-green-400", children: [analytics.bettingMetrics.winRate.toFixed(1), "%"] }), _jsx("p", { className: "text-gray-400 text-sm", children: "Win Rate" })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Average Bet Size" }), _jsx("span", { className: "text-blue-400 font-semibold", children: formatCurrency(analytics.bettingMetrics.avgBetSize) })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Popular Sports" }), _jsx(CardDescription, { className: "text-gray-400", children: "Betting volume by sport" })] }), _jsx(CardContent, { className: "space-y-4", children: analytics.bettingMetrics.popularSports.map((sport, index) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: sport.sport }), _jsx("span", { className: "text-white font-semibold", children: formatCurrency(sport.volume) })] }), _jsx(Progress, { value: sport.percentage, className: "h-2" })] }, index))) })] })] }) }), _jsx(TabsContent, { value: "performance", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "System Performance" }), _jsx(CardDescription, { className: "text-gray-400", children: "Real-time system metrics" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "API Uptime" }), _jsxs("span", { className: `font-semibold ${getStatusColor(analytics.performanceMetrics.apiUptime, { good: 99.9, warning: 99.5 })}`, children: [analytics.performanceMetrics.apiUptime.toFixed(2), "%"] })] }), _jsx(Progress, { value: analytics.performanceMetrics.apiUptime, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "System Load" }), _jsxs("span", { className: `font-semibold ${getStatusColor(100 - analytics.performanceMetrics.systemLoad, { good: 70, warning: 50 })}`, children: [analytics.performanceMetrics.systemLoad, "%"] })] }), _jsx(Progress, { value: analytics.performanceMetrics.systemLoad, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Avg Response Time" }), _jsxs("span", { className: `font-semibold ${getStatusColor(1000 - analytics.performanceMetrics.avgResponseTime, { good: 800, warning: 600 })}`, children: [analytics.performanceMetrics.avgResponseTime, "ms"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Error Rate" }), _jsxs("span", { className: `font-semibold ${getStatusColor(100 - analytics.performanceMetrics.errorRate * 100, { good: 99.5, warning: 99 })}`, children: [analytics.performanceMetrics.errorRate.toFixed(2), "%"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Throughput" }), _jsxs("span", { className: "text-blue-400 font-semibold", children: [formatNumber(analytics.performanceMetrics.throughput), " req/min"] })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Peak Activity Hours" }), _jsx(CardDescription, { className: "text-gray-400", children: "Betting volume by hour" })] }), _jsx(CardContent, { className: "space-y-2", children: analytics.bettingMetrics.peakHours
                                                    .sort((a, b) => b.volume - a.volume)
                                                    .slice(0, 8)
                                                    .map((hour, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Clock, { className: "h-4 w-4 text-gray-400" }), _jsxs("span", { className: "text-gray-300", children: [hour.hour.toString().padStart(2, '0'), ":00"] })] }), _jsx("div", { className: "text-right", children: _jsx("p", { className: "text-white font-semibold", children: formatCurrency(hour.volume) }) })] }, index))) })] })] }) })] })] }) }));
}
