import { jsx as _jsx } from "react/jsx-runtime";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AIBettingAssistant from "@/components/AIBettingAssistant";
import Layout from "@/components/Layout";
export default function AIAssistant() {
    const { toast } = useToast();
    const { isAuthenticated, isLoading } = useAuth();
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            toast({
                title: "Unauthorized",
                description: "You are logged out. Logging in again...",
                variant: "destructive",
            });
            setTimeout(() => {
                window.location.href = "/api/login";
            }, 500);
            return;
        }
    }, [isAuthenticated, isLoading, toast]);
    if (isLoading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx("div", { className: "animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" }) }) }));
    }
    if (!isAuthenticated) {
        return null;
    }
    return (_jsx(Layout, { children: _jsx(AIBettingAssistant, {}) }));
}
