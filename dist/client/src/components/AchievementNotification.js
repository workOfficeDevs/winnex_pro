import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '@/hooks/useAchievements';
import { Trophy, Star, Zap, Crown } from 'lucide-react';
export function AchievementNotification() {
    const { showNotification, newAchievement, setShowNotification, getRarityColor, getRarityGlow } = useAchievements();
    if (!newAchievement)
        return null;
    const getRarityIcon = (rarity) => {
        switch (rarity) {
            case 'legendary': return Crown;
            case 'epic': return Zap;
            case 'rare': return Star;
            default: return Trophy;
        }
    };
    const RarityIcon = getRarityIcon(newAchievement.rarity);
    return (_jsx(AnimatePresence, { children: showNotification && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.5, y: -100, rotate: -10 }, animate: { opacity: 1, scale: 1, y: 0, rotate: 0 }, exit: { opacity: 0, scale: 0.5, y: -100, rotate: 10 }, transition: {
                type: "spring",
                duration: 0.8,
                bounce: 0.5
            }, className: "fixed top-4 right-4 z-[9999] max-w-sm", onClick: () => setShowNotification(false), children: _jsx(motion.div, { animate: {
                    boxShadow: [
                        `0 0 20px rgba(255, 215, 0, 0.3)`,
                        `0 0 40px rgba(255, 215, 0, 0.6)`,
                        `0 0 20px rgba(255, 215, 0, 0.3)`
                    ]
                }, transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }, className: `bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-1 rounded-2xl shadow-2xl ${getRarityGlow(newAchievement.rarity)}`, children: _jsxs("div", { className: "bg-gray-900 rounded-xl p-6 relative overflow-hidden", children: [_jsxs("div", { className: "absolute inset-0 opacity-10", children: [_jsx("div", { className: "absolute top-2 left-2 text-yellow-400 text-4xl", children: "\u2728" }), _jsx("div", { className: "absolute top-4 right-4 text-orange-400 text-2xl", children: "\uD83C\uDF1F" }), _jsx("div", { className: "absolute bottom-2 left-4 text-yellow-300 text-3xl", children: "\uD83D\uDCAB" }), _jsx("div", { className: "absolute bottom-4 right-2 text-orange-300 text-xl", children: "\u2B50" })] }), _jsxs("div", { className: "relative z-10", children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.3, type: "spring", bounce: 0.6 }, className: "flex items-center justify-center mb-4", children: _jsxs("div", { className: `relative ${getRarityColor(newAchievement.rarity)}`, children: [_jsx(motion.div, { animate: { rotate: 360 }, transition: { duration: 3, repeat: Infinity, ease: "linear" }, className: "absolute inset-0 rounded-full border-2 border-dashed" }), _jsx(RarityIcon, { className: "w-12 h-12 relative z-10" })] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "text-center", children: [_jsx("h3", { className: "text-white font-bold text-lg mb-2", children: "\uD83C\uDFC6 Achievement Unlocked!" }), _jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.7 }, className: `inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getRarityColor(newAchievement.rarity)} border-2`, children: newAchievement.rarity.toUpperCase() }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.9 }, children: [_jsxs("h4", { className: "text-white font-semibold text-lg mb-2 flex items-center justify-center gap-2", children: [_jsx("span", { className: "text-2xl", children: newAchievement.emoji }), newAchievement.title] }), _jsx("p", { className: "text-gray-300 text-sm mb-4", children: newAchievement.description }), _jsxs(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 1.1, type: "spring", bounce: 0.5 }, className: "flex items-center justify-center gap-2 text-yellow-400 font-bold", children: [_jsx(Star, { className: "w-5 h-5" }), _jsxs("span", { children: ["+", newAchievement.points, " Points"] }), _jsx(Star, { className: "w-5 h-5" })] })] })] }), _jsx(motion.div, { animate: {
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }, transition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }, className: "absolute top-2 right-2 text-yellow-400 text-xl", children: "\u2728" }), _jsx(motion.div, { animate: {
                                        y: [0, -15, 0],
                                        rotate: [0, -5, 5, 0]
                                    }, transition: {
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }, className: "absolute bottom-2 left-2 text-orange-400 text-lg", children: "\uD83C\uDF89" })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 2 }, className: "absolute bottom-2 right-2 text-gray-500 text-xs", children: "Click to dismiss" })] }) }) })) }));
}
