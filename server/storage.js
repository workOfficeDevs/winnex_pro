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
exports.storage = exports.DatabaseStorage = void 0;
var schema_1 = require("@shared/schema");
var db_1 = require("./db");
var drizzle_orm_1 = require("drizzle-orm");
var DatabaseStorage = /** @class */ (function () {
    function DatabaseStorage() {
    }
    // User operations (mandatory for Replit Auth)
    DatabaseStorage.prototype.getUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id))];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    DatabaseStorage.prototype.upsertUser = function (userData) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .insert(schema_1.users)
                            .values(userData)
                            .onConflictDoUpdate({
                            target: schema_1.users.id,
                            set: __assign(__assign({}, userData), { updatedAt: new Date() }),
                        })
                            .returning()];
                    case 1:
                        user = (_a.sent())[0];
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // Sports operations
    DatabaseStorage.prototype.getAllSports = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.select().from(schema_1.sports).where((0, drizzle_orm_1.eq)(schema_1.sports.isActive, true))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.createSport = function (sportData) {
        return __awaiter(this, void 0, void 0, function () {
            var sport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.sports).values(sportData).returning()];
                    case 1:
                        sport = (_a.sent())[0];
                        return [2 /*return*/, sport];
                }
            });
        });
    };
    // Match operations
    DatabaseStorage.prototype.getMatches = function (filters) {
        return __awaiter(this, void 0, void 0, function () {
            var conditions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conditions = [];
                        if (filters === null || filters === void 0 ? void 0 : filters.sportId) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.matches.sportId, filters.sportId));
                        }
                        if ((filters === null || filters === void 0 ? void 0 : filters.live) !== undefined) {
                            conditions.push((0, drizzle_orm_1.eq)(schema_1.matches.isLive, filters.live));
                        }
                        if (!(conditions.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.db.select().from(schema_1.matches).where(drizzle_orm_1.and.apply(void 0, conditions)).orderBy((0, drizzle_orm_1.desc)(schema_1.matches.startTime))];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, db_1.db.select().from(schema_1.matches).orderBy((0, drizzle_orm_1.desc)(schema_1.matches.startTime))];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.createMatch = function (matchData) {
        return __awaiter(this, void 0, void 0, function () {
            var match;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.matches).values(matchData).returning()];
                    case 1:
                        match = (_a.sent())[0];
                        return [2 /*return*/, match];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateMatchScore = function (matchId, scoreField, newScore) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(schema_1.matches)
                            .set((_a = {}, _a[scoreField] = newScore, _a))
                            .where((0, drizzle_orm_1.eq)(schema_1.matches.id, matchId))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Odds operations
    DatabaseStorage.prototype.getMatchOdds = function (matchId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.odds)
                            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.odds.matchId, matchId), (0, drizzle_orm_1.eq)(schema_1.odds.isActive, true)))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.createOdds = function (oddsData) {
        return __awaiter(this, void 0, void 0, function () {
            var odd;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.odds).values(oddsData).returning()];
                    case 1:
                        odd = (_a.sent())[0];
                        return [2 /*return*/, odd];
                }
            });
        });
    };
    DatabaseStorage.prototype.updateOdds = function (oddsId, newOdds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .update(schema_1.odds)
                            .set({ odds: newOdds, updatedAt: new Date() })
                            .where((0, drizzle_orm_1.eq)(schema_1.odds.id, oddsId))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Betting operations
    DatabaseStorage.prototype.placeBet = function (betData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                            var userResult, user, currentBalance, stakeAmount, bet;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tx.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, betData.userId))];
                                    case 1:
                                        userResult = _a.sent();
                                        user = userResult[0];
                                        if (!user) {
                                            throw new Error("User not found");
                                        }
                                        currentBalance = parseFloat(user.balance || "0");
                                        stakeAmount = parseFloat(betData.stake);
                                        if (currentBalance < stakeAmount) {
                                            throw new Error("Insufficient balance");
                                        }
                                        // Deduct stake from user balance
                                        return [4 /*yield*/, tx
                                                .update(schema_1.users)
                                                .set({ balance: (currentBalance - stakeAmount).toFixed(2) })
                                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, betData.userId))];
                                    case 2:
                                        // Deduct stake from user balance
                                        _a.sent();
                                        return [4 /*yield*/, tx.insert(schema_1.bets).values(betData).returning()];
                                    case 3:
                                        bet = (_a.sent())[0];
                                        // Create transaction record
                                        return [4 /*yield*/, tx.insert(schema_1.transactions).values({
                                                userId: betData.userId,
                                                type: "bet",
                                                amount: "-".concat(betData.stake),
                                                description: "Bet placed: ".concat(betData.selection),
                                                status: "completed",
                                            })];
                                    case 4:
                                        // Create transaction record
                                        _a.sent();
                                        return [2 /*return*/, bet];
                                }
                            });
                        }); })];
                    case 1: 
                    // Start a transaction to ensure atomic operations
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.getUserBets = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.bets)
                            .where((0, drizzle_orm_1.eq)(schema_1.bets.userId, userId))
                            .orderBy((0, drizzle_orm_1.desc)(schema_1.bets.placedAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // Transaction operations
    DatabaseStorage.prototype.getUserTransactions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.transactions)
                            .where((0, drizzle_orm_1.eq)(schema_1.transactions.userId, userId))
                            .orderBy((0, drizzle_orm_1.desc)(schema_1.transactions.createdAt))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DatabaseStorage.prototype.createTransaction = function (transactionData) {
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db.insert(schema_1.transactions).values(transactionData).returning()];
                    case 1:
                        transaction = (_a.sent())[0];
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    // Admin operations
    DatabaseStorage.prototype.getAdminStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            var today, revenueResult, oneHourAgo, activeUsersResult, totalBetsResult, riskExposureResult;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return [4 /*yield*/, db_1.db
                                .select({
                                total: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["COALESCE(SUM(CAST(amount AS DECIMAL)), 0)"], ["COALESCE(SUM(CAST(amount AS DECIMAL)), 0)"]))),
                            })
                                .from(schema_1.transactions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.transactions.type, "bet"), (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["created_at >= ", ""], ["created_at >= ", ""])), today)))];
                    case 1:
                        revenueResult = _e.sent();
                        oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
                        return [4 /*yield*/, db_1.db
                                .select({
                                count: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["COUNT(DISTINCT user_id)"], ["COUNT(DISTINCT user_id)"]))),
                            })
                                .from(schema_1.bets)
                                .where((0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["placed_at >= ", ""], ["placed_at >= ", ""])), oneHourAgo))];
                    case 2:
                        activeUsersResult = _e.sent();
                        return [4 /*yield*/, db_1.db
                                .select({
                                count: (0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"]))),
                            })
                                .from(schema_1.bets)
                                .where((0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["placed_at >= ", ""], ["placed_at >= ", ""])), today))];
                    case 3:
                        totalBetsResult = _e.sent();
                        return [4 /*yield*/, db_1.db
                                .select({
                                total: (0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["COALESCE(SUM(CAST(potential_win AS DECIMAL)), 0)"], ["COALESCE(SUM(CAST(potential_win AS DECIMAL)), 0)"]))),
                            })
                                .from(schema_1.bets)
                                .where((0, drizzle_orm_1.eq)(schema_1.bets.status, "pending"))];
                    case 4:
                        riskExposureResult = _e.sent();
                        return [2 /*return*/, {
                                revenue: {
                                    today: Math.abs(((_a = revenueResult[0]) === null || _a === void 0 ? void 0 : _a.total) || 0).toFixed(0),
                                },
                                users: {
                                    active: ((_b = activeUsersResult[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
                                },
                                bets: {
                                    total: ((_c = totalBetsResult[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
                                },
                                risk: {
                                    exposure: (((_d = riskExposureResult[0]) === null || _d === void 0 ? void 0 : _d.total) || 0).toFixed(0) + "K",
                                },
                            }];
                }
            });
        });
    };
    return DatabaseStorage;
}());
exports.DatabaseStorage = DatabaseStorage;
exports.storage = new DatabaseStorage();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
