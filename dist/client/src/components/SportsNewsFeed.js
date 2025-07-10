import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ExternalLink, TrendingUp, Zap, BookOpen } from "lucide-react";
export default function SportsNewsFeed() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [liveUpdates, setLiveUpdates] = useState(true);
    const { data: newsData, refetch } = useQuery({
        queryKey: ['/api/sports/news', selectedCategory],
        refetchInterval: liveUpdates ? 60000 : false, // Update every minute if live updates enabled
    });
    const { data: marketMovements } = useQuery({
        queryKey: ['/api/sports/market-movements'],
        refetchInterval: 30000, // Update every 30 seconds
    });
    // Mock data for demonstration
    const mockNews = [
        {
            id: "1",
            title: "Chiefs Secure Playoff Spot with Dominant Win",
            summary: "Kansas City Chiefs clinch AFC West division with a commanding 31-14 victory over Denver Broncos",
            content: "The Kansas City Chiefs secured their playoff berth with a stellar performance...",
            author: "Mike Johnson",
            publishedAt: "2024-01-15T18:30:00Z",
            category: "breaking",
            sport: "Football",
            tags: ["NFL", "Playoffs", "Chiefs", "AFC West"],
            readTime: 3,
            trending: true,
            reactions: { likes: 1247, shares: 456, comments: 89 },
            source: { name: "ESPN", logo: "📺", verified: true }
        },
        {
            id: "2",
            title: "Lakers Star Questionable for Tonight's Game",
            summary: "LeBron James listed as questionable with ankle injury ahead of crucial matchup",
            content: "Los Angeles Lakers superstar LeBron James is dealing with a minor ankle...",
            author: "Sarah Wilson",
            publishedAt: "2024-01-15T16:45:00Z",
            category: "injury",
            sport: "Basketball",
            tags: ["NBA", "Lakers", "LeBron James", "Injury Report"],
            readTime: 2,
            trending: false,
            reactions: { likes: 892, shares: 234, comments: 67 },
            source: { name: "The Athletic", logo: "🏀", verified: true }
        },
        {
            id: "3",
            title: "Manchester City Eyes Summer Transfer Target",
            summary: "Premier League champions reportedly preparing €80M bid for Brazilian midfielder",
            content: "Manchester City are set to make a significant move in the transfer market...",
            author: "David Rodriguez",
            publishedAt: "2024-01-15T14:20:00Z",
            category: "transfer",
            sport: "Soccer",
            tags: ["Premier League", "Man City", "Transfer", "Brazil"],
            readTime: 4,
            trending: true,
            reactions: { likes: 2156, shares: 892, comments: 234 },
            source: { name: "Sky Sports", logo: "⚽", verified: true }
        }
    ];
    const mockMovements = [
        {
            matchId: 1,
            team: "Chiefs",
            movement: "up",
            percentage: 15,
            reason: "Key player return from injury",
            timestamp: "2024-01-15T18:00:00Z"
        },
        {
            matchId: 2,
            team: "Lakers",
            movement: "down",
            percentage: 8,
            reason: "Star player injury concern",
            timestamp: "2024-01-15T17:30:00Z"
        }
    ];
    const news = newsData || mockNews;
    const movements = marketMovements || mockMovements;
    const getCategoryIcon = (category) => {
        switch (category) {
            case 'breaking': return '🚨';
            case 'analysis': return '📊';
            case 'injury': return '🏥';
            case 'transfer': return '↔️';
            case 'match_preview': return '👁️';
            default: return '📰';
        }
    };
    const getCategoryColor = (category) => {
        switch (category) {
            case 'breaking': return 'bg-red-600';
            case 'analysis': return 'bg-blue-600';
            case 'injury': return 'bg-orange-600';
            case 'transfer': return 'bg-green-600';
            case 'match_preview': return 'bg-purple-600';
            default: return 'bg-gray-600';
        }
    };
    const timeAgo = (dateString) => {
        const now = new Date();
        const published = new Date(dateString);
        const diffMs = now.getTime() - published.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        if (diffMins < 60)
            return `${diffMins}m ago`;
        if (diffHours < 24)
            return `${diffHours}h ago`;
        return published.toLocaleDateString();
    };
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(BookOpen, { className: "w-5 h-5 text-blue-500" }), "Sports News Feed"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${liveUpdates ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}` }), _jsx("span", { className: "text-sm text-gray-400", children: liveUpdates ? 'Live' : 'Paused' }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => setLiveUpdates(!liveUpdates), className: "text-xs", children: liveUpdates ? 'Pause' : 'Resume' })] })] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "news", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-gray-800", children: [_jsx(TabsTrigger, { value: "news", className: "text-white", children: "Latest News" }), _jsx(TabsTrigger, { value: "trending", className: "text-white", children: "Trending" }), _jsx(TabsTrigger, { value: "movements", className: "text-white", children: "Market Moves" })] }), _jsxs(TabsContent, { value: "news", className: "space-y-4", children: [_jsx("div", { className: "flex flex-wrap gap-2 mb-4", children: ['all', 'breaking', 'analysis', 'injury', 'transfer', 'match_preview'].map((category) => (_jsxs(Button, { size: "sm", variant: selectedCategory === category ? "default" : "outline", onClick: () => setSelectedCategory(category), className: "capitalize", children: [getCategoryIcon(category), " ", category === 'all' ? 'All' : category.replace('_', ' ')] }, category))) }), _jsx("div", { className: "space-y-4", children: news
                                            .filter(article => selectedCategory === 'all' || article.category === selectedCategory)
                                            .map((article) => (_jsx(Card, { className: "bg-gray-800 border-gray-600 hover:bg-gray-750 transition-colors", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "text-2xl", children: getCategoryIcon(article.category) }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx(Badge, { className: `${getCategoryColor(article.category)} text-white`, children: article.category.replace('_', ' ') }), _jsx(Badge, { variant: "outline", className: "text-gray-400", children: article.sport }), article.trending && (_jsxs(Badge, { className: "bg-orange-600 text-white animate-pulse", children: [_jsx(TrendingUp, { className: "w-3 h-3 mr-1" }), "Trending"] }))] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [_jsx("span", { children: article.source.logo }), _jsx("span", { children: article.source.name }), article.source.verified && _jsx("span", { className: "text-blue-400", children: "\u2713" })] })] }), _jsx("h3", { className: "text-white font-semibold text-lg hover:text-winnex-green cursor-pointer", children: article.title }), _jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: article.summary }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), timeAgo(article.publishedAt)] }), _jsxs("span", { children: [article.readTime, " min read"] }), _jsxs("span", { children: ["By ", article.author] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "flex items-center gap-1", children: ["\uD83D\uDC4D ", article.reactions.likes] }), _jsxs("span", { className: "flex items-center gap-1", children: ["\uD83D\uDCE4 ", article.reactions.shares] }), _jsxs("span", { className: "flex items-center gap-1", children: ["\uD83D\uDCAC ", article.reactions.comments] }), _jsx(Button, { size: "sm", variant: "ghost", className: "text-gray-400 hover:text-white", children: _jsx(ExternalLink, { className: "w-3 h-3" }) })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: article.tags.slice(0, 4).map((tag, index) => (_jsxs("span", { className: "text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded", children: ["#", tag] }, index))) })] })] }) }) }, article.id))) })] }), _jsx(TabsContent, { value: "trending", className: "space-y-4", children: _jsx("div", { className: "space-y-4", children: news
                                        .filter(article => article.trending)
                                        .sort((a, b) => b.reactions.likes - a.reactions.likes)
                                        .map((article, index) => (_jsx(Card, { className: "bg-gray-800 border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-2xl font-bold text-orange-500", children: ["#", index + 1] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-white font-semibold", children: article.title }), _jsxs("div", { className: "flex items-center gap-4 text-sm text-gray-400 mt-1", children: [_jsx("span", { children: article.sport }), _jsxs("span", { children: ["\uD83D\uDC4D ", article.reactions.likes.toLocaleString()] }), _jsxs("span", { children: ["\uD83D\uDCE4 ", article.reactions.shares] }), _jsx("span", { children: timeAgo(article.publishedAt) })] })] }), _jsx(TrendingUp, { className: "w-5 h-5 text-orange-500 animate-bounce" })] }) }) }, article.id))) }) }), _jsx(TabsContent, { value: "movements", className: "space-y-4", children: _jsx("div", { className: "space-y-4", children: movements.map((movement, index) => (_jsx(Card, { className: "bg-gray-800 border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-12 h-12 rounded-full flex items-center justify-center ${movement.movement === 'up' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`, children: movement.movement === 'up' ? '📈' : '📉' }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-white font-semibold", children: movement.team }), _jsxs(Badge, { className: movement.movement === 'up' ? 'bg-green-600' : 'bg-red-600', children: [movement.movement === 'up' ? '+' : '-', movement.percentage, "%"] })] }), _jsx("p", { className: "text-gray-400 text-sm", children: movement.reason }), _jsx("span", { className: "text-xs text-gray-500", children: timeAgo(movement.timestamp) })] }), _jsx(Zap, { className: "w-5 h-5 text-yellow-500" })] }) }) }, index))) }) })] }) })] }) }));
}
