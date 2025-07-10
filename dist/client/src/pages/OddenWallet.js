import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Bitcoin, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, History, Shield, Zap, Copy, QrCode, RefreshCw, Send, Download, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import OddenNav from '@/components/OddenNav';
export default function OddenWallet() {
    const [balancesVisible, setBalancesVisible] = useState(true);
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const { toast } = useToast();
    // Mock crypto balances with real-time-like data
    const [cryptoBalances, setCryptoBalances] = useState([
        {
            currency: 'Bitcoin',
            symbol: 'BTC',
            balance: 0.5847,
            usdValue: 27234.56,
            change24h: 2.4,
            icon: '₿'
        },
        {
            currency: 'Ethereum',
            symbol: 'ETH',
            balance: 8.2341,
            usdValue: 19842.33,
            change24h: -1.8,
            icon: 'Ξ'
        },
        {
            currency: 'Tether USD',
            symbol: 'USDT',
            balance: 12450.00,
            usdValue: 12450.00,
            change24h: 0.0,
            icon: '₮'
        },
        {
            currency: 'Litecoin',
            symbol: 'LTC',
            balance: 45.7892,
            usdValue: 4123.45,
            change24h: 5.2,
            icon: 'Ł'
        }
    ]);
    const [transactions, setTransactions] = useState([
        {
            id: 'tx_001',
            type: 'winnings',
            currency: 'BTC',
            amount: 0.0234,
            usdValue: 1156.78,
            status: 'confirmed',
            txHash: '0x123...abc789',
            timestamp: '2025-01-29T10:30:00Z',
            description: 'NFL Championship Contest - 1st Place'
        },
        {
            id: 'tx_002',
            type: 'contest_entry',
            currency: 'ETH',
            amount: -0.0125,
            usdValue: -34.50,
            status: 'confirmed',
            timestamp: '2025-01-29T09:15:00Z',
            description: 'NBA Showdown Entry Fee'
        },
        {
            id: 'tx_003',
            type: 'deposit',
            currency: 'USDT',
            amount: 500.00,
            usdValue: 500.00,
            status: 'confirmed',
            txHash: '0x456...def123',
            timestamp: '2025-01-28T15:45:00Z',
            description: 'Wallet Deposit'
        },
        {
            id: 'tx_004',
            type: 'withdrawal',
            currency: 'BTC',
            amount: -0.1000,
            usdValue: -4850.00,
            status: 'pending',
            timestamp: '2025-01-28T12:20:00Z',
            description: 'External Wallet Transfer'
        },
        {
            id: 'tx_005',
            type: 'winnings',
            currency: 'LTC',
            amount: 2.5000,
            usdValue: 225.50,
            status: 'confirmed',
            timestamp: '2025-01-27T18:30:00Z',
            description: 'Soccer Premier League - 3rd Place'
        }
    ]);
    const totalBalance = cryptoBalances.reduce((sum, balance) => sum + balance.usdValue, 0);
    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call to update balances
        await new Promise(resolve => setTimeout(resolve, 2000));
        // Simulate price updates
        setCryptoBalances(prev => prev.map(balance => ({
            ...balance,
            change24h: balance.change24h + (Math.random() - 0.5) * 2,
            usdValue: balance.usdValue * (1 + (Math.random() - 0.5) * 0.02)
        })));
        setRefreshing(false);
        toast({
            title: "Balances Updated",
            description: "Your wallet balances have been refreshed with the latest market data."
        });
    };
    const handleWithdraw = () => {
        if (!withdrawAmount || !withdrawAddress) {
            toast({
                title: "Withdrawal Error",
                description: "Please enter both amount and withdrawal address.",
                variant: "destructive"
            });
            return;
        }
        toast({
            title: "Withdrawal Initiated",
            description: `${withdrawAmount} ${selectedCurrency} withdrawal request submitted.`
        });
        setWithdrawAmount('');
        setWithdrawAddress('');
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to Clipboard",
            description: "Address copied successfully."
        });
    };
    const getTransactionIcon = (type) => {
        switch (type) {
            case 'deposit': return _jsx(ArrowDownLeft, { className: "w-4 h-4 text-green-400" });
            case 'withdrawal': return _jsx(ArrowUpRight, { className: "w-4 h-4 text-red-400" });
            case 'contest_entry': return _jsx(Send, { className: "w-4 h-4 text-blue-400" });
            case 'winnings': return _jsx(TrendingUp, { className: "w-4 h-4 text-yellow-400" });
            default: return _jsx(History, { className: "w-4 h-4 text-gray-400" });
        }
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return _jsx(Badge, { className: "bg-green-500/20 text-green-300 border-green-500/30", children: "Confirmed" });
            case 'pending':
                return _jsx(Badge, { className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", children: "Pending" });
            case 'failed':
                return _jsx(Badge, { className: "bg-red-500/20 text-red-300 border-red-500/30", children: "Failed" });
            default:
                return _jsx(Badge, { className: "bg-gray-500/20 text-gray-300 border-gray-500/30", children: "Unknown" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900", children: [_jsx(OddenNav, {}), _jsx("section", { className: "bg-black/30 backdrop-blur-lg border-b border-emerald-500/20", children: _jsx("div", { className: "max-w-7xl mx-auto px-6 py-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Crypto Wallet" }), _jsx("p", { className: "text-emerald-300", children: "Secure cryptocurrency management for fantasy contests" })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Button, { onClick: handleRefresh, disabled: refreshing, className: "bg-emerald-600 hover:bg-emerald-700", children: [refreshing ? (_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" })) : (_jsx(RefreshCw, { className: "w-4 h-4 mr-2" })), "Refresh"] }), _jsx(Button, { onClick: () => setBalancesVisible(!balancesVisible), variant: "outline", className: "border-emerald-500 text-emerald-300", children: balancesVisible ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }) }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-6 py-8", children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mb-8", children: _jsx(Card, { className: "bg-black/50 backdrop-blur-lg border-emerald-500/30", children: _jsx(CardContent, { className: "p-8", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-emerald-300 text-lg", children: "Total Portfolio Value" }), _jsx("p", { className: "text-4xl font-bold text-white", children: balancesVisible ? `$${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '••••••' })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-emerald-300", children: "24h Change" }), _jsx("p", { className: "text-xl font-semibold text-green-400", children: "+$1,234.56 (+2.1%)" })] }), _jsx(Wallet, { className: "w-12 h-12 text-emerald-400" })] })] }) }) }) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Bitcoin, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Cryptocurrency Balances"] }) }), _jsx(CardContent, { className: "space-y-4", children: cryptoBalances.map((balance, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between p-4 bg-emerald-900/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-bold", children: balance.icon }), _jsxs("div", { children: [_jsxs("p", { className: "text-white font-semibold", children: [balance.currency, " (", balance.symbol, ")"] }), _jsx("p", { className: "text-emerald-300 text-sm", children: balancesVisible ? `${balance.balance.toFixed(4)} ${balance.symbol}` : '••••••' })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-white font-semibold", children: balancesVisible ? `$${balance.usdValue.toLocaleString()}` : '••••••' }), _jsxs("div", { className: "flex items-center", children: [balance.change24h >= 0 ? (_jsx(TrendingUp, { className: "w-4 h-4 text-green-400 mr-1" })) : (_jsx(TrendingDown, { className: "w-4 h-4 text-red-400 mr-1" })), _jsxs("span", { className: `text-sm ${balance.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [balance.change24h >= 0 ? '+' : '', balance.change24h.toFixed(1), "%"] })] })] })] }, balance.symbol))) })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(History, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Recent Transactions"] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: transactions.map((tx, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, className: "flex items-center justify-between p-3 bg-emerald-900/30 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [getTransactionIcon(tx.type), _jsxs("div", { children: [_jsx("p", { className: "text-white font-semibold", children: tx.description }), _jsxs("p", { className: "text-emerald-300 text-sm", children: [new Date(tx.timestamp).toLocaleDateString(), " \u2022 ", tx.currency] })] })] }), _jsxs("div", { className: "text-right flex items-center space-x-3", children: [_jsxs("div", { children: [_jsxs("p", { className: `font-semibold ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [tx.amount >= 0 ? '+' : '', tx.amount.toFixed(4), " ", tx.currency] }), _jsxs("p", { className: "text-emerald-300 text-sm", children: ["$", Math.abs(tx.usdValue).toLocaleString()] })] }), getStatusBadge(tx.status)] })] }, tx.id))) }) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Zap, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Quick Actions"] }) }), _jsxs(CardContent, { className: "space-y-3", children: [_jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { className: "w-full bg-emerald-600 hover:bg-emerald-700", children: [_jsx(ArrowDownLeft, { className: "w-4 h-4 mr-2" }), "Deposit Crypto"] }) }), _jsxs(DialogContent, { className: "bg-black/90 border-emerald-500/30", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-white", children: "Deposit Cryptocurrency" }) }), _jsx("div", { className: "space-y-4 py-4", children: _jsxs("div", { className: "text-center", children: [_jsx(QrCode, { className: "w-32 h-32 mx-auto text-emerald-400 mb-4" }), _jsx("p", { className: "text-emerald-300 mb-2", children: "Bitcoin Deposit Address:" }), _jsxs("div", { className: "flex items-center space-x-2 bg-emerald-900/30 p-3 rounded", children: [_jsx("code", { className: "text-white text-sm", children: "bc1q...sample...address" }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => copyToClipboard('bc1q...sample...address'), children: _jsx(Copy, { className: "w-4 h-4" }) })] })] }) })] })] }), _jsxs(Dialog, { children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: "w-full border-emerald-500 text-emerald-300", children: [_jsx(ArrowUpRight, { className: "w-4 h-4 mr-2" }), "Withdraw Crypto"] }) }), _jsxs(DialogContent, { className: "bg-black/90 border-emerald-500/30", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-white", children: "Withdraw Cryptocurrency" }) }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-emerald-300", children: "Currency" }), _jsx("select", { value: selectedCurrency, onChange: (e) => setSelectedCurrency(e.target.value), className: "w-full bg-emerald-900/30 border border-emerald-500/30 rounded p-2 text-white", children: cryptoBalances.map(balance => (_jsxs("option", { value: balance.symbol, children: [balance.currency, " (", balance.symbol, ")"] }, balance.symbol))) })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-emerald-300", children: "Amount" }), _jsx(Input, { type: "number", placeholder: "0.00", value: withdrawAmount, onChange: (e) => setWithdrawAmount(e.target.value), className: "bg-emerald-900/30 border-emerald-500/30 text-white" })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-emerald-300", children: "Withdrawal Address" }), _jsx(Input, { placeholder: "Enter wallet address", value: withdrawAddress, onChange: (e) => setWithdrawAddress(e.target.value), className: "bg-emerald-900/30 border-emerald-500/30 text-white" })] }), _jsx(Button, { onClick: handleWithdraw, className: "w-full bg-emerald-600 hover:bg-emerald-700", children: "Confirm Withdrawal" })] })] })] }), _jsxs(Button, { variant: "outline", className: "w-full border-emerald-500 text-emerald-300", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export History"] })] })] }), _jsxs(Card, { className: "bg-black/50 border-emerald-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Shield, { className: "w-5 h-5 mr-2 text-emerald-400" }), "Security Features"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Two-Factor Auth" }), _jsx(CheckCircle, { className: "w-5 h-5 text-green-400" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Cold Storage" }), _jsx(CheckCircle, { className: "w-5 h-5 text-green-400" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Multi-Sig Wallet" }), _jsx(CheckCircle, { className: "w-5 h-5 text-green-400" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-emerald-300", children: "Insurance Coverage" }), _jsx(CheckCircle, { className: "w-5 h-5 text-green-400" })] }), _jsx("div", { className: "mt-4 p-3 bg-emerald-900/30 rounded-lg", children: _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(Shield, { className: "w-5 h-5 text-emerald-400 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-semibold text-sm", children: "Bank-Level Security" }), _jsx("p", { className: "text-emerald-300 text-xs", children: "Your funds are protected with enterprise security measures." })] })] }) })] })] })] })] })] })] }));
}
