import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Fingerprint, Eye, Mic, Shield, Smartphone, Lock, CheckCircle, AlertTriangle } from "lucide-react";
export default function BiometricAuth() {
    const [biometricMethods, setBiometricMethods] = useState([]);
    const [authSessions, setAuthSessions] = useState([]);
    const [securitySettings, setSecuritySettings] = useState({
        requireBiometric: true,
        fallbackPassword: true,
        lockoutThreshold: 3,
        sessionTimeout: 30,
        multiFactorRequired: false,
        adaptiveAuth: true
    });
    const [enrollmentProgress, setEnrollmentProgress] = useState(0);
    const [isEnrolling, setIsEnrolling] = useState(false);
    useEffect(() => {
        const mockBiometricMethods = [
            {
                id: 'fingerprint',
                name: 'Fingerprint',
                type: 'fingerprint',
                icon: _jsx(Fingerprint, { className: "w-6 h-6" }),
                enabled: true,
                enrolled: true,
                accuracy: 99.8,
                lastUsed: '2024-01-15 14:30',
                deviceSupport: true,
                securityLevel: 'enhanced'
            },
            {
                id: 'faceId',
                name: 'Face ID',
                type: 'faceId',
                icon: _jsx(Eye, { className: "w-6 h-6" }),
                enabled: true,
                enrolled: true,
                accuracy: 99.2,
                lastUsed: '2024-01-15 12:15',
                deviceSupport: true,
                securityLevel: 'enhanced'
            },
            {
                id: 'voiceId',
                name: 'Voice Recognition',
                type: 'voiceId',
                icon: _jsx(Mic, { className: "w-6 h-6" }),
                enabled: false,
                enrolled: false,
                accuracy: 96.5,
                lastUsed: 'Never',
                deviceSupport: true,
                securityLevel: 'basic'
            },
            {
                id: 'iris',
                name: 'Iris Scan',
                type: 'iris',
                icon: _jsx(Eye, { className: "w-6 h-6" }),
                enabled: false,
                enrolled: false,
                accuracy: 99.9,
                lastUsed: 'Never',
                deviceSupport: false,
                securityLevel: 'military'
            }
        ];
        const mockAuthSessions = [
            {
                id: 'session_1',
                method: 'Fingerprint',
                timestamp: '2024-01-15 14:30:25',
                location: 'London, UK',
                device: 'iPhone 15 Pro',
                status: 'success',
                riskScore: 2
            },
            {
                id: 'session_2',
                method: 'Face ID',
                timestamp: '2024-01-15 12:15:43',
                location: 'London, UK',
                device: 'iPhone 15 Pro',
                status: 'success',
                riskScore: 1
            },
            {
                id: 'session_3',
                method: 'Password',
                timestamp: '2024-01-14 18:45:12',
                location: 'Manchester, UK',
                device: 'Chrome Browser',
                status: 'success',
                riskScore: 5
            },
            {
                id: 'session_4',
                method: 'Fingerprint',
                timestamp: '2024-01-14 09:20:30',
                location: 'Unknown Location',
                device: 'Unknown Device',
                status: 'failed',
                riskScore: 9
            }
        ];
        setBiometricMethods(mockBiometricMethods);
        setAuthSessions(mockAuthSessions);
    }, []);
    const getSecurityLevelColor = (level) => {
        switch (level) {
            case 'military': return 'text-red-400';
            case 'enhanced': return 'text-emerald-400';
            case 'basic': return 'text-yellow-400';
            default: return 'text-gray-400';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'text-green-400';
            case 'failed': return 'text-red-400';
            case 'blocked': return 'text-orange-400';
            default: return 'text-gray-400';
        }
    };
    const getRiskScoreColor = (score) => {
        if (score <= 3)
            return 'text-green-400';
        if (score <= 6)
            return 'text-yellow-400';
        return 'text-red-400';
    };
    const enrollBiometric = async (methodId) => {
        setIsEnrolling(true);
        setEnrollmentProgress(0);
        // Simulate enrollment progress
        const interval = setInterval(() => {
            setEnrollmentProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsEnrolling(false);
                    // Update the method as enrolled
                    setBiometricMethods(methods => methods.map(method => method.id === methodId
                        ? { ...method, enrolled: true, enabled: true }
                        : method));
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };
    const toggleMethod = (methodId) => {
        setBiometricMethods(methods => methods.map(method => method.id === methodId
            ? { ...method, enabled: !method.enabled }
            : method));
    };
    const updateSecuritySetting = (key, value) => {
        setSecuritySettings(prev => ({ ...prev, [key]: value }));
    };
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Shield, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Biometric Security" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Advanced authentication methods for maximum security" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-emerald-400", children: biometricMethods.filter(m => m.enrolled).length }), _jsx("div", { className: "text-sm text-gray-400", children: "Methods Enrolled" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: biometricMethods.filter(m => m.enabled).length }), _jsx("div", { className: "text-sm text-gray-400", children: "Active Methods" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-green-400", children: authSessions.filter(s => s.status === 'success').length }), _jsx("div", { className: "text-sm text-gray-400", children: "Successful Logins" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-2xl font-bold text-red-400", children: authSessions.filter(s => s.status === 'failed').length }), _jsx("div", { className: "text-sm text-gray-400", children: "Failed Attempts" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Biometric Methods" }) }), _jsxs(CardContent, { className: "space-y-4", children: [biometricMethods.map((method) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-emerald-400", children: method.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: method.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: method.enrolled ? 'default' : 'secondary', className: "text-xs", children: method.enrolled ? 'Enrolled' : 'Not Enrolled' }), _jsx(Badge, { variant: "outline", className: `text-xs ${getSecurityLevelColor(method.securityLevel)}`, children: method.securityLevel })] })] })] }), _jsx("div", { className: "flex items-center space-x-2", children: method.enrolled && (_jsx(Switch, { checked: method.enabled, onCheckedChange: () => toggleMethod(method.id), disabled: !method.deviceSupport })) })] }), method.enrolled ? (_jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Accuracy:" }), _jsxs("span", { className: "text-emerald-400", children: [method.accuracy, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Last Used:" }), _jsx("span", { className: "text-white", children: method.lastUsed })] })] })) : (_jsx("div", { className: "space-y-2", children: !method.deviceSupport ? (_jsxs("div", { className: "flex items-center space-x-2 text-orange-400", children: [_jsx(AlertTriangle, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Device not supported" })] })) : (_jsxs(Button, { onClick: () => enrollBiometric(method.id), disabled: isEnrolling, className: "w-full bg-emerald-500 hover:bg-emerald-600", children: ["Enroll ", method.name] })) }))] }) }, method.id))), isEnrolling && (_jsx(Card, { className: "border-emerald-400/20 bg-emerald-500/10", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [_jsx(Smartphone, { className: "w-5 h-5 text-emerald-400" }), _jsx("span", { className: "text-white font-semibold", children: "Enrolling Biometric..." })] }), _jsx(Progress, { value: enrollmentProgress, className: "h-2" }), _jsx("p", { className: "text-sm text-gray-400 mt-2", children: "Please follow the on-screen instructions on your device" })] }) }))] })] }), _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Security Settings" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Require Biometric Authentication" }), _jsx("div", { className: "text-sm text-gray-400", children: "Always require biometric verification" })] }), _jsx(Switch, { checked: securitySettings.requireBiometric, onCheckedChange: (checked) => updateSecuritySetting('requireBiometric', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Password Fallback" }), _jsx("div", { className: "text-sm text-gray-400", children: "Allow password if biometric fails" })] }), _jsx(Switch, { checked: securitySettings.fallbackPassword, onCheckedChange: (checked) => updateSecuritySetting('fallbackPassword', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Multi-Factor Authentication" }), _jsx("div", { className: "text-sm text-gray-400", children: "Require multiple verification methods" })] }), _jsx(Switch, { checked: securitySettings.multiFactorRequired, onCheckedChange: (checked) => updateSecuritySetting('multiFactorRequired', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Adaptive Authentication" }), _jsx("div", { className: "text-sm text-gray-400", children: "Adjust security based on risk" })] }), _jsx(Switch, { checked: securitySettings.adaptiveAuth, onCheckedChange: (checked) => updateSecuritySetting('adaptiveAuth', checked) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "font-medium text-white", children: "Failed Attempt Lockout" }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Lock account after ", securitySettings.lockoutThreshold, " failed attempts"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "font-medium text-white", children: "Session Timeout" }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Auto-lock after ", securitySettings.sessionTimeout, " minutes of inactivity"] })] })] })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Recent Authentication Activity" }) }), _jsx(CardContent, { className: "space-y-4", children: authSessions.map((session) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${session.status === 'success' ? 'bg-green-400' :
                                                                            session.status === 'failed' ? 'bg-red-400' : 'bg-orange-400'}` }), _jsx("span", { className: "font-medium text-white", children: session.method }), _jsx(Badge, { variant: "outline", className: getStatusColor(session.status), children: session.status.toUpperCase() })] }), _jsxs("div", { className: `text-sm font-semibold ${getRiskScoreColor(session.riskScore)}`, children: ["Risk: ", session.riskScore, "/10"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm text-gray-400", children: [_jsxs("div", { children: [_jsxs("div", { children: ["Time: ", session.timestamp] }), _jsxs("div", { children: ["Location: ", session.location] })] }), _jsxs("div", { children: [_jsxs("div", { children: ["Device: ", session.device] }), _jsxs("div", { className: "flex items-center", children: [session.status === 'success' ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-400 mr-1" })) : (_jsx(AlertTriangle, { className: "w-4 h-4 text-red-400 mr-1" })), session.status === 'success' ? 'Verified' : 'Blocked'] })] })] })] }) }, session.id))) })] }), _jsxs(Card, { className: "casino-card border-blue-400/20", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Shield, { className: "w-5 h-5 mr-2 text-blue-400" }), "Security Recommendations"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-green-400 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Enable Face ID" }), _jsx("div", { className: "text-sm text-gray-400", children: "Add Face ID as a backup authentication method" })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-orange-400 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Review Failed Attempts" }), _jsx("div", { className: "text-sm text-gray-400", children: "Investigate recent failed authentication attempts" })] })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Lock, { className: "w-5 h-5 text-blue-400 mt-0.5" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white", children: "Enable Multi-Factor Auth" }), _jsx("div", { className: "text-sm text-gray-400", children: "Increase security with multiple verification methods" })] })] })] })] })] })] })] }));
}
