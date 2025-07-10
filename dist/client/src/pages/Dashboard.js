import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import EnhancedDashboard from "@/components/EnhancedDashboard";
export default function Dashboard() {
    return (_jsx(Layout, { children: _jsx(EnhancedDashboard, {}) }));
}
