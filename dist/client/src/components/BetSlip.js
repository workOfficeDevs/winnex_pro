import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Ticket, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function BetSlip() {
    const [selections, setSelections] = useState([]);
    const [animatedTotal, setAnimatedTotal] = useState(0);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const placeBetMutation = useMutation({
        mutationFn: async (betData) => {
            await apiRequest("POST", "/api/bets", betData);
        },
        onSuccess: () => {
            toast({
                title: "Bet Placed Successfully!",
                description: "Your bet has been placed and is being processed.",
            });
            setSelections([]);
            queryClient.invalidateQueries({ queryKey: ["/api/user/balance"] });
            queryClient.invalidateQueries({ queryKey: ["/api/bets"] });
        },
        onError: (error) => {
            toast({
                title: "Bet Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const addSelection = (selection) => {
        const existingIndex = selections.findIndex(s => s.matchId === selection.matchId && s.selection === selection.selection);
        if (existingIndex >= 0) {
            const updated = [...selections];
            updated[existingIndex] = { ...selection, stake: updated[existingIndex].stake };
            setSelections(updated);
        }
        else {
            setSelections([...selections, { ...selection, stake: "" }]);
        }
    };
    const removeSelection = (index) => {
        setSelections(selections.filter((_, i) => i !== index));
    };
    const updateStake = (index, stake) => {
        const updated = [...selections];
        updated[index].stake = stake;
        setSelections(updated);
    };
    const calculateTotalStake = () => {
        return selections.reduce((total, selection) => {
            return total + (parseFloat(selection.stake) || 0);
        }, 0);
    };
    const calculatePotentialWin = () => {
        return selections.reduce((total, selection) => {
            const stake = parseFloat(selection.stake) || 0;
            const odds = parseFloat(selection.odds) || 0;
            return total + (stake * odds);
        }, 0);
    };
    const placeBet = () => {
        const validSelections = selections.filter(s => parseFloat(s.stake) > 0);
        if (validSelections.length === 0) {
            toast({
                title: "No Valid Bets",
                description: "Please add stakes to your selections.",
                variant: "destructive",
            });
            return;
        }
        validSelections.forEach(selection => {
            placeBetMutation.mutate({
                matchId: selection.matchId,
                market: selection.market,
                selection: selection.selection,
                odds: selection.odds,
                stake: selection.stake,
                potentialWin: (parseFloat(selection.stake) * parseFloat(selection.odds)).toFixed(2),
            });
        });
    };
    // Expose addSelection function globally for match cards to use
    window.addToBetSlip = addSelection;
    return (_jsxs("div", { className: "bg-winnex-gray rounded-lg p-4 sticky top-20 max-h-[80vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "font-bold flex items-center", children: [_jsx(Ticket, { className: "mr-2", size: 18 }), "Enhanced Bet Slip"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "outline", className: "text-xs", children: [selections.length, " selection", selections.length !== 1 ? 's' : ''] }), selections.length > 0 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSelections([]), className: "text-gray-400 hover:text-white", children: "Clear All" }))] })] }), selections.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Ticket, { size: 48, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { children: "Your bet slip is empty" }), _jsx("p", { className: "text-sm mt-2", children: "Add selections from matches to get started" })] })) : (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "bg-winnex-dark border-winnex-accent mb-4", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Zap, { size: 16 }), "Quick Stakes"] }) }), _jsx(CardContent, { className: "pt-0", children: _jsx("div", { className: "grid grid-cols-4 gap-2", children: [5, 10, 25, 50].map(amount => (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => {
                                            const updated = selections.map(selection => ({
                                                ...selection,
                                                stake: amount.toString()
                                            }));
                                            setSelections(updated);
                                        }, className: "text-xs", children: ["$", amount] }, amount))) }) })] }), _jsx("div", { className: "space-y-3 mb-4", children: selections.map((selection, index) => (_jsx(Card, { className: "bg-winnex-dark border-winnex-accent", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm", children: selection.match }), _jsx("p", { className: "text-xs text-gray-400", children: selection.market }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "secondary", className: "text-xs", children: selection.selection }), _jsx(Badge, { variant: "outline", className: "text-xs", children: selection.odds })] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeSelection(index), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { size: 16 }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", placeholder: "Stake", value: selection.stake, onChange: (e) => updateStake(index, e.target.value), className: "flex-1 bg-winnex-gray border-winnex-accent" }), _jsx("span", { className: "text-sm text-gray-400", children: "$" })] }), parseFloat(selection.stake) > 0 && (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Potential Win:" }), _jsxs("span", { className: "text-winnex-accent font-medium", children: ["$", (parseFloat(selection.stake) * parseFloat(selection.odds)).toFixed(2)] })] }))] })] }) }, index))) }), _jsx(Card, { className: "bg-gradient-to-r from-winnex-accent/20 to-winnex-primary/20 border-winnex-accent mb-4", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Total Stake:" }), _jsxs("span", { className: "font-bold text-lg", children: ["$", calculateTotalStake().toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Potential Win:" }), _jsxs("span", { className: "font-bold text-lg text-winnex-accent", children: ["$", calculatePotentialWin().toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between items-center text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Potential Profit:" }), _jsxs("span", { className: "text-green-400 font-medium", children: ["$", (calculatePotentialWin() - calculateTotalStake()).toFixed(2)] })] })] }) }) }), _jsx(Button, { onClick: placeBet, disabled: placeBetMutation.isPending || calculateTotalStake() === 0, className: "w-full bg-gradient-to-r from-winnex-accent to-winnex-primary hover:from-winnex-primary hover:to-winnex-accent transition-all duration-300", size: "lg", children: placeBetMutation.isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" }), "Placing Bet..."] })) : ("Place Bet") })] }))] }));
}
