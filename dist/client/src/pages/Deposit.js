import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Bitcoin, DollarSign, Clock, Shield, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
export default function Deposit() {
    const [amount, setAmount] = useState("");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [activeTab, setActiveTab] = useState("amount");
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: paymentMethods, isLoading: methodsLoading } = useQuery({
        queryKey: ['/api/payment/methods'],
    });
    const { data: recentTransactions } = useQuery({
        queryKey: ['/api/user/transactions', 'deposit'],
    });
    const { data: bonuses } = useQuery({
        queryKey: ['/api/deposit/bonuses'],
    });
    const createDepositMutation = useMutation({
        mutationFn: (data) => apiRequest('/api/deposit/create', 'POST', data),
        onSuccess: (data) => {
            toast({
                title: "Deposit Initiated",
                description: `Your deposit of $${amount} has been initiated. Redirecting to payment...`,
            });
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
            else {
                setActiveTab("confirmation");
            }
            queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
            queryClient.invalidateQueries({ queryKey: ['/api/user/transactions'] });
        },
        onError: (error) => {
            toast({
                title: "Deposit Failed",
                description: error.message,
                variant: "destructive",
            });
        },
    });
    const quickAmounts = [25, 50, 100, 250, 500, 1000];
    const handleDeposit = () => {
        if (!amount || !selectedMethod) {
            toast({
                title: "Missing Information",
                description: "Please select an amount and payment method.",
                variant: "destructive",
            });
            return;
        }
        const numAmount = parseFloat(amount);
        if (numAmount < 10) {
            toast({
                title: "Minimum Amount",
                description: "Minimum deposit amount is $10.",
                variant: "destructive",
            });
            return;
        }
        createDepositMutation.mutate({
            amount: numAmount,
            method: selectedMethod,
        });
    };
    const getMethodIcon = (type) => {
        switch (type) {
            case 'card': return _jsx(CreditCard, { className: "w-5 h-5" });
            case 'crypto': return _jsx(Bitcoin, { className: "w-5 h-5" });
            case 'bank': return _jsx(DollarSign, { className: "w-5 h-5" });
            case 'ewallet': return _jsx(Wallet, { className: "w-5 h-5" });
            default: return _jsx(CreditCard, { className: "w-5 h-5" });
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/20';
            case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
            case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/20';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
        }
    };
    return (_jsx(Layout, { children: _jsx("div", { className: "min-h-screen bg-gradient-to-br from-winnex-dark via-gray-900 to-black p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Deposit Funds" }), _jsx("p", { className: "text-gray-400", children: "Add money to your Winnex account securely and instantly" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "space-y-6", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-winnex-dark border-gray-700", children: [_jsx(TabsTrigger, { value: "amount", className: "data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Amount" }), _jsx(TabsTrigger, { value: "method", className: "data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Payment Method" }), _jsx(TabsTrigger, { value: "confirmation", className: "data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Confirmation" })] }), _jsx(TabsContent, { value: "amount", className: "space-y-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(DollarSign, { className: "w-5 h-5 text-winnex-green" }), "Select Deposit Amount"] }), _jsx(CardDescription, { children: "Choose how much you'd like to deposit" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-3 gap-3", children: quickAmounts.map((quickAmount) => (_jsxs(Button, { variant: amount === quickAmount.toString() ? "default" : "outline", className: `h-12 ${amount === quickAmount.toString()
                                                            ? "bg-winnex-green text-black"
                                                            : "border-gray-600 hover:border-winnex-green"}`, onClick: () => setAmount(quickAmount.toString()), children: ["$", quickAmount] }, quickAmount))) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "custom-amount", className: "text-white", children: "Custom Amount" }), _jsxs("div", { className: "relative", children: [_jsx(DollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "custom-amount", type: "number", placeholder: "Enter amount", value: amount, onChange: (e) => setAmount(e.target.value), className: "pl-10 bg-gray-800 border-gray-600 text-white", min: "10", max: "10000" })] }), _jsx("p", { className: "text-sm text-gray-400", children: "Minimum: $10 \u2022 Maximum: $10,000" })] }), bonuses && bonuses.length > 0 && (_jsxs("div", { className: "bg-gradient-to-r from-winnex-green/10 to-green-400/10 border border-winnex-green/20 rounded-lg p-4", children: [_jsx("h3", { className: "text-winnex-green font-semibold mb-2", children: "Available Deposit Bonuses" }), bonuses.map((bonus, index) => (_jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-300", children: bonus.description }), _jsxs(Badge, { className: "bg-winnex-green/20 text-winnex-green", children: [bonus.percentage, "% up to $", bonus.maxAmount] })] }, index)))] })), _jsx(Button, { onClick: () => setActiveTab("method"), disabled: !amount || parseFloat(amount) < 10, className: "w-full bg-winnex-green text-black hover:bg-green-400", children: "Continue to Payment Method" })] })] }) }), _jsx(TabsContent, { value: "method", className: "space-y-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(CreditCard, { className: "w-5 h-5 text-winnex-green" }), "Choose Payment Method"] }), _jsx(CardDescription, { children: "Select your preferred payment option" })] }), _jsxs(CardContent, { children: [methodsLoading ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => (_jsx("div", { className: "animate-pulse bg-gray-800 h-20 rounded-lg" }, i))) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: paymentMethods?.map((method) => (_jsxs("div", { className: `border rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === method.id
                                                            ? "border-winnex-green bg-winnex-green/10"
                                                            : "border-gray-600 hover:border-gray-500"}`, onClick: () => setSelectedMethod(method.id), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [getMethodIcon(method.type), _jsx("span", { className: "text-white font-medium", children: method.name })] }), selectedMethod === method.id && (_jsx(CheckCircle, { className: "w-5 h-5 text-winnex-green" }))] }), _jsxs("div", { className: "space-y-1 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), _jsx("span", { children: method.processingTime })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(DollarSign, { className: "w-3 h-3" }), _jsxs("span", { children: ["$", method.minAmount, " - $", method.maxAmount.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Shield, { className: "w-3 h-3" }), _jsxs("span", { children: ["Fee: ", method.feeType === 'percentage' ? `${method.fee}%` : `$${method.fee}`] })] })] })] }, method.id))) })), _jsxs("div", { className: "mt-6 flex gap-3", children: [_jsx(Button, { variant: "outline", onClick: () => setActiveTab("amount"), className: "flex-1 border-gray-600 hover:border-winnex-green", children: "Back" }), _jsx(Button, { onClick: handleDeposit, disabled: !selectedMethod || createDepositMutation.isPending, className: "flex-1 bg-winnex-green text-black hover:bg-green-400", children: createDepositMutation.isPending ? "Processing..." : `Deposit $${amount}` })] })] })] }) }), _jsx(TabsContent, { value: "confirmation", className: "space-y-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-winnex-green/20 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(CheckCircle, { className: "w-8 h-8 text-winnex-green" }) }), _jsx(CardTitle, { className: "text-white", children: "Deposit Initiated" }), _jsx(CardDescription, { children: "Your deposit is being processed" })] }), _jsxs(CardContent, { className: "text-center space-y-4", children: [_jsxs("div", { className: "bg-gray-800 rounded-lg p-4", children: [_jsxs("div", { className: "text-2xl font-bold text-winnex-green", children: ["$", amount] }), _jsx("div", { className: "text-gray-400 text-sm", children: "Deposit Amount" })] }), _jsx("p", { className: "text-gray-300", children: "You will receive an email confirmation once your deposit is processed. Funds typically appear in your account within minutes." }), _jsx(Button, { onClick: () => window.location.href = '/', className: "w-full bg-winnex-green text-black hover:bg-green-400", children: "Return to Home" })] })] }) })] }), recentTransactions && recentTransactions.length > 0 && (_jsxs(Card, { className: "bg-winnex-dark border-gray-700 mt-8", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Recent Deposits" }), _jsx(CardDescription, { children: "Your recent deposit history" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: recentTransactions.slice(0, 5).map((tx) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-winnex-green/20 rounded-full flex items-center justify-center", children: _jsx(DollarSign, { className: "w-5 h-5 text-winnex-green" }) }), _jsxs("div", { children: [_jsxs("div", { className: "text-white font-medium", children: ["$", tx.amount] }), _jsx("div", { className: "text-gray-400 text-sm", children: tx.method })] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { className: getStatusColor(tx.status), children: tx.status }), _jsx("div", { className: "text-gray-400 text-xs mt-1", children: new Date(tx.timestamp).toLocaleDateString() })] })] }, tx.id))) }) })] }))] }) }) }));
}
