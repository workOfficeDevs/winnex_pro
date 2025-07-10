import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Trophy, Users, Star, Target, Clock, TrendingUp, Zap } from "lucide-react";
export default function FantasySports() {
    const [leagues, setLeagues] = useState([]);
    const [contests, setContests] = useState([]);
    const [myTeams, setMyTeams] = useState([]);
    const [playerPool, setPlayerPool] = useState([]);
    const [userStats, setUserStats] = useState(null);
    const [selectedSport, setSelectedSport] = useState('nfl');
    useEffect(() => {
        const mockLeagues = [
            {
                id: 'league_1',
                name: 'Sunday Million',
                sport: 'NFL',
                format: 'weekly',
                entryFee: 25,
                prizePool: 1000000,
                participants: 38420,
                maxParticipants: 50000,
                startTime: '2024-01-21 13:00',
                status: 'upcoming',
                difficulty: 'expert'
            },
            {
                id: 'league_2',
                name: 'NBA Showdown',
                sport: 'NBA',
                format: 'daily',
                entryFee: 5,
                prizePool: 100000,
                participants: 15280,
                maxParticipants: 20000,
                startTime: '2024-01-16 19:00',
                status: 'live',
                difficulty: 'intermediate'
            },
            {
                id: 'league_3',
                name: 'Soccer Champions',
                sport: 'Soccer',
                format: 'weekly',
                entryFee: 10,
                prizePool: 50000,
                participants: 4850,
                maxParticipants: 10000,
                startTime: '2024-01-20 12:00',
                status: 'upcoming',
                difficulty: 'beginner'
            }
        ];
        const mockContests = [
            {
                id: 'contest_1',
                name: 'GPP Millionaire Maker',
                sport: 'NFL',
                entryFee: 20,
                totalPrizes: 1000000,
                entries: 42350,
                maxEntries: 50000,
                startTime: '2024-01-21 13:00',
                guaranteed: true,
                prizes: [
                    { rank: '1st', prize: 200000, winners: 1 },
                    { rank: '2nd', prize: 100000, winners: 1 },
                    { rank: '3rd', prize: 50000, winners: 1 },
                    { rank: '4th-10th', prize: 10000, winners: 7 },
                    { rank: '11th-100th', prize: 1000, winners: 90 }
                ]
            }
        ];
        const mockPlayerPool = [
            {
                id: 'player_1',
                name: 'Josh Allen',
                team: 'BUF',
                position: 'QB',
                salary: 8500,
                projectedPoints: 22.5,
                actualPoints: 24.2,
                ownership: 18.5,
                isInjured: false,
                gameInfo: {
                    opponent: 'KC',
                    homeAway: 'home',
                    gameTime: '2024-01-21 15:30'
                }
            },
            {
                id: 'player_2',
                name: 'Christian McCaffrey',
                team: 'SF',
                position: 'RB',
                salary: 9200,
                projectedPoints: 20.8,
                ownership: 25.3,
                isInjured: false,
                gameInfo: {
                    opponent: 'DAL',
                    homeAway: 'away',
                    gameTime: '2024-01-21 16:25'
                }
            },
            {
                id: 'player_3',
                name: 'Cooper Kupp',
                team: 'LAR',
                position: 'WR',
                salary: 7800,
                projectedPoints: 18.2,
                ownership: 15.7,
                isInjured: true,
                gameInfo: {
                    opponent: 'TB',
                    homeAway: 'home',
                    gameTime: '2024-01-21 13:00'
                }
            }
        ];
        const mockUserStats = {
            totalEarnings: 3250,
            totalEntries: 156,
            winRate: 22.4,
            averageFinish: 4250,
            bestFinish: 1,
            favoritePlayer: 'Josh Allen',
            currentStreak: 3,
            monthlyStats: {
                entries: 24,
                winnings: 485,
                topFinishes: 5
            }
        };
        const mockMyTeams = [
            {
                id: 'team_1',
                name: 'Championship Squad',
                leagueId: 'league_1',
                players: mockPlayerPool,
                totalSalary: 49500,
                salaryCap: 50000,
                currentPoints: 145.8,
                projectedPoints: 142.5,
                rank: 1250,
                isOptimal: false
            }
        ];
        setLeagues(mockLeagues);
        setContests(mockContests);
        setPlayerPool(mockPlayerPool);
        setUserStats(mockUserStats);
        setMyTeams(mockMyTeams);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'live': return 'bg-red-500';
            case 'upcoming': return 'bg-blue-500';
            case 'completed': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner': return 'text-green-400';
            case 'intermediate': return 'text-yellow-400';
            case 'expert': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getPositionColor = (position) => {
        switch (position) {
            case 'QB': return 'text-red-400';
            case 'RB': return 'text-green-400';
            case 'WR': return 'text-blue-400';
            case 'TE': return 'text-purple-400';
            case 'K': return 'text-yellow-400';
            case 'DEF': return 'text-orange-400';
            default: return 'text-gray-400';
        }
    };
    if (!userStats)
        return null;
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Trophy, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Fantasy Sports" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Build your dream team and compete for massive prizes" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-3xl font-bold text-emerald-400", children: ["$", userStats.totalEarnings.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Winnings" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-3xl font-bold text-blue-400", children: [userStats.winRate, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Win Rate" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-3xl font-bold text-purple-400", children: userStats.bestFinish }), _jsx("div", { className: "text-sm text-gray-400", children: "Best Finish" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-3xl font-bold text-orange-400", children: userStats.currentStreak }), _jsx("div", { className: "text-sm text-gray-400", children: "Win Streak" })] }) })] }), _jsxs(Tabs, { defaultValue: "contests", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "contests", className: "flex items-center", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2" }), "Contests"] }), _jsxs(TabsTrigger, { value: "my-teams", className: "flex items-center", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "My Teams"] }), _jsxs(TabsTrigger, { value: "player-pool", className: "flex items-center", children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "Players"] }), _jsxs(TabsTrigger, { value: "research", className: "flex items-center", children: [_jsx(Target, { className: "w-4 h-4 mr-2" }), "Research"] })] }), _jsx(TabsContent, { value: "contests", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: leagues.map((league) => (_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white text-xl", children: league.name }), _jsxs("div", { className: "flex items-center space-x-3 mt-2", children: [_jsx(Badge, { variant: "outline", children: league.sport }), _jsx(Badge, { variant: "outline", className: "capitalize", children: league.format }), _jsx(Badge, { className: getStatusColor(league.status), children: league.status.toUpperCase() }), _jsx(Badge, { variant: "outline", className: getDifficultyColor(league.difficulty), children: league.difficulty })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: ["$", league.prizePool.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Prize Pool" })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Entry Fee: " }), _jsxs("span", { className: "text-white font-semibold", children: ["$", league.entryFee] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Participants: " }), _jsx("span", { className: "text-white", children: league.participants.toLocaleString() })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Max: " }), _jsx("span", { className: "text-white", children: league.maxParticipants.toLocaleString() })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Starts: " }), _jsx("span", { className: "text-white", children: league.startTime })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-gray-400", children: "Contest Fill" }), _jsxs("span", { className: "text-white", children: [Math.round((league.participants / league.maxParticipants) * 100), "%"] })] }), _jsx(Progress, { value: (league.participants / league.maxParticipants) * 100, className: "h-2" })] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { className: "flex-1 bg-emerald-500 hover:bg-emerald-600", children: "Enter Contest" }), _jsx(Button, { variant: "outline", className: "flex-1", children: "View Details" })] })] })] }, league.id))) }) }), _jsx(TabsContent, { value: "my-teams", className: "space-y-6", children: myTeams.length > 0 ? (_jsx("div", { className: "grid gap-6", children: myTeams.map((team) => (_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: team.name }), _jsxs("p", { className: "text-gray-400", children: ["Rank: #", team.rank.toLocaleString(), " \u2022 ", team.currentPoints, " points"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-xl font-bold text-emerald-400", children: ["$", (team.salaryCap - team.totalSalary).toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Remaining" })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-white", children: team.currentPoints }), _jsx("div", { className: "text-sm text-gray-400", children: "Current Points" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-lg font-bold text-blue-400", children: team.projectedPoints }), _jsx("div", { className: "text-sm text-gray-400", children: "Projected" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-lg font-bold text-purple-400", children: ["#", team.rank] }), _jsx("div", { className: "text-sm text-gray-400", children: "Current Rank" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold text-white", children: "Lineup" }), team.players.map((player) => (_jsxs("div", { className: "flex items-center justify-between p-2 bg-gray-800 rounded", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: getPositionColor(player.position), children: player.position }), _jsxs("div", { children: [_jsx("span", { className: "text-white font-medium", children: player.name }), _jsxs("span", { className: "text-gray-400 ml-2", children: ["(", player.team, ")"] }), player.isInjured && (_jsx(Badge, { variant: "destructive", className: "ml-2 text-xs", children: "INJ" }))] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-white font-semibold", children: [player.actualPoints || player.projectedPoints, " pts"] }), _jsxs("div", { className: "text-sm text-gray-400", children: ["$", player.salary] })] })] }, player.id)))] }), _jsxs("div", { className: "flex space-x-3", children: [_jsx(Button, { className: "flex-1 bg-blue-500 hover:bg-blue-600", children: "Edit Lineup" }), _jsx(Button, { variant: "outline", className: "flex-1", children: "View Contest" })] })] })] }, team.id))) })) : (_jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-12", children: [_jsx(Users, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "No Teams Yet" }), _jsx("p", { className: "text-gray-400 mb-6", children: "Create your first fantasy team to start competing" }), _jsx(Button, { className: "bg-emerald-500 hover:bg-emerald-600", children: "Create Team" })] }) })) }), _jsx(TabsContent, { value: "player-pool", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-white", children: "Player Pool" }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs("select", { className: "bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white text-sm", children: [_jsx("option", { value: "all", children: "All Positions" }), _jsx("option", { value: "QB", children: "Quarterbacks" }), _jsx("option", { value: "RB", children: "Running Backs" }), _jsx("option", { value: "WR", children: "Wide Receivers" }), _jsx("option", { value: "TE", children: "Tight Ends" })] }), _jsxs("select", { className: "bg-gray-800 border border-gray-700 rounded px-3 py-1 text-white text-sm", children: [_jsx("option", { value: "salary", children: "Sort by Salary" }), _jsx("option", { value: "projected", children: "Sort by Projection" }), _jsx("option", { value: "ownership", children: "Sort by Ownership" })] })] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: playerPool.map((player) => (_jsx(Card, { className: "border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Badge, { className: getPositionColor(player.position), children: player.position }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-semibold text-white", children: player.name }), _jsxs("span", { className: "text-gray-400", children: ["(", player.team, ")"] }), player.isInjured && (_jsx(Badge, { variant: "destructive", className: "text-xs", children: "INJURED" }))] }), _jsxs("div", { className: "text-sm text-gray-400", children: ["vs ", player.gameInfo.opponent, " \u2022 ", player.gameInfo.gameTime] })] })] }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-emerald-400", children: player.projectedPoints }), _jsx("div", { className: "text-xs text-gray-400", children: "Projected" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-white", children: ["$", player.salary.toLocaleString()] }), _jsx("div", { className: "text-xs text-gray-400", children: "Salary" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-blue-400", children: [player.ownership, "%"] }), _jsx("div", { className: "text-xs text-gray-400", children: "Ownership" })] }), _jsx(Button, { size: "sm", className: "bg-emerald-500 hover:bg-emerald-600", children: "Add" })] })] }) }) }, player.id))) }) })] }) }), _jsx(TabsContent, { value: "research", className: "space-y-6", children: _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Research Tools" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs(Button, { className: "w-full bg-blue-500 hover:bg-blue-600", children: [_jsx(TrendingUp, { className: "w-4 h-4 mr-2" }), "Lineup Optimizer"] }), _jsxs(Button, { className: "w-full bg-purple-500 hover:bg-purple-600", children: [_jsx(Target, { className: "w-4 h-4 mr-2" }), "Matchup Analysis"] }), _jsxs(Button, { className: "w-full bg-orange-500 hover:bg-orange-600", children: [_jsx(Clock, { className: "w-4 h-4 mr-2" }), "Weather Reports"] }), _jsxs(Button, { className: "w-full bg-green-500 hover:bg-green-600", children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Injury Reports"] })] })] }), _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Expert Picks" }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs("div", { className: "p-3 bg-gray-800 rounded", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-white font-medium", children: "Josh Allen (QB)" }), _jsx(Badge, { className: "bg-green-500", children: "BUY" })] }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Great matchup vs weak secondary, projected 25+ points" })] }), _jsxs("div", { className: "p-3 bg-gray-800 rounded", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-white font-medium", children: "Cooper Kupp (WR)" }), _jsx(Badge, { className: "bg-red-500", children: "AVOID" })] }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: "Injury concerns and tough matchup, consider alternatives" })] }), _jsxs("div", { className: "p-3 bg-gray-800 rounded", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-white font-medium", children: "Christian McCaffrey (RB)" }), _jsx(Badge, { className: "bg-yellow-500", children: "HOLD" })] }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: "High ownership but proven floor, tournament play dependent" })] })] })] })] }) })] })] }));
}
