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
exports.registerCrmRoutes = registerCrmRoutes;
var crmService_1 = require("./crmService");
var replitAuth_1 = require("./replitAuth");
var adminAuth_1 = require("./adminAuth");
var zod_1 = require("zod");
function registerCrmRoutes(app) {
    var _this = this;
    // CRM Analytics endpoint - requires CRM access permission
    app.get("/api/crm/analytics", (0, adminAuth_1.requirePermission)('access_crm'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var analytics, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, crmService_1.crmService.getPlatformAnalytics()];
                case 1:
                    analytics = _a.sent();
                    res.json(analytics);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching CRM analytics:", error_1);
                    res.status(500).json({ message: "Failed to fetch analytics", error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // User search and listing - requires CRM access permission  
    app.get("/api/crm/users", (0, adminAuth_1.requirePermission)('access_crm'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, search, segment, risk, _b, limit, users, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    _a = req.query, search = _a.search, segment = _a.segment, risk = _a.risk, _b = _a.limit, limit = _b === void 0 ? 50 : _b;
                    users = void 0;
                    if (!search) return [3 /*break*/, 2];
                    return [4 /*yield*/, crmService_1.crmService.searchUsers(search, parseInt(limit))];
                case 1:
                    users = _c.sent();
                    return [3 /*break*/, 6];
                case 2:
                    if (!(segment && segment !== 'all')) return [3 /*break*/, 4];
                    return [4 /*yield*/, crmService_1.crmService.getUsersBySegment(segment, parseInt(limit))];
                case 3:
                    users = _c.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, crmService_1.crmService.getUsersBySegment('all', parseInt(limit))];
                case 5:
                    // Return recent users if no specific search
                    users = _c.sent();
                    _c.label = 6;
                case 6:
                    res.json(users);
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _c.sent();
                    console.error("Error fetching users:", error_2);
                    res.status(500).json({ message: "Failed to fetch users", error: error_2.message });
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); });
    // User profile details
    app.get("/api/crm/users/:userId", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, analytics, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = req.params.userId;
                    return [4 /*yield*/, crmService_1.crmService.getUserAnalytics(userId)];
                case 1:
                    analytics = _a.sent();
                    res.json(analytics);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error fetching user profile:", error_3);
                    res.status(500).json({ message: "Failed to fetch user profile", error: error_3.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Risk alerts
    app.get("/api/crm/risk-alerts", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, userId, severity, resolved, alerts, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, userId = _a.userId, severity = _a.severity, resolved = _a.resolved;
                    return [4 /*yield*/, crmService_1.crmService.getRiskAlerts(userId, severity, resolved === 'true')];
                case 1:
                    alerts = _b.sent();
                    res.json(alerts);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    console.error("Error fetching risk alerts:", error_4);
                    res.status(500).json({ message: "Failed to fetch risk alerts", error: error_4.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Resolve risk alert
    app.post("/api/crm/resolve-alert", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, _a, alertId, notes, adminId, alert_1, error_5;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    schema = zod_1.z.object({
                        alertId: zod_1.z.number(),
                        notes: zod_1.z.string().optional()
                    });
                    _a = schema.parse(req.body), alertId = _a.alertId, notes = _a.notes;
                    adminId = ((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.claims) === null || _c === void 0 ? void 0 : _c.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.resolveRiskAlert(alertId, adminId, notes)];
                case 1:
                    alert_1 = _d.sent();
                    // Log the admin action
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            action: 'resolve_risk_alert',
                            entityType: 'risk_alert',
                            entityId: alertId.toString(),
                            details: { notes: notes }
                        })];
                case 2:
                    // Log the admin action
                    _d.sent();
                    res.json(alert_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _d.sent();
                    console.error("Error resolving alert:", error_5);
                    res.status(500).json({ message: "Failed to resolve alert", error: error_5.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Support tickets
    app.get("/api/crm/support-tickets", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, tickets, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    userId = req.query.userId;
                    tickets = void 0;
                    if (!userId) return [3 /*break*/, 2];
                    return [4 /*yield*/, crmService_1.crmService.getTicketsByUser(userId)];
                case 1:
                    tickets = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, crmService_1.crmService.getOpenTickets()];
                case 3:
                    tickets = _a.sent();
                    _a.label = 4;
                case 4:
                    res.json(tickets);
                    return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    console.error("Error fetching support tickets:", error_6);
                    res.status(500).json({ message: "Failed to fetch support tickets", error: error_6.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    // Create support ticket
    app.post("/api/crm/support-tickets", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, ticketData, ticket, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        subject: zod_1.z.string().min(1),
                        description: zod_1.z.string().min(1),
                        category: zod_1.z.string().optional(),
                        priority: zod_1.z.enum(['low', 'medium', 'high', 'critical']).default('medium')
                    });
                    ticketData = schema.parse(req.body);
                    return [4 /*yield*/, crmService_1.crmService.createSupportTicket(ticketData)];
                case 1:
                    ticket = _a.sent();
                    res.json(ticket);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error("Error creating support ticket:", error_7);
                    res.status(500).json({ message: "Failed to create support ticket", error: error_7.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Flag user for AML
    app.post("/api/crm/flag-user", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, _a, userId, reason, adminId, error_8;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        reason: zod_1.z.string().min(1)
                    });
                    _a = schema.parse(req.body), userId = _a.userId, reason = _a.reason;
                    adminId = ((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.claims) === null || _c === void 0 ? void 0 : _c.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.flagUserForAML(userId, reason, adminId)];
                case 1:
                    _d.sent();
                    res.json({ success: true, message: "User flagged successfully" });
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _d.sent();
                    console.error("Error flagging user:", error_8);
                    res.status(500).json({ message: "Failed to flag user", error: error_8.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update user segments
    app.post("/api/crm/update-segments", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var adminId, error_9;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, crmService_1.crmService.updateUserSegmentation()];
                case 1:
                    _c.sent();
                    adminId = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            action: 'update_user_segments',
                            entityType: 'system',
                            entityId: 'segmentation',
                            details: { timestamp: new Date() }
                        })];
                case 2:
                    _c.sent();
                    res.json({ success: true, message: "User segments updated successfully" });
                    return [3 /*break*/, 4];
                case 3:
                    error_9 = _c.sent();
                    console.error("Error updating segments:", error_9);
                    res.status(500).json({ message: "Failed to update segments", error: error_9.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Create user profile
    app.post("/api/crm/users", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, profileData, profile, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        fullName: zod_1.z.string().optional(),
                        dateOfBirth: zod_1.z.string().optional(),
                        address: zod_1.z.object({
                            street: zod_1.z.string(),
                            city: zod_1.z.string(),
                            state: zod_1.z.string(),
                            country: zod_1.z.string(),
                            zipCode: zod_1.z.string()
                        }).optional(),
                        phoneNumber: zod_1.z.string().optional(),
                        nationality: zod_1.z.string().optional(),
                        occupation: zod_1.z.string().optional()
                    });
                    profileData = schema.parse(req.body);
                    return [4 /*yield*/, crmService_1.crmService.createUserProfile(profileData)];
                case 1:
                    profile = _a.sent();
                    res.json(profile);
                    return [3 /*break*/, 3];
                case 2:
                    error_10 = _a.sent();
                    console.error("Error creating user profile:", error_10);
                    res.status(500).json({ message: "Failed to create user profile", error: error_10.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update user profile
    app.put("/api/crm/users/:userId", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, updateData, profile, adminId, error_11;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    userId = req.params.userId;
                    updateData = req.body;
                    return [4 /*yield*/, crmService_1.crmService.updateUserProfile(userId, updateData)];
                case 1:
                    profile = _c.sent();
                    adminId = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            targetUserId: userId,
                            action: 'update_user_profile',
                            entityType: 'user_profile',
                            entityId: userId,
                            details: updateData
                        })];
                case 2:
                    _c.sent();
                    res.json(profile);
                    return [3 /*break*/, 4];
                case 3:
                    error_11 = _c.sent();
                    console.error("Error updating user profile:", error_11);
                    res.status(500).json({ message: "Failed to update user profile", error: error_11.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Transaction monitoring
    app.get("/api/crm/transactions", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, userId, flagged, transactions, transactions, error_12;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    _a = req.query, userId = _a.userId, flagged = _a.flagged;
                    if (!(flagged === 'true')) return [3 /*break*/, 2];
                    return [4 /*yield*/, crmService_1.crmService.getFlaggedTransactions()];
                case 1:
                    transactions = _b.sent();
                    res.json(transactions);
                    return [3 /*break*/, 5];
                case 2:
                    if (!userId) return [3 /*break*/, 4];
                    return [4 /*yield*/, crmService_1.crmService.getTransactionHistory(userId)];
                case 3:
                    transactions = _b.sent();
                    res.json(transactions);
                    return [3 /*break*/, 5];
                case 4:
                    res.status(400).json({ message: "Please specify userId or use flagged=true" });
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_12 = _b.sent();
                    console.error("Error fetching transactions:", error_12);
                    res.status(500).json({ message: "Failed to fetch transactions", error: error_12.message });
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); });
    // Create transaction record
    app.post("/api/crm/transactions", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, transactionData, transaction, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        type: zod_1.z.enum(['deposit', 'withdrawal', 'bet', 'win']),
                        currency: zod_1.z.string(),
                        amount: zod_1.z.string(),
                        usdValue: zod_1.z.string().optional(),
                        txHash: zod_1.z.string().optional(),
                        fromAddress: zod_1.z.string().optional(),
                        toAddress: zod_1.z.string().optional()
                    });
                    transactionData = schema.parse(req.body);
                    return [4 /*yield*/, crmService_1.crmService.createTransaction(transactionData)];
                case 1:
                    transaction = _a.sent();
                    res.json(transaction);
                    return [3 /*break*/, 3];
                case 2:
                    error_13 = _a.sent();
                    console.error("Error creating transaction:", error_13);
                    res.status(500).json({ message: "Failed to create transaction", error: error_13.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Send notifications
    app.post("/api/crm/notifications", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, _a, userIds, channel, subject, content, campaignName, result, adminId, error_14;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 3, , 4]);
                    schema = zod_1.z.object({
                        userIds: zod_1.z.array(zod_1.z.string()),
                        channel: zod_1.z.enum(['email', 'sms', 'telegram', 'push', 'in_app']),
                        subject: zod_1.z.string(),
                        content: zod_1.z.string(),
                        campaignName: zod_1.z.string().optional()
                    });
                    _a = schema.parse(req.body), userIds = _a.userIds, channel = _a.channel, subject = _a.subject, content = _a.content, campaignName = _a.campaignName;
                    return [4 /*yield*/, crmService_1.crmService.sendNotificationToUsers(userIds, channel, subject, content, campaignName)];
                case 1:
                    result = _e.sent();
                    adminId = ((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.claims) === null || _c === void 0 ? void 0 : _c.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            action: 'send_notifications',
                            entityType: 'notification_campaign',
                            entityId: (_d = result.campaignId) === null || _d === void 0 ? void 0 : _d.toString(),
                            details: { userCount: userIds.length, channel: channel, subject: subject }
                        })];
                case 2:
                    _e.sent();
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_14 = _e.sent();
                    console.error("Error sending notifications:", error_14);
                    res.status(500).json({ message: "Failed to send notifications", error: error_14.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Admin action logs
    app.get("/api/crm/admin-logs", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, adminId, _b, limit, logs, error_15;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _a = req.query, adminId = _a.adminId, _b = _a.limit, limit = _b === void 0 ? 100 : _b;
                    return [4 /*yield*/, crmService_1.crmService.getAdminLogs(adminId, parseInt(limit))];
                case 1:
                    logs = _c.sent();
                    res.json(logs);
                    return [3 /*break*/, 3];
                case 2:
                    error_15 = _c.sent();
                    console.error("Error fetching admin logs:", error_15);
                    res.status(500).json({ message: "Failed to fetch admin logs", error: error_15.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // KYC verification
    app.post("/api/crm/kyc-verify", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, _a, userId, documents, result, adminId, error_16;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 3, , 4]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        documents: zod_1.z.array(zod_1.z.object({
                            type: zod_1.z.string(),
                            fileName: zod_1.z.string(),
                            fileUrl: zod_1.z.string(),
                            documentNumber: zod_1.z.string().optional()
                        }))
                    });
                    _a = schema.parse(req.body), userId = _a.userId, documents = _a.documents;
                    return [4 /*yield*/, crmService_1.crmService.performKYCCheck(userId, documents)];
                case 1:
                    result = _d.sent();
                    adminId = ((_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.claims) === null || _c === void 0 ? void 0 : _c.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            targetUserId: userId,
                            action: 'kyc_verification',
                            entityType: 'kyc',
                            entityId: userId,
                            details: { documentCount: documents.length }
                        })];
                case 2:
                    _d.sent();
                    res.json(result);
                    return [3 /*break*/, 4];
                case 3:
                    error_16 = _d.sent();
                    console.error("Error performing KYC verification:", error_16);
                    res.status(500).json({ message: "Failed to perform KYC verification", error: error_16.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Create risk alert
    app.post("/api/crm/risk-alerts", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var schema, alertData, alert_2, error_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    schema = zod_1.z.object({
                        userId: zod_1.z.string(),
                        alertType: zod_1.z.string(),
                        severity: zod_1.z.enum(['low', 'medium', 'high', 'critical']),
                        title: zod_1.z.string(),
                        description: zod_1.z.string(),
                        data: zod_1.z.any().optional()
                    });
                    alertData = schema.parse(req.body);
                    return [4 /*yield*/, crmService_1.crmService.createRiskAlert(alertData)];
                case 1:
                    alert_2 = _a.sent();
                    res.json(alert_2);
                    return [3 /*break*/, 3];
                case 2:
                    error_17 = _a.sent();
                    console.error("Error creating risk alert:", error_17);
                    res.status(500).json({ message: "Failed to create risk alert", error: error_17.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Assign support ticket
    app.put("/api/crm/support-tickets/:ticketId/assign", replitAuth_1.isAuthenticated, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var ticketId, assignedTo, ticket, adminId, error_18;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    ticketId = req.params.ticketId;
                    assignedTo = req.body.assignedTo;
                    return [4 /*yield*/, crmService_1.crmService.assignTicket(parseInt(ticketId), assignedTo)];
                case 1:
                    ticket = _c.sent();
                    adminId = ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.claims) === null || _b === void 0 ? void 0 : _b.sub) || 'admin';
                    return [4 /*yield*/, crmService_1.crmService.logAdminAction({
                            adminId: adminId,
                            action: 'assign_ticket',
                            entityType: 'support_ticket',
                            entityId: ticketId,
                            details: { assignedTo: assignedTo }
                        })];
                case 2:
                    _c.sent();
                    res.json(ticket);
                    return [3 /*break*/, 4];
                case 3:
                    error_18 = _c.sent();
                    console.error("Error assigning ticket:", error_18);
                    res.status(500).json({ message: "Failed to assign ticket", error: error_18.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
