import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Target, TrendingUp, Trophy, Camera, Heart, Activity, Sparkles, Star, Crown, Shield, Flame, ThumbsUp } from "lucide-react";
import html2canvas from "html2canvas";
const performanceZones = [
    {
        id: "betting",
        name: "Betting Engine",
        temperature: 85,
        performance: 94,
        color: "from-green-400 to-emerald-600",
        icon: Target,
        description: "Ultra-fast bet processing",
        trend: "up",
        level: 5
    },
    {
        id: "settlement",
        name: "Settlement",
        temperature: 92,
        performance: 98,
        color: "from-blue-400 to-cyan-600",
        icon: Zap,
        description: "Automated settlement engine",
        trend: "up",
        level: 6
    },
    {
        id: "margins",
        name: "Margin Engine",
        temperature: 78,
        performance: 89,
        color: "from-purple-400 to-violet-600",
        icon: TrendingUp,
        description: "Dynamic profit optimization",
        trend: "stable",
        level: 4
    },
    {
        id: "limits",
        name: "Safety Limits",
        temperature: 88,
        performance: 96,
        color: "from-orange-400 to-red-600",
        icon: Shield,
        description: "Responsible gambling protection",
        trend: "up",
        level: 5
    },
    {
        id: "crypto",
        name: "Crypto Engine",
        temperature: 91,
        performance: 93,
        color: "from-yellow-400 to-amber-600",
        icon: Flame,
        description: "Multi-currency processing",
        trend: "up",
        level: 5
    }
];
const trophyCase = [
    {
        id: "speed-demon",
        name: "Speed Demon",
        description: "Achieved sub-100ms response times",
        icon: Zap,
        rarity: "gold",
        unlocked: true,
        progress: 100,
        requirement: "Response time < 100ms"
    },
    {
        id: "settlement-master",
        name: "Settlement Master",
        description: "100% automated settlement accuracy",
        icon: Target,
        rarity: "legendary",
        unlocked: true,
        progress: 100,
        requirement: "98%+ settlement accuracy"
    },
    {
        id: "profit-optimizer",
        name: "Profit Optimizer",
        description: "Achieved 10%+ margin optimization",
        icon: TrendingUp,
        rarity: "silver",
        unlocked: true,
        progress: 100,
        requirement: "10%+ profit increase"
    },
    {
        id: "guardian-angel",
        name: "Guardian Angel",
        description: "Perfect responsible gambling compliance",
        icon: Heart,
        rarity: "gold",
        unlocked: true,
        progress: 100,
        requirement: "100% limit enforcement"
    },
    {
        id: "crypto-champion",
        name: "Crypto Champion",
        description: "Multi-currency excellence",
        icon: Crown,
        rarity: "bronze",
        unlocked: false,
        progress: 75,
        requirement: "Support 10+ cryptocurrencies"
    },
    {
        id: "uptime-hero",
        name: "Uptime Hero",
        description: "99.9% system availability",
        icon: Trophy,
        rarity: "legendary",
        unlocked: false,
        progress: 95,
        requirement: "99.9% uptime for 30 days"
    }
];
export default function InteractivePerformanceHeatMap() {
    const [selectedZone, setSelectedZone] = useState(null);
    const [animationTrigger, setAnimationTrigger] = useState(0);
    const [mascot, setMascot] = useState({
        mood: "happy",
        energy: 85,
        message: "All systems running perfectly! 🚀",
        animation: "bounce"
    });
    const [showTrophies, setShowTrophies] = useState(false);
    const [gameMode, setGameMode] = useState(false);
    const heatMapRef = useRef(null);
    // Update mascot based on performance
    useEffect(() => {
        const avgPerformance = performanceZones.reduce((sum, zone) => sum + zone.performance, 0) / performanceZones.length;
        if (avgPerformance > 95) {
            setMascot({
                mood: "celebrating",
                energy: 100,
                message: "Incredible performance! You're crushing it! 🎉",
                animation: "celebration"
            });
        }
        else if (avgPerformance > 90) {
            setMascot({
                mood: "excited",
                energy: 90,
                message: "Excellent work! Systems are running beautifully! ⭐",
                animation: "dance"
            });
        }
        else if (avgPerformance > 80) {
            setMascot({
                mood: "focused",
                energy: 75,
                message: "Good performance! Some areas could use attention. 💪",
                animation: "focus"
            });
        }
        else {
            setMascot({
                mood: "sleeping",
                energy: 50,
                message: "Systems need optimization. Let's boost performance! 🔧",
                animation: "sleepy"
            });
        }
    }, []);
    // Trigger animations periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationTrigger(prev => prev + 1);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const getTemperatureColor = (temp) => {
        if (temp > 90)
            return "from-red-500 to-pink-600";
        if (temp > 80)
            return "from-orange-500 to-yellow-600";
        if (temp > 70)
            return "from-yellow-500 to-green-600";
        return "from-blue-500 to-cyan-600";
    };
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case "legendary": return "from-purple-500 to-pink-600";
            case "gold": return "from-yellow-500 to-amber-600";
            case "silver": return "from-gray-400 to-gray-600";
            default: return "from-amber-600 to-orange-600";
        }
    };
    const generateSnapshot = async () => {
        if (heatMapRef.current) {
            try {
                const canvas = await html2canvas(heatMapRef.current, {
                    backgroundColor: '#1a1a1a',
                    scale: 2
                });
                const link = document.createElement('a');
                link.download = `winnex-performance-${new Date().toISOString().split('T')[0]}.png`;
                link.href = canvas.toDataURL();
                link.click();
                setMascot(prev => ({
                    ...prev,
                    message: "Performance snapshot saved! 📸",
                    animation: "camera"
                }));
            }
            catch (error) {
                console.error('Failed to generate snapshot:', error);
            }
        }
    };
    const MascotCharacter = () => (_jsx(motion.div, { className: "relative", animate: {
            scale: mascot.animation === "celebration" ? [1, 1.2, 1] : 1,
            rotate: mascot.animation === "dance" ? [0, 10, -10, 0] : 0,
            y: mascot.animation === "bounce" ? [0, -10, 0] : 0
        }, transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }, children: _jsxs("div", { className: "w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center relative overflow-hidden", children: [_jsx(motion.div, { className: "text-3xl", animate: {
                        rotate: mascot.animation === "focus" ? [0, 5, -5, 0] : 0
                    }, transition: { duration: 1, repeat: Infinity }, children: mascot.mood === "celebrating" ? "🎉" :
                        mascot.mood === "excited" ? "⭐" :
                            mascot.mood === "focused" ? "💪" :
                                mascot.mood === "sleeping" ? "😴" : "😊" }), _jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20", children: _jsx(motion.div, { className: "h-full bg-yellow-400", style: { width: `${mascot.energy}%` }, animate: { width: `${mascot.energy}%` }, transition: { duration: 1 } }) })] }) }));
    return (_jsxs("div", { ref: heatMapRef, className: "space-y-6 p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent", children: "Performance Heat Map" }), _jsx("p", { className: "text-muted-foreground", children: "Real-time system performance with gaming elements" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(MascotCharacter, {}), _jsx(motion.p, { className: "text-xs mt-2 max-w-32 text-center", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: mascot.message }, mascot.message)] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: () => setShowTrophies(!showTrophies), variant: "outline", size: "sm", className: "bg-gradient-to-r from-yellow-500 to-amber-600 text-black border-0", children: [_jsx(Trophy, { className: "h-4 w-4 mr-2" }), "Trophies"] }), _jsxs(Button, { onClick: generateSnapshot, variant: "outline", size: "sm", className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0", children: [_jsx(Camera, { className: "h-4 w-4 mr-2" }), "Snapshot"] }), _jsxs(Button, { onClick: () => setGameMode(!gameMode), variant: "outline", size: "sm", className: "bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0", children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), "Game Mode"] })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4", children: performanceZones.map((zone, index) => (_jsx(motion.div, { className: "relative", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Card, { className: `cursor-pointer transition-all duration-300 overflow-hidden ${selectedZone === zone.id ? 'ring-2 ring-green-400' : ''}`, onClick: () => setSelectedZone(selectedZone === zone.id ? null : zone.id), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: `w-full h-32 bg-gradient-to-br ${zone.color} rounded-lg mb-3 relative overflow-hidden`, children: [_jsx(motion.div, { className: `absolute inset-0 bg-gradient-to-br ${getTemperatureColor(zone.temperature)} opacity-30`, animate: {
                                                opacity: [0.3, 0.6, 0.3]
                                            }, transition: {
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            } }), gameMode && (_jsx(motion.div, { className: "absolute inset-0", initial: { opacity: 0 }, animate: { opacity: 1 }, children: [...Array(5)].map((_, i) => (_jsx(motion.div, { className: "absolute w-1 h-1 bg-white rounded-full", style: {
                                                    left: `${Math.random() * 100}%`,
                                                    top: `${Math.random() * 100}%`
                                                }, animate: {
                                                    scale: [0, 1, 0],
                                                    opacity: [0, 1, 0]
                                                }, transition: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: i * 0.4
                                                } }, i))) })), _jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(zone.icon, { className: "h-8 w-8 text-white" }) }), _jsx("div", { className: "absolute top-2 right-2", children: _jsxs(Badge, { variant: "secondary", className: "bg-black bg-opacity-50 text-white border-0", children: ["Lv.", zone.level] }) }), _jsx("div", { className: "absolute bottom-2 left-2", children: _jsxs(motion.div, { animate: {
                                                    y: zone.trend === "up" ? [-2, 0, -2] :
                                                        zone.trend === "down" ? [0, 2, 0] : 0
                                                }, transition: { duration: 1.5, repeat: Infinity }, children: [zone.trend === "up" && _jsx(TrendingUp, { className: "h-4 w-4 text-green-300" }), zone.trend === "down" && _jsx(TrendingUp, { className: "h-4 w-4 text-red-300 transform rotate-180" }), zone.trend === "stable" && _jsx(Activity, { className: "h-4 w-4 text-yellow-300" })] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-semibold text-sm", children: zone.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: zone.description }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Performance" }), _jsxs("span", { className: "font-bold text-green-400", children: [zone.performance, "%"] })] }), _jsx(Progress, { value: zone.performance, className: "h-2" })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Temperature" }), _jsxs("span", { className: `font-bold ${zone.temperature > 90 ? 'text-red-400' : 'text-yellow-400'}`, children: [zone.temperature, "\u00B0C"] })] }), _jsx(Progress, { value: zone.temperature, className: "h-2" })] })] })] }) }) }, zone.id))) }), _jsx(AnimatePresence, { children: showTrophies && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, transition: { duration: 0.3 }, children: _jsxs(Card, { className: "bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Trophy, { className: "h-5 w-5 text-yellow-500" }), "Health Trophy Case"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: trophyCase.map((trophy, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1 }, className: `relative overflow-hidden rounded-lg ${trophy.unlocked ? 'bg-gradient-to-br ' + getRarityColor(trophy.rarity) : 'bg-gray-700'} p-4 ${trophy.unlocked ? '' : 'opacity-50'}`, children: [trophy.unlocked && (_jsx(motion.div, { className: "absolute inset-0 bg-white", animate: {
                                                    opacity: [0, 0.2, 0]
                                                }, transition: {
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    delay: Math.random() * 2
                                                } })), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(trophy.icon, { className: `h-6 w-6 ${trophy.unlocked ? 'text-white' : 'text-gray-500'}` }), _jsxs("div", { children: [_jsx("h4", { className: `font-semibold text-sm ${trophy.unlocked ? 'text-white' : 'text-gray-400'}`, children: trophy.name }), _jsx(Badge, { variant: "outline", className: "text-xs", children: trophy.rarity })] })] }), _jsx("p", { className: `text-xs mb-3 ${trophy.unlocked ? 'text-white/90' : 'text-gray-500'}`, children: trophy.description }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: trophy.unlocked ? 'text-white/80' : 'text-gray-500', children: "Progress" }), _jsxs("span", { className: `font-bold ${trophy.unlocked ? 'text-white' : 'text-gray-400'}`, children: [trophy.progress, "%"] })] }), _jsx(Progress, { value: trophy.progress, className: "h-1" }), _jsx("p", { className: `text-xs ${trophy.unlocked ? 'text-white/70' : 'text-gray-500'}`, children: trophy.requirement })] }), trophy.unlocked && (_jsx(motion.div, { className: "absolute top-2 right-2", animate: {
                                                            scale: [1, 1.2, 1],
                                                            rotate: [0, 10, 0]
                                                        }, transition: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: Math.random() * 2
                                                        }, children: _jsx(Star, { className: "h-4 w-4 text-yellow-300" }) }))] })] }, trophy.id))) }) })] }) })) }), _jsx(AnimatePresence, { children: selectedZone && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, children: _jsxs(Card, { className: "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-5 w-5 text-blue-500" }), "Zone Analytics: ", performanceZones.find(z => z.id === selectedZone)?.name] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Performance Metrics" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Response Time:" }), _jsx("span", { className: "text-sm font-bold text-green-400", children: "45ms" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Throughput:" }), _jsx("span", { className: "text-sm font-bold text-blue-400", children: "2.4K req/s" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Error Rate:" }), _jsx("span", { className: "text-sm font-bold text-green-400", children: "0.01%" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Health Indicators" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4 text-red-400" }), _jsx("span", { className: "text-sm", children: "CPU Usage: 12%" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "h-4 w-4 text-blue-400" }), _jsx("span", { className: "text-sm", children: "Memory: 34%" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "h-4 w-4 text-yellow-400" }), _jsx("span", { className: "text-sm", children: "Network: 5.2 MB/s" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Optimization Tips" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx(ThumbsUp, { className: "h-4 w-4 text-green-400 mt-0.5" }), _jsx("span", { className: "text-sm", children: "Performance is excellent" })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-purple-400 mt-0.5" }), _jsx("span", { className: "text-sm", children: "Consider caching optimization" })] }), _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(Target, { className: "h-4 w-4 text-orange-400 mt-0.5" }), _jsx("span", { className: "text-sm", children: "Monitor during peak hours" })] })] })] })] }) })] }) })) })] }));
}
