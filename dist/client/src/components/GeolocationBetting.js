import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Globe, Clock, AlertTriangle, CheckCircle, Shield } from "lucide-react";
export default function GeolocationBetting() {
    const [locationPermission, setLocationPermission] = useState('prompt');
    const [userLocation, setUserLocation] = useState(null);
    const { data: locationData } = useQuery({
        queryKey: ["/api/location/data"],
        enabled: locationPermission === 'granted',
    });
    const { data: localContent } = useQuery({
        queryKey: ["/api/location/content", userLocation?.country, userLocation?.state],
        enabled: !!userLocation,
    });
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                setLocationPermission(result.state);
            });
        }
    }, []);
    const requestLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                // In a real implementation, you'd send these coordinates to your backend
                // to determine location data and legal compliance
                setLocationPermission('granted');
            }, (error) => {
                console.error("Geolocation error:", error);
                setLocationPermission('denied');
            });
        }
    };
    const formatLocalTime = (utcTime, timezone) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'short',
        }).format(new Date(utcTime));
    };
    if (locationPermission === 'prompt') {
        return (_jsxs("div", { className: "card-modern p-8 text-center", children: [_jsx(MapPin, { className: "mx-auto mb-4 text-winnex-blue", size: 48 }), _jsx("h3", { className: "text-2xl font-bold mb-4", children: "Enhance Your Betting Experience" }), _jsx("p", { className: "text-white/80 mb-6 max-w-md mx-auto", children: "Allow location access to get personalized content, local team updates, and matches in your timezone with region-specific offers." }), _jsx("button", { onClick: requestLocation, className: "btn-primary", children: "Enable Location Services" }), _jsxs("div", { className: "mt-4 text-sm text-white/60", children: [_jsx(Shield, { className: "inline mr-1", size: 14 }), "Your location data is secure and only used to enhance your experience"] })] }));
    }
    if (locationPermission === 'denied' || !locationData) {
        return (_jsxs("div", { className: "card-modern p-8 text-center", children: [_jsx(Globe, { className: "mx-auto mb-4 text-winnex-orange", size: 48 }), _jsx("h3", { className: "text-xl font-bold mb-4", children: "Location Access Disabled" }), _jsx("p", { className: "text-white/80 mb-6", children: "You can still enjoy Winnex, but some personalized features may be limited." }), _jsx("button", { onClick: requestLocation, className: "btn-secondary", children: "Try Again" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "card-modern p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(MapPin, { className: "text-winnex-green", size: 24 }), _jsxs("div", { children: [_jsxs("h3", { className: "font-bold text-lg", children: [locationData.city, ", ", locationData.state] }), _jsx("p", { className: "text-white/60", children: locationData.country })] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: `flex items-center space-x-2 ${locationData.isAllowed ? 'text-winnex-green' : 'text-red-400'}`, children: [locationData.isAllowed ? _jsx(CheckCircle, { size: 16 }) : _jsx(AlertTriangle, { size: 16 }), _jsx("span", { className: "font-medium", children: locationData.isAllowed ? 'Betting Allowed' : 'Restricted Region' })] }), _jsxs("div", { className: "text-sm text-white/60", children: ["Licensed Operator: ", locationData.licensedOperator ? 'Yes' : 'No'] })] })] }), locationData.restrictions.length > 0 && (_jsxs("div", { className: "mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg", children: [_jsx("h4", { className: "font-semibold text-red-400 mb-2", children: "Regional Restrictions" }), _jsx("ul", { className: "text-sm text-red-300 space-y-1", children: locationData.restrictions.map((restriction, index) => (_jsxs("li", { children: ["\u2022 ", restriction] }, index))) })] }))] }), localContent?.timeZoneAdjustedMatches && (_jsxs("div", { className: "card-modern p-6", children: [_jsxs("h3", { className: "text-xl font-bold mb-4 flex items-center", children: [_jsx(Clock, { className: "mr-2 text-winnex-blue" }), "Matches in Your Timezone"] }), _jsx("div", { className: "space-y-3", children: localContent.timeZoneAdjustedMatches.map((match, index) => (_jsxs("div", { className: "glass rounded-lg p-4 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: match.match }), _jsx("div", { className: "text-sm text-winnex-blue", children: match.league })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "font-bold text-winnex-green", children: match.localTime }), _jsx("div", { className: "text-xs text-white/60", children: "Local time" })] })] }, index))) })] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "card-modern p-6", children: [_jsxs("h3", { className: "text-xl font-bold mb-4", children: ["Popular Sports in ", locationData.state] }), _jsx("div", { className: "space-y-3", children: localContent?.popularSports?.map((sport, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: sport.sport }), _jsxs("div", { className: "text-sm text-white/60", children: [sport.matches, " live matches"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "w-16 h-2 bg-white/10 rounded-full", children: _jsx("div", { className: "h-2 bg-winnex-green rounded-full", style: { width: `${sport.popularity}%` } }) }), _jsxs("div", { className: "text-xs text-winnex-green mt-1", children: [sport.popularity, "%"] })] })] }, index))) })] }), _jsxs("div", { className: "card-modern p-6", children: [_jsx("h3", { className: "text-xl font-bold mb-4", children: "Local Teams" }), _jsx("div", { className: "space-y-3", children: localContent?.localTeams?.map((team, index) => (_jsxs("div", { className: "glass rounded-lg p-3", children: [_jsx("div", { className: "font-medium", children: team.name }), _jsx("div", { className: "text-sm text-winnex-blue", children: team.league }), team.nextMatch && (_jsxs("div", { className: "text-xs text-white/60 mt-1", children: ["Next: ", team.nextMatch] }))] }, index))) })] })] }), localContent?.regionalPromotions && localContent.regionalPromotions.length > 0 && (_jsxs("div", { className: "card-modern p-6", children: [_jsxs("h3", { className: "text-xl font-bold mb-4", children: ["Exclusive Offers for ", locationData.state] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: localContent.regionalPromotions.map((promo, index) => (_jsxs("div", { className: "glass rounded-lg p-4", children: [_jsx("h4", { className: "font-bold mb-2", children: promo.title }), _jsx("p", { className: "text-sm text-white/80 mb-3", children: promo.description }), _jsxs("div", { className: "text-xs text-white/60", children: ["Valid in: ", promo.validRegions.join(', ')] }), _jsx("button", { className: "btn-primary w-full mt-3 text-sm", children: "Claim Offer" })] }, index))) })] })), _jsxs("div", { className: "card-modern p-6 bg-winnex-blue/5 border border-winnex-blue/20", children: [_jsx("h3", { className: "text-lg font-bold mb-4 text-winnex-blue", children: "Legal Information" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Legal Gambling Age" }), _jsxs("div", { className: "text-winnex-blue", children: [locationData.legalAge, "+ years"] })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Local Currency" }), _jsx("div", { className: "text-winnex-blue", children: locationData.localCurrency })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "Available Markets" }), _jsxs("div", { className: "text-winnex-blue", children: [locationData.availableMarkets.length, " markets"] })] })] }), _jsx("div", { className: "mt-4 text-xs text-white/60", children: "Winnex operates under strict regulatory compliance. Gambling should be fun and responsible. If you need help, visit our responsible gaming page." })] })] }));
}
