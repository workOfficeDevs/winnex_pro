import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import LogoSamples from "@/components/LogoSamples";
export default function LogoShowcase() {
    return (_jsx(Layout, { children: _jsx(LogoSamples, {}) }));
}
