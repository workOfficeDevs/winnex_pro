"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.responsibleGamblingService = exports.ResponsibleGamblingService = void 0;
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var events_1 = require("events");
var ResponsibleGamblingService = /** @class */ (function (_super) {
    __extends(ResponsibleGamblingService, _super);
    function ResponsibleGamblingService() {
        var _this = _super.call(this) || this;
        _this.activeSessions = new Map();
        _this.limitCheckInterval = null;
        _this.isMonitoring = false;
        _this.startMonitoring();
        return _this;
    }
    ResponsibleGamblingService.prototype.startMonitoring = function () {
        var _this = this;
        if (this.isMonitoring)
            return;
        this.isMonitoring = true;
        console.log('🛡️ Responsible Gambling Service started');
        // Check limits every 5 minutes
        this.limitCheckInterval = setInterval(function () {
            _this.performLimitChecks();
        }, 300000);
    };
    ResponsibleGamblingService.prototype.performLimitChecks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allUsers, _i, allUsers_1, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, db_1.db.select().from(schema_1.users)];
                    case 1:
                        allUsers = _a.sent();
                        _i = 0, allUsers_1 = allUsers;
                        _a.label = 2;
                    case 2:
                        if (!(_i < allUsers_1.length)) return [3 /*break*/, 5];
                        user = allUsers_1[_i];
                        return [4 /*yield*/, this.checkUserLimits(user.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Limit checking error:', error_1);
                        this.emit('error', error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Set user limits
    ResponsibleGamblingService.prototype.setUserLimits = function (userId, limits) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __generator(this, function (_o) {
                switch (_o.label) {
                    case 0:
                        _o.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .insert(schema_1.userLimits)
                                .values({
                                userId: userId,
                                dailyDepositLimit: (_a = limits.dailyDepositLimit) === null || _a === void 0 ? void 0 : _a.toString(),
                                weeklyDepositLimit: (_b = limits.weeklyDepositLimit) === null || _b === void 0 ? void 0 : _b.toString(),
                                monthlyDepositLimit: (_c = limits.monthlyDepositLimit) === null || _c === void 0 ? void 0 : _c.toString(),
                                dailyBetLimit: (_d = limits.dailyBetLimit) === null || _d === void 0 ? void 0 : _d.toString(),
                                weeklyBetLimit: (_e = limits.weeklyBetLimit) === null || _e === void 0 ? void 0 : _e.toString(),
                                monthlyBetLimit: (_f = limits.monthlyBetLimit) === null || _f === void 0 ? void 0 : _f.toString(),
                                sessionTimeLimit: limits.sessionTimeLimit,
                                isActive: true
                            })
                                .onConflictDoUpdate({
                                target: schema_1.userLimits.userId,
                                set: {
                                    dailyDepositLimit: (_g = limits.dailyDepositLimit) === null || _g === void 0 ? void 0 : _g.toString(),
                                    weeklyDepositLimit: (_h = limits.weeklyDepositLimit) === null || _h === void 0 ? void 0 : _h.toString(),
                                    monthlyDepositLimit: (_j = limits.monthlyDepositLimit) === null || _j === void 0 ? void 0 : _j.toString(),
                                    dailyBetLimit: (_k = limits.dailyBetLimit) === null || _k === void 0 ? void 0 : _k.toString(),
                                    weeklyBetLimit: (_l = limits.weeklyBetLimit) === null || _l === void 0 ? void 0 : _l.toString(),
                                    monthlyBetLimit: (_m = limits.monthlyBetLimit) === null || _m === void 0 ? void 0 : _m.toString(),
                                    sessionTimeLimit: limits.sessionTimeLimit,
                                    updatedAt: new Date()
                                }
                            })];
                    case 1:
                        _o.sent();
                        console.log("\uD83D\uDD12 Updated limits for user ".concat(userId));
                        this.emit('limitsUpdated', { userId: userId, limits: limits });
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _o.sent();
                        console.error('Error setting user limits:', error_2);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Check if deposit is allowed
    ResponsibleGamblingService.prototype.checkDepositLimit = function (userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var limits, dailyDeposits, dailyLimit, weeklyDeposits, weeklyLimit, monthlyDeposits, monthlyLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserLimits(userId)];
                    case 1:
                        limits = _a.sent();
                        if (!limits) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'deposit',
                                    period: 'daily',
                                    currentAmount: 0,
                                    limitAmount: 0,
                                    remaining: amount,
                                    isExceeded: false
                                }];
                        }
                        return [4 /*yield*/, this.getDepositSum(userId, 'daily')];
                    case 2:
                        dailyDeposits = _a.sent();
                        dailyLimit = parseFloat(limits.dailyDepositLimit || '0');
                        if (dailyLimit > 0 && (dailyDeposits + amount) > dailyLimit) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'deposit',
                                    period: 'daily',
                                    currentAmount: dailyDeposits,
                                    limitAmount: dailyLimit,
                                    remaining: Math.max(0, dailyLimit - dailyDeposits),
                                    isExceeded: true
                                }];
                        }
                        return [4 /*yield*/, this.getDepositSum(userId, 'weekly')];
                    case 3:
                        weeklyDeposits = _a.sent();
                        weeklyLimit = parseFloat(limits.weeklyDepositLimit || '0');
                        if (weeklyLimit > 0 && (weeklyDeposits + amount) > weeklyLimit) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'deposit',
                                    period: 'weekly',
                                    currentAmount: weeklyDeposits,
                                    limitAmount: weeklyLimit,
                                    remaining: Math.max(0, weeklyLimit - weeklyDeposits),
                                    isExceeded: true
                                }];
                        }
                        return [4 /*yield*/, this.getDepositSum(userId, 'monthly')];
                    case 4:
                        monthlyDeposits = _a.sent();
                        monthlyLimit = parseFloat(limits.monthlyDepositLimit || '0');
                        if (monthlyLimit > 0 && (monthlyDeposits + amount) > monthlyLimit) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'deposit',
                                    period: 'monthly',
                                    currentAmount: monthlyDeposits,
                                    limitAmount: monthlyLimit,
                                    remaining: Math.max(0, monthlyLimit - monthlyDeposits),
                                    isExceeded: true
                                }];
                        }
                        return [2 /*return*/, {
                                userId: userId,
                                limitType: 'deposit',
                                period: 'daily',
                                currentAmount: dailyDeposits,
                                limitAmount: dailyLimit,
                                remaining: dailyLimit > 0 ? dailyLimit - dailyDeposits - amount : amount,
                                isExceeded: false
                            }];
                }
            });
        });
    };
    // Check if bet is allowed
    ResponsibleGamblingService.prototype.checkBetLimit = function (userId, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var limits, dailyBets, dailyLimit, weeklyBets, weeklyLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getUserLimits(userId)];
                    case 1:
                        limits = _a.sent();
                        if (!limits) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'bet',
                                    period: 'daily',
                                    currentAmount: 0,
                                    limitAmount: 0,
                                    remaining: amount,
                                    isExceeded: false
                                }];
                        }
                        return [4 /*yield*/, this.getBetSum(userId, 'daily')];
                    case 2:
                        dailyBets = _a.sent();
                        dailyLimit = parseFloat(limits.dailyBetLimit || '0');
                        if (dailyLimit > 0 && (dailyBets + amount) > dailyLimit) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'bet',
                                    period: 'daily',
                                    currentAmount: dailyBets,
                                    limitAmount: dailyLimit,
                                    remaining: Math.max(0, dailyLimit - dailyBets),
                                    isExceeded: true
                                }];
                        }
                        return [4 /*yield*/, this.getBetSum(userId, 'weekly')];
                    case 3:
                        weeklyBets = _a.sent();
                        weeklyLimit = parseFloat(limits.weeklyBetLimit || '0');
                        if (weeklyLimit > 0 && (weeklyBets + amount) > weeklyLimit) {
                            return [2 /*return*/, {
                                    userId: userId,
                                    limitType: 'bet',
                                    period: 'weekly',
                                    currentAmount: weeklyBets,
                                    limitAmount: weeklyLimit,
                                    remaining: Math.max(0, weeklyLimit - weeklyBets),
                                    isExceeded: true
                                }];
                        }
                        return [2 /*return*/, {
                                userId: userId,
                                limitType: 'bet',
                                period: 'daily',
                                currentAmount: dailyBets,
                                limitAmount: dailyLimit,
                                remaining: dailyLimit > 0 ? dailyLimit - dailyBets - amount : amount,
                                isExceeded: false
                            }];
                }
            });
        });
    };
    // Start user session
    ResponsibleGamblingService.prototype.startSession = function (userId) {
        var sessionData = {
            userId: userId,
            startTime: new Date(),
            duration: 0,
            betsPlaced: 0,
            totalWagered: 0
        };
        this.activeSessions.set(userId, sessionData);
        this.emit('sessionStarted', { userId: userId, startTime: sessionData.startTime });
        console.log("\uD83C\uDFAE Session started for user ".concat(userId));
    };
    // End user session
    ResponsibleGamblingService.prototype.endSession = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var session, endTime, duration;
            return __generator(this, function (_a) {
                session = this.activeSessions.get(userId);
                if (!session)
                    return [2 /*return*/];
                endTime = new Date();
                duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 60000);
                this.activeSessions.delete(userId);
                this.emit('sessionEnded', {
                    userId: userId,
                    duration: duration,
                    betsPlaced: session.betsPlaced,
                    totalWagered: session.totalWagered
                });
                console.log("\uD83D\uDED1 Session ended for user ".concat(userId, " - Duration: ").concat(duration, " minutes"));
                return [2 /*return*/];
            });
        });
    };
    // Check session time limit
    ResponsibleGamblingService.prototype.checkSessionLimit = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var session, limits, currentDuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = this.activeSessions.get(userId);
                        if (!session)
                            return [2 /*return*/, true]; // No active session
                        return [4 /*yield*/, this.getUserLimits(userId)];
                    case 1:
                        limits = _a.sent();
                        if (!limits || !limits.sessionTimeLimit)
                            return [2 /*return*/, true]; // No time limit set
                        currentDuration = Math.floor((Date.now() - session.startTime.getTime()) / 60000);
                        if (!(currentDuration >= limits.sessionTimeLimit)) return [3 /*break*/, 3];
                        this.emit('sessionLimitExceeded', {
                            userId: userId,
                            duration: currentDuration,
                            limit: limits.sessionTimeLimit
                        });
                        return [4 /*yield*/, this.endSession(userId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    // Update session with bet data
    ResponsibleGamblingService.prototype.updateSessionBet = function (userId, betAmount) {
        var session = this.activeSessions.get(userId);
        if (session) {
            session.betsPlaced++;
            session.totalWagered += betAmount;
            session.duration = Math.floor((Date.now() - session.startTime.getTime()) / 60000);
        }
    };
    // Get user's current limits
    ResponsibleGamblingService.prototype.getUserLimits = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var limits, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.userLimits)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userLimits.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userLimits.isActive, true)))
                                .limit(1)];
                    case 1:
                        limits = _a.sent();
                        return [2 /*return*/, limits[0] || null];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error getting user limits:', error_3);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get deposit sum for period
    ResponsibleGamblingService.prototype.getDepositSum = function (userId, period) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, result, error_4;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        startDate = this.getPeriodStartDate(period);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                total: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["COALESCE(SUM(", "), 0)"], ["COALESCE(SUM(", "), 0)"])), schema_1.transactions.amount)
                            })
                                .from(schema_1.transactions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactions.userId, userId), (0, drizzle_orm_1.eq)(schema_1.transactions.type, 'deposit'), (0, drizzle_orm_1.eq)(schema_1.transactions.status, 'completed'), (0, drizzle_orm_1.gte)(schema_1.transactions.createdAt, startDate)))];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, parseFloat(((_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) === null || _b === void 0 ? void 0 : _b.toString()) || '0')];
                    case 3:
                        error_4 = _c.sent();
                        console.error('Error getting deposit sum:', error_4);
                        return [2 /*return*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get bet sum for period
    ResponsibleGamblingService.prototype.getBetSum = function (userId, period) {
        return __awaiter(this, void 0, void 0, function () {
            var startDate, result, error_5;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        startDate = this.getPeriodStartDate(period);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                total: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["COALESCE(SUM(", "), 0)"], ["COALESCE(SUM(", "), 0)"])), schema_1.enhancedBets.stake)
                            })
                                .from(schema_1.enhancedBets)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.enhancedBets.userId, userId), (0, drizzle_orm_1.gte)(schema_1.enhancedBets.placedAt, startDate)))];
                    case 2:
                        result = _c.sent();
                        return [2 /*return*/, parseFloat(((_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.total) === null || _b === void 0 ? void 0 : _b.toString()) || '0')];
                    case 3:
                        error_5 = _c.sent();
                        console.error('Error getting bet sum:', error_5);
                        return [2 /*return*/, 0];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ResponsibleGamblingService.prototype.getPeriodStartDate = function (period) {
        var now = new Date();
        switch (period) {
            case 'daily':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            case 'weekly':
                var startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
                return startOfWeek;
            case 'monthly':
                return new Date(now.getFullYear(), now.getMonth(), 1);
            default:
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
    };
    // Check all user limits
    ResponsibleGamblingService.prototype.checkUserLimits = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var limits, dailyDeposits, dailyDepositLimit, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getUserLimits(userId)];
                    case 1:
                        limits = _a.sent();
                        if (!limits)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.getDepositSum(userId, 'daily')];
                    case 2:
                        dailyDeposits = _a.sent();
                        dailyDepositLimit = parseFloat(limits.dailyDepositLimit || '0');
                        if (dailyDepositLimit > 0 && dailyDeposits >= dailyDepositLimit * 0.8) {
                            this.emit('limitWarning', {
                                userId: userId,
                                type: 'deposit',
                                period: 'daily',
                                current: dailyDeposits,
                                limit: dailyDepositLimit,
                                percentage: (dailyDeposits / dailyDepositLimit) * 100
                            });
                        }
                        // Check session time
                        return [4 /*yield*/, this.checkSessionLimit(userId)];
                    case 3:
                        // Check session time
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_6 = _a.sent();
                        console.error("Error checking limits for user ".concat(userId, ":"), error_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Get user's limit status
    ResponsibleGamblingService.prototype.getLimitStatus = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var limits, status_1, error_7;
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.getUserLimits(userId)];
                    case 1:
                        limits = _j.sent();
                        if (!limits)
                            return [2 /*return*/, null];
                        _a = {};
                        _b = {};
                        _c = {};
                        return [4 /*yield*/, this.getDepositSum(userId, 'daily')];
                    case 2:
                        _b.daily = (_c.current = _j.sent(),
                            _c.limit = parseFloat(limits.dailyDepositLimit || '0'),
                            _c);
                        _d = {};
                        return [4 /*yield*/, this.getDepositSum(userId, 'weekly')];
                    case 3:
                        _b.weekly = (_d.current = _j.sent(),
                            _d.limit = parseFloat(limits.weeklyDepositLimit || '0'),
                            _d);
                        _e = {};
                        return [4 /*yield*/, this.getDepositSum(userId, 'monthly')];
                    case 4:
                        _a.deposits = (_b.monthly = (_e.current = _j.sent(),
                            _e.limit = parseFloat(limits.monthlyDepositLimit || '0'),
                            _e),
                            _b);
                        _f = {};
                        _g = {};
                        return [4 /*yield*/, this.getBetSum(userId, 'daily')];
                    case 5:
                        _f.daily = (_g.current = _j.sent(),
                            _g.limit = parseFloat(limits.dailyBetLimit || '0'),
                            _g);
                        _h = {};
                        return [4 /*yield*/, this.getBetSum(userId, 'weekly')];
                    case 6:
                        status_1 = (_a.bets = (_f.weekly = (_h.current = _j.sent(),
                            _h.limit = parseFloat(limits.weeklyBetLimit || '0'),
                            _h),
                            _f),
                            _a.session = {
                                timeLimit: limits.sessionTimeLimit,
                                currentSession: this.activeSessions.get(userId)
                            },
                            _a);
                        return [2 /*return*/, status_1];
                    case 7:
                        error_7 = _j.sent();
                        console.error('Error getting limit status:', error_7);
                        return [2 /*return*/, null];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ResponsibleGamblingService.prototype.stopMonitoring = function () {
        if (this.limitCheckInterval) {
            clearInterval(this.limitCheckInterval);
            this.limitCheckInterval = null;
        }
        this.isMonitoring = false;
        console.log('🛑 Responsible Gambling monitoring stopped');
    };
    return ResponsibleGamblingService;
}(events_1.EventEmitter));
exports.ResponsibleGamblingService = ResponsibleGamblingService;
exports.responsibleGamblingService = new ResponsibleGamblingService();
var templateObject_1, templateObject_2;
