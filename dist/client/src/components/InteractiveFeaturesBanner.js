import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Sparkles, Zap, Palette, Activity, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
const InteractiveFeaturesBanner = () => {
    const features = [
        {
            icon: _jsx(Zap, { className: "w-5 h-5" }),
            title: 'Micro Interactions',
            description: 'Smooth animations & feedback',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: _jsx(Activity, { className: "w-5 h-5" }),
            title: 'Performance Badges',
            description: 'Energy-based tracking',
            color: 'from-green-500 to-blue-500'
        },
        {
            icon: _jsx(HelpCircle, { className: "w-5 h-5" }),
            title: 'Smart Onboarding',
            description: 'Contextual guided tours',
            color: 'from-blue-500 to-purple-500'
        },
        {
            icon: _jsx(Palette, { className: "w-5 h-5" }),
            title: 'Personal Themes',
            description: 'Unlockable color schemes',
            color: 'from-purple-500 to-pink-500'
        }
    ];
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.3 }, className: "relative mx-6 -mt-16 z-30", children: _jsx(Card, { className: "bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-pink-900/80 backdrop-blur-lg border-white/20 overflow-hidden", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { animate: {
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 10, -10, 0]
                                        }, transition: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }, className: "bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-full", children: _jsx(Sparkles, { className: "w-6 h-6 text-white" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: "Enhanced Interactive Experience" }), _jsx("p", { className: "text-gray-300 text-sm", children: "Next-generation UI with animated micro interactions" })] })] }), _jsx(Badge, { className: "bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1", children: "NEW" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: features.map((feature, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.1 * index }, className: "text-center", children: [_jsx("div", { className: `bg-gradient-to-r ${feature.color} p-3 rounded-full mx-auto mb-2 w-fit`, children: feature.icon }), _jsx("h4", { className: "text-white font-semibold text-sm", children: feature.title }), _jsx("p", { className: "text-gray-300 text-xs", children: feature.description })] }, index))) }), _jsxs("div", { className: "flex items-center justify-center gap-4", children: [_jsx(Link, { href: "/enhanced-interactive", children: _jsx(Button, { className: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2", children: "Experience Interactive Demo" }) }), _jsx(Link, { href: "/system-audit", children: _jsx(Button, { variant: "outline", className: "border-white/30 text-white hover:bg-white/10", children: "System Audit" }) })] }), _jsx("div", { className: "absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden", children: Array.from({ length: 6 }).map((_, i) => (_jsx(motion.div, { className: "absolute w-2 h-2 bg-white/20 rounded-full", style: {
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }, animate: {
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0]
                            }, transition: {
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeInOut"
                            } }, i))) })] }) }) }));
};
export default InteractiveFeaturesBanner;
