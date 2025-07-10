import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Gift, Clock, Star, Check } from "lucide-react";
export default function PromotionsCard({ promotion, onClaim }) {
    const [showTerms, setShowTerms] = useState(false);
    const getPromotionIcon = (type) => {
        switch (type) {
            case 'welcome_bonus':
                return _jsx(Star, { className: "text-winnex-orange", size: 24 });
            case 'free_bet':
                return _jsx(Gift, { className: "text-winnex-green", size: 24 });
            case 'odds_boost':
                return _jsx("svg", { className: "w-6 h-6 text-winnex-blue", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" }) });
            case 'cashback':
                return _jsx("svg", { className: "w-6 h-6 text-winnex-purple", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" }) });
            default:
                return _jsx(Gift, { className: "text-winnex-green", size: 24 });
        }
    };
    const getPromotionTypeColor = (type) => {
        switch (type) {
            case 'welcome_bonus':
                return 'gradient-accent';
            case 'free_bet':
                return 'bg-winnex-green';
            case 'odds_boost':
                return 'bg-winnex-blue';
            case 'cashback':
                return 'gradient-casino';
            default:
                return 'bg-winnex-green';
        }
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    const isExpired = new Date(promotion.validTo) < new Date();
    const isActive = new Date(promotion.validFrom) <= new Date() && !isExpired;
    return (_jsxs("div", { className: `card-modern p-6 relative overflow-hidden ${getPromotionTypeColor(promotion.type)}`, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full hover:translate-x-[-200%] transition-transform duration-1000" }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getPromotionIcon(promotion.type), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-lg text-white", children: promotion.title }), _jsxs("div", { className: "flex items-center space-x-2 mt-1", children: [_jsx("span", { className: "text-2xl font-black text-white", children: promotion.value }), promotion.type === 'odds_boost' && (_jsx("span", { className: "glass rounded-full px-2 py-1 text-xs font-bold", children: "BOOST" }))] })] })] }), promotion.claimed && (_jsx("div", { className: "glass rounded-full p-2", children: _jsx(Check, { className: "text-winnex-green", size: 16 }) }))] }), _jsx("p", { className: "text-white/90 mb-4 leading-relaxed", children: promotion.description }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-2 text-sm", children: [_jsx(Clock, { size: 14, className: "text-white/60" }), _jsxs("span", { className: "text-white/80", children: ["Valid until ", formatDate(promotion.validTo)] })] }), _jsx("div", { className: `px-3 py-1 rounded-full text-xs font-bold ${isExpired ? 'bg-red-500/20 text-red-300' :
                                    isActive ? 'bg-green-500/20 text-green-300' :
                                        'bg-yellow-500/20 text-yellow-300'}`, children: isExpired ? 'Expired' : isActive ? 'Active' : 'Upcoming' })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("button", { onClick: () => setShowTerms(!showTerms), className: "text-sm text-white/70 hover:text-white underline", children: [showTerms ? 'Hide' : 'View', " Terms & Conditions"] }), showTerms && (_jsx("div", { className: "glass rounded-lg p-3 text-sm text-white/80", children: promotion.terms })), !promotion.claimed && isActive && onClaim && (_jsx("button", { onClick: () => onClaim(promotion.id), className: "btn-secondary w-full", children: "Claim Promotion" })), promotion.claimed && !promotion.used && (_jsx("div", { className: "text-center text-sm text-winnex-green font-medium", children: "Promotion claimed - ready to use!" })), promotion.used && (_jsx("div", { className: "text-center text-sm text-white/60", children: "Promotion used" }))] })] })] }));
}
