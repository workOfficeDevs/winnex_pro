import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fingerprint, Eye, Wifi, WifiOff, Bell, Gamepad2, Camera } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
export default function AdvancedMobileFeatures() {
    const [isOffline, setIsOffline] = useState(false);
    const [biometricSupported, setBiometricSupported] = useState(false);
    const [arSupported, setArSupported] = useState(false);
    const queryClient = useQueryClient();
    useEffect(() => {
        // Check for offline status
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // Check for biometric support (Web Authentication API)
        if (navigator.credentials && 'create' in navigator.credentials) {
            setBiometricSupported(true);
        }
        // Check for AR/VR support
        if ('xr' in navigator) {
            setBiometricSupported(true);
        }
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    const { data: biometricAuth } = useQuery({
        queryKey: ['/api/mobile/biometric-auth'],
        queryFn: () => apiRequest('/api/mobile/biometric-auth'),
    });
    const { data: offlineBets } = useQuery({
        queryKey: ['/api/mobile/offline-bets'],
        queryFn: () => apiRequest('/api/mobile/offline-bets'),
    });
    const { data: pushNotifications } = useQuery({
        queryKey: ['/api/mobile/push-notifications'],
        queryFn: () => apiRequest('/api/mobile/push-notifications'),
    });
    const { data: arvrExperiences } = useQuery({
        queryKey: ['/api/mobile/arvr-experiences'],
        queryFn: () => apiRequest('/api/mobile/arvr-experiences'),
    });
    const { data: smartTiming } = useQuery({
        queryKey: ['/api/mobile/smart-timing'],
        queryFn: () => apiRequest('/api/mobile/smart-timing'),
    });
    const enableBiometricMutation = useMutation({
        mutationFn: (authType) => apiRequest('/api/mobile/enable-biometric', 'POST', { authType }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/mobile/biometric-auth'] });
        },
    });
    const syncOfflineBetsMutation = useMutation({
        mutationFn: () => apiRequest('/api/mobile/sync-offline-bets', 'POST'),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/mobile/offline-bets'] });
        },
    });
    const launchARExperienceMutation = useMutation({
        mutationFn: (experienceId) => apiRequest('/api/mobile/launch-ar-experience', 'POST', { experienceId }),
    });
    const scheduleNotificationMutation = useMutation({
        mutationFn: (data) => apiRequest('/api/mobile/schedule-notification', 'POST', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/mobile/push-notifications'] });
        },
    });
    const handleBiometricAuth = async (type) => {
        if (!biometricSupported) {
            alert('Biometric authentication not supported on this device');
            return;
        }
        try {
            const credential = await navigator.credentials.create({
                publicKey: {
                    challenge: new Uint8Array(32),
                    rp: { name: "Winnex" },
                    user: {
                        id: new Uint8Array(16),
                        name: "user@winnex.com",
                        displayName: "Winnex User"
                    },
                    pubKeyCredParams: [{ alg: -7, type: "public-key" }],
                    authenticatorSelection: {
                        authenticatorAttachment: "platform",
                        userVerification: "required"
                    },
                    timeout: 60000,
                    attestation: "direct"
                }
            });
            if (credential) {
                enableBiometricMutation.mutate(type);
            }
        }
        catch (error) {
            console.error('Biometric authentication failed:', error);
        }
    };
    const launchARExperience = async (experienceId) => {
        if (!arSupported) {
            alert('AR/VR not supported on this device');
            return;
        }
        try {
            const session = await navigator.xr?.requestSession('immersive-ar', {
                requiredFeatures: ['local', 'hit-test'],
                optionalFeatures: ['dom-overlay', 'light-estimation']
            });
            if (session) {
                launchARExperienceMutation.mutate(experienceId);
            }
        }
        catch (error) {
            console.error('AR experience launch failed:', error);
        }
    };
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'odds_change': return _jsx(TrendingUp, { className: "h-5 w-5 text-blue-400" });
            case 'bet_result': return _jsx(CheckCircle, { className: "h-5 w-5 text-green-400" });
            case 'live_score': return _jsx(Activity, { className: "h-5 w-5 text-yellow-400" });
            case 'cash_out': return _jsx(DollarSign, { className: "h-5 w-5 text-purple-400" });
            default: return _jsx(Bell, { className: "h-5 w-5 text-gray-400" });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Advanced Mobile Features" }), _jsx("p", { className: "text-slate-300", children: "Next-generation mobile betting with biometrics, offline mode, and AR/VR" })] }), isOffline && (_jsxs(Alert, { className: "mb-6 bg-orange-900/20 border-orange-500/20", children: [_jsx(WifiOff, { className: "h-4 w-4" }), _jsx(AlertDescription, { className: "text-orange-300", children: "You're currently offline. Bets will be queued and synced when connection is restored." })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8", children: [_jsx(Card, { className: "bg-black/20 border-green-500/20 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-green-400 text-sm font-medium", children: "Biometric Logins" }), _jsx("p", { className: "text-3xl font-bold text-white", children: "847" })] }), _jsx(Fingerprint, { className: "h-8 w-8 text-green-400" })] }) }) }), _jsx(Card, { className: "bg-black/20 border-blue-500/20 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-blue-400 text-sm font-medium", children: "Offline Bets" }), _jsx("p", { className: "text-3xl font-bold text-white", children: offlineBets?.filter((bet) => bet.status === 'pending_sync').length || 0 })] }), _jsx(WifiOff, { className: "h-8 w-8 text-blue-400" })] }) }) }), _jsx(Card, { className: "bg-black/20 border-purple-500/20 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-purple-400 text-sm font-medium", children: "AR Sessions" }), _jsx("p", { className: "text-3xl font-bold text-white", children: "23" })] }), _jsx(Camera, { className: "h-8 w-8 text-purple-400" })] }) }) }), _jsx(Card, { className: "bg-black/20 border-yellow-500/20 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-yellow-400 text-sm font-medium", children: "Push Notifications" }), _jsx("p", { className: "text-3xl font-bold text-white", children: pushNotifications?.filter((n) => !n.opened).length || 0 })] }), _jsx(Bell, { className: "h-8 w-8 text-yellow-400" })] }) }) })] }), _jsxs(Tabs, { defaultValue: "biometric", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-black/20 backdrop-blur-xl border-white/10", children: [_jsx(TabsTrigger, { value: "biometric", className: "data-[state=active]:bg-green-500/20", children: "Biometric Auth" }), _jsx(TabsTrigger, { value: "offline", className: "data-[state=active]:bg-green-500/20", children: "Offline Mode" }), _jsx(TabsTrigger, { value: "notifications", className: "data-[state=active]:bg-green-500/20", children: "Smart Notifications" }), _jsx(TabsTrigger, { value: "arvr", className: "data-[state=active]:bg-green-500/20", children: "AR/VR Experiences" }), _jsx(TabsTrigger, { value: "timing", className: "data-[state=active]:bg-green-500/20", children: "Smart Timing" })] }), _jsx(TabsContent, { value: "biometric", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Biometric Authentication" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${biometricAuth?.available ? 'bg-green-500' : 'bg-red-500'}` }), _jsx("span", { className: "text-white", children: "Device Support" })] }), _jsx(Badge, { className: biometricAuth?.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400', children: biometricAuth?.available ? 'Available' : 'Not Available' })] }), biometricAuth?.available && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-white font-medium", children: "Available Authentication Methods" }), biometricAuth.types.map((type) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [type === 'fingerprint' && _jsx(Fingerprint, { className: "h-5 w-5 text-blue-400" }), type === 'faceId' && _jsx(Eye, { className: "h-5 w-5 text-green-400" }), type === 'voiceId' && _jsx(Mic, { className: "h-5 w-5 text-purple-400" }), type === 'iris' && _jsx(Eye, { className: "h-5 w-5 text-yellow-400" }), _jsx("span", { className: "text-white capitalize", children: type.replace('Id', ' ID') })] }), _jsx(Button, { size: "sm", onClick: () => handleBiometricAuth(type), className: "bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30", children: biometricAuth.enabled ? 'Enabled' : 'Enable' })] }, type)))] }), _jsxs("div", { className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsx("h4", { className: "text-white font-medium mb-3", children: "Security Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Security Level" }), _jsx(Badge, { className: `${biometricAuth.securityLevel === 'military' ? 'bg-red-500/20 text-red-400' :
                                                                                            biometricAuth.securityLevel === 'enhanced' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                                                'bg-green-500/20 text-green-400'}`, children: biometricAuth.securityLevel })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Failed Attempts" }), _jsxs("span", { className: "text-white", children: [biometricAuth.failedAttempts, "/5"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Last Used" }), _jsx("span", { className: "text-white", children: new Date(biometricAuth.lastUsed).toLocaleDateString() })] })] })] })] }))] })] }), _jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Security Features" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-green-500/10 border border-green-500/20 rounded-lg", children: [_jsx("h4", { className: "text-green-400 font-medium mb-2", children: "Advanced Security" }), _jsxs("ul", { className: "space-y-1 text-sm text-slate-300", children: [_jsx("li", { children: "\u2022 Liveness detection to prevent spoofing" }), _jsx("li", { children: "\u2022 Multi-factor biometric combination" }), _jsx("li", { children: "\u2022 Behavioral biometrics analysis" }), _jsx("li", { children: "\u2022 Hardware security module integration" })] })] }), _jsxs("div", { className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg", children: [_jsx("h4", { className: "text-blue-400 font-medium mb-2", children: "Privacy Protection" }), _jsxs("ul", { className: "space-y-1 text-sm text-slate-300", children: [_jsx("li", { children: "\u2022 Biometric data stored locally only" }), _jsx("li", { children: "\u2022 End-to-end encryption" }), _jsx("li", { children: "\u2022 No cloud storage of biometric templates" }), _jsx("li", { children: "\u2022 GDPR compliant data handling" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "offline", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-white", children: "Offline Betting Queue" }), _jsxs(Button, { onClick: () => syncOfflineBetsMutation.mutate(), className: "bg-blue-500 hover:bg-blue-600", disabled: isOffline, children: [_jsx(Wifi, { className: "h-4 w-4 mr-2" }), "Sync Now"] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [offlineBets?.map((bet) => (_jsxs("div", { className: "p-4 bg-slate-800/30 rounded-lg border border-slate-600/30", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-white font-medium", children: ["Match ", bet.matchId] }), _jsxs("p", { className: "text-slate-400 text-sm", children: [bet.selection, " @ ", bet.odds] })] }), _jsx(Badge, { className: `${bet.status === 'synced' ? 'bg-green-500/20 text-green-400' :
                                                                                    bet.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                                                                                        'bg-yellow-500/20 text-yellow-400'}`, children: bet.status.replace('_', ' ') })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Stake" }), _jsxs("p", { className: "text-white font-bold", children: ["$", bet.stake] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Potential Return" }), _jsxs("p", { className: "text-green-400 font-bold", children: ["$", bet.estimatedReturn] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Placed" }), _jsx("p", { className: "text-white", children: new Date(bet.timestamp).toLocaleTimeString() })] })] })] }, bet.id))), (!offlineBets || offlineBets.length === 0) && (_jsxs("div", { className: "text-center py-8", children: [_jsx(WifiOff, { className: "h-12 w-12 text-slate-400 mx-auto mb-4" }), _jsx("p", { className: "text-slate-400", children: "No offline bets in queue" })] }))] }) })] }) }), _jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Offline Capabilities" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "p-3 bg-green-500/10 border border-green-500/20 rounded-lg", children: [_jsx("h4", { className: "text-green-400 font-medium mb-2", children: "Available Offline" }), _jsxs("ul", { className: "space-y-1 text-sm text-slate-300", children: [_jsx("li", { children: "\u2022 View betting history" }), _jsx("li", { children: "\u2022 Browse cached odds" }), _jsx("li", { children: "\u2022 Place bets (queued)" }), _jsx("li", { children: "\u2022 Access account balance" }), _jsx("li", { children: "\u2022 Read betting tips" })] })] }), _jsxs("div", { className: "p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg", children: [_jsx("h4", { className: "text-yellow-400 font-medium mb-2", children: "Auto-Sync Features" }), _jsxs("ul", { className: "space-y-1 text-sm text-slate-300", children: [_jsx("li", { children: "\u2022 Queue bets when offline" }), _jsx("li", { children: "\u2022 Sync when connection restored" }), _jsx("li", { children: "\u2022 Verify odds before placement" }), _jsx("li", { children: "\u2022 Update cached content" })] })] }), _jsxs("div", { className: "p-3 bg-slate-800/30 rounded-lg", children: [_jsx("h4", { className: "text-white font-medium mb-2", children: "Storage Usage" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-slate-300", children: "Cached Data" }), _jsx("span", { className: "text-white", children: "45.2 MB" })] }), _jsx(Progress, { value: 65, className: "h-2" }), _jsx("p", { className: "text-xs text-slate-400", children: "65% of available cache" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "notifications", className: "space-y-6", children: _jsx("div", { className: "space-y-4", children: pushNotifications?.map((notification) => (_jsx(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "flex-shrink-0", children: getNotificationIcon(notification.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("h3", { className: "text-white font-medium", children: notification.title }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { className: `${notification.priority === 'urgent' ? 'bg-red-500/20 text-red-400' :
                                                                                notification.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                                                                    notification.priority === 'normal' ? 'bg-blue-500/20 text-blue-400' :
                                                                                        'bg-gray-500/20 text-gray-400'}`, children: notification.priority }), !notification.opened && (_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }))] })] }), _jsx("p", { className: "text-slate-300 mb-3", children: notification.message }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "User Segment" }), _jsx("p", { className: "text-white", children: notification.personalizedContent.userSegment })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Optimal Time" }), _jsx("p", { className: "text-white", children: notification.personalizedContent.optimalTime })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Engagement Score" }), _jsxs("p", { className: "text-blue-400", children: [notification.personalizedContent.engagement_score, "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Status" }), _jsx("p", { className: notification.delivered ? 'text-green-400' : 'text-yellow-400', children: notification.delivered ? 'Delivered' : 'Pending' })] })] }), notification.personalizedContent.interests.length > 0 && (_jsxs("div", { className: "mt-3", children: [_jsx("p", { className: "text-slate-400 text-sm mb-1", children: "Targeted Interests:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: notification.personalizedContent.interests.map((interest, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: interest }, index))) })] }))] })] }) }) }, notification.id))) }) }), _jsx(TabsContent, { value: "arvr", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: arvrExperiences?.map((experience) => (_jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: experience.title }), _jsx("p", { className: "text-slate-400 text-sm", children: experience.description })] }), _jsx(Badge, { className: `${experience.availability === 'live' ? 'bg-green-500/20 text-green-400' :
                                                            experience.availability === 'beta' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-blue-500/20 text-blue-400'}`, children: experience.availability })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400 text-sm", children: "Participants" }), _jsx("p", { className: "text-white font-bold", children: experience.participants })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400 text-sm", children: "Rating" }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-yellow-400 font-bold", children: experience.rating }), _jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `h-3 w-3 ${i < experience.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'}` }, i))) })] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400 text-sm mb-2", children: "Features" }), _jsx("div", { className: "flex flex-wrap gap-1", children: experience.features.map((feature, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: feature }, index))) })] }), _jsxs("div", { className: "p-3 bg-slate-800/30 rounded-lg", children: [_jsx("p", { className: "text-slate-400 text-sm mb-2", children: "Requirements" }), _jsxs("div", { className: "space-y-1 text-xs text-slate-300", children: [_jsxs("p", { children: ["\u2022 Bandwidth: ", experience.requirements.bandwidth] }), _jsxs("p", { children: ["\u2022 Device: ", experience.requirements.device_specs] }), _jsxs("p", { children: ["\u2022 Sensors: ", experience.requirements.sensor_access.join(', ')] })] })] }), _jsxs(Button, { className: "w-full bg-purple-500 hover:bg-purple-600", onClick: () => launchARExperience(experience.id), disabled: experience.availability !== 'live', children: [_jsx(Gamepad2, { className: "h-4 w-4 mr-2" }), experience.availability === 'live' ? 'Launch Experience' :
                                                            experience.availability === 'beta' ? 'Join Beta' : 'Coming Soon'] })] })] }, experience.id))) }) }), _jsx(TabsContent, { value: "timing", className: "space-y-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Optimal Betting Windows" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: smartTiming?.optimalBettingWindows?.map((window, index) => (_jsxs("div", { className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h4", { className: "text-white font-medium", children: window.sport }), _jsxs(Badge, { className: "bg-green-500/20 text-green-400", children: [window.probability, "% optimal"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Time Window" }), _jsx("p", { className: "text-white", children: window.timeframe })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Reasoning" }), _jsx("p", { className: "text-slate-300", children: window.reasoning })] })] })] }, index))) }) })] }), _jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Your Betting Pattern" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-slate-800/30 rounded-lg", children: [_jsx("h4", { className: "text-white font-medium mb-3", children: "Behavior Analysis" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Most Active Hours" }), _jsx("span", { className: "text-white", children: smartTiming?.userBehaviorPattern?.mostActiveHours?.join(', ') })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Preferred Days" }), _jsx("span", { className: "text-white", children: smartTiming?.userBehaviorPattern?.preferredDays?.join(', ') })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Avg Session" }), _jsxs("span", { className: "text-white", children: [smartTiming?.userBehaviorPattern?.sessionDuration, " min"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Engagement Score" }), _jsxs("span", { className: "text-green-400", children: [smartTiming?.userBehaviorPattern?.engagementScore, "/100"] })] })] })] }), _jsxs("div", { className: "p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg", children: [_jsx("h4", { className: "text-blue-400 font-medium mb-2", children: "Next Recommended Session" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Date & Time" }), _jsx("span", { className: "text-white", children: smartTiming?.nextRecommendedSession?.datetime })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Duration" }), _jsx("span", { className: "text-white", children: smartTiming?.nextRecommendedSession?.duration })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-300", children: "Expected Matches" }), _jsx("span", { className: "text-white", children: smartTiming?.nextRecommendedSession?.expectedMatches })] }), _jsx("p", { className: "text-slate-300 text-xs mt-2", children: smartTiming?.nextRecommendedSession?.reasoning })] })] })] })] })] }) })] })] }) }));
}
