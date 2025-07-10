import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import LiveBettingEngine from "@/components/LiveBettingEngine";
export default function LiveBetting() {
    return (_jsx(Layout, { children: _jsx(LiveBettingEngine, {}) }));
}
