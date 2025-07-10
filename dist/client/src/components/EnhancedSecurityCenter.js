import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Smartphone, Monitor, Clock, DollarSign, AlertTriangle, CheckCircle, XCircle, Lock, Key, Activity, Ban, Timer } from "lucide-react";
export default function EnhancedSecurityCenter() {
    const [selectedTab, setSelectedTab] = useState('security');
    const [qrCode, setQrCode] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: securitySettings } = useQuery({
        queryKey: ['/api/user/security-settings'],
    });
    const { data: devices } = useQuery({
        queryKey: ['/api/user/devices'],
    });
    const { data: loginHistory } = useQuery({
        queryKey: ['/api/user/login-history'],
    });
    const { data: gamblingLimits } = useQuery({
        queryKey: ['/api/user/gambling-limits'],
    });
    // Mock data for demonstration
    const mockSecuritySettings = {
        twoFactorEnabled: true,
        biometricEnabled: false,
        emailNotifications: true,
        smsNotifications: false,
        loginAlerts: true,
        suspiciousActivityAlerts: true,
        sessionTimeout: 30,
        ipWhitelist: ['192.168.1.100', '10.0.0.5'],
        deviceTrust: true
    };
    const mockDevices = [
        {
            id: '1',
            name: 'iPhone 15 Pro',
            type: 'mobile',
            browser: 'Safari',
            os: 'iOS 17.1',
            location: 'New York, NY',
            lastActive: '2 minutes ago',
            trusted: true,
            currentSession: true,
            ipAddress: '192.168.1.100'
        },
        {
            id: '2',
            name: 'MacBook Pro',
            type: 'desktop',
            browser: 'Chrome',
            os: 'macOS Sonoma',
            location: 'New York, NY',
            lastActive: '1 hour ago',
            trusted: true,
            currentSession: false,
            ipAddress: '192.168.1.101'
        },
        {
            id: '3',
            name: 'Unknown Device',
            type: 'desktop',
            browser: 'Firefox',
            os: 'Windows 11',
            location: 'Los Angeles, CA',
            lastActive: '2 days ago',
            trusted: false,
            currentSession: false,
            ipAddress: '203.45.67.89'
        }
    ];
    const mockLoginHistory = [
        {
            id: '1',
            timestamp: '2024-01-15 14:30:22',
            device: 'iPhone 15 Pro',
            location: 'New York, NY',
            ipAddress: '192.168.1.100',
            success: true,
            browser: 'Safari',
            suspicious: false
        },
        {
            id: '2',
            timestamp: '2024-01-15 13:15:45',
            device: 'MacBook Pro',
            location: 'New York, NY',
            ipAddress: '192.168.1.101',
            success: true,
            browser: 'Chrome',
            suspicious: false
        },
        {
            id: '3',
            timestamp: '2024-01-13 09:22:11',
            device: 'Unknown Device',
            location: 'Los Angeles, CA',
            ipAddress: '203.45.67.89',
            success: false,
            browser: 'Firefox',
            suspicious: true
        }
    ];
    const mockGamblingLimits = {
        dailyDepositLimit: 500,
        weeklyDepositLimit: 2000,
        monthlyDepositLimit: 5000,
        dailyBetLimit: 200,
        weeklyBetLimit: 1000,
        monthlyBetLimit: 3000,
        sessionTimeLimit: 120,
        dailyLossLimit: 300,
        weeklyLossLimit: 1500,
        monthlyLossLimit: 4000,
        cooldownPeriod: 24,
        realityCheckInterval: 60
    };
    const settings = securitySettings || mockSecuritySettings;
    const deviceList = devices || mockDevices;
    const loginList = loginHistory || mockLoginHistory;
    const limits = gamblingLimits || mockGamblingLimits;
    const enable2FAMutation = useMutation({
        mutationFn: async () => {
            return apiRequest('POST', '/api/user/enable-2fa');
        },
        onSuccess: (data) => {
            setQrCode(data.qrCode);
            toast({
                title: "2FA Setup",
                description: "Scan the QR code with your authenticator app",
            });
        },
    });
    const verify2FAMutation = useMutation({
        mutationFn: async (code) => {
            return apiRequest('POST', '/api/user/verify-2fa', { code });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/security-settings'] });
            toast({
                title: "2FA Enabled",
                description: "Two-factor authentication has been successfully enabled",
            });
            setQrCode('');
            setVerificationCode('');
        },
    });
    const updateLimitsMutation = useMutation({
        mutationFn: async (newLimits) => {
            return apiRequest('PUT', '/api/user/gambling-limits', newLimits);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/gambling-limits'] });
            toast({
                title: "Limits Updated",
                description: "Your responsible gambling limits have been updated",
            });
        },
    });
    const revokeDeviceMutation = useMutation({
        mutationFn: async (deviceId) => {
            return apiRequest('DELETE', `/api/user/devices/${deviceId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/devices'] });
            toast({
                title: "Device Revoked",
                description: "Device access has been revoked successfully",
            });
        },
    });
    const getDeviceIcon = (type) => {
        switch (type) {
            case 'mobile': return _jsx(Smartphone, { className: "w-5 h-5" });
            case 'tablet': return _jsx(Smartphone, { className: "w-5 h-5" });
            default: return _jsx(Monitor, { className: "w-5 h-5" });
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Security Center" }), _jsx("p", { className: "text-gray-400", children: "Manage your account security and responsible gambling settings" })] }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Shield, { className: `w-8 h-8 mx-auto mb-2 ${settings.twoFactorEnabled ? 'text-green-500' : 'text-red-500'}` }), _jsx("div", { className: "text-sm font-semibold text-white", children: "2FA Status" }), _jsx(Badge, { className: settings.twoFactorEnabled ? 'bg-green-600' : 'bg-red-600', children: settings.twoFactorEnabled ? 'Enabled' : 'Disabled' })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Lock, { className: "w-8 h-8 text-blue-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Trusted Devices" }), _jsx("div", { className: "text-2xl font-bold text-blue-500", children: deviceList.filter(d => d.trusted).length })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Activity, { className: "w-8 h-8 text-purple-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Recent Logins" }), _jsx("div", { className: "text-2xl font-bold text-purple-500", children: loginList.filter(l => l.success).length })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(AlertTriangle, { className: `w-8 h-8 mx-auto mb-2 ${loginList.some(l => l.suspicious) ? 'text-yellow-500' : 'text-green-500'}` }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Security Alerts" }), _jsx("div", { className: `text-2xl font-bold ${loginList.some(l => l.suspicious) ? 'text-yellow-500' : 'text-green-500'}`, children: loginList.filter(l => l.suspicious).length })] }) })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-winnex-gray", children: [_jsx(TabsTrigger, { value: "security", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Security Settings" }), _jsx(TabsTrigger, { value: "devices", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Device Management" }), _jsx(TabsTrigger, { value: "history", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Login History" }), _jsx(TabsTrigger, { value: "limits", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Responsible Gambling" })] }), _jsx(TabsContent, { value: "security", className: "mt-6", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Key, { className: "w-5 h-5" }), "Two-Factor Authentication"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-white font-semibold", children: "Authenticator App" }), _jsx("div", { className: "text-sm text-gray-400", children: "Use Google Authenticator or similar app" })] }), _jsx(Switch, { checked: settings.twoFactorEnabled, onCheckedChange: (checked) => {
                                                                if (checked && !settings.twoFactorEnabled) {
                                                                    enable2FAMutation.mutate();
                                                                }
                                                            } })] }), qrCode && (_jsxs("div", { className: "space-y-4 p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-40 h-40 bg-white mx-auto mb-4 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-black text-xs", children: "QR Code Placeholder" }) }), _jsx("p", { className: "text-sm text-gray-400 mb-4", children: "Scan this QR code with your authenticator app, then enter the 6-digit code below" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Enter 6-digit code", value: verificationCode, onChange: (e) => setVerificationCode(e.target.value), maxLength: 6, className: "bg-winnex-gray border-gray-600" }), _jsx(Button, { onClick: () => verify2FAMutation.mutate(verificationCode), disabled: verificationCode.length !== 6, className: "bg-winnex-green text-black", children: "Verify" })] })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Email notifications" }), _jsx(Switch, { checked: settings.emailNotifications })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "SMS notifications" }), _jsx(Switch, { checked: settings.smsNotifications })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Login alerts" }), _jsx(Switch, { checked: settings.loginAlerts })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Suspicious activity alerts" }), _jsx(Switch, { checked: settings.suspiciousActivityAlerts })] })] })] })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Clock, { className: "w-5 h-5" }), "Session & Access Control"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Session Timeout (minutes)" }), _jsx(Input, { type: "number", value: settings.sessionTimeout, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-white", children: "Device trust system" }), _jsx(Switch, { checked: settings.deviceTrust })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "IP Whitelist" }), _jsxs("div", { className: "space-y-2", children: [settings.ipWhitelist.map((ip, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { value: ip, readOnly: true, className: "bg-winnex-gray border-gray-600" }), _jsx(Button, { variant: "outline", size: "sm", className: "border-red-500 text-red-500", children: "Remove" })] }, index))), _jsx(Button, { variant: "outline", className: "w-full border-green-500 text-green-500", children: "Add Current IP" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "devices", className: "mt-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Registered Devices" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: deviceList.map((device) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [getDeviceIcon(device.type), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-white font-semibold", children: device.name }), device.currentSession && (_jsx(Badge, { className: "bg-green-600 text-xs", children: "Current Session" })), device.trusted && (_jsx(Badge, { className: "bg-blue-600 text-xs", children: "Trusted" })), !device.trusted && (_jsx(Badge, { className: "bg-red-600 text-xs", children: "Untrusted" }))] }), _jsxs("div", { className: "text-sm text-gray-400", children: [device.browser, " on ", device.os] }), _jsxs("div", { className: "text-xs text-gray-500", children: [device.location, " \u2022 ", device.ipAddress, " \u2022 Last active: ", device.lastActive] })] })] }), _jsxs("div", { className: "flex gap-2", children: [!device.trusted && (_jsx(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", children: "Trust Device" })), !device.currentSession && (_jsx(Button, { size: "sm", variant: "outline", className: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white", onClick: () => revokeDeviceMutation.mutate(device.id), children: "Revoke Access" }))] })] }, device.id))) }) })] }) }), _jsx(TabsContent, { value: "history", className: "mt-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Login History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: loginList.map((login) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: login.success ? (_jsx(CheckCircle, { className: "w-5 h-5 text-green-500" })) : (_jsx(XCircle, { className: "w-5 h-5 text-red-500" })) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-white font-semibold", children: login.device }), login.suspicious && (_jsx(Badge, { className: "bg-yellow-600 text-xs", children: "Suspicious" }))] }), _jsxs("div", { className: "text-sm text-gray-400", children: [login.browser, " \u2022 ", login.location] }), _jsxs("div", { className: "text-xs text-gray-500", children: [login.ipAddress, " \u2022 ", login.timestamp] })] })] }), _jsx("div", { className: "text-right", children: _jsx("div", { className: `font-semibold ${login.success ? 'text-green-500' : 'text-red-500'}`, children: login.success ? 'Success' : 'Failed' }) })] }, login.id))) }) })] }) }), _jsxs(TabsContent, { value: "limits", className: "mt-6", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-5 h-5" }), "Deposit Limits"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Daily Limit" }), _jsx(Input, { type: "number", value: limits.dailyDepositLimit, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Weekly Limit" }), _jsx(Input, { type: "number", value: limits.weeklyDepositLimit, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Monthly Limit" }), _jsx(Input, { type: "number", value: limits.monthlyDepositLimit, className: "bg-winnex-gray border-gray-600" })] })] })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Activity, { className: "w-5 h-5" }), "Betting Limits"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Daily Bet Limit" }), _jsx(Input, { type: "number", value: limits.dailyBetLimit, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Weekly Bet Limit" }), _jsx(Input, { type: "number", value: limits.weeklyBetLimit, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Monthly Bet Limit" }), _jsx(Input, { type: "number", value: limits.monthlyBetLimit, className: "bg-winnex-gray border-gray-600" })] })] })] }), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Timer, { className: "w-5 h-5" }), "Session Controls"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Session Time Limit (minutes)" }), _jsx(Input, { type: "number", value: limits.sessionTimeLimit, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Reality Check Interval (minutes)" }), _jsx(Input, { type: "number", value: limits.realityCheckInterval, className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Cooldown Period (hours)" }), _jsx(Input, { type: "number", value: limits.cooldownPeriod, className: "bg-winnex-gray border-gray-600" })] })] })] }), _jsxs(Card, { className: "bg-winnex-dark border-red-700 border-2", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Ban, { className: "w-5 h-5 text-red-500" }), "Self-Exclusion"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-red-900/20 rounded-lg", children: [_jsx("p", { className: "text-red-200 text-sm mb-4", children: "Self-exclusion will prevent you from accessing your account for the selected period. This action cannot be undone until the exclusion period expires." }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { className: "w-full bg-red-600 hover:bg-red-700", variant: "outline", children: "Self-Exclude for 24 Hours" }), _jsx(Button, { className: "w-full bg-red-600 hover:bg-red-700", variant: "outline", children: "Self-Exclude for 7 Days" }), _jsx(Button, { className: "w-full bg-red-600 hover:bg-red-700", variant: "outline", children: "Self-Exclude for 30 Days" }), _jsx(Button, { className: "w-full bg-red-700 hover:bg-red-800", variant: "outline", children: "Self-Exclude for 6 Months" })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xs text-gray-400 mb-2", children: "Need help?" }), _jsx(Button, { variant: "outline", className: "border-blue-500 text-blue-500", children: "Contact Support" })] })] })] })] }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Button, { className: "bg-winnex-green text-black px-8 py-3", onClick: () => updateLimitsMutation.mutate(limits), children: "Save All Limits" }) })] })] })] }));
}
