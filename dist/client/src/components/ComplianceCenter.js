import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, Upload, AlertTriangle, Clock, User, CreditCard, MapPin, Flag } from "lucide-react";
export default function ComplianceCenter() {
    const [kycStatus, setKycStatus] = useState(null);
    const [complianceAlerts, setComplianceAlerts] = useState([]);
    const [taxReports, setTaxReports] = useState([]);
    const [uploadingDoc, setUploadingDoc] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('US');
    useEffect(() => {
        const mockKYCStatus = {
            tier: 'tier1',
            completionPercentage: 65,
            status: 'requires_action',
            lastUpdated: '2024-01-15',
            nextReviewDate: '2024-02-15',
            documents: [
                {
                    type: 'identity',
                    name: 'Government ID',
                    status: 'verified',
                    uploadDate: '2024-01-10',
                    expiryDate: '2027-03-15',
                    required: true
                },
                {
                    type: 'address',
                    name: 'Proof of Address',
                    status: 'rejected',
                    uploadDate: '2024-01-12',
                    rejectionReason: 'Document older than 3 months',
                    required: true
                },
                {
                    type: 'financial',
                    name: 'Bank Statement',
                    status: 'not_uploaded',
                    required: false
                },
                {
                    type: 'source_of_funds',
                    name: 'Source of Wealth',
                    status: 'not_uploaded',
                    required: false
                }
            ],
            limits: {
                dailyDeposit: 2500,
                monthlyDeposit: 10000,
                dailyWithdrawal: 1000,
                monthlyWithdrawal: 5000,
                maxBetAmount: 500,
                withdrawalRequiresApproval: true
            }
        };
        const mockAlerts = [
            {
                id: 'alert_1',
                type: 'kyc',
                severity: 'medium',
                title: 'Address Verification Required',
                description: 'Your proof of address document was rejected. Please upload a recent utility bill or bank statement.',
                timestamp: '2024-01-15 10:30',
                status: 'open',
                actionRequired: true
            },
            {
                id: 'alert_2',
                type: 'aml',
                severity: 'low',
                title: 'Transaction Pattern Review',
                description: 'Routine review of recent transaction patterns. No action required.',
                timestamp: '2024-01-14 15:45',
                status: 'acknowledged',
                actionRequired: false
            },
            {
                id: 'alert_3',
                type: 'regulatory',
                severity: 'high',
                title: 'Enhanced Due Diligence',
                description: 'Additional verification required due to transaction volume. Please provide source of funds documentation.',
                timestamp: '2024-01-13 09:15',
                status: 'open',
                actionRequired: true
            }
        ];
        const mockTaxReports = [
            {
                year: 2024,
                totalDeposits: 15000,
                totalWithdrawals: 12500,
                netGamingRevenue: -2500,
                taxableWinnings: 3200,
                withheldTax: 640,
                reportStatus: 'pending'
            },
            {
                year: 2023,
                totalDeposits: 22000,
                totalWithdrawals: 18500,
                netGamingRevenue: -3500,
                taxableWinnings: 5100,
                withheldTax: 1020,
                reportStatus: 'submitted',
                reportId: 'TAX-2023-001'
            }
        ];
        setKycStatus(mockKYCStatus);
        setComplianceAlerts(mockAlerts);
        setTaxReports(mockTaxReports);
    }, []);
    const getStatusColor = (status) => {
        switch (status) {
            case 'verified':
            case 'resolved':
            case 'submitted': return 'text-green-400';
            case 'pending':
            case 'uploaded':
            case 'acknowledged': return 'text-yellow-400';
            case 'rejected':
            case 'open': return 'text-red-400';
            case 'requires_action': return 'text-orange-400';
            default: return 'text-gray-400';
        }
    };
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'border-red-500 bg-red-500/10';
            case 'high': return 'border-orange-500 bg-orange-500/10';
            case 'medium': return 'border-yellow-500 bg-yellow-500/10';
            case 'low': return 'border-blue-500 bg-blue-500/10';
            default: return 'border-gray-500 bg-gray-500/10';
        }
    };
    const getTierName = (tier) => {
        switch (tier) {
            case 'tier0': return 'Basic';
            case 'tier1': return 'Verified';
            case 'tier2': return 'Enhanced';
            case 'tier3': return 'Premium';
            default: return 'Unknown';
        }
    };
    const handleDocumentUpload = (docType) => {
        setUploadingDoc(docType);
        // Simulate upload process
        setTimeout(() => {
            setUploadingDoc(null);
        }, 2000);
    };
    if (!kycStatus)
        return null;
    return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsxs("div", { className: "flex items-center justify-center mb-4", children: [_jsx(Shield, { className: "w-12 h-12 text-emerald-400 mr-3" }), _jsx("h1", { className: "text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent", children: "Compliance Center" })] }), _jsx("p", { className: "text-gray-400 text-lg", children: "Manage your verification status and regulatory compliance" })] }), _jsxs(Card, { className: "casino-card border-emerald-400/20", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "text-white text-2xl", children: [getTierName(kycStatus.tier), " Account Status"] }), _jsxs("p", { className: "text-gray-400 mt-1", children: ["Verification Level: ", kycStatus.completionPercentage, "% Complete"] })] }), _jsx(Badge, { className: getStatusColor(kycStatus.status), children: kycStatus.status.replace('_', ' ').toUpperCase() })] }) }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-gray-400", children: "Verification Progress" }), _jsxs("span", { className: "text-white", children: [kycStatus.completionPercentage, "%"] })] }), _jsx(Progress, { value: kycStatus.completionPercentage, className: "h-3" })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-xl font-bold text-emerald-400", children: ["$", kycStatus.limits.dailyDeposit.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Daily Deposit Limit" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-xl font-bold text-blue-400", children: ["$", kycStatus.limits.dailyWithdrawal.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Daily Withdrawal Limit" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-xl font-bold text-purple-400", children: ["$", kycStatus.limits.maxBetAmount.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Max Bet Amount" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-xl font-bold text-orange-400", children: kycStatus.limits.withdrawalRequiresApproval ? 'YES' : 'NO' }), _jsx("div", { className: "text-sm text-gray-400", children: "Manual Approval" })] })] })] })] }), complianceAlerts.filter(alert => alert.status === 'open').length > 0 && (_jsxs(Card, { className: "casino-card border-red-400/20", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "text-white flex items-center", children: [_jsx(AlertTriangle, { className: "w-5 h-5 mr-2 text-red-400" }), "Action Required"] }) }), _jsx(CardContent, { className: "space-y-3", children: complianceAlerts.filter(alert => alert.status === 'open').map((alert) => (_jsxs("div", { className: `p-4 rounded-lg border ${getSeverityColor(alert.severity)}`, children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h4", { className: "font-semibold text-white", children: alert.title }), _jsx(Badge, { variant: "outline", className: "text-xs", children: alert.severity.toUpperCase() })] }), _jsx("p", { className: "text-sm text-gray-300 mb-3", children: alert.description }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-xs text-gray-400", children: alert.timestamp }), alert.actionRequired && (_jsx(Button, { size: "sm", className: "bg-red-500 hover:bg-red-600", children: "Take Action" }))] })] }, alert.id))) })] })), _jsxs(Tabs, { defaultValue: "documents", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsxs(TabsTrigger, { value: "documents", className: "flex items-center", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "Documents"] }), _jsxs(TabsTrigger, { value: "limits", className: "flex items-center", children: [_jsx(CreditCard, { className: "w-4 h-4 mr-2" }), "Limits"] }), _jsxs(TabsTrigger, { value: "tax", className: "flex items-center", children: [_jsx(Flag, { className: "w-4 h-4 mr-2" }), "Tax Reports"] }), _jsxs(TabsTrigger, { value: "alerts", className: "flex items-center", children: [_jsx(AlertTriangle, { className: "w-4 h-4 mr-2" }), "All Alerts"] })] }), _jsx(TabsContent, { value: "documents", className: "space-y-6", children: _jsx("div", { className: "grid gap-6", children: kycStatus.documents.map((doc, index) => (_jsx(Card, { className: "casino-card", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "text-emerald-400", children: [doc.type === 'identity' && _jsx(User, { className: "w-5 h-5" }), doc.type === 'address' && _jsx(MapPin, { className: "w-5 h-5" }), doc.type === 'financial' && _jsx(CreditCard, { className: "w-5 h-5" }), doc.type === 'source_of_funds' && _jsx(FileText, { className: "w-5 h-5" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-white", children: doc.name }), _jsxs("p", { className: "text-sm text-gray-400 capitalize", children: [doc.type.replace('_', ' '), " Document"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [doc.required && (_jsx(Badge, { variant: "destructive", className: "text-xs", children: "REQUIRED" })), _jsx(Badge, { className: getStatusColor(doc.status), children: doc.status.replace('_', ' ').toUpperCase() })] })] }), doc.status === 'verified' && (_jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm mb-4", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Uploaded: " }), _jsx("span", { className: "text-white", children: doc.uploadDate })] }), doc.expiryDate && (_jsxs("div", { children: [_jsx("span", { className: "text-gray-400", children: "Expires: " }), _jsx("span", { className: "text-white", children: doc.expiryDate })] }))] })), doc.status === 'rejected' && doc.rejectionReason && (_jsx("div", { className: "bg-red-500/10 border border-red-500/20 rounded p-3 mb-4", children: _jsx("p", { className: "text-sm text-red-400", children: doc.rejectionReason }) })), _jsxs("div", { className: "flex space-x-3", children: [doc.status === 'not_uploaded' || doc.status === 'rejected' ? (_jsx(Button, { onClick: () => handleDocumentUpload(doc.type), disabled: uploadingDoc === doc.type, className: "bg-emerald-500 hover:bg-emerald-600", children: uploadingDoc === doc.type ? (_jsxs(_Fragment, { children: [_jsx(Clock, { className: "w-4 h-4 mr-2 animate-spin" }), "Uploading..."] })) : (_jsxs(_Fragment, { children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Upload Document"] })) })) : (_jsxs(Button, { variant: "outline", className: "flex-1", children: [_jsx(FileText, { className: "w-4 h-4 mr-2" }), "View Document"] })), (doc.status === 'uploaded' || doc.status === 'verified') && (_jsx(Button, { variant: "outline", children: "Replace" }))] })] }) }, index))) }) }), _jsx(TabsContent, { value: "limits", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Current Account Limits" }), _jsx("p", { className: "text-gray-400", children: "Limits based on your verification level" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Deposit Limits" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Daily Limit" }), _jsxs("span", { className: "text-emerald-400 font-semibold", children: ["$", kycStatus.limits.dailyDeposit.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Monthly Limit" }), _jsxs("span", { className: "text-emerald-400 font-semibold", children: ["$", kycStatus.limits.monthlyDeposit.toLocaleString()] })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: "Withdrawal Limits" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Daily Limit" }), _jsxs("span", { className: "text-blue-400 font-semibold", children: ["$", kycStatus.limits.dailyWithdrawal.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Monthly Limit" }), _jsxs("span", { className: "text-blue-400 font-semibold", children: ["$", kycStatus.limits.monthlyWithdrawal.toLocaleString()] })] })] })] })] }), _jsxs("div", { className: "border-t border-gray-700 pt-6", children: [_jsx("h3", { className: "text-lg font-semibold text-white mb-4", children: "Betting Limits" }), _jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [_jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Maximum Bet Amount" }), _jsxs("span", { className: "text-purple-400 font-semibold", children: ["$", kycStatus.limits.maxBetAmount.toLocaleString()] })] }), _jsxs("div", { className: "flex justify-between p-3 bg-gray-800 rounded", children: [_jsx("span", { className: "text-gray-400", children: "Manual Approval Required" }), _jsx("span", { className: kycStatus.limits.withdrawalRequiresApproval ? 'text-orange-400' : 'text-green-400', children: kycStatus.limits.withdrawalRequiresApproval ? 'Yes' : 'No' })] })] })] }), _jsxs("div", { className: "bg-blue-500/10 border border-blue-500/20 rounded-lg p-4", children: [_jsx("p", { className: "text-blue-400 font-semibold mb-2", children: "Increase Your Limits" }), _jsx("p", { className: "text-sm text-gray-300 mb-3", children: "Complete additional verification steps to increase your account limits and unlock premium features." }), _jsx(Button, { className: "bg-blue-500 hover:bg-blue-600", children: "Upgrade Verification Level" })] })] })] }) }), _jsx(TabsContent, { value: "tax", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-white", children: "Tax Reporting" }), _jsx("p", { className: "text-gray-400", children: "Annual tax reports and documentation" })] }), _jsxs(Select, { value: selectedCountry, onValueChange: setSelectedCountry, children: [_jsx(SelectTrigger, { className: "w-32 bg-gray-800 border-gray-700", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "US", children: "United States" }), _jsx(SelectItem, { value: "UK", children: "United Kingdom" }), _jsx(SelectItem, { value: "CA", children: "Canada" }), _jsx(SelectItem, { value: "AU", children: "Australia" })] })] })] }) }), _jsx(CardContent, { className: "space-y-4", children: taxReports.map((report) => (_jsx(Card, { className: "border-gray-700", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-xl font-bold text-white", children: ["Tax Year ", report.year] }), _jsx(Badge, { className: getStatusColor(report.reportStatus), children: report.reportStatus.toUpperCase() })] }), report.reportId && (_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Report ID" }), _jsx("div", { className: "font-mono text-white text-sm", children: report.reportId })] }))] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-emerald-400", children: ["$", report.totalDeposits.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Deposits" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-blue-400", children: ["$", report.totalWithdrawals.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Total Withdrawals" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: `text-lg font-bold ${report.netGamingRevenue >= 0 ? 'text-green-400' : 'text-red-400'}`, children: [report.netGamingRevenue >= 0 ? '+' : '', "$", report.netGamingRevenue.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Net Gaming Revenue" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-purple-400", children: ["$", report.taxableWinnings.toLocaleString()] }), _jsx("div", { className: "text-sm text-gray-400", children: "Taxable Winnings" })] })] }), _jsx("div", { className: "flex space-x-3", children: report.reportStatus === 'pending' ? (_jsx(Button, { className: "bg-emerald-500 hover:bg-emerald-600", children: "Generate Report" })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", className: "flex-1", children: "Download PDF" }), _jsx(Button, { variant: "outline", className: "flex-1", children: "Download CSV" })] })) })] }) }, report.year))) })] }) }), _jsx(TabsContent, { value: "alerts", className: "space-y-6", children: _jsxs(Card, { className: "casino-card", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-white", children: "Compliance Alerts" }) }), _jsx(CardContent, { className: "space-y-4", children: complianceAlerts.map((alert) => (_jsx(Card, { className: `border ${getSeverityColor(alert.severity)}`, children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "text-emerald-400", children: [alert.type === 'kyc' && _jsx(User, { className: "w-5 h-5" }), alert.type === 'aml' && _jsx(Shield, { className: "w-5 h-5" }), alert.type === 'regulatory' && _jsx(Flag, { className: "w-5 h-5" }), alert.type === 'suspicious_activity' && _jsx(AlertTriangle, { className: "w-5 h-5" })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-white", children: alert.title }), _jsx("p", { className: "text-sm text-gray-400 capitalize", children: alert.type.replace('_', ' ') })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: "outline", className: "text-xs", children: alert.severity.toUpperCase() }), _jsx(Badge, { className: getStatusColor(alert.status), children: alert.status.toUpperCase() })] })] }), _jsx("p", { className: "text-sm text-gray-300 mb-3", children: alert.description }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-xs text-gray-400", children: alert.timestamp }), _jsxs("div", { className: "flex space-x-2", children: [alert.status === 'open' && (_jsx(Button, { size: "sm", variant: "outline", children: "Acknowledge" })), alert.actionRequired && alert.status === 'open' && (_jsx(Button, { size: "sm", className: "bg-red-500 hover:bg-red-600", children: "Take Action" }))] })] })] }) }, alert.id))) })] }) })] })] }));
}
