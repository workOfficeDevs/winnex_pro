import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Users, MessageCircle } from "lucide-react";
export default function LiveStreamPlayer({ matchId, streamUrl, isLive, viewerCount = 0 }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showChat, setShowChat] = useState(false);
    const [quality, setQuality] = useState("HD");
    const videoRef = useRef(null);
    useEffect(() => {
        let timeout;
        if (isPlaying && showControls) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [isPlaying, showControls]);
    const togglePlay = () => {
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
    const enterFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen();
        }
    };
    return (_jsxs("div", { className: "relative bg-black rounded-xl overflow-hidden group", children: [isLive && (_jsxs("div", { className: "absolute top-4 left-4 z-20 flex items-center space-x-2 bg-red-500 px-3 py-1 rounded-full", children: [_jsx("div", { className: "w-2 h-2 bg-white rounded-full animate-pulse" }), _jsx("span", { className: "text-white text-sm font-bold", children: "LIVE" })] })), _jsxs("div", { className: "absolute top-4 right-4 z-20 flex items-center space-x-1 glass rounded-full px-3 py-1", children: [_jsx(Users, { size: 14, className: "text-white" }), _jsx("span", { className: "text-white text-sm", children: viewerCount.toLocaleString() })] }), _jsxs("div", { className: "relative aspect-video cursor-pointer", onMouseEnter: () => setShowControls(true), onMouseLeave: () => !isPlaying && setShowControls(false), onClick: togglePlay, children: [streamUrl ? (_jsx("video", { ref: videoRef, className: "w-full h-full object-cover", poster: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=450&fit=crop", children: _jsx("source", { src: streamUrl, type: "video/mp4" }) })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDCFA" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "Stream Starting Soon" }), _jsx("p", { className: "text-white/60", children: "Live coverage will begin when the match starts" })] }) })), !isPlaying && streamUrl && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20", children: _jsx("button", { className: "w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all", children: _jsx(Play, { size: 24, className: "text-white ml-1" }) }) })), _jsx("div", { className: `absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { onClick: togglePlay, className: "text-white hover:text-winnex-green transition-colors", children: isPlaying ? _jsx(Pause, { size: 20 }) : _jsx(Play, { size: 20 }) }), _jsx("button", { onClick: toggleMute, className: "text-white hover:text-winnex-green transition-colors", children: isMuted ? _jsx(VolumeX, { size: 20 }) : _jsx(Volume2, { size: 20 }) }), _jsx("div", { className: "text-white text-sm", children: isLive ? 'LIVE' : '00:00 / 00:00' })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("button", { className: "text-white hover:text-winnex-green transition-colors", children: _jsx(Settings, { size: 20 }) }), _jsxs("div", { className: "absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 text-white text-sm whitespace-nowrap", children: ["Quality: ", quality] })] }), _jsx("button", { onClick: () => setShowChat(!showChat), className: `text-white hover:text-winnex-green transition-colors ${showChat ? 'text-winnex-green' : ''}`, children: _jsx(MessageCircle, { size: 20 }) }), _jsx("button", { onClick: enterFullscreen, className: "text-white hover:text-winnex-green transition-colors", children: _jsx(Maximize, { size: 20 }) })] })] }) })] }), showChat && (_jsxs("div", { className: "absolute top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-sm p-4 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "font-bold text-white", children: "Live Chat" }), _jsx("button", { onClick: () => setShowChat(false), className: "text-white/60 hover:text-white", children: "\u2715" })] }), _jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "flex-1 space-y-2 overflow-y-auto mb-4", children: [
                                    { user: "SportsFan99", message: "Great match so far!", time: "2m" },
                                    { user: "BetMaster", message: "Going for over 2.5 goals", time: "3m" },
                                    { user: "LiveBetter", message: "What odds are you getting?", time: "5m" },
                                ].map((chat, index) => (_jsxs("div", { className: "text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium text-winnex-green", children: chat.user }), _jsx("span", { className: "text-white/40 text-xs", children: chat.time })] }), _jsx("div", { className: "text-white/80", children: chat.message })] }, index))) }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("input", { type: "text", placeholder: "Type a message...", className: "flex-1 p-2 bg-white/10 rounded border border-white/20 text-white text-sm" }), _jsx("button", { className: "px-4 py-2 bg-winnex-green text-black rounded font-medium text-sm", children: "Send" })] })] })] })), _jsxs("div", { className: "absolute bottom-4 left-4 flex space-x-4 text-xs text-white/80", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "1080p" })] }), _jsx("div", { children: "Latency: 2.1s" }), _jsx("div", { children: "Bitrate: 6000 kbps" })] })] }));
}
