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
exports.productivityService = exports.ProductivityService = void 0;
var events_1 = require("events");
var ProductivityService = /** @class */ (function (_super) {
    __extends(ProductivityService, _super);
    function ProductivityService() {
        var _this = _super.call(this) || this;
        _this.metricsCache = new Map();
        _this.cacheExpiry = new Map();
        _this.CACHE_DURATION = 300000; // 5 minutes
        _this.startMetricsCollection();
        return _this;
    }
    ProductivityService.prototype.startMetricsCollection = function () {
        var _this = this;
        // Collect metrics every 5 minutes
        setInterval(function () {
            _this.collectPlatformMetrics();
        }, 300000);
        // Initial collection
        this.collectPlatformMetrics();
    };
    ProductivityService.prototype.collectPlatformMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metrics, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('🔄 Collecting platform productivity metrics...');
                        return [4 /*yield*/, this.calculateProductivityMetrics()];
                    case 1:
                        metrics = _a.sent();
                        this.metricsCache.set('platform_metrics', metrics);
                        this.cacheExpiry.set('platform_metrics', Date.now() + this.CACHE_DURATION);
                        this.emit('metricsUpdated', metrics);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error collecting productivity metrics:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductivityService.prototype.getProductivityMetrics = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, timeframe) {
            var cacheKey, startDate, metrics;
            if (timeframe === void 0) { timeframe = '7d'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cacheKey = "metrics_".concat(userId || 'platform', "_").concat(timeframe);
                        if (this.metricsCache.has(cacheKey) &&
                            this.cacheExpiry.get(cacheKey) > Date.now()) {
                            return [2 /*return*/, this.metricsCache.get(cacheKey)];
                        }
                        startDate = this.getStartDate(timeframe);
                        return [4 /*yield*/, this.calculateProductivityMetrics(userId, startDate)];
                    case 1:
                        metrics = _a.sent();
                        this.metricsCache.set(cacheKey, metrics);
                        this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
                        return [2 /*return*/, metrics];
                }
            });
        });
    };
    ProductivityService.prototype.calculateProductivityMetrics = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var metrics, bettingStats, financialStats, engagementStats, riskStats, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        metrics = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.calculateBettingStats(userId, startDate)];
                    case 2:
                        bettingStats = _a.sent();
                        metrics.push({
                            id: 'betting_accuracy',
                            title: 'Betting Accuracy',
                            value: bettingStats.winRate,
                            change: bettingStats.winRateChange,
                            trend: bettingStats.winRateChange > 0 ? 'up' : bettingStats.winRateChange < 0 ? 'down' : 'stable',
                            category: 'betting',
                            insight: "Your prediction accuracy is ".concat(bettingStats.winRate > 60 ? 'excellent' : bettingStats.winRate > 50 ? 'good' : 'needs improvement'),
                            action: bettingStats.winRate > 60 ? 'Consider increasing bet sizes' : 'Focus on research and analysis'
                        });
                        return [4 /*yield*/, this.calculateFinancialStats(userId, startDate)];
                    case 3:
                        financialStats = _a.sent();
                        metrics.push({
                            id: 'roi_performance',
                            title: 'ROI Performance',
                            value: financialStats.roi,
                            change: financialStats.roiChange,
                            trend: financialStats.roiChange > 0 ? 'up' : financialStats.roiChange < 0 ? 'down' : 'stable',
                            category: 'financial',
                            insight: "Your ROI is ".concat(financialStats.roi > 10 ? 'excellent' : financialStats.roi > 5 ? 'good' : 'below target'),
                            action: financialStats.roi < 5 ? 'Review bankroll management' : 'Maintain current strategy'
                        });
                        return [4 /*yield*/, this.calculateEngagementStats(userId, startDate)];
                    case 4:
                        engagementStats = _a.sent();
                        metrics.push({
                            id: 'engagement_score',
                            title: 'Platform Engagement',
                            value: engagementStats.score,
                            change: engagementStats.scoreChange,
                            trend: engagementStats.scoreChange > 0 ? 'up' : engagementStats.scoreChange < 0 ? 'down' : 'stable',
                            category: 'engagement',
                            insight: "Your engagement level is ".concat(engagementStats.score > 80 ? 'very high' : engagementStats.score > 60 ? 'good' : 'moderate'),
                            action: engagementStats.score < 60 ? 'Explore more platform features' : 'Great activity level!'
                        });
                        return [4 /*yield*/, this.calculateRiskStats(userId, startDate)];
                    case 5:
                        riskStats = _a.sent();
                        metrics.push({
                            id: 'risk_management',
                            title: 'Risk Management',
                            value: riskStats.score,
                            change: riskStats.scoreChange,
                            trend: riskStats.scoreChange > 0 ? 'up' : riskStats.scoreChange < 0 ? 'down' : 'stable',
                            category: 'security',
                            insight: "Your risk management is ".concat(riskStats.score > 80 ? 'excellent' : riskStats.score > 60 ? 'good' : 'needs attention'),
                            action: riskStats.score < 60 ? 'Review bet sizing strategy' : 'Maintain disciplined approach'
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        console.error('Error calculating productivity metrics:', error_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, metrics];
                }
            });
        });
    };
    ProductivityService.prototype.getContextualInsights = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, timeframe) {
            var insights, startDate, bettingInsights, financialInsights, engagementInsights, riskInsights, error_3;
            if (timeframe === void 0) { timeframe = '7d'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        insights = [];
                        startDate = this.getStartDate(timeframe);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.analyzeBettingPatterns(userId, startDate)];
                    case 2:
                        bettingInsights = _a.sent();
                        insights.push.apply(insights, bettingInsights);
                        return [4 /*yield*/, this.analyzeFinancialPatterns(userId, startDate)];
                    case 3:
                        financialInsights = _a.sent();
                        insights.push.apply(insights, financialInsights);
                        return [4 /*yield*/, this.analyzeEngagementPatterns(userId, startDate)];
                    case 4:
                        engagementInsights = _a.sent();
                        insights.push.apply(insights, engagementInsights);
                        return [4 /*yield*/, this.analyzeRiskPatterns(userId, startDate)];
                    case 5:
                        riskInsights = _a.sent();
                        insights.push.apply(insights, riskInsights);
                        return [3 /*break*/, 7];
                    case 6:
                        error_3 = _a.sent();
                        console.error('Error generating contextual insights:', error_3);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, insights.slice(0, 10)]; // Return top 10 insights
                }
            });
        });
    };
    ProductivityService.prototype.calculateBettingStats = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock calculation - would use real database queries
                return [2 /*return*/, {
                        winRate: 67.3,
                        winRateChange: 5.2,
                        totalBets: 45,
                        totalWins: 30,
                        avgOdds: 2.1
                    }];
            });
        });
    };
    ProductivityService.prototype.calculateFinancialStats = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock calculation - would use real database queries
                return [2 /*return*/, {
                        roi: 12.8,
                        roiChange: -2.1,
                        totalStaked: 2500,
                        totalReturns: 2820,
                        profit: 320
                    }];
            });
        });
    };
    ProductivityService.prototype.calculateEngagementStats = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock calculation - would use real database queries
                return [2 /*return*/, {
                        score: 78,
                        scoreChange: 8,
                        sessionTime: 2.5,
                        featuresUsed: 12,
                        socialInteractions: 25
                    }];
            });
        });
    };
    ProductivityService.prototype.calculateRiskStats = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock calculation - would use real database queries
                return [2 /*return*/, {
                        score: 85,
                        scoreChange: 3,
                        maxBetSize: 5.2, // % of bankroll
                        diversityScore: 8.5,
                        consecutiveLosses: 2
                    }];
            });
        });
    };
    ProductivityService.prototype.analyzeBettingPatterns = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var insights;
            return __generator(this, function (_a) {
                insights = [];
                // Mock insights based on patterns
                insights.push({
                    id: 'betting_opportunity_1',
                    type: 'opportunity',
                    title: 'High-Value Opportunity Detected',
                    description: 'NBA Lakers vs Celtics shows 15% value bet opportunity based on your historical performance',
                    impact: 'high',
                    urgency: 'immediate',
                    actionable: true,
                    relatedMetrics: ['betting_accuracy', 'roi_performance']
                });
                return [2 /*return*/, insights];
            });
        });
    };
    ProductivityService.prototype.analyzeFinancialPatterns = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var insights;
            return __generator(this, function (_a) {
                insights = [];
                insights.push({
                    id: 'bankroll_warning',
                    type: 'warning',
                    title: 'Bankroll Management Alert',
                    description: 'You have exceeded 5% of bankroll on a single bet 3 times this week',
                    impact: 'medium',
                    urgency: 'this_week',
                    actionable: true,
                    relatedMetrics: ['risk_management']
                });
                return [2 /*return*/, insights];
            });
        });
    };
    ProductivityService.prototype.analyzeEngagementPatterns = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var insights;
            return __generator(this, function (_a) {
                insights = [];
                insights.push({
                    id: 'engagement_achievement',
                    type: 'achievement',
                    title: 'Consistent Activity Streak',
                    description: 'You have maintained daily platform activity for 14 consecutive days',
                    impact: 'medium',
                    urgency: 'this_month',
                    actionable: false,
                    relatedMetrics: ['engagement_score']
                });
                return [2 /*return*/, insights];
            });
        });
    };
    ProductivityService.prototype.analyzeRiskPatterns = function (userId, startDate) {
        return __awaiter(this, void 0, void 0, function () {
            var insights;
            return __generator(this, function (_a) {
                insights = [];
                insights.push({
                    id: 'timing_recommendation',
                    type: 'recommendation',
                    title: 'Optimize Bet Timing',
                    description: 'Your bets placed 2-4 hours before game time show 23% higher success rates',
                    impact: 'high',
                    urgency: 'this_week',
                    actionable: true,
                    relatedMetrics: ['betting_accuracy']
                });
                return [2 /*return*/, insights];
            });
        });
    };
    ProductivityService.prototype.getUserBehaviorProfile = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock user behavior analysis
                return [2 /*return*/, {
                        userId: userId,
                        avgBetSize: 45.50,
                        winRate: 67.3,
                        profitability: 12.8,
                        activityLevel: 'high',
                        riskProfile: 'moderate',
                        preferredSports: ['NFL', 'NBA', 'Soccer'],
                        bettingTrends: [
                            { period: 'morning', frequency: 0.3, success: 0.72 },
                            { period: 'afternoon', frequency: 0.5, success: 0.65 },
                            { period: 'evening', frequency: 0.2, success: 0.58 }
                        ]
                    }];
            });
        });
    };
    ProductivityService.prototype.getPerformanceComparison = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Mock performance comparison data
                return [2 /*return*/, {
                        userPerformance: {
                            winRate: 67.3,
                            roi: 12.8,
                            avgBetSize: 45.50
                        },
                        platformAverage: {
                            winRate: 52.1,
                            roi: 8.2,
                            avgBetSize: 38.20
                        },
                        topPerformers: {
                            winRate: 78.5,
                            roi: 18.9,
                            avgBetSize: 62.10
                        },
                        ranking: {
                            overall: 156,
                            outOf: 15420,
                            percentile: 98.99
                        }
                    }];
            });
        });
    };
    ProductivityService.prototype.getStartDate = function (timeframe) {
        var now = new Date();
        switch (timeframe) {
            case '24h':
                return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case '7d':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case '30d':
                return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            default:
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        }
    };
    ProductivityService.prototype.generateActionableRecommendations = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendations, behaviorProfile, performance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recommendations = [];
                        return [4 /*yield*/, this.getUserBehaviorProfile(userId)];
                    case 1:
                        behaviorProfile = _a.sent();
                        return [4 /*yield*/, this.getPerformanceComparison(userId)];
                    case 2:
                        performance = _a.sent();
                        if (behaviorProfile.winRate < 55) {
                            recommendations.push({
                                id: 'improve_research',
                                title: 'Enhance Research Process',
                                description: 'Your win rate could improve with more thorough pre-bet analysis',
                                priority: 'high',
                                estimatedImpact: '+8-12% win rate',
                                actionSteps: [
                                    'Spend 10+ minutes researching each bet',
                                    'Use AI assistant for market analysis',
                                    'Track weather and injury reports'
                                ]
                            });
                        }
                        if (behaviorProfile.riskProfile === 'aggressive') {
                            recommendations.push({
                                id: 'risk_management',
                                title: 'Optimize Risk Management',
                                description: 'Moderate your bet sizing to improve long-term profitability',
                                priority: 'medium',
                                estimatedImpact: '+3-5% ROI',
                                actionSteps: [
                                    'Limit single bets to 3% of bankroll',
                                    'Diversify across multiple sports',
                                    'Set daily loss limits'
                                ]
                            });
                        }
                        return [2 /*return*/, recommendations];
                }
            });
        });
    };
    return ProductivityService;
}(events_1.EventEmitter));
exports.ProductivityService = ProductivityService;
exports.productivityService = new ProductivityService();
