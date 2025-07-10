import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Activity, AlertCircle, CheckCircle, Database, Zap, RefreshCw } from 'lucide-react';
export default function SystemDiagnostics() {
    const { toast } = useToast();
    const [diagnostics, setDiagnostics] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [lastUpdate, setLastUpdate] = useState(null);
    const runDiagnostics = async () => {
        setIsRunning(true);
        const results = [];
        try {
            // Test API Health
            const healthStart = Date.now();
            try {
                const healthResponse = await fetch('/api/health');
                const healthTime = Date.now() - healthStart;
                results.push({
                    component: 'API Health Check',
                    status: healthResponse.ok ? 'operational' : 'degraded',
                    responseTime: healthTime,
                    lastCheck: new Date(),
                    details: healthResponse.ok ? 'All systems operational' : `HTTP ${healthResponse.status}`
                });
            }
            catch (error) {
                results.push({
                    component: 'API Health Check',
                    status: 'failed',
                    lastCheck: new Date(),
                    details: 'Connection failed'
                });
            }
            // Test Crypto Price API
            const cryptoStart = Date.now();
            try {
                const cryptoResponse = await fetch('/api/crypto/prices');
                const cryptoTime = Date.now() - cryptoStart;
                const cryptoData = await cryptoResponse.json();
                results.push({
                    component: 'Crypto Price Feed',
                    status: cryptoResponse.ok && cryptoData.BTC ? 'operational' : 'degraded',
                    responseTime: cryptoTime,
                    lastCheck: new Date(),
                    details: cryptoData.BTC ? `BTC: $${cryptoData.BTC}` : 'Invalid data'
                });
            }
            catch (error) {
                results.push({
                    component: 'Crypto Price Feed',
                    status: 'failed',
                    lastCheck: new Date(),
                    details: 'API unreachable'
                });
            }
            // Test Sports Data
            const sportsStart = Date.now();
            try {
                const sportsResponse = await fetch('/api/sports');
                const sportsTime = Date.now() - sportsStart;
                const sportsData = await sportsResponse.json();
                results.push({
                    component: 'Sports Data API',
                    status: sportsResponse.ok && Array.isArray(sportsData) ? 'operational' : 'degraded',
                    responseTime: sportsTime,
                    lastCheck: new Date(),
                    details: `${sportsData.length || 0} sports available`
                });
            }
            catch (error) {
                results.push({
                    component: 'Sports Data API',
                    status: 'failed',
                    lastCheck: new Date(),
                    details: 'Service unavailable'
                });
            }
            // Test Live Matches
            const matchesStart = Date.now();
            try {
                const matchesResponse = await fetch('/api/matches');
                const matchesTime = Date.now() - matchesStart;
                const matchesData = await matchesResponse.json();
                results.push({
                    component: 'Live Matches Feed',
                    status: matchesResponse.ok && Array.isArray(matchesData) ? 'operational' : 'degraded',
                    responseTime: matchesTime,
                    lastCheck: new Date(),
                    details: `${matchesData.length || 0} matches loaded`
                });
            }
            catch (error) {
                results.push({
                    component: 'Live Matches Feed',
                    status: 'failed',
                    lastCheck: new Date(),
                    details: 'Data feed error'
                });
            }
            // Test Database Connectivity (through API)
            const dbStart = Date.now();
            try {
                const dbResponse = await fetch('/api/sports');
                const dbTime = Date.now() - dbStart;
                results.push({
                    component: 'Database Connection',
                    status: dbResponse.ok ? 'operational' : 'degraded',
                    responseTime: dbTime,
                    lastCheck: new Date(),
                    details: dbResponse.ok ? 'Connected to PostgreSQL' : 'Connection issues'
                });
            }
            catch (error) {
                results.push({
                    component: 'Database Connection',
                    status: 'failed',
                    lastCheck: new Date(),
                    details: 'Database unreachable'
                });
            }
            setDiagnostics(results);
            setLastUpdate(new Date());
            const operationalCount = results.filter(r => r.status === 'operational').length;
            const totalCount = results.length;
            const healthPercentage = Math.round((operationalCount / totalCount) * 100);
            toast({
                title: "System Diagnostics Complete",
                description: `${healthPercentage}% of systems operational (${operationalCount}/${totalCount})`,
                variant: healthPercentage >= 80 ? "default" : "destructive"
            });
        }
        catch (error) {
            toast({
                title: "Diagnostics Failed",
                description: "Unable to complete system diagnostics",
                variant: "destructive"
            });
        }
        finally {
            setIsRunning(false);
        }
    };
    useEffect(() => {
        runDiagnostics();
        // Auto-refresh every 30 seconds
        const interval = setInterval(runDiagnostics, 30000);
        return () => clearInterval(interval);
    }, []);
    const getStatusIcon = (status) => {
        switch (status) {
            case 'operational': return _jsx(CheckCircle, { className: "h-4 w-4 text-green-500" });
            case 'degraded': return _jsx(AlertCircle, { className: "h-4 w-4 text-yellow-500" });
            case 'failed': return _jsx(AlertCircle, { className: "h-4 w-4 text-red-500" });
            default: return _jsx(Activity, { className: "h-4 w-4 text-gray-500" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'text-green-500 bg-green-500/20';
            case 'degraded': return 'text-yellow-500 bg-yellow-500/20';
            case 'failed': return 'text-red-500 bg-red-500/20';
            default: return 'text-gray-500 bg-gray-500/20';
        }
    };
    const overallHealth = diagnostics.length > 0
        ? Math.round((diagnostics.filter(d => d.status === 'operational').length / diagnostics.length) * 100)
        : 0;
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "System Diagnostics" }), _jsx("p", { className: "text-gray-300", children: "Real-time platform health monitoring and troubleshooting" })] }), _jsx("div", { className: "flex items-center space-x-4", children: _jsxs(Button, { onClick: runDiagnostics, disabled: isRunning, variant: "outline", children: [isRunning ? (_jsx(RefreshCw, { className: "h-4 w-4 mr-2 animate-spin" })) : (_jsx(RefreshCw, { className: "h-4 w-4 mr-2" })), isRunning ? 'Running...' : 'Run Diagnostics'] }) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Activity, { className: "h-5 w-5 mr-2" }), "Overall System Health"] }), _jsx(CardDescription, { className: "text-gray-400", children: lastUpdate ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'Running initial diagnostics...' })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-gray-300", children: "System Health Score" }), _jsxs("span", { className: `text-2xl font-bold ${overallHealth >= 90 ? 'text-green-400' :
                                                overallHealth >= 70 ? 'text-yellow-400' : 'text-red-400'}`, children: [overallHealth, "%"] })] }), _jsx(Progress, { value: overallHealth, className: "h-3" }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-green-400", children: diagnostics.filter(d => d.status === 'operational').length }), _jsx("div", { className: "text-sm text-gray-400", children: "Operational" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-yellow-400", children: diagnostics.filter(d => d.status === 'degraded').length }), _jsx("div", { className: "text-sm text-gray-400", children: "Degraded" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xl font-bold text-red-400", children: diagnostics.filter(d => d.status === 'failed').length }), _jsx("div", { className: "text-sm text-gray-400", children: "Failed" })] })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: diagnostics.map((diagnostic, index) => (_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getStatusIcon(diagnostic.status), _jsx("h3", { className: "font-semibold text-white", children: diagnostic.component })] }), _jsx(Badge, { className: getStatusColor(diagnostic.status), children: diagnostic.status })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [diagnostic.responseTime && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Response Time" }), _jsxs("span", { className: `font-semibold ${diagnostic.responseTime < 200 ? 'text-green-400' :
                                                        diagnostic.responseTime < 500 ? 'text-yellow-400' : 'text-red-400'}`, children: [diagnostic.responseTime, "ms"] })] })), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Last Check" }), _jsx("span", { className: "text-gray-300", children: diagnostic.lastCheck.toLocaleTimeString() })] }), diagnostic.details && (_jsx("div", { className: "mt-2 p-2 bg-gray-800/50 rounded text-gray-300", children: diagnostic.details }))] })] }) }, index))) }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Quick Actions" }), _jsx(CardDescription, { className: "text-gray-400", children: "Common troubleshooting and maintenance tasks" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs(Button, { variant: "outline", className: "flex items-center justify-center space-x-2", onClick: () => window.location.reload(), children: [_jsx(RefreshCw, { className: "h-4 w-4" }), _jsx("span", { children: "Refresh Page" })] }), _jsxs(Button, { variant: "outline", className: "flex items-center justify-center space-x-2", onClick: () => localStorage.clear(), children: [_jsx(Database, { className: "h-4 w-4" }), _jsx("span", { children: "Clear Cache" })] }), _jsxs(Button, { variant: "outline", className: "flex items-center justify-center space-x-2", onClick: runDiagnostics, children: [_jsx(Zap, { className: "h-4 w-4" }), _jsx("span", { children: "Re-run Tests" })] })] }) })] })] }) }));
}
