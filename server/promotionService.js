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
exports.promotionService = exports.PromotionService = void 0;
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var events_1 = require("events");
var nanoid_1 = require("nanoid");
var PromotionService = /** @class */ (function (_super) {
    __extends(PromotionService, _super);
    function PromotionService() {
        var _this = _super.call(this) || this;
        _this.validationRules = new Map();
        _this.initializeValidationRules();
        console.log('🎁 Promotion Service initialized');
        return _this;
    }
    PromotionService.prototype.initializeValidationRules = function () {
        var _this = this;
        // Welcome bonus validation
        this.validationRules.set('welcome_bonus', function (userId, promotion) { return __awaiter(_this, void 0, void 0, function () {
            var existingBonus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.userPromotions)
                            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userPromotions.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, promotion.id)))
                            .limit(1)];
                    case 1:
                        existingBonus = _a.sent();
                        if (existingBonus.length > 0) {
                            return [2 /*return*/, { isValid: false, reason: 'Welcome bonus already claimed' }];
                        }
                        return [2 /*return*/, {
                                isValid: true,
                                bonusAmount: parseFloat(promotion.value),
                                promotion: promotion
                            }];
                }
            });
        }); });
        // Deposit match validation
        this.validationRules.set('deposit_match', function (userId, promotion, data) { return __awaiter(_this, void 0, void 0, function () {
            var minDeposit, bonusPercentage, bonusAmount, maxBonus;
            return __generator(this, function (_a) {
                if (!(data === null || data === void 0 ? void 0 : data.depositAmount)) {
                    return [2 /*return*/, { isValid: false, reason: 'Deposit amount required' }];
                }
                minDeposit = parseFloat(promotion.minDeposit || '0');
                if (data.depositAmount < minDeposit) {
                    return [2 /*return*/, { isValid: false, reason: "Minimum deposit required: ".concat(minDeposit) }];
                }
                bonusPercentage = parseFloat(promotion.value);
                bonusAmount = (data.depositAmount * bonusPercentage) / 100;
                maxBonus = parseFloat(promotion.maxBonus || '0');
                if (maxBonus > 0) {
                    bonusAmount = Math.min(bonusAmount, maxBonus);
                }
                return [2 /*return*/, {
                        isValid: true,
                        bonusAmount: bonusAmount,
                        promotion: promotion
                    }];
            });
        }); });
        // Free bet validation
        this.validationRules.set('free_bet', function (userId, promotion) { return __awaiter(_this, void 0, void 0, function () {
            var currentUsage, usageLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.db
                            .select({ count: (0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"]))) })
                            .from(schema_1.userPromotions)
                            .where((0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, promotion.id))];
                    case 1:
                        currentUsage = _a.sent();
                        usageLimit = promotion.usageLimit;
                        if (usageLimit && currentUsage[0].count >= usageLimit) {
                            return [2 /*return*/, { isValid: false, reason: 'Promotion usage limit reached' }];
                        }
                        return [2 /*return*/, {
                                isValid: true,
                                bonusAmount: parseFloat(promotion.value),
                                promotion: promotion
                            }];
                }
            });
        }); });
        // Odds boost validation
        this.validationRules.set('odds_boost', function (userId, promotion, data) { return __awaiter(_this, void 0, void 0, function () {
            var minBet, boostPercentage, boostedOdds, additionalValue;
            return __generator(this, function (_a) {
                if (!(data === null || data === void 0 ? void 0 : data.betAmount) || !(data === null || data === void 0 ? void 0 : data.odds)) {
                    return [2 /*return*/, { isValid: false, reason: 'Bet amount and odds required' }];
                }
                minBet = parseFloat(promotion.minDeposit || '0');
                if (data.betAmount < minBet) {
                    return [2 /*return*/, { isValid: false, reason: "Minimum bet required: ".concat(minBet) }];
                }
                boostPercentage = parseFloat(promotion.value);
                boostedOdds = data.odds * (1 + boostPercentage / 100);
                additionalValue = data.betAmount * (boostedOdds - data.odds);
                return [2 /*return*/, {
                        isValid: true,
                        bonusAmount: additionalValue,
                        promotion: promotion
                    }];
            });
        }); });
    };
    // Create new promotion
    PromotionService.prototype.createPromotion = function (promotionData) {
        return __awaiter(this, void 0, void 0, function () {
            var promotion, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .insert(schema_1.promotions)
                                .values({
                                code: promotionData.code.toUpperCase(),
                                title: promotionData.title,
                                description: promotionData.description,
                                type: promotionData.type,
                                value: promotionData.value.toString(),
                                minDeposit: (_a = promotionData.minDeposit) === null || _a === void 0 ? void 0 : _a.toString(),
                                maxBonus: (_b = promotionData.maxBonus) === null || _b === void 0 ? void 0 : _b.toString(),
                                validFrom: promotionData.validFrom,
                                validTo: promotionData.validTo,
                                usageLimit: promotionData.usageLimit,
                                isActive: true
                            })
                                .returning()];
                    case 1:
                        promotion = _c.sent();
                        console.log("\uD83C\uDF89 Created promotion: ".concat(promotionData.code, " - ").concat(promotionData.title));
                        this.emit('promotionCreated', promotion[0]);
                        return [2 /*return*/, promotion[0]];
                    case 2:
                        error_1 = _c.sent();
                        console.error('Error creating promotion:', error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Validate and apply promotion code
    PromotionService.prototype.applyPromotionCode = function (userId, code, data) {
        return __awaiter(this, void 0, void 0, function () {
            var promotion, existingUsage, validator, validation, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.promotions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.promotions.code, code.toUpperCase()), (0, drizzle_orm_1.eq)(schema_1.promotions.isActive, true), (0, drizzle_orm_1.lte)(schema_1.promotions.validFrom, new Date()), (0, drizzle_orm_1.gte)(schema_1.promotions.validTo, new Date())))
                                .limit(1)];
                    case 1:
                        promotion = _a.sent();
                        if (!promotion[0]) {
                            return [2 /*return*/, { isValid: false, reason: 'Invalid or expired promotion code' }];
                        }
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.userPromotions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userPromotions.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, promotion[0].id)))
                                .limit(1)];
                    case 2:
                        existingUsage = _a.sent();
                        if (existingUsage.length > 0) {
                            return [2 /*return*/, { isValid: false, reason: 'Promotion already used' }];
                        }
                        validator = this.validationRules.get(promotion[0].type);
                        if (!validator) {
                            return [2 /*return*/, { isValid: false, reason: 'Unsupported promotion type' }];
                        }
                        return [4 /*yield*/, validator(userId, promotion[0], data)];
                    case 3:
                        validation = _a.sent();
                        if (!validation.isValid) return [3 /*break*/, 5];
                        // Apply promotion
                        return [4 /*yield*/, this.grantPromotion(userId, promotion[0], validation.bonusAmount)];
                    case 4:
                        // Apply promotion
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, validation];
                    case 6:
                        error_2 = _a.sent();
                        console.error('Error applying promotion code:', error_2);
                        return [2 /*return*/, { isValid: false, reason: 'System error' }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Grant promotion to user
    PromotionService.prototype.grantPromotion = function (userId, promotion, bonusAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // Record user promotion
                        return [4 /*yield*/, db_1.db.insert(schema_1.userPromotions).values({
                                userId: userId,
                                promotionId: promotion.id,
                                status: 'active',
                                bonusAmount: bonusAmount.toString(),
                                usedAt: new Date()
                            })];
                    case 1:
                        // Record user promotion
                        _a.sent();
                        // Credit bonus to user account
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.users)
                                .set({
                                balance: (0, drizzle_orm_1.sql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["", " + ", ""], ["", " + ", ""])), schema_1.users.balance, bonusAmount)
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))];
                    case 2:
                        // Credit bonus to user account
                        _a.sent();
                        // Record transaction
                        return [4 /*yield*/, db_1.db.insert(schema_1.transactions).values({
                                userId: userId,
                                type: 'bonus',
                                amount: bonusAmount.toString(),
                                description: "Promotion bonus: ".concat(promotion.title),
                                status: 'completed'
                            })];
                    case 3:
                        // Record transaction
                        _a.sent();
                        // Update promotion usage count
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.promotions)
                                .set({
                                usageCount: (0, drizzle_orm_1.sql)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["", " + 1"], ["", " + 1"])), schema_1.promotions.usageCount)
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.promotions.id, promotion.id))];
                    case 4:
                        // Update promotion usage count
                        _a.sent();
                        console.log("\uD83D\uDCB0 Granted ".concat(bonusAmount, " bonus to user ").concat(userId, " for promotion ").concat(promotion.code));
                        this.emit('promotionGranted', {
                            userId: userId,
                            promotionCode: promotion.code,
                            bonusAmount: bonusAmount
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        console.error('Error granting promotion:', error_3);
                        throw error_3;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Create referral link
    PromotionService.prototype.createReferralLink = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var referralCode;
            return __generator(this, function (_a) {
                referralCode = (0, nanoid_1.nanoid)(8).toUpperCase();
                // Store referral code in user data (we could extend users table or create referral_codes table)
                console.log("\uD83D\uDD17 Created referral link for user ".concat(userId, ": REF-").concat(referralCode));
                return [2 /*return*/, "REF-".concat(referralCode)];
            });
        });
    };
    // Process referral signup
    PromotionService.prototype.processReferralSignup = function (refereeId, referralCode) {
        return __awaiter(this, void 0, void 0, function () {
            var referrerId, existingReferral, bonusAmount, referral, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.getReferrerFromCode(referralCode)];
                    case 1:
                        referrerId = _a.sent();
                        if (!referrerId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.referrals)
                                .where((0, drizzle_orm_1.eq)(schema_1.referrals.refereeId, refereeId))
                                .limit(1)];
                    case 2:
                        existingReferral = _a.sent();
                        if (existingReferral.length > 0) {
                            return [2 /*return*/, null]; // Already referred
                        }
                        bonusAmount = 25.00;
                        return [4 /*yield*/, db_1.db
                                .insert(schema_1.referrals)
                                .values({
                                referrerId: referrerId,
                                refereeId: refereeId,
                                status: 'pending',
                                bonusAmount: bonusAmount.toString()
                            })
                                .returning()];
                    case 3:
                        referral = _a.sent();
                        console.log("\uD83D\uDC65 Processed referral: ".concat(referrerId, " \u2192 ").concat(refereeId));
                        this.emit('referralCreated', {
                            referrerId: referrerId,
                            refereeId: refereeId,
                            bonusAmount: bonusAmount
                        });
                        return [2 /*return*/, {
                                referrerId: referrerId,
                                refereeId: refereeId,
                                bonusAmount: bonusAmount,
                                status: 'pending'
                            }];
                    case 4:
                        error_4 = _a.sent();
                        console.error('Error processing referral signup:', error_4);
                        return [2 /*return*/, null];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Complete referral (when referee makes first deposit/bet)
    PromotionService.prototype.completeReferral = function (refereeId_1) {
        return __awaiter(this, arguments, void 0, function (refereeId, qualifyingAmount) {
            var referral, bonusAmount, error_5;
            if (qualifyingAmount === void 0) { qualifyingAmount = 50; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.referrals)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.referrals.refereeId, refereeId), (0, drizzle_orm_1.eq)(schema_1.referrals.status, 'pending')))
                                .limit(1)];
                    case 1:
                        referral = _a.sent();
                        if (!referral[0])
                            return [2 /*return*/];
                        bonusAmount = parseFloat(referral[0].bonusAmount || '0');
                        // Credit bonus to referrer
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.users)
                                .set({
                                balance: (0, drizzle_orm_1.sql)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", " + ", ""], ["", " + ", ""])), schema_1.users.balance, bonusAmount)
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.users.id, referral[0].referrerId))];
                    case 2:
                        // Credit bonus to referrer
                        _a.sent();
                        // Update referral status
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.referrals)
                                .set({
                                status: 'completed',
                                paidAt: new Date()
                            })
                                .where((0, drizzle_orm_1.eq)(schema_1.referrals.id, referral[0].id))];
                    case 3:
                        // Update referral status
                        _a.sent();
                        // Record transaction
                        return [4 /*yield*/, db_1.db.insert(schema_1.transactions).values({
                                userId: referral[0].referrerId,
                                type: 'bonus',
                                amount: bonusAmount.toString(),
                                description: "Referral bonus for ".concat(refereeId),
                                status: 'completed'
                            })];
                    case 4:
                        // Record transaction
                        _a.sent();
                        console.log("\uD83C\uDF81 Completed referral bonus: ".concat(bonusAmount, " to ").concat(referral[0].referrerId));
                        this.emit('referralCompleted', {
                            referrerId: referral[0].referrerId,
                            refereeId: refereeId,
                            bonusAmount: bonusAmount
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_5 = _a.sent();
                        console.error('Error completing referral:', error_5);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Get user's active promotions
    PromotionService.prototype.getUserPromotions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var userPromos, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .select({
                                id: schema_1.userPromotions.id,
                                bonusAmount: schema_1.userPromotions.bonusAmount,
                                status: schema_1.userPromotions.status,
                                usedAt: schema_1.userPromotions.usedAt,
                                promotion: schema_1.promotions
                            })
                                .from(schema_1.userPromotions)
                                .leftJoin(schema_1.promotions, (0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, schema_1.promotions.id))
                                .where((0, drizzle_orm_1.eq)(schema_1.userPromotions.userId, userId))];
                    case 1:
                        userPromos = _a.sent();
                        return [2 /*return*/, userPromos];
                    case 2:
                        error_6 = _a.sent();
                        console.error('Error getting user promotions:', error_6);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get available promotions
    PromotionService.prototype.getAvailablePromotions = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var currentDate, availablePromos, usedPromos, usedIds_1, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        currentDate = new Date();
                        return [4 /*yield*/, db_1.db
                                .select()
                                .from(schema_1.promotions)
                                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.promotions.isActive, true), (0, drizzle_orm_1.lte)(schema_1.promotions.validFrom, currentDate), (0, drizzle_orm_1.gte)(schema_1.promotions.validTo, currentDate)))];
                    case 1:
                        availablePromos = _a.sent();
                        if (!userId) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1.db
                                .select({ promotionId: schema_1.userPromotions.promotionId })
                                .from(schema_1.userPromotions)
                                .where((0, drizzle_orm_1.eq)(schema_1.userPromotions.userId, userId))];
                    case 2:
                        usedPromos = _a.sent();
                        usedIds_1 = usedPromos.map(function (up) { return up.promotionId; });
                        availablePromos = availablePromos.filter(function (promo) { return !usedIds_1.includes(promo.id); });
                        _a.label = 3;
                    case 3: return [2 /*return*/, availablePromos];
                    case 4:
                        error_7 = _a.sent();
                        console.error('Error getting available promotions:', error_7);
                        return [2 /*return*/, []];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Get promotion analytics
    PromotionService.prototype.getPromotionAnalytics = function (promotionId) {
        return __awaiter(this, void 0, void 0, function () {
            var analytics, analytics, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!promotionId) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.db
                                .select({
                                promotionId: schema_1.userPromotions.promotionId,
                                totalUsage: (0, drizzle_orm_1.sql)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"]))),
                                totalBonusAmount: (0, drizzle_orm_1.sql)(templateObject_6 || (templateObject_6 = __makeTemplateObject(["SUM(", ")"], ["SUM(", ")"])), schema_1.userPromotions.bonusAmount),
                                activeUsers: (0, drizzle_orm_1.sql)(templateObject_7 || (templateObject_7 = __makeTemplateObject(["COUNT(DISTINCT ", ")"], ["COUNT(DISTINCT ", ")"])), schema_1.userPromotions.userId)
                            })
                                .from(schema_1.userPromotions)
                                .where((0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, promotionId))
                                .groupBy(schema_1.userPromotions.promotionId)];
                    case 1:
                        analytics = _a.sent();
                        return [2 /*return*/, analytics[0]];
                    case 2: return [4 /*yield*/, db_1.db
                            .select({
                            promotionId: schema_1.userPromotions.promotionId,
                            promotionCode: schema_1.promotions.code,
                            promotionTitle: schema_1.promotions.title,
                            totalUsage: (0, drizzle_orm_1.sql)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["COUNT(*)"], ["COUNT(*)"]))),
                            totalBonusAmount: (0, drizzle_orm_1.sql)(templateObject_9 || (templateObject_9 = __makeTemplateObject(["SUM(", ")"], ["SUM(", ")"])), schema_1.userPromotions.bonusAmount),
                            activeUsers: (0, drizzle_orm_1.sql)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["COUNT(DISTINCT ", ")"], ["COUNT(DISTINCT ", ")"])), schema_1.userPromotions.userId)
                        })
                            .from(schema_1.userPromotions)
                            .leftJoin(schema_1.promotions, (0, drizzle_orm_1.eq)(schema_1.userPromotions.promotionId, schema_1.promotions.id))
                            .groupBy(schema_1.userPromotions.promotionId, schema_1.promotions.code, schema_1.promotions.title)];
                    case 3:
                        analytics = _a.sent();
                        return [2 /*return*/, analytics];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_8 = _a.sent();
                        console.error('Error getting promotion analytics:', error_8);
                        return [2 /*return*/, []];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Simplified referrer lookup (in production, implement proper mapping)
    PromotionService.prototype.getReferrerFromCode = function (referralCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // This is a simplified implementation
                // In production, store referral codes in a separate table
                return [2 /*return*/, 'sample_referrer_id']; // Placeholder
            });
        });
    };
    // Deactivate promotion
    PromotionService.prototype.deactivatePromotion = function (promotionId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.db
                                .update(schema_1.promotions)
                                .set({ isActive: false })
                                .where((0, drizzle_orm_1.eq)(schema_1.promotions.id, promotionId))];
                    case 1:
                        _a.sent();
                        console.log("\uD83D\uDEAB Deactivated promotion ".concat(promotionId));
                        this.emit('promotionDeactivated', { promotionId: promotionId });
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error('Error deactivating promotion:', error_9);
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PromotionService;
}(events_1.EventEmitter));
exports.PromotionService = PromotionService;
exports.promotionService = new PromotionService();
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
