"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.crmService = exports.CrmService = void 0;
var db_1 = require("./db");
var drizzle_orm_1 = require("drizzle-orm");
var crmSchema_1 = require("@shared/crmSchema");
var schema_1 = require("@shared/schema");
var CrmService = /** @class */ (function () {
    function CrmService() {
    }
    // User Profile Management
    CrmService.prototype.getUserProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var profiles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(crmSchema_1.crmUserProfiles)
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmUserProfiles.userId, userId))
                            .limit(1)];
                    case 1:
                        profiles = _a.sent();
                        return [2 /*return*/, profiles[0] || null];
                }
            });
        });
    };
    CrmService.prototype.createUserProfile = function (profileData) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(crmSchema_1.crmUserProfiles)
                            .values(profileData)
                            .returning()];
                    case 1:
                        profile = (_a.sent())[0];
                        // Log the admin action
                        return [4 /*yield*/, this.logAdminAction({
                                adminId: 'system',
                                action: 'create_user_profile',
                                entityType: 'user_profile',
                                entityId: profile.id.toString(),
                                details: { userId: profileData.userId }
                            })];
                    case 2:
                        // Log the admin action
                        _a.sent();
                        return [2 /*return*/, profile];
                }
            });
        });
    };
    CrmService.prototype.updateUserProfile = function (userId, updates) {
        return __awaiter(this, void 0, void 0, function () {
            var profile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(crmSchema_1.crmUserProfiles)
                            .set(__assign(__assign({}, updates), { updatedAt: new Date() }))
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmUserProfiles.userId, userId))
                            .returning()];
                    case 1:
                        profile = (_a.sent())[0];
                        return [2 /*return*/, profile];
                }
            });
        });
    };
    CrmService.prototype.getUsersBySegment = function (segment_1) {
        return __awaiter(this, arguments, void 0, function (segment, limit) {
            var query;
            if (limit === void 0) { limit = 100; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.db
                            .select({
                            id: crmSchema_1.crmUserProfiles.id,
                            userId: crmSchema_1.crmUserProfiles.userId,
                            email: schema_1.users.email,
                            fullName: crmSchema_1.crmUserProfiles.fullName,
                            userSegment: crmSchema_1.crmUserProfiles.userSegment,
                            kycStatus: crmSchema_1.crmUserProfiles.kycStatus,
                            riskLevel: crmSchema_1.crmUserProfiles.riskLevel,
                            complianceStatus: crmSchema_1.crmUserProfiles.complianceStatus,
                            totalDeposits: crmSchema_1.crmUserProfiles.totalDeposits,
                            lifetimeValue: crmSchema_1.crmUserProfiles.lifetimeValue,
                            lastLoginAt: crmSchema_1.crmUserProfiles.lastLoginAt
                        })
                            .from(crmSchema_1.crmUserProfiles)
                            .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.users.id, crmSchema_1.crmUserProfiles.userId))
                            .limit(limit);
                        if (!(segment === 'all')) return [3 /*break*/, 2];
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, query.where((0, drizzle_orm_1.eq)(crmSchema_1.crmUserProfiles.userSegment, segment))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Risk & Alert Management
    CrmService.prototype.createRiskAlert = function (alertData) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(crmSchema_1.crmRiskAlerts)
                            .values(alertData)
                            .returning()];
                    case 1:
                        alert = (_a.sent())[0];
                        return [2 /*return*/, alert];
                }
            });
        });
    };
    CrmService.prototype.getRiskAlerts = function (userId_1, severity_1) {
        return __awaiter(this, arguments, void 0, function (userId, severity, resolved) {
            var query, conditions;
            if (resolved === void 0) { resolved = false; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.db.select().from(crmSchema_1.crmRiskAlerts);
                        conditions = [];
                        if (userId)
                            conditions.push((0, drizzle_orm_1.eq)(crmSchema_1.crmRiskAlerts.userId, userId));
                        if (severity)
                            conditions.push((0, drizzle_orm_1.eq)(crmSchema_1.crmRiskAlerts.severity, severity));
                        if (resolved !== undefined)
                            conditions.push((0, drizzle_orm_1.eq)(crmSchema_1.crmRiskAlerts.isResolved, resolved));
                        if (conditions.length > 0) {
                            query = query.where(drizzle_orm_1.and.apply(void 0, conditions));
                        }
                        return [4 /*yield*/, query.orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmRiskAlerts.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.resolveRiskAlert = function (alertId, resolvedBy, notes) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(crmSchema_1.crmRiskAlerts)
                            .set({
                            isResolved: true,
                            resolvedBy: resolvedBy,
                            resolvedAt: new Date(),
                            resolutionNotes: notes
                        })
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmRiskAlerts.id, alertId))
                            .returning()];
                    case 1:
                        alert = (_a.sent())[0];
                        return [2 /*return*/, alert];
                }
            });
        });
    };
    // Transaction Monitoring
    CrmService.prototype.createTransaction = function (transactionData) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(crmSchema_1.crmTransactions)
                            .values(transactionData)
                            .returning()];
                    case 1:
                        transaction = (_a.sent())[0];
                        // Check for suspicious patterns
                        return [4 /*yield*/, this.checkTransactionRisk(transaction)];
                    case 2:
                        // Check for suspicious patterns
                        _a.sent();
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    CrmService.prototype.getTransactionHistory = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, limit) {
            if (limit === void 0) { limit = 50; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(crmSchema_1.crmTransactions)
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmTransactions.userId, userId))
                            .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmTransactions.createdAt))
                            .limit(limit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.getFlaggedTransactions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            transaction: crmSchema_1.crmTransactions,
                            userProfile: crmSchema_1.crmUserProfiles
                        })
                            .from(crmSchema_1.crmTransactions)
                            .leftJoin(crmSchema_1.crmUserProfiles, (0, drizzle_orm_1.eq)(crmSchema_1.crmUserProfiles.userId, crmSchema_1.crmTransactions.userId))
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmTransactions.isAmlFlagged, true))
                            .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmTransactions.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.checkTransactionRisk = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var risks, recentTransactions, usdValue;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        risks = [];
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(crmSchema_1.crmTransactions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(crmSchema_1.crmTransactions.userId, transaction.userId), (0, drizzle_orm_1.gte)(crmSchema_1.crmTransactions.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))))];
                    case 1:
                        recentTransactions = _b.sent();
                        if (recentTransactions.length > 10) {
                            risks.push('high_frequency_transactions');
                        }
                        usdValue = parseFloat(((_a = transaction.usdValue) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
                        if (usdValue > 10000) {
                            risks.push('large_transaction');
                        }
                        if (!(risks.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createRiskAlert({
                                userId: transaction.userId,
                                alertType: 'transaction_risk',
                                severity: 'medium',
                                title: 'Suspicious Transaction Pattern',
                                description: "Transaction flagged for: ".concat(risks.join(', ')),
                                data: { transactionId: transaction.id, risks: risks }
                            })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Support Ticket Management
    CrmService.prototype.createSupportTicket = function (ticketData) {
        return __awaiter(this, void 0, void 0, function () {
            var ticketNumber, ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ticketNumber = "TKT-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 4).toUpperCase());
                        return [4 /*yield*/, db_1.db
                                .insert(crmSchema_1.crmSupportTickets)
                                .values(__assign(__assign({}, ticketData), { ticketNumber: ticketNumber }))
                                .returning()];
                    case 1:
                        ticket = (_a.sent())[0];
                        return [2 /*return*/, ticket];
                }
            });
        });
    };
    CrmService.prototype.getTicketsByUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(crmSchema_1.crmSupportTickets)
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmSupportTickets.userId, userId))
                            .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmSupportTickets.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.getOpenTickets = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            ticket: crmSchema_1.crmSupportTickets,
                            userProfile: crmSchema_1.crmUserProfiles
                        })
                            .from(crmSchema_1.crmSupportTickets)
                            .leftJoin(crmSchema_1.crmUserProfiles, (0, drizzle_orm_1.eq)(crmSchema_1.crmUserProfiles.userId, crmSchema_1.crmSupportTickets.userId))
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmSupportTickets.status, 'open'))
                            .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmSupportTickets.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.assignTicket = function (ticketId, assignedTo) {
        return __awaiter(this, void 0, void 0, function () {
            var ticket;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(crmSchema_1.crmSupportTickets)
                            .set({
                            assignedTo: assignedTo,
                            assignedAt: new Date(),
                            status: 'in_progress'
                        })
                            .where((0, drizzle_orm_1.eq)(crmSchema_1.crmSupportTickets.id, ticketId))
                            .returning()];
                    case 1:
                        ticket = (_a.sent())[0];
                        return [2 /*return*/, ticket];
                }
            });
        });
    };
    // Admin Action Logging
    CrmService.prototype.logAdminAction = function (actionData) {
        return __awaiter(this, void 0, void 0, function () {
            var log;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(crmSchema_1.crmAdminLogs)
                            .values(actionData)
                            .returning()];
                    case 1:
                        log = (_a.sent())[0];
                        return [2 /*return*/, log];
                }
            });
        });
    };
    CrmService.prototype.getAdminLogs = function (adminId_1) {
        return __awaiter(this, arguments, void 0, function (adminId, limit) {
            var query;
            if (limit === void 0) { limit = 100; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.db.select().from(crmSchema_1.crmAdminLogs);
                        if (adminId) {
                            query = query.where((0, drizzle_orm_1.eq)(crmSchema_1.crmAdminLogs.adminId, adminId));
                        }
                        return [4 /*yield*/, query
                                .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmAdminLogs.createdAt))
                                .limit(limit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Analytics & Reporting
    CrmService.prototype.getUserAnalytics = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, transactions, bettingHistory, riskAlerts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserProfile(userId)];
                    case 1:
                        profile = _a.sent();
                        return [4 /*yield*/, this.getTransactionHistory(userId, 100)];
                    case 2:
                        transactions = _a.sent();
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(crmSchema_1.crmBettingHistory)
                                .where((0, drizzle_orm_1.eq)(crmSchema_1.crmBettingHistory.userId, userId))
                                .orderBy((0, drizzle_orm_1.desc)(crmSchema_1.crmBettingHistory.betPlacedAt))
                                .limit(50)];
                    case 3:
                        bettingHistory = _a.sent();
                        return [4 /*yield*/, this.getRiskAlerts(userId)];
                    case 4:
                        riskAlerts = _a.sent();
                        return [2 /*return*/, {
                                profile: profile,
                                transactions: {
                                    total: transactions.length,
                                    volume: transactions.reduce(function (sum, t) { var _a; return sum + parseFloat(((_a = t.usdValue) === null || _a === void 0 ? void 0 : _a.toString()) || '0'); }, 0),
                                    recent: transactions.slice(0, 10)
                                },
                                betting: {
                                    totalBets: bettingHistory.length,
                                    totalWagered: bettingHistory.reduce(function (sum, b) { var _a; return sum + parseFloat(((_a = b.stakeUsdValue) === null || _a === void 0 ? void 0 : _a.toString()) || '0'); }, 0),
                                    totalWon: bettingHistory.reduce(function (sum, b) { var _a; return sum + parseFloat(((_a = b.actualWin) === null || _a === void 0 ? void 0 : _a.toString()) || '0'); }, 0),
                                    recent: bettingHistory.slice(0, 10)
                                },
                                risks: {
                                    totalAlerts: riskAlerts.length,
                                    openAlerts: riskAlerts.filter(function (a) { return !a.isResolved; }).length,
                                    highRiskAlerts: riskAlerts.filter(function (a) { return a.severity === 'high' || a.severity === 'critical'; }).length
                                }
                            }];
                }
            });
        });
    };
    CrmService.prototype.getPlatformAnalytics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersBySegment, kycDistribution, riskDistribution, last30Days, recentTransactionVolume, openAlertsCount, openTicketsCount;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            segment: crmSchema_1.crmUserProfiles.userSegment,
                            count: (0, drizzle_orm_1.count)()
                        })
                            .from(crmSchema_1.crmUserProfiles)
                            .groupBy(crmSchema_1.crmUserProfiles.userSegment)];
                    case 1:
                        usersBySegment = _c.sent();
                        return [4 /*yield*/, db_1.db
                                .select({
                                status: crmSchema_1.crmUserProfiles.kycStatus,
                                count: (0, drizzle_orm_1.count)()
                            })
                                .from(crmSchema_1.crmUserProfiles)
                                .groupBy(crmSchema_1.crmUserProfiles.kycStatus)];
                    case 2:
                        kycDistribution = _c.sent();
                        return [4 /*yield*/, db_1.db
                                .select({
                                level: crmSchema_1.crmUserProfiles.riskLevel,
                                count: (0, drizzle_orm_1.count)()
                            })
                                .from(crmSchema_1.crmUserProfiles)
                                .groupBy(crmSchema_1.crmUserProfiles.riskLevel)];
                    case 3:
                        riskDistribution = _c.sent();
                        last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
                        return [4 /*yield*/, db_1.db
                                .select({
                                totalVolume: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SUM(CAST(", " AS DECIMAL))"], ["SUM(CAST(", " AS DECIMAL))"])), crmSchema_1.crmTransactions.usdValue),
                                transactionCount: (0, drizzle_orm_1.count)()
                            })
                                .from(crmSchema_1.crmTransactions)
                                .where((0, drizzle_orm_1.gte)(crmSchema_1.crmTransactions.createdAt, last30Days))];
                    case 4:
                        recentTransactionVolume = _c.sent();
                        return [4 /*yield*/, db_1.db
                                .select({ count: (0, drizzle_orm_1.count)() })
                                .from(crmSchema_1.crmRiskAlerts)
                                .where((0, drizzle_orm_1.eq)(crmSchema_1.crmRiskAlerts.isResolved, false))];
                    case 5:
                        openAlertsCount = _c.sent();
                        return [4 /*yield*/, db_1.db
                                .select({ count: (0, drizzle_orm_1.count)() })
                                .from(crmSchema_1.crmSupportTickets)
                                .where((0, drizzle_orm_1.eq)(crmSchema_1.crmSupportTickets.status, 'open'))];
                    case 6:
                        openTicketsCount = _c.sent();
                        return [2 /*return*/, {
                                users: {
                                    bySegment: usersBySegment,
                                    kycDistribution: kycDistribution,
                                    riskDistribution: riskDistribution
                                },
                                transactions: recentTransactionVolume[0] || { totalVolume: 0, transactionCount: 0 },
                                alerts: ((_a = openAlertsCount[0]) === null || _a === void 0 ? void 0 : _a.count) || 0,
                                support: ((_b = openTicketsCount[0]) === null || _b === void 0 ? void 0 : _b.count) || 0
                            }];
                }
            });
        });
    };
    // Compliance & AML Functions
    CrmService.prototype.flagUserForAML = function (userId, reason, adminId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Update user profile
                    return [4 /*yield*/, this.updateUserProfile(userId, {
                            complianceStatus: 'flagged',
                            riskLevel: 'high'
                        })];
                    case 1:
                        // Update user profile
                        _a.sent();
                        // Create risk alert
                        return [4 /*yield*/, this.createRiskAlert({
                                userId: userId,
                                alertType: 'aml_flag',
                                severity: 'high',
                                title: 'AML Flag Applied',
                                description: reason,
                                data: { flaggedBy: adminId, timestamp: new Date() }
                            })];
                    case 2:
                        // Create risk alert
                        _a.sent();
                        // Log admin action
                        return [4 /*yield*/, this.logAdminAction({
                                adminId: adminId,
                                targetUserId: userId,
                                action: 'flag_user_aml',
                                entityType: 'user',
                                entityId: userId,
                                details: { reason: reason }
                            })];
                    case 3:
                        // Log admin action
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CrmService.prototype.performKYCCheck = function (userId, documents) {
        return __awaiter(this, void 0, void 0, function () {
            var profile, kycResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserProfile(userId)];
                    case 1:
                        profile = _a.sent();
                        if (!profile)
                            throw new Error('User profile not found');
                        kycResult = {
                            status: 'verified',
                            documents: documents.map(function (doc) { return (__assign(__assign({}, doc), { verifiedAt: new Date(), status: 'approved' })); })
                        };
                        // Update user profile
                        return [4 /*yield*/, this.updateUserProfile(userId, {
                                kycStatus: 'advanced',
                                documentsUploaded: kycResult.documents,
                                documentVerificationDate: new Date()
                            })];
                    case 2:
                        // Update user profile
                        _a.sent();
                        return [2 /*return*/, kycResult];
                }
            });
        });
    };
    // Notification Management
    CrmService.prototype.sendNotificationToUsers = function (userIds, channel, subject, content, campaignName) {
        return __awaiter(this, void 0, void 0, function () {
            var campaignId, campaign, notifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!campaignName) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.db
                                .insert(crmSchema_1.crmNotificationCampaigns)
                                .values({
                                name: campaignName,
                                channel: channel,
                                subject: subject,
                                content: content,
                                totalTargeted: userIds.length,
                                createdBy: 'system'
                            })
                                .returning()];
                    case 1:
                        campaign = (_a.sent())[0];
                        campaignId = campaign.id;
                        _a.label = 2;
                    case 2:
                        notifications = userIds.map(function (userId) { return ({
                            campaignId: campaignId,
                            userId: userId,
                            channel: channel,
                            subject: subject,
                            content: content,
                            status: 'sent',
                            sentAt: new Date()
                        }); });
                        return [4 /*yield*/, db_1.db.insert(crmSchema_1.crmNotificationLogs).values(notifications)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { sent: userIds.length, campaignId: campaignId }];
                }
            });
        });
    };
    // Utility Functions
    CrmService.prototype.searchUsers = function (query_1) {
        return __awaiter(this, arguments, void 0, function (query, limit) {
            if (limit === void 0) { limit = 50; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            id: crmSchema_1.crmUserProfiles.id,
                            userId: crmSchema_1.crmUserProfiles.userId,
                            email: schema_1.users.email,
                            fullName: crmSchema_1.crmUserProfiles.fullName,
                            userSegment: crmSchema_1.crmUserProfiles.userSegment,
                            kycStatus: crmSchema_1.crmUserProfiles.kycStatus,
                            riskLevel: crmSchema_1.crmUserProfiles.riskLevel
                        })
                            .from(crmSchema_1.crmUserProfiles)
                            .leftJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.users.id, crmSchema_1.crmUserProfiles.userId))
                            .where((0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " ILIKE ", " OR ", " ILIKE ", ""], ["", " ILIKE ", " OR ", " ILIKE ", ""])), schema_1.users.email, '%' + query + '%', crmSchema_1.crmUserProfiles.fullName, '%' + query + '%'))
                            .limit(limit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CrmService.prototype.updateUserSegmentation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, _i, users_1, user, newSegment, totalDeposits, totalWagered, daysSinceLogin;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({
                            userId: crmSchema_1.crmUserProfiles.userId,
                            totalDeposits: crmSchema_1.crmUserProfiles.totalDeposits,
                            totalWagered: crmSchema_1.crmUserProfiles.totalWagered,
                            lastLoginAt: crmSchema_1.crmUserProfiles.lastLoginAt,
                            bettingFrequency: crmSchema_1.crmUserProfiles.bettingFrequency
                        })
                            .from(crmSchema_1.crmUserProfiles)];
                    case 1:
                        users = _c.sent();
                        _i = 0, users_1 = users;
                        _c.label = 2;
                    case 2:
                        if (!(_i < users_1.length)) return [3 /*break*/, 5];
                        user = users_1[_i];
                        newSegment = 'casual';
                        totalDeposits = parseFloat(((_a = user.totalDeposits) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
                        totalWagered = parseFloat(((_b = user.totalWagered) === null || _b === void 0 ? void 0 : _b.toString()) || '0');
                        daysSinceLogin = user.lastLoginAt ?
                            Math.floor((Date.now() - user.lastLoginAt.getTime()) / (24 * 60 * 60 * 1000)) : 999;
                        // Segmentation logic
                        if (totalDeposits > 50000 || totalWagered > 100000) {
                            newSegment = 'high_roller';
                        }
                        else if (totalDeposits > 10000 || totalWagered > 25000) {
                            newSegment = 'vip';
                        }
                        else if (daysSinceLogin > 30) {
                            newSegment = 'churned';
                        }
                        else if (daysSinceLogin > 7) {
                            newSegment = 'at_risk';
                        }
                        else if (totalDeposits < 100) {
                            newSegment = 'new';
                        }
                        return [4 /*yield*/, this.updateUserProfile(user.userId, {
                                userSegment: newSegment
                            })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CrmService;
}());
exports.CrmService = CrmService;
exports.crmService = new CrmService();
var templateObject_1, templateObject_2;
