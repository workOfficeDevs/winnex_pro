import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CreditCard, Smartphone, Bitcoin, DollarSign, ArrowUpRight, ArrowDownLeft, Clock, Shield, Zap, Globe, CheckCircle, AlertCircle, TrendingUp, Wallet } from "lucide-react";
export default function AdvancedPaymentGateway() {
    const [selectedTab, setSelectedTab] = useState('methods');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [withdrawalAddress, setWithdrawalAddress] = useState('');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: paymentMethods } = useQuery({
        queryKey: ['/api/payment/methods'],
    });
    const { data: cryptoPrices } = useQuery({
        queryKey: ['/api/crypto/prices'],
        refetchInterval: 30000,
    });
    const { data: transactions } = useQuery({
        queryKey: ['/api/user/transactions'],
    });
    const { data: taxReport } = useQuery({
        queryKey: ['/api/user/tax-report'],
    });
    const mockPaymentMethods = [
        {
            id: 'visa',
            type: 'card',
            name: 'Visa/Mastercard',
            icon: _jsx(CreditCard, { className: "w-6 h-6" }),
            isDefault: true,
            isEnabled: true,
            fees: { deposit: 2.9, withdrawal: 0 },
            limits: { minDeposit: 10, maxDeposit: 5000, minWithdrawal: 20, maxWithdrawal: 2500 },
            processingTime: { deposit: 'Instant', withdrawal: '1-3 business days' },
            currencies: ['USD', 'EUR', 'GBP', 'CAD']
        },
        {
            id: 'paypal',
            type: 'ewallet',
            name: 'PayPal',
            icon: _jsx(Smartphone, { className: "w-6 h-6" }),
            isDefault: false,
            isEnabled: true,
            fees: { deposit: 3.5, withdrawal: 1.0 },
            limits: { minDeposit: 5, maxDeposit: 2000, minWithdrawal: 10, maxWithdrawal: 1000 },
            processingTime: { deposit: 'Instant', withdrawal: '24 hours' },
            currencies: ['USD', 'EUR', 'GBP']
        },
        {
            id: 'bitcoin',
            type: 'crypto',
            name: 'Bitcoin',
            icon: _jsx(Bitcoin, { className: "w-6 h-6" }),
            isDefault: false,
            isEnabled: true,
            fees: { deposit: 0, withdrawal: 0.0005 },
            limits: { minDeposit: 0.001, maxDeposit: 10, minWithdrawal: 0.002, maxWithdrawal: 5 },
            processingTime: { deposit: '10-60 minutes', withdrawal: '10-60 minutes' },
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
            limits: { minDeposit: 0.01, maxDeposit: 100, minWithdrawal: 0.02, maxWithdrawal: 50 },
            processingTime: { deposit: '5-15 minutes', withdrawal: '5-15 minutes' },
            currencies: ['ETH']
        },
        {
            id: 'apple_pay',
            type: 'mobile',
            name: 'Apple Pay',
            icon: _jsx(Smartphone, { className: "w-6 h-6" }),
            isDefault: false,
            isEnabled: true,
            fees: { deposit: 2.5, withdrawal: 0 },
            limits: { minDeposit: 1, maxDeposit: 1000, minWithdrawal: 0, maxWithdrawal: 0 },
            processingTime: { deposit: 'Instant', withdrawal: 'Not supported' },
            currencies: ['USD', 'EUR', 'GBP']
        }
    ];
    const mockCryptoPrices = [
        {
            symbol: 'BTC',
            name: 'Bitcoin',
            icon: '₿',
            price: 42850.32,
            change24h: 2.45,
            network: 'Bitcoin',
            confirmations: 3,
            address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
            qrCode: 'btc_qr_placeholder'
        },
        {
            symbol: 'ETH',
            name: 'Ethereum',
            icon: 'Ξ',
            price: 2650.87,
            change24h: -1.23,
            network: 'Ethereum',
            confirmations: 12,
            address: '0x742d35Cc6634C0532925a3b8D0D6E',
            qrCode: 'eth_qr_placeholder'
        },
        {
            symbol: 'LTC',
            name: 'Litecoin',
            icon: 'Ł',
            price: 72.45,
            change24h: 0.89,
            network: 'Litecoin',
            confirmations: 6,
            address: 'LQTpS7FRN8XWJwJZjyJvN9eqeH',
            qrCode: 'ltc_qr_placeholder'
        },
        {
            symbol: 'USDT',
            name: 'Tether',
            icon: '₮',
            price: 1.00,
            change24h: 0.01,
            network: 'Ethereum (ERC-20)',
            confirmations: 12,
            address: '0x742d35Cc6634C0532925a3b8D0D6E',
            qrCode: 'usdt_qr_placeholder'
        }
    ];
    const mockTransactions = [
        {
            id: '1',
            type: 'deposit',
            method: 'Bitcoin',
            amount: 0.125,
            currency: 'BTC',
            status: 'completed',
            timestamp: '2024-01-15 14:30:22',
            txHash: '1a2b3c4d5e6f7890abcdef1234567890',
            fee: 0.0005,
            exchange_rate: 42850.32
        },
        {
            id: '2',
            type: 'withdrawal',
            method: 'PayPal',
            amount: 500,
            currency: 'USD',
            status: 'processing',
            timestamp: '2024-01-15 12:15:45',
            fee: 5.00
        },
        {
            id: '3',
            type: 'deposit',
            method: 'Visa',
            amount: 250,
            currency: 'USD',
            status: 'completed',
            timestamp: '2024-01-14 18:45:12',
            fee: 7.25
        }
    ];
    const mockTaxReport = {
        year: 2024,
        totalDeposits: 15750.00,
        totalWithdrawals: 8230.50,
        totalFees: 156.75,
        netGains: 2340.80,
        taxableEvents: [
            { date: '2024-01-15', type: 'Crypto Sale', amount: 5356.40, currency: 'USD', taxable: true },
            { date: '2024-01-10', type: 'Winning Withdrawal', amount: 1250.00, currency: 'USD', taxable: true },
            { date: '2024-01-05', type: 'Deposit', amount: 500.00, currency: 'USD', taxable: false }
        ]
    };
    const methods = paymentMethods || mockPaymentMethods;
    const prices = cryptoPrices || mockCryptoPrices;
    const txList = transactions || mockTransactions;
    const taxData = taxReport || mockTaxReport;
    const depositMutation = useMutation({
        mutationFn: async (data) => {
            return apiRequest('POST', '/api/payment/deposit', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/transactions'] });
            queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
            toast({
                title: "Deposit Initiated",
                description: "Your deposit is being processed",
            });
            setAmount('');
        },
    });
    const withdrawMutation = useMutation({
        mutationFn: async (data) => {
            return apiRequest('POST', '/api/payment/withdraw', data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['/api/user/transactions'] });
            queryClient.invalidateQueries({ queryKey: ['/api/user/balance'] });
            toast({
                title: "Withdrawal Initiated",
                description: "Your withdrawal is being processed",
            });
            setAmount('');
            setWithdrawalAddress('');
        },
    });
    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return _jsx(CheckCircle, { className: "w-4 h-4 text-green-500" });
            case 'processing': return _jsx(Clock, { className: "w-4 h-4 text-yellow-500" });
            case 'pending': return _jsx(Clock, { className: "w-4 h-4 text-blue-500" });
            case 'failed': return _jsx(AlertCircle, { className: "w-4 h-4 text-red-500" });
            default: return _jsx(Clock, { className: "w-4 h-4 text-gray-500" });
        }
    };
    const getMethodIcon = (type) => {
        switch (type) {
            case 'card': return _jsx(CreditCard, { className: "w-5 h-5" });
            case 'crypto': return _jsx(Bitcoin, { className: "w-5 h-5" });
            case 'ewallet': return _jsx(Wallet, { className: "w-5 h-5" });
            case 'mobile': return _jsx(Smartphone, { className: "w-5 h-5" });
            default: return _jsx(DollarSign, { className: "w-5 h-5" });
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Payment Center" }), _jsx("p", { className: "text-gray-400", children: "Manage deposits, withdrawals, and payment methods" })] }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(ArrowDownLeft, { className: "w-8 h-8 text-green-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Total Deposits" }), _jsxs("div", { className: "text-2xl font-bold text-green-500", children: ["$", taxData.totalDeposits.toLocaleString()] })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(ArrowUpRight, { className: "w-8 h-8 text-blue-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Total Withdrawals" }), _jsxs("div", { className: "text-2xl font-bold text-blue-500", children: ["$", taxData.totalWithdrawals.toLocaleString()] })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(DollarSign, { className: "w-8 h-8 text-purple-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Total Fees" }), _jsxs("div", { className: "text-2xl font-bold text-purple-500", children: ["$", taxData.totalFees.toFixed(2)] })] }) }), _jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx(TrendingUp, { className: "w-8 h-8 text-yellow-500 mx-auto mb-2" }), _jsx("div", { className: "text-sm font-semibold text-white", children: "Net P&L" }), _jsxs("div", { className: `text-2xl font-bold ${taxData.netGains >= 0 ? 'text-green-500' : 'text-red-500'}`, children: ["$", taxData.netGains.toFixed(2)] })] }) })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5 bg-winnex-gray", children: [_jsx(TabsTrigger, { value: "methods", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Payment Methods" }), _jsx(TabsTrigger, { value: "crypto", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Cryptocurrency" }), _jsx(TabsTrigger, { value: "deposit", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Deposit" }), _jsx(TabsTrigger, { value: "withdraw", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Withdraw" }), _jsx(TabsTrigger, { value: "history", className: "text-white data-[state=active]:bg-winnex-green data-[state=active]:text-black", children: "Transaction History" })] }), _jsx(TabsContent, { value: "methods", className: "mt-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: methods.map((method) => (_jsxs(Card, { className: `border-2 transition-all duration-300 ${method.isDefault ? 'border-green-500 bg-green-900/20' : 'border-gray-600 bg-winnex-dark'}`, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [getMethodIcon(method.type), method.name] }), method.isDefault && (_jsx(Badge, { className: "bg-green-600", children: "Default" }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-white mb-1", children: method.processingTime.deposit }), _jsx("div", { className: "text-sm text-gray-400", children: "Processing Time" })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Deposit Fee:" }), _jsxs("span", { className: "text-white", children: [method.fees.deposit, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Withdrawal Fee:" }), _jsxs("span", { className: "text-white", children: [method.fees.withdrawal, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Min Deposit:" }), _jsxs("span", { className: "text-white", children: ["$", method.limits.minDeposit] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Max Deposit:" }), _jsxs("span", { className: "text-white", children: ["$", method.limits.maxDeposit.toLocaleString()] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { className: "flex-1 bg-winnex-green text-black", onClick: () => {
                                                            setSelectedMethod(method.id);
                                                            setSelectedTab('deposit');
                                                        }, children: "Deposit" }), method.limits.maxWithdrawal > 0 && (_jsx(Button, { variant: "outline", className: "flex-1 border-blue-500 text-blue-500", onClick: () => {
                                                            setSelectedMethod(method.id);
                                                            setSelectedTab('withdraw');
                                                        }, children: "Withdraw" }))] })] })] }, method.id))) }) }), _jsx(TabsContent, { value: "crypto", className: "mt-6", children: _jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6", children: prices.map((crypto) => (_jsx(Card, { className: "bg-winnex-dark border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold", children: crypto.icon }), _jsxs("div", { children: [_jsx("div", { className: "font-semibold text-white", children: crypto.symbol }), _jsx("div", { className: "text-sm text-gray-400", children: crypto.name })] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "text-2xl font-bold text-white", children: ["$", crypto.price.toLocaleString()] }), _jsxs(Badge, { className: `${crypto.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'}`, children: [crypto.change24h >= 0 ? '+' : '', crypto.change24h.toFixed(2), "%"] })] }), _jsxs("div", { className: "text-sm text-gray-400 space-y-1", children: [_jsxs("div", { children: ["Network: ", crypto.network] }), _jsxs("div", { children: ["Confirmations: ", crypto.confirmations] })] }), crypto.address && (_jsxs("div", { className: "mt-4 p-3 bg-gray-800 rounded-lg", children: [_jsx("div", { className: "text-xs text-gray-400 mb-1", children: "Deposit Address:" }), _jsx("div", { className: "text-xs text-white font-mono break-all", children: crypto.address }), _jsx("div", { className: "mt-2 w-20 h-20 bg-white rounded mx-auto flex items-center justify-center", children: _jsx("span", { className: "text-xs text-black", children: "QR" }) })] })), _jsxs("div", { className: "flex gap-2 mt-4", children: [_jsx(Button, { size: "sm", className: "flex-1 bg-winnex-green text-black", onClick: () => {
                                                                setSelectedMethod(crypto.symbol.toLowerCase());
                                                                setCurrency(crypto.symbol);
                                                                setSelectedTab('deposit');
                                                            }, children: "Deposit" }), _jsx(Button, { size: "sm", variant: "outline", className: "flex-1 border-blue-500 text-blue-500", onClick: () => {
                                                                setSelectedMethod(crypto.symbol.toLowerCase());
                                                                setCurrency(crypto.symbol);
                                                                setSelectedTab('withdraw');
                                                            }, children: "Withdraw" })] })] })] }) }, crypto.symbol))) }) }), _jsx(TabsContent, { value: "deposit", className: "mt-6", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(ArrowDownLeft, { className: "w-5 h-5" }), "Make a Deposit"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Payment Method" }), _jsxs("select", { value: selectedMethod, onChange: (e) => setSelectedMethod(e.target.value), className: "w-full bg-winnex-gray border border-gray-600 rounded-lg px-3 py-2 text-white", children: [_jsx("option", { value: "", children: "Select payment method" }), methods.filter(m => m.isEnabled).map(method => (_jsx("option", { value: method.id, children: method.name }, method.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Amount" }), _jsx(Input, { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "Enter amount", className: "bg-winnex-gray border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Currency" }), _jsxs("select", { value: currency, onChange: (e) => setCurrency(e.target.value), className: "w-full bg-winnex-gray border border-gray-600 rounded-lg px-3 py-2 text-white", children: [_jsx("option", { value: "USD", children: "USD" }), _jsx("option", { value: "EUR", children: "EUR" }), _jsx("option", { value: "GBP", children: "GBP" }), _jsx("option", { value: "BTC", children: "BTC" }), _jsx("option", { value: "ETH", children: "ETH" })] })] }), selectedMethod && (_jsx("div", { className: "p-4 bg-gray-800 rounded-lg", children: (() => {
                                                    const method = methods.find(m => m.id === selectedMethod);
                                                    if (!method)
                                                        return null;
                                                    const fee = parseFloat(amount) * (method.fees.deposit / 100);
                                                    const total = parseFloat(amount) + fee;
                                                    return (_jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Amount:" }), _jsxs("span", { className: "text-white", children: [amount, " ", currency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-gray-400", children: ["Fee (", method.fees.deposit, "%):"] }), _jsxs("span", { className: "text-white", children: [fee.toFixed(2), " ", currency] })] }), _jsxs("div", { className: "flex justify-between border-t border-gray-600 pt-2", children: [_jsx("span", { className: "text-white font-semibold", children: "Total:" }), _jsxs("span", { className: "text-white font-semibold", children: [total.toFixed(2), " ", currency] })] }), _jsxs("div", { className: "text-xs text-gray-400 mt-2", children: ["Processing time: ", method.processingTime.deposit] })] }));
                                                })() })), _jsxs(Button, { className: "w-full bg-winnex-green text-black", disabled: !selectedMethod || !amount || parseFloat(amount) <= 0, onClick: () => depositMutation.mutate({
                                                    method: selectedMethod,
                                                    amount: parseFloat(amount),
                                                    currency
                                                }), children: [_jsx(Shield, { className: "w-4 h-4 mr-2" }), "Secure Deposit"] })] })] }) }) }), _jsx(TabsContent, { value: "withdraw", className: "mt-6", children: _jsx("div", { className: "max-w-md mx-auto", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center gap-2", children: [_jsx(ArrowUpRight, { className: "w-5 h-5" }), "Request Withdrawal"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Withdrawal Method" }), _jsxs("select", { value: selectedMethod, onChange: (e) => setSelectedMethod(e.target.value), className: "w-full bg-winnex-gray border border-gray-600 rounded-lg px-3 py-2 text-white", children: [_jsx("option", { value: "", children: "Select withdrawal method" }), methods.filter(m => m.isEnabled && m.limits.maxWithdrawal > 0).map(method => (_jsx("option", { value: method.id, children: method.name }, method.id)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Amount" }), _jsx(Input, { type: "number", value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "Enter amount", className: "bg-winnex-gray border-gray-600" })] }), selectedMethod && methods.find(m => m.id === selectedMethod)?.type === 'crypto' && (_jsxs("div", { children: [_jsx("label", { className: "text-white text-sm font-semibold mb-2 block", children: "Withdrawal Address" }), _jsx(Input, { value: withdrawalAddress, onChange: (e) => setWithdrawalAddress(e.target.value), placeholder: "Enter crypto address", className: "bg-winnex-gray border-gray-600" })] })), selectedMethod && (_jsx("div", { className: "p-4 bg-gray-800 rounded-lg", children: (() => {
                                                    const method = methods.find(m => m.id === selectedMethod);
                                                    if (!method)
                                                        return null;
                                                    const fee = parseFloat(amount) * (method.fees.withdrawal / 100);
                                                    const total = parseFloat(amount) - fee;
                                                    return (_jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Amount:" }), _jsxs("span", { className: "text-white", children: [amount, " ", currency] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-gray-400", children: ["Fee (", method.fees.withdrawal, "%):"] }), _jsxs("span", { className: "text-white", children: [fee.toFixed(4), " ", currency] })] }), _jsxs("div", { className: "flex justify-between border-t border-gray-600 pt-2", children: [_jsx("span", { className: "text-white font-semibold", children: "You receive:" }), _jsxs("span", { className: "text-white font-semibold", children: [total.toFixed(4), " ", currency] })] }), _jsxs("div", { className: "text-xs text-gray-400 mt-2", children: ["Processing time: ", method.processingTime.withdrawal] })] }));
                                                })() })), _jsxs(Button, { className: "w-full bg-blue-600 hover:bg-blue-700", disabled: !selectedMethod ||
                                                    !amount ||
                                                    parseFloat(amount) <= 0 ||
                                                    (methods.find(m => m.id === selectedMethod)?.type === 'crypto' && !withdrawalAddress), onClick: () => withdrawMutation.mutate({
                                                    method: selectedMethod,
                                                    amount: parseFloat(amount),
                                                    currency,
                                                    address: withdrawalAddress
                                                }), children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Instant Withdrawal"] })] })] }) }) }), _jsx(TabsContent, { value: "history", className: "mt-6", children: _jsxs(Card, { className: "bg-winnex-dark border-gray-700", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Transaction History" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-4", children: txList.map((transaction) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-800 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: getStatusIcon(transaction.status) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-white font-semibold capitalize", children: transaction.type }), _jsx(Badge, { className: `text-xs ${transaction.type === 'deposit' ? 'bg-green-600' : 'bg-blue-600'}`, children: transaction.method })] }), _jsx("div", { className: "text-sm text-gray-400", children: transaction.timestamp }), transaction.txHash && (_jsxs("div", { className: "text-xs text-gray-500 font-mono", children: ["Hash: ", transaction.txHash.substring(0, 16), "..."] }))] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `font-semibold ${transaction.type === 'deposit' ? 'text-green-500' : 'text-blue-500'}`, children: [transaction.type === 'deposit' ? '+' : '-', transaction.amount, " ", transaction.currency] }), _jsxs("div", { className: "text-xs text-gray-400", children: ["Fee: ", transaction.fee, " ", transaction.currency] }), _jsx(Badge, { className: `text-xs mt-1 ${transaction.status === 'completed' ? 'bg-green-600' :
                                                                    transaction.status === 'processing' ? 'bg-yellow-600' :
                                                                        transaction.status === 'failed' ? 'bg-red-600' : 'bg-blue-600'}`, children: transaction.status.toUpperCase() })] })] }, transaction.id))) }), _jsx("div", { className: "mt-6 text-center", children: _jsx(Button, { variant: "outline", className: "border-green-500 text-green-500", children: "Export Transaction History" }) })] })] }) })] })] }));
}
