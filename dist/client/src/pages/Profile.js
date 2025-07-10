import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Wallet, History, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, DollarSign, Target, Award, LogOut, } from "lucide-react";
import { useState } from "react";
export default function Profile() {
    const { user } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [depositAmount, setDepositAmount] = useState("");
    const { data: balance } = useQuery({
        queryKey: ["/api/user/balance"],
        enabled: !!user,
    });
    const { data: bets = [] } = useQuery({
        queryKey: ["/api/bets"],
        enabled: !!user,
    });
    const { data: transactions = [] } = useQuery({
        queryKey: ["/api/user/transactions"],
        enabled: !!user,
    });
    const depositMutation = useMutation({
        mutationFn: async (amount) => {
            await apiRequest("POST", "/api/user/deposit", { amount });
        },
        onSuccess: () => {
            toast({
                title: "Deposit Successful",
                description: `$${depositAmount} has been added to your account.`,
            });
            setDepositAmount("");
            queryClient.invalidateQueries({ queryKey: ["/api/user/balance"] });
            queryClient.invalidateQueries({ queryKey: ["/api/user/transactions"] });
        },
        onError: (error) => {
            toast({
                title: "Deposit Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const handleDeposit = () => {
        const amount = parseFloat(depositAmount);
        if (amount <= 0 || isNaN(amount)) {
            toast({
                title: "Invalid Amount",
                description: "Please enter a valid deposit amount.",
                variant: "destructive",
            });
            return;
        }
        depositMutation.mutate(depositAmount);
    };
    const handleLogout = () => {
        window.location.href = "/api/logout";
    };
    // Calculate betting stats
    const totalBets = bets.length;
    const wonBets = bets.filter(bet => bet.status === "won").length;
    const lostBets = bets.filter(bet => bet.status === "lost").length;
    const pendingBets = bets.filter(bet => bet.status === "pending").length;
    const winRate = totalBets > 0 ? ((wonBets / totalBets) * 100).toFixed(1) : "0.0";
    const totalStaked = bets.reduce((sum, bet) => sum + parseFloat(bet.stake), 0);
    const totalWon = bets
        .filter(bet => bet.status === "won")
        .reduce((sum, bet) => sum + parseFloat(bet.potentialWin), 0);
    const netProfit = totalWon - totalStaked;
    const getStatusIcon = (status) => {
        switch (status) {
            case "won":
                return _jsx(CheckCircle, { className: "text-green-500", size: 16 });
            case "lost":
                return _jsx(XCircle, { className: "text-red-500", size: 16 });
            case "pending":
                return _jsx(Clock, { className: "text-yellow-500", size: 16 });
            default:
                return _jsx(Clock, { className: "text-gray-500", size: 16 });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case "won":
                return "bg-green-500";
            case "lost":
                return "bg-red-500";
            case "pending":
                return "bg-yellow-500";
            default:
                return "bg-gray-500";
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "p-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: user?.profileImageUrl || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80`, alt: user?.firstName || "User", className: "w-16 h-16 rounded-full object-cover" }), _jsxs("div", { children: [_jsxs("h1", { className: "text-3xl font-bold", children: [user?.firstName, " ", user?.lastName] }), _jsx("p", { className: "text-gray-400", children: user?.email })] })] }), _jsxs(Button, { onClick: handleLogout, variant: "outline", className: "border-gray-600", children: [_jsx(LogOut, { className: "mr-2", size: 16 }), "Sign Out"] })] }) }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Account Balance" }), _jsxs("p", { className: "text-2xl font-bold text-winnex-green", children: ["$", balance?.balance || "0.00"] })] }), _jsx(Wallet, { className: "text-winnex-green", size: 24 })] }) }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Total Bets" }), _jsx("p", { className: "text-2xl font-bold", children: totalBets })] }), _jsx(Target, { className: "text-winnex-blue", size: 24 })] }) }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Win Rate" }), _jsxs("p", { className: "text-2xl font-bold text-winnex-green", children: [winRate, "%"] })] }), _jsx(Award, { className: "text-winnex-orange", size: 24 })] }) }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Net Profit" }), _jsxs("p", { className: `text-2xl font-bold ${netProfit >= 0 ? 'text-winnex-green' : 'text-red-500'}`, children: [netProfit >= 0 ? '+' : '', "$", netProfit.toFixed(2)] })] }), netProfit >= 0 ? (_jsx(TrendingUp, { className: "text-winnex-green", size: 24 })) : (_jsx(TrendingDown, { className: "text-red-500", size: 24 }))] }) }) })] }), _jsxs(Tabs, { defaultValue: "overview", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-winnex-gray", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "bets", children: "Betting History" }), _jsx(TabsTrigger, { value: "transactions", children: "Transactions" }), _jsx(TabsTrigger, { value: "settings", children: "Settings" })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(DollarSign, { className: "mr-2", size: 20 }), "Quick Deposit"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx(Input, { type: "number", placeholder: "Enter amount", value: depositAmount, onChange: (e) => setDepositAmount(e.target.value), className: "bg-winnex-dark border-gray-600" }), _jsxs("div", { className: "grid grid-cols-3 gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: () => setDepositAmount("50"), className: "border-gray-600", children: "$50" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setDepositAmount("100"), className: "border-gray-600", children: "$100" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setDepositAmount("500"), className: "border-gray-600", children: "$500" })] }), _jsx(Button, { onClick: handleDeposit, disabled: depositMutation.isPending, className: "w-full bg-winnex-green text-black hover:bg-green-400", children: depositMutation.isPending ? "Processing..." : "Deposit" })] })] }), _jsxs(Card, { className: "lg:col-span-2 bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Recent Activity" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [bets.slice(0, 5).map((bet) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-winnex-dark rounded", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getStatusIcon(bet.status), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: bet.selection }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Stake: $", bet.stake, " \u2022 Odds: ", bet.odds] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { className: getStatusColor(bet.status), children: bet.status.toUpperCase() }), _jsx("div", { className: "text-xs text-gray-400 mt-1", children: formatDate(bet.placedAt) })] })] }, bet.id))), bets.length === 0 && (_jsxs("div", { className: "text-center py-8 text-gray-400", children: [_jsx(Target, { size: 48, className: "mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No bets placed yet" })] }))] }) })] })] }), _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Betting Statistics" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid md:grid-cols-4 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-500", children: wonBets }), _jsx("div", { className: "text-sm text-gray-400", children: "Won Bets" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-500", children: lostBets }), _jsx("div", { className: "text-sm text-gray-400", children: "Lost Bets" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-yellow-500", children: pendingBets }), _jsx("div", { className: "text-sm text-gray-400", children: "Pending Bets" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-winnex-green", children: ["$", totalStaked.toFixed(2)] }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Staked" })] })] }) })] })] }), _jsx(TabsContent, { value: "bets", className: "space-y-4", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "All Bets" }) }), _jsx(CardContent, { children: bets.length === 0 ? (_jsxs("div", { className: "text-center py-12 text-gray-400", children: [_jsx(Target, { size: 64, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-lg", children: "No bets found" }), _jsx("p", { className: "text-sm", children: "Start betting to see your history here" })] })) : (_jsx("div", { className: "space-y-4", children: bets.map((bet) => (_jsxs("div", { className: "p-4 bg-winnex-dark rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(bet.status), _jsx("span", { className: "font-semibold", children: bet.selection }), _jsx(Badge, { className: getStatusColor(bet.status), variant: "secondary", children: bet.status.toUpperCase() })] }), _jsx("div", { className: "text-right", children: _jsx("div", { className: "font-bold", children: bet.status === "won" ? `+$${bet.potentialWin}` : `-$${bet.stake}` }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400", children: [_jsxs("div", { children: [_jsx("span", { className: "block", children: "Market" }), _jsx("span", { className: "text-white", children: bet.market })] }), _jsxs("div", { children: [_jsx("span", { className: "block", children: "Stake" }), _jsxs("span", { className: "text-white", children: ["$", bet.stake] })] }), _jsxs("div", { children: [_jsx("span", { className: "block", children: "Odds" }), _jsx("span", { className: "text-white", children: bet.odds })] }), _jsxs("div", { children: [_jsx("span", { className: "block", children: "Placed" }), _jsx("span", { className: "text-white", children: formatDate(bet.placedAt) })] })] })] }, bet.id))) })) })] }) }), _jsx(TabsContent, { value: "transactions", className: "space-y-4", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Transaction History" }) }), _jsx(CardContent, { children: transactions.length === 0 ? (_jsxs("div", { className: "text-center py-12 text-gray-400", children: [_jsx(History, { size: 64, className: "mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-lg", children: "No transactions found" }), _jsx("p", { className: "text-sm", children: "Your transaction history will appear here" })] })) : (_jsx("div", { className: "space-y-4", children: transactions.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-winnex-dark rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${transaction.amount.startsWith('-') ? 'bg-red-500' : 'bg-green-500'}` }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: transaction.type.toUpperCase() }), _jsx("div", { className: "text-sm text-gray-400", children: transaction.description })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `font-bold ${transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`, children: ["$", transaction.amount] }), _jsx("div", { className: "text-xs text-gray-400", children: formatDate(transaction.createdAt) })] })] }, transaction.id))) })) })] }) }), _jsx(TabsContent, { value: "settings", className: "space-y-6", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Account Settings" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Personal Information" }), _jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "First Name" }), _jsx(Input, { value: user?.firstName || "", readOnly: true, className: "bg-winnex-dark border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Last Name" }), _jsx(Input, { value: user?.lastName || "", readOnly: true, className: "bg-winnex-dark border-gray-600" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx(Input, { value: user?.email || "", readOnly: true, className: "bg-winnex-dark border-gray-600" })] })] })] }), _jsx(Separator, { className: "bg-gray-600" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Betting Limits" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-winnex-dark rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: "Daily Bet Limit" }), _jsx("div", { className: "text-sm text-gray-400", children: "Maximum amount you can bet per day" })] }), _jsx("div", { className: "text-winnex-green font-bold", children: "$1,000" })] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-winnex-dark rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: "Single Bet Limit" }), _jsx("div", { className: "text-sm text-gray-400", children: "Maximum amount per single bet" })] }), _jsx("div", { className: "text-winnex-green font-bold", children: "$500" })] })] })] }), _jsx(Separator, { className: "bg-gray-600" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Account Actions" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { variant: "outline", className: "w-full border-gray-600", children: "Request Account Verification" }), _jsx(Button, { variant: "outline", className: "w-full border-gray-600", children: "Download Account Statement" }), _jsx(Button, { variant: "outline", className: "w-full border-red-500 text-red-500", children: "Request Account Closure" })] })] })] })] }) })] })] }) }));
}
