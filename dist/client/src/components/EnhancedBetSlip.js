import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Trash2, Ticket, Calculator, Trophy, Target, Shuffle, Zap, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function EnhancedBetSlip() {
    const [selections, setSelections] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");
    const [betType, setBetType] = useState('single');
    const [multiBetCombinations, setMultiBetCombinations] = useState([]);
    const [quickStakeAmount, setQuickStakeAmount] = useState(10);
    const [autoStakeEnabled, setAutoStakeEnabled] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: exchangeRates } = useQuery({
        queryKey: ['/api/exchange-rates'],
        refetchInterval: 60000,
    });
    const currencies = [
        { code: "USD", name: "US Dollar", symbol: "$", rate: 1.0, flag: "🇺🇸" },
        { code: "EUR", name: "Euro", symbol: "€", rate: 0.85, flag: "🇪🇺" },
        { code: "GBP", name: "British Pound", symbol: "£", rate: 0.73, flag: "🇬🇧" },
        { code: "CAD", name: "Canadian Dollar", symbol: "C$", rate: 1.25, flag: "🇨🇦" },
        { code: "AUD", name: "Australian Dollar", symbol: "A$", rate: 1.35, flag: "🇦🇺" },
        { code: "BTC", name: "Bitcoin", symbol: "₿", rate: 0.000023, flag: "₿" },
    ];
    const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency) || currencies[0];
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
            const newStake = autoStakeEnabled ? quickStakeAmount.toString() : "";
            setSelections([...selections, { ...selection, stake: newStake }]);
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
        if (betType === 'single') {
            return selections.reduce((total, selection) => {
                const stake = parseFloat(selection.stake) || 0;
                const odds = parseFloat(selection.odds) || 0;
                return total + (stake * odds);
            }, 0);
        }
        else {
            const totalOdds = selections.reduce((total, selection) => {
                const odds = parseFloat(selection.odds) || 1;
                return total * odds;
            }, 1);
            return quickStakeAmount * totalOdds;
        }
    };
    const calculateMultiBetCombinations = () => {
        if (selections.length < 2)
            return [];
        const combinations = [];
        // Doubles
        if (selections.length >= 2) {
            for (let i = 0; i < selections.length - 1; i++) {
                for (let j = i + 1; j < selections.length; j++) {
                    const odds = parseFloat(selections[i].odds) * parseFloat(selections[j].odds);
                    combinations.push({
                        type: 'double',
                        selections: [i, j],
                        stake: quickStakeAmount,
                        potentialReturn: quickStakeAmount * odds,
                        odds: odds
                    });
                }
            }
        }
        // Accumulator (all selections)
        if (selections.length >= 2) {
            const totalOdds = selections.reduce((total, selection) => {
                return total * parseFloat(selection.odds);
            }, 1);
            combinations.push({
                type: 'accumulator',
                selections: selections.map((_, index) => index),
                stake: quickStakeAmount,
                potentialReturn: quickStakeAmount * totalOdds,
                odds: totalOdds
            });
        }
        return combinations;
    };
    const applyQuickStake = (amount) => {
        const updated = selections.map(selection => ({
            ...selection,
            stake: amount.toString()
        }));
        setSelections(updated);
        setQuickStakeAmount(amount);
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
    useEffect(() => {
        setMultiBetCombinations(calculateMultiBetCombinations());
    }, [selections, quickStakeAmount]);
    // Expose addSelection function globally for match cards to use
    window.addToBetSlip = addSelection;
    return (_jsxs("div", { className: "bg-winnex-gray rounded-lg p-4 sticky top-20 max-h-[80vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "font-bold flex items-center", children: [_jsx(Ticket, { className: "mr-2", size: 18 }), "Enhanced Bet Slip"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "outline", className: "text-xs", children: [selections.length, " selection", selections.length !== 1 ? 's' : ''] }), selections.length > 0 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSelections([]), className: "text-gray-400 hover:text-white", children: "Clear All" }))] })] }), selections.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Ticket, { size: 48, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { children: "Your bet slip is empty" }), _jsx("p", { className: "text-sm mt-2", children: "Add selections from matches to get started" })] })) : (_jsxs(Tabs, { value: betType, onValueChange: (value) => setBetType(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 mb-4", children: [_jsxs(TabsTrigger, { value: "single", className: "flex items-center gap-2", children: [_jsx(Target, { size: 16 }), "Single Bets"] }), _jsxs(TabsTrigger, { value: "multi", className: "flex items-center gap-2", children: [_jsx(Shuffle, { size: 16 }), "Multi Bets"] })] }), _jsxs(TabsContent, { value: "single", className: "space-y-4", children: [_jsxs(Card, { className: "bg-winnex-dark border-winnex-accent", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(Zap, { size: 16 }), "Quick Stakes"] }) }), _jsxs(CardContent, { className: "pt-0", children: [_jsx("div", { className: "grid grid-cols-4 gap-2 mb-3", children: [5, 10, 25, 50].map(amount => (_jsxs(Button, { variant: quickStakeAmount === amount ? "default" : "outline", size: "sm", onClick: () => applyQuickStake(amount), className: "text-xs", children: ["$", amount] }, amount))) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { checked: autoStakeEnabled, onCheckedChange: setAutoStakeEnabled, id: "auto-stake" }), _jsx("label", { htmlFor: "auto-stake", className: "text-xs text-gray-400", children: "Auto-apply to new selections" })] })] })] }), selections.map((selection, index) => (_jsx(Card, { className: "bg-winnex-dark border-winnex-accent", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-3", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-sm", children: selection.match }), _jsx("p", { className: "text-xs text-gray-400", children: selection.market }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: "secondary", className: "text-xs", children: selection.selection }), _jsx(Badge, { variant: "outline", className: "text-xs", children: selection.odds }), selection.expectedValue && (_jsxs(Badge, { variant: "default", className: "text-xs bg-green-600", children: ["EV: +", selection.expectedValue, "%"] }))] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeSelection(index), className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { size: 16 }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { type: "number", placeholder: "Stake", value: selection.stake, onChange: (e) => updateStake(index, e.target.value), className: "flex-1 bg-winnex-gray border-winnex-accent" }), _jsx("span", { className: "text-sm text-gray-400", children: getCurrentCurrency().symbol })] }), parseFloat(selection.stake) > 0 && (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Potential Win:" }), _jsxs("span", { className: "text-winnex-accent font-medium", children: [getCurrentCurrency().symbol, (parseFloat(selection.stake) * parseFloat(selection.odds)).toFixed(2)] })] })), selection.confidence && (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { className: "text-gray-400", children: "AI Confidence:" }), _jsxs("span", { className: "text-winnex-accent", children: [selection.confidence, "%"] })] }), _jsx(Progress, { value: selection.confidence, className: "h-1" })] }))] })] }) }, index)))] }), _jsx(TabsContent, { value: "multi", className: "space-y-4", children: selections.length < 2 ? (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Calculator, { size: 48, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { children: "Add at least 2 selections for multi bets" })] })) : (_jsxs(_Fragment, { children: [_jsxs(Card, { className: "bg-winnex-dark border-winnex-accent", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs(CardTitle, { className: "text-sm flex items-center gap-2", children: [_jsx(DollarSign, { size: 16 }), "Multi Bet Stake"] }) }), _jsx(CardContent, { className: "pt-0", children: _jsx(Input, { type: "number", value: quickStakeAmount, onChange: (e) => setQuickStakeAmount(parseFloat(e.target.value) || 0), className: "bg-winnex-gray border-winnex-accent", placeholder: "Enter stake amount" }) })] }), _jsx("div", { className: "space-y-3", children: multiBetCombinations.slice(0, 5).map((combination, index) => (_jsx(Card, { className: "bg-winnex-dark border-winnex-accent", children: _jsxs(CardContent, { className: "p-3", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: combination.type }), _jsxs("span", { className: "text-xs text-gray-400", children: [combination.selections.length, " selections"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-xs text-gray-400", children: "Odds:" }), _jsx("div", { className: "text-sm font-medium", children: combination.odds.toFixed(2) })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "text-xs text-gray-400", children: ["Stake: ", getCurrentCurrency().symbol, combination.stake] }), _jsxs("div", { className: "text-winnex-accent font-medium", children: ["Win: ", getCurrentCurrency().symbol, combination.potentialReturn.toFixed(2)] })] })] }) }, index))) })] })) })] })), selections.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Card, { className: "bg-winnex-dark border-winnex-accent mt-4", children: _jsx(CardContent, { className: "p-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Currency:" }), _jsxs(Select, { value: selectedCurrency, onValueChange: setSelectedCurrency, children: [_jsx(SelectTrigger, { className: "w-32 bg-winnex-gray border-winnex-accent", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: currencies.map(currency => (_jsx(SelectItem, { value: currency.code, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: currency.flag }), _jsx("span", { children: currency.code })] }) }, currency.code))) })] })] }) }) }), _jsx(Card, { className: "bg-gradient-to-r from-winnex-accent/20 to-winnex-primary/20 border-winnex-accent mt-4", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Total Stake:" }), _jsxs("span", { className: "font-bold text-lg", children: [getCurrentCurrency().symbol, (betType === 'single' ? calculateTotalStake() : quickStakeAmount).toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Potential Win:" }), _jsxs("span", { className: "font-bold text-lg text-winnex-accent", children: [getCurrentCurrency().symbol, calculatePotentialWin().toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between items-center text-xs", children: [_jsx("span", { className: "text-gray-400", children: "Potential Profit:" }), _jsxs("span", { className: "text-green-400 font-medium", children: [getCurrentCurrency().symbol, (calculatePotentialWin() - (betType === 'single' ? calculateTotalStake() : quickStakeAmount)).toFixed(2)] })] })] }) }) }), _jsx(Button, { onClick: placeBet, disabled: placeBetMutation.isPending || (betType === 'single' && calculateTotalStake() === 0), className: "w-full mt-4 bg-gradient-to-r from-winnex-accent to-winnex-primary hover:from-winnex-primary hover:to-winnex-accent transition-all duration-300", size: "lg", children: placeBetMutation.isPending ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" }), "Placing Bet..."] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Trophy, { size: 16 }), "Place ", betType === 'single' ? 'Bets' : 'Multi Bet'] })) })] }))] }));
}
