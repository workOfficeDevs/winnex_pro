import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, TrendingUp, DollarSign, Users, Zap, Target, Trophy, Star, ArrowUp, ArrowDown, Radio, Eye, Clock, Globe, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const RealTimeActivityVisualizer = () => {
    const [events, setEvents] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [activityLevel, setActivityLevel] = useState('medium');
    const eventContainerRef = useRef(null);
    // Simulated real-time metrics
    const initialMetrics = [
        {
            label: 'Active Users',
            value: 1247,
            change: 12.5,
            trend: 'up',
            color: 'text-green-400',
            icon: _jsx(Users, { className: "w-5 h-5" }),
            format: 'number'
        },
        {
            label: 'Total Volume',
            value: 89540,
            change: -3.2,
            trend: 'down',
            color: 'text-red-400',
            icon: _jsx(DollarSign, { className: "w-5 h-5" }),
            format: 'currency'
        },
        {
            label: 'Win Rate',
            value: 68.7,
            change: 5.4,
            trend: 'up',
            color: 'text-green-400',
            icon: _jsx(Trophy, { className: "w-5 h-5" }),
            format: 'percentage'
        },
        {
            label: 'Live Bets',
            value: 423,
            change: 18.9,
            trend: 'up',
            color: 'text-blue-400',
            icon: _jsx(Activity, { className: "w-5 h-5" }),
            format: 'number'
        }
    ];
    // Simulate WebSocket connection
    useEffect(() => {
        setIsConnected(true);
        setMetrics(initialMetrics);
        const generateRandomEvent = () => {
            const eventTypes = [
                {
                    type: 'bet_placed',
                    titles: ['New Bet Placed', 'Quick Bet', 'Multi-Bet Created'],
                    severities: ['low', 'medium']
                },
                {
                    type: 'big_win',
                    titles: ['Big Win!', 'Jackpot Hit!', 'Major Payout'],
                    severities: ['high', 'critical']
                },
                {
                    type: 'user_joined',
                    titles: ['New User Joined', 'Welcome New Player', 'Community Growing'],
                    severities: ['low']
                },
                {
                    type: 'prediction_hit',
                    titles: ['AI Prediction Hit', 'Perfect Prediction', 'AI Success'],
                    severities: ['medium', 'high']
                },
                {
                    type: 'milestone',
                    titles: ['Milestone Reached', 'Level Up!', 'Achievement Unlocked'],
                    severities: ['medium', 'high']
                },
                {
                    type: 'market_move',
                    titles: ['Market Movement', 'Odds Changed', 'Hot Market'],
                    severities: ['medium']
                }
            ];
            const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            const title = eventType.titles[Math.floor(Math.random() * eventType.titles.length)];
            const severity = eventType.severities[Math.floor(Math.random() * eventType.severities.length)];
            const descriptions = {
                bet_placed: [
                    `$${(Math.random() * 500 + 50).toFixed(0)} on Arsenal vs Chelsea`,
                    `Multiple bets on today's games`,
                    `Live bet on Lakers +5.5`
                ],
                big_win: [
                    `Won $${(Math.random() * 5000 + 1000).toFixed(0)} on parlay bet!`,
                    `Massive payout of $${(Math.random() * 10000 + 2000).toFixed(0)}!`,
                    `Hit the jackpot with $${(Math.random() * 15000 + 5000).toFixed(0)}!`
                ],
                user_joined: [
                    'from New York, USA',
                    'from London, UK',
                    'from Toronto, Canada',
                    'from Sydney, Australia'
                ],
                prediction_hit: [
                    '94.2% accuracy maintained',
                    'Perfect game prediction',
                    'AI model outperforming expectations'
                ],
                milestone: [
                    'Reached 1000 total bets',
                    'Unlocked VIP status',
                    'Achieved 70% win rate'
                ],
                market_move: [
                    'Chiefs odds moving fast',
                    'Heavy action on Lakers',
                    'Live betting surge detected'
                ]
            };
            const locations = ['New York', 'London', 'Toronto', 'Sydney', 'Los Angeles', 'Miami', 'Dubai'];
            return {
                id: Math.random().toString(36).substr(2, 9),
                type: eventType.type,
                title,
                description: descriptions[eventType.type][Math.floor(Math.random() * descriptions[eventType.type].length)],
                amount: ['bet_placed', 'big_win'].includes(eventType.type) ? Math.random() * 1000 + 100 : undefined,
                currency: 'USD',
                user: eventType.type === 'user_joined' ? undefined : `User${Math.floor(Math.random() * 9999)}`,
                timestamp: new Date(),
                severity,
                location: Math.random() > 0.5 ? locations[Math.floor(Math.random() * locations.length)] : undefined
            };
        };
        // Generate initial events
        const initialEvents = Array.from({ length: 5 }, generateRandomEvent);
        setEvents(initialEvents);
        // Simulate real-time events
        const eventInterval = setInterval(() => {
            const newEvent = generateRandomEvent();
            setEvents(prev => [newEvent, ...prev.slice(0, 9)]); // Keep last 10 events
            // Update activity level based on event frequency
            setActivityLevel(Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low');
        }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
        // Update metrics periodically
        const metricsInterval = setInterval(() => {
            setMetrics(prev => prev.map(metric => ({
                ...metric,
                value: metric.value + (Math.random() - 0.5) * metric.value * 0.1,
                change: (Math.random() - 0.5) * 20,
                trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
            })));
        }, 5000);
        return () => {
            clearInterval(eventInterval);
            clearInterval(metricsInterval);
        };
    }, []);
    const getEventIcon = (type) => {
        const icons = {
            bet_placed: _jsx(Target, { className: "w-4 h-4" }),
            big_win: _jsx(Trophy, { className: "w-4 h-4" }),
            user_joined: _jsx(Users, { className: "w-4 h-4" }),
            prediction_hit: _jsx(Zap, { className: "w-4 h-4" }),
            milestone: _jsx(Star, { className: "w-4 h-4" }),
            market_move: _jsx(TrendingUp, { className: "w-4 h-4" })
        };
        return icons[type] || _jsx(Activity, { className: "w-4 h-4" });
    };
    const getEventColor = (severity) => {
        const colors = {
            low: 'border-l-blue-500 bg-blue-500/10',
            medium: 'border-l-yellow-500 bg-yellow-500/10',
            high: 'border-l-orange-500 bg-orange-500/10',
            critical: 'border-l-red-500 bg-red-500/10'
        };
        return colors[severity] || colors.low;
    };
    const getActivityLevelColor = () => {
        const colors = {
            low: 'text-blue-400',
            medium: 'text-yellow-400',
            high: 'text-red-400'
        };
        return colors[activityLevel];
    };
    const formatValue = (value, format) => {
        switch (format) {
            case 'currency':
                return `$${value.toLocaleString()}`;
            case 'percentage':
                return `${value.toFixed(1)}%`;
            default:
                return value.toLocaleString();
        }
    };
    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((new Date().getTime() - timestamp.getTime()) / 1000);
        if (seconds < 60)
            return `${seconds}s ago`;
        if (seconds < 3600)
            return `${Math.floor(seconds / 60)}m ago`;
        return `${Math.floor(seconds / 3600)}h ago`;
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Wifi, { className: `w-6 h-6 ${isConnected ? 'text-green-400' : 'text-red-400'}` }), isConnected && (_jsx(motion.div, { className: "absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full", animate: { scale: [1, 1.3, 1] }, transition: { duration: 2, repeat: Infinity } }))] }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-semibold", children: "Live Activity Feed" }), _jsxs("p", { className: "text-sm text-gray-400", children: [isConnected ? 'Connected' : 'Disconnected', " \u2022 Real-time updates"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Radio, { className: `w-5 h-5 ${getActivityLevelColor()}` }), _jsxs(Badge, { variant: "outline", className: `${getActivityLevelColor()} border-current`, children: [activityLevel.toUpperCase(), " Activity"] })] })] }) }) }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: metrics.map((metric, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-gray-900 border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: metric.color, children: metric.icon }), _jsxs(motion.div, { className: `flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-400' :
                                                metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`, animate: {
                                                x: metric.trend === 'up' ? [0, 2, 0] : metric.trend === 'down' ? [0, -2, 0] : 0
                                            }, transition: { duration: 1, repeat: Infinity }, children: [metric.trend === 'up' && _jsx(ArrowUp, { className: "w-3 h-3" }), metric.trend === 'down' && _jsx(ArrowDown, { className: "w-3 h-3" }), Math.abs(metric.change).toFixed(1), "%"] })] }), _jsxs("div", { children: [_jsx(motion.p, { className: "text-xl font-bold text-white", initial: { scale: 1.1 }, animate: { scale: 1 }, transition: { duration: 0.3 }, children: formatValue(metric.value, metric.format) }, metric.value), _jsx("p", { className: "text-sm text-gray-400", children: metric.label })] })] }) }) }, metric.label))) }), _jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-white", children: [_jsx(Activity, { className: "w-5 h-5 text-blue-400" }), "Live Activity Stream", _jsx(motion.div, { className: "w-2 h-2 bg-green-400 rounded-full", animate: { opacity: [1, 0.3, 1] }, transition: { duration: 1.5, repeat: Infinity } })] }) }), _jsx(CardContent, { className: "p-0", children: _jsx("div", { ref: eventContainerRef, className: "max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600", children: _jsx(AnimatePresence, { initial: false, children: events.map((event, index) => (_jsx(motion.div, { initial: { opacity: 0, x: -50, scale: 0.9 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 50, scale: 0.9 }, transition: { duration: 0.3, delay: index * 0.05 }, className: `border-l-4 ${getEventColor(event.severity)} p-4 border-b border-gray-800 last:border-b-0`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `${event.severity === 'critical' ? 'text-red-400' :
                                                            event.severity === 'high' ? 'text-orange-400' :
                                                                event.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'} mt-1`, children: getEventIcon(event.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-semibold text-white text-sm", children: event.title }), event.amount && (_jsxs(Badge, { variant: "outline", className: "text-xs", children: ["$", event.amount.toFixed(0)] }))] }), _jsx("p", { className: "text-gray-300 text-sm", children: event.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), formatTimeAgo(event.timestamp)] }), event.user && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), event.user] })), event.location && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Globe, { className: "w-3 h-3" }), event.location] }))] })] })] }), event.severity === 'critical' && (_jsx(motion.div, { animate: {
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 10, -10, 0]
                                                }, transition: {
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }, className: "text-red-400", children: _jsx(Zap, { className: "w-5 h-5" }) }))] }) }, event.id))) }) }) })] })] }));
};
export default RealTimeActivityVisualizer;
