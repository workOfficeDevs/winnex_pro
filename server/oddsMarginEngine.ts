import { db } from "./db";
import { enhancedOdds, oddsMargins, enhancedMatches } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { EventEmitter } from "events";

interface MarginConfig {
  sportId: number;
  market: string;
  baseMargin: number;
  dynamicAdjustment: boolean;
  minMargin: number;
  maxMargin: number;
}

interface OddsAdjustment {
  oddsId: number;
  originalOdds: number;
  adjustedOdds: number;
  margin: number;
  reason: string;
}

export class OddsMarginEngine extends EventEmitter {
  private marginConfigs: Map<string, MarginConfig> = new Map();
  private isRunning = false;
  private adjustmentInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeMarginConfigs();
    this.startMarginEngine();
  }

  private initializeMarginConfigs() {
    // Default margin configurations for different sports and markets
    const defaultConfigs: MarginConfig[] = [
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

    defaultConfigs.forEach(config => {
      const key = `${config.sportId}-${config.market}`;
      this.marginConfigs.set(key, config);
    });

    console.log(`📊 Initialized ${defaultConfigs.length} margin configurations`);
  }

  private startMarginEngine() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('⚙️ Odds Margin Engine started');
    
    // Run margin adjustments every 60 seconds
    this.adjustmentInterval = setInterval(() => {
      this.processMarginAdjustments();
    }, 60000);

    // Process immediately on start
    this.processMarginAdjustments();
  }

  private async processMarginAdjustments() {
    try {
      // Get all active odds that need margin adjustment
      const activeOdds = await db
        .select({
          odds: enhancedOdds,
          match: enhancedMatches
        })
        .from(enhancedOdds)
        .leftJoin(enhancedMatches, eq(enhancedOdds.matchId, enhancedMatches.id))
        .where(
          and(
            eq(enhancedOdds.isActive, true),
            eq(enhancedMatches.status, 'scheduled')
          )
        );

      const adjustments: OddsAdjustment[] = [];

      for (const record of activeOdds) {
        const { odds, match } = record;
        if (!match) continue;

        const adjustment = await this.calculateMarginAdjustment(odds, match);
        if (adjustment) {
          adjustments.push(adjustment);
        }
      }

      // Apply adjustments in batch
      if (adjustments.length > 0) {
        await this.applyMarginAdjustments(adjustments);
        console.log(`📈 Applied ${adjustments.length} margin adjustments`);
      }

    } catch (error) {
      console.error('Margin adjustment processing error:', error);
      this.emit('error', error);
    }
  }

  private async calculateMarginAdjustment(odds: any, match: any): Promise<OddsAdjustment | null> {
    const configKey = `${match.sportId}-${odds.market}`;
    const config = this.marginConfigs.get(configKey);
    
    if (!config) {
      // Use default margin if no specific config
      return this.applyDefaultMargin(odds);
    }

    let targetMargin = config.baseMargin;
    let reason = 'Base margin';

    // Dynamic margin adjustments
    if (config.dynamicAdjustment) {
      const adjustments = await this.getDynamicAdjustments(odds, match, config);
      targetMargin += adjustments.total;
      reason = adjustments.reasons.join(', ');
      
      // Clamp to min/max bounds
      targetMargin = Math.max(config.minMargin, Math.min(config.maxMargin, targetMargin));
    }

    const adjustedOdds = this.applyMarginToOdds(parseFloat(odds.baseOdds), targetMargin);
    
    // Only return adjustment if odds changed significantly (> 0.01)
    if (Math.abs(adjustedOdds - parseFloat(odds.adjustedOdds)) > 0.01) {
      return {
        oddsId: odds.id,
        originalOdds: parseFloat(odds.baseOdds),
        adjustedOdds,
        margin: targetMargin,
        reason
      };
    }

    return null;
  }

  private async getDynamicAdjustments(odds: any, match: any, config: MarginConfig) {
    const adjustments = { total: 0, reasons: [] as string[] };
    
    try {
      // Time-based adjustments (closer to match = higher margin)
      const timeToMatch = new Date(match.startTime).getTime() - Date.now();
      const hoursToMatch = timeToMatch / (1000 * 60 * 60);
      
      if (hoursToMatch < 1) {
        adjustments.total += 1.5;
        adjustments.reasons.push('Last hour premium');
      } else if (hoursToMatch < 6) {
        adjustments.total += 0.8;
        adjustments.reasons.push('Pre-match premium');
      } else if (hoursToMatch < 24) {
        adjustments.total += 0.3;
        adjustments.reasons.push('Same day adjustment');
      }

      // Volume-based adjustments
      const volume = parseFloat(odds.volume);
      if (volume > 10000) {
        adjustments.total += 0.5;
        adjustments.reasons.push('High volume');
      } else if (volume < 1000) {
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

      // Risk-based adjustments for extreme odds
      const oddsValue = parseFloat(odds.baseOdds);
      if (oddsValue < 1.2) {
        adjustments.total += 1.0;
        adjustments.reasons.push('Heavy favorite risk');
      } else if (oddsValue > 10.0) {
        adjustments.total += 0.8;
        adjustments.reasons.push('Long shot premium');
      }

    } catch (error) {
      console.error('Error calculating dynamic adjustments:', error);
    }

    return adjustments;
  }

  private applyDefaultMargin(odds: any): OddsAdjustment {
    const defaultMargin = 5.0; // 5% default margin
    const adjustedOdds = this.applyMarginToOdds(parseFloat(odds.baseOdds), defaultMargin);
    
    return {
      oddsId: odds.id,
      originalOdds: parseFloat(odds.baseOdds),
      adjustedOdds,
      margin: defaultMargin,
      reason: 'Default margin (no config)'
    };
  }

  private applyMarginToOdds(baseOdds: number, marginPercentage: number): number {
    // Convert decimal odds to implied probability
    const impliedProbability = 1 / baseOdds;
    
    // Add margin to probability
    const adjustedProbability = impliedProbability * (1 + marginPercentage / 100);
    
    // Convert back to decimal odds
    const adjustedOdds = 1 / adjustedProbability;
    
    // Round to 2 decimal places
    return Math.round(adjustedOdds * 100) / 100;
  }

  private async applyMarginAdjustments(adjustments: OddsAdjustment[]) {
    try {
      for (const adjustment of adjustments) {
        await db
          .update(enhancedOdds)
          .set({
            adjustedOdds: adjustment.adjustedOdds.toString(),
            margin: adjustment.margin.toString(),
            updatedAt: new Date()
          })
          .where(eq(enhancedOdds.id, adjustment.oddsId));
      }

      this.emit('marginsAdjusted', {
        count: adjustments.length,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error applying margin adjustments:', error);
      this.emit('adjustmentError', error);
    }
  }

  // Public methods for margin management
  public async setMarginConfig(sportId: number, market: string, config: Partial<MarginConfig>) {
    const key = `${sportId}-${market}`;
    const existingConfig = this.marginConfigs.get(key) || {
      sportId,
      market,
      baseMargin: 5.0,
      dynamicAdjustment: true,
      minMargin: 2.0,
      maxMargin: 10.0
    };

    const updatedConfig = { ...existingConfig, ...config };
    this.marginConfigs.set(key, updatedConfig);

    // Store in database
    await db
      .insert(oddsMargins)
      .values({
        sportId,
        market,
        marginPercentage: updatedConfig.baseMargin.toString(),
        isActive: true
      })
      .onConflictDoUpdate({
        target: [oddsMargins.sportId, oddsMargins.market],
        set: {
          marginPercentage: updatedConfig.baseMargin.toString(),
          updatedAt: new Date()
        }
      });

    console.log(`📋 Updated margin config for ${sportId}-${market}: ${updatedConfig.baseMargin}%`);
  }

  public async getMarginAnalytics() {
    try {
      const analytics = await db
        .select({
          market: enhancedOdds.market,
          avgMargin: sql<number>`AVG(${enhancedOdds.margin})`,
          minMargin: sql<number>`MIN(${enhancedOdds.margin})`,
          maxMargin: sql<number>`MAX(${enhancedOdds.margin})`,
          totalVolume: sql<number>`SUM(${enhancedOdds.volume})`,
          count: sql<number>`COUNT(*)`
        })
        .from(enhancedOdds)
        .where(eq(enhancedOdds.isActive, true))
        .groupBy(enhancedOdds.market);

      return analytics;
    } catch (error) {
      console.error('Error getting margin analytics:', error);
      return [];
    }
  }

  public getMarginConfigs(): Map<string, MarginConfig> {
    return new Map(this.marginConfigs);
  }

  public stopMarginEngine() {
    if (this.adjustmentInterval) {
      clearInterval(this.adjustmentInterval);
      this.adjustmentInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Odds Margin Engine stopped');
  }
}

export const oddsMarginEngine = new OddsMarginEngine();