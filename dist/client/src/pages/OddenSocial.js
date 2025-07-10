import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Trophy, Star, TrendingUp, Share2, Heart, MessageSquare, Send, UserPlus, Crown, Bell, Bookmark, Target, Zap, Medal, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import OddenNav from '@/components/OddenNav';
export default function OddenSocial() {
    const [activeTab, setActiveTab] = useState('feed');
    const [newPost, setNewPost] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const [socialPosts, setSocialPosts] = useState([
        {
            id: 'post_001',
            user: {
                username: 'FantasyKing',
                avatar: '👑',
                tier: 'Master',
                verified: true
            },
            content: "Just locked in my NFL lineup for Sunday! Going contrarian with Tony Pollard at 8% ownership. Sometimes you gotta take risks to differentiate. What do you think?",
            timestamp: '2025-01-29T14:30:00Z',
            likes: 47,
            comments: 12,
            shares: 8,
            type: 'lineup',
            contestInfo: {
                name: 'NFL Sunday Million',
                sport: 'NFL',
                entry: 25
            },
            lineupPreview: {
                players: ['Josh Allen', 'Saquon Barkley', 'Tony Pollard', 'Stefon Diggs'],
                projected: 142.8
            }
        },
        {
            id: 'post_002',
            user: {
                username: 'AnalyticsAce',
                avatar: '📊',
                tier: 'Diamond',
                verified: false
            },
            content: "Weather alert for tomorrow's games! Wind speeds 15+ mph in Buffalo. Fade the passing game, stack the ground attacks. Nature vs nurture in fantasy sports! 🌪️",
            timestamp: '2025-01-29T13:15:00Z',
            likes: 89,
            comments: 23,
            shares: 34,
            type: 'tip'
        },
        {
            id: 'post_003',
            user: {
                username: 'RookieRocket',
                avatar: '🚀',
                tier: 'Gold',
                verified: false
            },
            content: "HOLY SMOKES! Just won my first major contest! 🎉 1st place in the NBA Showdown with Luka's 50-point triple-double carrying me to victory! This community's tips helped so much!",
            timestamp: '2025-01-29T11:45:00Z',
            likes: 156,
            comments: 41,
            shares: 67,
            type: 'celebration',
            contestInfo: {
                name: 'NBA Showdown',
                sport: 'NBA',
                entry: 50
            }
        }
    ]);
    const [communityLeaders, setCommunityLeaders] = useState([
        {
            id: 'tip_001',
            username: 'FantasyGuru',
            avatar: '🧠',
            tier: 'Master',
            followers: 15420,
            accuracy: 87.3,
            roi: 34.2,
            streak: 8,
            specialties: ['NFL', 'NBA', 'Analysis'],
            verified: true,
            bio: 'Former DFS pro. Sharing winning strategies and market insights daily.'
        },
        {
            id: 'tip_002',
            username: 'DataDriven',
            avatar: '📈',
            tier: 'Diamond',
            followers: 8760,
            accuracy: 82.1,
            roi: 28.7,
            streak: 12,
            specialties: ['MLB', 'Soccer', 'Props'],
            verified: true,
            bio: 'Advanced analytics and machine learning for fantasy sports.'
        },
        {
            id: 'tip_003',
            username: 'ContrarianKing',
            avatar: '🎯',
            tier: 'Diamond',
            followers: 12350,
            accuracy: 79.8,
            roi: 41.3,
            streak: 6,
            specialties: ['GPP', 'Contrarian', 'NHL'],
            verified: false,
            bio: 'Finding value where others dont look. GPP specialist.'
        }
    ]);
    const [activeChallenges, setActiveChallenges] = useState([
        {
            id: 'challenge_001',
            title: 'February Accuracy Challenge',
            description: 'Highest prediction accuracy wins $1,000 prize pool',
            creator: 'OddenOfficial',
            participants: 247,
            prize: 1000,
            endDate: '2025-02-28T23:59:59Z',
            type: 'accuracy',
            status: 'active'
        },
        {
            id: 'challenge_002',
            title: 'Super Bowl Prediction Contest',
            description: 'Predict every major Super Bowl prop for massive prizes',
            creator: 'FantasyKing',
            participants: 892,
            prize: 5000,
            endDate: '2025-02-09T18:30:00Z',
            type: 'accuracy',
            status: 'active'
        },
        {
            id: 'challenge_003',
            title: 'March Madness ROI Challenge',
            description: 'Best return on investment during March Madness',
            creator: 'OddenOfficial',
            participants: 156,
            prize: 2500,
            endDate: '2025-04-08T23:59:59Z',
            type: 'roi',
            status: 'upcoming'
        }
    ]);
    const handlePostSubmit = () => {
        if (!newPost.trim())
            return;
        const post = {
            id: `post_${Date.now()}`,
            user: {
                username: 'YourUsername',
                avatar: '⭐',
                tier: 'Gold',
                verified: false
            },
            content: newPost,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0,
            type: 'tip'
        };
        setSocialPosts(prev => [post, ...prev]);
        setNewPost('');
        toast({
            title: "Post Shared!",
            description: "Your post has been shared with the community."
        });
    };
    const handleLike = (postId) => {
        setSocialPosts(prev => prev.map(post => post.id === postId
            ? { ...post, likes: post.likes + 1 }
            : post));
    };
    const getTierColor = (tier) => {
        switch (tier) {
            case 'Master': return 'from-purple-500 to-pink-500';
            case 'Diamond': return 'from-blue-400 to-cyan-400';
            case 'Gold': return 'from-yellow-400 to-orange-400';
            case 'Silver': return 'from-gray-300 to-gray-400';
            default: return 'from-emerald-400 to-teal-400';
        }
    };
    const getPostIcon = (type) => {
        switch (type) {
            case 'lineup': return _jsx(Users, { className: "w-4 h-4 text-blue-400" });
            case 'prediction': return _jsx(Target, { className: "w-4 h-4 text-purple-400" });
            case 'celebration': return _jsx(Trophy, { className: "w-4 h-4 text-yellow-400" });
            case 'tip': return _jsx(Zap, { className: "w-4 h-4 text-emerald-400" });
            case 'challenge': return _jsx(Medal, { className: "w-4 h-4 text-red-400" });
            default: return _jsx(MessageCircle, { className: "w-4 h-4 text-gray-400" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Community Hub" }), _jsx("p", { className: "text-emerald-300", children: "Connect, share strategies, and compete with fellow fantasy players" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { className: "bg-emerald-600 hover:bg-emerald-700", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Find Friends"] }), _jsx(Button, { variant: "outline", className: "border-emerald-500 text-emerald-300", children: _jsx(Bell, { className: "w-4 h-4" }) })] })] }) }) }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx("div", { className: "lg:col-span-3 space-y-6", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "bg-black/50 border border-emerald-500/30 w-full", children: [_jsxs(TabsTrigger, { value: "feed", className: "data-[state=active]:bg-emerald-600", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Feed"] }), _jsxs(TabsTrigger, { value: "challenges", className: "data-[state=active]:bg-emerald-600", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2" }), "Challenges"] }), _jsxs(TabsTrigger, { value: "tipsters", className: "data-[state=active]:bg-emerald-600", children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "Top Tipsters"] })] }), _jsxs(TabsContent, { value: "feed", className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Share with Community" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Textarea, { placeholder: "Share your lineup, prediction, or tip with the community...", value: newPost, onChange: (e) => setNewPost(e.target.value), className: "bg-emerald-900/30 border-emerald-500/30 text-white resize-none", rows: 3 }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-emerald-300", children: [_jsx(Users, { className: "w-4 h-4 mr-1" }), "Lineup"] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-emerald-300", children: [_jsx(Target, { className: "w-4 h-4 mr-1" }), "Prediction"] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-emerald-300", children: [_jsx(Zap, { className: "w-4 h-4 mr-1" }), "Tip"] })] }), _jsxs(Button, { onClick: handlePostSubmit, disabled: !newPost.trim(), className: "bg-emerald-600 hover:bg-emerald-700", children: [_jsx(Send, { className: "w-4 h-4 mr-2" }), "Share"] })] })] })] }), _jsx("div", { className: "space-y-4", children: socialPosts.map((post, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `w-12 h-12 rounded-full bg-gradient-to-r ${getTierColor(post.user.tier)} flex items-center justify-center text-white text-xl font-bold`, children: post.user.avatar }), post.user.verified && (_jsx("div", { className: "absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx(Crown, { className: "w-3 h-3 text-white" }) }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("span", { className: "text-white font-semibold", children: post.user.username }), _jsx(Badge, { className: `bg-gradient-to-r ${getTierColor(post.user.tier)} text-white text-xs`, children: post.user.tier }), getPostIcon(post.type), _jsx("span", { className: "text-emerald-300 text-sm", children: new Date(post.timestamp).toLocaleTimeString() })] }), _jsx("p", { className: "text-white mb-4", children: post.content }), post.contestInfo && (_jsx("div", { className: "bg-emerald-900/30 rounded-lg p-3 mb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-emerald-300 text-sm", children: [post.contestInfo.sport, " Contest"] }), _jsx("p", { className: "text-white font-semibold", children: post.contestInfo.name })] }), _jsxs(Badge, { className: "bg-emerald-600 text-white", children: ["$", post.contestInfo.entry, " Entry"] })] }) })), post.lineupPreview && (_jsxs("div", { className: "bg-blue-900/30 rounded-lg p-3 mb-4", children: [_jsx("p", { className: "text-blue-300 text-sm mb-2", children: "Lineup Preview:" }), _jsx("div", { className: "grid grid-cols-2 gap-2 text-sm", children: post.lineupPreview.players.map((player, idx) => (_jsx("span", { className: "text-white", children: player }, idx))) }), _jsxs("p", { className: "text-blue-300 text-sm mt-2", children: ["Projected: ", post.lineupPreview.projected, " pts"] })] })), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleLike(post.id), className: "text-emerald-300 hover:text-emerald-200", children: [_jsx(Heart, { className: "w-4 h-4 mr-1" }), post.likes] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-emerald-300 hover:text-emerald-200", children: [_jsx(MessageSquare, { className: "w-4 h-4 mr-1" }), post.comments] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-emerald-300 hover:text-emerald-200", children: [_jsx(Share2, { className: "w-4 h-4 mr-1" }), post.shares] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-emerald-300 hover:text-emerald-200", children: _jsx(Bookmark, { className: "w-4 h-4" }) })] })] })] }) }) }) }, post.id))) })] }), _jsx(TabsContent, { value: "challenges", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: activeChallenges.map((challenge, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Trophy, { className: "w-8 h-8 text-yellow-400" }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: challenge.title }), _jsxs("p", { className: "text-emerald-300", children: ["by ", challenge.creator] })] })] }), _jsx(Badge, { className: `${challenge.status === 'active' ? 'bg-green-500/20 text-green-300' :
                                                                            challenge.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
                                                                                'bg-gray-500/20 text-gray-300'}`, children: challenge.status.toUpperCase() })] }), _jsx("p", { className: "text-white mb-4", children: challenge.description }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4", children: [_jsxs("div", { className: "bg-emerald-900/30 rounded-lg p-3 text-center", children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Prize Pool" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: ["$", challenge.prize.toLocaleString()] })] }), _jsxs("div", { className: "bg-emerald-900/30 rounded-lg p-3 text-center", children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Participants" }), _jsx("p", { className: "text-2xl font-bold text-white", children: challenge.participants })] }), _jsxs("div", { className: "bg-emerald-900/30 rounded-lg p-3 text-center", children: [_jsx("p", { className: "text-emerald-300 text-sm", children: "Ends In" }), _jsxs("p", { className: "text-2xl font-bold text-white", children: [Math.ceil((new Date(challenge.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)), "d"] })] })] }), _jsx(Button, { className: "w-full bg-emerald-600 hover:bg-emerald-700", children: "Join Challenge" })] }) }) }, challenge.id))) }) }), _jsx(TabsContent, { value: "tipsters", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: communityLeaders.map((tipster, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `w-16 h-16 rounded-full bg-gradient-to-r ${getTierColor(tipster.tier)} flex items-center justify-center text-white text-2xl font-bold`, children: tipster.avatar }), tipster.verified && (_jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center", children: _jsx(Crown, { className: "w-4 h-4 text-white" }) }))] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold text-white", children: tipster.username }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { className: `bg-gradient-to-r ${getTierColor(tipster.tier)} text-white`, children: tipster.tier }), _jsxs("span", { className: "text-emerald-300 text-sm", children: [tipster.followers.toLocaleString(), " followers"] })] })] }), _jsxs(Button, { className: "bg-emerald-600 hover:bg-emerald-700", children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Follow"] })] }), _jsx("p", { className: "text-white mb-4", children: tipster.bio }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-2xl font-bold text-green-400", children: [tipster.accuracy, "%"] }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Accuracy" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("p", { className: "text-2xl font-bold text-yellow-400", children: ["+", tipster.roi, "%"] }), _jsx("p", { className: "text-emerald-300 text-sm", children: "ROI" })] }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-2xl font-bold text-purple-400", children: tipster.streak }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Win Streak" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Flame, { className: "w-8 h-8 text-orange-400 mx-auto" }), _jsx("p", { className: "text-emerald-300 text-sm", children: "Hot" })] })] }), _jsx("div", { className: "flex items-center space-x-2", children: tipster.specialties.map((specialty, idx) => (_jsx(Badge, { variant: "outline", className: "border-emerald-500 text-emerald-300", children: specialty }, idx))) })] })] }) }) }) }, tipster.id))) }) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Users, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Community Stats"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Active Users" }), _jsx("span", { className: "text-white font-semibold", children: "24,678" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Posts Today" }), _jsx("span", { className: "text-white font-semibold", children: "1,247" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Tips Shared" }), _jsx("span", { className: "text-white font-semibold", children: "358" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Active Challenges" }), _jsx("span", { className: "text-white font-semibold", children: "12" })] })] })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Trending"] }) }), _jsx(CardContent, { className: "space-y-3", children: [
                                                { tag: '#SuperBowlDFS', posts: 247 },
                                                { tag: '#NBASlate', posts: 156 },
                                                { tag: '#ContrarianPlays', posts: 89 },
                                                { tag: '#WeatherAlerts', posts: 67 },
                                                { tag: '#MarchMadness', posts: 45 }
                                            ].map((trend, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-400 font-semibold", children: trend.tag }), _jsxs("span", { className: "text-emerald-300 text-sm", children: [trend.posts, " posts"] })] }, index))) })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(UserPlus, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Suggested Follows"] }) }), _jsx(CardContent, { className: "space-y-3", children: [
                                                { username: 'MLBExpert', tier: 'Diamond', followers: '5.2K' },
                                                { username: 'NHLPro', tier: 'Gold', followers: '3.8K' },
                                                { username: 'GPPSpecialist', tier: 'Silver', followers: '2.1K' }
                                            ].map((user, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-8 h-8 rounded-full bg-gradient-to-r ${getTierColor(user.tier)} flex items-center justify-center text-white text-sm font-bold`, children: user.username[0] }), _jsxs("div", { children: [_jsx("p", { className: "text-white text-sm font-semibold", children: user.username }), _jsxs("p", { className: "text-emerald-300 text-xs", children: [user.followers, " followers"] })] })] }), _jsx(Button, { size: "sm", className: "bg-emerald-600 hover:bg-emerald-700", children: "Follow" })] }, index))) })] })] })] }) })] }));
}
