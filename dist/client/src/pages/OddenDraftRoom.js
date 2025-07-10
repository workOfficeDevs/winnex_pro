import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingUp, TrendingDown, Star, Plus, Minus, Users, Search } from "lucide-react";
import { motion } from "framer-motion";
import OddenNav from "@/components/OddenNav";
export default function OddenDraftRoom() {
    const [lineup, setLineup] = useState([]);
    const [remainingSalary, setRemainingSalary] = useState(50000);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPosition, setSelectedPosition] = useState("all");
    const [selectedTeam, setSelectedTeam] = useState("all");
    const [sortBy, setSortBy] = useState("projectedPoints");
    const players = [
        {
            id: 1,
            name: "Josh Allen",
            team: "BUF",
            position: "QB",
            salary: 8500,
            projectedPoints: 22.4,
            ownership: 15.2,
            trend: 'up',
            injury: null,
            news: ["Expected to have big game vs weak defense", "Weather conditions favorable"]
        },
        {
            id: 2,
            name: "Patrick Mahomes",
            team: "KC",
            position: "QB",
            salary: 9200,
            projectedPoints: 24.1,
            ownership: 18.7,
            trend: 'stable',
            injury: null,
            news: ["Home field advantage", "Top target Travis Kelce likely to play"]
        },
        {
            id: 3,
            name: "Christian McCaffrey",
            team: "SF",
            position: "RB",
            salary: 9000,
            projectedPoints: 21.8,
            ownership: 22.4,
            trend: 'up',
            injury: null,
            news: ["Fully healthy", "Favorable matchup against run defense"]
        },
        {
            id: 4,
            name: "Derrick Henry",
            team: "TEN",
            position: "RB",
            salary: 7800,
            projectedPoints: 18.6,
            ownership: 12.8,
            trend: 'down',
            injury: "Questionable",
            news: ["Dealing with minor ankle injury", "Expected to play limited snaps"]
        },
        {
            id: 5,
            name: "Tyreek Hill",
            team: "MIA",
            position: "WR",
            salary: 8200,
            projectedPoints: 19.2,
            ownership: 16.9,
            trend: 'up',
            injury: null,
            news: ["Excellent weather conditions", "Primary target for Tua"]
        },
        {
            id: 6,
            name: "Travis Kelce",
            team: "KC",
            position: "TE",
            salary: 7500,
            projectedPoints: 16.8,
            ownership: 19.1,
            trend: 'stable',
            injury: null,
            news: ["Red zone target", "Mahomes' favorite weapon"]
        }
    ];
    const positions = ["QB", "RB", "WR", "TE", "FLEX", "DST", "K"];
    const teams = ["BUF", "KC", "SF", "TEN", "MIA", "DAL", "NE", "NYG"];
    const addToLineup = (player) => {
        if (lineup.length < 9 && remainingSalary >= player.salary) {
            setLineup([...lineup, player]);
            setRemainingSalary(remainingSalary - player.salary);
        }
    };
    const removeFromLineup = (playerId) => {
        const player = lineup.find(p => p.id === playerId);
        if (player) {
            setLineup(lineup.filter(p => p.id !== playerId));
            setRemainingSalary(remainingSalary + player.salary);
        }
    };
    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.team.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = selectedPosition === "all" || player.position === selectedPosition;
        const matchesTeam = selectedTeam === "all" || player.team === selectedTeam;
        return matchesSearch && matchesPosition && matchesTeam;
    });
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
        switch (sortBy) {
            case "projectedPoints":
                return b.projectedPoints - a.projectedPoints;
            case "salary":
                return b.salary - a.salary;
            case "value":
                return (b.projectedPoints / b.salary * 1000) - (a.projectedPoints / a.salary * 1000);
            case "ownership":
                return a.ownership - b.ownership;
            default:
                return 0;
        }
    });
    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return _jsx(TrendingUp, { className: "w-4 h-4 text-green-400" });
            case 'down': return _jsx(TrendingDown, { className: "w-4 h-4 text-red-400" });
            default: return _jsx("div", { className: "w-4 h-4" });
        }
    };
    const getPositionColor = (position) => {
        switch (position) {
            case 'QB': return 'bg-purple-600';
            case 'RB': return 'bg-green-600';
            case 'WR': return 'bg-blue-600';
            case 'TE': return 'bg-orange-600';
            default: return 'bg-gray-600';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "Draft Room" }), _jsx("p", { className: "text-emerald-300", children: "NFL Sunday Showdown - $25 Entry" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-emerald-400 font-semibold", children: "Remaining Salary" }), _jsxs("div", { className: "text-2xl font-bold text-white", children: ["$", remainingSalary.toLocaleString()] })] }), _jsx(Button, { className: "bg-emerald-600 hover:bg-emerald-700", children: "Enter Contest" })] })] }) }) }), _jsx("div", { className: "max-w-7xl mx-auto px-6 py-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsxs(Card, { className: "bg-black/50 border-emerald-500/30 sticky top-6", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Users, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Your Lineup"] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-emerald-300", children: ["Players: ", lineup.length, "/9"] }), _jsxs("span", { className: "text-emerald-300", children: ["Projected: ", lineup.reduce((sum, p) => sum + p.projectedPoints, 0).toFixed(1)] })] })] }), _jsxs(CardContent, { className: "space-y-3", children: [positions.map((position, index) => {
                                                const positionPlayer = lineup.find(p => p.position === position);
                                                return (_jsxs(motion.div, { className: "flex items-center justify-between p-3 bg-black/30 rounded-lg", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: `${getPositionColor(position)} text-white w-10 justify-center`, children: position }), positionPlayer ? (_jsxs("div", { children: [_jsx("div", { className: "text-white font-semibold", children: positionPlayer.name }), _jsxs("div", { className: "text-emerald-300 text-sm", children: [positionPlayer.team, " \u2022 $", positionPlayer.salary] })] })) : (_jsx("div", { className: "text-emerald-400", children: "Select Player" }))] }), positionPlayer && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => removeFromLineup(positionPlayer.id), className: "border-red-500 text-red-400 hover:bg-red-500 hover:text-white", children: _jsx(Minus, { className: "w-4 h-4" }) }))] }, position));
                                            }), _jsxs("div", { className: "pt-4 border-t border-emerald-500/30", children: [_jsxs("div", { className: "flex justify-between mb-2", children: [_jsx("span", { className: "text-emerald-300", children: "Salary Used" }), _jsxs("span", { className: "text-white font-semibold", children: ["$", (50000 - remainingSalary).toLocaleString()] })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-3", children: _jsx("div", { className: "bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full", style: { width: `${((50000 - remainingSalary) / 50000) * 100}%` } }) })] })] })] }) }), _jsxs("div", { className: "lg:col-span-2", children: [_jsx(Card, { className: "bg-black/50 border-emerald-500/30 mb-6", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsxs("div", { className: "relative flex-1 min-w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-4 h-4" }), _jsx(Input, { placeholder: "Search players...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10 bg-black/50 border-emerald-500/30 text-white" })] }), _jsxs("select", { value: selectedPosition, onChange: (e) => setSelectedPosition(e.target.value), className: "bg-black/50 border border-emerald-500/30 text-white px-3 py-2 rounded-md", children: [_jsx("option", { value: "all", children: "All Positions" }), positions.map(pos => (_jsx("option", { value: pos, children: pos }, pos)))] }), _jsxs("select", { value: selectedTeam, onChange: (e) => setSelectedTeam(e.target.value), className: "bg-black/50 border border-emerald-500/30 text-white px-3 py-2 rounded-md", children: [_jsx("option", { value: "all", children: "All Teams" }), teams.map(team => (_jsx("option", { value: team, children: team }, team)))] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "bg-black/50 border border-emerald-500/30 text-white px-3 py-2 rounded-md", children: [_jsx("option", { value: "projectedPoints", children: "Projected Points" }), _jsx("option", { value: "salary", children: "Salary" }), _jsx("option", { value: "value", children: "Value" }), _jsx("option", { value: "ownership", children: "Ownership" })] })] }) }) }), _jsx("div", { className: "space-y-3", children: sortedPlayers.map((player, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, children: _jsx(Card, { className: "bg-black/50 border-emerald-500/30 hover:border-emerald-400/50 transition-all", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Badge, { className: `${getPositionColor(player.position)} text-white w-12 justify-center`, children: player.position }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("h3", { className: "font-semibold text-white", children: player.name }), _jsx("span", { className: "text-emerald-300", children: player.team }), getTrendIcon(player.trend), player.injury && (_jsx(Badge, { className: "bg-red-600 text-white text-xs", children: player.injury }))] }), _jsxs("div", { className: "flex items-center space-x-4 mt-1", children: [_jsxs("span", { className: "text-emerald-400 font-semibold", children: ["$", player.salary.toLocaleString()] }), _jsxs("span", { className: "text-teal-400", children: [player.projectedPoints, " pts"] }), _jsxs("span", { className: "text-cyan-400 text-sm", children: [player.ownership, "% owned"] }), _jsxs("span", { className: "text-yellow-400 text-sm", children: [((player.projectedPoints / player.salary) * 1000).toFixed(2), " value"] })] })] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [player.news.length > 0 && (_jsx(Button, { size: "sm", variant: "outline", className: "border-emerald-500 text-emerald-400", children: _jsx(Star, { className: "w-4 h-4" }) })), _jsxs(Button, { onClick: () => addToLineup(player), disabled: lineup.some(p => p.id === player.id) || remainingSalary < player.salary, className: "bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add"] })] })] }), player.news.length > 0 && (_jsx("div", { className: "mt-3 pt-3 border-t border-emerald-500/20", children: player.news.map((news, idx) => (_jsxs("div", { className: "text-emerald-200 text-sm mb-1", children: ["\u2022 ", news] }, idx))) }))] }) }) }, player.id))) })] })] }) })] }));
}
