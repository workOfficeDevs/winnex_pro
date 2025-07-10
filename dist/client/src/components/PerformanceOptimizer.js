import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, TrendingUp, Cpu, HardDrive, Wifi, Database, Activity, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
export default function PerformanceOptimizer() {
    const [metrics, setMetrics] = useState([]);
    const [optimizations, setOptimizations] = useState([
        {
            id: 'api_caching',
            name: 'API Response Caching',
            category: 'caching',
            enabled: true,
            impact: 'high',
            description: 'Cache API responses for 30 seconds to reduce load',
            performance_gain: 35
        },
        {
            id: 'db_indexing',
            name: 'Database Indexing',
            category: 'database',
            enabled: true,
            impact: 'high',
            description: 'Optimize database queries with proper indexing',
            performance_gain: 45
        },
        {
            id: 'cdn_assets',
            name: 'CDN Asset Delivery',
            category: 'frontend',
            enabled: true,
            impact: 'medium',
            description: 'Serve static assets via CDN for faster loading',
            performance_gain: 25
        },
        {
            id: 'connection_pooling',
            name: 'Connection Pooling',
            category: 'database',
            enabled: true,
            impact: 'medium',
            description: 'Reuse database connections for better performance',
            performance_gain: 20
        },
        {
            id: 'gzip_compression',
            name: 'GZIP Compression',
            category: 'api',
            enabled: true,
            impact: 'medium',
            description: 'Compress API responses to reduce bandwidth',
            performance_gain: 30
        },
        {
            id: 'lazy_loading',
            name: 'Component Lazy Loading',
            category: 'frontend',
            enabled: false,
            impact: 'low',
            description: 'Load components only when needed',
            performance_gain: 15
        }
    ]);
    const [systemHealth, setSystemHealth] = useState(98.7);
    const [autoOptimize, setAutoOptimize] = useState(true);
    // Simulate real-time performance data
    useEffect(() => {
        const interval = setInterval(() => {
            const newMetric = {
                timestamp: new Date().toISOString(),
                api_response: Math.floor(Math.random() * 100) + 80,
                database_query: Math.floor(Math.random() * 50) + 20,
                memory_usage: Math.floor(Math.random() * 30) + 40,
                cpu_usage: Math.floor(Math.random() * 25) + 15,
                throughput: Math.floor(Math.random() * 500) + 1500
            };
            setMetrics(prev => [...prev.slice(-19), newMetric]);
            // Auto-optimize based on metrics
            if (autoOptimize) {
                if (newMetric.api_response > 150) {
                    toggleOptimization('api_caching', true);
                }
                if (newMetric.database_query > 60) {
                    toggleOptimization('db_indexing', true);
                    toggleOptimization('connection_pooling', true);
                }
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [autoOptimize]);
    const toggleOptimization = (id, enable) => {
        setOptimizations(prev => prev.map(opt => opt.id === id
            ? { ...opt, enabled: enable !== undefined ? enable : !opt.enabled }
            : opt));
    };
    const calculateOverallPerformance = () => {
        const enabledOptimizations = optimizations.filter(o => o.enabled);
        const totalGain = enabledOptimizations.reduce((sum, opt) => sum + opt.performance_gain, 0);
        return Math.min(100, 60 + (totalGain * 0.4)); // Base 60% + optimizations
    };
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'caching': return _jsx(Zap, { className: "h-4 w-4" });
            case 'database': return _jsx(Database, { className: "h-4 w-4" });
            case 'api': return _jsx(Wifi, { className: "h-4 w-4" });
            case 'frontend': return _jsx(Activity, { className: "h-4 w-4" });
            default: return _jsx(Settings, { className: "h-4 w-4" });
        }
    };
    const currentMetrics = metrics[metrics.length - 1];
    const overallPerformance = calculateOverallPerformance();
    const enabledCount = optimizations.filter(o => o.enabled).length;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Performance Optimizer" }), _jsx("p", { className: "text-gray-300", children: "Real-time performance optimization and monitoring" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Badge, { className: overallPerformance >= 95 ? 'bg-green-500' : overallPerformance >= 85 ? 'bg-yellow-500' : 'bg-red-500', children: ["Performance: ", overallPerformance.toFixed(1), "%"] }), _jsxs(Button, { onClick: () => setAutoOptimize(!autoOptimize), variant: autoOptimize ? "default" : "outline", children: ["Auto-Optimize ", autoOptimize ? 'ON' : 'OFF'] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-6", children: [_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "API Response" }), _jsxs("p", { className: "text-2xl font-bold text-blue-400", children: [currentMetrics?.api_response || 0, "ms"] })] }), _jsx(Wifi, { className: "h-8 w-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "DB Query" }), _jsxs("p", { className: "text-2xl font-bold text-green-400", children: [currentMetrics?.database_query || 0, "ms"] })] }), _jsx(Database, { className: "h-8 w-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "CPU Usage" }), _jsxs("p", { className: "text-2xl font-bold text-purple-400", children: [currentMetrics?.cpu_usage || 0, "%"] })] }), _jsx(Cpu, { className: "h-8 w-8 text-purple-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Memory" }), _jsxs("p", { className: "text-2xl font-bold text-orange-400", children: [currentMetrics?.memory_usage || 0, "%"] })] }), _jsx(HardDrive, { className: "h-8 w-8 text-orange-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Throughput" }), _jsxs("p", { className: "text-2xl font-bold text-red-400", children: [currentMetrics?.throughput || 0, "/min"] })] }), _jsx(TrendingUp, { className: "h-8 w-8 text-red-400" })] }) }) })] }), _jsxs(Tabs, { defaultValue: "metrics", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-3 w-full max-w-xl", children: [_jsx(TabsTrigger, { value: "metrics", children: "Performance Metrics" }), _jsx(TabsTrigger, { value: "optimizations", children: "Optimizations" }), _jsx(TabsTrigger, { value: "analysis", children: "Analysis" })] }), _jsx(TabsContent, { value: "metrics", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Real-Time Performance Trends" }), _jsx(CardDescription, { className: "text-gray-400", children: "Live monitoring of key performance indicators" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(LineChart, { data: metrics, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "timestamp", tickFormatter: (time) => new Date(time).toLocaleTimeString(), stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { labelFormatter: (time) => new Date(time).toLocaleTimeString(), contentStyle: { backgroundColor: '#1F2937', border: '1px solid #374151' } }), _jsx(Line, { type: "monotone", dataKey: "api_response", stroke: "#3B82F6", strokeWidth: 2, name: "API Response (ms)" }), _jsx(Line, { type: "monotone", dataKey: "database_query", stroke: "#10B981", strokeWidth: 2, name: "DB Query (ms)" }), _jsx(Line, { type: "monotone", dataKey: "throughput", stroke: "#F59E0B", strokeWidth: 2, name: "Throughput (req/min)", yAxisId: "right" })] }) }) })] }) }), _jsx(TabsContent, { value: "optimizations", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Zap, { className: "h-5 w-5 mr-2" }), "Performance Optimizations (", enabledCount, "/", optimizations.length, " enabled)"] }), _jsx(CardDescription, { className: "text-gray-400", children: "Configure automatic performance optimizations" })] }), _jsx(CardContent, { className: "space-y-4", children: optimizations.map((optimization) => (_jsxs("div", { className: `p-4 rounded-lg border ${optimization.enabled ? 'bg-green-900/20 border-green-700' : 'bg-gray-800/50 border-gray-600'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getCategoryIcon(optimization.category), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: optimization.name }), _jsx("p", { className: "text-sm text-gray-400", children: optimization.description })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Badge, { className: getImpactColor(optimization.impact), children: [optimization.impact, " impact"] }), _jsxs(Badge, { className: "bg-blue-500 text-white", children: ["+", optimization.performance_gain, "%"] }), _jsx(Button, { size: "sm", onClick: () => toggleOptimization(optimization.id), variant: optimization.enabled ? "destructive" : "default", children: optimization.enabled ? 'Disable' : 'Enable' })] })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Progress, { value: optimization.enabled ? optimization.performance_gain : 0, className: "flex-1 h-2" }), _jsxs("span", { className: "text-sm text-gray-400", children: ["Performance gain: ", optimization.performance_gain, "%"] })] })] }, optimization.id))) })] }) }), _jsx(TabsContent, { value: "analysis", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "System Resource Usage" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: metrics, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "timestamp", tickFormatter: (time) => new Date(time).toLocaleTimeString(), stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { labelFormatter: (time) => new Date(time).toLocaleTimeString(), contentStyle: { backgroundColor: '#1F2937', border: '1px solid #374151' } }), _jsx(Area, { type: "monotone", dataKey: "memory_usage", stackId: "1", stroke: "#8B5CF6", fill: "#8B5CF6", fillOpacity: 0.3 }), _jsx(Area, { type: "monotone", dataKey: "cpu_usage", stackId: "1", stroke: "#F59E0B", fill: "#F59E0B", fillOpacity: 0.3 })] }) }) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Performance Summary" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-400", children: "Overall Performance" }), _jsxs("span", { className: "text-2xl font-bold text-green-400", children: [overallPerformance.toFixed(1), "%"] })] }), _jsx(Progress, { value: overallPerformance, className: "h-3" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold text-white", children: "Active Optimizations" }), optimizations.filter(o => o.enabled).map(opt => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: opt.name }), _jsx(CheckCircle, { className: "h-4 w-4 text-green-500" })] }, opt.id)))] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold text-white", children: "Recommendations" }), optimizations.filter(o => !o.enabled && o.impact === 'high').map(opt => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: opt.name }), _jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500" })] }, opt.id)))] })] })] })] }) })] })] }) }));
}
