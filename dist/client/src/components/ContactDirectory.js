import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MessageCircle, Users, CreditCard, TrendingUp, Settings, HelpCircle, Building } from 'lucide-react';
export default function ContactDirectory() {
    const contacts = [
        {
            department: 'Account Management',
            email: 'accounts@winnexpro.io',
            description: 'All account-related queries, transactions, deposits, and withdrawals',
            icon: _jsx(CreditCard, { className: "h-5 w-5" }),
            color: 'bg-green-100 text-green-800 border-green-300',
            purposes: ['Deposits & Withdrawals', 'Balance Inquiries', 'Transaction History', 'Account Verification']
        },
        {
            department: 'Technical Support',
            email: 'support@winnexpro.io',
            description: '24/7 technical assistance, platform issues, and general support',
            icon: _jsx(Settings, { className: "h-5 w-5" }),
            color: 'bg-blue-100 text-blue-800 border-blue-300',
            purposes: ['Platform Issues', 'Login Problems', 'Security Concerns', '2FA Assistance']
        },
        {
            department: 'Trading & Betting',
            email: 'traders@winnexpro.io',
            description: 'Betting assistance, odds queries, market information, and trading support',
            icon: _jsx(TrendingUp, { className: "h-5 w-5" }),
            color: 'bg-purple-100 text-purple-800 border-purple-300',
            purposes: ['Betting Questions', 'Odds Inquiries', 'Market Information', 'Cash Out Issues']
        },
        {
            department: 'Sales & Partnerships',
            email: 'sales@winnexpro.io',
            description: 'VIP programs, partnerships, affiliate programs, and premium services',
            icon: _jsx(Users, { className: "h-5 w-5" }),
            color: 'bg-gold-100 text-gold-800 border-gold-300',
            purposes: ['VIP Services', 'Partnership Inquiries', 'Affiliate Program', 'Premium Features']
        },
        {
            department: 'General Information',
            email: 'info@winnexpro.io',
            description: 'General platform information, features, and basic inquiries',
            icon: _jsx(HelpCircle, { className: "h-5 w-5" }),
            color: 'bg-gray-100 text-gray-800 border-gray-300',
            purposes: ['Platform Info', 'Feature Questions', 'General Inquiries', 'Getting Started']
        },
        {
            department: 'Business Inquiries',
            email: 'enquiries@winnexpro.io',
            description: 'Corporate partnerships, business development, and enterprise solutions',
            icon: _jsx(Building, { className: "h-5 w-5" }),
            color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
            purposes: ['Corporate Accounts', 'Business Development', 'Enterprise Solutions', 'White Label']
        },
        {
            department: 'Development Team',
            email: 'developers@winnexpro.io',
            description: 'API documentation, technical integration, and developer resources',
            icon: _jsx(MessageCircle, { className: "h-5 w-5" }),
            color: 'bg-red-100 text-red-800 border-red-300',
            purposes: ['API Support', 'Technical Integration', 'Developer Resources', 'Custom Solutions']
        }
    ];
    const handleEmailClick = (email, subject) => {
        const mailtoLink = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
        window.open(mailtoLink, '_blank');
    };
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-2", children: "Contact Winnex Pro" }), _jsx("p", { className: "text-gray-600", children: "Get in touch with our specialized teams for expert assistance" })] }), _jsx(Card, { className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [_jsxs(Button, { variant: "outline", className: "bg-white/20 border-white/30 text-white hover:bg-white/30", onClick: () => handleEmailClick('support@winnexpro.io', 'Urgent Support Request'), children: [_jsx(Phone, { className: "h-4 w-4 mr-2" }), "24/7 Support"] }), _jsxs(Button, { variant: "outline", className: "bg-white/20 border-white/30 text-white hover:bg-white/30", onClick: () => handleEmailClick('accounts@winnexpro.io', 'Account Inquiry'), children: [_jsx(CreditCard, { className: "h-4 w-4 mr-2" }), "Account Help"] }), _jsxs(Button, { variant: "outline", className: "bg-white/20 border-white/30 text-white hover:bg-white/30", onClick: () => handleEmailClick('traders@winnexpro.io', 'Betting Question'), children: [_jsx(TrendingUp, { className: "h-4 w-4 mr-2" }), "Betting Support"] })] }) }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: contacts.map((contact) => (_jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `p-2 rounded-lg ${contact.color}`, children: contact.icon }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: contact.department }), _jsx(CardDescription, { className: "text-sm", children: contact.description })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Mail, { className: "h-4 w-4 text-gray-500" }), _jsx("a", { href: `mailto:${contact.email}`, className: "text-blue-600 hover:text-blue-800 font-medium", children: contact.email })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-medium text-sm text-gray-700", children: "What we help with:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: contact.purposes.map((purpose, index) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: purpose }, index))) })] }), _jsxs(Button, { className: "w-full", onClick: () => handleEmailClick(contact.email, `${contact.department} Inquiry`), children: [_jsx(Mail, { className: "h-4 w-4 mr-2" }), "Send Email"] })] })] }, contact.email))) }), _jsx(Card, { className: "bg-red-50 border-red-200", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "p-2 bg-red-100 rounded-lg", children: _jsx(Phone, { className: "h-5 w-5 text-red-600" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-red-800", children: "Emergency Security Issues" }), _jsx("p", { className: "text-red-600", children: "For immediate security concerns or account compromise:" }), _jsx("a", { href: "mailto:support@winnexpro.io?subject=URGENT%20SECURITY%20ALERT", className: "text-red-700 font-bold hover:underline", children: "support@winnexpro.io - Mark as URGENT" })] })] }) }) }), _jsx(Card, { children: _jsxs(CardContent, { className: "p-6", children: [_jsx("h3", { className: "font-bold text-gray-900 mb-4", children: "Response Times" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-700", children: "Priority Support" }), _jsx("p", { className: "text-gray-600", children: "support@winnexpro.io - Within 1 hour" }), _jsx("p", { className: "text-gray-600", children: "accounts@winnexpro.io - Within 2 hours" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-700", children: "Standard Response" }), _jsx("p", { className: "text-gray-600", children: "All other departments - Within 24 hours" }), _jsx("p", { className: "text-gray-600", children: "Business hours: 24/7 for critical issues" })] })] })] }) })] }) }));
}
