import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import EnhancedSecurityCenter from "@/components/EnhancedSecurityCenter";
export default function Security() {
    return (_jsx(Layout, { children: _jsx(EnhancedSecurityCenter, {}) }));
}
