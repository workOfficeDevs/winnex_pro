import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from 'framer-motion';
import { useTooltips } from '@/hooks/useTooltips';
export function PlayfulTooltip({ children, tooltipId, className = '' }) {
    const { activeTooltip, tooltipPosition, getTooltip, getTooltipProps } = useTooltips();
    const tooltip = getTooltip(tooltipId);
    const isActive = activeTooltip === tooltipId;
    if (!tooltip)
        return _jsx(_Fragment, { children: children });
    return (_jsxs("div", { className: `relative ${className}`, ...getTooltipProps(tooltipId), children: [children, _jsx(AnimatePresence, { children: isActive && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.8, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: 10 }, transition: {
                        type: "spring",
                        duration: 0.3,
                        bounce: 0.4
                    }, className: `absolute z-50 ${getTooltipPositionClasses(tooltip.position)}`, style: {
                        left: tooltip.position === 'right' ? '100%' : tooltip.position === 'left' ? 'auto' : '50%',
                        right: tooltip.position === 'left' ? '100%' : 'auto',
                        top: tooltip.position === 'bottom' ? '100%' : tooltip.position === 'top' ? 'auto' : '50%',
                        bottom: tooltip.position === 'top' ? '100%' : 'auto',
                        transform: getTooltipTransform(tooltip.position)
                    }, children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: `absolute ${getArrowClasses(tooltip.position)}` }), _jsx(motion.div, { initial: { rotate: -2 }, animate: { rotate: 0 }, className: "bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 p-[2px] rounded-xl shadow-xl", children: _jsxs("div", { className: "bg-gray-900 rounded-xl p-4 max-w-xs backdrop-blur-sm border border-gray-700", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(motion.div, { animate: {
                                                        rotate: [0, -10, 10, -5, 0],
                                                        scale: [1, 1.1, 1]
                                                    }, transition: {
                                                        duration: 1,
                                                        repeat: Infinity,
                                                        repeatDelay: 3
                                                    }, className: "text-2xl flex-shrink-0", children: tooltip.emoji }), _jsxs("div", { className: "flex-1", children: [_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 }, className: "text-white font-semibold text-sm mb-1", children: tooltip.text }), tooltip.playful && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, className: "text-gray-300 text-xs", children: "Click to explore! \u2728" }))] })] }), _jsx(motion.div, { animate: {
                                                rotate: 360
                                            }, transition: {
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }, className: "absolute -top-1 -right-1 text-yellow-400 text-xs", children: "\u2728" }), _jsx(motion.div, { animate: {
                                                rotate: -360,
                                                scale: [1, 1.2, 1]
                                            }, transition: {
                                                duration: 6,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: 2
                                            }, className: "absolute -bottom-1 -left-1 text-pink-400 text-xs", children: "\u2B50" })] }) })] }) })) })] }));
}
function getTooltipPositionClasses(position) {
    switch (position) {
        case 'top': return 'mb-2';
        case 'bottom': return 'mt-2';
        case 'left': return 'mr-2';
        case 'right': return 'ml-2';
        default: return 'mt-2';
    }
}
function getTooltipTransform(position) {
    switch (position) {
        case 'top':
        case 'bottom':
            return 'translateX(-50%)';
        case 'left':
        case 'right':
            return 'translateY(-50%)';
        default:
            return 'translateX(-50%)';
    }
}
function getArrowClasses(position) {
    const baseClasses = 'w-3 h-3 bg-gray-900 border-l border-t border-gray-700 transform rotate-45';
    switch (position) {
        case 'top':
            return `${baseClasses} -bottom-1.5 left-1/2 -translate-x-1/2 rotate-225`;
        case 'bottom':
            return `${baseClasses} -top-1.5 left-1/2 -translate-x-1/2 rotate-45`;
        case 'left':
            return `${baseClasses} -right-1.5 top-1/2 -translate-y-1/2 rotate-135`;
        case 'right':
            return `${baseClasses} -left-1.5 top-1/2 -translate-y-1/2 rotate-315`;
        default:
            return `${baseClasses} -top-1.5 left-1/2 -translate-x-1/2`;
    }
}
