import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Brain, Target, Zap, Activity, Cpu, Database, Network, Eye, Lightbulb, Timer } from 'lucide-react';
export default function PredictiveAnalyticsEngine() {
    const { toast } = useToast();
    const [models, setModels] = useState([]);
    const [marketPredictions, setMarketPredictions] = useState([]);
    const [userPredictions, setUserPredictions] = useState(null);
    const [inefficiencies, setInefficiencies] = useState([]);
    const [activeTab, setActiveTab] = useState('predictions');
    useEffect(() => {
        // Generate realistic prediction data
        const generateModels = () => [
            {
                id: '1',
                name: 'DeepSports Neural Network',
                type: 'neural_network',
                accuracy: 94.2,
                confidence: 87.5,
                trainingData: 1250000,
                lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
                status: 'active',
                predictions24h: 847,
                successRate: 91.3
            },
            {
                id: '2',
                name: 'Ensemble Predictor v3.1',
                type: 'ensemble',
                accuracy: 92.8,
                confidence: 89.2,
                trainingData: 980000,
                lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
                status: 'active',
                predictions24h: 654,
                successRate: 88.7
            },
            {
                id: '3',
                name: 'Market Volatility Forest',
                type: 'random_forest',
                accuracy: 89.5,
                confidence: 85.1,
                trainingData: 750000,
                lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
                status: 'updating',
                predictions24h: 423,
                successRate: 86.2
            },
            {
                id: '4',
                name: 'Live Odds SVM',
                type: 'svm',
                accuracy: 87.3,
                confidence: 82.4,
                trainingData: 540000,
                lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
                status: 'training',
                predictions24h: 312,
                successRate: 84.9
            }
        ];
        const generatePredictions = () => [
            {
                id: '1',
                market: 'Over/Under 220.5 Points',
                sport: 'Basketball',
                match: 'Lakers vs Celtics',
                prediction: 'Over 220.5',
                confidence: 94.5,
                expectedValue: 18.7,
                odds: {
                    current: 1.95,
                    predicted: 1.67,
                    edge: 14.3
                },
                factors: [
                    { name: 'Both teams avg 115+ PPG', weight: 28.5, impact: 'positive' },
                    { name: 'Fast pace expected', weight: 22.1, impact: 'positive' },
                    { name: 'Weak defensive stats', weight: 19.3, impact: 'positive' },
                    { name: 'Historical H2H trends', weight: 15.7, impact: 'positive' },
                    { name: 'Weather conditions', weight: 8.2, impact: 'neutral' },
                    { name: 'Recent under trends', weight: 6.2, impact: 'negative' }
                ],
                riskLevel: 'low',
                timeToEvent: '2h 34m',
                modelUsed: 'DeepSports Neural Network'
            },
            {
                id: '2',
                market: 'Arsenal Win',
                sport: 'Soccer',
                match: 'Arsenal vs Chelsea',
                prediction: 'Arsenal Win',
                confidence: 87.2,
                expectedValue: 23.4,
                odds: {
                    current: 2.10,
                    predicted: 1.78,
                    edge: 15.2
                },
                factors: [
                    { name: 'Home advantage', weight: 25.8, impact: 'positive' },
                    { name: '8-game home unbeaten', weight: 23.4, impact: 'positive' },
                    { name: 'Chelsea injuries', weight: 21.1, impact: 'positive' },
                    { name: 'Recent form', weight: 18.3, impact: 'positive' },
                    { name: 'Head-to-head record', weight: 11.4, impact: 'negative' }
                ],
                riskLevel: 'medium',
                timeToEvent: '4h 12m',
                modelUsed: 'Ensemble Predictor v3.1'
            },
            {
                id: '3',
                market: 'Over 47.5 Points',
                sport: 'Football',
                match: 'Chiefs vs Bills',
                prediction: 'Over 47.5',
                confidence: 91.8,
                expectedValue: 16.9,
                odds: {
                    current: 1.91,
                    predicted: 1.71,
                    edge: 10.5
                },
                factors: [
                    { name: 'High-scoring offenses', weight: 32.1, impact: 'positive' },
                    { name: 'Dome environment', weight: 18.7, impact: 'positive' },
                    { name: 'Defensive weaknesses', weight: 16.4, impact: 'positive' },
                    { name: 'Playoff intensity', weight: 15.2, impact: 'positive' },
                    { name: 'Cold weather factor', weight: 12.8, impact: 'negative' },
                    { name: 'Historical under bias', weight: 4.8, impact: 'negative' }
                ],
                riskLevel: 'low',
                timeToEvent: '18h 45m',
                modelUsed: 'DeepSports Neural Network'
            }
        ];
        const generateUserPrediction = () => ({
            userId: 'current-user',
            churnRisk: 15.3,
            nextBetPrediction: {
                sport: 'Basketball',
                probability: 78.5,
                suggestedAmount: 85.50
            },
            lifetimeValue: 2847.50,
            engagement: {
                score: 87.2,
                trend: 'increasing',
                riskFactors: ['Long session gaps', 'Decreasing bet frequency']
            },
            personalizedOffers: [
                { type: 'Deposit Bonus', effectiveness: 89.3, timing: 'Next 48 hours' },
                { type: 'Free Bet', effectiveness: 76.1, timing: 'After next loss' },
                { type: 'VIP Upgrade', effectiveness: 92.7, timing: 'Immediately' }
            ]
        });
        const generateInefficiencies = () => [
            {
                id: '1',
                type: 'arbitrage',
                confidence: 97.2,
                expectedReturn: 4.3,
                timeWindow: '8 minutes',
                market1: { bookmaker: 'Bookmaker A', odds: 2.15 },
                market2: { bookmaker: 'Bookmaker B', odds: 1.95 },
                riskAdjustedReturn: 3.8,
                volume: 5000,
                expiryTime: new Date(Date.now() + 8 * 60 * 1000)
            },
            {
                id: '2',
                type: 'value_bet',
                confidence: 89.4,
                expectedReturn: 12.7,
                timeWindow: '2 hours',
                market1: { bookmaker: 'Market Leader', odds: 2.8 },
                riskAdjustedReturn: 9.2,
                volume: 2500,
                expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000)
            },
            {
                id: '3',
                type: 'pricing_error',
                confidence: 94.8,
                expectedReturn: 8.9,
                timeWindow: '15 minutes',
                market1: { bookmaker: 'Regional Book', odds: 3.2 },
                riskAdjustedReturn: 7.1,
                volume: 1000,
                expiryTime: new Date(Date.now() + 15 * 60 * 1000)
            }
        ];
        setModels(generateModels());
        setMarketPredictions(generatePredictions());
        setUserPredictions(generateUserPrediction());
        setInefficiencies(generateInefficiencies());
        // Update data every 30 seconds
        const interval = setInterval(() => {
            setMarketPredictions(generatePredictions());
            setInefficiencies(generateInefficiencies());
        }, 30000);
        return () => clearInterval(interval);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400';
            case 'training': return 'text-yellow-400';
            case 'updating': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };
    const getModelIcon = (type) => {
        switch (type) {
            case 'neural_network': return _jsx(Brain, { className: "h-5 w-5" });
            case 'ensemble': return _jsx(Network, { className: "h-5 w-5" });
            case 'random_forest': return _jsx(Database, { className: "h-5 w-5" });
            case 'svm': return _jsx(Cpu, { className: "h-5 w-5" });
            default: return _jsx(Activity, { className: "h-5 w-5" });
        }
    };
    const getRiskColor = (risk) => {
        switch (risk) {
            case 'low': return 'text-green-400 bg-green-400/20';
            case 'medium': return 'text-yellow-400 bg-yellow-400/20';
            case 'high': return 'text-red-400 bg-red-400/20';
            default: return 'text-gray-400 bg-gray-400/20';
        }
    };
    const handlePredictionAction = (action, predictionId) => {
        switch (action) {
            case 'place_bet':
                toast({ title: "Bet placed successfully", description: "Added to your bet slip" });
                break;
            case 'track':
                toast({ title: "Prediction tracked", description: "Added to your watchlist" });
                break;
            case 'exploit':
                toast({ title: "Inefficiency exploited", description: "Order placed automatically" });
                break;
            default:
                toast({ title: "Action completed", description: "Your request was processed" });
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Predictive Analytics Engine" }), _jsx("p", { className: "text-gray-300", children: "Advanced AI-powered sports betting and user behavior prediction" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: models.map((model) => (_jsx(Card, { className: "bg-black/40 border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "text-blue-400", children: getModelIcon(model.type) }), _jsx("h3", { className: "font-semibold text-white text-sm", children: model.name })] }), _jsx(Badge, { variant: "outline", className: getStatusColor(model.status), children: model.status })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Accuracy" }), _jsxs("span", { className: "text-green-400 font-semibold", children: [model.accuracy, "%"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Success Rate" }), _jsxs("span", { className: "text-blue-400 font-semibold", children: [model.successRate, "%"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Predictions 24h" }), _jsx("span", { className: "text-purple-400 font-semibold", children: model.predictions24h })] })] })] }) }, model.id))) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-black/40 border-gray-700", children: [_jsx(TabsTrigger, { value: "predictions", className: "text-white", children: "Market Predictions" }), _jsx(TabsTrigger, { value: "inefficiencies", className: "text-white", children: "Inefficiencies" }), _jsx(TabsTrigger, { value: "behavior", className: "text-white", children: "User Behavior" }), _jsx(TabsTrigger, { value: "models", className: "text-white", children: "Model Performance" })] }), _jsx(TabsContent, { value: "predictions", children: _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: marketPredictions.map((prediction) => (_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-white", children: prediction.match }), _jsx(Badge, { variant: "secondary", children: prediction.sport })] }), _jsxs(CardDescription, { className: "text-gray-400", children: [prediction.market, " \u2022 Model: ", prediction.modelUsed] })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4 text-center", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-green-400", children: [prediction.confidence, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Confidence" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-blue-400", children: ["+", prediction.expectedValue, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Expected Value" })] }), _jsxs("div", { children: [_jsxs("div", { className: "text-2xl font-bold text-purple-400", children: [prediction.odds.edge, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Edge" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Prediction" }), _jsx("span", { className: "text-white font-semibold", children: prediction.prediction })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Current Odds" }), _jsx("span", { className: "text-blue-400", children: prediction.odds.current })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Fair Odds" }), _jsx("span", { className: "text-green-400", children: prediction.odds.predicted })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Risk Level" }), _jsx(Badge, { className: getRiskColor(prediction.riskLevel), children: prediction.riskLevel })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Time to Event" }), _jsx("span", { className: "text-yellow-400", children: prediction.timeToEvent })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-white font-medium", children: "Key Factors:" }), prediction.factors.slice(0, 3).map((factor, index) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-300", children: factor.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("span", { className: "text-gray-400", children: [factor.weight, "%"] }), _jsx("div", { className: `w-2 h-2 rounded-full ${factor.impact === 'positive' ? 'bg-green-400' :
                                                                                factor.impact === 'negative' ? 'bg-red-400' : 'bg-gray-400'}` })] })] }, index)))] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { className: "flex-1", onClick: () => handlePredictionAction('place_bet', prediction.id), children: [_jsx(Target, { className: "h-4 w-4 mr-2" }), "Place Bet"] }), _jsxs(Button, { variant: "outline", onClick: () => handlePredictionAction('track', prediction.id), children: [_jsx(Eye, { className: "h-4 w-4 mr-2" }), "Track"] })] })] })] }, prediction.id))) }) }), _jsx(TabsContent, { value: "inefficiencies", children: _jsx("div", { className: "space-y-4", children: inefficiencies.map((inefficiency) => (_jsx(Card, { className: "bg-black/40 border-gray-700 border-l-4 border-l-yellow-400", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Lightbulb, { className: "h-5 w-5 text-yellow-400" }), _jsxs("div", { children: [_jsxs("h3", { className: "font-semibold text-white capitalize", children: [inefficiency.type.replace('_', ' '), " Opportunity"] }), _jsxs("p", { className: "text-sm text-gray-400", children: [inefficiency.confidence, "% confidence \u2022 ", inefficiency.timeWindow, " window"] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold text-green-400", children: ["+", inefficiency.expectedReturn, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Expected Return" })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400", children: "Risk-Adjusted Return" }), _jsxs("p", { className: "font-semibold text-blue-400", children: [inefficiency.riskAdjustedReturn, "%"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400", children: "Volume Available" }), _jsxs("p", { className: "font-semibold text-purple-400", children: ["$", inefficiency.volume] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400", children: "Primary Market" }), _jsx("p", { className: "font-semibold text-white", children: inefficiency.market1.odds })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-400", children: "Expires In" }), _jsxs("p", { className: "font-semibold text-red-400", children: [Math.round((inefficiency.expiryTime.getTime() - Date.now()) / 1000 / 60), "m"] })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-400", children: [_jsx(Timer, { className: "h-3 w-3" }), _jsx("span", { children: "Time-sensitive opportunity" })] }), _jsxs(Button, { variant: "destructive", onClick: () => handlePredictionAction('exploit', inefficiency.id), children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Exploit Now"] })] })] }) }, inefficiency.id))) }) }), _jsx(TabsContent, { value: "behavior", children: userPredictions && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "User Behavior Analysis" }), _jsx(CardDescription, { className: "text-gray-400", children: "AI-powered insights into user engagement and behavior patterns" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Churn Risk" }), _jsxs("span", { className: "text-green-400 font-semibold", children: [userPredictions.churnRisk, "%"] })] }), _jsx(Progress, { value: userPredictions.churnRisk, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Engagement Score" }), _jsx("span", { className: "text-blue-400 font-semibold", children: userPredictions.engagement.score })] }), _jsx(Progress, { value: userPredictions.engagement.score, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Engagement Trend" }), _jsx(Badge, { className: userPredictions.engagement.trend === 'increasing' ? 'text-green-400 bg-green-400/20' :
                                                                    userPredictions.engagement.trend === 'stable' ? 'text-blue-400 bg-blue-400/20' :
                                                                        'text-red-400 bg-red-400/20', children: userPredictions.engagement.trend })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Predicted Lifetime Value" }), _jsxs("span", { className: "text-green-400 font-semibold", children: ["$", userPredictions.lifetimeValue.toFixed(2)] })] })] })] }), _jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Next Bet Prediction" }), _jsx(CardDescription, { className: "text-gray-400", children: "AI prediction for user's next betting behavior" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-3xl font-bold text-purple-400 mb-2", children: [userPredictions.nextBetPrediction.probability, "%"] }), _jsx("div", { className: "text-gray-400", children: "Probability of betting in next 24h" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Predicted Sport" }), _jsx("span", { className: "text-white font-semibold", children: userPredictions.nextBetPrediction.sport })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-300", children: "Suggested Amount" }), _jsxs("span", { className: "text-green-400 font-semibold", children: ["$", userPredictions.nextBetPrediction.suggestedAmount] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-white font-medium", children: "Personalized Offers:" }), userPredictions.personalizedOffers.map((offer, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "text-white text-sm", children: offer.type }), _jsx("p", { className: "text-gray-400 text-xs", children: offer.timing })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-green-400 font-semibold", children: [offer.effectiveness, "%"] }), _jsx("p", { className: "text-gray-400 text-xs", children: "Effectiveness" })] })] }, index)))] })] })] })] })) }), _jsx(TabsContent, { value: "models", children: _jsx("div", { className: "space-y-6", children: models.map((model) => (_jsxs(Card, { className: "bg-black/40 border-gray-700", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-blue-400", children: getModelIcon(model.type) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: model.name }), _jsxs(CardDescription, { className: "text-gray-400", children: [model.type.replace('_', ' ').toUpperCase(), " \u2022 ", model.trainingData.toLocaleString(), " data points"] })] })] }), _jsx(Badge, { variant: "outline", className: getStatusColor(model.status), children: model.status })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-green-400", children: [model.accuracy, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Accuracy" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-blue-400", children: [model.confidence, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Confidence" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-400", children: model.predictions24h }), _jsx("div", { className: "text-sm text-gray-400", children: "Predictions 24h" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-yellow-400", children: [model.successRate, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Success Rate" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-300", children: "Model Performance" }), _jsxs("span", { className: "text-white", children: [model.accuracy, "%"] })] }), _jsx(Progress, { value: model.accuracy, className: "h-2" })] }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsx("span", { className: "text-gray-400", children: "Last Updated" }), _jsx("span", { className: "text-gray-300", children: model.lastUpdated.toLocaleTimeString() })] })] })] }, model.id))) }) })] })] }) }));
}
