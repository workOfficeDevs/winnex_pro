import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Crown, Star, Gift, Users, Calendar, Trophy, Zap, Clock, MessageCircle } from "lucide-react";
export default function EnhancedVIPProgram() {
    const [vipTiers, setVipTiers] = useState([]);
    const [userStats, setUserStats] = useState(null);
    const [vipEvents, setVipEvents] = useState([]);
    const [personalManager, setPersonalManager] = useState(null);
    const [selectedTab, setSelectedTab] = useState('overview');
    useEffect(() => {
        const mockVipTiers = [
            {
                id: 'bronze',
                name: 'Bronze',
                level: 1,
                icon: _jsx(Trophy, { className: "w-6 h-6" }),
                color: 'text-orange-400',
                requiredPoints: 0,
                benefits: ['5% cashback on losses', 'Monthly bonus', 'Email support'],
                perks: [
                    { id: 'bronze_cashback', name: '5% Loss Cashback', description: 'Get 5% back on your losses', type: 'cashback', value: 5, available: true },
                    { id: 'bronze_bonus', name: 'Monthly Bonus', description: '$50 monthly bonus', type: 'bonus', value: 50, available: true }
                ],
                exclusiveFeatures: ['Standard betting limits', 'Regular promotions']
            },
            {
                id: 'silver',
                name: 'Silver',
                level: 2,
                icon: _jsx(Star, { className: "w-6 h-6" }),
                color: 'text-gray-400',
                requiredPoints: 1000,
                benefits: ['8% cashback on losses', 'Bi-weekly bonuses', 'Priority support', 'Exclusive tournaments'],
                perks: [
                    { id: 'silver_cashback', name: '8% Loss Cashback', description: 'Get 8% back on your losses', type: 'cashback', value: 8, available: true },
                    { id: 'silver_bonus', name: 'Bi-weekly Bonus', description: '$100 bi-weekly bonus', type: 'bonus', value: 100, available: true },
                    { id: 'silver_support', name: 'Priority Support', description: 'Skip the queue', type: 'priority', value: 'enabled', available: true }
                ],
                exclusiveFeatures: ['Higher betting limits', 'Exclusive tournaments', 'Early odds access']
            },
            {
                id: 'gold',
                name: 'Gold',
                level: 3,
                icon: _jsx(Crown, { className: "w-6 h-6" }),
                color: 'text-yellow-400',
                requiredPoints: 5000,
                benefits: ['12% cashback on losses', 'Weekly bonuses', 'Personal account manager', 'VIP events'],
                perks: [
                    { id: 'gold_cashback', name: '12% Loss Cashback', description: 'Get 12% back on your losses', type: 'cashback', value: 12, available: true },
                    { id: 'gold_bonus', name: 'Weekly Bonus', description: '$250 weekly bonus', type: 'bonus', value: 250, available: true },
                    { id: 'gold_manager', name: 'Personal Manager', description: 'Dedicated account manager', type: 'personal', value: 'assigned', available: true }
                ],
                exclusiveFeatures: ['Premium betting limits', 'VIP events access', 'Custom promotions', 'Faster withdrawals']
            },
            {
                id: 'platinum',
                name: 'Platinum',
                level: 4,
                icon: _jsx(Crown, { className: "w-6 h-6" }),
                color: 'text-purple-400',
                requiredPoints: 15000,
                benefits: ['15% cashback on losses', 'Daily bonuses', 'Concierge service', 'Luxury experiences'],
                perks: [
                    { id: 'platinum_cashback', name: '15% Loss Cashback', description: 'Get 15% back on your losses', type: 'cashback', value: 15, available: true },
                    { id: 'platinum_bonus', name: 'Daily Bonus', description: '$100 daily bonus', type: 'bonus', value: 100, available: true },
                    { id: 'platinum_concierge', name: 'Concierge Service', description: '24/7 personal concierge', type: 'personal', value: '24/7', available: true }
                ],
                exclusiveFeatures: ['Unlimited betting limits', 'Luxury travel packages', 'Private events', 'Instant withdrawals']
            }
        ];
        const mockUserStats = {
            currentTier: mockVipTiers[2], // Gold tier
            totalPoints: 7350,
            pointsToNext: 7650,
            lifetimeSpent: 25840,
            cashbackEarned: 3100,
            exclusiveEventsAttended: 4,
            personalManagerSessions: 12
        };
        const mockVipEvents = [
            {
                id: 'event_1',
                title: 'Champions League Final VIP Experience',
                description: 'Watch the Champions League Final with premium hospitality, meet & greet with legends',
                date: '2024-06-01',
                location: 'Wembley Stadium, London',
                type: 'sports',
                minTier: 3,
                participants: 45,
                maxParticipants: 50,
                status: 'upcoming'
            },
            {
                id: 'event_2',
                title: 'Monte Carlo Casino Weekend',
                description: 'Exclusive weekend at Monte Carlo Casino with luxury accommodation',
                date: '2024-05-15',
                location: 'Monte Carlo, Monaco',
                type: 'casino',
                minTier: 4,
                participants: 20,
                maxParticipants: 25,
                status: 'upcoming'
            },
            {
                id: 'event_3',
                title: 'Private Poker Tournament',
                description: 'High-stakes private poker tournament with professional dealers',
                date: '2024-02-20',
                location: 'Private Club, Las Vegas',
                type: 'casino',
                minTier: 3,
                participants: 30,
                maxParticipants: 32,
                status: 'upcoming'
            }
        ];
        const mockPersonalManager = {
            id: 'manager_1',
            name: 'Sarah Mitchell',
            title: 'Senior VIP Account Manager',
            avatar: '/api/placeholder/60/60',
            specialties: ['High-roller betting', 'Investment strategies', 'Exclusive events'],
            availability: 'online',
            responseTime: '< 5 minutes'
        };
        setVipTiers(mockVipTiers);
        setUserStats(mockUserStats);
        setVipEvents(mockVipEvents);
        setPersonalManager(mockPersonalManager);
    }, []);
    const getEventTypeIcon = (type) => {
        switch (type) {
            case 'sports': return _jsx(Trophy, { className: "w-5 h-5" });
            case 'casino': return _jsx(Crown, { className: "w-5 h-5" });
            case 'travel': return _jsx(Calendar, { className: "w-5 h-5" });
            case 'dining': return _jsx(Gift, { className: "w-5 h-5" });
            default: return _jsx(Star, { className: "w-5 h-5" });
        }
    };
    if (!userStats)
        return null;
    const progressToNext = ((userStats.totalPoints - userStats.currentTier.requiredPoints) / (userStats.pointsToNext - userStats.currentTier.requiredPoints)) * 100;
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Crown, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "VIP Elite Program" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Exclusive benefits and luxury experiences for our valued members" })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "overview", className: "flex items-center", children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "Overview"] }), _jsxs(TabsTrigger, { value: "benefits", className: "flex items-center", children: [_jsx(Gift, { className: "w-4 h-4 mr-2" }), "Benefits"] }), _jsxs(TabsTrigger, { value: "events", className: "flex items-center", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), "Events"] }), _jsxs(TabsTrigger, { value: "manager", className: "flex items-center", children: [_jsx(Users, { className: "w-4 h-4 mr-2" }), "Manager"] })] }), _jsxs(TabsContent, { value: "overview", className: "space-y-6", children: [_jsxs(Card, { className: "casino-card border-yellow-400/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: userStats.currentTier.color, children: userStats.currentTier.icon }), _jsxs("div", { children: [_jsxs(CardTitle, { className: `text-2xl ${userStats.currentTier.color}`, children: [userStats.currentTier.name, " Member"] }), _jsxs("p", { className: "text-gray-400", children: ["Level ", userStats.currentTier.level, " VIP Status"] })] })] }), _jsxs(Badge, { className: "bg-yellow-500/20 text-yellow-400 text-lg px-4 py-2", children: [userStats.totalPoints.toLocaleString(), " Points"] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-gray-400", children: "Progress to Platinum" }), _jsxs("span", { className: "text-white", children: [userStats.pointsToNext - userStats.totalPoints, " points needed"] })] }), _jsx(Progress, { value: progressToNext, className: "h-3" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-emerald-400", children: ["$", userStats.lifetimeSpent.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Lifetime Spent" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-blue-400", children: ["$", userStats.cashbackEarned.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Cashback Earned" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-400", children: userStats.exclusiveEventsAttended }), _jsx("div", { className: "text-sm text-gray-400", children: "Events Attended" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-400", children: userStats.personalManagerSessions }), _jsx("div", { className: "text-sm text-gray-400", children: "Manager Sessions" })] })] })] })] }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: vipTiers.map((tier) => (_jsxs(Card, { className: `${tier.id === userStats.currentTier.id ? 'border-yellow-400 bg-yellow-500/10' : 'casino-card'}`, children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: `mx-auto mb-2 ${tier.color}`, children: tier.icon }), _jsx(CardTitle, { className: tier.color, children: tier.name }), _jsxs("p", { className: "text-sm text-gray-400", children: [tier.requiredPoints.toLocaleString(), " points"] })] }), _jsxs(CardContent, { children: [_jsx("ul", { className: "space-y-1 text-sm", children: tier.benefits.slice(0, 3).map((benefit, index) => (_jsxs("li", { className: "text-gray-300 flex items-start", children: [_jsx(Zap, { className: "w-3 h-3 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" }), benefit] }, index))) }), tier.level > userStats.currentTier.level && (_jsx(Badge, { variant: "outline", className: "mt-3 w-full justify-center", children: "Locked" })), tier.id === userStats.currentTier.id && (_jsx(Badge, { className: "mt-3 w-full justify-center bg-yellow-500/20 text-yellow-400", children: "Current Tier" }))] })] }, tier.id))) })] }), _jsxs(TabsContent, { value: "benefits", className: "space-y-6", children: [_jsx("div", { className: "grid gap-6", children: userStats.currentTier.perks.map((perk) => (_jsx(Card, { className: "casino-card", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-white mb-2", children: perk.name }), _jsx("p", { className: "text-gray-400 mb-4", children: perk.description }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Badge, { variant: perk.available ? 'default' : 'secondary', children: perk.available ? 'Available' : 'Used' }), _jsx("span", { className: "text-emerald-400 font-semibold", children: typeof perk.value === 'number' ? `${perk.value}%` : perk.value })] })] }), _jsx(Button, { className: perk.available ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-600', disabled: !perk.available, children: perk.available ? 'Claim' : 'Claimed' })] }) }) }, perk.id))) }), _jsxs(Card, { className: "casino-card border-purple-400/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Exclusive Features" }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-3", children: userStats.currentTier.exclusiveFeatures.map((feature, index) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Crown, { className: "w-5 h-5 text-purple-400" }), _jsx("span", { className: "text-gray-300", children: feature })] }, index))) }) })] })] }), _jsx(TabsContent, { value: "events", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: vipEvents.filter(event => event.minTier <= userStats.currentTier.level).map((event) => (_jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "text-emerald-400", children: getEventTypeIcon(event.type) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: event.title }), _jsx("p", { className: "text-gray-400", children: event.location })] })] }), _jsx(Badge, { variant: "outline", className: "capitalize", children: event.status })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-gray-300", children: event.description }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Date: " }), _jsx("span", { className: "text-white", children: new Date(event.date).toLocaleDateString() })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Min Tier: " }), _jsx("span", { className: "text-yellow-400", children: vipTiers.find(t => t.level === event.minTier)?.name })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Participants: " }), _jsxs("span", { className: "text-white", children: [event.participants, "/", event.maxParticipants] })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Type: " }), _jsx("span", { className: "text-emerald-400 capitalize", children: event.type })] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx(Progress, { value: (event.participants / event.maxParticipants) * 100, className: "flex-1 mr-4 h-2" }), _jsx(Button, { className: "bg-emerald-500 hover:bg-emerald-600", disabled: event.participants >= event.maxParticipants, children: event.participants >= event.maxParticipants ? 'Full' : 'Register' })] })] })] }, event.id))) }) }), _jsx(TabsContent, { value: "manager", className: "space-y-6", children: personalManager && (_jsxs(Card, { className: "casino-card border-emerald-400/20", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Your Personal Account Manager" }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("img", { src: personalManager.avatar, alt: personalManager.name, className: "w-16 h-16 rounded-full" }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-bold text-white", children: personalManager.name }), _jsx("p", { className: "text-gray-400", children: personalManager.title }), _jsxs("div", { className: "flex items-center space-x-2 mt-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${personalManager.availability === 'online' ? 'bg-green-400' :
                                                                        personalManager.availability === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'}` }), _jsxs("span", { className: "text-sm text-gray-400 capitalize", children: [personalManager.availability, " \u2022 Response: ", personalManager.responseTime] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white mb-3", children: "Specialties" }), _jsx("div", { className: "flex flex-wrap gap-2", children: personalManager.specialties.map((specialty, index) => (_jsx(Badge, { variant: "outline", children: specialty }, index))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(Button, { className: "bg-emerald-500 hover:bg-emerald-600", children: [_jsx(MessageCircle, { className: "w-4 h-4 mr-2" }), "Start Chat"] }), _jsxs(Button, { variant: "outline", children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), "Schedule Call"] })] }), _jsx(Card, { className: "border-gray-700 bg-gray-800/50", children: _jsxs(CardContent, { className: "p-4", children: [_jsx("h4", { className: "font-semibold text-white mb-2", children: "Quick Services" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "w-4 h-4 text-emerald-400" }), _jsx("span", { className: "text-gray-300", children: "Instant withdrawals" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Zap, { className: "w-4 h-4 text-blue-400" }), _jsx("span", { className: "text-gray-300", children: "Custom betting limits" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Gift, { className: "w-4 h-4 text-purple-400" }), _jsx("span", { className: "text-gray-300", children: "Personalized bonuses" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Crown, { className: "w-4 h-4 text-yellow-400" }), _jsx("span", { className: "text-gray-300", children: "Exclusive events" })] })] })] }) })] })] })) })] })] }));
}
