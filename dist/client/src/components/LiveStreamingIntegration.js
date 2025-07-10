import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, MessageSquare, Eye, TrendingUp, Zap, Target, PictureInPicture, Send } from "lucide-react";
export default function LiveStreamingIntegration() {
    const [selectedStream, setSelectedStream] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState([50]);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPiPMode, setIsPiPMode] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const [chatMessage, setChatMessage] = useState('');
    const [selectedQuality, setSelectedQuality] = useState('1080p');
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const { data: liveStreams } = useQuery({
        queryKey: ['/api/streams/live'],
        refetchInterval: 30000,
    });
    const { data: chatMessages } = useQuery({
        queryKey: ['/api/streams/chat', selectedStream],
        refetchInterval: 1000,
        enabled: !!selectedStream,
    });
    // Mock data for demonstration
    const mockStreams = [
        {
            id: '1',
            title: 'NFL Championship Game',
            sport: 'Football',
            league: 'NFL',
            team1: 'Kansas City Chiefs',
            team2: 'Buffalo Bills',
            score1: 14,
            score2: 10,
            gameTime: '2Q 08:45',
            status: 'live',
            viewers: 125670,
            quality: '4K',
            streamUrl: 'https://example.com/stream1',
            thumbnail: 'https://via.placeholder.com/320x180',
            broadcaster: 'ESPN',
            language: 'English',
            commentary: true,
            chatEnabled: true,
            overlayData: {
                odds: {
                    team1Win: 1.75,
                    team2Win: 2.20
                },
                liveStats: {
                    possession: 58,
                    shots: { team1: 7, team2: 4 },
                    corners: { team1: 3, team2: 1 },
                    cards: { team1: 1, team2: 2 }
                },
                nextEvents: [
                    { type: 'Next TD', odds: 2.80, probability: 35.7 },
                    { type: 'Field Goal', odds: 1.45, probability: 69.0 },
                    { type: 'Turnover', odds: 4.20, probability: 23.8 }
                ],
                momentum: 15
            }
        },
        {
            id: '2',
            title: 'Premier League Derby',
            sport: 'Soccer',
            league: 'EPL',
            team1: 'Arsenal',
            team2: 'Chelsea',
            score1: 1,
            score2: 1,
            gameTime: '67:32',
            status: 'live',
            viewers: 89420,
            quality: '1080p',
            streamUrl: 'https://example.com/stream2',
            thumbnail: 'https://via.placeholder.com/320x180',
            broadcaster: 'Sky Sports',
            language: 'English',
            commentary: true,
            chatEnabled: true,
            overlayData: {
                odds: {
                    team1Win: 2.10,
                    draw: 3.40,
                    team2Win: 3.75
                },
                liveStats: {
                    possession: 52,
                    shots: { team1: 8, team2: 6 },
                    corners: { team1: 4, team2: 3 },
                    cards: { team1: 2, team2: 1 }
                },
                nextEvents: [
                    { type: 'Next Goal', odds: 1.85, probability: 54.1 },
                    { type: 'Corner Kick', odds: 1.30, probability: 76.9 },
                    { type: 'Yellow Card', odds: 2.50, probability: 40.0 }
                ],
                momentum: -8
            }
        }
    ];
    const mockChatMessages = [
        {
            id: '1',
            username: 'SportsFan2024',
            message: 'What a touchdown! Chiefs looking unstoppable! 🔥',
            timestamp: '2 min ago',
            type: 'user',
            avatar: 'https://via.placeholder.com/24',
            badges: ['VIP', '⭐']
        },
        {
            id: '2',
            username: 'System',
            message: 'BetMaster123 just placed a $500 bet on Chiefs -7.5!',
            timestamp: '3 min ago',
            type: 'bet_notification'
        },
        {
            id: '3',
            username: 'ProBettor',
            message: 'Bills defense needs to step up in the red zone',
            timestamp: '5 min ago',
            type: 'user',
            avatar: 'https://via.placeholder.com/24',
            badges: ['PRO']
        }
    ];
    const qualityOptions = [
        { label: '4K Ultra', value: '4K', bitrate: 25000, resolution: '3840x2160' },
        { label: '1080p HD', value: '1080p', bitrate: 8000, resolution: '1920x1080' },
        { label: '720p', value: '720p', bitrate: 5000, resolution: '1280x720' },
        { label: '480p', value: '480p', bitrate: 2500, resolution: '854x480' },
        { label: 'Auto', value: 'auto', bitrate: 0, resolution: 'Adaptive' }
    ];
    const streams = liveStreams || mockStreams;
    const messages = chatMessages || mockChatMessages;
    const currentStream = streams.find(s => s.id === selectedStream);
    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            }
            else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    const handleVolumeChange = (value) => {
        const newVolume = value[0];
        setVolume([newVolume]);
        if (videoRef.current) {
            videoRef.current.volume = newVolume / 100;
        }
    };
    const toggleFullscreen = () => {
        if (!document.fullscreenElement && containerRef.current) {
            containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        }
        else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };
    const togglePictureInPicture = async () => {
        if (videoRef.current) {
            try {
                if (document.pictureInPictureElement) {
                    await document.exitPictureInPicture();
                    setIsPiPMode(false);
                }
                else {
                    await videoRef.current.requestPictureInPicture();
                    setIsPiPMode(true);
                }
            }
            catch (error) {
                console.log('PiP not supported');
            }
        }
    };
    const sendChatMessage = () => {
        if (chatMessage.trim()) {
            // In real implementation, this would send to chat API
            console.log('Sending message:', chatMessage);
            setChatMessage('');
        }
    };
    const getMomentumColor = (momentum) => {
        if (momentum > 20)
            return 'text-green-500';
        if (momentum > 0)
            return 'text-green-300';
        if (momentum < -20)
            return 'text-red-500';
        if (momentum < 0)
            return 'text-red-300';
        return 'text-gray-400';
    };
    const getMomentumWidth = (momentum) => {
        return Math.abs(momentum);
    };
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Live Sports Streaming" }), _jsx("p", { className: "text-gray-400", children: "Watch live games with integrated betting overlays" })] }), _jsx("div", { className: "grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8", children: streams.map((stream) => (_jsx(Card, { className: `cursor-pointer transition-all duration-300 ${selectedStream === stream.id
                        ? 'border-green-500 bg-green-900/20'
                        : 'border-gray-600 bg-winnex-dark hover:border-gray-500'}`, onClick: () => setSelectedStream(stream.id), children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: stream.thumbnail, alt: stream.title, className: "w-full h-32 object-cover rounded-t-lg" }), _jsx("div", { className: "absolute top-2 left-2", children: _jsx(Badge, { className: `${stream.status === 'live' ? 'bg-red-500 animate-pulse' :
                                                stream.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'}`, children: stream.status.toUpperCase() }) }), _jsx("div", { className: "absolute top-2 right-2", children: _jsx(Badge, { className: "bg-black/50 text-white", children: stream.quality }) }), _jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 rounded px-2 py-1", children: [_jsx(Eye, { className: "w-3 h-3 text-white" }), _jsx("span", { className: "text-white text-xs", children: stream.viewers.toLocaleString() })] })] }), _jsxs("div", { className: "p-3", children: [_jsx("h3", { className: "text-white font-semibold text-sm mb-1", children: stream.title }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400 mb-2", children: [_jsx("span", { children: stream.league }), _jsx("span", { children: stream.broadcaster })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-white", children: [stream.team1, " vs ", stream.team2] }), _jsxs("div", { className: "text-sm font-bold text-green-400", children: [stream.score1, "-", stream.score2] })] }), _jsx("div", { className: "text-xs text-gray-500 mt-1", children: stream.gameTime })] })] }) }, stream.id))) }), selectedStream && currentStream && (_jsxs("div", { className: "grid lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-3", children: [_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-0", children: [_jsxs("div", { ref: containerRef, className: "relative bg-black rounded-lg overflow-hidden", children: [_jsxs("video", { ref: videoRef, className: "w-full aspect-video", poster: currentStream.thumbnail, controls: false, children: [_jsx("source", { src: currentStream.streamUrl, type: "video/mp4" }), "Your browser does not support the video tag."] }), showOverlay && (_jsxs("div", { className: "absolute top-4 left-4 right-4 pointer-events-none", children: [_jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "bg-black/70 rounded-lg p-3 pointer-events-auto", children: [_jsxs("div", { className: "text-white font-bold text-lg mb-1", children: [currentStream.team1, " vs ", currentStream.team2] }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("span", { className: "text-green-400 font-bold", children: [currentStream.score1, " - ", currentStream.score2] }), _jsx("span", { className: "text-gray-300", children: currentStream.gameTime }), _jsx(Badge, { className: "bg-red-500 animate-pulse", children: "LIVE" })] })] }), _jsxs("div", { className: "bg-black/70 rounded-lg p-3 pointer-events-auto", children: [_jsx("div", { className: "text-xs text-gray-400 mb-2", children: "Live Odds" }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700 text-xs", children: [currentStream.team1, ": ", currentStream.overlayData.odds.team1Win] }), currentStream.overlayData.odds.draw && (_jsxs(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700 text-xs", children: ["Draw: ", currentStream.overlayData.odds.draw] })), _jsxs(Button, { size: "sm", className: "bg-red-600 hover:bg-red-700 text-xs", children: [currentStream.team2, ": ", currentStream.overlayData.odds.team2Win] })] })] })] }), _jsxs("div", { className: "mt-4 bg-black/70 rounded-lg p-3", children: [_jsx("div", { className: "text-xs text-gray-400 mb-2", children: "Game Momentum" }), _jsx("div", { className: "relative h-2 bg-gray-600 rounded-full overflow-hidden", children: _jsxs("div", { className: "absolute inset-0 flex", children: [_jsx("div", { className: "bg-red-500 transition-all duration-1000", style: {
                                                                                    width: currentStream.overlayData.momentum < 0 ? `${getMomentumWidth(currentStream.overlayData.momentum)}%` : '0%'
                                                                                } }), _jsx("div", { className: "flex-1" }), _jsx("div", { className: "bg-green-500 transition-all duration-1000", style: {
                                                                                    width: currentStream.overlayData.momentum > 0 ? `${getMomentumWidth(currentStream.overlayData.momentum)}%` : '0%'
                                                                                } })] }) }), _jsxs("div", { className: "flex justify-between text-xs mt-1", children: [_jsx("span", { className: "text-red-400", children: currentStream.team1 }), _jsxs("span", { className: getMomentumColor(currentStream.overlayData.momentum), children: [currentStream.overlayData.momentum > 0 ? '+' : '', currentStream.overlayData.momentum] }), _jsx("span", { className: "text-green-400", children: currentStream.team2 })] })] }), _jsxs("div", { className: "mt-4 bg-black/70 rounded-lg p-3", children: [_jsx("div", { className: "text-xs text-gray-400 mb-2", children: "Next Event Predictions" }), _jsx("div", { className: "flex gap-2", children: currentStream.overlayData.nextEvents.map((event, index) => (_jsxs(Button, { size: "sm", variant: "outline", className: "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black text-xs", children: [event.type, ": ", event.odds, " (", event.probability, "%)"] }, index))) })] })] })), _jsx("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: togglePlayPause, className: "text-white hover:bg-white/20", children: isPlaying ? _jsx(Pause, { className: "w-5 h-5" }) : _jsx(Play, { className: "w-5 h-5" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: toggleMute, className: "text-white hover:bg-white/20", children: isMuted ? _jsx(VolumeX, { className: "w-5 h-5" }) : _jsx(Volume2, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Slider, { value: volume, onValueChange: handleVolumeChange, max: 100, step: 1, className: "w-20" }), _jsxs("span", { className: "text-white text-xs", children: [volume[0], "%"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("select", { value: selectedQuality, onChange: (e) => setSelectedQuality(e.target.value), className: "bg-black/50 text-white border border-gray-600 rounded px-2 py-1 text-xs", children: qualityOptions.map((quality) => (_jsx("option", { value: quality.value, children: quality.label }, quality.value))) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => setShowOverlay(!showOverlay), className: "text-white hover:bg-white/20", children: _jsx(Target, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: togglePictureInPicture, className: "text-white hover:bg-white/20", children: _jsx(PictureInPicture, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: toggleFullscreen, className: "text-white hover:bg-white/20", children: isFullscreen ? _jsx(Minimize, { className: "w-4 h-4" }) : _jsx(Maximize, { className: "w-4 h-4" }) })] })] }) })] }), _jsx("div", { className: "p-4 border-t border-gray-700", children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4 text-sm", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400", children: "Viewers" }), _jsxs("div", { className: "text-white font-semibold flex items-center justify-center gap-1", children: [_jsx(Eye, { className: "w-4 h-4" }), currentStream.viewers.toLocaleString()] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400", children: "Quality" }), _jsx("div", { className: "text-green-400 font-semibold", children: selectedQuality })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400", children: "Language" }), _jsx("div", { className: "text-white font-semibold", children: currentStream.language })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400", children: "Commentary" }), _jsx("div", { className: "text-white font-semibold", children: currentStream.commentary ? 'Yes' : 'No' })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400", children: "Broadcaster" }), _jsx("div", { className: "text-white font-semibold", children: currentStream.broadcaster })] })] }) })] }) }), currentStream.overlayData.liveStats && (_jsxs(Card, { className: "bg-winnex-dark border-gray-700 mt-4", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(TrendingUp, { className: "w-5 h-5" }), "Live Statistics"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [currentStream.overlayData.liveStats.possession && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400 text-sm", children: "Possession" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [currentStream.overlayData.liveStats.possession, "%"] })] })), currentStream.overlayData.liveStats.shots && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400 text-sm", children: "Shots" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [currentStream.overlayData.liveStats.shots.team1, " - ", currentStream.overlayData.liveStats.shots.team2] })] })), currentStream.overlayData.liveStats.corners && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400 text-sm", children: "Corners" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [currentStream.overlayData.liveStats.corners.team1, " - ", currentStream.overlayData.liveStats.corners.team2] })] })), currentStream.overlayData.liveStats.cards && (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-gray-400 text-sm", children: "Cards" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: [currentStream.overlayData.liveStats.cards.team1, " - ", currentStream.overlayData.liveStats.cards.team2] })] }))] }) })] }))] }), _jsxs("div", { className: "space-y-4", children: [currentStream.chatEnabled && (_jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(MessageSquare, { className: "w-5 h-5" }), "Live Chat", _jsxs(Badge, { className: "bg-green-600 ml-auto", children: [messages.length, " online"] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "h-80 overflow-y-auto space-y-3 mb-4", children: messages.map((message) => (_jsxs("div", { className: "flex items-start gap-2", children: [message.avatar && (_jsx("img", { src: message.avatar, alt: message.username, className: "w-6 h-6 rounded-full" })), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-1 mb-1", children: [_jsx("span", { className: `text-sm font-semibold ${message.type === 'system' ? 'text-yellow-400' :
                                                                                message.type === 'bet_notification' ? 'text-green-400' : 'text-white'}`, children: message.username }), message.badges?.map((badge, index) => (_jsx(Badge, { className: "text-xs bg-purple-600", children: badge }, index))), _jsx("span", { className: "text-xs text-gray-500 ml-auto", children: message.timestamp })] }), _jsx("div", { className: "text-gray-300 text-sm", children: message.message })] })] }, message.id))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Type a message...", value: chatMessage, onChange: (e) => setChatMessage(e.target.value), onKeyPress: (e) => e.key === 'Enter' && sendChatMessage(), className: "bg-winnex-gray border-gray-600" }), _jsx(Button, { size: "sm", onClick: sendChatMessage, className: "bg-winnex-green text-black", children: _jsx(Send, { className: "w-4 h-4" }) })] })] })] })), _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Zap, { className: "w-5 h-5" }), "Quick Bet"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs(Button, { className: "bg-blue-600 hover:bg-blue-700 text-sm", children: [currentStream.team1, _jsx("br", {}), _jsx("span", { className: "font-bold", children: currentStream.overlayData.odds.team1Win })] }), _jsxs(Button, { className: "bg-red-600 hover:bg-red-700 text-sm", children: [currentStream.team2, _jsx("br", {}), _jsx("span", { className: "font-bold", children: currentStream.overlayData.odds.team2Win })] })] }), currentStream.overlayData.odds.draw && (_jsxs(Button, { className: "w-full bg-green-600 hover:bg-green-700", children: ["Draw: ", currentStream.overlayData.odds.draw] })), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-white text-sm", children: "Stake Amount" }), _jsx(Input, { placeholder: "$0.00", className: "bg-winnex-gray border-gray-600" })] }), _jsx(Button, { className: "w-full bg-winnex-green text-black font-semibold", children: "Place Live Bet" })] })] })] })] })), !selectedStream && (_jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCFA" }), _jsx("h3", { className: "text-2xl font-bold text-white mb-4", children: "Select a Live Stream" }), _jsx("p", { className: "text-gray-400", children: "Choose from the available live sports streams above to start watching" })] }))] }));
}
