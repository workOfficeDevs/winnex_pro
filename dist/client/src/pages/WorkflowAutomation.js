import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Plus, Settings, Play, Pause, Brain, ArrowRight, Clock, Users, DollarSign, Shield, Bell, Target, CheckCircle, AlertTriangle, Activity, Workflow, Bot, Cpu, Network } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
const TRIGGER_TYPES = [
    { value: 'user_action', label: 'User Action', icon: Users },
    { value: 'bet_placed', label: 'Bet Placed', icon: Target },
    { value: 'deposit_made', label: 'Deposit Made', icon: DollarSign },
    { value: 'withdrawal_requested', label: 'Withdrawal Requested', icon: DollarSign },
    { value: 'kyc_status_change', label: 'KYC Status Change', icon: Shield },
    { value: 'risk_alert', label: 'Risk Alert', icon: AlertTriangle },
    { value: 'win_amount', label: 'Win Amount Threshold', icon: Target },
    { value: 'user_tier_change', label: 'User Tier Change', icon: Users },
    { value: 'support_ticket', label: 'Support Ticket', icon: Bell },
    { value: 'time_based', label: 'Time-based Schedule', icon: Clock }
];
const ACTION_TYPES = [
    { value: 'send_notification', label: 'Send Notification', icon: Bell },
    { value: 'update_user_tier', label: 'Update User Tier', icon: Users },
    { value: 'create_promotion', label: 'Create Promotion', icon: Target },
    { value: 'escalate_to_support', label: 'Escalate to Support', icon: Users },
    { value: 'freeze_account', label: 'Freeze Account', icon: Shield },
    { value: 'create_risk_alert', label: 'Create Risk Alert', icon: AlertTriangle },
    { value: 'trigger_kyc_review', label: 'Trigger KYC Review', icon: Shield },
    { value: 'assign_account_manager', label: 'Assign Account Manager', icon: Users },
    { value: 'send_bonus', label: 'Send Bonus', icon: DollarSign },
    { value: 'custom_webhook', label: 'Custom Webhook', icon: Network }
];
const SAMPLE_WORKFLOWS = [
    {
        id: '1',
        name: 'VIP Auto-Escalation',
        description: 'Automatically promote users to VIP when they reach $5000 in monthly volume',
        trigger: {
            type: 'bet_placed',
            conditions: [{ field: 'monthly_volume', operator: 'gte', value: 5000 }]
        },
        actions: [
            { type: 'update_user_tier', parameters: { tier: 'vip' } },
            { type: 'send_notification', parameters: { template: 'vip_welcome' } },
            { type: 'assign_account_manager', parameters: { department: 'vip_services' } }
        ],
        status: 'active',
        category: 'user_management',
        priority: 'high',
        lastTriggered: new Date(Date.now() - 3600000),
        executionCount: 47
    },
    {
        id: '2',
        name: 'Fraud Alert Routing',
        description: 'Auto-escalate high-risk transactions to security team within 5 minutes',
        trigger: {
            type: 'risk_alert',
            conditions: [{ field: 'risk_score', operator: 'gte', value: 85 }]
        },
        actions: [
            { type: 'escalate_to_support', parameters: { team: 'security', priority: 'urgent' } },
            { type: 'freeze_account', parameters: { duration: '24h', reason: 'fraud_investigation' } },
            { type: 'send_notification', parameters: { recipient: 'security_team' } }
        ],
        status: 'active',
        category: 'security',
        priority: 'critical',
        lastTriggered: new Date(Date.now() - 7200000),
        executionCount: 12
    },
    {
        id: '3',
        name: 'Win-Back Campaign',
        description: 'Re-engage dormant users with personalized offers after 30 days of inactivity',
        trigger: {
            type: 'time_based',
            conditions: [{ field: 'last_activity', operator: 'gte', value: '30d' }]
        },
        actions: [
            { type: 'create_promotion', parameters: { type: 'deposit_bonus', amount: 25 } },
            { type: 'send_notification', parameters: { template: 'comeback_offer' } }
        ],
        status: 'active',
        category: 'marketing',
        priority: 'medium',
        lastTriggered: new Date(Date.now() - 86400000),
        executionCount: 234
    }
];
export default function WorkflowAutomation() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [newWorkflow, setNewWorkflow] = useState({
        name: '',
        description: '',
        triggerType: '',
        actionType: '',
        category: 'user_management'
    });
    const { toast } = useToast();
    const { data: workflows = SAMPLE_WORKFLOWS } = useQuery({
        queryKey: ['/api/workflows'],
        refetchInterval: 30000
    });
    const createWorkflowMutation = useMutation({
        mutationFn: async (workflowData) => {
            return apiRequest('POST', '/api/workflows', workflowData);
        },
        onSuccess: () => {
            toast({
                title: "Workflow Created",
                description: "New automation workflow created successfully",
            });
            setNewWorkflow({
                name: '',
                description: '',
                triggerType: '',
                actionType: '',
                category: 'user_management'
            });
        }
    });
    const toggleWorkflowMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            return apiRequest('PATCH', `/api/workflows/${id}`, { status });
        },
        onSuccess: () => {
            toast({
                title: "Workflow Updated",
                description: "Workflow status changed successfully",
            });
        }
    });
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400';
            case 'paused': return 'bg-yellow-500/20 text-yellow-400';
            case 'draft': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return 'bg-red-500/20 text-red-400';
            case 'high': return 'bg-orange-500/20 text-orange-400';
            case 'medium': return 'bg-blue-500/20 text-blue-400';
            case 'low': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const handleCreateWorkflow = () => {
        if (!newWorkflow.name || !newWorkflow.triggerType || !newWorkflow.actionType) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields",
                variant: "destructive"
            });
            return;
        }
        const workflow = {
            ...newWorkflow,
            trigger: { type: newWorkflow.triggerType, conditions: [] },
            actions: [{ type: newWorkflow.actionType, parameters: {} }],
            status: 'draft',
            priority: 'medium',
            executionCount: 0
        };
        createWorkflowMutation.mutate(workflow);
    };
    return (_jsx("div", { className: "min-h-screen bg-winnex-black text-white p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4", children: "Autonomous Workflow Automation" }), _jsx("p", { className: "text-gray-300 text-lg", children: "No-code automation engine with AI-powered task orchestration" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [_jsxs(TabsList, { className: "grid grid-cols-4 gap-2 h-auto p-1 bg-gray-900", children: [_jsxs(TabsTrigger, { value: "overview", className: "flex items-center gap-2 h-12", children: [_jsx(Activity, { className: "w-4 h-4" }), "Overview"] }), _jsxs(TabsTrigger, { value: "workflows", className: "flex items-center gap-2 h-12", children: [_jsx(Workflow, { className: "w-4 h-4" }), "Workflows"] }), _jsxs(TabsTrigger, { value: "create", className: "flex items-center gap-2 h-12", children: [_jsx(Plus, { className: "w-4 h-4" }), "Create New"] }), _jsxs(TabsTrigger, { value: "ai-insights", className: "flex items-center gap-2 h-12", children: [_jsx(Brain, { className: "w-4 h-4" }), "AI Insights"] })] }), _jsxs(TabsContent, { value: "overview", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8", children: [_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-yellow-400" }), "Active Workflows"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold text-green-400 mb-2", children: workflows.filter(w => w.status === 'active').length }), _jsx("p", { className: "text-gray-400 text-sm", children: "Running automated processes" })] })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Target, { className: "w-6 h-6 text-blue-400" }), "Executions Today"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold text-blue-400 mb-2", children: "1,247" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Automated actions performed" })] })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Bot, { className: "w-6 h-6 text-purple-400" }), "AI Suggestions"] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-3xl font-bold text-purple-400 mb-2", children: "7" }), _jsx("p", { className: "text-gray-400 text-sm", children: "Optimization recommendations" })] })] })] }), _jsxs(Card, { className: "bg-gray-900 border-gray-700 mb-6", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recently Executed Workflows" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: workflows.slice(0, 5).map((workflow) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${workflow.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'}` }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: workflow.name }), _jsx("p", { className: "text-sm text-gray-400", children: workflow.description })] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { className: getPriorityColor(workflow.priority), children: workflow.priority }), _jsxs("p", { className: "text-sm text-gray-400 mt-1", children: [workflow.executionCount, " executions"] })] })] }, workflow.id))) }) })] })] }), _jsx(TabsContent, { value: "workflows", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Workflow, { className: "w-6 h-6 text-blue-400" }), "All Workflows"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: workflows.map((workflow) => (_jsxs("div", { className: `p-4 bg-gray-800 rounded-lg cursor-pointer transition-colors ${selectedWorkflow?.id === workflow.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-750'}`, onClick: () => setSelectedWorkflow(workflow), children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: workflow.name }), _jsx("p", { className: "text-gray-400 text-sm", children: workflow.description })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Badge, { className: getStatusColor(workflow.status), children: workflow.status }), _jsx(Badge, { className: getPriorityColor(workflow.priority), children: workflow.priority })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-400", children: [_jsxs("span", { children: ["Category: ", workflow.category] }), _jsxs("span", { children: ["Executions: ", workflow.executionCount] }), workflow.lastTriggered && (_jsxs("span", { children: ["Last: ", workflow.lastTriggered.toLocaleTimeString()] }))] }), _jsxs("div", { className: "flex gap-2 mt-3", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: (e) => {
                                                                                e.stopPropagation();
                                                                                toggleWorkflowMutation.mutate({
                                                                                    id: workflow.id,
                                                                                    status: workflow.status === 'active' ? 'paused' : 'active'
                                                                                });
                                                                            }, className: "border-gray-600", children: workflow.status === 'active' ? (_jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-3 h-3 mr-1" }), "Pause"] })) : (_jsxs(_Fragment, { children: [_jsx(Play, { className: "w-3 h-3 mr-1" }), "Activate"] })) }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-gray-600", children: [_jsx(Settings, { className: "w-3 h-3 mr-1" }), "Edit"] })] })] }, workflow.id))) }) })] }) }), _jsx("div", { children: _jsxs(Card, { className: "bg-gray-900 border-gray-700 sticky top-6", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Workflow Details" }) }), _jsx(CardContent, { children: selectedWorkflow ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Trigger" }), _jsxs("div", { className: "p-3 bg-gray-800 rounded", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Zap, { className: "w-4 h-4 text-yellow-400" }), _jsx("span", { className: "text-sm font-medium", children: selectedWorkflow.trigger.type.replace('_', ' ').toUpperCase() })] }), _jsxs("p", { className: "text-xs text-gray-400", children: [selectedWorkflow.trigger.conditions.length, " conditions configured"] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Actions" }), _jsx("div", { className: "space-y-2", children: selectedWorkflow.actions.map((action, idx) => (_jsx("div", { className: "p-3 bg-gray-800 rounded", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(ArrowRight, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { className: "text-sm font-medium", children: action.type.replace('_', ' ').toUpperCase() })] }) }, idx))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Statistics" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Total Executions:" }), _jsx("span", { className: "text-blue-400", children: selectedWorkflow.executionCount })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Success Rate:" }), _jsx("span", { className: "text-green-400", children: "98.5%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Avg. Response Time:" }), _jsx("span", { className: "text-yellow-400", children: "1.2s" })] })] })] })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Workflow, { className: "w-12 h-12 text-gray-500 mx-auto mb-3" }), _jsx("p", { className: "text-gray-400", children: "Select a workflow to view details" })] })) })] }) })] }) }), _jsx(TabsContent, { value: "create", children: _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-6 h-6 text-green-400" }), "Create New Workflow"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Workflow Name" }), _jsx(Input, { value: newWorkflow.name, onChange: (e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value })), placeholder: "Enter workflow name", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Category" }), _jsxs(Select, { value: newWorkflow.category, onValueChange: (value) => setNewWorkflow(prev => ({ ...prev, category: value })), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "user_management", children: "User Management" }), _jsx(SelectItem, { value: "security", children: "Security" }), _jsx(SelectItem, { value: "marketing", children: "Marketing" }), _jsx(SelectItem, { value: "finance", children: "Finance" }), _jsx(SelectItem, { value: "compliance", children: "Compliance" })] })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Description" }), _jsx(Input, { value: newWorkflow.description, onChange: (e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value })), placeholder: "Describe what this workflow does", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Trigger Type" }), _jsxs(Select, { value: newWorkflow.triggerType, onValueChange: (value) => setNewWorkflow(prev => ({ ...prev, triggerType: value })), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600", children: _jsx(SelectValue, { placeholder: "Select trigger" }) }), _jsx(SelectContent, { children: TRIGGER_TYPES.map((trigger) => (_jsx(SelectItem, { value: trigger.value, children: trigger.label }, trigger.value))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Action Type" }), _jsxs(Select, { value: newWorkflow.actionType, onValueChange: (value) => setNewWorkflow(prev => ({ ...prev, actionType: value })), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600", children: _jsx(SelectValue, { placeholder: "Select action" }) }), _jsx(SelectContent, { children: ACTION_TYPES.map((action) => (_jsx(SelectItem, { value: action.value, children: action.label }, action.value))) })] })] })] }), _jsxs("div", { className: "flex gap-4 pt-6", children: [_jsx(Button, { onClick: handleCreateWorkflow, disabled: createWorkflowMutation.isPending, className: "flex-1 bg-blue-600 hover:bg-blue-700", children: createWorkflowMutation.isPending ? (_jsxs(_Fragment, { children: [_jsx(Clock, { className: "w-4 h-4 mr-2 animate-spin" }), "Creating..."] })) : (_jsxs(_Fragment, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Create Workflow"] })) }), _jsx(Button, { variant: "outline", className: "border-gray-600", children: "Save as Draft" })] })] })] }) }), _jsx(TabsContent, { value: "ai-insights", children: _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "w-6 h-6 text-purple-400" }), "AI-Powered Process Optimization"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30", children: [_jsxs("h3", { className: "font-semibold mb-3 flex items-center gap-2", children: [_jsx(Cpu, { className: "w-5 h-5 text-blue-400" }), "Performance Optimization"] }), _jsxs("ul", { className: "space-y-2 text-sm", children: [_jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-green-400" }), "VIP escalation workflow can be optimized by 23%"] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-green-400" }), "Fraud detection response time reduced to 45 seconds"] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-yellow-400" }), "Win-back campaign effectiveness declining"] })] })] }), _jsxs("div", { className: "p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30", children: [_jsxs("h3", { className: "font-semibold mb-3 flex items-center gap-2", children: [_jsx(Target, { className: "w-5 h-5 text-green-400" }), "Suggested Workflows"] }), _jsxs("ul", { className: "space-y-2 text-sm", children: [_jsxs("li", { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4 text-green-400" }), "High-roller auto-assignment workflow"] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4 text-green-400" }), "Seasonal promotion automation"] }), _jsxs("li", { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4 text-green-400" }), "Compliance deadline reminders"] })] })] })] }), _jsx("div", { className: "text-center", children: _jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", children: [_jsx(Brain, { className: "w-4 h-4 mr-2" }), "Generate AI Workflow Suggestions"] }) })] })] }) })] })] }) }));
}
