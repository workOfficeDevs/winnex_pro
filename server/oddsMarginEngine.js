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
exports.oddsMarginEngine = exports.OddsMarginEngine = void 0;
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var events_1 = require("events");
var OddsMarginEngine = /** @class */ (function (_super) {
    __extends(OddsMarginEngine, _super);
    function OddsMarginEngine() {
        var _this = _super.call(this) || this;
        _this.marginConfigs = new Map();
        _this.isRunning = false;
        _this.adjustmentInterval = null;
        _this.initializeMarginConfigs();
        _this.startMarginEngine();
        return _this;
    }
    OddsMarginEngine.prototype.initializeMarginConfigs = function () {
        var _this = this;
        // Default margin configurations for different sports and markets
        var defaultConfigs = [
            // Football margins
            { sportId: 1, market: '1x2', baseMargin: 5.5, dynamicAdjustment: true, minMargin: 3.0, maxMargin: 8.0 },
            { sportId: 1, market: 'over_under', baseMargin: 4.5, dynamicAdjustment: true, minMargin: 2.5, maxMargin: 7.0 },
            { sportId: 1, market: 'handicap', baseMargin: 5.0, dynamicAdjustment: true, minMargin: 3.0, maxMargin: 7.5 },
            { sportId: 1, market: 'btts', baseMargin: 6.0, dynamicAdjustment: true, minMargin: 4.0, maxMargin: 8.5 },
            // Basketball margins
            { sportId: 2, market: '1x2', baseMargin: 4.0, dynamicAdjustment: true, minMargin: 2.5, maxMargin: 6.5 },
            { sportId: 2, market: 'over_under', baseMargin: 3.5, dynamicAdjustment: true, minMargin: 2.0, maxMargin: 6.0 },
            { sportId: 2, market: 'handicap', baseMargin: 4.5, dynamicAdjustment: true, minMargin: 2.5, maxMargin: 7.0 },
            // Soccer margins
            { sportId: 3, market: '1x2', baseMargin: 6.0, dynamicAdjustment: true, minMargin: 4.0, maxMargin: 9.0 },
            { sportId: 3, market: 'over_under', baseMargin: 5.0, dynamicAdjustment: true, minMargin: 3.0, maxMargin: 8.0 },
            { sportId: 3, market: 'handicap', baseMargin: 5.5, dynamicAdjustment: true, minMargin: 3.5, maxMargin: 8.5 },
            // Tennis margins
            { sportId: 4, market: '1x2', baseMargin: 3.5, dynamicAdjustment: true, minMargin: 2.0, maxMargin: 6.0 },
            { sportId: 4, market: 'over_under', baseMargin: 4.0, dynamicAdjustment: true, minMargin: 2.5, maxMargin: 6.5 },
            // Baseball margins
            { sportId: 5, market: '1x2', baseMargin: 4.5, dynamicAdjustment: true, minMargin: 3.0, maxMargin: 7.0 },
            { sportId: 5, market: 'over_under', baseMargin: 4.0, dynamicAdjustment: true, minMargin: 2.5, maxMargin: 6.5 }
        ];
        defaultConfigs.forEach(function (config) {
            var key = "".concat(config.sportId, "-").concat(config.market);
            _this.marginConfigs.set(key, config);
        });
        console.log("\uD83D\uDCCA Initialized ".concat(defaultConfigs.length, " margin configurations"));
    };
    OddsMarginEngine.prototype.startMarginEngine = function () {
        var _this = this;
        if (this.isRunning)
            return;
        this.isRunning = true;
        console.log('⚙️ Odds Margin Engine started');
        // Run margin adjustments every 60 seconds
        this.adjustmentInterval = setInterval(function () {
            _this.processMarginAdjustments();
        }, 60000);
        // Process immediately on start
        this.processMarginAdjustments();
    };
    OddsMarginEngine.prototype.processMarginAdjustments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var activeOdds, adjustments, _i, activeOdds_1, record, odds, match, adjustment, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                odds: schema_1.enhancedOdds,
                                match: schema_1.enhancedMatches
                            })
                                .from(schema_1.enhancedOdds)
                                .leftJoin(schema_1.enhancedMatches, (0, drizzle_orm_1.eq)(schema_1.enhancedOdds.matchId, schema_1.enhancedMatches.id))
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.enhancedOdds.isActive, true), (0, drizzle_orm_1.eq)(schema_1.enhancedMatches.status, 'scheduled')))];
                    case 1:
                        activeOdds = _a.sent();
                        adjustments = [];
                        _i = 0, activeOdds_1 = activeOdds;
                        _a.label = 2;
                    case 2:
                        if (!(_i < activeOdds_1.length)) return [3 /*break*/, 5];
                        record = activeOdds_1[_i];
                        odds = record.odds, match = record.match;
                        if (!match)
                            return [3 /*break*/, 4];
                        return [4 /*yield*/, this.calculateMarginAdjustment(odds, match)];
                    case 3:
                        adjustment = _a.sent();
                        if (adjustment) {
                            adjustments.push(adjustment);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!(adjustments.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.applyMarginAdjustments(adjustments)];
                    case 6:
                        _a.sent();
                        console.log("\uD83D\uDCC8 Applied ".concat(adjustments.length, " margin adjustments"));
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        error_1 = _a.sent();
                        console.error('Margin adjustment processing error:', error_1);
                        this.emit('error', error_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OddsMarginEngine.prototype.calculateMarginAdjustment = function (odds, match) {
        return __awaiter(this, void 0, void 0, function () {
            var configKey, config, targetMargin, reason, adjustments, adjustedOdds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configKey = "".concat(match.sportId, "-").concat(odds.market);
                        config = this.marginConfigs.get(configKey);
                        if (!config) {
                            // Use default margin if no specific config
                            return [2 /*return*/, this.applyDefaultMargin(odds)];
                        }
                        targetMargin = config.baseMargin;
                        reason = 'Base margin';
                        if (!config.dynamicAdjustment) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDynamicAdjustments(odds, match, config)];
                    case 1:
                        adjustments = _a.sent();
                        targetMargin += adjustments.total;
                        reason = adjustments.reasons.join(', ');
                        // Clamp to min/max bounds
                        targetMargin = Math.max(config.minMargin, Math.min(config.maxMargin, targetMargin));
                        _a.label = 2;
                    case 2:
                        adjustedOdds = this.applyMarginToOdds(parseFloat(odds.baseOdds), targetMargin);
                        // Only return adjustment if odds changed significantly (> 0.01)
                        if (Math.abs(adjustedOdds - parseFloat(odds.adjustedOdds)) > 0.01) {
                            return [2 /*return*/, {
                                    oddsId: odds.id,
                                    originalOdds: parseFloat(odds.baseOdds),
                                    adjustedOdds: adjustedOdds,
                                    margin: targetMargin,
                                    reason: reason
                                }];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    OddsMarginEngine.prototype.getDynamicAdjustments = function (odds, match, config) {
        return __awaiter(this, void 0, void 0, function () {
            var adjustments, timeToMatch, hoursToMatch, volume, oddsValue;
            return __generator(this, function (_a) {
                adjustments = { total: 0, reasons: [] };
                try {
                    timeToMatch = new Date(match.startTime).getTime() - Date.now();
                    hoursToMatch = timeToMatch / (1000 * 60 * 60);
                    if (hoursToMatch < 1) {
                        adjustments.total += 1.5;
                        adjustments.reasons.push('Last hour premium');
                    }
                    else if (hoursToMatch < 6) {
                        adjustments.total += 0.8;
                        adjustments.reasons.push('Pre-match premium');
                    }
                    else if (hoursToMatch < 24) {
                        adjustments.total += 0.3;
                        adjustments.reasons.push('Same day adjustment');
                    }
                    volume = parseFloat(odds.volume);
                    if (volume > 10000) {
                        adjustments.total += 0.5;
                        adjustments.reasons.push('High volume');
                    }
                    else if (volume < 1000) {
                        adjustments.total -= 0.3;
                        adjustments.reasons.push('Low volume incentive');
                    }
                    // Match popularity adjustments
                    if (match.isFeatured) {
                        adjustments.total += 0.4;
                        adjustments.reasons.push('Featured match');
                    }
                    if (match.betCount > 100) {
                        adjustments.total += 0.3;
                        adjustments.reasons.push('Popular betting');
                    }
                    oddsValue = parseFloat(odds.baseOdds);
                    if (oddsValue < 1.2) {
                        adjustments.total += 1.0;
                        adjustments.reasons.push('Heavy favorite risk');
                    }
                    else if (oddsValue > 10.0) {
                        adjustments.total += 0.8;
                        adjustments.reasons.push('Long shot premium');
                    }
                }
                catch (error) {
                    console.error('Error calculating dynamic adjustments:', error);
                }
                return [2 /*return*/, adjustments];
            });
        });
    };
    OddsMarginEngine.prototype.applyDefaultMargin = function (odds) {
        var defaultMargin = 5.0; // 5% default margin
        var adjustedOdds = this.applyMarginToOdds(parseFloat(odds.baseOdds), defaultMargin);
        return {
            oddsId: odds.id,
            originalOdds: parseFloat(odds.baseOdds),
            adjustedOdds: adjustedOdds,
            margin: defaultMargin,
            reason: 'Default margin (no config)'
        };
    };
    OddsMarginEngine.prototype.applyMarginToOdds = function (baseOdds, marginPercentage) {
        // Convert decimal odds to implied probability
        var impliedProbability = 1 / baseOdds;
        // Add margin to probability
        var adjustedProbability = impliedProbability * (1 + marginPercentage / 100);
        // Convert back to decimal odds
        var adjustedOdds = 1 / adjustedProbability;
        // Round to 2 decimal places
        return Math.round(adjustedOdds * 100) / 100;
    };
    OddsMarginEngine.prototype.applyMarginAdjustments = function (adjustments) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, adjustments_1, adjustment, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        _i = 0, adjustments_1 = adjustments;
                        _a.label = 1;
                    case 1:
                        if (!(_i < adjustments_1.length)) return [3 /*break*/, 4];
                        adjustment = adjustments_1[_i];
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.enhancedOdds)
                                .set({
                                adjustedOdds: adjustment.adjustedOdds.toString(),
                                margin: adjustment.margin.toString(),
                                updatedAt: new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedOdds.id, adjustment.oddsId))];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.emit('marginsAdjusted', {
                            count: adjustments.length,
                            timestamp: new Date().toISOString()
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error('Error applying margin adjustments:', error_2);
                        this.emit('adjustmentError', error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Public methods for margin management
    OddsMarginEngine.prototype.setMarginConfig = function (sportId, market, config) {
        return __awaiter(this, void 0, void 0, function () {
            var key, existingConfig, updatedConfig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = "".concat(sportId, "-").concat(market);
                        existingConfig = this.marginConfigs.get(key) || {
                            sportId: sportId,
                            market: market,
                            baseMargin: 5.0,
                            dynamicAdjustment: true,
                            minMargin: 2.0,
                            maxMargin: 10.0
                        };
                        updatedConfig = __assign(__assign({}, existingConfig), config);
                        this.marginConfigs.set(key, updatedConfig);
                        // Store in database
                        return [4 /*yield*/, db_1.db
                                .insert(schema_1.oddsMargins)
                                .values({
                                sportId: sportId,
                                market: market,
                                marginPercentage: updatedConfig.baseMargin.toString(),
                                isActive: true
                            })
                                .onConflictDoUpdate({
                                target: [schema_1.oddsMargins.sportId, schema_1.oddsMargins.market],
                                set: {
                                    marginPercentage: updatedConfig.baseMargin.toString(),
                                    updatedAt: new Date()
                                }
                            })];
                    case 1:
                        // Store in database
                        _a.sent();
                        console.log("\uD83D\uDCCB Updated margin config for ".concat(sportId, "-").concat(market, ": ").concat(updatedConfig.baseMargin, "%"));
                        return [2 /*return*/];
                }
            });
        });
    };
    OddsMarginEngine.prototype.getMarginAnalytics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var analytics, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                market: schema_1.enhancedOdds.market,
                                avgMargin: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["AVG(", ")"], ["AVG(", ")"])), schema_1.enhancedOdds.margin),
                                minMargin: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["MIN(", ")"], ["MIN(", ")"])), schema_1.enhancedOdds.margin),
                                maxMargin: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["MAX(", ")"], ["MAX(", ")"])), schema_1.enhancedOdds.margin),
                                totalVolume: (0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["SUM(", ")"], ["SUM(", ")"])), schema_1.enhancedOdds.volume),
                                count: (0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"])))
                            })
                                .from(schema_1.enhancedOdds)
                                .where((0, drizzle_orm_1.eq)(schema_1.enhancedOdds.isActive, true))
                                .groupBy(schema_1.enhancedOdds.market)];
                    case 1:
                        analytics = _a.sent();
                        return [2 /*return*/, analytics];
                    case 2:
                        error_3 = _a.sent();
                        console.error('Error getting margin analytics:', error_3);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OddsMarginEngine.prototype.getMarginConfigs = function () {
        return new Map(this.marginConfigs);
    };
    OddsMarginEngine.prototype.stopMarginEngine = function () {
        if (this.adjustmentInterval) {
            clearInterval(this.adjustmentInterval);
            this.adjustmentInterval = null;
        }
        this.isRunning = false;
        console.log('🛑 Odds Margin Engine stopped');
    };
    return OddsMarginEngine;
}(events_1.EventEmitter));
exports.OddsMarginEngine = OddsMarginEngine;
exports.oddsMarginEngine = new OddsMarginEngine();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
