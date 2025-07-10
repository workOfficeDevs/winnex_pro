import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import AdvancedAnalyticsDashboard from "@/components/AdvancedAnalyticsDashboard";
export default function Analytics() {
    return (_jsx(Layout, { children: _jsx(AdvancedAnalyticsDashboard, {}) }));
}
