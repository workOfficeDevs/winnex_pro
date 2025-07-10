"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCrmData = seedCrmData;
var db_1 = require("./db");
var crmSchema_1 = require("@shared/crmSchema");
var schema_1 = require("@shared/schema");
function seedCrmData() {
    return __awaiter(this, void 0, void 0, function () {
        var existingUsers_1, profilesData, alertsData, ticketsData, walletsData, transactionsData, affiliatesData, campaignsData, adminData, logsData, settingsData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 12, , 13]);
                    console.log("🔄 Seeding CRM demo data...");
                    return [4 /*yield*/, db_1.db.select().from(schema_1.users).limit(10)];
                case 1:
                    existingUsers_1 = _a.sent();
                    if (existingUsers_1.length === 0) {
                        console.log("No users found, skipping CRM data seeding");
                        return [2 /*return*/];
                    }
                    profilesData = existingUsers_1.map(function (user, index) { return ({
                        userId: user.id,
                        fullName: "Demo User ".concat(index + 1),
                        kycStatus: ['basic', 'intermediate', 'advanced'][index % 3],
                        userSegment: ['new', 'casual', 'vip', 'high_roller'][index % 4],
                        riskLevel: ['low', 'medium', 'high'][index % 3],
                        complianceStatus: 'clear',
                        phoneNumber: "+1-555-0".concat(100 + index),
                        nationality: 'US',
                        occupation: ['Engineer', 'Teacher', 'Doctor', 'Lawyer', 'Artist'][index % 5],
                        totalDeposits: (Math.random() * 50000).toFixed(2),
                        totalWagered: (Math.random() * 100000).toFixed(2),
                        lifetimeValue: (Math.random() * 25000).toFixed(2),
                        amlRiskScore: Math.floor(Math.random() * 100),
                        fraudRiskScore: Math.floor(Math.random() * 50),
                        lastLoginAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
                        loginCount: Math.floor(Math.random() * 100) + 1,
                        bettingFrequency: (Math.random() * 10).toFixed(2),
                        avgBetAmount: (Math.random() * 500).toFixed(2),
                        tags: JSON.stringify(['demo', 'test_user']),
                        communicationPreferences: JSON.stringify({
                            email: true,
                            sms: false,
                            push: true
                        }),
                        address: JSON.stringify({
                            street: "".concat(100 + index, " Demo Street"),
                            city: 'Demo City',
                            state: 'CA',
                            country: 'US',
                            zipCode: "9000".concat(index)
                        })
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmUserProfiles).values(profilesData).onConflictDoNothing()];
                case 2:
                    _a.sent();
                    alertsData = existingUsers_1.slice(0, 5).map(function (user, index) { return ({
                        userId: user.id,
                        alertType: ['fraud_pattern', 'responsible_gambling', 'aml_suspicious', 'high_velocity'][index % 4],
                        severity: ['low', 'medium', 'high', 'critical'][index % 4],
                        title: [
                            'Unusual Betting Pattern Detected',
                            'Spending Limit Exceeded',
                            'Suspicious Transaction Activity',
                            'Multiple Account Login Attempts',
                            'High-Risk Jurisdiction Activity'
                        ][index],
                        description: [
                            'User has placed an unusually high number of bets in a short timeframe',
                            'User has exceeded their daily spending limit multiple times this week',
                            'Transaction patterns suggest potential money laundering activity',
                            'Multiple failed login attempts from different locations detected',
                            'Activity detected from high-risk jurisdiction requiring review'
                        ][index],
                        isResolved: index < 2,
                        data: JSON.stringify({
                            triggerAmount: Math.random() * 10000,
                            timeframe: '24h',
                            riskScore: Math.floor(Math.random() * 100)
                        })
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmRiskAlerts).values(alertsData).onConflictDoNothing()];
                case 3:
                    _a.sent();
                    ticketsData = existingUsers_1.slice(0, 3).map(function (user, index) { return ({
                        userId: user.id,
                        ticketNumber: "TKT-".concat(Date.now() + index, "-").concat(Math.random().toString(36).substr(2, 4).toUpperCase()),
                        subject: [
                            'Withdrawal Request Assistance',
                            'Account Verification Help',
                            'Betting Limit Increase Request'
                        ][index],
                        description: [
                            'I need help processing my withdrawal request that has been pending for 2 days.',
                            'I uploaded my documents but my account verification is still pending.',
                            'I would like to increase my daily betting limit for upcoming games.'
                        ][index],
                        status: ['open', 'in_progress', 'resolved'][index],
                        priority: ['medium', 'high', 'low'][index],
                        category: ['payment', 'account', 'betting'][index],
                        assignedTo: index === 1 ? 'admin' : null
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmSupportTickets).values(ticketsData).onConflictDoNothing()];
                case 4:
                    _a.sent();
                    walletsData = existingUsers_1.slice(0, 5).flatMap(function (user, userIndex) {
                        return ['BTC', 'ETH', 'USDT'].map(function (currency, currencyIndex) { return ({
                            userId: user.id,
                            currency: currency,
                            address: "demo_".concat(currency.toLowerCase(), "_").concat(userIndex, "_").concat(Date.now()),
                            isVerified: Math.random() > 0.3,
                            balance: (Math.random() * 10).toFixed(8),
                            riskScore: Math.floor(Math.random() * 50)
                        }); });
                    });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmWallets).values(walletsData).onConflictDoNothing()];
                case 5:
                    _a.sent();
                    transactionsData = existingUsers_1.slice(0, 5).flatMap(function (user, userIndex) {
                        return Array.from({ length: 3 }, function (_, transIndex) { return ({
                            userId: user.id,
                            type: ['deposit', 'withdrawal', 'bet', 'win'][transIndex % 4],
                            currency: ['BTC', 'ETH', 'USDT'][transIndex % 3],
                            amount: (Math.random() * 5).toFixed(8),
                            usdValue: (Math.random() * 1000).toFixed(2),
                            status: ['confirmed', 'pending', 'confirmed'][transIndex % 3],
                            txHash: "0x".concat(Math.random().toString(16).substr(2, 64)),
                            amlRiskScore: Math.floor(Math.random() * 100),
                            isAmlFlagged: Math.random() < 0.1,
                            riskFlags: JSON.stringify(Math.random() < 0.2 ? ['high_amount', 'rapid_succession'] : [])
                        }); });
                    });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmTransactions).values(transactionsData).onConflictDoNothing()];
                case 6:
                    _a.sent();
                    affiliatesData = existingUsers_1.slice(0, 2).map(function (user, index) { return ({
                        userId: user.id,
                        referralCode: "REF".concat(user.id.slice(-6).toUpperCase()),
                        affiliateType: ['referral', 'partner'][index],
                        commissionRate: '0.05',
                        totalReferrals: Math.floor(Math.random() * 20),
                        activeReferrals: Math.floor(Math.random() * 15),
                        totalCommissionEarned: (Math.random() * 5000).toFixed(2),
                        pendingCommission: (Math.random() * 500).toFixed(2)
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmAffiliates).values(affiliatesData).onConflictDoNothing()];
                case 7:
                    _a.sent();
                    campaignsData = [
                        {
                            name: 'Welcome Bonus Campaign',
                            description: 'Welcome new users with bonus offers',
                            channel: 'email',
                            targetSegment: 'new',
                            subject: 'Welcome to Winnex Pro - Claim Your Bonus!',
                            content: 'Welcome to our platform! Claim your welcome bonus now.',
                            totalTargeted: 100,
                            totalSent: 95,
                            totalDelivered: 92,
                            totalOpened: 68,
                            totalClicked: 23,
                            createdBy: 'system'
                        },
                        {
                            name: 'VIP User Retention',
                            description: 'Retention campaign for VIP users',
                            channel: 'sms',
                            targetSegment: 'vip',
                            subject: 'Exclusive VIP Offer',
                            content: 'As a VIP member, you have exclusive access to premium features.',
                            totalTargeted: 50,
                            totalSent: 48,
                            totalDelivered: 46,
                            totalOpened: 35,
                            totalClicked: 12,
                            createdBy: 'admin'
                        }
                    ];
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmNotificationCampaigns).values(campaignsData).onConflictDoNothing()];
                case 8:
                    _a.sent();
                    adminData = existingUsers_1.slice(0, 1).map(function (user) { return ({
                        userId: user.id,
                        role: 'super_admin',
                        permissions: JSON.stringify(['view_all', 'edit_all', 'delete_all', 'manage_users']),
                        lastLoginAt: new Date(),
                        createdBy: 'system'
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmAdminUsers).values(adminData).onConflictDoNothing()];
                case 9:
                    _a.sent();
                    logsData = Array.from({ length: 10 }, function (_, index) { return ({
                        adminId: existingUsers_1[0].id,
                        action: [
                            'user_profile_update',
                            'risk_alert_resolved',
                            'ticket_assigned',
                            'user_flagged',
                            'kyc_approved',
                            'transaction_reviewed'
                        ][index % 6],
                        entityType: ['user', 'alert', 'ticket', 'transaction'][index % 4],
                        entityId: (index + 1).toString(),
                        details: JSON.stringify({
                            action: 'demo_action',
                            timestamp: new Date(),
                            changes: ['field_updated']
                        }),
                        ipAddress: "192.168.1.".concat(100 + index),
                        userAgent: 'Mozilla/5.0 (Demo Browser)'
                    }); });
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmAdminLogs).values(logsData).onConflictDoNothing()];
                case 10:
                    _a.sent();
                    settingsData = [
                        {
                            category: 'risk_thresholds',
                            key: 'max_daily_deposit',
                            value: JSON.stringify({ amount: 10000, currency: 'USD' }),
                            description: 'Maximum daily deposit amount before triggering review'
                        },
                        {
                            category: 'kyc_requirements',
                            key: 'document_expiry_days',
                            value: JSON.stringify(365),
                            description: 'Number of days before KYC documents expire'
                        },
                        {
                            category: 'notification_templates',
                            key: 'welcome_email',
                            value: JSON.stringify({
                                subject: 'Welcome to Winnex Pro',
                                template: 'welcome_template'
                            }),
                            description: 'Welcome email template configuration'
                        },
                        {
                            category: 'compliance',
                            key: 'aml_risk_threshold',
                            value: JSON.stringify(75),
                            description: 'AML risk score threshold for automatic flagging'
                        }
                    ];
                    return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmSettings).values(settingsData).onConflictDoNothing()];
                case 11:
                    _a.sent();
                    console.log("✅ CRM demo data seeded successfully!");
                    console.log("- Created profiles for ".concat(existingUsers_1.length, " users"));
                    console.log("- Created ".concat(alertsData.length, " risk alerts"));
                    console.log("- Created ".concat(ticketsData.length, " support tickets"));
                    console.log("- Created ".concat(walletsData.length, " crypto wallets"));
                    console.log("- Created ".concat(transactionsData.length, " transactions"));
                    console.log("- Created ".concat(affiliatesData.length, " affiliate records"));
                    console.log("- Created ".concat(campaignsData.length, " notification campaigns"));
                    console.log("- Created ".concat(adminData.length, " admin users"));
                    console.log("- Created ".concat(logsData.length, " admin logs"));
                    console.log("- Created ".concat(settingsData.length, " system settings"));
                    return [3 /*break*/, 13];
                case 12:
                    error_1 = _a.sent();
                    console.error("❌ Error seeding CRM data:", error_1);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
