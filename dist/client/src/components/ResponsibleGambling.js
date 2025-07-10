import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, Clock, DollarSign, AlertTriangle, Heart, Timer, Lock } from "lucide-react";
export default function ResponsibleGambling() {
    const [limits, setLimits] = useState([]);
    const [selfExclusion, setSelfExclusion] = useState(null);
    const [recentSessions, setRecentSessions] = useState([]);
    const [riskAssessment, setRiskAssessment] = useState(null);
    const [activeTab, setActiveTab] = useState('limits');
    useEffect(() => {
        const mockLimits = [
            {
                id: 'deposit_daily',
                type: 'deposit',
                period: 'daily',
                amount: 500,
                currentUsage: 150,
                isActive: true,
                setDate: '2024-01-01',
                nextResetDate: '2024-01-16'
            },
            {
                id: 'loss_weekly',
                type: 'loss',
                period: 'weekly',
                amount: 1000,
                currentUsage: 350,
                isActive: true,
                setDate: '2024-01-01',
                nextResetDate: '2024-01-22'
            },
            {
                id: 'session_daily',
                type: 'session',
                period: 'daily',
                duration: 120, // 2 hours
                currentUsage: 45,
                isActive: true,
                setDate: '2024-01-01',
                nextResetDate: '2024-01-16'
            }
        ];
        const mockSelfExclusion = {
            isActive: false,
            type: 'temporary',
            startDate: '',
            endDate: '',
            reason: '',
            canReverse: false,
            cooldownPeriod: 7
        };
        const mockSessions = [
            {
                id: 'session_1',
                startTime: '2024-01-15 14:30',
                endTime: '2024-01-15 16:15',
                duration: 105,
                totalWagered: 250,
                netResult: -75,
                gamesPlayed: ['Sports Betting', 'Blackjack'],
                status: 'completed'
            },
            {
                id: 'session_2',
                startTime: '2024-01-15 20:00',
                duration: 45,
                totalWagered: 120,
                netResult: 30,
                gamesPlayed: ['Sports Betting'],
                status: 'active'
            }
        ];
        const mockRiskAssessment = {
            riskLevel: 'medium',
            score: 65,
            factors: [
                {
                    category: 'Time Spent',
                    description: 'Playing 3+ hours per session',
                    impact: 'negative',
                    severity: 6
                },
                {
                    category: 'Loss Pattern',
                    description: 'Consistent losses over 7 days',
                    impact: 'negative',
                    severity: 7
                },
                {
                    category: 'Limit Adherence',
                    description: 'Staying within set limits',
                    impact: 'positive',
                    severity: 8
                }
            ],
            recommendations: [
                'Consider reducing session time limits',
                'Take regular breaks during gaming sessions',
                'Review your betting strategy and patterns'
            ],
            lastAssessment: '2024-01-15'
        };
        setLimits(mockLimits);
        setSelfExclusion(mockSelfExclusion);
        setRecentSessions(mockSessions);
        setRiskAssessment(mockRiskAssessment);
    }, []);
    const updateLimit = (limitId, newAmount) => {
        setLimits(prev => prev.map(limit => limit.id === limitId
            ? { ...limit, amount: newAmount }
            : limit));
    };
    const toggleLimit = (limitId) => {
        setLimits(prev => prev.map(limit => limit.id === limitId
            ? { ...limit, isActive: !limit.isActive }
            : limit));
    };
    const getRiskLevelColor = (level) => {
        switch (level) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-orange-400';
            case 'critical': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getUsageColor = (usage, limit) => {
        const percentage = (usage / limit) * 100;
        if (percentage >= 90)
            return 'text-red-400';
        if (percentage >= 70)
            return 'text-yellow-400';
        return 'text-green-400';
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Shield, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Responsible Gambling" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Take control of your gaming experience with our safety tools" })] }), riskAssessment && (_jsx(Card, { className: `casino-card border-${riskAssessment.riskLevel === 'critical' ? 'red' : riskAssessment.riskLevel === 'high' ? 'orange' : riskAssessment.riskLevel === 'medium' ? 'yellow' : 'green'}-400/20`, children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Heart, { className: `w-6 h-6 ${getRiskLevelColor(riskAssessment.riskLevel)}` }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: "Risk Assessment" }), _jsxs("p", { className: "text-gray-400", children: ["Last updated: ", riskAssessment.lastAssessment] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: `text-3xl font-bold ${getRiskLevelColor(riskAssessment.riskLevel)}`, children: riskAssessment.riskLevel.toUpperCase() }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Score: ", riskAssessment.score, "/100"] })] })] }), _jsx(Progress, { value: riskAssessment.score, className: "h-3 mb-4" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: riskAssessment.factors.map((factor, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${factor.impact === 'positive' ? 'bg-green-400' : 'bg-red-400'}` }), _jsx("span", { className: "text-sm text-gray-300", children: factor.description })] }, index))) })] }) })), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "limits", className: "flex items-center", children: [_jsx(DollarSign, { className: "w-4 h-4 mr-2" }), "Limits"] }), _jsxs(TabsTrigger, { value: "exclusion", className: "flex items-center", children: [_jsx(Lock, { className: "w-4 h-4 mr-2" }), "Self-Exclusion"] }), _jsxs(TabsTrigger, { value: "sessions", className: "flex items-center", children: [_jsx(Timer, { className: "w-4 h-4 mr-2" }), "Sessions"] }), _jsxs(TabsTrigger, { value: "support", className: "flex items-center", children: [_jsx(Heart, { className: "w-4 h-4 mr-2" }), "Support"] })] }), _jsx(TabsContent, { value: "limits", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Spending & Time Limits" }), _jsx("p", { className: "text-gray-400", children: "Set limits to control your gambling activity" })] }), _jsxs(CardContent, { className: "space-y-6", children: [limits.map((limit) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-emerald-400", children: limit.type === 'session' ? _jsx(Clock, { className: "w-5 h-5" }) : _jsx(DollarSign, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-white capitalize", children: [limit.type, " Limit (", limit.period, ")"] }), _jsx("p", { className: "text-sm text-gray-400", children: limit.type === 'session'
                                                                                    ? `Max ${limit.duration} minutes per ${limit.period}`
                                                                                    : `Max $${limit.amount} per ${limit.period}` })] })] }), _jsx(Switch, { checked: limit.isActive, onCheckedChange: () => toggleLimit(limit.id) })] }), limit.isActive && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsxs("span", { className: "text-gray-400", children: ["Usage: ", limit.currentUsage, limit.type === 'session' ? ' minutes' : '', " /", limit.type === 'session' ? limit.duration : limit.amount, limit.type !== 'session' ? '' : ' minutes'] }), _jsxs("span", { className: getUsageColor(limit.currentUsage, limit.type === 'session' ? limit.duration : limit.amount), children: [Math.round((limit.currentUsage / (limit.type === 'session' ? limit.duration : limit.amount)) * 100), "%"] })] }), _jsx(Progress, { value: (limit.currentUsage / (limit.type === 'session' ? limit.duration : limit.amount)) * 100, className: "h-2" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: limit.type === 'session' ? 'Duration (minutes)' : 'Amount ($)' }), _jsx(Input, { type: "number", value: limit.type === 'session' ? limit.duration : limit.amount, onChange: (e) => updateLimit(limit.id, parseInt(e.target.value)), className: "bg-gray-800 border-gray-700" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: "Reset Date" }), _jsx("div", { className: "bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white", children: limit.nextResetDate })] })] })] }))] }) }, limit.id))), _jsx(Button, { className: "w-full bg-emerald-500 hover:bg-emerald-600", children: "Add New Limit" })] })] }) }), _jsx(TabsContent, { value: "exclusion", className: "space-y-6", children: _jsxs(Card, { className: "casino-card border-red-400/20", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Lock, { className: "w-5 h-5 mr-2 text-red-400" }), "Self-Exclusion"] }), _jsx("p", { className: "text-gray-400", children: "Temporarily or permanently exclude yourself from gambling" })] }), _jsx(CardContent, { className: "space-y-6", children: !selfExclusion?.isActive ? (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "bg-red-500/10 border border-red-500/20 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-red-400 mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-red-400 mb-2", children: "Important Information" }), _jsxs("ul", { className: "text-sm text-gray-300 space-y-1", children: [_jsx("li", { children: "\u2022 Self-exclusion will immediately block access to all gambling features" }), _jsx("li", { children: "\u2022 You can still access your account to withdraw funds" }), _jsx("li", { children: "\u2022 Temporary exclusions have a minimum period of 24 hours" }), _jsx("li", { children: "\u2022 Permanent exclusions cannot be reversed" })] })] })] }) }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(Card, { className: "border-orange-500/20", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Clock, { className: "w-12 h-12 text-orange-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Temporary Exclusion" }), _jsx("p", { className: "text-gray-400 mb-4", children: "Take a break for a set period" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-700 mb-4", children: _jsx(SelectValue, { placeholder: "Select duration" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "24h", children: "24 Hours" }), _jsx(SelectItem, { value: "1w", children: "1 Week" }), _jsx(SelectItem, { value: "1m", children: "1 Month" }), _jsx(SelectItem, { value: "3m", children: "3 Months" }), _jsx(SelectItem, { value: "6m", children: "6 Months" })] })] }), _jsx(Button, { className: "w-full bg-orange-500 hover:bg-orange-600", children: "Start Temporary Exclusion" })] }) }), _jsx(Card, { className: "border-red-500/20", children: _jsxs(CardContent, { className: "p-6 text-center", children: [_jsx(Lock, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Permanent Exclusion" }), _jsx("p", { className: "text-gray-400 mb-4", children: "Permanently block all gambling access" }), _jsx("div", { className: "bg-red-500/10 border border-red-500/20 rounded p-3 mb-4", children: _jsx("p", { className: "text-sm text-red-400", children: "This action cannot be undone. Please consider carefully." }) }), _jsx(Button, { className: "w-full bg-red-500 hover:bg-red-600", children: "Permanent Self-Exclusion" })] }) })] })] })) : (_jsx("div", { className: "text-center space-y-6", children: _jsxs("div", { className: "bg-red-500/10 border border-red-500/20 rounded-lg p-6", children: [_jsx(Lock, { className: "w-16 h-16 text-red-400 mx-auto mb-4" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "You are Self-Excluded" }), _jsx("p", { className: "text-gray-400 mb-4", children: selfExclusion.type === 'permanent'
                                                        ? 'Your account is permanently excluded from gambling activities.'
                                                        : `Your exclusion will end on ${selfExclusion.endDate}.` }), selfExclusion.canReverse && (_jsx(Button, { variant: "outline", className: "mt-4", children: "Request Early Reversal" }))] }) })) })] }) }), _jsx(TabsContent, { value: "sessions", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Gaming Sessions" }), _jsx("p", { className: "text-gray-400", children: "Track your recent gambling activity" })] }), _jsx(CardContent, { className: "space-y-4", children: recentSessions.map((session) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${session.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}` }), _jsx("span", { className: "font-semibold text-white", children: session.status === 'active' ? 'Active Session' : 'Completed Session' }), _jsxs(Badge, { variant: "outline", children: [session.duration, "m"] })] }), _jsxs("div", { className: `text-lg font-bold ${session.netResult >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [session.netResult >= 0 ? '+' : '', "$", session.netResult] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Start: " }), _jsx("span", { className: "text-white", children: session.startTime })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Wagered: " }), _jsxs("span", { className: "text-white", children: ["$", session.totalWagered] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Games: " }), _jsx("span", { className: "text-white", children: session.gamesPlayed.join(', ') })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Duration: " }), _jsxs("span", { className: "text-white", children: [session.duration, " minutes"] })] })] })] }) }, session.id))) })] }) }), _jsx(TabsContent, { value: "support", className: "space-y-6", children: _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Need Help?" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full bg-blue-500 hover:bg-blue-600", children: "Chat with Support Specialist" }), _jsx(Button, { variant: "outline", className: "w-full", children: "Schedule Callback" }), _jsx(Button, { variant: "outline", className: "w-full", children: "Email Support Team" })] }) })] }), _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "External Resources" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("a", { href: "https://www.gamcare.org.uk", target: "_blank", rel: "noopener noreferrer", className: "block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors", children: [_jsx("div", { className: "font-semibold text-white", children: "GamCare" }), _jsx("div", { className: "text-sm text-gray-400", children: "Free support and advice" })] }), _jsxs("a", { href: "https://www.gamblingtherapy.org", target: "_blank", rel: "noopener noreferrer", className: "block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors", children: [_jsx("div", { className: "font-semibold text-white", children: "Gambling Therapy" }), _jsx("div", { className: "text-sm text-gray-400", children: "Online support community" })] }), _jsxs("a", { href: "https://www.gamblersanonymous.org", target: "_blank", rel: "noopener noreferrer", className: "block p-3 bg-gray-800 rounded hover:bg-gray-700 transition-colors", children: [_jsx("div", { className: "font-semibold text-white", children: "Gamblers Anonymous" }), _jsx("div", { className: "text-sm text-gray-400", children: "Support groups worldwide" })] })] })] })] }) })] })] }));
}
