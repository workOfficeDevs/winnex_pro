import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy, Target, Crown, Flame } from 'lucide-react';
// Animated Success Bounce
export const SuccessBounce = ({ children, trigger }) => {
    return (_jsx(motion.div, { animate: {
            scale: trigger ? [1, 1.15, 1] : 1,
            rotate: trigger ? [0, 5, -5, 0] : 0
        }, transition: {
            duration: 0.6,
            ease: "easeInOut"
        }, children: children }));
};
// Shake Animation for Errors
export const ErrorShake = ({ children, trigger }) => {
    return (_jsx(motion.div, { animate: {
            x: trigger ? [-10, 10, -10, 10, 0] : 0
        }, transition: {
            duration: 0.5,
            ease: "easeInOut"
        }, children: children }));
};
// Loading Pulse Animation
export const LoadingPulse = ({ children, isLoading }) => {
    return (_jsx(motion.div, { animate: {
            opacity: isLoading ? [0.5, 1, 0.5] : 1
        }, transition: {
            duration: 1.5,
            repeat: isLoading ? Infinity : 0,
            ease: "easeInOut"
        }, children: children }));
};
// Hover Scale Effect
export const HoverScale = ({ children, scale = 1.05 }) => {
    return (_jsx(motion.div, { whileHover: { scale }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: children }));
};
// Sparkle Effect
export const SparkleEffect = ({ active }) => {
    const [sparkles, setSparkles] = useState([]);
    useEffect(() => {
        if (active) {
            const newSparkles = Array.from({ length: 6 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100
            }));
            setSparkles(newSparkles);
            const timer = setTimeout(() => setSparkles([]), 2000);
            return () => clearTimeout(timer);
        }
    }, [active]);
    return (_jsx("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: _jsx(AnimatePresence, { children: sparkles.map((sparkle) => (_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0 }, transition: { duration: 0.6 }, className: "absolute", style: { left: `${sparkle.x}%`, top: `${sparkle.y}%` }, children: _jsx(Sparkles, { className: "w-4 h-4 text-yellow-400" }) }, sparkle.id))) }) }));
};
// Floating Badge Animation
export const FloatingBadge = ({ icon, label, color, show }) => {
    return (_jsx(AnimatePresence, { children: show && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0, y: 50 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0, y: -50 }, transition: { type: "spring", bounce: 0.6 }, className: `fixed top-20 right-6 ${color} text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2`, children: [icon, _jsx("span", { className: "font-semibold", children: label })] })) }));
};
// Energy-Based Performance Badge Component
export const EnergyPerformanceBadge = ({ energy, performance, animated = true }) => {
    const getBadgeConfig = () => {
        switch (performance) {
            case 'excellent':
                return {
                    icon: _jsx(Crown, { className: "w-5 h-5" }),
                    color: 'from-yellow-400 to-orange-500',
                    bgColor: 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20',
                    borderColor: 'border-yellow-400',
                    label: 'Elite Performer',
                    energyColor: 'text-yellow-300'
                };
            case 'good':
                return {
                    icon: _jsx(Trophy, { className: "w-5 h-5" }),
                    color: 'from-green-400 to-blue-500',
                    bgColor: 'bg-gradient-to-r from-green-400/20 to-blue-500/20',
                    borderColor: 'border-green-400',
                    label: 'Strong Performer',
                    energyColor: 'text-green-300'
                };
            case 'average':
                return {
                    icon: _jsx(Target, { className: "w-5 h-5" }),
                    color: 'from-blue-400 to-purple-500',
                    bgColor: 'bg-gradient-to-r from-blue-400/20 to-purple-500/20',
                    borderColor: 'border-blue-400',
                    label: 'Steady Performer',
                    energyColor: 'text-blue-300'
                };
            default:
                return {
                    icon: _jsx(Star, { className: "w-5 h-5" }),
                    color: 'from-gray-400 to-gray-600',
                    bgColor: 'bg-gradient-to-r from-gray-400/20 to-gray-600/20',
                    borderColor: 'border-gray-400',
                    label: 'Building Momentum',
                    energyColor: 'text-gray-300'
                };
        }
    };
    const config = getBadgeConfig();
    const BaseComponent = animated ? motion.div : 'div';
    const animationProps = animated ? {
        animate: {
            scale: [1, 1.05, 1],
            boxShadow: [
                '0 0 0 rgba(59, 130, 246, 0)',
                '0 0 20px rgba(59, 130, 246, 0.5)',
                '0 0 0 rgba(59, 130, 246, 0)'
            ]
        },
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    } : {};
    return (_jsxs(BaseComponent, { ...animationProps, className: `${config.bgColor} ${config.borderColor} border-2 rounded-lg p-4 relative overflow-hidden`, children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gray-700", children: _jsx(motion.div, { className: `h-full bg-gradient-to-r ${config.color}`, initial: { width: 0 }, animate: { width: `${energy}%` }, transition: { duration: 1, ease: "easeOut" } }) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `bg-gradient-to-r ${config.color} p-2 rounded-full text-white`, children: config.icon }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-white", children: config.label }), _jsxs("p", { className: `text-sm ${config.energyColor}`, children: ["Energy: ", energy, "%"] })] })] }), energy > 80 && (_jsx(motion.div, { animate: {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }, transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }, children: _jsx(Flame, { className: "w-6 h-6 text-orange-400" }) }))] }), performance === 'excellent' && _jsx(SparkleEffect, { active: true })] }));
};
// Interactive Tooltip with Animation
export const AnimatedTooltip = ({ children, content, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const getPositionClasses = () => {
        switch (position) {
            case 'bottom':
                return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
            case 'left':
                return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
            case 'right':
                return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
            default:
                return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
        }
    };
    return (_jsxs("div", { className: "relative inline-block", onMouseEnter: () => setIsVisible(true), onMouseLeave: () => setIsVisible(false), children: [children, _jsx(AnimatePresence, { children: isVisible && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: 10 }, transition: { duration: 0.2 }, className: `absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg ${getPositionClasses()}`, children: [content, _jsx("div", { className: "absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2" })] })) })] }));
};
// Celebration Animation
export const CelebrationEffect = ({ trigger }) => {
    return (_jsx(AnimatePresence, { children: trigger && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 pointer-events-none z-50", children: Array.from({ length: 20 }).map((_, i) => (_jsx(motion.div, { initial: {
                    opacity: 1,
                    scale: 0,
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }, animate: {
                    opacity: 0,
                    scale: 1,
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
                    y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
                    rotate: Math.random() * 360
                }, transition: {
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                }, className: "absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" }, i))) })) }));
};
export default {
    SuccessBounce,
    ErrorShake,
    LoadingPulse,
    HoverScale,
    SparkleEffect,
    FloatingBadge,
    EnergyPerformanceBadge,
    AnimatedTooltip,
    CelebrationEffect
};
