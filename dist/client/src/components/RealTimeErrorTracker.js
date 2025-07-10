import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Activity, Zap, Clock, Database, Wifi, Shield } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
export default function RealTimeErrorTracker() {
    const [errors, setErrors] = useState([]);
    const [performanceData, setPerformanceData] = useState([]);
    const [systemHealth, setSystemHealth] = useState(98.5);
    const [isMonitoring, setIsMonitoring] = useState(true);
    // Simulate real-time error tracking
    useEffect(() => {
        if (!isMonitoring)
            return;
        const interval = setInterval(() => {
            // Generate realistic error events
            const errorTypes = ['api_error', 'database_error', 'network_error', 'security_error', 'performance_error'];
            const severities = ['low', 'medium', 'high', 'critical'];
            const components = ['Payment API', 'Sports Data Feed', 'Crypto Service', 'User Auth', 'Database', 'WebSocket'];
            // Simulate occasional errors (10% chance)
            if (Math.random() < 0.1) {
                const newError = {
                    id: Date.now().toString(),
                    timestamp: new Date(),
                    type: errorTypes[Math.floor(Math.random() * errorTypes.length)],
                    severity: severities[Math.floor(Math.random() * severities.length)],
                    component: components[Math.floor(Math.random() * components.length)],
                    message: 'Connection timeout after 5000ms',
                    resolved: false,
                    responseTime: Math.floor(Math.random() * 2000) + 500,
                    affectedUsers: Math.floor(Math.random() * 50) + 1
                };
                setErrors(prev => [newError, ...prev.slice(0, 49)]); // Keep last 50 errors
            }
            // Generate performance metrics
            const newMetric = {
                timestamp: new Date(),
                responseTime: Math.floor(Math.random() * 200) + 100,
                throughput: Math.floor(Math.random() * 1000) + 500,
                errorRate: Math.random() * 2,
                activeUsers: Math.floor(Math.random() * 100) + 850
            };
            setPerformanceData(prev => [...prev.slice(-19), newMetric]); // Keep last 20 points
            // Update system health based on errors
            const recentErrors = errors.filter(e => !e.resolved && Date.now() - e.timestamp.getTime() < 300000);
            const criticalErrors = recentErrors.filter(e => e.severity === 'critical').length;
            const highErrors = recentErrors.filter(e => e.severity === 'high').length;
            let newHealth = 100 - (criticalErrors * 10) - (highErrors * 5) - (recentErrors.length * 0.5);
            setSystemHealth(Math.max(85, Math.min(100, newHealth)));
        }, 3000);
        return () => clearInterval(interval);
    }, [isMonitoring, errors]);
    const resolveError = (errorId) => {
        setErrors(prev => prev.map(error => error.id === errorId ? { ...error, resolved: true } : error));
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'bg-red-500 text-white';
            case 'high': return 'bg-orange-500 text-white';
            case 'medium': return 'bg-yellow-500 text-black';
            case 'low': return 'bg-blue-500 text-white';
            default: return 'bg-gray-500 text-white';
        }
    };
    const getErrorIcon = (type) => {
        switch (type) {
            case 'api_error': return _jsx(Wifi, { className: "h-4 w-4" });
            case 'database_error': return _jsx(Database, { className: "h-4 w-4" });
            case 'network_error': return _jsx(Activity, { className: "h-4 w-4" });
            case 'security_error': return _jsx(Shield, { className: "h-4 w-4" });
            case 'performance_error': return _jsx(Zap, { className: "h-4 w-4" });
            default: return _jsx(AlertTriangle, { className: "h-4 w-4" });
        }
    };
    const unresolvedErrors = errors.filter(e => !e.resolved);
    const criticalErrors = unresolvedErrors.filter(e => e.severity === 'critical');
    const avgResponseTime = performanceData.length > 0
        ? Math.round(performanceData.reduce((sum, m) => sum + m.responseTime, 0) / performanceData.length)
        : 0;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Real-Time Error Tracking" }), _jsx("p", { className: "text-gray-300", children: "Advanced monitoring and performance visualization" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Badge, { className: systemHealth >= 95 ? 'bg-green-500' : systemHealth >= 85 ? 'bg-yellow-500' : 'bg-red-500', children: ["System Health: ", systemHealth.toFixed(1), "%"] }), _jsx(Button, { onClick: () => setIsMonitoring(!isMonitoring), variant: isMonitoring ? "destructive" : "default", children: isMonitoring ? 'Stop Monitoring' : 'Start Monitoring' })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: [_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Active Errors" }), _jsx("p", { className: "text-2xl font-bold text-red-400", children: unresolvedErrors.length })] }), _jsx(AlertTriangle, { className: "h-8 w-8 text-red-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Critical Issues" }), _jsx("p", { className: "text-2xl font-bold text-orange-400", children: criticalErrors.length })] }), _jsx(Zap, { className: "h-8 w-8 text-orange-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Avg Response" }), _jsxs("p", { className: "text-2xl font-bold text-blue-400", children: [avgResponseTime, "ms"] })] }), _jsx(Clock, { className: "h-8 w-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "System Health" }), _jsxs("p", { className: "text-2xl font-bold text-green-400", children: [systemHealth.toFixed(1), "%"] })] }), _jsx(Activity, { className: "h-8 w-8 text-green-400" })] }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Response Time Trend" }), _jsx(CardDescription, { className: "text-gray-400", children: "Average API response times over time" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: performanceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "timestamp", tickFormatter: (time) => new Date(time).toLocaleTimeString(), stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { labelFormatter: (time) => new Date(time).toLocaleTimeString(), contentStyle: { backgroundColor: '#1F2937', border: '1px solid #374151' } }), _jsx(Line, { type: "monotone", dataKey: "responseTime", stroke: "#3B82F6", strokeWidth: 2, dot: false })] }) }) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Error Rate & Throughput" }), _jsx(CardDescription, { className: "text-gray-400", children: "System performance metrics" })] }), _jsx(CardContent, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: performanceData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#374151" }), _jsx(XAxis, { dataKey: "timestamp", tickFormatter: (time) => new Date(time).toLocaleTimeString(), stroke: "#9CA3AF" }), _jsx(YAxis, { stroke: "#9CA3AF" }), _jsx(Tooltip, { labelFormatter: (time) => new Date(time).toLocaleTimeString(), contentStyle: { backgroundColor: '#1F2937', border: '1px solid #374151' } }), _jsx(Area, { type: "monotone", dataKey: "errorRate", stackId: "1", stroke: "#EF4444", fill: "#EF4444", fillOpacity: 0.3 })] }) }) })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(AlertTriangle, { className: "h-5 w-5 mr-2" }), "Live Error Stream"] }), _jsx(CardDescription, { className: "text-gray-400", children: "Real-time error events and system alerts" })] }), _jsx(CardContent, { className: "max-h-96 overflow-y-auto", children: errors.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-400", children: "No errors detected. System running smoothly." })) : (_jsx("div", { className: "space-y-3", children: errors.slice(0, 10).map((error) => (_jsxs("div", { className: `p-4 rounded-lg border ${error.resolved ? 'bg-green-900/20 border-green-700' : 'bg-gray-800/50 border-gray-600'}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getErrorIcon(error.type), _jsx("span", { className: "text-white font-medium", children: error.component }), _jsx(Badge, { className: getSeverityColor(error.severity), children: error.severity }), error.resolved && (_jsx(Badge, { className: "bg-green-500 text-white", children: "Resolved" }))] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-sm text-gray-400", children: error.timestamp.toLocaleTimeString() }), !error.resolved && (_jsx(Button, { size: "sm", onClick: () => resolveError(error.id), className: "bg-green-600 hover:bg-green-700", children: "Resolve" }))] })] }), _jsx("p", { className: "text-gray-300 text-sm mb-2", children: error.message }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-gray-400", children: [error.responseTime && (_jsxs("span", { children: ["Response: ", error.responseTime, "ms"] })), error.affectedUsers && (_jsxs("span", { children: ["Affected: ", error.affectedUsers, " users"] }))] })] }, error.id))) })) })] })] }) }));
}
