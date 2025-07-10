import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { wsManager } from "@/lib/websocket";
import { TrendingUp, TrendingDown, Clock, Activity, DollarSign } from "lucide-react";
export default function LiveBettingEngine() {
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [liveOdds, setLiveOdds] = useState({});
    const [cashOutOffers, setCashOutOffers] = useState([]);
    const [oddsAlerts, setOddsAlerts] = useState({});
    // Mock live matches data
    const { data: liveMatches = [] } = useQuery({
        queryKey: ["/api/matches/live"],
        refetchInterval: 5000, // Refetch every 5 seconds
    });
    // Real-time WebSocket updates
    useEffect(() => {
        const handleOddsUpdate = (data) => {
            setLiveOdds(prev => ({
                ...prev,
                [data.selectionId]: {
                    ...prev[data.selectionId],
                    previousOdds: prev[data.selectionId]?.odds || data.odds,
                    odds: data.odds,
                    trend: data.trend,
                    volume: data.volume,
                    probability: data.probability
                }
            }));
        };
        const handleCashOutUpdate = (data) => {
            setCashOutOffers(prev => {
                const existing = prev.findIndex(offer => offer.betId === data.betId);
                if (existing >= 0) {
                    const updated = [...prev];
                    updated[existing] = data;
                    return updated;
                }
                return [...prev, data];
            });
        };
        const socket = wsManager.connect();
        if (socket) {
            socket.on('odds_update', handleOddsUpdate);
            socket.on('cashout_offer', handleCashOutUpdate);
        }
        return () => {
            if (socket) {
                socket.off('odds_update', handleOddsUpdate);
                socket.off('cashout_offer', handleCashOutUpdate);
            }
        };
    }, []);
    // Simulate live data for demo
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate odds changes
            const mockOddsUpdate = {
                selectionId: `match_${Math.floor(Math.random() * 5)}_selection_${Math.floor(Math.random() * 3)}`,
                odds: 1.5 + Math.random() * 3,
                trend: Math.random() > 0.5 ? 'up' : 'down',
                volume: Math.floor(Math.random() * 10000),
                probability: 0.2 + Math.random() * 0.6
            };
            setLiveOdds(prev => ({
                ...prev,
                [mockOddsUpdate.selectionId]: {
                    id: mockOddsUpdate.selectionId,
                    name: `Selection ${mockOddsUpdate.selectionId}`,
                    previousOdds: prev[mockOddsUpdate.selectionId]?.odds || mockOddsUpdate.odds,
                    odds: mockOddsUpdate.odds,
                    trend: mockOddsUpdate.trend,
                    volume: mockOddsUpdate.volume,
                    probability: mockOddsUpdate.probability
                }
            }));
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    const mockLiveMatches = [
        {
            id: 1,
            sport: "Football",
            team1: "Manchester United",
            team2: "Liverpool",
            score1: 1,
            score2: 2,
            minute: 67,
            status: 'live',
            markets: [
                {
                    id: 'fulltime',
                    name: 'Full Time Result',
                    suspended: false,
                    inPlay: true,
                    selections: [
                        { id: 'match_1_home', name: 'Man United', odds: 3.4, previousOdds: 3.2, trend: 'up', volume: 8500, probability: 0.29 },
                        { id: 'match_1_draw', name: 'Draw', odds: 3.8, previousOdds: 3.9, trend: 'down', volume: 4200, probability: 0.26 },
                        { id: 'match_1_away', name: 'Liverpool', odds: 1.9, previousOdds: 2.1, trend: 'down', volume: 12400, probability: 0.53 }
                    ]
                },
                {
                    id: 'nextgoal',
                    name: 'Next Goal',
                    suspended: false,
                    inPlay: true,
                    selections: [
                        { id: 'match_1_next_home', name: 'Man United', odds: 2.1, previousOdds: 2.0, trend: 'up', volume: 3400, probability: 0.48 },
                        { id: 'match_1_next_away', name: 'Liverpool', odds: 1.8, previousOdds: 1.9, trend: 'down', volume: 5600, probability: 0.56 }
                    ]
                }
            ],
            stats: {
                possession: [45, 55],
                shots: [8, 12],
                corners: [3, 7],
                yellowCards: [2, 1],
                redCards: [0, 0],
                attacks: [89, 124]
            }
        },
        {
            id: 2,
            sport: "Basketball",
            team1: "Lakers",
            team2: "Celtics",
            score1: 89,
            score2: 76,
            minute: 8,
            status: 'live',
            markets: [
                {
                    id: 'moneyline',
                    name: 'Moneyline',
                    suspended: false,
                    inPlay: true,
                    selections: [
                        { id: 'match_2_home', name: 'Lakers', odds: 1.4, previousOdds: 1.6, trend: 'down', volume: 15600, probability: 0.71 },
                        { id: 'match_2_away', name: 'Celtics', odds: 2.8, previousOdds: 2.4, trend: 'up', volume: 6800, probability: 0.36 }
                    ]
                }
            ],
            stats: {
                possession: [52, 48],
                shots: [34, 28],
                corners: [0, 0],
                yellowCards: [3, 4],
                redCards: [0, 0],
                attacks: [156, 132]
            }
        }
    ];
    const placeLiveBet = (selection, stake) => {
        // Handle live bet placement
        console.log('Placing live bet:', selection, stake);
    };
    const handleCashOut = (offer) => {
        // Handle cash out
        console.log('Cashing out:', offer);
        setCashOutOffers(prev => prev.filter(o => o.betId !== offer.betId));
    };
    const renderOddsButton = (selection, matchId) => {
        const trendIcon = selection.trend === 'up' ?
            _jsx(TrendingUp, { className: "w-3 h-3 text-green-400" }) :
            selection.trend === 'down' ?
                _jsx(TrendingDown, { className: "w-3 h-3 text-red-400" }) : null;
        return (_jsx(Button, { variant: "outline", className: `flex-1 border-gray-600 hover:bg-winnex-green hover:text-black transition-all ${selection.trend === 'up' ? 'border-green-400/50 bg-green-400/10' :
                selection.trend === 'down' ? 'border-red-400/50 bg-red-400/10' : ''}`, onClick: () => placeLiveBet(selection, 10), children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "font-bold", children: selection.odds.toFixed(2) }), trendIcon] }), _jsx("span", { className: "text-xs opacity-75", children: selection.name })] }) }, selection.id));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid gap-4", children: mockLiveMatches.map((match) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Badge, { className: "bg-red-500 text-white animate-pulse", children: "LIVE" }), _jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsxs("span", { children: [match.minute, "'"] })] })] }), _jsx(Badge, { variant: "outline", className: "border-winnex-green text-winnex-green", children: match.sport })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "font-medium", children: match.team1 }), _jsx("span", { className: "text-2xl font-bold text-winnex-green", children: match.score1 })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "font-medium", children: match.team2 }), _jsx("span", { className: "text-2xl font-bold text-winnex-green", children: match.score2 })] })] }), _jsxs("div", { className: "text-right space-y-1 text-sm text-gray-400", children: [_jsxs("div", { children: ["Shots: ", match.stats.shots[0], " - ", match.stats.shots[1]] }), _jsxs("div", { children: ["Possession: ", match.stats.possession[0], "% - ", match.stats.possession[1], "%"] })] })] })] }), _jsx(CardContent, { className: "space-y-4", children: match.markets.map((market) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-medium text-sm", children: market.name }), market.suspended && (_jsx(Badge, { variant: "destructive", className: "text-xs", children: "Suspended" }))] }), _jsx("div", { className: "flex space-x-2", children: market.selections.map((selection) => renderOddsButton(selection, match.id)) }), _jsxs("div", { className: "flex items-center space-x-2 text-xs text-gray-500", children: [_jsx(Activity, { className: "w-3 h-3" }), _jsxs("span", { children: ["Volume: $", market.selections.reduce((sum, sel) => sum + sel.volume, 0).toLocaleString()] })] })] }, market.id))) })] }, match.id))) }), cashOutOffers.length > 0 && (_jsxs(Card, { className: "bg-gradient-to-r from-winnex-green/10 to-winnex-blue/10 border-winnex-green/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(DollarSign, { className: "w-5 h-5 mr-2 text-winnex-green" }), "Cash Out Offers"] }) }), _jsx(CardContent, { className: "space-y-3", children: cashOutOffers.map((offer) => (_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: ["Bet ID: ", offer.betId] }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Original Stake: $", offer.originalStake] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold text-winnex-green", children: ["$", offer.currentValue.toFixed(2)] }), _jsxs("div", { className: `text-sm ${offer.profit >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [offer.profit >= 0 ? '+' : '', "$", offer.profit.toFixed(2)] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-400", children: [_jsx("span", { children: "Expires in:" }), _jsxs("span", { children: [offer.expiresIn, "s"] })] }), _jsx(Progress, { value: (offer.expiresIn / 30) * 100, className: "h-2" })] }), _jsxs(Button, { onClick: () => handleCashOut(offer), className: "w-full bg-winnex-green text-black hover:bg-green-400", children: ["Cash Out $", offer.currentValue.toFixed(2)] })] }, offer.betId))) })] })), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-winnex-green", children: mockLiveMatches.length }), _jsx("div", { className: "text-sm text-gray-400", children: "Live Matches" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-winnex-blue", children: "247" }), _jsx("div", { className: "text-sm text-gray-400", children: "Live Markets" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-winnex-orange", children: "$2.4M" }), _jsx("div", { className: "text-sm text-gray-400", children: "Live Volume" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-400", children: "99.7%" }), _jsx("div", { className: "text-sm text-gray-400", children: "Uptime" })] }) })] })] }));
}
