import { jsx as _jsx } from "react/jsx-runtime";
import Layout from "@/components/Layout";
import CryptoPaymentGateway from "@/components/CryptoPaymentGateway";
export default function Payments() {
    return (_jsx(Layout, { children: _jsx(CryptoPaymentGateway, {}) }));
}
