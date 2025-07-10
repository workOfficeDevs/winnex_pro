import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Heart, Camera, Sparkles, Target, Trophy, Activity, Eye } from "lucide-react";
import InteractivePerformanceHeatMap from "@/components/InteractivePerformanceHeatMap";
import ImagePoweredCommunication from "@/components/ImagePoweredCommunication";
import PersonalizedWellnessMascot from "@/components/PersonalizedWellnessMascot";
import GamingFightSystem from "@/components/GamingFightSystem";
export default function InteractiveFeatures() {
    const [activeFeature, setActiveFeature] = useState("heatmap");
    const [animationTrigger, setAnimationTrigger] = useState(0);
    const features = [
        {
            id: "heatmap",
            name: "Performance Heat Map",
            description: "Interactive performance visualization with gaming animations",
            icon: Activity,
            color: "from-green-400 to-emerald-600",
            component: InteractivePerformanceHeatMap
        },
        {
            id: "fight",
            name: "Gaming Fight System",
            description: "Playful battle system for performance components",
            icon: Gamepad2,
            color: "from-red-400 to-orange-600",
            component: GamingFightSystem
        },
        {
            id: "wellness",
            name: "Wellness Mascot",
            description: "Personalized wellness companion with AI insights",
            icon: Heart,
            color: "from-purple-400 to-pink-600",
            component: PersonalizedWellnessMascot
        },
        {
            id: "communication",
            name: "Image Communication",
            description: "AI-powered image analysis and communication system",
            icon: Camera,
            color: "from-blue-400 to-cyan-600",
            component: ImagePoweredCommunication
        }
    ];
    const getFeatureStats = () => ({
        heatmap: { performance: 95, engagement: 88, efficiency: 92 },
        fight: { entertainment: 94, interaction: 90, retention: 87 },
        wellness: { health: 96, satisfaction: 91, balance: 89 },
        communication: { accuracy: 93, usability: 89, innovation: 95 }
    });
    const stats = getFeatureStats();
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-8", children: [_jsxs(motion.div, { className: "text-center space-y-4", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent", children: "Interactive Gaming Features" }), _jsx("p", { className: "text-muted-foreground text-lg max-w-3xl mx-auto", children: "Experience the next generation of platform interaction with gaming elements, AI-powered communication, wellness tracking, and performance visualization" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-8", children: features.map((feature, index) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1, duration: 0.4 }, className: `relative overflow-hidden rounded-lg cursor-pointer group ${activeFeature === feature.id ? 'ring-2 ring-purple-400' : ''}`, onClick: () => setActiveFeature(feature.id), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Card, { className: `bg-gradient-to-br ${feature.color} text-white border-0 h-24`, children: _jsxs(CardContent, { className: "p-4 flex items-center justify-between h-full", children: [_jsxs("div", { className: "text-left flex-1", children: [_jsx(feature.icon, { className: "h-6 w-6 mb-2" }), _jsx("div", { className: "text-xs font-medium", children: feature.name })] }), activeFeature === feature.id && (_jsx(motion.div, { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, className: "text-right text-xs space-y-1", children: Object.entries(stats[feature.id]).map(([key, value]) => (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("span", { className: "capitalize", children: key }), _jsxs(Badge, { variant: "secondary", className: "text-xs px-1", children: [value, "%"] })] }, key))) }))] }) }) }, feature.id))) })] }), _jsxs(Tabs, { value: activeFeature, onValueChange: setActiveFeature, className: "w-full", children: [_jsx(TabsList, { className: "grid w-full grid-cols-4 bg-gray-900/50", children: features.map((feature) => (_jsxs(TabsTrigger, { value: feature.id, className: "flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600", children: [_jsx(feature.icon, { className: "h-4 w-4" }), _jsx("span", { className: "hidden md:inline", children: feature.name })] }, feature.id))) }), _jsx("div", { className: "mt-8", children: _jsx(AnimatePresence, { mode: "wait", children: features.map((feature) => (_jsx(TabsContent, { value: feature.id, className: "mt-0", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.5 }, className: "space-y-6", children: [_jsxs(Card, { className: `bg-gradient-to-r ${feature.color} text-white border-0`, children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-3", children: [_jsx(feature.icon, { className: "h-6 w-6" }), _jsxs("div", { children: [_jsx("div", { className: "text-xl", children: feature.name }), _jsx("div", { className: "text-sm font-normal opacity-90", children: feature.description })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-3 gap-4", children: Object.entries(stats[feature.id]).map(([key, value], index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1 }, className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold", children: [value, "%"] }), _jsx("div", { className: "text-sm opacity-80 capitalize", children: key })] }, key))) }) })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, children: _jsx(feature.component, {}) })] }, feature.id) }, feature.id))) }) })] }), _jsxs(Card, { className: "bg-gradient-to-br from-gray-900/50 to-black/50 border-purple-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-purple-500" }), "Interactive Features Analytics"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(motion.div, { className: "text-3xl font-bold text-green-400", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity }, children: "94%" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Overall Performance" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(motion.div, { className: "text-3xl font-bold text-blue-400", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, delay: 0.5 }, children: "91%" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "User Engagement" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(motion.div, { className: "text-3xl font-bold text-purple-400", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, delay: 1 }, children: "96%" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Innovation Score" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(motion.div, { className: "text-3xl font-bold text-yellow-400", animate: { scale: [1, 1.1, 1] }, transition: { duration: 2, repeat: Infinity, delay: 1.5 }, children: "89%" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "User Satisfaction" })] })] }), _jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Key Benefits" }), _jsxs("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [_jsx("li", { children: "\u2022 Enhanced user engagement through gamification" }), _jsx("li", { children: "\u2022 Real-time performance monitoring with visual feedback" }), _jsx("li", { children: "\u2022 AI-powered insights and personalized recommendations" }), _jsx("li", { children: "\u2022 Interactive communication through image analysis" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Advanced Features" }), _jsxs("ul", { className: "text-sm space-y-1 text-muted-foreground", children: [_jsx("li", { children: "\u2022 One-click performance snapshots for reporting" }), _jsx("li", { children: "\u2022 Wellness tracking with personalized mascot companions" }), _jsx("li", { children: "\u2022 Gaming fight system for competitive performance optimization" }), _jsx("li", { children: "\u2022 Heat map visualization with interactive zones" })] })] })] })] })] }), _jsxs("div", { className: "flex flex-wrap gap-4 justify-center", children: [_jsxs(Button, { onClick: () => setAnimationTrigger(prev => prev + 1), className: "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700", children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), "Trigger Animations"] }), _jsxs(Button, { variant: "outline", onClick: () => {
                            // Cycle through features
                            const currentIndex = features.findIndex(f => f.id === activeFeature);
                            const nextIndex = (currentIndex + 1) % features.length;
                            setActiveFeature(features[nextIndex].id);
                        }, children: [_jsx(Target, { className: "h-4 w-4 mr-2" }), "Next Feature"] }), _jsxs(Button, { variant: "outline", className: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0", children: [_jsx(Trophy, { className: "h-4 w-4 mr-2" }), "View Achievements"] }), _jsxs(Button, { variant: "outline", className: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0", children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), "Generate Report"] })] })] }));
}
