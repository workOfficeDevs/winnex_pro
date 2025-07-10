import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Bitcoin, Coins, TrendingUp, Clock, CheckCircle, AlertCircle, Copy, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
export default function CryptoPaymentGateway() {
    const [selectedCurrency, setSelectedCurrency] = useState('BTC');
    const [depositAmount, setDepositAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [withdrawAddress, setWithdrawAddress] = useState('');
    const [activeTab, setActiveTab] = useState('deposit');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    // Supported cryptocurrencies with competitive rates
    const cryptoCurrencies = [
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            network: 'Bitcoin',
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            rate: 67420.50,
            minDeposit: 0.0001,
            maxDeposit: 10,
            confirmations: 1,
            fees: 0.0005,
            icon: '₿',
            available: true
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            network: 'Ethereum',
            address: '0x742d35Cc6634C0532925a3b8D15dB0b3d8CB5c2A',
            rate: 3847.25,
            minDeposit: 0.001,
            maxDeposit: 100,
            confirmations: 12,
            fees: 0.01,
            icon: 'Ξ',
            available: true
        },
        {
            symbol: 'USDT',
            name: 'Tether',
            network: 'TRC20',
            address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
            rate: 1.00,
            minDeposit: 10,
            maxDeposit: 50000,
            confirmations: 1,
            fees: 1.00,
            icon: '₮',
            available: true
        },
        {
            symbol: 'LTC',
            name: 'Litecoin',
            network: 'Litecoin',
            address: 'LQN2YnRgZKM5JwUF6Zw6b8YWd4V6uMn4Z2',
            rate: 142.85,
            minDeposit: 0.01,
            maxDeposit: 500,
            confirmations: 6,
            fees: 0.001,
            icon: 'Ł',
            available: true
        },
        {
            symbol: 'DOGE',
            name: 'Dogecoin',
            network: 'Dogecoin',
            address: 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L',
            rate: 0.32,
            minDeposit: 50,
            maxDeposit: 100000,
            confirmations: 6,
            fees: 1,
            icon: 'Ð',
            available: true
        }
    ];
    // Mock transactions for demo
    const mockTransactions = [
        {
            id: 'tx_001',
            currency: 'BTC',
            amount: 0.0025,
            usdValue: 168.55,
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            txHash: 'a1b2c3d4e5f6789012345678901234567890abcdef',
            status: 'completed',
            confirmations: 6,
            requiredConfirmations: 1,
            timestamp: '2024-06-14T14:30:00Z',
            type: 'deposit'
        },
        {
            id: 'tx_002',
            currency: 'ETH',
            amount: 0.05,
            usdValue: 192.36,
            address: '0x742d35Cc6634C0532925a3b8D15dB0b3d8CB5c2A',
            status: 'confirming',
            confirmations: 8,
            requiredConfirmations: 12,
            timestamp: '2024-06-14T15:45:00Z',
            type: 'deposit'
        }
    ];
    const selectedCrypto = cryptoCurrencies.find(crypto => crypto.symbol === selectedCurrency);
    const usdValue = depositAmount * (selectedCrypto?.rate || 0);
    // Generate deposit address mutation
    const generateAddressMutation = useMutation({
        mutationFn: async (currency) => {
            return apiRequest('POST', '/api/crypto/generate-address', { currency });
        },
        onSuccess: (data) => {
            toast({
                title: "Deposit Address Generated",
                description: "Your unique deposit address has been created.",
            });
        }
    });
    // Process withdrawal mutation
    const withdrawMutation = useMutation({
        mutationFn: async (withdrawalData) => {
            return apiRequest('POST', '/api/crypto/withdraw', withdrawalData);
        },
        onSuccess: () => {
            toast({
                title: "Withdrawal Initiated",
                description: "Your withdrawal has been submitted for processing.",
            });
            setWithdrawAmount(0);
            setWithdrawAddress('');
            queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
        },
        onError: (error) => {
            toast({
                title: "Withdrawal Failed",
                description: error.message || "Unable to process withdrawal.",
                variant: "destructive",
            });
        }
    });
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Address copied to clipboard",
        });
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-400';
            case 'confirming': return 'text-yellow-400';
            case 'pending': return 'text-blue-400';
            case 'failed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return _jsx(CheckCircle, { className: "w-4 h-4 text-green-400" });
            case 'confirming': return _jsx(Clock, { className: "w-4 h-4 text-yellow-400" });
            case 'pending': return _jsx(Clock, { className: "w-4 h-4 text-blue-400" });
            case 'failed': return _jsx(AlertCircle, { className: "w-4 h-4 text-red-400" });
            default: return _jsx(Clock, { className: "w-4 h-4 text-gray-400" });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30", children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-orange-500/20 rounded-lg", children: _jsx(Bitcoin, { className: "w-6 h-6 text-orange-400" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: "Crypto Payment Gateway" }), _jsx("p", { className: "text-sm text-gray-400", children: "Instant deposits \u2022 Fast withdrawals \u2022 5+ cryptocurrencies" })] })] }), _jsxs(Badge, { className: "bg-orange-500 text-white", children: [_jsx(Coins, { className: "w-3 h-3 mr-1" }), "LIVE"] })] }) }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: cryptoCurrencies.map((crypto) => (_jsx(Card, { className: `bg-winnex-gray border-gray-600 cursor-pointer transition-all hover:border-orange-400 ${selectedCurrency === crypto.symbol ? 'border-orange-400 bg-orange-500/10' : ''}`, onClick: () => setSelectedCurrency(crypto.symbol), children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold mb-1", children: crypto.icon }), _jsx("div", { className: "font-medium text-sm", children: crypto.symbol }), _jsxs("div", { className: "text-xs text-gray-400", children: ["$", crypto.rate.toLocaleString()] }), crypto.symbol === 'BTC' && (_jsxs("div", { className: "flex items-center justify-center mt-1", children: [_jsx(TrendingUp, { className: "w-3 h-3 text-green-400 mr-1" }), _jsx("span", { className: "text-xs text-green-400", children: "+2.4%" })] }))] }) }, crypto.symbol))) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3 bg-winnex-dark", children: [_jsx(TabsTrigger, { value: "deposit", children: "Deposit" }), _jsx(TabsTrigger, { value: "withdraw", children: "Withdraw" }), _jsx(TabsTrigger, { value: "history", children: "History" })] }), _jsx(TabsContent, { value: "deposit", className: "space-y-4", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Coins, { className: "w-5 h-5 mr-2 text-orange-400" }), "Crypto Deposit"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Currency" }), _jsxs(Select, { value: selectedCurrency, onValueChange: setSelectedCurrency, children: [_jsx(SelectTrigger, { className: "bg-winnex-dark border-gray-600", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: cryptoCurrencies.map((crypto) => (_jsx(SelectItem, { value: crypto.symbol, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: crypto.icon }), _jsx("span", { children: crypto.name })] }) }, crypto.symbol))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Amount" }), _jsx(Input, { type: "number", value: depositAmount, onChange: (e) => setDepositAmount(parseFloat(e.target.value) || 0), className: "bg-winnex-dark border-gray-600", placeholder: `Min: ${selectedCrypto?.minDeposit}` })] })] }), depositAmount > 0 && selectedCrypto && (_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Amount:" }), _jsxs("span", { className: "font-medium", children: [depositAmount, " ", selectedCurrency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "USD Value:" }), _jsxs("span", { className: "font-medium text-winnex-green", children: ["$", usdValue.toFixed(2)] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Network:" }), _jsx("span", { className: "text-sm", children: selectedCrypto.network })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Confirmations:" }), _jsx("span", { className: "text-sm", children: selectedCrypto.confirmations })] })] })), selectedCrypto && (_jsxs("div", { className: "bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h4", { className: "font-medium", children: "Deposit Address" }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-gray-600", children: [_jsx(QrCode, { className: "w-4 h-4 mr-2" }), "QR Code"] })] }), _jsxs("div", { className: "bg-winnex-dark rounded p-3 flex items-center justify-between", children: [_jsx("code", { className: "text-sm break-all", children: selectedCrypto.address }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => copyToClipboard(selectedCrypto.address), className: "ml-2", children: _jsx(Copy, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mt-3 text-xs text-gray-400", children: [_jsxs("p", { children: ["\u2022 Send only ", selectedCrypto.name, " to this address"] }), _jsxs("p", { children: ["\u2022 Minimum deposit: ", selectedCrypto.minDeposit, " ", selectedCurrency] }), _jsxs("p", { children: ["\u2022 Funds will be credited after ", selectedCrypto.confirmations, " confirmations"] })] })] }))] })] }) }), _jsx(TabsContent, { value: "withdraw", className: "space-y-4", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(TrendingUp, { className: "w-5 h-5 mr-2 text-orange-400" }), "Crypto Withdrawal"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Currency" }), _jsxs(Select, { value: selectedCurrency, onValueChange: setSelectedCurrency, children: [_jsx(SelectTrigger, { className: "bg-winnex-dark border-gray-600", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: cryptoCurrencies.map((crypto) => (_jsx(SelectItem, { value: crypto.symbol, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { children: crypto.icon }), _jsx("span", { children: crypto.name })] }) }, crypto.symbol))) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Amount" }), _jsx(Input, { type: "number", value: withdrawAmount, onChange: (e) => setWithdrawAmount(parseFloat(e.target.value) || 0), className: "bg-winnex-dark border-gray-600", placeholder: "Enter amount" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Withdrawal Address" }), _jsx(Input, { value: withdrawAddress, onChange: (e) => setWithdrawAddress(e.target.value), className: "bg-winnex-dark border-gray-600", placeholder: `Enter ${selectedCurrency} address` })] }), withdrawAmount > 0 && selectedCrypto && (_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Amount:" }), _jsxs("span", { className: "font-medium", children: [withdrawAmount, " ", selectedCurrency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Network Fee:" }), _jsxs("span", { className: "text-red-400", children: [selectedCrypto.fees, " ", selectedCurrency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "You'll Receive:" }), _jsxs("span", { className: "font-medium text-winnex-green", children: [(withdrawAmount - selectedCrypto.fees).toFixed(8), " ", selectedCurrency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "USD Value:" }), _jsxs("span", { className: "font-medium", children: ["$", ((withdrawAmount - selectedCrypto.fees) * selectedCrypto.rate).toFixed(2)] })] })] })), _jsx("div", { className: "bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3", children: _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-yellow-400 mt-0.5" }), _jsxs("div", { className: "text-sm text-yellow-200", children: [_jsx("p", { className: "font-medium", children: "Important:" }), _jsxs("ul", { className: "text-xs mt-1 space-y-1", children: [_jsx("li", { children: "\u2022 Withdrawals are processed within 10-30 minutes" }), _jsx("li", { children: "\u2022 Double-check your address - transactions are irreversible" }), _jsxs("li", { children: ["\u2022 Minimum withdrawal: ", selectedCrypto?.minDeposit, " ", selectedCurrency] })] })] })] }) }), _jsx(Button, { onClick: () => withdrawMutation.mutate({
                                                currency: selectedCurrency,
                                                amount: withdrawAmount,
                                                address: withdrawAddress
                                            }), disabled: withdrawMutation.isPending || !withdrawAddress || withdrawAmount <= 0, className: "w-full bg-orange-500 text-white hover:bg-orange-400", children: withdrawMutation.isPending ? "Processing..." : "Withdraw Crypto" })] })] }) }), _jsx(TabsContent, { value: "history", className: "space-y-4", children: _jsx("div", { className: "space-y-4", children: mockTransactions.map((tx) => (_jsx(Card, { className: "bg-winnex-gray border-gray-600", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-xl", children: cryptoCurrencies.find(c => c.symbol === tx.currency)?.icon }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium", children: [tx.type === 'deposit' ? 'Deposit' : 'Withdrawal', " \u2022 ", tx.currency] }), _jsx("div", { className: "text-sm text-gray-400", children: new Date(tx.timestamp).toLocaleDateString() })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getStatusIcon(tx.status), _jsx("span", { className: `text-sm font-medium ${getStatusColor(tx.status)}`, children: tx.status.toUpperCase() })] }), _jsxs("div", { className: "text-sm font-medium", children: [tx.amount, " ", tx.currency] }), _jsxs("div", { className: "text-xs text-gray-400", children: ["$", tx.usdValue.toFixed(2)] })] })] }), tx.status === 'confirming' && (_jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-400 mb-1", children: [_jsx("span", { children: "Confirmations" }), _jsxs("span", { children: [tx.confirmations, "/", tx.requiredConfirmations] })] }), _jsx(Progress, { value: (tx.confirmations / tx.requiredConfirmations) * 100, className: "h-2" })] })), tx.txHash && (_jsxs("div", { className: "mt-3 text-xs", children: [_jsx("span", { className: "text-gray-400", children: "TX Hash: " }), _jsxs("code", { className: "text-winnex-green", children: [tx.txHash.substring(0, 20), "..."] }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => copyToClipboard(tx.txHash), className: "ml-1 h-4 w-4 p-0", children: _jsx(Copy, { className: "w-3 h-3" }) })] }))] }) }, tx.id))) }) })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-400", children: "5" }), _jsx("div", { className: "text-sm text-gray-400", children: "Cryptocurrencies" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-400", children: "$47.2K" }), _jsx("div", { className: "text-sm text-gray-400", children: "24h Volume" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: "98.9%" }), _jsx("div", { className: "text-sm text-gray-400", children: "Success Rate" })] }) }), _jsx(Card, { className: "bg-winnex-gray border-gray-600 p-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-winnex-green", children: "~15min" }), _jsx("div", { className: "text-sm text-gray-400", children: "Avg Processing" })] }) })] })] }));
}
