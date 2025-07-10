import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Volume2, VolumeX, Maximize, MessageCircle, Users, Eye, Crown } from "lucide-react";
export default function LiveStreamingHub() {
    const [selectedStream, setSelectedStream] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [quality, setQuality] = useState('1080p');
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    // Mock live streams data
    const liveStreams = [
        {
            id: '1',
            title: 'Premier League: Liverpool vs Arsenal',
            sport: 'Football',
            league: 'Premier League',
            teams: ['Liverpool', 'Arsenal'],
            score: [2, 1],
            time: '67\'',
            status: 'live',
            viewers: 45672,
            quality: '1080p',
            thumbnail: '/streams/liverpool-arsenal.jpg',
            streamUrl: 'https://stream.winnex.com/live/1',
            featured: true,
            betting: {
                available: true,
                markets: 127,
                volume: 2450000
            }
        },
        {
            id: '2',
            title: 'NBA: Lakers vs Celtics',
            sport: 'Basketball',
            league: 'NBA',
            teams: ['Lakers', 'Celtics'],
            score: [89, 76],
            time: 'Q3 8:34',
            status: 'live',
            viewers: 32145,
            quality: '1080p',
            thumbnail: '/streams/lakers-celtics.jpg',
            streamUrl: 'https://stream.winnex.com/live/2',
            featured: false,
            betting: {
                available: true,
                markets: 89,
                volume: 1850000
            }
        },
        {
            id: '3',
            title: 'Champions League: Barcelona vs PSG',
            sport: 'Football',
            league: 'Champions League',
            teams: ['Barcelona', 'PSG'],
            score: [0, 0],
            time: 'HT',
            status: 'halftime',
            viewers: 67890,
            quality: '4K',
            thumbnail: '/streams/barca-psg.jpg',
            streamUrl: 'https://stream.winnex.com/live/3',
            featured: true,
            betting: {
                available: true,
                markets: 156,
                volume: 3200000
            }
        }
    ];
    // Mock chat messages
    const mockChatMessages = [
        {
            id: '1',
            user: {
                username: 'BettingKing',
                tier: 'diamond',
                avatar: '/avatars/user1.jpg'
            },
            message: 'Liverpool looking strong! Just backed them @1.85',
            timestamp: '18:45:23',
            type: 'bet'
        },
        {
            id: '2',
            user: {
                username: 'SportsFan92',
                tier: 'gold',
                avatar: '/avatars/user2.jpg'
            },
            message: 'What a goal! Salah is incredible! 🔥',
            timestamp: '18:45:45',
            type: 'celebration'
        },
        {
            id: '3',
            user: {
                username: 'OddsWizard',
                tier: 'platinum',
                avatar: '/avatars/user3.jpg'
            },
            message: 'Next goal under 15 minutes - calling it now',
            timestamp: '18:46:12',
            type: 'prediction'
        }
    ];
    const selectedStreamData = liveStreams.find(stream => stream.id === selectedStream) || liveStreams[0];
    useEffect(() => {
        setChatMessages(mockChatMessages);
        // Simulate real-time chat messages
        const interval = setInterval(() => {
            const newMsg = {
                id: Math.random().toString(),
                user: {
                    username: `User${Math.floor(Math.random() * 1000)}`,
                    tier: ['bronze', 'silver', 'gold', 'platinum', 'diamond'][Math.floor(Math.random() * 5)],
                    avatar: `/avatars/user${Math.floor(Math.random() * 5) + 1}.jpg`
                },
                message: [
                    'Great match!',
                    'What a save!',
                    'Betting on next goal',
                    'Liverpool to win this',
                    'Arsenal comeback incoming',
                    'Cash out time?'
                ][Math.floor(Math.random() * 6)],
                timestamp: new Date().toLocaleTimeString(),
                type: ['message', 'bet', 'prediction'][Math.floor(Math.random() * 3)]
            };
            setChatMessages(prev => [...prev.slice(-20), newMsg]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const getTierColor = (tier) => {
        switch (tier) {
            case 'diamond': return 'text-cyan-400';
            case 'platinum': return 'text-gray-300';
            case 'gold': return 'text-yellow-400';
            case 'silver': return 'text-gray-400';
            case 'bronze': return 'text-orange-400';
            default: return 'text-gray-500';
        }
    };
    const getMessageTypeIcon = (type) => {
        switch (type) {
            case 'bet': return '💰';
            case 'prediction': return '🔮';
            case 'celebration': return '🎉';
            default: return '';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: liveStreams.filter(stream => stream.featured).map((stream) => (_jsx(Card, { className: `bg-winnex-gray border-gray-600 cursor-pointer transition-all hover:border-winnex-blue ${selectedStream === stream.id ? 'border-winnex-blue bg-winnex-blue/10' : ''}`, onClick: () => setSelectedStream(stream.id), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "relative mb-3", children: [_jsx("div", { className: "aspect-video bg-gradient-to-r from-winnex-blue/20 to-winnex-green/20 rounded-lg flex items-center justify-center", children: _jsx(Play, { className: "w-12 h-12 text-white opacity-75" }) }), _jsxs("div", { className: "absolute top-2 left-2 flex space-x-2", children: [_jsx(Badge, { className: "bg-red-500 text-white animate-pulse", children: "LIVE" }), _jsx(Badge, { className: "bg-black/50 text-white", children: stream.quality })] }), _jsx("div", { className: "absolute top-2 right-2", children: _jsxs(Badge, { className: "bg-black/50 text-white flex items-center", children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), stream.viewers.toLocaleString()] }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-medium text-sm", children: stream.title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [_jsx("span", { children: stream.league }), _jsx("span", { children: stream.time })] }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "text-lg font-bold", children: [stream.teams[0], " ", stream.score[0], " - ", stream.score[1], " ", stream.teams[1]] }) }), stream.betting.available && (_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("span", { className: "text-winnex-green", children: [stream.betting.markets, " markets"] }), _jsxs("span", { className: "text-gray-400", children: ["$", (stream.betting.volume / 1000000).toFixed(1), "M volume"] })] }))] })] }) }, stream.id))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-3", children: _jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "relative aspect-video bg-black rounded-t-lg overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-winnex-blue/20 to-winnex-green/20 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFC6" }), _jsx("h2", { className: "text-2xl font-bold mb-2", children: selectedStreamData.title }), _jsxs("div", { className: "text-4xl font-bold mb-4", children: [selectedStreamData.teams[0], " ", selectedStreamData.score[0], " - ", selectedStreamData.score[1], " ", selectedStreamData.teams[1]] }), _jsx(Badge, { className: "bg-red-500 text-white text-lg px-4 py-2", children: selectedStreamData.status === 'live' ? 'LIVE' : selectedStreamData.status.toUpperCase() })] }) }), _jsxs("div", { className: "absolute top-4 left-4 flex space-x-2", children: [_jsx(Badge, { className: "bg-red-500 text-white animate-pulse", children: "LIVE" }), _jsx(Badge, { className: "bg-black/50 text-white", children: selectedStreamData.quality }), _jsxs(Badge, { className: "bg-black/50 text-white flex items-center", children: [_jsx(Eye, { className: "w-3 h-3 mr-1" }), selectedStreamData.viewers.toLocaleString()] })] }), _jsx("div", { className: "absolute bottom-4 left-4 right-4", children: _jsx("div", { className: "bg-black/50 backdrop-blur-sm rounded-lg p-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: () => setIsPlaying(!isPlaying), className: "text-white hover:bg-white/20", children: isPlaying ? _jsx(Pause, { className: "w-4 h-4" }) : _jsx(Play, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setIsMuted(!isMuted), className: "text-white hover:bg-white/20", children: isMuted ? _jsx(VolumeX, { className: "w-4 h-4" }) : _jsx(Volume2, { className: "w-4 h-4" }) }), _jsx("span", { className: "text-white text-sm", children: selectedStreamData.time })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Select, { value: quality, onValueChange: setQuality, children: [_jsx(SelectTrigger, { className: "w-20 h-8 text-white border-white/20", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "720p", children: "720p" }), _jsx(SelectItem, { value: "1080p", children: "1080p" }), _jsx(SelectItem, { value: "4K", children: "4K" })] })] }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-white hover:bg-white/20", children: _jsx(Maximize, { className: "w-4 h-4" }) })] })] }) }) })] }), selectedStreamData.betting.available && (_jsxs("div", { className: "p-4 border-t border-gray-600", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-medium", children: "Live Betting" }), _jsxs(Badge, { className: "bg-winnex-green text-black", children: [selectedStreamData.betting.markets, " Markets"] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsxs(Button, { variant: "outline", className: "border-gray-600 hover:bg-winnex-green hover:text-black", children: [selectedStreamData.teams[0], " Win", _jsx("span", { className: "ml-2 font-bold", children: "2.10" })] }), _jsxs(Button, { variant: "outline", className: "border-gray-600 hover:bg-winnex-green hover:text-black", children: ["Draw", _jsx("span", { className: "ml-2 font-bold", children: "3.40" })] }), _jsxs(Button, { variant: "outline", className: "border-gray-600 hover:bg-winnex-green hover:text-black", children: [selectedStreamData.teams[1], " Win", _jsx("span", { className: "ml-2 font-bold", children: "3.75" })] })] }), _jsxs(Button, { className: "w-full mt-3 bg-winnex-blue text-white hover:bg-blue-400", children: ["View All ", selectedStreamData.betting.markets, " Markets"] })] }))] }) }) }), _jsx("div", { className: "lg:col-span-1", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600 h-full", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-lg flex items-center", children: [_jsx(MessageCircle, { className: "w-5 h-5 mr-2" }), "Live Chat"] }), _jsxs(Badge, { className: "bg-winnex-blue text-white flex items-center", children: [_jsx(Users, { className: "w-3 h-3 mr-1" }), selectedStreamData.viewers > 1000 ? `${(selectedStreamData.viewers / 1000).toFixed(1)}K` : selectedStreamData.viewers] })] }) }), _jsxs(CardContent, { className: "flex flex-col h-96", children: [_jsx("div", { className: "flex-1 overflow-y-auto space-y-2 mb-4", children: chatMessages.map((msg) => (_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "flex items-start space-x-2", children: [_jsxs("div", { className: `font-medium ${getTierColor(msg.user.tier)}`, children: [msg.user.username, msg.user.tier === 'diamond' && _jsx(Crown, { className: "w-3 h-3 inline ml-1" })] }), _jsx("span", { className: "text-xs text-gray-400", children: msg.timestamp })] }), _jsxs("div", { className: "flex items-start space-x-1", children: [_jsx("span", { children: getMessageTypeIcon(msg.type) }), _jsx("span", { className: "text-gray-200 break-words", children: msg.message })] })] }, msg.id))) }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("input", { type: "text", value: newMessage, onChange: (e) => setNewMessage(e.target.value), placeholder: "Join the conversation...", className: "flex-1 bg-winnex-dark border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-400", onKeyPress: (e) => {
                                                        if (e.key === 'Enter' && newMessage.trim()) {
                                                            const msg = {
                                                                id: Math.random().toString(),
                                                                user: {
                                                                    username: 'You',
                                                                    tier: 'gold',
                                                                    avatar: '/avatars/user.jpg'
                                                                },
                                                                message: newMessage,
                                                                timestamp: new Date().toLocaleTimeString(),
                                                                type: 'message'
                                                            };
                                                            setChatMessages(prev => [...prev, msg]);
                                                            setNewMessage('');
                                                        }
                                                    } }), _jsx(Button, { size: "sm", className: "bg-winnex-blue text-white hover:bg-blue-400", onClick: () => {
                                                        if (newMessage.trim()) {
                                                            const msg = {
                                                                id: Math.random().toString(),
                                                                user: {
                                                                    username: 'You',
                                                                    tier: 'gold',
                                                                    avatar: '/avatars/user.jpg'
                                                                },
                                                                message: newMessage,
                                                                timestamp: new Date().toLocaleTimeString(),
                                                                type: 'message'
                                                            };
                                                            setChatMessages(prev => [...prev, msg]);
                                                            setNewMessage('');
                                                        }
                                                    }, children: "Send" })] })] })] }) })] }), _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Other Live Streams" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: liveStreams.filter(stream => stream.id !== selectedStream).map((stream) => (_jsxs("div", { className: "cursor-pointer group", onClick: () => setSelectedStream(stream.id), children: [_jsxs("div", { className: "relative aspect-video bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg mb-2 overflow-hidden group-hover:scale-105 transition-transform", children: [_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsx(Play, { className: "w-8 h-8 text-white opacity-75" }) }), _jsx("div", { className: "absolute top-2 left-2", children: _jsx(Badge, { className: "bg-red-500 text-white text-xs", children: "LIVE" }) }), _jsx("div", { className: "absolute top-2 right-2", children: _jsxs(Badge, { className: "bg-black/50 text-white text-xs flex items-center", children: [_jsx(Eye, { className: "w-2 h-2 mr-1" }), stream.viewers > 1000 ? `${(stream.viewers / 1000).toFixed(1)}K` : stream.viewers] }) })] }), _jsx("h4", { className: "font-medium text-sm mb-1", children: stream.title }), _jsxs("div", { className: "text-xs text-gray-400", children: [stream.teams[0], " ", stream.score[0], " - ", stream.score[1], " ", stream.teams[1], " \u2022 ", stream.time] })] }, stream.id))) }) })] })] }));
}
