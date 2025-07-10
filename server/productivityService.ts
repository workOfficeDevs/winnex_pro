import { EventEmitter } from 'events';
import { db } from './db';
import { 
  users, 
  bets, 
  matches, 
  transactions, 
  crmUserProfiles,
  crmTransactions,
  crmRiskAlerts 
} from '@shared/schema';
import { eq, sql, and, gte, lte, desc } from 'drizzle-orm';

interface ProductivityMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: 'betting' | 'financial' | 'engagement' | 'security';
  insight: string;
  action: string;
}

interface ContextualInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  urgency: 'immediate' | 'this_week' | 'this_month';
  actionable: boolean;
  relatedMetrics: string[];
}

interface UserBehaviorPattern {
  userId: string;
  avgBetSize: number;
  winRate: number;
  profitability: number;
  activityLevel: 'high' | 'medium' | 'low';
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  preferredSports: string[];
  bettingTrends: any[];
}

export class ProductivityService extends EventEmitter {
  private metricsCache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 300000; // 5 minutes

  constructor() {
    super();
    this.startMetricsCollection();
  }

  private startMetricsCollection() {
    // Collect metrics every 5 minutes
    setInterval(() => {
      this.collectPlatformMetrics();
    }, 300000);
    
    // Initial collection
    this.collectPlatformMetrics();
  }

  private async collectPlatformMetrics() {
    try {
      console.log('🔄 Collecting platform productivity metrics...');
      
      const metrics = await this.calculateProductivityMetrics();
      this.metricsCache.set('platform_metrics', metrics);
      this.cacheExpiry.set('platform_metrics', Date.now() + this.CACHE_DURATION);
      
      this.emit('metricsUpdated', metrics);
    } catch (error) {
      console.error('Error collecting productivity metrics:', error);
    }
  }

  async getProductivityMetrics(userId?: string, timeframe: string = '7d'): Promise<ProductivityMetric[]> {
    const cacheKey = `metrics_${userId || 'platform'}_${timeframe}`;
    
    if (this.metricsCache.has(cacheKey) && 
        this.cacheExpiry.get(cacheKey)! > Date.now()) {
      return this.metricsCache.get(cacheKey);
    }

    const startDate = this.getStartDate(timeframe);
    const metrics = await this.calculateProductivityMetrics(userId, startDate);
    
    this.metricsCache.set(cacheKey, metrics);
    this.cacheExpiry.set(cacheKey, Date.now() + this.CACHE_DURATION);
    
    return metrics;
  }

  private async calculateProductivityMetrics(userId?: string, startDate?: Date): Promise<ProductivityMetric[]> {
    const metrics: ProductivityMetric[] = [];

    try {
      // Betting Performance Metrics
      const bettingStats = await this.calculateBettingStats(userId, startDate);
      metrics.push({
        id: 'betting_accuracy',
        title: 'Betting Accuracy',
        value: bettingStats.winRate,
        change: bettingStats.winRateChange,
        trend: bettingStats.winRateChange > 0 ? 'up' : bettingStats.winRateChange < 0 ? 'down' : 'stable',
        category: 'betting',
        insight: `Your prediction accuracy is ${bettingStats.winRate > 60 ? 'excellent' : bettingStats.winRate > 50 ? 'good' : 'needs improvement'}`,
        action: bettingStats.winRate > 60 ? 'Consider increasing bet sizes' : 'Focus on research and analysis'
      });

      // Financial Performance Metrics
      const financialStats = await this.calculateFinancialStats(userId, startDate);
      metrics.push({
        id: 'roi_performance',
        title: 'ROI Performance',
        value: financialStats.roi,
        change: financialStats.roiChange,
        trend: financialStats.roiChange > 0 ? 'up' : financialStats.roiChange < 0 ? 'down' : 'stable',
        category: 'financial',
        insight: `Your ROI is ${financialStats.roi > 10 ? 'excellent' : financialStats.roi > 5 ? 'good' : 'below target'}`,
        action: financialStats.roi < 5 ? 'Review bankroll management' : 'Maintain current strategy'
      });

      // Engagement Metrics
      const engagementStats = await this.calculateEngagementStats(userId, startDate);
      metrics.push({
        id: 'engagement_score',
        title: 'Platform Engagement',
        value: engagementStats.score,
        change: engagementStats.scoreChange,
        trend: engagementStats.scoreChange > 0 ? 'up' : engagementStats.scoreChange < 0 ? 'down' : 'stable',
        category: 'engagement',
        insight: `Your engagement level is ${engagementStats.score > 80 ? 'very high' : engagementStats.score > 60 ? 'good' : 'moderate'}`,
        action: engagementStats.score < 60 ? 'Explore more platform features' : 'Great activity level!'
      });

      // Risk Management Metrics
      const riskStats = await this.calculateRiskStats(userId, startDate);
      metrics.push({
        id: 'risk_management',
        title: 'Risk Management',
        value: riskStats.score,
        change: riskStats.scoreChange,
        trend: riskStats.scoreChange > 0 ? 'up' : riskStats.scoreChange < 0 ? 'down' : 'stable',
        category: 'security',
        insight: `Your risk management is ${riskStats.score > 80 ? 'excellent' : riskStats.score > 60 ? 'good' : 'needs attention'}`,
        action: riskStats.score < 60 ? 'Review bet sizing strategy' : 'Maintain disciplined approach'
      });

    } catch (error) {
      console.error('Error calculating productivity metrics:', error);
    }

    return metrics;
  }

  async getContextualInsights(userId?: string, timeframe: string = '7d'): Promise<ContextualInsight[]> {
    const insights: ContextualInsight[] = [];
    const startDate = this.getStartDate(timeframe);

    try {
      // Analyze betting patterns
      const bettingInsights = await this.analyzeBettingPatterns(userId, startDate);
      insights.push(...bettingInsights);

      // Analyze financial patterns
      const financialInsights = await this.analyzeFinancialPatterns(userId, startDate);
      insights.push(...financialInsights);

      // Analyze engagement patterns
      const engagementInsights = await this.analyzeEngagementPatterns(userId, startDate);
      insights.push(...engagementInsights);

      // Risk analysis
      const riskInsights = await this.analyzeRiskPatterns(userId, startDate);
      insights.push(...riskInsights);

    } catch (error) {
      console.error('Error generating contextual insights:', error);
    }

    return insights.slice(0, 10); // Return top 10 insights
  }

  private async calculateBettingStats(userId?: string, startDate?: Date) {
    // Mock calculation - would use real database queries
    return {
      winRate: 67.3,
      winRateChange: 5.2,
      totalBets: 45,
      totalWins: 30,
      avgOdds: 2.1
    };
  }

  private async calculateFinancialStats(userId?: string, startDate?: Date) {
    // Mock calculation - would use real database queries
    return {
      roi: 12.8,
      roiChange: -2.1,
      totalStaked: 2500,
      totalReturns: 2820,
      profit: 320
    };
  }

  private async calculateEngagementStats(userId?: string, startDate?: Date) {
    // Mock calculation - would use real database queries
    return {
      score: 78,
      scoreChange: 8,
      sessionTime: 2.5,
      featuresUsed: 12,
      socialInteractions: 25
    };
  }

  private async calculateRiskStats(userId?: string, startDate?: Date) {
    // Mock calculation - would use real database queries
    return {
      score: 85,
      scoreChange: 3,
      maxBetSize: 5.2, // % of bankroll
      diversityScore: 8.5,
      consecutiveLosses: 2
    };
  }

  private async analyzeBettingPatterns(userId?: string, startDate?: Date): Promise<ContextualInsight[]> {
    const insights: ContextualInsight[] = [];

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

    return insights;
  }

  private async analyzeFinancialPatterns(userId?: string, startDate?: Date): Promise<ContextualInsight[]> {
    const insights: ContextualInsight[] = [];

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

    return insights;
  }

  private async analyzeEngagementPatterns(userId?: string, startDate?: Date): Promise<ContextualInsight[]> {
    const insights: ContextualInsight[] = [];

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

    return insights;
  }

  private async analyzeRiskPatterns(userId?: string, startDate?: Date): Promise<ContextualInsight[]> {
    const insights: ContextualInsight[] = [];

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

    return insights;
  }

  async getUserBehaviorProfile(userId: string): Promise<UserBehaviorPattern> {
    // Mock user behavior analysis
    return {
      userId,
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
    };
  }

  async getPerformanceComparison(userId: string): Promise<any> {
    // Mock performance comparison data
    return {
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
    };
  }

  private getStartDate(timeframe: string): Date {
    const now = new Date();
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
  }

  async generateActionableRecommendations(userId: string): Promise<any[]> {
    const recommendations = [];

    // Analyze user data and generate personalized recommendations
    const behaviorProfile = await this.getUserBehaviorProfile(userId);
    const performance = await this.getPerformanceComparison(userId);

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

    return recommendations;
  }
}

export const productivityService = new ProductivityService();