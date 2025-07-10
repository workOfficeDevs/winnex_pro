import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { usePersonalizedDashboard } from '@/hooks/usePersonalizedDashboard';
import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
export function PersonalizedWelcome() {
    const { currentMessage, dismissMessage } = usePersonalizedDashboard();
    if (!currentMessage)
        return null;
    const getMessageColors = (type) => {
        switch (type) {
            case 'welcome':
                return {
                    gradient: 'from-blue-500 via-purple-500 to-pink-500',
                    border: 'border-blue-400',
                    accent: 'text-blue-400'
                };
            case 'achievement':
                return {
                    gradient: 'from-yellow-500 via-orange-500 to-red-500',
                    border: 'border-yellow-400',
                    accent: 'text-yellow-400'
                };
            case 'streak':
                return {
                    gradient: 'from-green-500 via-emerald-500 to-teal-500',
                    border: 'border-green-400',
                    accent: 'text-green-400'
                };
            case 'balance':
                return {
                    gradient: 'from-purple-500 via-violet-500 to-indigo-500',
                    border: 'border-purple-400',
                    accent: 'text-purple-400'
                };
            case 'tip':
                return {
                    gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
                    border: 'border-cyan-400',
                    accent: 'text-cyan-400'
                };
            default:
                return {
                    gradient: 'from-gray-500 via-gray-600 to-gray-700',
                    border: 'border-gray-400',
                    accent: 'text-gray-400'
                };
        }
    };
    const colors = getMessageColors(currentMessage.type);
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0, y: -100, scale: 0.8 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -100, scale: 0.8 }, transition: {
                type: "spring",
                duration: 0.8,
                bounce: 0.4
            }, className: "fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] max-w-md w-full mx-4", children: _jsx(motion.div, { animate: {
                    boxShadow: [
                        `0 0 20px rgba(59, 130, 246, 0.3)`,
                        `0 0 40px rgba(59, 130, 246, 0.5)`,
                        `0 0 20px rgba(59, 130, 246, 0.3)`
                    ]
                }, transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }, className: `bg-gradient-to-r ${colors.gradient} p-1 rounded-2xl shadow-2xl`, children: _jsxs("div", { className: "bg-gray-900 rounded-xl p-6 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute top-4 left-4 text-6xl", children: "\uD83C\uDF1F" }), _jsx("div", { className: "absolute bottom-4 right-4 text-4xl", children: "\u2728" }), _jsx("div", { className: "absolute top-8 right-8 text-3xl", children: "\uD83D\uDCAB" })] }), _jsx(motion.button, { whileHover: { scale: 1.1, rotate: 90 }, whileTap: { scale: 0.9 }, onClick: dismissMessage, className: "absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "relative z-10", children: [_jsx(motion.div, { animate: {
                                        rotate: [0, -10, 10, -5, 0],
                                        scale: [1, 1.1, 1, 1.05, 1]
                                    }, transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }, className: "text-center mb-4", children: _jsx("span", { className: "text-5xl", children: currentMessage.emoji }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "text-center", children: [_jsx("h3", { className: "text-white font-bold text-xl mb-3 leading-tight", children: currentMessage.title }), _jsx("p", { className: "text-gray-300 text-base mb-4 leading-relaxed", children: currentMessage.message }), _jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.5, type: "spring", bounce: 0.5 }, className: `inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${colors.border} border ${colors.accent}`, children: currentMessage.priority === 'high' ? '🔥 Hot Tip' :
                                                currentMessage.priority === 'medium' ? '💡 Helpful' : '📝 Info' })] }), currentMessage.action && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 }, className: "text-center", children: _jsx(Button, { asChild: true, className: `bg-gradient-to-r ${colors.gradient} hover:opacity-90 text-white border-0 shadow-lg`, onClick: dismissMessage, children: _jsxs(Link, { href: currentMessage.action.href, className: "flex items-center gap-2", children: [_jsx("span", { children: currentMessage.action.text }), _jsx(ArrowRight, { className: "w-4 h-4" })] }) }) })), _jsx(motion.div, { animate: {
                                        y: [0, -20, 0],
                                        x: [0, 10, 0],
                                        opacity: [0.3, 0.8, 0.3]
                                    }, transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }, className: "absolute top-2 left-2 text-blue-400 text-lg", children: "\u2728" }), _jsx(motion.div, { animate: {
                                        y: [0, -15, 0],
                                        x: [0, -10, 0],
                                        rotate: [0, 180, 360],
                                        opacity: [0.4, 0.9, 0.4]
                                    }, transition: {
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }, className: "absolute bottom-2 right-8 text-purple-400 text-sm", children: "\u2B50" }), _jsx(motion.div, { animate: {
                                        scale: [1, 1.3, 1],
                                        opacity: [0.2, 0.7, 0.2],
                                        rotate: [0, -90, 0]
                                    }, transition: {
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 2
                                    }, className: "absolute top-8 right-2 text-yellow-400 text-xs", children: "\uD83D\uDCAB" })] }), _jsx(motion.div, { initial: { width: "100%" }, animate: { width: "0%" }, transition: { duration: currentMessage.duration / 1000, ease: "linear" }, className: `absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colors.gradient} rounded-b-xl` })] }) }) }) }));
}
