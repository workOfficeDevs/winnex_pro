import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, Share2, Copy } from "lucide-react";
export default function AffiliateManagement() {
    const [stats, setStats] = useState(null);
    const [referrals, setReferrals] = useState([]);
    const [commissionTiers, setCommissionTiers] = useState([]);
    const [marketingMaterials, setMarketingMaterials] = useState([]);
    const [payoutHistory, setPayoutHistory] = useState([]);
    const [affiliateCode, setAffiliateCode] = useState('WINNEX_USER123');
    useEffect(() => {
        const mockStats = {
            totalCommissions: 12840,
            monthlyCommissions: 2350,
            totalReferrals: 47,
            activeReferrals: 32,
            conversionRate: 24.5,
            averagePlayerValue: 850,
            clickThroughRate: 3.2,
            tier: 'gold'
        };
        const mockReferrals = [
            {
                id: 'ref_001',
                username: 'SportsFan2024',
                joinDate: '2024-01-10',
                totalDeposits: 1250,
                totalBets: 2840,
                commissionEarned: 156,
                status: 'active',
                lastActivity: '2024-01-15'
            },
            {
                id: 'ref_002',
                username: 'BetMaster',
                joinDate: '2024-01-08',
                totalDeposits: 890,
                totalBets: 1560,
                commissionEarned: 98,
                status: 'active',
                lastActivity: '2024-01-14'
            },
            {
                id: 'ref_003',
                username: 'LuckyPlayer',
                joinDate: '2024-01-05',
                totalDeposits: 450,
                totalBets: 780,
                commissionEarned: 45,
                status: 'inactive',
                lastActivity: '2024-01-12'
            }
        ];
        const mockTiers = [
            {
                tier: 'Bronze',
                minReferrals: 0,
                commissionRate: 25,
                bonusPerks: ['Basic marketing materials', 'Monthly payouts'],
                color: 'text-orange-400'
            },
            {
                tier: 'Silver',
                minReferrals: 10,
                commissionRate: 30,
                bonusPerks: ['Advanced materials', 'Bi-weekly payouts', 'Performance bonus'],
                color: 'text-gray-400'
            },
            {
                tier: 'Gold',
                minReferrals: 25,
                commissionRate: 35,
                bonusPerks: ['Premium materials', 'Weekly payouts', 'Personal manager', 'Custom tracking'],
                color: 'text-yellow-400'
            },
            {
                tier: 'Platinum',
                minReferrals: 50,
                commissionRate: 40,
                bonusPerks: ['Exclusive materials', 'Daily payouts', 'VIP support', 'Revenue sharing'],
                color: 'text-purple-400'
            }
        ];
        const mockMaterials = [
            {
                id: 'banner_001',
                type: 'banner',
                title: 'Winnex Main Banner',
                description: 'High-converting main promotional banner',
                dimensions: '728x90',
                format: 'PNG/GIF',
                clickThrough: 3.8,
                conversionRate: 12.5
            },
            {
                id: 'text_001',
                type: 'text',
                title: 'Welcome Bonus Text Ad',
                description: 'Compelling text ad focusing on welcome bonus',
                format: 'HTML/Text',
                clickThrough: 2.1,
                conversionRate: 8.7
            },
            {
                id: 'video_001',
                type: 'video',
                title: 'Sports Betting Promo',
                description: '30-second promotional video',
                format: 'MP4',
                clickThrough: 5.2,
                conversionRate: 18.3
            }
        ];
        const mockPayouts = [
            {
                id: 'payout_001',
                amount: 2350,
                date: '2024-01-15',
                method: 'Bank Transfer',
                status: 'processed',
                referenceId: 'TXN_20240115_001'
            },
            {
                id: 'payout_002',
                amount: 1890,
                date: '2024-01-08',
                method: 'PayPal',
                status: 'processed',
                referenceId: 'TXN_20240108_002'
            },
            {
                id: 'payout_003',
                amount: 1650,
                date: '2024-01-01',
                method: 'Cryptocurrency',
                status: 'processed',
                referenceId: 'TXN_20240101_003'
            }
        ];
        setStats(mockStats);
        setReferrals(mockReferrals);
        setCommissionTiers(mockTiers);
        setMarketingMaterials(mockMaterials);
        setPayoutHistory(mockPayouts);
    }, []);
    const copyAffiliateLink = () => {
        const link = `https://winnex.com/register?ref=${affiliateCode}`;
        navigator.clipboard.writeText(link);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'text-green-400';
            case 'inactive': return 'text-yellow-400';
            case 'churned': return 'text-red-400';
            case 'processed': return 'text-green-400';
            case 'pending': return 'text-yellow-400';
            case 'failed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };
    const getCurrentTier = () => {
        if (!stats)
            return commissionTiers[0];
        return commissionTiers.find(tier => tier.tier.toLowerCase() === stats.tier) || commissionTiers[0];
    };
    const getNextTier = () => {
        if (!stats)
            return commissionTiers[1];
        const currentIndex = commissionTiers.findIndex(tier => tier.tier.toLowerCase() === stats.tier);
        return commissionTiers[currentIndex + 1] || null;
    };
    if (!stats)
        return null;
    const currentTier = getCurrentTier();
    const nextTier = getNextTier();
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Users, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Affiliate Program" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Earn commissions by referring new players to Winnex" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-3xl font-bold text-emerald-400", children: ["$", stats.totalCommissions.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Earned" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "text-3xl font-bold text-blue-400", children: stats.totalReferrals }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Referrals" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-3xl font-bold text-purple-400", children: [stats.conversionRate, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Conversion Rate" })] }) }), _jsx(Card, { className: "casino-card text-center", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-3xl font-bold text-orange-400", children: ["$", stats.monthlyCommissions.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "This Month" })] }) })] }), _jsxs(Card, { className: `casino-card border-${currentTier.color.split('-')[1]}-400/20`, children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: `text-2xl ${currentTier.color}`, children: [currentTier.tier, " Affiliate"] }), _jsxs("p", { className: "text-gray-400", children: [currentTier.commissionRate, "% commission rate"] })] }), _jsxs(Badge, { className: `${currentTier.color} border-current`, children: [stats.activeReferrals, " Active Referrals"] })] }) }), _jsx(CardContent, { children: nextTier && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-gray-400", children: ["Progress to ", nextTier.tier] }), _jsxs("span", { className: "text-white", children: [stats.totalReferrals, "/", nextTier.minReferrals, " referrals"] })] }), _jsx(Progress, { value: (stats.totalReferrals / nextTier.minReferrals) * 100, className: "h-3" }), _jsxs("p", { className: "text-sm text-gray-400", children: [nextTier.minReferrals - stats.totalReferrals, " more referrals to unlock ", nextTier.commissionRate, "% commission"] })] })) })] }), _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "referrals", children: "Referrals" }), _jsx(TabsTrigger, { value: "materials", children: "Materials" }), _jsx(TabsTrigger, { value: "payouts", children: "Payouts" }), _jsx(TabsTrigger, { value: "tracking", children: "Tracking" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-6", children: _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Your Affiliate Link" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "bg-gray-800 p-3 rounded border", children: [_jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Affiliate Code:" }), _jsx("div", { className: "font-mono text-emerald-400", children: affiliateCode })] }), _jsxs("div", { className: "bg-gray-800 p-3 rounded border", children: [_jsx("div", { className: "text-sm text-gray-400 mb-1", children: "Referral Link:" }), _jsxs("div", { className: "font-mono text-white text-sm break-all", children: ["https://winnex.com/register?ref=", affiliateCode] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { onClick: copyAffiliateLink, className: "flex-1 bg-emerald-500 hover:bg-emerald-600", children: [_jsx(Copy, { className: "w-4 h-4 mr-2" }), "Copy Link"] }), _jsxs(Button, { variant: "outline", className: "flex-1", children: [_jsx(Share2, { className: "w-4 h-4 mr-2" }), "Share"] })] })] })] }), _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Commission Tiers" }) }), _jsx(CardContent, { className: "space-y-3", children: commissionTiers.map((tier) => (_jsx("div", { className: `p-3 rounded border ${tier.tier.toLowerCase() === stats.tier
                                                    ? 'border-emerald-400 bg-emerald-500/10'
                                                    : 'border-gray-700'}`, children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("span", { className: `font-semibold ${tier.color}`, children: tier.tier }), _jsxs("span", { className: "text-gray-400 ml-2", children: [tier.minReferrals, "+ referrals"] })] }), _jsxs("span", { className: "font-bold text-white", children: [tier.commissionRate, "%"] })] }) }, tier.tier))) })] })] }) }), _jsx(TabsContent, { value: "referrals", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(CardTitle, { className: "text-white", children: "Your Referrals" }), _jsx("div", { className: "flex space-x-2", children: _jsxs(Select, { defaultValue: "all", children: [_jsx(SelectTrigger, { className: "w-32 bg-gray-800 border-gray-700", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "active", children: "Active" }), _jsx(SelectItem, { value: "inactive", children: "Inactive" })] })] }) })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: referrals.map((referral) => (_jsx(Card, { className: "border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("span", { className: "font-semibold text-white", children: referral.username }), _jsx(Badge, { className: getStatusColor(referral.status), children: referral.status.toUpperCase() })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Joined: " }), _jsx("span", { className: "text-white", children: referral.joinDate })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Deposits: " }), _jsxs("span", { className: "text-white", children: ["$", referral.totalDeposits] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Bets: " }), _jsxs("span", { className: "text-white", children: ["$", referral.totalBets] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Last Active: " }), _jsx("span", { className: "text-white", children: referral.lastActivity })] })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-xl font-bold text-emerald-400", children: ["$", referral.commissionEarned] }), _jsx("div", { className: "text-sm text-gray-400", children: "Commission" })] })] }) }) }, referral.id))) }) })] }) }), _jsx(TabsContent, { value: "materials", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Marketing Materials" }), _jsx("p", { className: "text-gray-400", children: "High-converting promotional materials for your campaigns" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: marketingMaterials.map((material) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx("div", { className: "w-full h-32 bg-gray-800 rounded mb-3 flex items-center justify-center", children: _jsxs("span", { className: "text-gray-400 text-sm", children: [material.type.toUpperCase(), " Preview"] }) }), _jsx("h3", { className: "font-semibold text-white", children: material.title }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: material.description })] }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Format:" }), _jsx("span", { className: "text-white", children: material.format })] }), material.dimensions && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Size:" }), _jsx("span", { className: "text-white", children: material.dimensions })] })), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "CTR:" }), _jsxs("span", { className: "text-emerald-400", children: [material.clickThrough, "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Conversion:" }), _jsxs("span", { className: "text-emerald-400", children: [material.conversionRate, "%"] })] })] }), _jsxs("div", { className: "flex space-x-2 mt-4", children: [_jsx(Button, { size: "sm", className: "flex-1 bg-emerald-500 hover:bg-emerald-600", children: "Download" }), _jsx(Button, { size: "sm", variant: "outline", className: "flex-1", children: "Preview" })] })] }) }, material.id))) }) })] }) }), _jsx(TabsContent, { value: "payouts", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Payout History" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: payoutHistory.map((payout) => (_jsx(Card, { className: "border-gray-700", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "font-semibold text-white", children: ["$", payout.amount] }), _jsx("div", { className: "text-sm text-gray-400", children: payout.date })] }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-white", children: payout.method }), _jsx("div", { className: "text-xs text-gray-400", children: payout.referenceId })] })] }), _jsx(Badge, { className: getStatusColor(payout.status), children: payout.status.toUpperCase() })] }) }) }, payout.id))) }) })] }) }), _jsx(TabsContent, { value: "tracking", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Performance Tracking" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-blue-400", children: [stats.clickThroughRate, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Click-Through Rate" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-green-400", children: [stats.conversionRate, "%"] }), _jsx("div", { className: "text-sm text-gray-400", children: "Conversion Rate" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-purple-400", children: ["$", stats.averagePlayerValue] }), _jsx("div", { className: "text-sm text-gray-400", children: "Avg Player Value" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-400", children: stats.activeReferrals }), _jsx("div", { className: "text-sm text-gray-400", children: "Active Players" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Custom Tracking Links" }), _jsx("div", { className: "grid gap-4", children: _jsxs("div", { className: "flex space-x-2", children: [_jsx(Input, { placeholder: "Campaign name (e.g., social-media, email)", className: "bg-gray-800 border-gray-700" }), _jsx(Button, { className: "bg-emerald-500 hover:bg-emerald-600", children: "Generate Link" })] }) })] })] })] }) })] })] }));
}
