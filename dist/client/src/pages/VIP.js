import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import VIPLoyaltyProgram from "@/components/VIPLoyaltyProgram";
export default function VIP() {
    return (_jsx(Layout, { children: _jsx(VIPLoyaltyProgram, {}) }));
}
