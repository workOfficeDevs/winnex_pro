import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { TrendingUp, Shield, Gift, Users, DollarSign, Clock, Target, Award, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";
export default function EnhancementsDemo() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("settlement");
    const [limitStatus, setLimitStatus] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [promoCode, setPromoCode] = useState("");
    const [depositAmount, setDepositAmount] = useState("");
    const [marginAnalytics, setMarginAnalytics] = useState([]);
    const [settlementStats, setSettlementStats] = useState(null);
    // Load initial data
    useEffect(() => {
        loadLimitStatus();
        loadPromotions();
        loadMarginAnalytics();
        loadSettlementStats();
    }, []);
    const loadLimitStatus = async () => {
        try {
            const response = await apiRequest("GET", "/api/limits/status");
            const data = await response.json();
            setLimitStatus(data);
        }
        catch (error) {
            console.error("Error loading limit status:", error);
        }
    };
    const loadPromotions = async () => {
        try {
            const response = await apiRequest("GET", "/api/promotions/available");
            const data = await response.json();
            setPromotions(data);
        }
        catch (error) {
            console.error("Error loading promotions:", error);
        }
    };
    const loadMarginAnalytics = async () => {
        try {
            const response = await apiRequest("GET", "/api/margins/analytics");
            const data = await response.json();
            setMarginAnalytics(data);
        }
        catch (error) {
            console.error("Error loading margin analytics:", error);
        }
    };
    const loadSettlementStats = async () => {
        try {
            const response = await apiRequest("GET", "/api/settlement/stats");
            const data = await response.json();
            setSettlementStats(data);
        }
        catch (error) {
            console.error("Error loading settlement stats:", error);
        }
    };
    const applyPromotion = async () => {
        try {
            const response = await apiRequest("POST", "/api/promotions/apply", {
                code: promoCode,
                data: { depositAmount: parseFloat(depositAmount) }
            });
            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Promotion Applied!",
                    description: `Bonus: $${data.bonusAmount}`,
                });
                setPromoCode("");
                setDepositAmount("");
            }
            else {
                toast({
                    title: "Promotion Failed",
                    description: data.message,
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to apply promotion",
                variant: "destructive",
            });
        }
    };
    const setUserLimits = async (limits) => {
        try {
            const response = await apiRequest("POST", "/api/limits/set", limits);
            if (response.ok) {
                toast({
                    title: "Limits Updated",
                    description: "Your gambling limits have been set successfully",
                });
                await loadLimitStatus();
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to update limits",
                variant: "destructive",
            });
        }
    };
    const startSession = async () => {
        try {
            const response = await apiRequest("POST", "/api/session/start");
            if (response.ok) {
                toast({
                    title: "Session Started",
                    description: "Your gambling session has begun",
                });
                await loadLimitStatus();
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to start session",
                variant: "destructive",
            });
        }
    };
    const endSession = async () => {
        try {
            const response = await apiRequest("POST", "/api/session/end");
            if (response.ok) {
                toast({
                    title: "Session Ended",
                    description: "Your gambling session has been ended",
                });
                await loadLimitStatus();
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: "Failed to end session",
                variant: "destructive",
            });
        }
    };
    return (_jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-8", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent", children: "Winnex Pro Core Enhancements" }), _jsx("p", { className: "text-muted-foreground text-lg", children: "Advanced betting platform features for trust, functionality, and monetization" })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [_jsxs(TabsTrigger, { value: "settlement", className: "flex items-center gap-2", children: [_jsx(Target, { className: "h-4 w-4" }), "Settlement"] }), _jsxs(TabsTrigger, { value: "margins", className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-4 w-4" }), "Margins"] }), _jsxs(TabsTrigger, { value: "limits", className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4" }), "Limits"] }), _jsxs(TabsTrigger, { value: "promotions", className: "flex items-center gap-2", children: [_jsx(Gift, { className: "h-4 w-4" }), "Promotions"] }), _jsxs(TabsTrigger, { value: "referrals", className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4" }), "Referrals"] })] }), _jsx(TabsContent, { value: "settlement", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Target, { className: "h-5 w-5 text-green-500" }), "Automated Bet Settlement Engine"] }), _jsx(CardDescription, { children: "Real-time bet settlement with automated result processing" })] }), _jsxs(CardContent, { className: "space-y-4", children: [settlementStats && (_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: settlementStats.isRunning ? 'Active' : 'Inactive' }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Engine Status" })] }), _jsxs("div", { className: "text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: settlementStats.availableMarkets?.length || 0 }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Supported Markets" })] }), _jsxs("div", { className: "text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: "30s" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Settlement Interval" })] })] })), _jsxs(Alert, { children: [_jsx(CheckCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Settlement engine processes: 1X2, Over/Under, Handicap, BTTS markets automatically" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold", children: "Supported Settlement Markets:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ['1X2 (Match Winner)', 'Over/Under Goals', 'Handicap', 'Both Teams to Score'].map((market) => (_jsx(Badge, { variant: "secondary", children: market }, market))) })] })] })] }) }), _jsx(TabsContent, { value: "margins", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-blue-500" }), "Dynamic Odds Margin Engine"] }), _jsx(CardDescription, { children: "Automated margin adjustments for optimal profitability" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Margin Configuration" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Football 1X2:" }), _jsx(Badge, { variant: "outline", children: "5.5% - 8.0%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Basketball O/U:" }), _jsx(Badge, { variant: "outline", children: "3.5% - 6.0%" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Tennis 1X2:" }), _jsx(Badge, { variant: "outline", children: "3.5% - 6.0%" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Dynamic Adjustments" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4 text-orange-500" }), _jsx("span", { className: "text-sm", children: "Time-based margins" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BarChart3, { className: "h-4 w-4 text-green-500" }), _jsx("span", { className: "text-sm", children: "Volume-based adjustments" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Award, { className: "h-4 w-4 text-purple-500" }), _jsx("span", { className: "text-sm", children: "Featured match premiums" })] })] })] })] }), marginAnalytics.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-semibold", children: "Current Market Analytics" }), _jsx("div", { className: "grid gap-2", children: marginAnalytics.slice(0, 5).map((analytics, index) => (_jsxs("div", { className: "flex justify-between items-center p-3 bg-muted rounded-lg", children: [_jsx("span", { className: "font-medium", children: analytics.market }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("span", { children: ["Avg: ", analytics.avgMargin?.toFixed(2), "%"] }), _jsxs("span", { children: ["Volume: $", analytics.totalVolume?.toLocaleString()] }), _jsxs(Badge, { variant: "outline", children: [analytics.count, " odds"] })] })] }, index))) })] }))] })] }) }), _jsx(TabsContent, { value: "limits", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-5 w-5 text-red-500" }), "Responsible Gambling Limits"] }), _jsx(CardDescription, { children: "Set and monitor gambling limits for player protection" })] }), _jsxs(CardContent, { className: "space-y-6", children: [limitStatus && (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Deposit Limits" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Daily:" }), _jsxs("span", { className: "text-sm font-medium", children: ["$", limitStatus.deposits.daily.current, " / $", limitStatus.deposits.daily.limit] })] }), _jsx(Progress, { value: (limitStatus.deposits.daily.current / limitStatus.deposits.daily.limit) * 100, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Weekly:" }), _jsxs("span", { className: "text-sm font-medium", children: ["$", limitStatus.deposits.weekly.current, " / $", limitStatus.deposits.weekly.limit] })] }), _jsx(Progress, { value: (limitStatus.deposits.weekly.current / limitStatus.deposits.weekly.limit) * 100, className: "h-2" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Betting Limits" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Daily:" }), _jsxs("span", { className: "text-sm font-medium", children: ["$", limitStatus.bets.daily.current, " / $", limitStatus.bets.daily.limit] })] }), _jsx(Progress, { value: (limitStatus.bets.daily.current / limitStatus.bets.daily.limit) * 100, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Weekly:" }), _jsxs("span", { className: "text-sm font-medium", children: ["$", limitStatus.bets.weekly.current, " / $", limitStatus.bets.weekly.limit] })] }), _jsx(Progress, { value: (limitStatus.bets.weekly.current / limitStatus.bets.weekly.limit) * 100, className: "h-2" })] })] })] })] })), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { onClick: startSession, variant: "outline", children: "Start Session" }), _jsx(Button, { onClick: endSession, variant: "outline", children: "End Session" }), _jsx(Button, { onClick: () => setUserLimits({
                                                        dailyDepositLimit: 500,
                                                        weeklyDepositLimit: 2000,
                                                        dailyBetLimit: 200,
                                                        weeklyBetLimit: 1000,
                                                        sessionTimeLimit: 180
                                                    }), variant: "secondary", children: "Set Example Limits" })] }), _jsxs(Alert, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Limits help promote responsible gambling and comply with regulations" })] })] })] }) }), _jsx(TabsContent, { value: "promotions", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Gift, { className: "h-5 w-5 text-yellow-500" }), "Promotions & Bonus System"] }), _jsx(CardDescription, { children: "Manage promotional codes and bonus campaigns" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Apply Promotion" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "promoCode", children: "Promotion Code" }), _jsx(Input, { id: "promoCode", value: promoCode, onChange: (e) => setPromoCode(e.target.value), placeholder: "Enter promotion code" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "depositAmount", children: "Deposit Amount (for match bonuses)" }), _jsx(Input, { id: "depositAmount", type: "number", value: depositAmount, onChange: (e) => setDepositAmount(e.target.value), placeholder: "100" })] }), _jsx(Button, { onClick: applyPromotion, className: "w-full", children: "Apply Promotion" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Test Promotion Codes" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "WELCOME100" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Welcome bonus" })] }), _jsx(Badge, { variant: "secondary", children: "$100" })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "MATCH50" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "50% deposit match" })] }), _jsx(Badge, { variant: "secondary", children: "50%" })] }), _jsxs("div", { className: "flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "FREEBET25" }), _jsx("div", { className: "text-sm text-muted-foreground", children: "Free bet bonus" })] }), _jsx(Badge, { variant: "secondary", children: "$25" })] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Available Promotions" }), _jsx("div", { className: "grid gap-3", children: promotions.slice(0, 3).map((promo) => (_jsxs("div", { className: "flex justify-between items-center p-4 border rounded-lg", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: promo.title }), _jsx("div", { className: "text-sm text-muted-foreground", children: promo.description }), _jsx(Badge, { variant: "outline", className: "mt-1", children: promo.code })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "font-bold text-green-600", children: ["$", promo.value] }), _jsx("div", { className: "text-xs text-muted-foreground", children: promo.type })] })] }, promo.id))) })] })] })] }) }), _jsx(TabsContent, { value: "referrals", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-green-500" }), "Referral System"] }), _jsx(CardDescription, { children: "Grow your user base through referral rewards" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Your Referral Link" }), _jsx("div", { className: "p-4 bg-muted rounded-lg", children: _jsx("div", { className: "text-sm font-mono break-all", children: "https://winnexpro.com/signup?ref=REF-ABC12345" }) }), _jsx(Button, { variant: "outline", className: "w-full", children: "Copy Referral Link" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-semibold", children: "Referral Rewards" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Bonus per referral:" }), _jsx(Badge, { variant: "secondary", children: "$25" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Total referrals:" }), _jsx(Badge, { variant: "outline", children: "0" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Total earned:" }), _jsx(Badge, { variant: "secondary", children: "$0" })] })] })] })] }), _jsxs(Alert, { children: [_jsx(DollarSign, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Earn $25 for each friend who signs up and makes their first deposit of $50+" })] })] })] }) })] })] }));
}
