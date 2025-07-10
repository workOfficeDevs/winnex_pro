import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreditCard, Wallet, DollarSign, ArrowUpCircle, ArrowDownCircle, Shield, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
const PAYMENT_METHODS = [
    { type: 'card', name: 'Credit/Debit Card', icon: CreditCard, processingTime: 'Instant', fees: 'Free' },
    { type: 'bank', name: 'Bank Transfer', icon: ArrowDownCircle, processingTime: '1-3 days', fees: 'Free' },
    { type: 'crypto', name: 'Cryptocurrency', icon: '₿', processingTime: '10-30 min', fees: '1%' },
    { type: 'ewallet', name: 'Digital Wallet', icon: Wallet, processingTime: 'Instant', fees: 'Free' },
];
export default function PaymentCenter() {
    const [activeTab, setActiveTab] = useState('deposit');
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: balance } = useQuery({
        queryKey: ["/api/user/balance"],
    });
    const { data: paymentMethods = [] } = useQuery({
        queryKey: ["/api/payment/methods"],
    });
    const { data: transactions = [] } = useQuery({
        queryKey: ["/api/transactions"],
    });
    const depositMutation = useMutation({
        mutationFn: async (data) => {
            return apiRequest("/api/payment/deposit", "POST", data);
        },
        onSuccess: () => {
            toast({
                title: "Deposit Initiated",
                description: "Your deposit is being processed",
            });
            queryClient.invalidateQueries({ queryKey: ["/api/user/balance"] });
            queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
            setAmount('');
        },
        onError: () => {
            toast({
                title: "Deposit Failed",
                description: "Please try again or contact support",
                variant: "destructive",
            });
        },
    });
    const withdrawMutation = useMutation({
        mutationFn: async (data) => {
            return apiRequest("/api/payment/withdraw", "POST", data);
        },
        onSuccess: () => {
            toast({
                title: "Withdrawal Initiated",
                description: "Your withdrawal request has been submitted",
            });
            queryClient.invalidateQueries({ queryKey: ["/api/user/balance"] });
            queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
            setAmount('');
        },
    });
    const handleDeposit = () => {
        if (!amount || !selectedMethod)
            return;
        depositMutation.mutate({ amount: parseFloat(amount), methodId: selectedMethod });
    };
    const handleWithdraw = () => {
        if (!amount || !selectedMethod)
            return;
        withdrawMutation.mutate({ amount: parseFloat(amount), methodId: selectedMethod });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-winnex-green';
            case 'pending': return 'text-winnex-orange';
            case 'failed': return 'text-red-400';
            default: return 'text-white/60';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return _jsx(CheckCircle, { size: 16, className: "text-winnex-green" });
            case 'pending': return _jsx(Clock, { size: 16, className: "text-winnex-orange" });
            case 'failed': return _jsx(ArrowDownCircle, { size: 16, className: "text-red-400" });
            default: return null;
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card-modern p-6 gradient-accent", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-1", children: "Account Balance" }), _jsxs("div", { className: "text-4xl font-black text-white", children: ["$", balance || '0.00'] })] }), _jsx("div", { className: "glass rounded-2xl p-4", children: _jsx(Wallet, { className: "text-white", size: 32 }) })] }), _jsxs("div", { className: "flex justify-between items-center mt-6 pt-4 border-t border-white/20", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-white/70", children: "Available" }), _jsxs("div", { className: "font-bold text-white", children: ["$", balance || '0.00'] })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-white/70", children: "Pending" }), _jsx("div", { className: "font-bold text-white", children: "$0.00" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-sm text-white/70", children: "Bonus" }), _jsx("div", { className: "font-bold text-winnex-green", children: "$25.00" })] })] })] }), _jsx("div", { className: "glass rounded-xl p-1 flex", children: ['deposit', 'withdraw', 'methods', 'history'].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab), className: `flex-1 py-3 px-4 rounded-lg font-medium transition-all capitalize ${activeTab === tab ? 'bg-winnex-green text-black' : 'text-white/70 hover:text-white'}`, children: tab }, tab))) }), activeTab === 'deposit' && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "card-modern p-6", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(ArrowUpCircle, { className: "mr-2 text-winnex-green", size: 20 }), "Deposit Funds"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Amount" }), _jsxs("div", { className: "relative", children: [_jsx(DollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60", size: 16 }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "Enter amount", className: "w-full pl-10 pr-4 py-3 bg-secondary rounded-lg border border-white/10 text-white" })] }), _jsx("div", { className: "flex gap-2 mt-2", children: [25, 50, 100, 250].map((preset) => (_jsxs("button", { onClick: () => setAmount(preset.toString()), className: "btn-secondary text-sm px-3 py-1", children: ["$", preset] }, preset))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Payment Method" }), _jsx("div", { className: "space-y-2", children: PAYMENT_METHODS.map((method) => (_jsx("button", { onClick: () => setSelectedMethod(method.type), className: `w-full p-4 rounded-lg border transition-all text-left ${selectedMethod === method.type
                                                        ? 'border-winnex-green bg-winnex-green/10'
                                                        : 'border-white/10 hover:border-white/20'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(method.icon, { size: 20, className: "text-winnex-green" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: method.name }), _jsx("div", { className: "text-sm text-white/60", children: method.processingTime })] })] }), _jsx("div", { className: "text-sm", children: _jsx("div", { className: "text-winnex-green", children: method.fees }) })] }) }, method.type))) })] }), _jsx("button", { onClick: handleDeposit, disabled: !amount || !selectedMethod || depositMutation.isPending, className: "btn-primary w-full", children: depositMutation.isPending ? 'Processing...' : 'Deposit Funds' })] })] }), _jsxs("div", { className: "card-modern p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Deposit Information" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-3 p-3 glass rounded-lg", children: [_jsx(Shield, { className: "text-winnex-green", size: 20 }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Secure & Encrypted" }), _jsx("div", { className: "text-sm text-white/60", children: "SSL 256-bit encryption" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Deposit Limits" }), _jsxs("div", { className: "text-sm space-y-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Minimum:" }), _jsx("span", { children: "$10" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Maximum (Daily):" }), _jsx("span", { children: "$10,000" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Maximum (Monthly):" }), _jsx("span", { children: "$50,000" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Processing Times" }), _jsxs("div", { className: "text-sm space-y-1", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Credit/Debit Card:" }), _jsx("span", { className: "text-winnex-green", children: "Instant" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Bank Transfer:" }), _jsx("span", { children: "1-3 business days" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-white/60", children: "Cryptocurrency:" }), _jsx("span", { children: "10-30 minutes" })] })] })] })] })] })] })), activeTab === 'withdraw' && (_jsxs("div", { className: "card-modern p-6 max-w-2xl mx-auto", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(ArrowDownCircle, { className: "mr-2 text-winnex-blue", size: 20 }), "Withdraw Funds"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Amount" }), _jsxs("div", { className: "relative", children: [_jsx(DollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60", size: 16 }), _jsx("input", { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "Enter amount", max: balance || 0, className: "w-full pl-10 pr-4 py-3 bg-secondary rounded-lg border border-white/10 text-white" })] }), _jsxs("div", { className: "text-sm text-white/60 mt-1", children: ["Available: $", balance || '0.00'] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Withdrawal Method" }), _jsx("div", { className: "space-y-2", children: paymentMethods.filter(m => m.verified).map((method) => (_jsx("button", { onClick: () => setSelectedMethod(method.id), className: `w-full p-4 rounded-lg border transition-all text-left ${selectedMethod === method.id
                                                ? 'border-winnex-blue bg-winnex-blue/10'
                                                : 'border-white/10 hover:border-white/20'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(CreditCard, { size: 20, className: "text-winnex-blue" }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: [method.brand, " \u2022\u2022\u2022\u2022 ", method.last4] }), _jsx("div", { className: "text-sm text-white/60", children: method.isDefault && _jsx("span", { className: "text-winnex-green", children: "Default" }) })] })] }), _jsx(CheckCircle, { size: 16, className: "text-winnex-green" })] }) }, method.id))) })] }), _jsx("button", { onClick: handleWithdraw, disabled: !amount || !selectedMethod || withdrawMutation.isPending, className: "btn-primary w-full", children: withdrawMutation.isPending ? 'Processing...' : 'Request Withdrawal' }), _jsx("div", { className: "p-4 glass rounded-lg", children: _jsxs("div", { className: "text-sm text-white/80", children: [_jsx("strong", { children: "Withdrawal Policy:" }), " Withdrawals are processed within 24-48 hours. First-time withdrawals may require additional verification."] }) })] })] })), activeTab === 'history' && (_jsxs("div", { className: "card-modern p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Transaction History" }), _jsx("div", { className: "space-y-3", children: transactions.length === 0 ? (_jsxs("div", { className: "text-center py-8 text-white/60", children: [_jsx(DollarSign, { className: "mx-auto mb-3", size: 24 }), _jsx("p", { children: "No transactions yet" })] })) : (transactions.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between p-4 glass-hover rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getStatusIcon(transaction.status), _jsxs("div", { children: [_jsx("div", { className: "font-medium capitalize", children: transaction.type.replace('_', ' ') }), _jsxs("div", { className: "text-sm text-white/60", children: [new Date(transaction.createdAt).toLocaleDateString(), " via ", transaction.method] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `font-bold ${transaction.type === 'deposit' ? 'text-winnex-green' :
                                                transaction.type === 'withdrawal' ? 'text-winnex-blue' :
                                                    'text-winnex-orange'}`, children: [transaction.type === 'withdrawal' ? '-' : '+', "$", transaction.amount.toFixed(2)] }), _jsx("div", { className: `text-sm ${getStatusColor(transaction.status)}`, children: transaction.status })] })] }, transaction.id)))) })] }))] }));
}
