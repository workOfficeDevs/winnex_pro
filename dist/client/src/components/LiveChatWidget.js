import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, Bot, User, Phone, Mail, TrendingUp, Minimize2, Maximize2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
export default function LiveChatWidget() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [agentStatus, setAgentStatus] = useState('online');
    const [unreadCount, setUnreadCount] = useState(0);
    const messagesEndRef = useRef(null);
    const quickActions = [
        {
            id: 'deposit',
            icon: _jsx(TrendingUp, { className: "h-4 w-4" }),
            label: 'Deposit Crypto',
            action: 'deposit',
            description: 'Add funds to your account'
        },
        {
            id: 'contact',
            icon: _jsx(Phone, { className: "h-4 w-4" }),
            label: 'Contact Support',
            action: 'support',
            description: 'Speak with our team'
        },
        {
            id: 'promotions',
            icon: _jsx(Mail, { className: "h-4 w-4" }),
            label: 'View Promotions',
            action: 'promotions',
            description: 'See current offers'
        }
    ];
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Welcome message with CTAs
            setMessages([
                {
                    id: '1',
                    sender: 'bot',
                    message: 'Welcome to Winnex! I\'m your AI betting assistant. How can I help you today?',
                    timestamp: new Date(),
                    type: 'text'
                },
                {
                    id: '2',
                    sender: 'bot',
                    message: 'Start betting with crypto today! Get a 100% deposit bonus on your first deposit.',
                    timestamp: new Date(),
                    type: 'cta',
                    ctaButton: {
                        text: 'Claim Bonus',
                        action: 'deposit_bonus',
                        variant: 'primary'
                    }
                }
            ]);
        }
    }, [isOpen]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Simulate AI assistant responses
    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
            const lastMessage = messages[messages.length - 1].message.toLowerCase();
            setTimeout(() => {
                let response;
                if (lastMessage.includes('deposit') || lastMessage.includes('fund')) {
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        message: 'I can help you deposit crypto! We support BTC, ETH, USDT, and LTC with instant processing.',
                        timestamp: new Date(),
                        type: 'cta',
                        ctaButton: {
                            text: 'Open Crypto Wallet',
                            action: 'crypto_wallet',
                            variant: 'primary'
                        }
                    };
                }
                else if (lastMessage.includes('bet') || lastMessage.includes('odds')) {
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        message: 'Check out today\'s best value bets! Our AI has identified several high-confidence opportunities.',
                        timestamp: new Date(),
                        type: 'bet_suggestion',
                        ctaButton: {
                            text: 'View AI Predictions',
                            action: 'ai_predictions',
                            variant: 'success'
                        }
                    };
                }
                else if (lastMessage.includes('bonus') || lastMessage.includes('promotion')) {
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        message: 'Exclusive offer for you! Get 50% cashback on losses this week + free VIP upgrade.',
                        timestamp: new Date(),
                        type: 'promotion',
                        ctaButton: {
                            text: 'Claim Now',
                            action: 'claim_promotion',
                            variant: 'primary'
                        }
                    };
                }
                else {
                    response = {
                        id: Date.now().toString(),
                        sender: 'bot',
                        message: 'I understand you need help. Let me connect you with our live support team for personalized assistance.',
                        timestamp: new Date(),
                        type: 'cta',
                        ctaButton: {
                            text: 'Connect to Agent',
                            action: 'connect_agent',
                            variant: 'secondary'
                        }
                    };
                }
                setMessages(prev => [...prev, response]);
                if (!isOpen) {
                    setUnreadCount(prev => prev + 1);
                }
            }, 1500);
        }
    }, [messages, isOpen]);
    const sendMessage = () => {
        if (!inputMessage.trim())
            return;
        const newMessage = {
            id: Date.now().toString(),
            sender: 'user',
            message: inputMessage,
            timestamp: new Date(),
            type: 'text'
        };
        setMessages(prev => [...prev, newMessage]);
        setInputMessage('');
    };
    const handleQuickAction = (action) => {
        let message = '';
        switch (action) {
            case 'deposit':
                message = 'I want to deposit cryptocurrency';
                break;
            case 'support':
                message = 'I need to speak with support';
                break;
            case 'promotions':
                message = 'Show me current promotions';
                break;
        }
        if (message) {
            setInputMessage(message);
            sendMessage();
        }
    };
    const handleCTAClick = (action) => {
        switch (action) {
            case 'deposit_bonus':
            case 'crypto_wallet':
                window.location.href = '/deposit';
                break;
            case 'ai_predictions':
                window.location.href = '/enhanced-ai';
                break;
            case 'claim_promotion':
                window.location.href = '/promotions';
                break;
            case 'connect_agent':
                // Simulate agent connection
                setAgentStatus('online');
                setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        sender: 'agent',
                        message: 'Hi! I\'m Sarah from Winnex Pro support. For specialized help: accounts@winnexpro.io (transactions), traders@winnexpro.io (betting), support@winnexpro.io (technical).',
                        timestamp: new Date(),
                        type: 'text'
                    }]);
                break;
        }
        toast({
            title: "Action Triggered",
            description: "Processing your request...",
        });
    };
    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setUnreadCount(0);
        }
    };
    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };
    if (!isOpen) {
        return (_jsx("div", { className: "fixed bottom-6 right-6 z-50", children: _jsxs(Button, { onClick: toggleChat, className: "relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg", size: "lg", children: [_jsx(MessageCircle, { className: "h-6 w-6 text-white" }), unreadCount > 0 && (_jsx(Badge, { className: "absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs", children: unreadCount }))] }) }));
    }
    return (_jsx("div", { className: "fixed bottom-6 right-6 z-50", children: _jsxs(Card, { className: `w-80 bg-white shadow-2xl border-0 transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`, children: [_jsxs(CardHeader, { className: "p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${agentStatus === 'online' ? 'bg-green-400' : 'bg-yellow-400'}` }), _jsx(CardTitle, { className: "text-lg", children: "Winnex Pro Support" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: toggleMinimize, className: "text-white hover:bg-white/20 p-1", children: isMinimized ? _jsx(Maximize2, { className: "h-4 w-4" }) : _jsx(Minimize2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: toggleChat, className: "text-white hover:bg-white/20 p-1", children: _jsx(X, { className: "h-4 w-4" }) })] })] }), _jsx("p", { className: "text-sm opacity-90", children: agentStatus === 'online' ? 'We\'re online and ready to help!' : 'Typically replies in minutes' })] }), !isMinimized && (_jsxs(CardContent, { className: "p-0 flex flex-col h-80", children: [_jsx("div", { className: "p-3 border-b bg-gray-50", children: _jsx("div", { className: "grid grid-cols-3 gap-2", children: quickActions.map((action) => (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => handleQuickAction(action.action), className: "flex flex-col h-auto p-2 text-xs", children: [action.icon, _jsx("span", { className: "mt-1", children: action.label })] }, action.id))) }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-3 space-y-3", children: [messages.map((message) => (_jsx("div", { className: `flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-xs ${message.sender === 'user' ? 'order-2' : 'order-1'}`, children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [message.sender !== 'user' && (message.sender === 'bot' ?
                                                        _jsx(Bot, { className: "h-4 w-4 text-blue-500" }) :
                                                        _jsx(User, { className: "h-4 w-4 text-green-500" })), _jsx("span", { className: "text-xs text-gray-500", children: message.sender === 'user' ? 'You' : message.sender === 'bot' ? 'AI Assistant' : 'Sarah' })] }), _jsxs("div", { className: `rounded-lg p-3 ${message.sender === 'user'
                                                    ? 'bg-blue-600 text-white'
                                                    : message.type === 'promotion'
                                                        ? 'bg-gradient-to-r from-green-100 to-blue-100 border border-green-200'
                                                        : 'bg-gray-100 text-gray-800'}`, children: [_jsx("p", { className: "text-sm", children: message.message }), message.ctaButton && (_jsx(Button, { onClick: () => handleCTAClick(message.ctaButton.action), variant: message.ctaButton.variant === 'primary' ? 'default' : 'outline', size: "sm", className: "mt-2 w-full", children: message.ctaButton.text }))] })] }) }, message.id))), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "p-3 border-t", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { value: inputMessage, onChange: (e) => setInputMessage(e.target.value), placeholder: "Type your message...", onKeyPress: (e) => e.key === 'Enter' && sendMessage(), className: "flex-1" }), _jsx(Button, { onClick: sendMessage, size: "sm", children: _jsx(Send, { className: "h-4 w-4" }) })] }) })] }))] }) }));
}
