import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Brain, Target, AlertTriangle, Star, DollarSign, Trophy, Zap, Mail, MessageSquare, Phone, ArrowRight, Gift } from 'lucide-react';
export default function EnhancedAIAssistant() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('predictions');
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const aiPredictions = [
        {
            id: '1',
            match: 'Lakers vs Celtics',
            sport: 'Basketball',
            prediction: 'Over 220.5 Points',
            confidence: 94,
            odds: 1.95,
            expectedValue: 18.7,
            reasoning: [
                'Both teams averaging 115+ points per game',
                'Fast-paced matchup with weak defensive stats',
                'Historical head-to-head favors high-scoring games'
            ],
            ctaButtons: [
                { text: 'Bet Now', action: 'place_bet_over_220', variant: 'primary' },
                { text: 'Add to Betslip', action: 'add_betslip', variant: 'secondary' }
            ]
        },
        {
            id: '2',
            match: 'Arsenal vs Chelsea',
            sport: 'Soccer',
            prediction: 'Arsenal Win',
            confidence: 87,
            odds: 2.10,
            expectedValue: 23.4,
            reasoning: [
                'Arsenal unbeaten in last 8 home games',
                'Chelsea missing 3 key defenders',
                'Momentum strongly favors Arsenal'
            ],
            ctaButtons: [
                { text: 'Back Arsenal', action: 'bet_arsenal_win', variant: 'success' },
                { text: 'View Full Analysis', action: 'detailed_analysis', variant: 'secondary' }
            ]
        }
    ];
    const personalizedOffers = [
        {
            id: '1',
            type: 'bonus',
            title: '200% Crypto Deposit Bonus',
            description: 'Triple your first crypto deposit up to 1 BTC',
            value: '1 BTC',
            expiresIn: '23 hours',
            requirements: 'Minimum 0.01 BTC deposit',
            ctaButton: { text: 'Claim Bonus', action: 'claim_deposit_bonus', variant: 'primary' }
        },
        {
            id: '2',
            type: 'vip_upgrade',
            title: 'Instant VIP Upgrade',
            description: 'Get VIP status with exclusive benefits and higher limits',
            value: 'Premium Access',
            expiresIn: '3 days',
            requirements: 'Complete 5 more bets',
            ctaButton: { text: 'Upgrade Now', action: 'upgrade_vip', variant: 'success' }
        },
        {
            id: '3',
            type: 'cashback',
            title: '50% Loss Cashback',
            description: 'Get back half of your losses from yesterday',
            value: '$127.50',
            expiresIn: '12 hours',
            requirements: 'Auto-credited to account',
            ctaButton: { text: 'Claim Cashback', action: 'claim_cashback', variant: 'primary' }
        }
    ];
    const smartAlerts = [
        {
            id: '1',
            type: 'value_bet',
            title: 'High Value Opportunity',
            message: 'Chiefs vs Bills Over 47.5 - 15% edge detected',
            urgency: 'high',
            actionRequired: true,
            ctaButton: { text: 'Bet Now', action: 'bet_chiefs_over', variant: 'primary' }
        },
        {
            id: '2',
            type: 'cashout_recommend',
            title: 'Cash Out Recommended',
            message: 'Your Lakers bet has 89% win probability - secure profit now',
            urgency: 'medium',
            actionRequired: true,
            ctaButton: { text: 'Cash Out', action: 'cashout_lakers', variant: 'success' }
        },
        {
            id: '3',
            type: 'arbitrage',
            title: 'Arbitrage Opportunity',
            message: 'Risk-free profit opportunity detected - act within 8 minutes',
            urgency: 'high',
            actionRequired: true,
            ctaButton: { text: 'View Details', action: 'arbitrage_details', variant: 'primary' }
        }
    ];
    const handleCTAClick = (action) => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            switch (action) {
                case 'place_bet_over_220':
                case 'bet_arsenal_win':
                case 'bet_chiefs_over':
                    toast({
                        title: "Bet Placed Successfully",
                        description: "Your bet has been added to the betslip",
                    });
                    break;
                case 'claim_deposit_bonus':
                case 'claim_cashback':
                    toast({
                        title: "Bonus Claimed!",
                        description: "Your bonus has been credited to your account",
                    });
                    break;
                case 'upgrade_vip':
                    toast({
                        title: "VIP Upgrade Complete",
                        description: "Welcome to VIP! Enjoy exclusive benefits",
                    });
                    break;
                case 'cashout_lakers':
                    toast({
                        title: "Cash Out Successful",
                        description: "Your winnings have been secured",
                    });
                    break;
                default:
                    toast({
                        title: "Action Completed",
                        description: "Your request has been processed",
                    });
            }
        }, 1500);
    };
    const handleAIQuery = () => {
        if (!query.trim())
            return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "AI Analysis Complete",
                description: "Your personalized recommendations are ready",
            });
        }, 2000);
    };
    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'bg-red-100 border-red-300 text-red-800';
            case 'medium': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            default: return 'bg-blue-100 border-blue-300 text-blue-800';
        }
    };
    const getOfferIcon = (type) => {
        switch (type) {
            case 'bonus': return _jsx(Gift, { className: "h-5 w-5 text-green-500" });
            case 'vip_upgrade': return _jsx(Star, { className: "h-5 w-5 text-purple-500" });
            case 'cashback': return _jsx(DollarSign, { className: "h-5 w-5 text-blue-500" });
            default: return _jsx(Trophy, { className: "h-5 w-5 text-gold-500" });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "AI Betting Assistant" }), _jsx("p", { className: "text-gray-300", children: "Powered by advanced machine learning with 94.2% accuracy" })] }), _jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Brain, { className: "h-8 w-8 text-purple-400" }), _jsx("div", { className: "flex-1", children: _jsx(Input, { placeholder: "Ask me anything... 'Which bets have the best value today?' or 'Should I cash out my Lakers bet?'", value: query, onChange: (e) => setQuery(e.target.value), onKeyPress: (e) => e.key === 'Enter' && handleAIQuery(), className: "bg-gray-800 border-gray-600 text-white text-lg" }) }), _jsxs(Button, { onClick: handleAIQuery, disabled: isLoading, className: "px-6", children: [isLoading ? 'Analyzing...' : 'Ask AI', _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] }) }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-black/40 border-gray-700", children: [_jsx(TabsTrigger, { value: "predictions", className: "text-white", children: "AI Predictions" }), _jsx(TabsTrigger, { value: "alerts", className: "text-white", children: "Smart Alerts" }), _jsx(TabsTrigger, { value: "offers", className: "text-white", children: "Personal Offers" }), _jsx(TabsTrigger, { value: "communication", className: "text-white", children: "Communication" })] }), _jsx(TabsContent, { value: "predictions", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: aiPredictions.map((prediction) => (_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-white", children: prediction.match }), _jsx(Badge, { variant: "secondary", children: prediction.sport })] }), _jsxs(CardDescription, { className: "text-gray-400", children: ["AI Prediction: ", prediction.prediction] })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-green-400", children: [prediction.confidence, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Confidence" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-blue-400", children: prediction.odds }), _jsx("div", { className: "text-sm text-gray-400", children: "Odds" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-purple-400", children: ["+", prediction.expectedValue, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Expected Value" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-white font-medium", children: "AI Reasoning:" }), prediction.reasoning.map((reason, index) => (_jsxs("div", { className: "flex items-center text-gray-300 text-sm", children: [_jsx(Target, { className: "h-3 w-3 text-green-400 mr-2" }), reason] }, index)))] }), _jsx("div", { className: "flex space-x-2", children: prediction.ctaButtons.map((button, index) => (_jsx(Button, { variant: button.variant === 'primary' ? 'default' : 'outline', onClick: () => handleCTAClick(button.action), disabled: isLoading, className: "flex-1", children: button.text }, index))) })] })] }, prediction.id))) }) }), _jsx(TabsContent, { value: "alerts", children: _jsx("div", { className: "space-y-4", children: smartAlerts.map((alert) => (_jsx(Card, { className: `border-l-4 ${getUrgencyColor(alert.urgency)}`, children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(AlertTriangle, { className: `h-5 w-5 ${alert.urgency === 'high' ? 'text-red-500' :
                                                                alert.urgency === 'medium' ? 'text-yellow-500' : 'text-blue-500'}` }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: alert.title }), _jsx("p", { className: "text-gray-600", children: alert.message })] })] }), alert.ctaButton && (_jsx(Button, { variant: alert.ctaButton.variant === 'destructive' ? 'destructive' : 'default', onClick: () => handleCTAClick(alert.ctaButton.action), disabled: isLoading, children: alert.ctaButton.text }))] }) }) }, alert.id))) }) }), _jsx(TabsContent, { value: "offers", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: personalizedOffers.map((offer) => (_jsxs(Card, { className: "bg-gradient-to-br from-white to-gray-50 border-2 border-blue-200", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "flex justify-center mb-2", children: getOfferIcon(offer.type) }), _jsx(CardTitle, { className: "text-gray-900", children: offer.title }), _jsx(CardDescription, { children: offer.description })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-3xl font-bold text-green-600", children: offer.value }), _jsx("div", { className: "text-sm text-gray-500", children: "Value" })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Expires in:" }), _jsx("span", { className: "font-medium text-red-600", children: offer.expiresIn })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-600", children: "Requirements:" }), _jsx("span", { className: "font-medium", children: offer.requirements })] })] }), _jsxs(Button, { className: "w-full", onClick: () => handleCTAClick(offer.ctaButton.action), disabled: isLoading, children: [offer.ctaButton.text, _jsx(Zap, { className: "ml-2 h-4 w-4" })] })] })] }, offer.id))) }) }), _jsx(TabsContent, { value: "communication", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Mail, { className: "h-5 w-5 mr-2 text-blue-400" }), "Email Notifications"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-300", children: "Get AI predictions and alerts via email" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { className: "w-full", onClick: () => handleCTAClick('subscribe_email'), children: "Subscribe to Daily Tips" }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => handleCTAClick('test_email'), children: "Send Test Email" })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(MessageSquare, { className: "h-5 w-5 mr-2 text-green-400" }), "SMS Alerts"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-300", children: "Instant SMS for high-value opportunities" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { className: "w-full", onClick: () => handleCTAClick('enable_sms'), children: "Enable SMS Alerts" }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => handleCTAClick('test_sms'), children: "Send Test SMS" })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Phone, { className: "h-5 w-5 mr-2 text-purple-400" }), "VIP Support"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-300", children: "Direct line to our expert betting analysts" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Button, { className: "w-full", onClick: () => handleCTAClick('call_support'), children: "Call VIP Line" }), _jsx(Button, { variant: "outline", className: "w-full", onClick: () => handleCTAClick('schedule_call'), children: "Schedule Callback" })] })] })] })] }) })] })] }) }));
}
