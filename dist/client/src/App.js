import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { wsManager } from "@/lib/websocket";
import Home from "@/pages/Home";
import Sports from "@/pages/Sports";
import LiveBetting from "@/pages/LiveBetting";
import Casino from "@/pages/Casino";
import Esports from "@/pages/Esports";
import Promotions from "@/pages/Promotions";
import Deposit from "@/pages/Deposit";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import LogoShowcase from "@/pages/LogoShowcase";
import Analytics from "@/pages/Analytics";
import VIP from "@/pages/VIP";
import Security from "@/pages/Security";
import Payments from "@/pages/Payments";
import Social from "@/pages/Social";
import LiveStreaming from "@/pages/LiveStreaming";
import AIAssistant from "@/pages/AIAssistant";
import SocialBetting from "@/pages/SocialBetting";
import ResponsibleGambling from "@/pages/ResponsibleGambling";
import FantasySports from "@/pages/FantasySports";
import AffiliateProgram from "@/pages/AffiliateProgram";
import ComplianceCenter from "@/pages/ComplianceCenter";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";
import TestRouting from "@/test-routing";
import SystemDiagnostics from "@/components/SystemDiagnostics";
import RealTimeErrorTracker from "@/components/RealTimeErrorTracker";
import SystemHealthDashboard from "@/components/SystemHealthDashboard";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";
import EnhancementsDemo from "@/pages/EnhancementsDemo";
import InteractiveFeatures from "@/pages/InteractiveFeatures";
import InteractiveDemo from "@/pages/InteractiveDemo";
import EnhancedInteractiveDemo from "@/pages/EnhancedInteractiveDemo";
import ClientOnboarding from "@/pages/ClientOnboarding";
import BusinessManagement from "@/pages/BusinessManagement";
import WorkflowAutomation from "@/pages/WorkflowAutomation";
import MarketIntelligence from "@/pages/MarketIntelligence";
import RealTimeAnalytics from "@/pages/RealTimeAnalytics";
import SystemAuditDashboard from "@/pages/SystemAuditDashboard";
import CrmDashboard from "@/pages/CrmDashboard";
import AdminPanel from "@/pages/AdminPanel";
import OddenHome from "@/pages/OddenHome";
import OddenContests from "@/pages/OddenContests";
import OddenDraftRoom from "@/pages/OddenDraftRoom";
import OddenLeaderboard from "@/pages/OddenLeaderboard";
import OddenAnalytics from "@/pages/OddenAnalytics";
import OddenSocial from "@/pages/OddenSocial";
import OddenWallet from "@/pages/OddenWallet";
import ProductivityInsights from "@/pages/ProductivityInsights";
function Router() {
    // Always call all hooks at the top level
    const { isAuthenticated, isLoading } = useAuth();
    const [location, setLocation] = useLocation();
    // Navigation handler
    const navigate = (path) => {
        setLocation(path);
    };
    // Make navigate function globally available
    window.navigateTo = navigate;
    useEffect(() => {
        if (isAuthenticated) {
            wsManager.connect();
        }
        return () => {
            wsManager.disconnect();
        };
    }, [isAuthenticated]);
    // Loading state
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-winnex-dark", children: _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center mb-8", children: [_jsx("div", { className: "w-16 h-16 mr-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse", children: _jsx("span", { className: "text-white font-black text-3xl", children: "W" }) }), _jsxs("span", { className: "text-4xl font-light text-white tracking-wide", children: ["WIN", _jsx("span", { className: "font-black text-green-400", children: "NEX" })] })] }), _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-winnex-green mx-auto" }), _jsx("p", { className: "mt-4 text-gray-400", children: "Loading platform..." })] }) }));
    }
    // Not authenticated state
    if (!isAuthenticated) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-winnex-dark", children: _jsxs("div", { className: "text-center max-w-md mx-auto p-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-8", children: [_jsx("div", { className: "w-16 h-16 mr-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-black text-3xl", children: "W" }) }), _jsxs("span", { className: "text-5xl font-light text-white tracking-wide", children: ["WIN", _jsx("span", { className: "font-black text-green-400", children: "NEX" })] })] }), _jsx("h1", { className: "text-3xl font-bold mb-4", children: "Welcome to Winnex" }), _jsx("p", { className: "text-gray-400 mb-8", children: "The ultimate sports betting experience awaits you." }), _jsx("button", { onClick: () => window.location.href = "/api/login", className: "bg-winnex-green text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-400 transition-colors", children: "Sign In to Start Betting" })] }) }));
    }
    // Main app routes
    return (_jsxs(Switch, { children: [_jsx(Route, { path: "/", component: Home }), _jsx(Route, { path: "/sports", component: Sports }), _jsx(Route, { path: "/live", component: LiveBetting }), _jsx(Route, { path: "/casino", component: Casino }), _jsx(Route, { path: "/esports", component: Esports }), _jsx(Route, { path: "/promotions", component: Promotions }), _jsx(Route, { path: "/deposit", component: Deposit }), _jsx(Route, { path: "/admin", component: Admin }), _jsx(Route, { path: "/profile", component: Profile }), _jsx(Route, { path: "/analytics", component: Analytics }), _jsx(Route, { path: "/vip", component: VIP }), _jsx(Route, { path: "/security", component: Security }), _jsx(Route, { path: "/payments", component: Payments }), _jsx(Route, { path: "/social", component: Social }), _jsx(Route, { path: "/streaming", component: LiveStreaming }), _jsx(Route, { path: "/ai-assistant", component: AIAssistant }), _jsx(Route, { path: "/social-betting", component: SocialBetting }), _jsx(Route, { path: "/responsible-gambling", component: ResponsibleGambling }), _jsx(Route, { path: "/fantasy-sports", component: FantasySports }), _jsx(Route, { path: "/affiliate-program", component: AffiliateProgram }), _jsx(Route, { path: "/compliance", component: ComplianceCenter }), _jsx(Route, { path: "/logos", component: LogoShowcase }), _jsx(Route, { path: "/integrated-dashboard", component: Dashboard }), _jsx(Route, { path: "/test-routing", component: TestRouting }), _jsx(Route, { path: "/system-diagnostics", component: SystemDiagnostics }), _jsx(Route, { path: "/error-tracking", component: RealTimeErrorTracker }), _jsx(Route, { path: "/system-health", component: SystemHealthDashboard }), _jsx(Route, { path: "/performance-optimizer", component: PerformanceOptimizer }), _jsx(Route, { path: "/enhancements", component: EnhancementsDemo }), _jsx(Route, { path: "/interactive", component: InteractiveFeatures }), _jsx(Route, { path: "/interactive-demo", component: InteractiveDemo }), _jsx(Route, { path: "/enhanced-interactive", component: EnhancedInteractiveDemo }), _jsx(Route, { path: "/client-onboarding", component: ClientOnboarding }), _jsx(Route, { path: "/business-management", component: BusinessManagement }), _jsx(Route, { path: "/workflow-automation", component: WorkflowAutomation }), _jsx(Route, { path: "/market-intelligence", component: MarketIntelligence }), _jsx(Route, { path: "/real-time-analytics", component: RealTimeAnalytics }), _jsx(Route, { path: "/system-audit", component: SystemAuditDashboard }), _jsx(Route, { path: "/crm", component: CrmDashboard }), _jsx(Route, { path: "/admin-panel", component: AdminPanel }), _jsx(Route, { path: "/productivity-insights", component: ProductivityInsights }), _jsx(Route, { path: "/odden", component: OddenHome }), _jsx(Route, { path: "/odden/contests", component: OddenContests }), _jsx(Route, { path: "/odden/draft", component: OddenDraftRoom }), _jsx(Route, { path: "/odden/leaderboard", component: OddenLeaderboard }), _jsx(Route, { path: "/odden/analytics", component: OddenAnalytics }), _jsx(Route, { path: "/odden/social", component: OddenSocial }), _jsx(Route, { path: "/odden/wallet", component: OddenWallet }), _jsx(Route, { component: NotFound })] }));
}
function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(TooltipProvider, { children: _jsxs("div", { className: "dark", children: [_jsx(Toaster, {}), _jsx(Router, {})] }) }) }));
}
export default App;
