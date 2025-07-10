import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CreditCard, DollarSign, Bitcoin, Zap, Shield, Clock, Globe } from "lucide-react";
export default function AdvancedPaymentSystem() {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    useEffect(() => {
        const mockPaymentMethods = [
            {
                id: 'visa',
                type: 'card',
                name: 'Visa/Mastercard',
                icon: _jsx(CreditCard, { className: "w-6 h-6" }),
                isDefault: true,
                isEnabled: true,
                fees: { deposit: 2.5, withdrawal: 1.5 },
                limits: { minDeposit: 10, maxDeposit: 10000, minWithdrawal: 20, maxWithdrawal: 5000 },
                processingTime: { deposit: 'Instant', withdrawal: '1-3 business days' },
                currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD']
            },
            {
                id: 'bitcoin',
                type: 'crypto',
                name: 'Bitcoin',
                icon: _jsx(Bitcoin, { className: "w-6 h-6" }),
                isDefault: false,
                isEnabled: true,
                fees: { deposit: 0, withdrawal: 0.0005 },
                limits: { minDeposit: 0.001, maxDeposit: 10, minWithdrawal: 0.001, maxWithdrawal: 5 },
                processingTime: { deposit: '1-6 confirmations', withdrawal: '30-60 minutes' },
                currencies: ['BTC']
            },
            {
                id: 'ethereum',
                type: 'crypto',
                name: 'Ethereum',
                icon: _jsx(Globe, { className: "w-6 h-6" }),
                isDefault: false,
                isEnabled: true,
                fees: { deposit: 0, withdrawal: 0.01 },
                limits: { minDeposit: 0.01, maxDeposit: 100, minWithdrawal: 0.01, maxWithdrawal: 50 },
                processingTime: { deposit: '12-35 confirmations', withdrawal: '15-30 minutes' },
                currencies: ['ETH']
            },
            {
                id: 'paypal',
                type: 'ewallet',
                name: 'PayPal',
                icon: _jsx(DollarSign, { className: "w-6 h-6" }),
                isDefault: false,
                isEnabled: true,
                fees: { deposit: 3.5, withdrawal: 2.0 },
                limits: { minDeposit: 5, maxDeposit: 5000, minWithdrawal: 10, maxWithdrawal: 2500 },
                processingTime: { deposit: 'Instant', withdrawal: '1-2 business days' },
                currencies: ['USD', 'EUR', 'GBP']
            }
        ];
        const mockCryptoCurrencies = [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                icon: '₿',
                price: 43250.50,
                change24h: 2.34,
                network: 'Bitcoin',
                confirmations: 3,
                address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
            },
            {
                symbol: 'ETH',
                name: 'Ethereum',
                icon: 'Ξ',
                price: 2650.75,
                change24h: -1.25,
                network: 'Ethereum',
                confirmations: 12,
                address: '0x742d35Cc6634C0532925a3b8D0C4E8D8z1c8B9A'
            },
            {
                symbol: 'USDT',
                name: 'Tether',
                icon: '₮',
                price: 1.00,
                change24h: 0.01,
                network: 'Ethereum',
                confirmations: 12,
                address: '0x742d35Cc6634C0532925a3b8D0C4E8D8z1c8B9A'
            }
        ];
        const mockTransactions = [
            {
                id: 'tx_001',
                type: 'deposit',
                method: 'Bitcoin',
                amount: 500,
                currency: 'USD',
                status: 'completed',
                timestamp: '2024-01-15 14:30:25',
                txHash: '7d8a9b2c1e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z',
                fee: 0,
                exchangeRate: 43250.50
            },
            {
                id: 'tx_002',
                type: 'withdrawal',
                method: 'Visa',
                amount: 250,
                currency: 'USD',
                status: 'processing',
                timestamp: '2024-01-15 16:45:12',
                fee: 3.75
            },
            {
                id: 'tx_003',
                type: 'deposit',
                method: 'Ethereum',
                amount: 1000,
                currency: 'USD',
                status: 'pending',
                timestamp: '2024-01-15 18:20:08',
                txHash: '0x9f8e7d6c5b4a39281726354859603948576839201847362819',
                fee: 0,
                exchangeRate: 2650.75
            }
        ];
        setPaymentMethods(mockPaymentMethods);
        setCryptoCurrencies(mockCryptoCurrencies);
        setTransactions(mockTransactions);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-500/20 text-green-400';
            case 'processing': return 'bg-yellow-500/20 text-yellow-400';
            case 'pending': return 'bg-blue-500/20 text-blue-400';
            case 'failed': return 'bg-red-500/20 text-red-400';
            case 'cancelled': return 'bg-gray-500/20 text-gray-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
        { code: 'ETH', name: 'Ethereum', symbol: 'Ξ' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
    ];
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(DollarSign, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Advanced Payment Center" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Secure, fast, and flexible payment solutions" })] }), _jsxs(Tabs, { defaultValue: "deposit", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "deposit", className: "flex items-center", children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Deposit"] }), _jsxs(TabsTrigger, { value: "withdraw", className: "flex items-center", children: [_jsx(Clock, { className: "w-4 h-4 mr-2" }), "Withdraw"] }), _jsxs(TabsTrigger, { value: "crypto", className: "flex items-center", children: [_jsx(Bitcoin, { className: "w-4 h-4 mr-2" }), "Crypto"] }), _jsxs(TabsTrigger, { value: "transactions", className: "flex items-center", children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), "Transactions"] })] }), _jsx(TabsContent, { value: "deposit", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Zap, { className: "w-6 h-6 mr-2 text-emerald-400" }), "Instant Deposit"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: "Amount" }), _jsx(Input, { type: "number", placeholder: "0.00", value: amount, onChange: (e) => setAmount(e.target.value), className: "bg-gray-800 border-gray-700 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: "Currency" }), _jsxs(Select, { value: selectedCurrency, onValueChange: setSelectedCurrency, children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-700", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: currencies.map((currency) => (_jsxs(SelectItem, { value: currency.code, children: [currency.symbol, " ", currency.name] }, currency.code))) })] })] })] }), _jsxs("div", { className: "grid gap-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Select Payment Method" }), paymentMethods.map((method) => (_jsx(Card, { className: `cursor-pointer transition-all ${selectedMethod === method.id
                                                        ? 'border-emerald-400 bg-emerald-500/10'
                                                        : 'casino-card hover:border-emerald-400/50'}`, onClick: () => setSelectedMethod(method.id), children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "text-emerald-400", children: method.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-white", children: method.name }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Fee: ", method.fees.deposit, "% \u2022 Processing: ", method.processingTime.deposit] })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Limits" }), _jsxs("div", { className: "text-white font-semibold", children: ["$", method.limits.minDeposit, " - $", method.limits.maxDeposit] })] })] }) }) }, method.id)))] }), selectedMethod && amount && (_jsx(Card, { className: "border-emerald-400/20 bg-emerald-500/5", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "You Pay" }), _jsxs("div", { className: "text-xl font-bold text-white", children: [amount, " ", selectedCurrency] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "Fee" }), _jsxs("div", { className: "text-lg font-semibold text-orange-400", children: [(parseFloat(amount) * 0.025).toFixed(2), " ", selectedCurrency] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: "You Receive" }), _jsxs("div", { className: "text-xl font-bold text-emerald-400", children: [(parseFloat(amount) - parseFloat(amount) * 0.025).toFixed(2), " ", selectedCurrency] })] })] }), _jsx(Button, { className: "w-full mt-4 bg-emerald-500 hover:bg-emerald-600", children: "Continue to Payment" })] }) }))] })] }) }), _jsx(TabsContent, { value: "withdraw", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Clock, { className: "w-6 h-6 mr-2 text-blue-400" }), "Withdrawal Request"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-4", children: [_jsx("div", { className: "text-blue-400 font-semibold mb-2", children: "Available Balance" }), _jsx("div", { className: "text-3xl font-bold text-white", children: "$2,847.50" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: "Withdrawal Amount" }), _jsx(Input, { type: "number", placeholder: "0.00", className: "bg-gray-800 border-gray-700 text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-400 mb-2 block", children: "Currency" }), _jsxs(Select, { defaultValue: "USD", children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-700", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: currencies.map((currency) => (_jsxs(SelectItem, { value: currency.code, children: [currency.symbol, " ", currency.name] }, currency.code))) })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Withdrawal Methods" }), paymentMethods.filter(m => m.type !== 'crypto').map((method) => (_jsx(Card, { className: "casino-card cursor-pointer hover:border-blue-400/50", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "text-blue-400", children: method.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-white", children: method.name }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Fee: ", method.fees.withdrawal, "% \u2022 Processing: ", method.processingTime.withdrawal] })] })] }), _jsx(Badge, { variant: "outline", children: method.processingTime.withdrawal })] }) }) }, method.id)))] })] })] }) }), _jsx(TabsContent, { value: "crypto", className: "space-y-6", children: _jsx("div", { className: "grid gap-6 md:grid-cols-3", children: cryptoCurrencies.map((crypto) => (_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-2xl", children: crypto.icon }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: crypto.name }), _jsx("div", { className: "text-sm text-gray-400", children: crypto.symbol })] })] }), _jsxs(Badge, { variant: crypto.change24h > 0 ? 'default' : 'destructive', children: [crypto.change24h > 0 ? '+' : '', crypto.change24h, "%"] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: ["$", crypto.price.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Current Price" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-sm text-gray-400", children: ["Network: ", crypto.network] }), _jsxs("div", { className: "text-sm text-gray-400", children: ["Confirmations: ", crypto.confirmations] })] }), crypto.address && (_jsxs("div", { className: "p-3 bg-gray-800 rounded border", children: [_jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Deposit Address:" }), _jsx("div", { className: "text-xs text-white font-mono break-all", children: crypto.address })] })), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { className: "flex-1 bg-emerald-500 hover:bg-emerald-600", children: ["Deposit ", crypto.symbol] }), _jsx(Button, { variant: "outline", className: "flex-1", children: "Withdraw" })] })] })] }, crypto.symbol))) }) }), _jsx(TabsContent, { value: "transactions", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Transaction History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: transactions.map((tx) => (_jsx(Card, { className: "border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx(Badge, { variant: tx.type === 'deposit' ? 'default' : 'secondary', children: tx.type.toUpperCase() }), _jsx("span", { className: "font-semibold text-white", children: tx.method }), _jsx(Badge, { className: getStatusColor(tx.status), children: tx.status.toUpperCase() })] }), _jsxs("div", { className: "text-sm text-gray-400 space-y-1", children: [_jsxs("div", { children: ["Amount: ", tx.amount, " ", tx.currency] }), _jsxs("div", { children: ["Fee: ", tx.fee, " ", tx.currency] }), _jsxs("div", { children: ["Date: ", tx.timestamp] }), tx.txHash && (_jsxs("div", { className: "font-mono text-xs", children: ["Hash: ", tx.txHash.substring(0, 20), "..."] }))] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `text-2xl font-bold ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`, children: [tx.type === 'deposit' ? '+' : '-', tx.amount, " ", tx.currency] }), tx.status === 'processing' && (_jsx(Progress, { value: 65, className: "w-20 h-2 mt-2" }))] })] }) }) }, tx.id))) }) })] }) })] })] }));
}
