import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Users, UserPlus, MessageSquare, Trophy, Crown, Share2, Heart, TrendingUp, Medal, Gift, Eye, Lock, Globe } from "lucide-react";
export default function SocialBettingPlatform() {
    const [selectedTab, setSelectedTab] = useState('feed');
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDescription, setNewGroupDescription] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: friends } = useQuery({
        queryKey: ['/api/social/friends'],
        refetchInterval: 60000,
    });
    const { data: groups } = useQuery({
        queryKey: ['/api/social/groups'],
    });
    const { data: sharedBets } = useQuery({
        queryKey: ['/api/social/shared-bets'],
        refetchInterval: 30000,
    });
    const { data: challenges } = useQuery({
        queryKey: ['/api/social/challenges'],
    });
    const { data: leaderboard } = useQuery({
        queryKey: ['/api/social/leaderboard'],
        refetchInterval: 300000,
    });
    // Mock data for demonstration
    const mockFriends = [
        {
            id: '1',
            username: 'betking_mike',
            displayName: 'Mike Rodriguez',
            avatar: 'https://via.placeholder.com/40',
            status: 'online',
            winRate: 68.5,
            totalBets: 247,
            profit: 2340.50,
            rank: 12,
            lastActive: 'Online now',
            isFollowing: true,
            mutualFriends: 15,
            achievements: ['🔥', '💎', '🏆']
        },
        {
            id: '2',
            username: 'sports_sarah',
            displayName: 'Sarah Chen',
            avatar: 'https://via.placeholder.com/40',
            status: 'betting',
            winRate: 72.1,
            totalBets: 189,
            profit: 1890.25,
            rank: 8,
            lastActive: '5 minutes ago',
            isFollowing: true,
            mutualFriends: 22,
            achievements: ['⭐', '🎯', '💰']
        }
    ];
    const mockGroups = [
        {
            id: '1',
            name: 'NFL Pro Bettors',
            description: 'Elite NFL betting community with verified track records',
            avatar: 'https://via.placeholder.com/60',
            memberCount: 1247,
            isPrivate: false,
            adminId: 'admin1',
            adminName: 'ProFootballGuru',
            totalVolume: 2450000,
            avgWinRate: 64.2,
            createdAt: '2023-09-15',
            tags: ['NFL', 'Pro', 'High Stakes'],
            recentActivity: [
                {
                    id: '1',
                    type: 'big_win',
                    username: 'betking_mike',
                    message: 'Just hit a 10-leg parlay for $12,500!',
                    timestamp: '2 hours ago'
                }
            ],
            leaderboard: [
                {
                    id: '1',
                    username: 'betking_mike',
                    avatar: 'https://via.placeholder.com/40',
                    winRate: 68.5,
                    profit: 15240,
                    betsShared: 45,
                    rank: 1,
                    badges: ['🔥', '💎']
                }
            ],
            isJoined: true,
            joinRequests: 0
        }
    ];
    const mockSharedBets = [
        {
            id: '1',
            userId: '1',
            username: 'betking_mike',
            avatar: 'https://via.placeholder.com/40',
            match: 'Chiefs vs Bills',
            selection: 'Chiefs -3.5',
            odds: 1.95,
            stake: 500,
            potentialWin: 975,
            timestamp: '2 hours ago',
            status: 'pending',
            likes: 24,
            comments: 8,
            isLiked: false,
            confidence: 85,
            tags: ['NFL', 'Playoffs'],
            reasoning: 'Chiefs have been dominant at home this season, and Bills struggling with injuries on defense.'
        }
    ];
    const mockChallenges = [
        {
            id: '1',
            title: 'January Madness',
            description: 'Highest profit wins $10,000 prize pool',
            createdBy: 'admin',
            creatorName: 'Winnex',
            participants: 847,
            maxParticipants: 1000,
            prize: 10000,
            entryFee: 25,
            startDate: '2024-01-01',
            endDate: '2024-01-31',
            status: 'active',
            rules: [
                'Minimum 20 bets to qualify',
                'All sports eligible',
                'Live betting counts',
                'Must maintain 50%+ win rate'
            ],
            leaderboard: [
                {
                    id: '1',
                    username: 'sports_sarah',
                    avatar: 'https://via.placeholder.com/40',
                    score: 2450,
                    bets: 34,
                    winRate: 72.1,
                    rank: 1
                }
            ],
            isJoined: true
        }
    ];
    const mockLeaderboard = [
        {
            id: '1',
            username: 'sports_sarah',
            avatar: 'https://via.placeholder.com/40',
            rank: 1,
            previousRank: 3,
            winRate: 72.1,
            profit: 15240.50,
            totalBets: 234,
            streak: 8,
            badges: ['👑', '🔥', '💎'],
            tier: 'diamond'
        },
        {
            id: '2',
            username: 'betking_mike',
            avatar: 'https://via.placeholder.com/40',
            rank: 2,
            previousRank: 1,
            winRate: 68.5,
            profit: 12890.25,
            totalBets: 247,
            streak: 3,
            badges: ['🏆', '⭐', '🎯'],
            tier: 'platinum'
        }
    ];
    const friendsList = friends || mockFriends;
    const groupsList = groups || mockGroups;
    const betsList = sharedBets || mockSharedBets;
    const challengesList = challenges || mockChallenges;
    const leaderboardList = leaderboard || mockLeaderboard;
    const addFriendMutation = useMutation({
        mutationFn: async (username) => {
            return apiRequest('POST', '/api/social/friends/add', { username });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/social/friends'] });
            toast({
                title: "Friend Request Sent",
                description: "Your friend request has been sent successfully",
            });
        },
    });
    const createGroupMutation = useMutation({
        mutationFn: async (groupData) => {
            return apiRequest('POST', '/api/social/groups', groupData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/social/groups'] });
            toast({
                title: "Group Created",
                description: "Your betting group has been created successfully",
            });
            setNewGroupName('');
            setNewGroupDescription('');
        },
    });
    const likeBetMutation = useMutation({
        mutationFn: async (betId) => {
            return apiRequest('POST', `/api/social/bets/${betId}/like`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/social/shared-bets'] });
        },
    });
    const getTierColor = (tier) => {
        switch (tier) {
            case 'diamond': return 'from-cyan-400 to-blue-500';
            case 'platinum': return 'from-gray-300 to-gray-500';
            case 'gold': return 'from-yellow-400 to-yellow-600';
            case 'silver': return 'from-gray-400 to-gray-600';
            default: return 'from-amber-600 to-orange-600';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'online': return _jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full" });
            case 'betting': return _jsx("div", { className: "w-3 h-3 bg-yellow-500 rounded-full animate-pulse" });
            default: return _jsx("div", { className: "w-3 h-3 bg-gray-500 rounded-full" });
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Social Betting Hub" }), _jsx("p", { className: "text-gray-400", children: "Connect, compete, and share winning strategies" })] }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Users, { className: "w-8 h-8 text-blue-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Friends" }), _jsx("div", { className: "text-2xl font-bold text-blue-500", children: friendsList.length })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Users, { className: "w-8 h-8 text-purple-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Groups" }), _jsx("div", { className: "text-2xl font-bold text-purple-500", children: groupsList.filter(g => g.isJoined).length })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Share2, { className: "w-8 h-8 text-green-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Shared Bets" }), _jsx("div", { className: "text-2xl font-bold text-green-500", children: "47" })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(Trophy, { className: "w-8 h-8 text-yellow-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Global Rank" }), _jsx("div", { className: "text-2xl font-bold text-yellow-500", children: "#142" })] }) })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5 bg-winnex-gray", children: [_jsx(TabsTrigger, { value: "feed", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Social Feed" }), _jsx(TabsTrigger, { value: "friends", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Friends" }), _jsx(TabsTrigger, { value: "groups", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Groups" }), _jsx(TabsTrigger, { value: "challenges", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Challenges" }), _jsx(TabsTrigger, { value: "leaderboard", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Leaderboard" })] }), _jsx(TabsContent, { value: "feed", className: "mt-6", children: _jsx("div", { className: "space-y-6", children: betsList.map((bet) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("img", { src: bet.avatar, alt: bet.username, className: "w-12 h-12 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-semibold text-white", children: bet.username }), _jsx(Badge, { className: "bg-blue-600 text-xs", children: "Shared a bet" })] }), _jsx("div", { className: "text-sm text-gray-400", children: bet.timestamp })] }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(Badge, { className: `text-xs ${bet.confidence >= 80 ? 'bg-green-600' :
                                                                        bet.confidence >= 60 ? 'bg-yellow-600' : 'bg-red-600'}`, children: [bet.confidence, "% confidence"] }) })] }), _jsxs("div", { className: "bg-gray-800 rounded-lg p-4 mb-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("div", { className: "text-white font-semibold text-lg", children: bet.match }), _jsx("div", { className: "flex gap-1", children: bet.tags.map((tag, index) => (_jsx(Badge, { className: "bg-purple-600 text-xs", children: tag }, index))) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Selection:" }), _jsx("div", { className: "text-white font-semibold", children: bet.selection })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Odds:" }), _jsx("div", { className: "text-white font-semibold", children: bet.odds.toFixed(2) })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Stake:" }), _jsxs("div", { className: "text-white font-semibold", children: ["$", bet.stake] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "To Win:" }), _jsxs("div", { className: "text-green-500 font-semibold", children: ["$", bet.potentialWin] })] })] }), bet.reasoning && (_jsx("div", { className: "mt-3 p-3 bg-gray-700 rounded", children: _jsx("div", { className: "text-sm text-gray-300", children: bet.reasoning }) }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: `flex items-center gap-2 ${bet.isLiked ? 'text-red-500' : 'text-gray-400'}`, onClick: () => likeBetMutation.mutate(bet.id), children: [_jsx(Heart, { className: `w-4 h-4 ${bet.isLiked ? 'fill-current' : ''}` }), bet.likes] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2 text-gray-400", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), bet.comments] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2 text-gray-400", children: [_jsx(Share2, { className: "w-4 h-4" }), "Share"] })] }), _jsx(Badge, { className: `${bet.status === 'pending' ? 'bg-blue-600' :
                                                                    bet.status === 'won' ? 'bg-green-600' : 'bg-red-600'}`, children: bet.status.toUpperCase() })] })] })] }) }) }, bet.id))) }) }), _jsxs(TabsContent, { value: "friends", className: "mt-6", children: [_jsx("div", { className: "mb-6", children: _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Add friend by username...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "bg-winnex-gray border-gray-600" }), _jsxs(Button, { className: "bg-winnex-green text-black", onClick: () => {
                                                        if (searchQuery.trim()) {
                                                            addFriendMutation.mutate(searchQuery.trim());
                                                            setSearchQuery('');
                                                        }
                                                    }, children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Add Friend"] })] }) }) }) }), _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: friendsList.map((friend) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsxs("div", { className: "relative", children: [_jsx("img", { src: friend.avatar, alt: friend.username, className: "w-12 h-12 rounded-full" }), _jsx("div", { className: "absolute -bottom-1 -right-1", children: getStatusIcon(friend.status) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-semibold text-white", children: friend.displayName }), _jsxs("div", { className: "text-sm text-gray-400", children: ["@", friend.username] }), _jsx("div", { className: "text-xs text-gray-500", children: friend.lastActive })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Rank" }), _jsxs("div", { className: "font-bold text-yellow-500", children: ["#", friend.rank] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm mb-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Win Rate:" }), _jsxs("div", { className: "text-white font-semibold", children: [friend.winRate, "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Profit:" }), _jsxs("div", { className: "text-green-500 font-semibold", children: ["$", friend.profit.toFixed(2)] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Total Bets:" }), _jsx("div", { className: "text-white font-semibold", children: friend.totalBets })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Mutual:" }), _jsx("div", { className: "text-blue-500 font-semibold", children: friend.mutualFriends })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex gap-1", children: friend.achievements.map((achievement, index) => (_jsx("span", { className: "text-lg", children: achievement }, index))) }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", className: "bg-blue-600 hover:bg-blue-700", children: _jsx(MessageSquare, { className: "w-4 h-4" }) }), _jsx(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700", children: _jsx(Eye, { className: "w-4 h-4" }) })] })] })] }) }, friend.id))) })] }), _jsxs(TabsContent, { value: "groups", className: "mt-6", children: [_jsx("div", { className: "mb-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Create New Group" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Input, { placeholder: "Group name...", value: newGroupName, onChange: (e) => setNewGroupName(e.target.value), className: "bg-winnex-gray border-gray-600" }), _jsx(Textarea, { placeholder: "Group description...", value: newGroupDescription, onChange: (e) => setNewGroupDescription(e.target.value), className: "bg-winnex-gray border-gray-600" }), _jsx(Button, { className: "bg-winnex-green text-black", onClick: () => createGroupMutation.mutate({
                                                        name: newGroupName,
                                                        description: newGroupDescription,
                                                        isPrivate: false
                                                    }), disabled: !newGroupName.trim() || !newGroupDescription.trim(), children: "Create Group" })] })] }) }), _jsx("div", { className: "grid md:grid-cols-2 gap-6", children: groupsList.map((group) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start gap-4 mb-4", children: [_jsx("img", { src: group.avatar, alt: group.name, className: "w-16 h-16 rounded-lg" }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("h3", { className: "text-white font-semibold text-lg", children: group.name }), group.isPrivate ? _jsx(Lock, { className: "w-4 h-4 text-gray-400" }) : _jsx(Globe, { className: "w-4 h-4 text-green-400" })] }), _jsx("p", { className: "text-gray-400 text-sm mb-2", children: group.description }), _jsx("div", { className: "flex gap-1 mb-2", children: group.tags.map((tag, index) => (_jsx(Badge, { className: "bg-purple-600 text-xs", children: tag }, index))) }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Created by ", group.adminName, " \u2022 ", group.createdAt] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4 text-sm mb-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Members:" }), _jsx("div", { className: "text-white font-semibold", children: group.memberCount.toLocaleString() })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Win Rate:" }), _jsxs("div", { className: "text-green-500 font-semibold", children: [group.avgWinRate, "%"] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Volume:" }), _jsxs("div", { className: "text-blue-500 font-semibold", children: ["$", (group.totalVolume / 1000000).toFixed(1), "M"] })] })] }), group.recentActivity.length > 0 && (_jsxs("div", { className: "mb-4 p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Recent Activity" }), _jsxs("div", { className: "text-sm text-white", children: [_jsx("span", { className: "font-semibold text-green-400", children: group.recentActivity[0].username }), ' ', group.recentActivity[0].message] }), _jsx("div", { className: "text-xs text-gray-500", children: group.recentActivity[0].timestamp })] })), _jsx("div", { className: "flex gap-2", children: group.isJoined ? (_jsxs(_Fragment, { children: [_jsxs(Button, { className: "flex-1 bg-blue-600 hover:bg-blue-700", children: [_jsx(MessageSquare, { className: "w-4 h-4 mr-2" }), "Open Chat"] }), _jsx(Button, { variant: "outline", className: "border-red-500 text-red-500", children: "Leave" })] })) : (_jsxs(Button, { className: "flex-1 bg-winnex-green text-black", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Join Group"] })) })] }) }, group.id))) })] }), _jsx(TabsContent, { value: "challenges", className: "mt-6", children: _jsx("div", { className: "space-y-6", children: challengesList.map((challenge) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-white font-semibold text-xl mb-2", children: challenge.title }), _jsx("p", { className: "text-gray-400 mb-2", children: challenge.description }), _jsxs("div", { className: "text-sm text-gray-500", children: ["Created by ", challenge.creatorName] })] }), _jsx(Badge, { className: `${challenge.status === 'active' ? 'bg-green-600' :
                                                        challenge.status === 'upcoming' ? 'bg-blue-600' : 'bg-gray-600'}`, children: challenge.status.toUpperCase() })] }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-yellow-500", children: ["$", challenge.prize.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Prize Pool" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-500", children: challenge.participants }), _jsx("div", { className: "text-sm text-gray-400", children: "Participants" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-500", children: ["$", challenge.entryFee] }), _jsx("div", { className: "text-sm text-gray-400", children: "Entry Fee" })] }), _jsxs("div", { className: "text-center p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-500", children: Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) }), _jsx("div", { className: "text-sm text-gray-400", children: "Days Left" })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "text-white font-semibold mb-2", children: "Rules:" }), _jsx("ul", { className: "text-sm text-gray-400 space-y-1", children: challenge.rules.map((rule, index) => (_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-green-400 mt-1", children: "\u2022" }), rule] }, index))) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-sm text-gray-400", children: [challenge.startDate, " - ", challenge.endDate] }), challenge.isJoined ? (_jsx(Badge, { className: "bg-green-600", children: "Joined" })) : (_jsxs(Button, { className: "bg-winnex-green text-black", children: [_jsx(Gift, { className: "w-4 h-4 mr-2" }), "Join Challenge"] }))] })] }) }, challenge.id))) }) }), _jsx(TabsContent, { value: "leaderboard", className: "mt-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(Trophy, { className: "w-5 h-5 text-yellow-500" }), "Global Leaderboard"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: leaderboardList.map((entry, index) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `w-12 h-12 bg-gradient-to-br ${getTierColor(entry.tier)} rounded-full flex items-center justify-center text-white font-bold text-lg`, children: entry.rank }), entry.rank <= 3 && (_jsx("div", { className: "absolute -top-1 -right-1", children: entry.rank === 1 ? _jsx(Crown, { className: "w-6 h-6 text-yellow-500" }) :
                                                                        entry.rank === 2 ? _jsx(Medal, { className: "w-6 h-6 text-gray-400" }) :
                                                                            _jsx(Medal, { className: "w-6 h-6 text-amber-600" }) }))] }), _jsx("img", { src: entry.avatar, alt: entry.username, className: "w-10 h-10 rounded-full" }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-white font-semibold", children: entry.username }), _jsx("div", { className: "flex gap-1", children: entry.badges.map((badge, index) => (_jsx("span", { className: "text-sm", children: badge }, index))) })] }), _jsxs("div", { className: "text-sm text-gray-400", children: [entry.totalBets, " bets \u2022 ", entry.streak, " win streak"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsxs("span", { className: "text-green-500 font-bold", children: ["$", entry.profit.toFixed(2)] }), entry.rank < entry.previousRank ? (_jsx(TrendingUp, { className: "w-4 h-4 text-green-500" })) : entry.rank > entry.previousRank ? (_jsx(TrendingUp, { className: "w-4 h-4 text-red-500 rotate-180" })) : (_jsx("div", { className: "w-4 h-4" }))] }), _jsxs("div", { className: "text-sm text-gray-400", children: [entry.winRate, "% win rate"] })] })] }, entry.id))) }) })] }) })] })] }));
}
