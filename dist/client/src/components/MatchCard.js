import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus } from "lucide-react";
export default function MatchCard({ match, odds }) {
    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "live":
                return "bg-red-500";
            case "scheduled":
                return "bg-winnex-blue";
            case "finished":
                return "bg-gray-500";
            default:
                return "bg-gray-500";
        }
    };
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
    const homeOdds = odds.find(o => o.market === "1x2" && o.selection === "home");
    const drawOdds = odds.find(o => o.market === "1x2" && o.selection === "draw");
    const awayOdds = odds.find(o => o.market === "1x2" && o.selection === "away");
    return (_jsx("div", { className: "bg-winnex-gray rounded-lg p-4 hover:bg-gray-700 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "text-sm text-gray-400 flex items-center", children: [_jsx(Clock, { size: 14, className: "mr-1" }), match.status === "live" ? "LIVE" : formatTime(match.startTime)] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-semibold", children: match.team1 }), match.isLive && (_jsx("span", { className: "text-winnex-green font-bold text-lg", children: match.score1 })), _jsx("span", { className: "text-gray-400", children: "vs" }), match.isLive && (_jsx("span", { className: "text-winnex-green font-bold text-lg", children: match.score2 })), _jsx("span", { className: "font-semibold", children: match.team2 })] }), match.league && (_jsx(Badge, { className: getStatusColor(match.status), variant: "secondary", children: match.league })), match.isLive && (_jsx(Badge, { className: "bg-red-500 animate-pulse", variant: "secondary", children: "LIVE" }))] }), _jsxs("div", { className: "flex space-x-2", children: [homeOdds && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => addToBetSlip(`${match.team1} Win`, homeOdds.odds, "1x2"), className: "bg-winnex-dark border-gray-600 hover:bg-gray-800 transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400", children: match.team1 }), _jsx("div", { className: "font-bold text-winnex-green", children: homeOdds.odds })] }) })), drawOdds && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => addToBetSlip("Draw", drawOdds.odds, "1x2"), className: "bg-winnex-dark border-gray-600 hover:bg-gray-800 transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400", children: "Draw" }), _jsx("div", { className: "font-bold text-winnex-green", children: drawOdds.odds })] }) })), awayOdds && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => addToBetSlip(`${match.team2} Win`, awayOdds.odds, "1x2"), className: "bg-winnex-dark border-gray-600 hover:bg-gray-800 transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xs text-gray-400", children: match.team2 }), _jsx("div", { className: "font-bold text-winnex-green", children: awayOdds.odds })] }) })), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-white", children: [_jsx(Plus, { size: 16 }), _jsxs("span", { className: "ml-1 text-xs", children: ["+", odds.length] })] })] })] }) }));
}
