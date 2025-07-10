import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { Gift, Percent, Trophy, Clock, Star, Zap, Target, Calendar } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
export default function Promotions() {
    const [selectedType, setSelectedType] = useState('all');
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const { data: promotions, isLoading: promotionsLoading } = useQuery({
        queryKey: ['/api/promotions'],
    });
    const { data: userPromotions, isLoading: userPromotionsLoading } = useQuery({
        queryKey: ['/api/user/promotions'],
    });
    const { data: loyaltyProgram } = useQuery({
        queryKey: ['/api/user/loyalty'],
    });
    const claimPromotionMutation = useMutation({
        mutationFn: (promotionId) => apiRequest('/api/promotions/claim', 'POST', { promotionId }),
        onSuccess: (data) => {
            toast({
                title: "Promotion Claimed!",
                description: "Your bonus has been added to your account.",
            });
            queryClient.invalidateQueries({ queryKey: ['/api/promotions'] });
            queryClient.invalidateQueries({ queryKey: ['/api/user/promotions'] });
        },
        onError: (error) => {
            toast({
                title: "Claim Failed",
                description: error.message || "Unable to claim promotion.",
                variant: "destructive",
            });
        },
    });
    const getPromotionIcon = (type) => {
        switch (type) {
            case 'welcome_bonus': return Gift;
            case 'deposit_match': return Percent;
            case 'free_bet': return Target;
            case 'cashback': return Zap;
            case 'loyalty': return Star;
            case 'tournament': return Trophy;
            default: return Gift;
        }
    };
    const getPromotionColor = (type) => {
        switch (type) {
            case 'welcome_bonus': return 'bg-green-500/20 text-green-400 border-green-500/20';
            case 'deposit_match': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
            case 'free_bet': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
            case 'cashback': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
            case 'loyalty': return 'bg-pink-500/20 text-pink-400 border-pink-500/20';
            case 'tournament': return 'bg-orange-500/20 text-orange-400 border-orange-500/20';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/20';
        }
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500/20 text-green-400';
            case 'completed': return 'bg-blue-500/20 text-blue-400';
            case 'expired': return 'bg-red-500/20 text-red-400';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };
    const formatValue = (value, currency) => {
        switch (currency) {
            case 'USD': return `$${value}`;
            case 'percentage': return `${value}%`;
            case 'points': return `${value} pts`;
            default: return value.toString();
        }
    };
    const filteredPromotions = promotions?.filter((promo) => selectedType === 'all' || promo.type === selectedType) || [];
    if (promotionsLoading || userPromotionsLoading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto" }), _jsx("p", { className: "mt-4 text-slate-300", children: "Loading promotions..." })] }) }) }));
    }
    return (_jsx(Layout, { children: _jsxs("div", { className: "container mx-auto px-4 py-8 space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Gift, { className: "h-12 w-12 text-green-400 mr-4" }), _jsx("h1", { className: "text-4xl font-bold text-white", children: "Promotions & Bonuses" })] }), _jsx("p", { className: "text-slate-300 text-lg", children: "Maximize your winnings with exclusive offers and rewards" })] }), loyaltyProgram && (_jsxs(Card, { className: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/20 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(Star, { className: "h-6 w-6 mr-2 text-yellow-400" }), "VIP Loyalty Program - ", loyaltyProgram.currentTier, " Tier"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-300 text-sm", children: "Current Points" }), _jsx("p", { className: "text-3xl font-bold text-white", children: loyaltyProgram.points.toLocaleString() }), _jsx(Progress, { value: loyaltyProgram.tierProgress, className: "mt-2" }), _jsxs("p", { className: "text-slate-400 text-xs mt-1", children: [loyaltyProgram.nextTierPoints - loyaltyProgram.points, " points to next tier"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-300 text-sm", children: "Monthly Wagering" }), _jsxs("p", { className: "text-2xl font-bold text-green-400", children: ["$", loyaltyProgram.monthlyWagering.toLocaleString()] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-300 text-sm", children: "Lifetime Wagering" }), _jsxs("p", { className: "text-2xl font-bold text-blue-400", children: ["$", loyaltyProgram.lifetimeWagering.toLocaleString()] })] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-300 text-sm mb-2", children: "Current Benefits" }), _jsx("div", { className: "flex flex-wrap gap-2", children: loyaltyProgram.benefits.map((benefit, index) => (_jsx(Badge, { className: "bg-purple-500/20 text-purple-400", children: benefit }, index))) })] })] })] })), _jsxs(Tabs, { defaultValue: "available", className: "space-y-6", children: [_jsxs(TabsList, { className: "bg-black/20 backdrop-blur-xl border-white/10", children: [_jsx(TabsTrigger, { value: "available", className: "data-[state=active]:bg-green-500/20", children: "Available Promotions" }), _jsx(TabsTrigger, { value: "active", className: "data-[state=active]:bg-green-500/20", children: "My Active Bonuses" }), _jsx(TabsTrigger, { value: "history", className: "data-[state=active]:bg-green-500/20", children: "Bonus History" })] }), _jsxs(TabsContent, { value: "available", className: "space-y-6", children: [_jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Button, { variant: selectedType === 'all' ? 'default' : 'outline', onClick: () => setSelectedType('all'), size: "sm", children: "All Promotions" }), _jsx(Button, { variant: selectedType === 'welcome_bonus' ? 'default' : 'outline', onClick: () => setSelectedType('welcome_bonus'), size: "sm", children: "Welcome Bonus" }), _jsx(Button, { variant: selectedType === 'deposit_match' ? 'default' : 'outline', onClick: () => setSelectedType('deposit_match'), size: "sm", children: "Deposit Match" }), _jsx(Button, { variant: selectedType === 'free_bet' ? 'default' : 'outline', onClick: () => setSelectedType('free_bet'), size: "sm", children: "Free Bets" }), _jsx(Button, { variant: selectedType === 'cashback' ? 'default' : 'outline', onClick: () => setSelectedType('cashback'), size: "sm", children: "Cashback" })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: filteredPromotions.map((promotion) => {
                                        const Icon = getPromotionIcon(promotion.type);
                                        return (_jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-2 rounded-lg ${getPromotionColor(promotion.type)}`, children: _jsx(Icon, { className: "h-6 w-6" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: promotion.title }), _jsx(Badge, { className: getPromotionColor(promotion.type), children: promotion.type.replace('_', ' ') })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-3xl font-bold text-green-400", children: formatValue(promotion.value, promotion.currency) }), promotion.maxClaim && (_jsxs("p", { className: "text-slate-400 text-sm", children: [promotion.currentClaims || 0, "/", promotion.maxClaim, " claimed"] }))] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-slate-300", children: promotion.description }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-slate-400 text-sm font-medium", children: "Requirements:" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-sm", children: [promotion.requirements.minDeposit && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Min Deposit:" }), _jsxs("span", { className: "text-white", children: ["$", promotion.requirements.minDeposit] })] })), promotion.requirements.minOdds && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Min Odds:" }), _jsx("span", { className: "text-white", children: promotion.requirements.minOdds })] })), promotion.requirements.rollover && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Rollover:" }), _jsxs("span", { className: "text-white", children: [promotion.requirements.rollover, "x"] })] })), promotion.requirements.timeLimit && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-slate-400", children: "Time Limit:" }), _jsx("span", { className: "text-white", children: promotion.requirements.timeLimit })] }))] })] }), promotion.requirements.eligibleSports && (_jsxs("div", { children: [_jsx("p", { className: "text-slate-400 text-sm mb-2", children: "Eligible Sports:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: promotion.requirements.eligibleSports.map((sport, index) => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: sport }, index))) })] })), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-slate-600", children: [_jsxs("div", { className: "flex items-center text-slate-400 text-sm", children: [_jsx(Clock, { className: "h-4 w-4 mr-1" }), "Expires: ", new Date(promotion.validUntil).toLocaleDateString()] }), _jsx(Button, { onClick: () => claimPromotionMutation.mutate(promotion.id), disabled: !promotion.isEligible || promotion.claimed || claimPromotionMutation.isPending, className: `${promotion.claimed
                                                                        ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                                                                        : 'bg-green-500 hover:bg-green-600'}`, children: promotion.claimed ? 'Claimed' : promotion.isEligible ? 'Claim Now' : 'Not Eligible' })] })] })] }, promotion.id));
                                    }) })] }), _jsxs(TabsContent, { value: "active", className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: userPromotions?.filter((promo) => promo.status === 'active').map((promotion) => (_jsxs(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-white", children: promotion.title }), _jsx(Badge, { className: getStatusColor(promotion.status), children: promotion.status })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-slate-400", children: "Progress" }), _jsxs("span", { className: "text-white", children: [promotion.progress, "/", promotion.target] })] }), _jsx(Progress, { value: (promotion.progress / promotion.target) * 100, className: "h-2" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Reward" }), _jsx("p", { className: "text-green-400 font-bold", children: promotion.reward })] }), _jsxs("div", { children: [_jsx("p", { className: "text-slate-400", children: "Expires" }), _jsx("p", { className: "text-white", children: new Date(promotion.expiresAt).toLocaleDateString() })] })] })] })] }, promotion.id))) }), userPromotions?.filter((promo) => promo.status === 'active').length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Target, { className: "h-16 w-16 text-slate-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "No Active Bonuses" }), _jsx("p", { className: "text-slate-400", children: "Claim a promotion to start earning rewards" })] }))] }), _jsxs(TabsContent, { value: "history", className: "space-y-6", children: [_jsx("div", { className: "space-y-4", children: userPromotions?.filter((promo) => promo.status !== 'active').map((promotion) => (_jsx(Card, { className: "bg-black/20 border-white/10 backdrop-blur-xl", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-white font-bold", children: promotion.title }), _jsxs("p", { className: "text-slate-400 text-sm", children: [promotion.status === 'completed' ? 'Completed' : 'Expired', " \u2022", promotion.claimedAt ? ` Claimed ${new Date(promotion.claimedAt).toLocaleDateString()}` : ''] })] }), _jsxs("div", { className: "text-right", children: [_jsx(Badge, { className: getStatusColor(promotion.status), children: promotion.status }), _jsx("p", { className: "text-green-400 font-bold mt-1", children: promotion.reward })] })] }) }) }, promotion.id))) }), userPromotions?.filter((promo) => promo.status !== 'active').length === 0 && (_jsxs("div", { className: "text-center py-12", children: [_jsx(Calendar, { className: "h-16 w-16 text-slate-400 mx-auto mb-4" }), _jsx("h3", { className: "text-xl font-bold text-white mb-2", children: "No Bonus History" }), _jsx("p", { className: "text-slate-400", children: "Your completed and expired bonuses will appear here" })] }))] })] })] }) }));
}
