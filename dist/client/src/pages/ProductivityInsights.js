import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from "recharts";
import { Brain, TrendingUp, Award, AlertTriangle, ArrowUp, ArrowDown, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
export default function ProductivityInsights() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
    const [selectedCategory, setSelectedCategory] = useState("all");
    // Fetch real data from API
    const { data: productivityMetrics = [], isLoading: metricsLoading } = useQuery({
        queryKey: ['/api/productivity/metrics', selectedTimeframe],
        retry: false
    });
    const { data: contextualInsights = [], isLoading: insightsLoading } = useQuery({
        queryKey: ['/api/productivity/insights', selectedTimeframe],
        retry: false
    });
    const { data: performanceData = [], isLoading: performanceLoading } = useQuery({
        queryKey: ['/api/productivity/performance-data'],
        retry: false
    });
    // Fallback mock data for demo
    const fallbackMetrics = [
        {
            id: "betting_accuracy",
            title: "Betting Accuracy",
            value: 67.3,
            change: 5.2,
            trend: 'up',
            category: 'betting',
            insight: "Your prediction accuracy has improved significantly this week",
            action: "Consider increasing bet sizes on high-confidence picks"
        },
        {
            id: "roi_performance",
            title: "ROI Performance",
            value: 12.8,
            change: -2.1,
            trend: 'down',
            category: 'financial',
            insight: "Returns have decreased due to recent larger bets",
            action: "Review bankroll management strategy"
        },
        {
            id: "research_time",
            title: "Research Time (hrs)",
            value: 3.2,
            change: 0.8,
            trend: 'up',
            category: 'engagement',
            insight: "Increased research correlates with better outcomes",
            action: "Maintain current research intensity"
        },
        {
            id: "portfolio_diversity",
            title: "Portfolio Diversity",
            value: 8.5,
            change: 1.2,
            trend: 'up',
            category: 'financial',
            insight: "Good diversification across sports and bet types",
            action: "Consider exploring new markets"
        }
    ];
    const fallbackInsights = [
        {
            id: "opportunity_1",
            type: 'opportunity',
            title: "High-Value NBA Opportunity",
            description: "Lakers vs Celtics shows 15% value bet opportunity based on your historical performance",
            impact: 'high',
            urgency: 'immediate',
            actionable: true,
            relatedMetrics: ["betting_accuracy", "roi_performance"]
        },
        {
            id: "warning_1",
            type: 'warning',
            title: "Bankroll Management Alert",
            description: "You've exceeded 5% of bankroll on a single bet 3 times this week",
            impact: 'medium',
            urgency: 'this_week',
            actionable: true,
            relatedMetrics: ["roi_performance"]
        },
        {
            id: "achievement_1",
            type: 'achievement',
            title: "Research Consistency Milestone",
            description: "You've maintained 3+ hours of daily research for 7 consecutive days",
            impact: 'medium',
            urgency: 'this_month',
            actionable: false,
            relatedMetrics: ["research_time", "betting_accuracy"]
        },
        {
            id: "recommendation_1",
            type: 'recommendation',
            title: "Optimize Bet Timing",
            description: "Your bets placed 2-4 hours before game time show 23% higher success rates",
            impact: 'high',
            urgency: 'this_week',
            actionable: true,
            relatedMetrics: ["betting_accuracy"]
        }
    ];
    const fallbackPerformanceData = [
        { name: 'Mon', bets: 4, wins: 3, roi: 8.2, research: 2.5 },
        { name: 'Tue', bets: 6, wins: 4, roi: 12.1, research: 3.2 },
        { name: 'Wed', bets: 3, wins: 2, roi: -5.3, research: 1.8 },
        { name: 'Thu', bets: 5, wins: 4, roi: 15.7, research: 4.1 },
        { name: 'Fri', bets: 7, wins: 5, roi: 9.8, research: 3.6 },
        { name: 'Sat', bets: 8, wins: 6, roi: 18.2, research: 4.3 },
        { name: 'Sun', bets: 5, wins: 3, roi: 7.4, research: 2.9 }
    ];
    const categoryDistribution = [
        { name: 'NFL', value: 35, color: '#10b981' },
        { name: 'NBA', value: 28, color: '#06b6d4' },
        { name: 'Soccer', value: 22, color: '#8b5cf6' },
        { name: 'Tennis', value: 15, color: '#f59e0b' }
    ];
    const getInsightIcon = (type) => {
        switch (type) {
            case 'opportunity': return _jsx(TrendingUp, { className: "w-5 h-5 text-green-500" });
            case 'warning': return _jsx(AlertTriangle, { className: "w-5 h-5 text-yellow-500" });
            case 'achievement': return _jsx(Award, { className: "w-5 h-5 text-blue-500" });
            case 'recommendation': return _jsx(Lightbulb, { className: "w-5 h-5 text-purple-500" });
            default: return _jsx(Brain, { className: "w-5 h-5 text-gray-500" });
        }
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };
    // Use API data or fallback to mock data
    const displayMetrics = productivityMetrics.length > 0
        ? productivityMetrics
        : fallbackMetrics;
    const displayInsights = contextualInsights.length > 0
        ? contextualInsights
        : fallbackInsights;
    const displayPerformanceData = performanceData.length > 0
        ? performanceData
        : fallbackPerformanceData;
    const filteredMetrics = selectedCategory === 'all'
        ? displayMetrics
        : displayMetrics.filter((m) => m.category === selectedCategory);
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900", children: _jsxs("div", { className: "max-w-7xl mx-auto p-6", children: [_jsx(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h1", { className: "text-4xl font-bold text-white mb-2", children: [_jsx(Brain, { className: "w-10 h-10 inline-block mr-3 text-purple-400" }), "Productivity Insights Dashboard"] }), _jsx("p", { className: "text-gray-300", children: "AI-powered analysis of your performance, patterns, and opportunities" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: selectedTimeframe === '24h' ? 'default' : 'outline', onClick: () => setSelectedTimeframe('24h'), className: "text-white", children: "24H" }), _jsx(Button, { variant: selectedTimeframe === '7d' ? 'default' : 'outline', onClick: () => setSelectedTimeframe('7d'), className: "text-white", children: "7D" }), _jsx(Button, { variant: selectedTimeframe === '30d' ? 'default' : 'outline', onClick: () => setSelectedTimeframe('30d'), className: "text-white", children: "30D" })] })] }) }), _jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-black/50 border-purple-500/30", children: [_jsx(TabsTrigger, { value: "overview", className: "text-white", children: "Overview" }), _jsx(TabsTrigger, { value: "performance", className: "text-white", children: "Performance" }), _jsx(TabsTrigger, { value: "insights", className: "text-white", children: "AI Insights" }), _jsx(TabsTrigger, { value: "recommendations", className: "text-white", children: "Actions" })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: filteredMetrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-purple-500/30 hover:border-purple-400/60 transition-all", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-sm font-medium text-gray-300", children: metric.title }), metric.trend === 'up' ? (_jsx(ArrowUp, { className: "w-4 h-4 text-green-500" })) : metric.trend === 'down' ? (_jsx(ArrowDown, { className: "w-4 h-4 text-red-500" })) : (_jsx("div", { className: "w-4 h-4 bg-gray-500 rounded-full" }))] }), _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs("span", { className: "text-2xl font-bold text-white", children: [metric.value, metric.category === 'financial' ? '%' : metric.id === 'research_time' ? 'h' : '%'] }), _jsxs(Badge, { variant: metric.trend === 'up' ? 'default' : 'destructive', className: "text-xs", children: [metric.change > 0 ? '+' : '', metric.change, "%"] })] }), _jsx("p", { className: "text-xs text-gray-400", children: metric.insight })] }) }) }, metric.id))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/50 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Weekly Performance Trend" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: displayPerformanceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "name", stroke: "#9ca3af" }), _jsx(YAxis, { stroke: "#9ca3af" }), _jsx(Tooltip, { contentStyle: {
                                                                        backgroundColor: '#1f2937',
                                                                        border: '1px solid #6b7280',
                                                                        borderRadius: '8px'
                                                                    } }), _jsx(Area, { type: "monotone", dataKey: "roi", stroke: "#8b5cf6", fill: "#8b5cf6", fillOpacity: 0.3 })] }) }) })] }), _jsxs(Card, { className: "bg-black/50 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Sport Distribution" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: categoryDistribution, cx: "50%", cy: "50%", outerRadius: 100, fill: "#8884d8", dataKey: "value", label: ({ name, value }) => `${name} ${value}%`, children: categoryDistribution.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }) })] })] })] }), _jsx(TabsContent, { value: "performance", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/50 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Detailed Performance Analysis" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(LineChart, { data: displayPerformanceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "name", stroke: "#9ca3af" }), _jsx(YAxis, { stroke: "#9ca3af" }), _jsx(Tooltip, { contentStyle: {
                                                            backgroundColor: '#1f2937',
                                                            border: '1px solid #6b7280',
                                                            borderRadius: '8px'
                                                        } }), _jsx(Line, { type: "monotone", dataKey: "roi", stroke: "#10b981", strokeWidth: 3 }), _jsx(Line, { type: "monotone", dataKey: "research", stroke: "#06b6d4", strokeWidth: 2 })] }) }) })] }) }), _jsx(TabsContent, { value: "insights", className: "space-y-6", children: _jsx("div", { className: "grid gap-4", children: displayInsights.map((insight, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-purple-500/30 hover:border-purple-400/60 transition-all", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [getInsightIcon(insight.type), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: insight.title }), _jsx("div", { className: `w-2 h-2 rounded-full ${getImpactColor(insight.impact)}` })] }), _jsx("p", { className: "text-gray-300 mb-3", children: insight.description }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Badge, { variant: "outline", className: "text-xs", children: [insight.impact, " impact"] }), _jsx(Badge, { variant: "outline", className: "text-xs", children: insight.urgency.replace('_', ' ') })] })] })] }), insight.actionable && (_jsx(Button, { size: "sm", className: "bg-purple-600 hover:bg-purple-700", children: "Take Action" }))] }) }) }) }, insight.id))) }) }), _jsx(TabsContent, { value: "recommendations", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: displayMetrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-purple-500/30", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: metric.title }), _jsx(Badge, { className: "bg-purple-600", children: metric.category })] }), _jsx("p", { className: "text-gray-300 mb-4", children: metric.action }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex justify-between text-sm mb-1", children: [_jsx("span", { className: "text-gray-400", children: "Progress" }), _jsxs("span", { className: "text-white", children: [metric.value, "%"] })] }), _jsx(Progress, { value: metric.value, className: "h-2" })] }), _jsx(Button, { className: "bg-gradient-to-r from-purple-600 to-blue-600", children: "Implement" })] })] }) }) }, metric.id))) }) })] })] }) }));
}
