import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "wouter";
export default function TestRouting() {
    const [location, setLocation] = useLocation();
    console.log('Current location:', location);
    return (_jsxs("div", { className: "p-8 bg-white text-black", children: [_jsx("h1", { children: "Routing Test" }), _jsxs("p", { children: ["Current location: ", location] }), _jsxs("div", { className: "space-y-4 mt-4", children: [_jsxs("div", { children: [_jsx(Link, { href: "/sports", className: "bg-blue-500 text-white px-4 py-2 rounded mr-4", children: "Go to Sports" }), _jsx(Link, { href: "/casino", className: "bg-green-500 text-white px-4 py-2 rounded mr-4", children: "Go to Casino" }), _jsx(Link, { href: "/", className: "bg-red-500 text-white px-4 py-2 rounded", children: "Go to Home" })] }), _jsxs("div", { children: [_jsx("button", { onClick: () => setLocation('/sports'), className: "bg-purple-500 text-white px-4 py-2 rounded mr-4", children: "Navigate to Sports (programmatic)" }), _jsx("button", { onClick: () => setLocation('/casino'), className: "bg-orange-500 text-white px-4 py-2 rounded", children: "Navigate to Casino (programmatic)" })] })] })] }));
}
