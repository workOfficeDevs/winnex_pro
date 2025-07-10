import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useContextualHelp } from '@/hooks/useContextualHelp';
import { X, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
export function ContextualHelpOverlay() {
    const { helpSystem, hideTip } = useContextualHelp();
    if (!helpSystem.showHelp || !helpSystem.activeTip)
        return null;
    const tip = helpSystem.activeTip;
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm", onClick: hideTip, children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.8, y: 50 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: 50 }, transition: { type: "spring", duration: 0.6, bounce: 0.3 }, className: "absolute", style: {
                    left: `${tip.position.x}%`,
                    top: `${tip.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                }, onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative max-w-md", children: [_jsx(motion.div, { animate: {
                                background: [
                                    'linear-gradient(45deg, #8b5cf6, #06b6d4)',
                                    'linear-gradient(45deg, #06b6d4, #10b981)',
                                    'linear-gradient(45deg, #10b981, #8b5cf6)'
                                ]
                            }, transition: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }, className: "absolute inset-0 rounded-2xl p-1" }), _jsxs("div", { className: "relative bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl", children: [_jsx(motion.button, { whileHover: { scale: 1.1, rotate: 90 }, whileTap: { scale: 0.9 }, onClick: hideTip, className: "absolute top-4 right-4 text-gray-400 hover:text-white transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }), _jsx(motion.div, { animate: {
                                        rotate: [0, -10, 10, -5, 0],
                                        scale: [1, 1.1, 1]
                                    }, transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }, className: "flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4", children: _jsx(motion.div, { animate: { scale: [1, 1.2, 1] }, transition: {
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }, className: "text-3xl", children: tip.emoji }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "text-center", children: [_jsx("h3", { className: "text-white font-bold text-xl mb-3", children: tip.title }), _jsx("p", { className: "text-gray-300 text-base mb-6 leading-relaxed", children: tip.content }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.4, type: "spring", bounce: 0.5 }, className: "flex items-center justify-center gap-2 mb-4", children: [_jsx(Lightbulb, { className: `w-4 h-4 ${tip.priority === 'high' ? 'text-yellow-400' :
                                                        tip.priority === 'medium' ? 'text-blue-400' : 'text-gray-400'}` }), _jsx("span", { className: `text-sm font-medium ${tip.priority === 'high' ? 'text-yellow-400' :
                                                        tip.priority === 'medium' ? 'text-blue-400' : 'text-gray-400'}`, children: tip.priority === 'high' ? 'Important Tip' :
                                                        tip.priority === 'medium' ? 'Helpful Tip' : 'Quick Tip' })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, className: "flex gap-3 justify-center", children: [_jsx(Button, { onClick: hideTip, variant: "outline", className: "border-gray-600 text-gray-300 hover:bg-gray-800", children: "Got it!" }), tip.trigger === 'onload' && (_jsx(Button, { asChild: true, className: "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700", children: _jsxs(Link, { href: "/help", className: "flex items-center gap-2", children: [_jsx("span", { children: "Learn More" }), _jsx(ArrowRight, { className: "w-4 h-4" })] }) }))] }), _jsx(motion.div, { animate: {
                                        y: [0, -10, 0],
                                        opacity: [0.5, 1, 0.5]
                                    }, transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }, className: "absolute -top-2 -left-2 text-blue-400 text-xl", children: "\u2728" }), _jsx(motion.div, { animate: {
                                        y: [0, -15, 0],
                                        opacity: [0.5, 1, 0.5],
                                        rotate: [0, 180, 360]
                                    }, transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }, className: "absolute -bottom-2 -right-2 text-purple-400 text-lg", children: "\u2B50" }), _jsx(motion.div, { animate: {
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.8, 0.3]
                                    }, transition: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5
                                    }, className: "absolute top-1/2 -left-4 text-green-400 text-sm", children: "\uD83D\uDCAB" })] })] }) }) }) }));
}
