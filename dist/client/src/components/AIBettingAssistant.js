import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, DollarSign, AlertTriangle, Star, Zap, Trophy } from "lucide-react";
export default function AIBettingAssistant() {
    const [activeTab, setActiveTab] = useState('predictions');
    const [userProfile, setUserProfile] = useState({
        riskTolerance: 'moderate',
        preferredSports: ['football', 'basketball'],
        avgStake: 25,
        winRate: 0.58,
        totalBets: 247
    });
    // Mock AI predictions with 94.2% accuracy
    const predictions = [
        {
            matchId: 1,
            sport: 'Football',
            teams: 'Chiefs vs Bills',
            prediction: {
                outcome: 'Chiefs -3.5',
                confidence: 87,
                expectedValue: 12.4,
                riskLevel: 'low',
                reasoning: [
                    'Chiefs 8-2 home record this season',
                    'Bills struggling vs playoff teams (2-5)',
                    'Weather favors Chiefs rushing attack',
                    'Key Bills injuries on defense'
                ]
            },
            modelAccuracy: 94.2,
            historicalPerformance: {
                winRate: 0.72,
                avgReturn: 1.18,
                totalPredictions: 156
            }
        },
        {
            matchId: 2,
            sport: 'Basketball',
            teams: 'Lakers vs Celtics',
            prediction: {
                outcome: 'Over 218.5',
                confidence: 91,
                expectedValue: 15.8,
                riskLevel: 'low',
                reasoning: [
                    'Both teams averaging 115+ points',
                    'Fast pace expected (102+ possessions)',
                    'Defensive injuries for both sides',
                    'Historical O/U trend: 78% over in H2H'
                ]
            },
            modelAccuracy: 89.6,
            historicalPerformance: {
                winRate: 0.69,
                avgReturn: 1.24,
                totalPredictions: 203
            }
        }
    ];
    const recommendations = [
        {
            id: '1',
            type: 'value_bet',
            title: 'High Value Opportunity',
            description: 'Liverpool to score 2+ goals vs Arsenal',
            matchInfo: 'Premier League • Today 3:00 PM',
            recommendation: 'Back Liverpool Over 1.5 Goals',
            suggestedStake: 35,
            potentialReturn: 63,
            confidence: 89,
            riskScore: 3,
            reasoning: [
                'Liverpool scored 2+ in 8/10 recent away games',
                'Arsenal conceded 2+ in 6/8 home games',
                'Key Arsenal defenders injured'
            ],
            timeframe: '2 hours remaining',
            priority: 'high'
        },
        {
            id: '2',
            type: 'safe_bet',
            title: 'Conservative Play',
            description: 'Double Chance on Manchester Derby',
            matchInfo: 'Premier League • Tomorrow 12:30 PM',
            recommendation: 'Man City or Draw',
            suggestedStake: 50,
            potentialReturn: 70,
            confidence: 78,
            riskScore: 2,
            reasoning: [
                'City unbeaten at home this season',
                'United poor away record vs top 6',
                'Safe value at current odds'
            ],
            timeframe: '1 day remaining',
            priority: 'medium'
        }
    ];
    const bankrollStrategy = {
        currentBalance: 1250,
        optimalBetSize: 28,
        riskLevel: 'moderate',
        kellyPercentage: 2.2,
        dailyTarget: 45,
        weeklyGoal: 280,
        riskOfRuin: 0.08,
        streakAnalysis: {
            currentStreak: 4,
            longestWin: 12,
            longestLoss: 6,
            recommendation: 'Continue current strategy - positive momentum'
        }
    };
    const marketInefficiencies = [
        {
            id: '1',
            market: 'NBA Total Points',
            inefficiencyType: 'undervalued',
            expectedValue: 18.5,
            confidence: 92,
            timeRemaining: '45 minutes',
            bookmakerOdds: 1.90,
            fairOdds: 1.65,
            edge: 13.2,
            maxStake: 150
        },
        {
            id: '2',
            market: 'Soccer Asian Handicap',
            inefficiencyType: 'overvalued',
            expectedValue: 11.7,
            confidence: 85,
            timeRemaining: '2 hours',
            bookmakerOdds: 2.10,
            fairOdds: 2.35,
            edge: 10.6,
            maxStake: 75
        }
    ];
    const getRiskColor = (level) => {
        switch (level) {
            case 'low': return 'text-green-400';
            case 'medium': return 'text-yellow-400';
            case 'high': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Card, { className: "bg-gradient-to-r from-winnex-blue/20 to-winnex-green/20 border-winnex-blue/30", children: _jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-winnex-blue/20 rounded-lg", children: _jsx(Brain, { className: "w-6 h-6 text-winnex-blue" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl", children: "AI Betting Assistant" }), _jsx("p", { className: "text-sm text-gray-400", children: "94.2% prediction accuracy \u2022 Real-time analysis" })] })] }), _jsxs(Badge, { className: "bg-winnex-green text-black font-medium", children: [_jsx(Zap, { className: "w-3 h-3 mr-1" }), "ACTIVE"] })] }) }) }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 bg-winnex-dark", children: [_jsx(TabsTrigger, { value: "predictions", children: "Predictions" }), _jsx(TabsTrigger, { value: "recommendations", children: "Smart Picks" }), _jsx(TabsTrigger, { value: "bankroll", children: "Bankroll" }), _jsx(TabsTrigger, { value: "insights", children: "Market Edge" })] }), _jsx(TabsContent, { value: "predictions", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: predictions?.map((prediction, index) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: prediction.teams }), _jsx("p", { className: "text-sm text-gray-400", children: prediction.sport })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Badge, { className: "bg-winnex-green text-black", children: [prediction.prediction.confidence, "% Confidence"] }), _jsxs(Badge, { variant: "outline", className: getRiskColor(prediction.prediction.riskLevel), children: [prediction.prediction.riskLevel.toUpperCase(), " RISK"] })] }) })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "font-medium", children: "AI Prediction:" }), _jsx("span", { className: "text-winnex-green font-bold", children: prediction.prediction.outcome })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Expected Value:" }), _jsxs("span", { className: "text-winnex-green font-medium", children: ["+", prediction.prediction.expectedValue, "%"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "AI Reasoning:" }), _jsx("ul", { className: "space-y-1", children: prediction.prediction.reasoning.map((reason, idx) => (_jsxs("li", { className: "text-sm text-gray-300 flex items-start", children: [_jsx("span", { className: "text-winnex-green mr-2", children: "\u2022" }), reason] }, idx))) })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400 border-t border-gray-600 pt-3", children: [_jsxs("span", { children: ["Model Accuracy: ", prediction.modelAccuracy, "%"] }), _jsxs("span", { children: ["Win Rate: ", (prediction.historicalPerformance.winRate * 100).toFixed(1), "%"] }), _jsxs("span", { children: ["Avg Return: +", ((prediction.historicalPerformance.avgReturn - 1) * 100).toFixed(1), "%"] })] }), _jsx(Button, { className: "w-full bg-winnex-green text-black hover:bg-green-400 font-medium", children: "Add to Bet Slip" })] })] }, index))) }) }), _jsx(TabsContent, { value: "recommendations", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: recommendations?.map((rec) => (_jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { className: getPriorityColor(rec.priority), children: rec.priority.toUpperCase() }), _jsx("h3", { className: "font-semibold", children: rec.title })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), _jsxs("span", { className: "text-sm font-medium", children: [rec.confidence, "%"] })] })] }), _jsx("p", { className: "text-sm text-gray-400", children: rec.matchInfo })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "font-medium", children: "Recommendation:" }), _jsx("span", { className: "text-winnex-green", children: rec.recommendation })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Suggested Stake:" }), _jsxs("span", { className: "text-sm font-medium", children: ["$", rec.suggestedStake] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Potential Return:" }), _jsxs("span", { className: "text-sm font-medium text-winnex-green", children: ["$", rec.potentialReturn] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "Analysis:" }), _jsx("ul", { className: "space-y-1", children: rec.reasoning.map((reason, idx) => (_jsxs("li", { className: "text-sm text-gray-300 flex items-start", children: [_jsx("span", { className: "text-winnex-blue mr-2", children: "\u2022" }), reason] }, idx))) })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [_jsxs("span", { children: ["Risk Score: ", rec.riskScore, "/10"] }), _jsx("span", { children: rec.timeframe })] }), _jsx(Button, { className: "w-full bg-winnex-blue text-white hover:bg-blue-400 font-medium", children: "Follow Recommendation" })] })] }, rec.id))) }) }), _jsx(TabsContent, { value: "bankroll", className: "space-y-4", children: _jsxs(Card, { className: "bg-winnex-gray border-gray-600", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center", children: [_jsx(DollarSign, { className: "w-5 h-5 mr-2 text-winnex-green" }), "Smart Bankroll Management"] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-winnex-green", children: ["$", bankrollStrategy.currentBalance] }), _jsx("div", { className: "text-sm text-gray-400", children: "Current Balance" })] }), _jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-winnex-blue", children: ["$", bankrollStrategy.optimalBetSize] }), _jsx("div", { className: "text-sm text-gray-400", children: "Optimal Bet Size" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { children: "Daily Progress" }), _jsxs("span", { children: ["$", bankrollStrategy.dailyTarget] })] }), _jsx(Progress, { value: 65, className: "h-2" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { children: "Weekly Goal" }), _jsxs("span", { children: ["$", bankrollStrategy.weeklyGoal] })] }), _jsx(Progress, { value: 43, className: "h-2" })] })] }), _jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsx("h4", { className: "font-medium", children: "Kelly Criterion Analysis" }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Recommended Stake %:" }), _jsxs("span", { className: "text-winnex-green", children: [bankrollStrategy.kellyPercentage, "%"] })] }), _jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { children: "Risk of Ruin:" }), _jsxs("span", { className: "text-green-400", children: [(bankrollStrategy.riskOfRuin * 100).toFixed(1), "%"] })] })] }), _jsxs("div", { className: "bg-gradient-to-r from-winnex-green/10 to-winnex-blue/10 rounded-lg p-4", children: [_jsxs("h4", { className: "font-medium mb-2 flex items-center", children: [_jsx(Trophy, { className: "w-4 h-4 mr-2 text-winnex-green" }), "Streak Analysis"] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 text-center text-sm", children: [_jsxs("div", { children: [_jsx("div", { className: "font-bold text-winnex-green", children: bankrollStrategy.streakAnalysis.currentStreak }), _jsx("div", { className: "text-gray-400", children: "Current Win" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-blue-400", children: bankrollStrategy.streakAnalysis.longestWin }), _jsx("div", { className: "text-gray-400", children: "Best Streak" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-bold text-red-400", children: bankrollStrategy.streakAnalysis.longestLoss }), _jsx("div", { className: "text-gray-400", children: "Worst Streak" })] })] }), _jsx("p", { className: "text-sm text-gray-300 mt-3 text-center", children: bankrollStrategy.streakAnalysis.recommendation })] })] })] }) }), _jsx(TabsContent, { value: "insights", className: "space-y-4", children: _jsx("div", { className: "grid gap-4", children: marketInefficiencies?.map((inefficiency) => (_jsxs(Card, { className: "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "w-5 h-5 text-orange-400" }), _jsx("h3", { className: "font-semibold", children: "Market Inefficiency Detected" })] }), _jsxs(Badge, { className: "bg-orange-500 text-white", children: [inefficiency.confidence, "% Confidence"] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "font-medium", children: "Market:" }), _jsx("span", { className: "text-winnex-green", children: inefficiency.market })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Type:" }), _jsx("span", { className: `font-medium ${inefficiency.inefficiencyType === 'undervalued' ? 'text-green-400' :
                                                                    inefficiency.inefficiencyType === 'overvalued' ? 'text-red-400' : 'text-blue-400'}`, children: inefficiency.inefficiencyType.toUpperCase() })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Edge:" }), _jsxs("span", { className: "text-winnex-green font-bold", children: ["+", inefficiency.edge.toFixed(1), "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Max Stake:" }), _jsxs("span", { className: "font-medium", children: ["$", inefficiency.maxStake] })] })] }), _jsxs("div", { className: "bg-winnex-dark rounded-lg p-4 space-y-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "Odds Comparison" }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Bookmaker Odds:" }), _jsx("span", { className: "text-sm", children: inefficiency.bookmakerOdds })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Fair Value:" }), _jsx("span", { className: "text-sm text-winnex-green", children: inefficiency.fairOdds })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Expected Value:" }), _jsxs("span", { className: "text-sm text-winnex-green", children: ["+", inefficiency.expectedValue.toFixed(1), "%"] })] })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [_jsxs("span", { children: ["Time remaining: ", inefficiency.timeRemaining] }), _jsx("span", { className: "text-orange-400", children: "\u26A1 Limited time" })] }), _jsx(Button, { className: "w-full bg-orange-500 text-white hover:bg-orange-400 font-medium", children: "Exploit Market Edge" })] })] }, inefficiency.id))) }) })] })] }));
}
