import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { wsManager } from "@/lib/websocket";
export default function LiveMatch({ match: initialMatch, odds: initialOdds }) {
    const [match, setMatch] = useState(initialMatch);
    const [odds, setOdds] = useState(initialOdds);
    useEffect(() => {
        // Join match room for real-time updates
        wsManager.joinMatch(match.id);
        // Listen for score updates
        wsManager.onScoreUpdate((data) => {
            if (data.matchId === match.id) {
                setMatch(prev => ({
                    ...prev,
                    score1: data.score1,
                    score2: data.score2,
                }));
            }
        });
        // Listen for odds updates
        wsManager.onOddsUpdate((data) => {
            if (data.matchId === match.id) {
                setOdds(prev => prev.map(odd => odd.id === data.oddsId
                    ? { ...odd, odds: data.odds }
                    : odd));
            }
        });
        return () => {
            wsManager.leaveMatch(match.id);
        };
    }, [match.id]);
    const addToBetSlip = (selection, selectionOdds, market) => {
        const betSlipData = {
            matchId: match.id,
            match: `${match.team1} vs ${match.team2}`,
            market,
            selection,
            odds: selectionOdds,
        };
        if (window.addToBetSlip) {
            window.addToBetSlip(betSlipData);
        }
    };
    const liveOdds = odds.filter(o => o.market === "next_goal");
    const team1NextGoal = liveOdds.find(o => o.selection === "team1");
    const team2NextGoal = liveOdds.find(o => o.selection === "team2");
    return (_jsx("div", { className: "bg-winnex-gray rounded-lg p-4 border-l-4 border-red-500", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("span", { className: "font-semibold", children: match.team1 }), _jsx(Badge, { className: "bg-red-500 animate-pulse text-xs", children: "LIVE" }), _jsx("span", { className: "text-sm text-gray-400", children: "87:23" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-2xl font-bold text-winnex-green", children: match.score1 }), _jsx("span", { className: "text-gray-400", children: "-" }), _jsx("span", { className: "text-2xl font-bold text-winnex-green", children: match.score2 }), _jsx("span", { className: "font-semibold ml-2", children: match.team2 })] })] }), _jsxs("div", { className: "flex space-x-2", children: [team1NextGoal && (_jsx(Button, { onClick: () => addToBetSlip(`Next Goal: ${match.team1}`, team1NextGoal.odds, "next_goal"), className: "bg-green-600 hover:bg-green-700 transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-bold", children: team1NextGoal.odds }), _jsxs("div", { className: "text-xs", children: ["Next Goal: ", match.team1] })] }) })), team2NextGoal && (_jsx(Button, { onClick: () => addToBetSlip(`Next Goal: ${match.team2}`, team2NextGoal.odds, "next_goal"), className: "bg-green-600 hover:bg-green-700 transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "font-bold", children: team2NextGoal.odds }), _jsxs("div", { className: "text-xs", children: ["Next Goal: ", match.team2] })] }) }))] })] }) }));
}
