import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Command, BarChart3, Users, Wallet, TrendingUp, Shield, Settings, Building, Brain, Zap, Coins, AlertTriangle, CheckCircle, DollarSign, Activity, FileText, Lock, Network, Headphones, Megaphone, GitBranch, Server, RefreshCw } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
const EXECUTIVE_KPIS = [
    { label: 'GGR (24h)', value: '$47,320', change: '+12.3%', trend: 'up', status: 'good' },
    { label: 'NGR (24h)', value: '$42,850', change: '+8.7%', trend: 'up', status: 'good' },
    { label: 'Active Users', value: '2,847', change: '+15.2%', trend: 'up', status: 'good' },
    { label: 'Conversion Rate', value: '7.2%', change: '-2.1%', trend: 'down', status: 'warning' },
    { label: 'User LTV', value: '$286', change: '+5.4%', trend: 'up', status: 'good' },
    { label: 'Churn Rate', value: '4.8%', change: '+1.2%', trend: 'up', status: 'warning' }
];
const SYSTEM_MODULES = [
    { name: 'Betting Engine', status: 'online', uptime: '99.97%', lastCheck: '2 min ago', alerts: 0 },
    { name: 'Wallet System', status: 'online', uptime: '99.95%', lastCheck: '1 min ago', alerts: 0 },
    { name: 'KYC/AML Engine', status: 'warning', uptime: '98.2%', lastCheck: '5 min ago', alerts: 2 },
    { name: 'Payment Gateway', status: 'online', uptime: '99.88%', lastCheck: '3 min ago', alerts: 0 },
    { name: 'CRM System', status: 'online', uptime: '99.92%', lastCheck: '1 min ago', alerts: 0 },
    { name: 'Compliance Monitor', status: 'online', uptime: '100%', lastCheck: '30 sec ago', alerts: 0 }
];
export default function BusinessManagement() {
    const [activeModule, setActiveModule] = useState('executive');
    const { data: businessMetrics } = useQuery({
        queryKey: ['/api/business/metrics'],
        refetchInterval: 30000 // Update every 30 seconds
    });
    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
            case 'good': return 'text-green-400';
            case 'warning': return 'text-yellow-400';
            case 'offline':
            case 'critical': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'online':
            case 'good': return 'bg-green-500/20 text-green-400';
            case 'warning': return 'bg-yellow-500/20 text-yellow-400';
            case 'offline':
            case 'critical': return 'bg-red-500/20 text-red-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const businessModules = [
        {
            id: 'executive',
            name: 'Executive Command Center',
            icon: Command,
            description: 'Real-time operational KPIs and strategic oversight',
            features: ['Live GGR/NGR', 'Market Segmentation', 'Staff Performance', 'Alert Management']
        },
        {
            id: 'users',
            name: 'User Lifecycle Management',
            icon: Users,
            description: 'Complete user journey from onboarding to VIP status',
            features: ['Automated KYC', 'Smart Segmentation', 'Risk Scoring', 'Lifecycle Automation']
        },
        {
            id: 'treasury',
            name: 'Treasury & Wallet System',
            icon: Wallet,
            description: 'Multi-chain wallet orchestration and treasury management',
            features: ['Cold/Hot Wallets', 'Multi-chain Support', 'Reconciliation', 'Fee Automation']
        },
        {
            id: 'betting',
            name: 'Betting Engine Suite',
            icon: BarChart3,
            description: 'Real-time odds, risk management, and bet monitoring',
            features: ['Odds Integration', 'Risk Engine', 'Live Hedging', 'Market Controls']
        },
        {
            id: 'finance',
            name: 'Finance & Accounting',
            icon: DollarSign,
            description: 'Real-time P&L, affiliate payouts, and financial reporting',
            features: ['Real-time P&L', 'Affiliate Engine', 'Audit Trails', 'Treasury Forecasting']
        },
        {
            id: 'compliance',
            name: 'Compliance Command',
            icon: Shield,
            description: 'Advanced AML, KYC escalation, and regulatory management',
            features: ['AML Engine', 'KYC Workflows', 'Document Management', 'SAR Generation']
        },
        {
            id: 'support',
            name: 'Customer Experience',
            icon: Headphones,
            description: 'Multi-channel support with AI integration',
            features: ['Live Chat + AI', 'Multi-channel Tickets', 'Knowledge Base', 'Resolution Queue']
        },
        {
            id: 'marketing',
            name: 'Marketing & Promotions',
            icon: Megaphone,
            description: 'Smart campaigns and gamified user engagement',
            features: ['Smart Segmentation', 'Campaign Designer', 'A/B Testing', 'VIP Automation']
        },
        {
            id: 'affiliate',
            name: 'Affiliate Program',
            icon: Network,
            description: 'Partner management and influencer tracking',
            features: ['Partner Portal', 'Commission Engine', 'Fraud Detection', 'ROI Tracking']
        },
        {
            id: 'hr',
            name: 'Team Operations',
            icon: Building,
            description: 'Staff management and operational workflows',
            features: ['Role Management', 'Activity Tracking', 'Scheduling', 'Training Portal']
        },
        {
            id: 'development',
            name: 'Product Development',
            icon: GitBranch,
            description: 'Roadmap planning and infrastructure monitoring',
            features: ['Sprint Management', 'Bug Tracking', 'API Monitoring', 'Release Control']
        },
        {
            id: 'legal',
            name: 'Legal & Regulatory',
            icon: FileText,
            description: 'Compliance archive and regulatory reporting',
            features: ['Audit Reports', 'Contract Management', 'Policy Updates', 'Regulator Portal']
        },
        {
            id: 'intelligence',
            name: 'AI & Data Intelligence',
            icon: Brain,
            description: 'Machine learning and predictive analytics',
            features: ['User Clustering', 'Churn Prediction', 'Smart Odds', 'LTV Modeling']
        },
        {
            id: 'security',
            name: 'Security & Fraud',
            icon: Lock,
            description: 'Advanced security monitoring and fraud prevention',
            features: ['Login Analysis', 'Device Fingerprinting', 'Admin Logging', 'Freeze Protocols']
        },
        {
            id: 'automation',
            name: 'Workflow Automation',
            icon: Zap,
            description: 'No-code automation and AI task orchestration',
            features: ['Drag-drop Workflows', 'Event Triggers', 'AI Orchestrator', 'Process Optimization']
        },
        {
            id: 'engagement',
            name: 'Real-time Engagement',
            icon: Activity,
            description: 'Live event monitoring and dynamic campaigns',
            features: ['Event War Room', 'Live Campaigns', 'AI Betting Coach', 'Community Tools']
        }
    ];
    return (_jsx("div", { className: "min-h-screen bg-winnex-black text-white p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4", children: "Enterprise Business Management System" }), _jsx("p", { className: "text-gray-300 text-lg", children: "Complete operational control and strategic oversight for Winnex platform" })] }), _jsxs(Tabs, { value: activeModule, onValueChange: setActiveModule, className: "space-y-6", children: [activeModule === 'executive' && (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Command, { className: "w-6 h-6 text-blue-400" }), "Live Executive KPIs", _jsx(Badge, { className: "bg-green-500/20 text-green-400 ml-auto", children: "Live" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: EXECUTIVE_KPIS.map((kpi, idx) => (_jsxs("div", { className: "p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("span", { className: "text-sm text-gray-400", children: kpi.label }), _jsx(Badge, { className: getStatusBadge(kpi.status), children: kpi.status })] }), _jsx("div", { className: "text-2xl font-bold mb-1", children: kpi.value }), _jsxs("div", { className: `text-sm flex items-center gap-1 ${getStatusColor(kpi.trend === 'up' ? 'good' : kpi.trend === 'down' ? 'warning' : 'stable')}`, children: [_jsx(TrendingUp, { className: "w-3 h-3" }), kpi.change] })] }, idx))) }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Server, { className: "w-6 h-6 text-green-400" }), "System Module Status"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: SYSTEM_MODULES.map((module, idx) => (_jsxs("div", { className: "p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsx("span", { className: "font-medium", children: module.name }), _jsx(Badge, { className: getStatusBadge(module.status), children: module.status })] }), _jsxs("div", { className: "space-y-2 text-sm text-gray-400", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Uptime:" }), _jsx("span", { className: "text-green-400", children: module.uptime })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Last Check:" }), _jsx("span", { children: module.lastCheck })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Alerts:" }), _jsx("span", { className: module.alerts > 0 ? 'text-yellow-400' : 'text-green-400', children: module.alerts })] })] })] }, idx))) }) })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-yellow-400" }), "Executive Quick Actions"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(Button, { className: "h-20 flex-col gap-2 bg-blue-600 hover:bg-blue-700", children: [_jsx(AlertTriangle, { className: "w-6 h-6" }), "Emergency Freeze"] }), _jsxs(Button, { className: "h-20 flex-col gap-2 bg-purple-600 hover:bg-purple-700", children: [_jsx(BarChart3, { className: "w-6 h-6" }), "Live Reports"] }), _jsxs(Button, { className: "h-20 flex-col gap-2 bg-green-600 hover:bg-green-700", children: [_jsx(Users, { className: "w-6 h-6" }), "VIP Escalation"] }), _jsxs(Button, { className: "h-20 flex-col gap-2 bg-red-600 hover:bg-red-700", children: [_jsx(Shield, { className: "w-6 h-6" }), "Security Alert"] })] }) })] })] })), _jsx(TabsList, { className: "grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 gap-1 h-auto p-1 bg-gray-900", children: businessModules.map((module) => {
                                const IconComponent = module.icon;
                                return (_jsxs(TabsTrigger, { value: module.id, className: "flex-col gap-1 h-16 text-xs data-[state=active]:bg-blue-600", children: [_jsx(IconComponent, { className: "w-4 h-4" }), _jsx("span", { className: "hidden lg:block", children: module.name.split(' ')[0] })] }, module.id));
                            }) }), businessModules.map((module) => (_jsx(TabsContent, { value: module.id, children: _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-3", children: [_jsx(module.icon, { className: "w-8 h-8 text-blue-400" }), _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: module.name }), _jsx("p", { className: "text-gray-400 text-sm font-normal", children: module.description })] })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: module.features.map((feature, idx) => (_jsxs("div", { className: "p-4 bg-gray-800 rounded-lg text-center", children: [_jsx(CheckCircle, { className: "w-6 h-6 text-green-400 mx-auto mb-2" }), _jsx("span", { className: "text-sm font-medium", children: feature })] }, idx))) }), _jsxs("div", { className: "bg-gray-800 p-6 rounded-lg", children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 flex items-center gap-2", children: [_jsx(Settings, { className: "w-5 h-5 text-blue-400" }), module.name, " Interface"] }), module.id === 'users' && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-gray-700 rounded", children: [_jsx("h4", { className: "font-medium mb-2", children: "User Segments" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "VIP Users" }), _jsx("span", { className: "text-yellow-400", children: "247" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "High Volume" }), _jsx("span", { className: "text-green-400", children: "1,382" })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "At Risk" }), _jsx("span", { className: "text-red-400", children: "89" })] })] })] }), _jsxs("div", { className: "p-4 bg-gray-700 rounded", children: [_jsx("h4", { className: "font-medium mb-2", children: "KYC Status" }), _jsx(Progress, { value: 87, className: "mb-2" }), _jsx("p", { className: "text-sm text-gray-400", children: "87% completion rate" })] }), _jsxs("div", { className: "p-4 bg-gray-700 rounded", children: [_jsx("h4", { className: "font-medium mb-2", children: "Lifecycle Stage" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsx("div", { children: "Onboarding: 15%" }), _jsx("div", { children: "Active: 65%" }), _jsx("div", { children: "Dormant: 20%" })] })] })] })), module.id === 'treasury' && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "p-4 bg-gray-700 rounded text-center", children: [_jsx(Coins, { className: "w-8 h-8 text-orange-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold", children: "4.7 BTC" }), _jsx("div", { className: "text-sm text-gray-400", children: "Hot Wallet" })] }), _jsxs("div", { className: "p-4 bg-gray-700 rounded text-center", children: [_jsx(Lock, { className: "w-8 h-8 text-blue-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold", children: "47.2 BTC" }), _jsx("div", { className: "text-sm text-gray-400", children: "Cold Storage" })] }), _jsxs("div", { className: "p-4 bg-gray-700 rounded text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 text-green-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold", children: "98.7%" }), _jsx("div", { className: "text-sm text-gray-400", children: "Reconciliation" })] }), _jsxs("div", { className: "p-4 bg-gray-700 rounded text-center", children: [_jsx(RefreshCw, { className: "w-8 h-8 text-purple-400 mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold", children: "247" }), _jsx("div", { className: "text-sm text-gray-400", children: "Pending Txns" })] })] })), module.id === 'automation' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-700 rounded", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: "Smart VIP Escalation" }), _jsx("p", { className: "text-sm text-gray-400", children: "Auto-promote users based on volume + engagement" })] }), _jsx(Badge, { className: "bg-green-500/20 text-green-400", children: "Active" })] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-700 rounded", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: "Fraud Alert Routing" }), _jsx("p", { className: "text-sm text-gray-400", children: "Auto-escalate high-risk transactions to security team" })] }), _jsx(Badge, { className: "bg-green-500/20 text-green-400", children: "Active" })] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-700 rounded", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: "Win-Back Campaign" }), _jsx("p", { className: "text-sm text-gray-400", children: "Re-engage dormant users with personalized offers" })] }), _jsx(Badge, { className: "bg-yellow-500/20 text-yellow-400", children: "Scheduled" })] })] })), !['users', 'treasury', 'automation'].includes(module.id) && (_jsxs("div", { className: "text-center py-8", children: [_jsx(module.icon, { className: "w-16 h-16 text-gray-500 mx-auto mb-4" }), _jsxs("h4", { className: "text-lg font-medium mb-2", children: [module.name, " Dashboard"] }), _jsxs("p", { className: "text-gray-400 mb-4", children: ["Advanced ", module.name.toLowerCase(), " interface coming soon"] }), _jsx(Button, { className: "bg-blue-600 hover:bg-blue-700", children: "Configure Module" })] }))] })] })] }) }, module.id)))] }), _jsx(Card, { className: "mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Enterprise Business Management" }), _jsx("p", { className: "text-gray-400", children: "Complete operational control with 16 integrated business modules and autonomous workflows" })] }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { className: "bg-green-600 hover:bg-green-700", children: [_jsx(Activity, { className: "w-4 h-4 mr-2" }), "System Health"] }), _jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", children: [_jsx(Brain, { className: "w-4 h-4 mr-2" }), "AI Insights"] }), _jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), "Executive Report"] })] })] }) }) })] }) }));
}
