import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Zap, CheckCircle, AlertCircle, XCircle, Settings, Users, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
export default function SystemHealthDashboard() {
    const [components, setComponents] = useState([
        { name: 'API Gateway', status: 'operational', uptime: 99.97, responseTime: 145, lastCheck: new Date(), errorCount: 2, autoHeal: true },
        { name: 'Database', status: 'operational', uptime: 99.99, responseTime: 89, lastCheck: new Date(), errorCount: 0, autoHeal: true },
        { name: 'Crypto Service', status: 'operational', uptime: 98.5, responseTime: 203, lastCheck: new Date(), errorCount: 5, autoHeal: true },
        { name: 'Sports Feed', status: 'degraded', uptime: 97.2, responseTime: 456, lastCheck: new Date(), errorCount: 12, autoHeal: false },
        { name: 'WebSocket', status: 'operational', uptime: 99.8, responseTime: 67, lastCheck: new Date(), errorCount: 1, autoHeal: true },
        { name: 'Notifications', status: 'operational', uptime: 99.1, responseTime: 234, lastCheck: new Date(), errorCount: 3, autoHeal: true },
    ]);
    const [bottlenecks, setBottlenecks] = useState([
        {
            component: 'Sports Feed API',
            type: 'api',
            severity: 'medium',
            impact: 15,
            description: 'External API rate limiting causing delays',
            solution: 'Implement request caching and fallback data'
        },
        {
            component: 'Database Queries',
            type: 'database',
            severity: 'low',
            impact: 5,
            description: 'Unoptimized queries on large datasets',
            solution: 'Add database indexing and query optimization'
        },
        {
            component: 'Crypto Price Updates',
            type: 'network',
            severity: 'low',
            impact: 8,
            description: 'Network latency to exchange APIs',
            solution: 'Use CDN and connection pooling'
        }
    ]);
    const [selfHealingEvents, setSelfHealingEvents] = useState([
        { timestamp: new Date(Date.now() - 300000), component: 'API Gateway', action: 'Restarted connection pool', success: true },
        { timestamp: new Date(Date.now() - 600000), component: 'Crypto Service', action: 'Switched to backup API', success: true },
        { timestamp: new Date(Date.now() - 900000), component: 'Database', action: 'Cleared connection timeout', success: true },
    ]);
    const [isAutoHealing, setIsAutoHealing] = useState(true);
    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setComponents(prev => prev.map(comp => ({
                ...comp,
                responseTime: Math.max(50, comp.responseTime + (Math.random() - 0.5) * 50),
                lastCheck: new Date(),
                errorCount: Math.max(0, comp.errorCount + (Math.random() < 0.1 ? 1 : 0))
            })));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    // Self-healing simulation
    useEffect(() => {
        if (!isAutoHealing)
            return;
        const healingInterval = setInterval(() => {
            const degradedComponents = components.filter(c => c.status === 'degraded' || c.errorCount > 10);
            if (degradedComponents.length > 0 && Math.random() < 0.3) {
                const componentToHeal = degradedComponents[0];
                // Simulate healing action
                setComponents(prev => prev.map(comp => comp.name === componentToHeal.name
                    ? { ...comp, status: 'operational', errorCount: 0, responseTime: Math.max(50, comp.responseTime * 0.7) }
                    : comp));
                // Add healing event
                setSelfHealingEvents(prev => [
                    {
                        timestamp: new Date(),
                        component: componentToHeal.name,
                        action: 'Auto-recovered from errors',
                        success: true
                    },
                    ...prev.slice(0, 9)
                ]);
            }
        }, 10000);
        return () => clearInterval(healingInterval);
    }, [isAutoHealing, components]);
    const getStatusIcon = (status) => {
        switch (status) {
            case 'operational': return _jsx(CheckCircle, { className: "h-5 w-5 text-green-500" });
            case 'degraded': return _jsx(AlertCircle, { className: "h-5 w-5 text-yellow-500" });
            case 'offline': return _jsx(XCircle, { className: "h-5 w-5 text-red-500" });
            default: return _jsx(Activity, { className: "h-5 w-5 text-gray-500" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'text-green-400';
            case 'degraded': return 'text-yellow-400';
            case 'offline': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };
    const operationalCount = components.filter(c => c.status === 'operational').length;
    const overallHealth = Math.round((operationalCount / components.length) * 100);
    const avgResponseTime = Math.round(components.reduce((sum, c) => sum + c.responseTime, 0) / components.length);
    const performanceData = [
        { time: '10:00', responseTime: 120, throughput: 850 },
        { time: '10:05', responseTime: 145, throughput: 920 },
        { time: '10:10', responseTime: 167, throughput: 880 },
        { time: '10:15', responseTime: 134, throughput: 950 },
        { time: '10:20', responseTime: 156, throughput: 890 },
        { time: '10:25', responseTime: 143, throughput: 920 },
    ];
    const statusDistribution = [
        { name: 'Operational', value: operationalCount, color: '#10B981' },
        { name: 'Degraded', value: components.filter(c => c.status === 'degraded').length, color: '#F59E0B' },
        { name: 'Offline', value: components.filter(c => c.status === 'offline').length, color: '#EF4444' },
    ];
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "System Health Dashboard" }), _jsx("p", { className: "text-gray-300", children: "Comprehensive system monitoring and self-healing management" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Badge, { className: overallHealth >= 95 ? 'bg-green-500' : overallHealth >= 80 ? 'bg-yellow-500' : 'bg-red-500', children: ["Overall Health: ", overallHealth, "%"] }), _jsxs(Button, { onClick: () => setIsAutoHealing(!isAutoHealing), variant: isAutoHealing ? "default" : "outline", className: "flex items-center space-x-2", children: [_jsx(Settings, { className: "h-4 w-4" }), _jsx("span", { children: isAutoHealing ? 'Auto-Healing ON' : 'Auto-Healing OFF' })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "System Health" }), _jsxs("p", { className: "text-2xl font-bold text-green-400", children: [overallHealth, "%"] })] }), _jsx(Activity, { className: "h-8 w-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Avg Response" }), _jsxs("p", { className: "text-2xl font-bold text-blue-400", children: [avgResponseTime, "ms"] })] }), _jsx(Clock, { className: "h-8 w-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Active Users" }), _jsx("p", { className: "text-2xl font-bold text-purple-400", children: "1,247" })] }), _jsx(Users, { className: "h-8 w-8 text-purple-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Self-Healing" }), _jsx("p", { className: "text-2xl font-bold text-yellow-400", children: isAutoHealing ? 'Active' : 'Disabled' })] }), _jsx(Zap, { className: "h-8 w-8 text-yellow-400" })] }) }) })] }), _jsxs(Tabs, { defaultValue: "components", className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-4 w-full max-w-2xl", children: [_jsx(TabsTrigger, { value: "components", children: "Components" }), _jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "bottlenecks", children: "Bottlenecks" }), _jsx(TabsTrigger, { value: "healing", children: "Self-Healing" })] }), _jsx(TabsContent, { value: "components", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2 bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "System Components" }), _jsx(CardDescription, { className: "text-gray-400", children: "Real-time status of all system components" })] }), _jsx(CardContent, { className: "space-y-4", children: components.map((component, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800/50 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [getStatusIcon(component.status), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: component.name }), _jsxs("p", { className: "text-sm text-gray-400", children: ["Uptime: ", component.uptime, "% | Response: ", component.responseTime, "ms"] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: getStatusColor(component.status), children: component.status }), component.autoHeal && (_jsx(Badge, { className: "bg-green-500 text-white", children: "Auto-Heal" })), component.errorCount > 0 && (_jsxs(Badge, { className: "bg-red-500 text-white", children: [component.errorCount, " errors"] }))] })] }, index))) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Status Distribution" }) }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 200, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: statusDistribution, cx: "50%", cy: "50%", outerRadius: 80, dataKey: "value", label: ({ name, value }) => `${name}: ${value}`, children: statusDistribution.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {})] }) }) })] })] }) }), _jsx(TabsContent, { value: "performance", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Performance Metrics" }), _jsx(CardDescription, { className: "text-gray-400", children: "Real-time performance tracking and trends" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 400, children: _jsxs(LineChart, { data: performanceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "time", stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { contentStyle: { backgroundColor: '#1F2937', border: '1px solid #374151' } }), _jsx(Line, { type: "monotone", dataKey: "responseTime", stroke: "#3B82F6", strokeWidth: 3, name: "Response Time (ms)" }), _jsx(Line, { type: "monotone", dataKey: "throughput", stroke: "#10B981", strokeWidth: 3, name: "Throughput (req/min)" })] }) }) })] }) }), _jsx(TabsContent, { value: "bottlenecks", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Performance Bottlenecks" }), _jsx(CardDescription, { className: "text-gray-400", children: "Identified performance issues and optimization recommendations" })] }), _jsx(CardContent, { className: "space-y-4", children: bottlenecks.map((bottleneck, index) => (_jsxs("div", { className: "p-4 bg-gray-800/50 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${getSeverityColor(bottleneck.severity)}` }), _jsx("h3", { className: "font-semibold text-white", children: bottleneck.component }), _jsx(Badge, { className: "bg-blue-500 text-white", children: bottleneck.type })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-sm text-gray-400", children: ["Impact: ", bottleneck.impact, "%"] }), _jsx(Badge, { className: getSeverityColor(bottleneck.severity), children: bottleneck.severity })] })] }), _jsx("p", { className: "text-gray-300 mb-2", children: bottleneck.description }), _jsxs("p", { className: "text-green-400 text-sm", children: ["\uD83D\uDCA1 Solution: ", bottleneck.solution] })] }, index))) })] }) }), _jsx(TabsContent, { value: "healing", className: "space-y-6", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Zap, { className: "h-5 w-5 mr-2" }), "Self-Healing Events"] }), _jsx(CardDescription, { className: "text-gray-400", children: "Automatic system recovery and healing actions" })] }), _jsx(CardContent, { className: "space-y-4", children: selfHealingEvents.map((event, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800/50 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: event.component }), _jsx("p", { className: "text-sm text-gray-400", children: event.action })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "text-sm text-gray-400", children: event.timestamp.toLocaleTimeString() }), _jsx(Badge, { className: "bg-green-500 text-white", children: "Success" })] })] }, index))) })] }) })] })] }) }));
}
