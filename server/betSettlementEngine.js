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
exports.betSettlementEngine = exports.BetSettlementEngine = void 0;
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var events_1 = require("events");
var BetSettlementEngine = /** @class */ (function (_super) {
    __extends(BetSettlementEngine, _super);
    function BetSettlementEngine() {
        var _this = _super.call(this) || this;
        _this.settlementRules = new Map();
        _this.isRunning = false;
        _this.settlementInterval = null;
        _this.initializeSettlementRules();
        _this.startSettlementService();
        return _this;
    }
    BetSettlementEngine.prototype.initializeSettlementRules = function () {
        // 1X2 (Match Winner) Settlement
        this.settlementRules.set('1x2', function (bet, matchResult) {
            var _a = matchResult.finalScore, home = _a.home, away = _a.away;
            var winningSelection = '';
            if (home > away)
                winningSelection = 'home';
            else if (away > home)
                winningSelection = 'away';
            else
                winningSelection = 'draw';
            var isWin = bet.selection === winningSelection;
            return {
                betId: bet.id,
                status: isWin ? 'won' : 'lost',
                winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
                settlementData: {
                    finalScore: matchResult.finalScore,
                    winningSelection: winningSelection,
                    settledAt: new Date().toISOString()
                }
            };
        });
        // Over/Under Goals Settlement
        this.settlementRules.set('over_under', function (bet, matchResult) {
            var _a = matchResult.finalScore, home = _a.home, away = _a.away;
            var totalGoals = home + away;
            // Extract the line from selection (e.g., "over_2.5" -> 2.5)
            var line = parseFloat(bet.selection.split('_')[1]);
            var isOver = bet.selection.startsWith('over');
            var isWin = false;
            if (isOver) {
                isWin = totalGoals > line;
            }
            else {
                isWin = totalGoals < line;
            }
            return {
                betId: bet.id,
                status: isWin ? 'won' : 'lost',
                winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
                settlementData: {
                    finalScore: matchResult.finalScore,
                    totalGoals: totalGoals,
                    line: line,
                    settledAt: new Date().toISOString()
                }
            };
        });
        // Handicap Settlement
        this.settlementRules.set('handicap', function (bet, matchResult) {
            var _a = matchResult.finalScore, home = _a.home, away = _a.away;
            // Extract handicap value (e.g., "home_-1.5" -> -1.5)
            var handicapMatch = bet.selection.match(/(home|away)_([+-]?\d+\.?\d*)/);
            if (!handicapMatch) {
                return {
                    betId: bet.id,
                    status: 'cancelled',
                    settlementData: { error: 'Invalid handicap format' }
                };
            }
            var team = handicapMatch[1];
            var handicap = parseFloat(handicapMatch[2]);
            var adjustedHome = home;
            var adjustedAway = away;
            if (team === 'home') {
                adjustedHome += handicap;
            }
            else {
                adjustedAway += handicap;
            }
            var isWin = false;
            if (team === 'home') {
                isWin = adjustedHome > adjustedAway;
            }
            else {
                isWin = adjustedAway > adjustedHome;
            }
            return {
                betId: bet.id,
                status: isWin ? 'won' : 'lost',
                winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
                settlementData: {
                    finalScore: matchResult.finalScore,
                    handicap: handicap,
                    adjustedScore: { home: adjustedHome, away: adjustedAway },
                    settledAt: new Date().toISOString()
                }
            };
        });
        // Both Teams to Score
        this.settlementRules.set('btts', function (bet, matchResult) {
            var _a = matchResult.finalScore, home = _a.home, away = _a.away;
            var bothScored = home > 0 && away > 0;
            var isWin = (bet.selection === 'yes' && bothScored) ||
                (bet.selection === 'no' && !bothScored);
            return {
                betId: bet.id,
                status: isWin ? 'won' : 'lost',
                winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
                settlementData: {
                    finalScore: matchResult.finalScore,
                    bothScored: bothScored,
                    settledAt: new Date().toISOString()
                }
            };
        });
    };
    BetSettlementEngine.prototype.startSettlementService = function () {
        var _this = this;
        if (this.isRunning)
            return;
        this.isRunning = true;
        console.log('🔧 Bet Settlement Engine started');
        // Run settlement every 30 seconds
        this.settlementInterval = setInterval(function () {
            _this.processSettlements();
        }, 30000);
        // Process immediately on start
        this.processSettlements();
    };
    BetSettlementEngine.prototype.processSettlements = function () {
        return __awaiter(this, void 0, void 0, function () {
            var finishedMatches, _i, finishedMatches_1, match, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.enhancedMatches)
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedMatches.status, 'finished'))];
                    case 1:
                        finishedMatches = _a.sent();
                        _i = 0, finishedMatches_1 = finishedMatches;
                        _a.label = 2;
                    case 2:
                        if (!(_i < finishedMatches_1.length)) return [3 /*break*/, 5];
                        match = finishedMatches_1[_i];
                        return [4 /*yield*/, this.settleMatchBets(match)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        console.error('Settlement processing error:', error_1);
                        this.emit('error', error_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BetSettlementEngine.prototype.settleMatchBets = function (match) {
        return __awaiter(this, void 0, void 0, function () {
            var pendingBets, matchResult, _i, pendingBets_1, bet, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.enhancedBets)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.enhancedBets.matchId, match.id), (0, drizzle_orm_1.eq)(schema_1.enhancedBets.status, 'pending')))];
                    case 1:
                        pendingBets = _a.sent();
                        if (pendingBets.length === 0)
                            return [2 /*return*/];
                        matchResult = {
                            matchId: match.id,
                            finalScore: { home: match.score1, away: match.score2 },
                            status: 'finished',
                            markets: this.generateMarketResults(match)
                        };
                        console.log("\u26A1 Settling ".concat(pendingBets.length, " bets for match ").concat(match.team1, " vs ").concat(match.team2));
                        _i = 0, pendingBets_1 = pendingBets;
                        _a.label = 2;
                    case 2:
                        if (!(_i < pendingBets_1.length)) return [3 /*break*/, 5];
                        bet = pendingBets_1[_i];
                        return [4 /*yield*/, this.settleBet(bet, matchResult)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        this.emit('matchSettled', {
                            matchId: match.id,
                            betsSettled: pendingBets.length,
                            match: "".concat(match.team1, " vs ").concat(match.team2)
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.error("Error settling bets for match ".concat(match.id, ":"), error_2);
                        this.emit('settlementError', { matchId: match.id, error: error_2 });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BetSettlementEngine.prototype.settleBet = function (bet, matchResult) {
        return __awaiter(this, void 0, void 0, function () {
            var settlementRule, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        settlementRule = this.settlementRules.get(bet.market);
                        if (!settlementRule) {
                            console.warn("No settlement rule for market: ".concat(bet.market));
                            return [2 /*return*/];
                        }
                        result = settlementRule(bet, matchResult);
                        // Update bet status
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.enhancedBets)
                                .set({
                                status: result.status,
                                settledAt: new Date(),
                                autoSettled: true,
                                settlementData: result.settlementData
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedBets.id, bet.id))];
                    case 1:
                        // Update bet status
                        _a.sent();
                        if (!(result.status === 'won' && result.winAmount && result.winAmount > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.creditWinnings(bet.userId, result.winAmount, bet.id)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: 
                    // Record settlement transaction
                    return [4 /*yield*/, db_1.db.insert(schema_1.transactions).values({
                            userId: bet.userId,
                            type: result.status === 'won' ? 'win' : 'bet_loss',
                            amount: result.status === 'won' ? (result.winAmount || 0).toString() : '0',
                            description: "Bet settlement: ".concat(bet.market, " - ").concat(result.status),
                            status: 'completed'
                        })];
                    case 4:
                        // Record settlement transaction
                        _a.sent();
                        this.emit('betSettled', {
                            betId: bet.id,
                            userId: bet.userId,
                            status: result.status,
                            winAmount: result.winAmount || 0
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.error("Error settling bet ".concat(bet.id, ":"), error_3);
                        this.emit('betError', { betId: bet.id, error: error_3 });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BetSettlementEngine.prototype.creditWinnings = function (userId, amount, betId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Update user balance
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.users)
                                .set({
                                balance: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " + ", ""], ["", " + ", ""])), schema_1.users.balance, amount)
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))];
                    case 1:
                        // Update user balance
                        _a.sent();
                        console.log("\uD83D\uDCB0 Credited ".concat(amount, " to user ").concat(userId, " for bet ").concat(betId));
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error("Error crediting winnings:", error_4);
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BetSettlementEngine.prototype.generateMarketResults = function (match) {
        var home = match.score1, away = match.score2;
        var totalGoals = home + away;
        return {
            '1x2': {
                result: home > away ? 'home' : away > home ? 'away' : 'draw'
            },
            'over_under': {
                result: "total_".concat(totalGoals),
                totalGoals: totalGoals
            },
            'btts': {
                result: home > 0 && away > 0 ? 'yes' : 'no'
            }
        };
    };
    // Manual settlement for edge cases
    BetSettlementEngine.prototype.manualSettlement = function (betId, status, winAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var bet, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.enhancedBets)
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedBets.id, betId))
                                .limit(1)];
                    case 1:
                        bet = _a.sent();
                        if (!bet[0]) {
                            throw new Error("Bet ".concat(betId, " not found"));
                        }
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.enhancedBets)
                                .set({
                                status: status,
                                settledAt: new Date(),
                                autoSettled: false,
                                settlementData: {
                                    manualSettlement: true,
                                    settledAt: new Date().toISOString(),
                                    reason: 'Manual intervention'
                                }
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedBets.id, betId))];
                    case 2:
                        _a.sent();
                        if (!(status === 'won' && winAmount && bet[0].userId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.creditWinnings(bet[0].userId, winAmount, betId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        console.log("\uD83D\uDCCB Manual settlement completed for bet ".concat(betId, ": ").concat(status));
                        this.emit('manualSettlement', {
                            betId: betId,
                            status: status,
                            winAmount: winAmount || 0
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error("Manual settlement error:", error_5);
                        throw error_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BetSettlementEngine.prototype.getSettlementStats = function () {
        return {
            isRunning: this.isRunning,
            availableMarkets: Array.from(this.settlementRules.keys()),
            lastProcessed: new Date().toISOString()
        };
    };
    BetSettlementEngine.prototype.stopSettlementService = function () {
        if (this.settlementInterval) {
            clearInterval(this.settlementInterval);
            this.settlementInterval = null;
        }
        this.isRunning = false;
        console.log('🛑 Bet Settlement Engine stopped');
    };
    return BetSettlementEngine;
}(events_1.EventEmitter));
exports.BetSettlementEngine = BetSettlementEngine;
exports.betSettlementEngine = new BetSettlementEngine();
var templateObject_1;
