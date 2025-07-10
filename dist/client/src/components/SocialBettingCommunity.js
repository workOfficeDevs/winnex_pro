import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Users, MessageCircle, Heart, Share2, Crown, Medal, Award, Flame, Star, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function SocialBettingCommunity() {
    const [activeTab, setActiveTab] = useState('feed');
    const [newTipContent, setNewTipContent] = useState('');
    const [selectedChallenge, setSelectedChallenge] = useState(null);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // Mock leaderboard data
    const leaderboard = [
        {
            id: '1',
            username: 'BettingKing',
            avatar: '/avatars/user1.jpg',
            rank: 1,
            profit: 15420,
            roi: 34.2,
            winRate: 68.5,
            totalBets: 247,
            streak: 12,
            tier: 'diamond',
            badges: ['🔥', '🎯', '👑'],
            followers: 2847,
            following: false
        },
        {
            id: '2',
            username: 'SportsProphet',
            avatar: '/avatars/user2.jpg',
            rank: 2,
            profit: 12350,
            roi: 28.7,
            winRate: 64.2,
            totalBets: 189,
            streak: 8,
            tier: 'platinum',
            badges: ['⚡', '🎯', '📈'],
            followers: 1923,
            following: true
        },
        {
            id: '3',
            username: 'OddsWizard',
            avatar: '/avatars/user3.jpg',
            rank: 3,
            profit: 9875,
            roi: 22.1,
            winRate: 61.8,
            totalBets: 156,
            streak: 5,
            tier: 'gold',
            badges: ['🧙‍♂️', '📊', '💫'],
            followers: 1456,
            following: false
        }
    ];
    // Mock betting tips feed
    const bettingTips = [
        {
            id: '1',
            author: {
                id: '1',
                username: 'BettingKing',
                avatar: '/avatars/user1.jpg',
                tier: 'diamond',
                verified: true
            },
            content: "Strong value play incoming! Liverpool's defensive injuries create a perfect storm for goals.",
            prediction: {
                match: 'Liverpool vs Arsenal',
                selection: 'Over 2.5 Goals',
                odds: 1.85,
                confidence: 92,
                reasoning: [
                    'Liverpool missing 3 key defenders',
                    'Arsenal scored 2+ in last 6 away games',
                    'Both teams need the points'
                ]
            },
            engagement: {
                likes: 127,
                comments: 23,
                shares: 45,
                follows: 12
            },
            timestamp: '2024-06-14T16:30:00Z',
            liked: false,
            performance: {
                accuracy: 78.5,
                profit: 2450,
                followers: 2847
            }
        },
        {
            id: '2',
            author: {
                id: '2',
                username: 'SportsProphet',
                avatar: '/avatars/user2.jpg',
                tier: 'platinum',
                verified: true
            },
            content: "AI model showing 89% confidence on this NBA total. The pace metrics are screaming over!",
            prediction: {
                match: 'Lakers vs Celtics',
                selection: 'Over 218.5 Points',
                odds: 1.92,
                confidence: 89,
                reasoning: [
                    'Both teams top 5 in pace',
                    'Defensive injuries on both sides',
                    'Recent H2H averaging 225+ points'
                ]
            },
            engagement: {
                likes: 89,
                comments: 16,
                shares: 28,
                follows: 8
            },
            timestamp: '2024-06-14T15:45:00Z',
            liked: true,
            performance: {
                accuracy: 82.1,
                profit: 1923,
                followers: 1923
            }
        }
    ];
    // Mock challenges
    const challenges = [
        {
            id: '1',
            title: 'Weekly Profit Challenge',
            description: 'Highest profit wins $500 + VIP status',
            prize: 500,
            participants: 1247,
            maxParticipants: 2000,
            duration: '4 days left',
            type: 'weekly',
            requirements: ['Min 10 bets', 'Min $5 stake'],
            leaderboard: leaderboard.slice(0, 5),
            joined: true,
            status: 'active'
        },
        {
            id: '2',
            title: 'NBA Prediction Tournament',
            description: 'Predict NBA game outcomes for big prizes',
            prize: 1000,
            participants: 845,
            maxParticipants: 1000,
            duration: '2 weeks left',
            type: 'tournament',
            requirements: ['NBA games only', 'Min 3 predictions/week'],
            leaderboard: leaderboard.slice(0, 3),
            joined: false,
            status: 'active'
        }
    ];
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
    const getTierIcon = (tier) => {
        switch (tier) {
            case 'diamond': return _jsx(Crown, { className: "w-4 h-4" });
            case 'platinum': return _jsx(Medal, { className: "w-4 h-4" });
            case 'gold': return _jsx(Trophy, { className: "w-4 h-4" });
            case 'silver': return _jsx(Award, { className: "w-4 h-4" });
            case 'bronze': return _jsx(Target, { className: "w-4 h-4" });
            default: return _jsx(Star, { className: "w-4 h-4" });
        }
    };
    // Follow/unfollow user mutation
    const followMutation = useMutation({
        mutationFn: async (userId) => {
            return apiRequest('POST', `/api/users/${userId}/follow`);
        },
        onSuccess: () => {
            toast({
                title: "Following User",
                description: "You'll now see their tips in your feed",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/social/feed'] });
        }
    });
    // Like tip mutation
    const likeMutation = useMutation({
        mutationFn: async (tipId) => {
            return apiRequest('POST', `/api/tips/${tipId}/like`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/social/feed'] });
        }
    });
    // Join challenge mutation
    const joinChallengeMutation = useMutation({
        mutationFn: async (challengeId) => {
            return apiRequest('POST', `/api/challenges/${challengeId}/join`);
        },
        onSuccess: () => {
            toast({
                title: "Challenge Joined!",
                description: "Good luck in the competition!",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/challenges'] });
        }
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30", children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-blue-500/20 rounded-lg", children: _jsx(Users, { className: "w-6 h-6 text-blue-400" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: "Betting Community" }), _jsx("p", { className: "text-sm text-gray-400", children: "Connect \u2022 Compete \u2022 Win Together" })] })] }), _jsxs("div", { className: "flex items-center space-x-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-winnex-green", children: "12.4K" }), _jsx("div", { className: "text-xs text-gray-400", children: "Active Bettors" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: "$2.1M" }), _jsx("div", { className: "text-xs text-gray-400", children: "Community Profit" })] })] })] }) }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-winnex-dark", children: [_jsx(TabsTrigger, { value: "feed", children: "Live Feed" }), _jsx(TabsTrigger, { value: "leaderboard", children: "Leaderboard" }), _jsx(TabsTrigger, { value: "challenges", children: "Challenges" }), _jsx(TabsTrigger, { value: "tipsters", children: "Top Tipsters" })] }), _jsxs(TabsContent, { value: "feed", className: "space-y-4", children: [_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg", children: "Share Your Prediction" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Textarea, { placeholder: "Share your betting insight with the community...", value: newTipContent, onChange: (e) => setNewTipContent(e.target.value), className: "bg-winnex-dark border-gray-600 min-h-[100px]" }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", className: "border-gray-600", children: "Add Match" }), _jsx(Button, { size: "sm", variant: "outline", className: "border-gray-600", children: "Add Odds" })] }), _jsx(Button, { className: "bg-winnex-blue text-white hover:bg-blue-400", children: "Post Tip" })] })] })] }), _jsx("div", { className: "space-y-4", children: bettingTips.map((tip) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Avatar, { className: "h-10 w-10", children: [_jsx(AvatarImage, { src: tip.author.avatar }), _jsx(AvatarFallback, { children: tip.author.username[0] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium", children: tip.author.username }), tip.author.verified && (_jsxs(Badge, { className: `${getTierColor(tip.author.tier)} border-current`, children: [getTierIcon(tip.author.tier), tip.author.tier.toUpperCase()] }))] }), _jsxs("div", { className: "text-xs text-gray-400", children: [new Date(tip.timestamp).toLocaleDateString(), " \u2022", tip.performance.accuracy, "% accuracy \u2022 $", tip.performance.profit, "+ profit"] })] })] }), _jsx(Button, { size: "sm", variant: tip.author.id === '2' ? 'default' : 'outline', className: tip.author.id === '2' ? 'bg-winnex-blue text-white' : 'border-gray-600', onClick: () => followMutation.mutate(tip.author.id), children: tip.author.id === '2' ? 'Following' : 'Follow' })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-200", children: tip.content }), _jsx(Card, { className: "bg-gradient-to-r from-winnex-green/10 to-winnex-blue/10 border-winnex-green/30", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h4", { className: "font-medium", children: tip.prediction.match }), _jsxs(Badge, { className: "bg-winnex-green text-black", children: [tip.prediction.confidence, "% Confidence"] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Selection" }), _jsx("div", { className: "font-medium text-winnex-green", children: tip.prediction.selection })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Odds" }), _jsx("div", { className: "font-medium", children: tip.prediction.odds })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-sm font-medium", children: "Reasoning:" }), tip.prediction.reasoning.map((reason, idx) => (_jsxs("div", { className: "text-sm text-gray-300 flex items-start", children: [_jsx("span", { className: "text-winnex-green mr-2", children: "\u2022" }), reason] }, idx)))] }), _jsx(Button, { className: "w-full mt-3 bg-winnex-green text-black hover:bg-green-400", children: "Copy to Bet Slip" })] }) }), _jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-gray-600", children: [_jsxs("div", { className: "flex space-x-4", children: [_jsxs(Button, { size: "sm", variant: "ghost", className: `flex items-center space-x-1 ${tip.liked ? 'text-red-400' : 'text-gray-400'}`, onClick: () => likeMutation.mutate(tip.id), children: [_jsx(Heart, { className: `w-4 h-4 ${tip.liked ? 'fill-current' : ''}` }), _jsx("span", { children: tip.engagement.likes })] }), _jsxs(Button, { size: "sm", variant: "ghost", className: "flex items-center space-x-1 text-gray-400", children: [_jsx(MessageCircle, { className: "w-4 h-4" }), _jsx("span", { children: tip.engagement.comments })] }), _jsxs(Button, { size: "sm", variant: "ghost", className: "flex items-center space-x-1 text-gray-400", children: [_jsx(Share2, { className: "w-4 h-4" }), _jsx("span", { children: tip.engagement.shares })] })] }), _jsxs("div", { className: "text-xs text-gray-400", children: [tip.engagement.follows, " people followed this tip"] })] })] })] }, tip.id))) })] }), _jsx(TabsContent, { value: "leaderboard", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: leaderboard.map((user, index) => (_jsx(Card, { className: `bg-winnex-gray border-gray-600 ${index < 3 ? 'border-l-4' : ''} ${index === 0 ? 'border-l-yellow-400' :
                                    index === 1 ? 'border-l-gray-300' :
                                        index === 2 ? 'border-l-orange-400' : ''}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `text-2xl font-bold ${getTierColor(user.tier)}`, children: ["#", user.rank] }), index < 3 && (_jsxs("div", { className: "flex justify-center mt-1", children: [index === 0 && _jsx(Crown, { className: "w-5 h-5 text-yellow-400" }), index === 1 && _jsx(Medal, { className: "w-5 h-5 text-gray-300" }), index === 2 && _jsx(Trophy, { className: "w-5 h-5 text-orange-400" })] }))] }), _jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: user.avatar }), _jsx(AvatarFallback, { children: user.username[0] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium", children: user.username }), _jsxs(Badge, { className: `${getTierColor(user.tier)} border-current`, children: [getTierIcon(user.tier), user.tier.toUpperCase()] })] }), _jsx("div", { className: "flex items-center space-x-1 mt-1", children: user.badges.map((badge, idx) => (_jsx("span", { className: "text-sm", children: badge }, idx))) }), _jsxs("div", { className: "text-sm text-gray-400", children: [user.followers.toLocaleString(), " followers"] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-6 text-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-winnex-green", children: ["$", user.profit.toLocaleString()] }), _jsx("div", { className: "text-xs text-gray-400", children: "Profit" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-blue-400", children: [user.roi, "%"] }), _jsx("div", { className: "text-xs text-gray-400", children: "ROI" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-yellow-400", children: [user.winRate, "%"] }), _jsx("div", { className: "text-xs text-gray-400", children: "Win Rate" })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-1 mb-2", children: [_jsx(Flame, { className: "w-4 h-4 text-orange-400" }), _jsxs("span", { className: "text-sm font-medium", children: [user.streak, " streak"] })] }), _jsx(Button, { size: "sm", variant: user.following ? 'default' : 'outline', className: user.following ? 'bg-winnex-blue text-white' : 'border-gray-600', onClick: () => followMutation.mutate(user.id), children: user.following ? 'Following' : 'Follow' })] })] }) }) }, user.id))) }) }), _jsx(TabsContent, { value: "challenges", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: challenges.map((challenge) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: challenge.title }), _jsx("p", { className: "text-sm text-gray-400", children: challenge.description })] }), _jsx(Badge, { className: `${challenge.status === 'active' ? 'bg-green-500' :
                                                        challenge.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'} text-white`, children: challenge.status.toUpperCase() })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-xl font-bold text-winnex-green", children: ["$", challenge.prize] }), _jsx("div", { className: "text-xs text-gray-400", children: "Prize Pool" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xl font-bold text-blue-400", children: challenge.participants }), _jsx("div", { className: "text-xs text-gray-400", children: "Participants" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xl font-bold text-yellow-400", children: challenge.duration }), _jsx("div", { className: "text-xs text-gray-400", children: "Time Left" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "Requirements:" }), challenge.requirements.map((req, idx) => (_jsxs("div", { className: "text-sm text-gray-300 flex items-start", children: [_jsx("span", { className: "text-winnex-blue mr-2", children: "\u2022" }), req] }, idx)))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "Current Leaders:" }), challenge.leaderboard.slice(0, 3).map((user, idx) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-gray-400", children: ["#", idx + 1] }), _jsx("span", { children: user.username })] }), _jsxs("span", { className: "text-winnex-green", children: ["$", user.profit.toLocaleString()] })] }, user.id)))] }), _jsx(Button, { onClick: () => joinChallengeMutation.mutate(challenge.id), disabled: challenge.joined || joinChallengeMutation.isPending, className: `w-full ${challenge.joined
                                                    ? 'bg-gray-600 text-gray-400'
                                                    : 'bg-winnex-green text-black hover:bg-green-400'}`, children: challenge.joined ? 'Already Joined' : 'Join Challenge' })] })] }, challenge.id))) }) }), _jsx(TabsContent, { value: "tipsters", className: "space-y-4", children: _jsx("div", { className: "grid md:grid-cols-2 gap-4", children: leaderboard.slice(0, 6).map((tipster) => (_jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: tipster.avatar }), _jsx(AvatarFallback, { children: tipster.username[0] })] }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium", children: tipster.username }), _jsx(Badge, { className: `${getTierColor(tipster.tier)} border-current`, children: getTierIcon(tipster.tier) })] }), _jsxs("div", { className: "text-sm text-gray-400", children: [tipster.followers.toLocaleString(), " followers"] })] }), _jsx(Button, { size: "sm", variant: tipster.following ? 'default' : 'outline', className: tipster.following ? 'bg-winnex-blue text-white' : 'border-gray-600', onClick: () => followMutation.mutate(tipster.id), children: tipster.following ? 'Following' : 'Follow' })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 text-center text-sm", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-bold text-winnex-green", children: [tipster.winRate, "%"] }), _jsx("div", { className: "text-gray-400", children: "Win Rate" })] }), _jsxs("div", { children: [_jsxs("div", { className: "font-bold text-blue-400", children: [tipster.roi, "%"] }), _jsx("div", { className: "text-gray-400", children: "ROI" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-yellow-400", children: tipster.totalBets }), _jsx("div", { className: "text-gray-400", children: "Bets" })] })] }), _jsx("div", { className: "flex items-center justify-center space-x-1 mt-3", children: tipster.badges.map((badge, idx) => (_jsx("span", { className: "text-lg", children: badge }, idx))) })] }) }, tipster.id))) }) })] })] }));
}
