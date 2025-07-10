import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, Crown, Shield, Zap, Star, CheckCircle, Clock, UserPlus } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
const CLIENT_TIERS = [
    {
        id: 'starter',
        name: 'Starter Client',
        description: 'Perfect for new betting enthusiasts',
        icon: Users,
        color: 'blue',
        benefits: [
            'Basic betting access',
            'Standard customer support',
            'Mobile app access',
            'Basic analytics dashboard'
        ],
        requirements: [
            'Valid ID verification',
            'Phone number verification',
            'Email confirmation'
        ],
        monthlyFee: 0,
        depositLimit: 1000,
        withdrawalLimit: 500
    },
    {
        id: 'premium',
        name: 'Premium Client',
        description: 'Enhanced features for regular bettors',
        icon: Star,
        color: 'purple',
        benefits: [
            'Priority customer support',
            'Advanced analytics & insights',
            'Exclusive betting markets',
            'Reduced fees on transactions',
            'Personal account manager'
        ],
        requirements: [
            'All Starter requirements',
            'Minimum $500 monthly volume',
            'Address verification',
            'Source of funds documentation'
        ],
        monthlyFee: 29,
        depositLimit: 5000,
        withdrawalLimit: 2500
    },
    {
        id: 'vip',
        name: 'VIP Client',
        description: 'Premium experience for high-volume bettors',
        icon: Crown,
        color: 'yellow',
        benefits: [
            '24/7 dedicated support line',
            'Custom betting limits',
            'Exclusive VIP events',
            'Advanced risk management tools',
            'Direct line to trading desk',
            'Personalized betting strategies'
        ],
        requirements: [
            'All Premium requirements',
            'Minimum $5,000 monthly volume',
            'Bank statements verification',
            'Professional reference',
            'In-person or video KYC'
        ],
        monthlyFee: 99,
        depositLimit: 25000,
        withdrawalLimit: 10000
    },
    {
        id: 'institutional',
        name: 'Institutional Client',
        description: 'Enterprise-grade access for organizations',
        icon: Shield,
        color: 'green',
        benefits: [
            'White-label solutions available',
            'API access for automated betting',
            'Custom integration support',
            'Bulk user management',
            'Enterprise-grade security',
            'Custom reporting & analytics'
        ],
        requirements: [
            'Corporate registration documents',
            'Minimum $50,000 monthly volume',
            'Compliance officer designation',
            'Enhanced due diligence',
            'Board resolution for betting activities'
        ],
        monthlyFee: 499,
        depositLimit: 100000,
        withdrawalLimit: 50000
    }
];
export default function ClientOnboarding() {
    const [selectedTier, setSelectedTier] = useState('');
    const [formData, setFormData] = useState({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        expectedVolume: '',
        businessType: '',
        agreementSigned: false,
        complianceAcknowledged: false
    });
    const { toast } = useToast();
    const createClientMutation = useMutation({
        mutationFn: async (data) => {
            return apiRequest('POST', '/api/admin/create-client', data);
        },
        onSuccess: () => {
            toast({
                title: "Client Account Created",
                description: "New client account has been successfully created and is pending approval.",
            });
            setFormData({
                companyName: '',
                contactPerson: '',
                email: '',
                phone: '',
                expectedVolume: '',
                businessType: '',
                agreementSigned: false,
                complianceAcknowledged: false
            });
            setSelectedTier('');
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: "Failed to create client account. Please try again.",
                variant: "destructive",
            });
        },
    });
    const handleSubmit = () => {
        const tier = CLIENT_TIERS.find(t => t.id === selectedTier);
        if (!tier || !formData.companyName || !formData.email) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields and select a client tier.",
                variant: "destructive",
            });
            return;
        }
        createClientMutation.mutate({
            ...formData,
            tier: selectedTier,
            tierDetails: tier,
            status: 'pending_approval',
            createdAt: new Date().toISOString()
        });
    };
    return (_jsx("div", { className: "min-h-screen bg-winnex-black text-white p-6", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4", children: "Client Account Creation System" }), _jsx("p", { className: "text-gray-300 text-lg", children: "Create and manage professional betting accounts for regular clients" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8", children: CLIENT_TIERS.map((tier) => {
                        const IconComponent = tier.icon;
                        const isSelected = selectedTier === tier.id;
                        return (_jsxs(Card, { className: `cursor-pointer transition-all duration-300 ${isSelected
                                ? 'ring-2 ring-blue-500 bg-gray-800'
                                : 'bg-gray-900 hover:bg-gray-800'} border-gray-700`, onClick: () => setSelectedTier(tier.id), children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: `mx-auto mb-2 p-3 rounded-full bg-${tier.color}-500/20`, children: _jsx(IconComponent, { className: `w-8 h-8 text-${tier.color}-400` }) }), _jsx(CardTitle, { className: "text-xl", children: tier.name }), _jsx("p", { className: "text-gray-400 text-sm", children: tier.description }), _jsx("div", { className: "text-2xl font-bold text-green-400", children: tier.monthlyFee === 0 ? 'Free' : `$${tier.monthlyFee}/mo` })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-green-400 mb-2", children: "Benefits:" }), _jsxs("ul", { className: "space-y-1", children: [tier.benefits.slice(0, 3).map((benefit, idx) => (_jsxs("li", { className: "flex items-center gap-2 text-sm", children: [_jsx(CheckCircle, { className: "w-3 h-3 text-green-400" }), benefit] }, idx))), tier.benefits.length > 3 && (_jsxs("li", { className: "text-xs text-gray-400", children: ["+", tier.benefits.length - 3, " more benefits"] }))] })] }), _jsxs("div", { className: "pt-2 border-t border-gray-700", children: [_jsxs("div", { className: "flex justify-between text-xs text-gray-400", children: [_jsx("span", { children: "Deposit Limit:" }), _jsxs("span", { children: ["$", tier.depositLimit.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between text-xs text-gray-400", children: [_jsx("span", { children: "Withdrawal Limit:" }), _jsxs("span", { children: ["$", tier.withdrawalLimit.toLocaleString()] })] })] })] }) })] }, tier.id));
                    }) }), selectedTier && (_jsxs(Card, { className: "bg-gray-900 border-gray-700", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-6 h-6 text-blue-400" }), "Client Information Form"] }), _jsx("p", { className: "text-gray-400", children: "Complete the information below to create a new client account" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Company/Organization Name *" }), _jsx(Input, { value: formData.companyName, onChange: (e) => setFormData(prev => ({ ...prev, companyName: e.target.value })), placeholder: "Enter company name", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Primary Contact Person *" }), _jsx(Input, { value: formData.contactPerson, onChange: (e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value })), placeholder: "Contact person name", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email Address *" }), _jsx(Input, { type: "email", value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), placeholder: "business@company.com", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Phone Number" }), _jsx(Input, { value: formData.phone, onChange: (e) => setFormData(prev => ({ ...prev, phone: e.target.value })), placeholder: "+1 (555) 123-4567", className: "bg-gray-800 border-gray-600" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Expected Monthly Volume" }), _jsxs(Select, { value: formData.expectedVolume, onValueChange: (value) => setFormData(prev => ({ ...prev, expectedVolume: value })), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600", children: _jsx(SelectValue, { placeholder: "Select volume range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "under_1k", children: "Under $1,000" }), _jsx(SelectItem, { value: "1k_5k", children: "$1,000 - $5,000" }), _jsx(SelectItem, { value: "5k_25k", children: "$5,000 - $25,000" }), _jsx(SelectItem, { value: "25k_100k", children: "$25,000 - $100,000" }), _jsx(SelectItem, { value: "over_100k", children: "Over $100,000" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Business Type" }), _jsxs(Select, { value: formData.businessType, onValueChange: (value) => setFormData(prev => ({ ...prev, businessType: value })), children: [_jsx(SelectTrigger, { className: "bg-gray-800 border-gray-600", children: _jsx(SelectValue, { placeholder: "Select business type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "individual", children: "Individual Professional" }), _jsx(SelectItem, { value: "small_business", children: "Small Business" }), _jsx(SelectItem, { value: "corporation", children: "Corporation" }), _jsx(SelectItem, { value: "partnership", children: "Partnership" }), _jsx(SelectItem, { value: "fund", children: "Investment Fund" }), _jsx(SelectItem, { value: "other", children: "Other" })] })] })] })] }), _jsxs("div", { className: "space-y-4 pt-6 border-t border-gray-700", children: [_jsx("h3", { className: "text-lg font-semibold text-yellow-400", children: "Compliance & Agreements" }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "agreement", checked: formData.agreementSigned, onCheckedChange: (checked) => setFormData(prev => ({ ...prev, agreementSigned: checked })), className: "border-gray-600" }), _jsx("label", { htmlFor: "agreement", className: "text-sm text-gray-300 leading-relaxed", children: "Client Agreement Signed: I confirm that the client has reviewed and signed the Winnex Professional Betting Agreement, including terms of service, fee structure, and risk disclaimers." })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Checkbox, { id: "compliance", checked: formData.complianceAcknowledged, onCheckedChange: (checked) => setFormData(prev => ({ ...prev, complianceAcknowledged: checked })) }), _jsx("label", { htmlFor: "compliance", className: "text-sm text-gray-300 leading-relaxed", children: "Compliance Acknowledgment: I confirm that proper KYC/AML documentation has been collected and verified according to regulatory requirements, and the client understands their reporting obligations." })] })] }), _jsxs("div", { className: "flex gap-4 pt-6", children: [_jsx(Button, { onClick: handleSubmit, disabled: createClientMutation.isPending || !formData.agreementSigned || !formData.complianceAcknowledged, className: "flex-1 bg-blue-600 hover:bg-blue-700", children: createClientMutation.isPending ? (_jsxs(_Fragment, { children: [_jsx(Clock, { className: "w-4 h-4 mr-2 animate-spin" }), "Creating Account..."] })) : (_jsxs(_Fragment, { children: [_jsx(UserPlus, { className: "w-4 h-4 mr-2" }), "Create Client Account"] })) }), _jsx(Button, { variant: "outline", onClick: () => {
                                                setSelectedTier('');
                                                setFormData({
                                                    companyName: '',
                                                    contactPerson: '',
                                                    email: '',
                                                    phone: '',
                                                    expectedVolume: '',
                                                    businessType: '',
                                                    agreementSigned: false,
                                                    complianceAcknowledged: false
                                                });
                                            }, className: "border-gray-600", children: "Reset Form" })] })] })] })), _jsxs(Card, { className: "mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-yellow-400" }), "Professional Client Onboarding Recommendations"] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-green-400 mb-3", children: "For Regular Clients I Recommend:" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Premium Tier" }), " for clients betting $500+ monthly"] }), _jsx("li", { children: "\u2022 Dedicated account managers for relationship building" }), _jsx("li", { children: "\u2022 Automated monthly reporting and analytics" }), _jsx("li", { children: "\u2022 Custom betting limits based on client profile" }), _jsx("li", { children: "\u2022 Priority support with faster response times" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-purple-400 mb-3", children: "Implementation Strategy:" }), _jsxs("ul", { className: "space-y-2 text-sm text-gray-300", children: [_jsx("li", { children: "\u2022 Streamlined KYC process with document upload" }), _jsx("li", { children: "\u2022 Automated tier qualification based on volume" }), _jsx("li", { children: "\u2022 Regular client check-ins and satisfaction surveys" }), _jsx("li", { children: "\u2022 Graduated fee structure with volume discounts" }), _jsx("li", { children: "\u2022 Integration with CRM for comprehensive tracking" })] })] })] }) })] })] }) }));
}
