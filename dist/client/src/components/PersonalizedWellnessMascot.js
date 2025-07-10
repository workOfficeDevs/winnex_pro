import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, Smile, Moon, Activity, Brain, Target, Zap, Sparkles, TrendingUp, AlertCircle, Trophy } from "lucide-react";
const mascotPersonalities = [
    {
        name: "Zara",
        type: "energetic",
        primaryColor: "from-orange-400 to-red-500",
        secondaryColor: "from-yellow-400 to-orange-500",
        emoji: "⚡",
        traits: ["High-energy", "Motivational", "Goal-oriented", "Enthusiastic"]
    },
    {
        name: "Sage",
        type: "wise",
        primaryColor: "from-purple-400 to-blue-500",
        secondaryColor: "from-indigo-400 to-purple-500",
        emoji: "🧠",
        traits: ["Analytical", "Strategic", "Insightful", "Patient"]
    },
    {
        name: "Luna",
        type: "calm",
        primaryColor: "from-blue-400 to-cyan-500",
        secondaryColor: "from-teal-400 to-blue-500",
        emoji: "🌙",
        traits: ["Peaceful", "Balanced", "Mindful", "Supportive"]
    },
    {
        name: "Spark",
        type: "playful",
        primaryColor: "from-pink-400 to-purple-500",
        secondaryColor: "from-rose-400 to-pink-500",
        emoji: "✨",
        traits: ["Creative", "Fun-loving", "Innovative", "Optimistic"]
    },
    {
        name: "Focus",
        type: "focused",
        primaryColor: "from-green-400 to-emerald-500",
        secondaryColor: "from-lime-400 to-green-500",
        emoji: "🎯",
        traits: ["Determined", "Precise", "Organized", "Efficient"]
    }
];
export default function PersonalizedWellnessMascot() {
    const [currentMascot, setCurrentMascot] = useState(mascotPersonalities[0]);
    const [wellnessMetrics, setWellnessMetrics] = useState({
        systemHealth: 95,
        userEngagement: 87,
        performanceScore: 92,
        stressLevel: 25,
        energyLevel: 85,
        focusLevel: 78
    });
    const [currentAdvice, setCurrentAdvice] = useState([]);
    const [mascotMood, setMascotMood] = useState("happy");
    const [timeOfDay, setTimeOfDay] = useState("afternoon");
    const [interactionCount, setInteractionCount] = useState(0);
    // Determine time of day
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12)
            setTimeOfDay("morning");
        else if (hour >= 12 && hour < 17)
            setTimeOfDay("afternoon");
        else if (hour >= 17 && hour < 22)
            setTimeOfDay("evening");
        else
            setTimeOfDay("night");
    }, []);
    // Generate personalized advice based on metrics
    useEffect(() => {
        const advice = [];
        if (wellnessMetrics.systemHealth < 80) {
            advice.push({
                category: "health",
                message: "System health could use attention. Consider optimizing resources.",
                icon: Heart,
                priority: "high",
                actionable: true
            });
        }
        if (wellnessMetrics.stressLevel > 70) {
            advice.push({
                category: "balance",
                message: "High stress detected. Time for a system cooldown period.",
                icon: Moon,
                priority: "medium",
                actionable: true
            });
        }
        if (wellnessMetrics.performanceScore > 90) {
            advice.push({
                category: "performance",
                message: "Excellent performance! You're in the zone!",
                icon: Trophy,
                priority: "low",
                actionable: false
            });
        }
        if (wellnessMetrics.energyLevel < 50) {
            advice.push({
                category: "optimization",
                message: "Energy levels are low. Consider scaling up resources.",
                icon: Zap,
                priority: "medium",
                actionable: true
            });
        }
        setCurrentAdvice(advice);
    }, [wellnessMetrics]);
    // Update mascot mood based on overall wellness
    useEffect(() => {
        const avgWellness = (wellnessMetrics.systemHealth +
            wellnessMetrics.userEngagement +
            wellnessMetrics.performanceScore +
            (100 - wellnessMetrics.stressLevel) +
            wellnessMetrics.energyLevel +
            wellnessMetrics.focusLevel) / 6;
        if (avgWellness > 90)
            setMascotMood("excited");
        else if (avgWellness > 75)
            setMascotMood("happy");
        else if (avgWellness > 60)
            setMascotMood("focused");
        else if (avgWellness > 40)
            setMascotMood("concerned");
        else
            setMascotMood("sleeping");
    }, [wellnessMetrics]);
    const getTimeBasedGreeting = () => {
        const greetings = {
            morning: "Good morning! Ready to optimize today's performance?",
            afternoon: "Good afternoon! Systems are running smoothly.",
            evening: "Good evening! Time to review today's achievements.",
            night: "Good evening! Consider some system maintenance tonight."
        };
        return greetings[timeOfDay];
    };
    const getMascotAnimation = () => {
        switch (mascotMood) {
            case "excited":
                return {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                    transition: { duration: 2, repeat: Infinity }
                };
            case "happy":
                return {
                    y: [0, -10, 0],
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                };
            case "focused":
                return {
                    scale: [1, 1.05, 1],
                    transition: { duration: 4, repeat: Infinity }
                };
            case "concerned":
                return {
                    x: [-2, 2, -2, 2, 0],
                    transition: { duration: 1.5, repeat: Infinity }
                };
            default:
                return {
                    opacity: [1, 0.7, 1],
                    transition: { duration: 3, repeat: Infinity }
                };
        }
    };
    const interactWithMascot = () => {
        setInteractionCount(prev => prev + 1);
        // Cycle through different personalities based on interactions
        const nextIndex = (mascotPersonalities.findIndex(m => m.name === currentMascot.name) + 1) % mascotPersonalities.length;
        setCurrentMascot(mascotPersonalities[nextIndex]);
        // Simulate metrics improvement from interaction
        setWellnessMetrics(prev => ({
            ...prev,
            userEngagement: Math.min(100, prev.userEngagement + 5),
            energyLevel: Math.min(100, prev.energyLevel + 3),
            focusLevel: Math.min(100, prev.focusLevel + 2)
        }));
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high": return "text-red-400 border-red-400";
            case "medium": return "text-yellow-400 border-yellow-400";
            default: return "text-green-400 border-green-400";
        }
    };
    const getMetricIcon = (metric) => {
        switch (metric) {
            case "systemHealth": return Heart;
            case "userEngagement": return Smile;
            case "performanceScore": return TrendingUp;
            case "stressLevel": return AlertCircle;
            case "energyLevel": return Zap;
            case "focusLevel": return Target;
            default: return Activity;
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: `bg-gradient-to-br ${currentMascot.secondaryColor} bg-opacity-20 border-opacity-30`, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Brain, { className: "h-5 w-5 text-purple-500" }), "Wellness Mascot: ", currentMascot.name] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-6", children: [_jsxs(motion.div, { className: `relative w-24 h-24 rounded-full bg-gradient-to-br ${currentMascot.primaryColor} flex items-center justify-center cursor-pointer`, animate: getMascotAnimation(), onClick: interactWithMascot, whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: "text-4xl", children: currentMascot.emoji }), _jsx("div", { className: "absolute -top-2 -right-2", children: _jsx(motion.div, { className: "w-6 h-6 rounded-full bg-white flex items-center justify-center", animate: {
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.8, 1, 0.8]
                                                    }, transition: { duration: 2, repeat: Infinity }, children: _jsx("span", { className: "text-xs", children: mascotMood === "excited" ? "🎉" :
                                                            mascotMood === "happy" ? "😊" :
                                                                mascotMood === "focused" ? "🎯" :
                                                                    mascotMood === "concerned" ? "😟" : "😴" }) }) }), _jsx("div", { className: "absolute -bottom-2 -right-2", children: _jsx(Badge, { variant: "secondary", className: "text-xs", children: interactionCount }) })] }), _jsxs("div", { className: "flex-1 space-y-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold", children: currentMascot.name }), _jsxs("p", { className: "text-sm text-muted-foreground capitalize", children: [currentMascot.type, " Personality"] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm", children: getTimeBasedGreeting() }), _jsx("div", { className: "flex flex-wrap gap-1", children: currentMascot.traits.map((trait, index) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: trait }, index))) })] })] })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: Object.entries(wellnessMetrics).map(([key, value]) => {
                                    const Icon = getMetricIcon(key);
                                    const isStress = key === "stressLevel";
                                    const displayValue = isStress ? 100 - value : value;
                                    const color = displayValue > 80 ? "text-green-400" :
                                        displayValue > 60 ? "text-yellow-400" : "text-red-400";
                                    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: `h-4 w-4 ${color}` }), _jsx("span", { className: "text-sm capitalize", children: key.replace(/([A-Z])/g, ' $1').trim() })] }), _jsx(Progress, { value: displayValue, className: "h-2" }), _jsxs("span", { className: `text-xs font-bold ${color}`, children: [displayValue, "%"] })] }, key));
                                }) }), currentAdvice.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsxs("h4", { className: "font-semibold flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-purple-400" }), "Personalized Wellness Advice"] }), _jsx("div", { className: "space-y-2", children: currentAdvice.map((advice, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: `flex items-start gap-3 p-3 rounded-lg border ${getPriorityColor(advice.priority)} bg-opacity-10`, children: [_jsx(advice.icon, { className: `h-4 w-4 mt-0.5 ${getPriorityColor(advice.priority).split(' ')[0]}` }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm", children: advice.message }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: advice.category }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [advice.priority, " priority"] }), advice.actionable && (_jsx(Badge, { variant: "outline", className: "text-xs", children: "Actionable" }))] })] })] }, index))) })] })), _jsxs("div", { className: "flex gap-2 flex-wrap", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: interactWithMascot, className: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0", children: [_jsx(Heart, { className: "h-4 w-4 mr-2" }), "Interact"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setWellnessMetrics(prev => ({
                                            ...prev,
                                            energyLevel: Math.min(100, prev.energyLevel + 10)
                                        })), className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0", children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Boost Energy"] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: () => setWellnessMetrics(prev => ({
                                            ...prev,
                                            stressLevel: Math.max(0, prev.stressLevel - 15)
                                        })), className: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0", children: [_jsx(Moon, { className: "h-4 w-4 mr-2" }), "Reduce Stress"] })] })] })] }), _jsxs(Card, { className: "bg-gradient-to-br from-gray-900/50 to-black/50", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm", children: "Choose Your Wellness Companion" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-5 gap-3", children: mascotPersonalities.map((personality) => (_jsxs(motion.div, { className: `relative cursor-pointer p-3 rounded-lg border-2 transition-all ${currentMascot.name === personality.name
                                    ? "border-purple-400 bg-purple-900/20"
                                    : "border-gray-600 hover:border-gray-500"}`, onClick: () => setCurrentMascot(personality), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx("div", { className: `w-12 h-12 rounded-full bg-gradient-to-br ${personality.primaryColor} flex items-center justify-center mx-auto mb-2`, children: _jsx("span", { className: "text-xl", children: personality.emoji }) }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-xs font-medium", children: personality.name }), _jsx("p", { className: "text-xs text-muted-foreground capitalize", children: personality.type })] })] }, personality.name))) }) })] })] }));
}
