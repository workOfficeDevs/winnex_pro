import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Copy, QrCode, Wallet, TrendingUp, DollarSign, Zap } from 'lucide-react';
export default function CryptoWallet() {
    const { toast } = useToast();
    const [balances, setBalances] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [depositAddresses, setDepositAddresses] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // Mock data - replace with real API calls
    useEffect(() => {
        const mockBalances = [
            {
                currency: 'Bitcoin',
                symbol: 'BTC',
                balance: 0.15420000,
                usdValue: 6842.50,
                change24h: 2.34,
                icon: '₿'
            },
            {
                currency: 'Ethereum',
                symbol: 'ETH',
                balance: 2.85300000,
                usdValue: 5628.75,
                change24h: -1.23,
                icon: 'Ξ'
            },
            {
                currency: 'USDT',
                symbol: 'USDT',
                balance: 1250.00,
                usdValue: 1250.00,
                change24h: 0.02,
                icon: '₮'
            },
            {
                currency: 'Litecoin',
                symbol: 'LTC',
                balance: 8.45000000,
                usdValue: 758.25,
                change24h: 1.87,
                icon: 'Ł'
            }
        ];
        const mockTransactions = [
            {
                id: 'tx_001',
                type: 'deposit',
                currency: 'BTC',
                amount: 0.05000000,
                usdValue: 2215.50,
                status: 'confirmed',
                timestamp: '2024-01-15T10:30:00Z',
                txHash: '1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890'
            },
            {
                id: 'tx_002',
                type: 'bet',
                currency: 'ETH',
                amount: -0.25000000,
                usdValue: -492.75,
                status: 'confirmed',
                timestamp: '2024-01-15T09:15:00Z'
            },
            {
                id: 'tx_003',
                type: 'win',
                currency: 'ETH',
                amount: 0.45000000,
                usdValue: 887.25,
                status: 'confirmed',
                timestamp: '2024-01-15T09:45:00Z'
            }
        ];
        const mockAddresses = [
            {
                currency: 'BTC',
                address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                network: 'Bitcoin Network'
            },
            {
                currency: 'ETH',
                address: '0x742d35Cc6634C0532925a3b8D8BF4F3F',
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                network: 'Ethereum Network'
            },
            {
                currency: 'USDT',
                address: '0x742d35Cc6634C0532925a3b8D8BF4F3F',
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                network: 'Ethereum Network (ERC-20)'
            },
            {
                currency: 'LTC',
                address: 'ltc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
                qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
                network: 'Litecoin Network'
            }
        ];
        setBalances(mockBalances);
        setTransactions(mockTransactions);
        setDepositAddresses(mockAddresses);
    }, []);
    const totalUsdValue = balances.reduce((sum, balance) => sum + balance.usdValue, 0);
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied to clipboard",
            description: "Address copied successfully",
        });
    };
    const handleWithdraw = async () => {
        if (!withdrawAmount || !withdrawAddress) {
            toast({
                title: "Error",
                description: "Please enter both amount and address",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast({
                title: "Withdrawal Initiated",
                description: `Withdrawal of ${withdrawAmount} ${selectedCurrency} has been submitted for processing`,
            });
            setWithdrawAmount('');
            setWithdrawAddress('');
            setIsLoading(false);
        }, 2000);
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'deposit': return _jsx(TrendingUp, { className: "h-4 w-4 text-green-500" });
            case 'withdrawal': return _jsx(TrendingUp, { className: "h-4 w-4 text-red-500 rotate-180" });
            case 'bet': return _jsx(DollarSign, { className: "h-4 w-4 text-blue-500" });
            case 'win': return _jsx(Zap, { className: "h-4 w-4 text-yellow-500" });
            default: return _jsx(DollarSign, { className: "h-4 w-4" });
        }
    };
    const getTypeColor = (type) => {
        switch (type) {
            case 'deposit': return 'text-green-500';
            case 'withdrawal': return 'text-red-500';
            case 'bet': return 'text-blue-500';
            case 'win': return 'text-yellow-500';
            default: return 'text-gray-500';
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Crypto Wallet" }), _jsx("p", { className: "text-gray-300", children: "Secure cryptocurrency management for betting" })] }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Wallet, { className: "h-8 w-8 text-yellow-400 mr-3" }), _jsx("span", { className: "text-2xl font-bold text-white", children: "Total Portfolio Value" })] }), _jsxs("div", { className: "text-5xl font-bold text-green-400 mb-2", children: ["$", totalUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })] }), _jsx("div", { className: "text-gray-400", children: "Across all cryptocurrencies" })] }) }), _jsxs(Tabs, { defaultValue: "balances", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-black/40 border-gray-700", children: [_jsx(TabsTrigger, { value: "balances", className: "text-white", children: "Balances" }), _jsx(TabsTrigger, { value: "deposit", className: "text-white", children: "Deposit" }), _jsx(TabsTrigger, { value: "withdraw", className: "text-white", children: "Withdraw" }), _jsx(TabsTrigger, { value: "history", className: "text-white", children: "History" })] }), _jsx(TabsContent, { value: "balances", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: balances.map((balance) => (_jsxs(Card, { className: "bg-black/40 border-gray-700 hover:bg-black/50 transition-colors", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-2xl mr-2", children: balance.icon }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white text-lg", children: balance.symbol }), _jsx(CardDescription, { className: "text-gray-400", children: balance.currency })] })] }), _jsxs(Badge, { variant: balance.change24h >= 0 ? "default" : "destructive", children: [balance.change24h >= 0 ? '+' : '', balance.change24h.toFixed(2), "%"] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-2xl font-bold text-white", children: balance.balance.toFixed(8) }), _jsxs("div", { className: "text-lg text-green-400", children: ["$", balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })] })] }) })] }, balance.symbol))) }) }), _jsx(TabsContent, { value: "deposit", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Select Cryptocurrency" }), _jsx(CardDescription, { className: "text-gray-400", children: "Choose which cryptocurrency you want to deposit" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: depositAddresses.map((addr) => (_jsxs(Button, { variant: selectedCurrency === addr.currency ? "default" : "outline", onClick: () => setSelectedCurrency(addr.currency), className: "h-16 flex flex-col", children: [_jsx("span", { className: "font-bold", children: addr.currency }), _jsx("span", { className: "text-xs opacity-70", children: addr.network })] }, addr.currency))) }) })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Deposit Address" }), _jsxs(CardDescription, { className: "text-gray-400", children: ["Send ", selectedCurrency, " to this address"] })] }), _jsx(CardContent, { children: depositAddresses
                                                    .filter(addr => addr.currency === selectedCurrency)
                                                    .map((addr) => (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center justify-center p-4 bg-white rounded-lg", children: _jsx(QrCode, { className: "h-32 w-32 text-black" }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-sm text-gray-400", children: ["Network: ", addr.network] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Input, { value: addr.address, readOnly: true, className: "bg-gray-800 border-gray-600 text-white" }), _jsx(Button, { size: "sm", onClick: () => copyToClipboard(addr.address), className: "px-3", children: _jsx(Copy, { className: "h-4 w-4" }) })] })] })] }, addr.currency))) })] })] }) }), _jsx(TabsContent, { value: "withdraw", children: _jsxs(Card, { className: "bg-black/40 border-gray-700 max-w-2xl mx-auto", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Withdraw Cryptocurrency" }), _jsx(CardDescription, { className: "text-gray-400", children: "Send your crypto to an external wallet" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Currency" }), _jsx("div", { className: "grid grid-cols-4 gap-2", children: ['BTC', 'ETH', 'USDT', 'LTC'].map((currency) => (_jsx(Button, { variant: selectedCurrency === currency ? "default" : "outline", onClick: () => setSelectedCurrency(currency), children: currency }, currency))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Amount" }), _jsx(Input, { type: "number", placeholder: "0.00000000", value: withdrawAmount, onChange: (e) => setWithdrawAmount(e.target.value), className: "bg-gray-800 border-gray-600 text-white" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Destination Address" }), _jsx(Input, { placeholder: "Enter wallet address", value: withdrawAddress, onChange: (e) => setWithdrawAddress(e.target.value), className: "bg-gray-800 border-gray-600 text-white" })] }), _jsx(Button, { className: "w-full", onClick: handleWithdraw, disabled: isLoading, children: isLoading ? 'Processing...' : 'Withdraw' })] })] }) }), _jsx(TabsContent, { value: "history", children: _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Transaction History" }), _jsx(CardDescription, { className: "text-gray-400", children: "Your recent cryptocurrency transactions" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: transactions.map((tx) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800/50 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [getTypeIcon(tx.type), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-white capitalize", children: tx.type }), _jsx("div", { className: "text-sm text-gray-400", children: new Date(tx.timestamp).toLocaleDateString() })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `font-medium ${getTypeColor(tx.type)}`, children: [tx.amount > 0 ? '+' : '', tx.amount.toFixed(8), " ", tx.currency] }), _jsxs("div", { className: "text-sm text-gray-400", children: ["$", Math.abs(tx.usdValue).toLocaleString('en-US', { minimumFractionDigits: 2 })] })] }), _jsx(Badge, { variant: tx.status === 'confirmed' ? 'default' : 'secondary', children: tx.status })] }, tx.id))) }) })] }) })] })] }) }));
}
