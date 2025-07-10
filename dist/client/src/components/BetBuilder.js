import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, X, Calculator } from "lucide-react";
export default function BetBuilder() {
    const [selections, setSelections] = useState([]);
    const [stake, setStake] = useState("");
    const addSelection = (selection) => {
        setSelections([...selections, selection]);
    };
    const removeSelection = (index) => {
        setSelections(selections.filter((_, i) => i !== index));
    };
    const combinedOdds = selections.reduce((acc, sel) => acc * sel.odds, 1);
    const potentialWin = parseFloat(stake) * combinedOdds;
    return (_jsxs("div", { className: "card-modern p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-xl font-bold text-winnex-green", children: "Bet Builder" }), _jsx(Calculator, { className: "text-winnex-blue", size: 20 })] }), selections.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-white/60", children: [_jsx(Plus, { className: "mx-auto mb-3", size: 24 }), _jsx("p", { children: "Add selections to build your bet" })] })) : (_jsx("div", { className: "space-y-3 mb-6", children: selections.map((selection, index) => (_jsxs("div", { className: "glass rounded-lg p-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: selection.match }), _jsxs("div", { className: "text-sm text-white/60", children: [selection.market, ": ", selection.selection] })] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("span", { className: "font-bold text-winnex-green", children: selection.odds.toFixed(2) }), _jsx("button", { onClick: () => removeSelection(index), className: "text-red-400 hover:text-red-300", children: _jsx(X, { size: 16 }) })] })] }, index))) })), selections.length > 0 && (_jsxs("div", { className: "border-t border-white/10 pt-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("span", { children: "Combined Odds:" }), _jsx("span", { className: "text-xl font-bold text-winnex-green", children: combinedOdds.toFixed(2) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("input", { type: "number", placeholder: "Enter stake amount", value: stake, onChange: (e) => setStake(e.target.value), className: "w-full p-3 bg-secondary rounded-lg border border-white/10 text-white" }), stake && (_jsxs("div", { className: "flex justify-between items-center text-lg", children: [_jsx("span", { children: "Potential Win:" }), _jsxs("span", { className: "font-bold text-winnex-orange", children: ["$", potentialWin.toFixed(2)] })] })), _jsx("button", { className: "btn-primary w-full", children: "Place Bet Builder" })] })] }))] }));
}
