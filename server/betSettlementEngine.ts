import { db } from "./db";
import { bets, enhancedBets, enhancedMatches, enhancedOdds, transactions, users } from "@shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { EventEmitter } from "events";

interface SettlementResult {
  betId: number;
  status: 'won' | 'lost' | 'cancelled';
  winAmount?: number;
  settlementData: any;
}

interface MatchResult {
  matchId: number;
  finalScore: { home: number; away: number };
  status: 'finished';
  markets: {
    [market: string]: {
      result: string;
      additionalData?: any;
    };
  };
}

export class BetSettlementEngine extends EventEmitter {
  private settlementRules: Map<string, (bet: any, matchResult: MatchResult) => SettlementResult> = new Map();
  private isRunning = false;
  private settlementInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeSettlementRules();
    this.startSettlementService();
  }

  private initializeSettlementRules() {
    // 1X2 (Match Winner) Settlement
    this.settlementRules.set('1x2', (bet, matchResult) => {
      const { home, away } = matchResult.finalScore;
      let winningSelection = '';
      
      if (home > away) winningSelection = 'home';
      else if (away > home) winningSelection = 'away';
      else winningSelection = 'draw';

      const isWin = bet.selection === winningSelection;
      
      return {
        betId: bet.id,
        status: isWin ? 'won' : 'lost',
        winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
        settlementData: {
          finalScore: matchResult.finalScore,
          winningSelection,
          settledAt: new Date().toISOString()
        }
      };
    });

    // Over/Under Goals Settlement
    this.settlementRules.set('over_under', (bet, matchResult) => {
      const { home, away } = matchResult.finalScore;
      const totalGoals = home + away;
      
      // Extract the line from selection (e.g., "over_2.5" -> 2.5)
      const line = parseFloat(bet.selection.split('_')[1]);
      const isOver = bet.selection.startsWith('over');
      
      let isWin = false;
      if (isOver) {
        isWin = totalGoals > line;
      } else {
        isWin = totalGoals < line;
      }

      return {
        betId: bet.id,
        status: isWin ? 'won' : 'lost',
        winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
        settlementData: {
          finalScore: matchResult.finalScore,
          totalGoals,
          line,
          settledAt: new Date().toISOString()
        }
      };
    });

    // Handicap Settlement
    this.settlementRules.set('handicap', (bet, matchResult) => {
      const { home, away } = matchResult.finalScore;
      
      // Extract handicap value (e.g., "home_-1.5" -> -1.5)
      const handicapMatch = bet.selection.match(/(home|away)_([+-]?\d+\.?\d*)/);
      if (!handicapMatch) {
        return {
          betId: bet.id,
          status: 'cancelled',
          settlementData: { error: 'Invalid handicap format' }
        };
      }

      const team = handicapMatch[1];
      const handicap = parseFloat(handicapMatch[2]);
      
      let adjustedHome = home;
      let adjustedAway = away;
      
      if (team === 'home') {
        adjustedHome += handicap;
      } else {
        adjustedAway += handicap;
      }

      let isWin = false;
      if (team === 'home') {
        isWin = adjustedHome > adjustedAway;
      } else {
        isWin = adjustedAway > adjustedHome;
      }

      return {
        betId: bet.id,
        status: isWin ? 'won' : 'lost',
        winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
        settlementData: {
          finalScore: matchResult.finalScore,
          handicap,
          adjustedScore: { home: adjustedHome, away: adjustedAway },
          settledAt: new Date().toISOString()
        }
      };
    });

    // Both Teams to Score
    this.settlementRules.set('btts', (bet, matchResult) => {
      const { home, away } = matchResult.finalScore;
      const bothScored = home > 0 && away > 0;
      
      const isWin = (bet.selection === 'yes' && bothScored) || 
                    (bet.selection === 'no' && !bothScored);

      return {
        betId: bet.id,
        status: isWin ? 'won' : 'lost',
        winAmount: isWin ? parseFloat(bet.potentialWin) : 0,
        settlementData: {
          finalScore: matchResult.finalScore,
          bothScored,
          settledAt: new Date().toISOString()
        }
      };
    });
  }

  private startSettlementService() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    console.log('🔧 Bet Settlement Engine started');
    
    // Run settlement every 30 seconds
    this.settlementInterval = setInterval(() => {
      this.processSettlements();
    }, 30000);

    // Process immediately on start
    this.processSettlements();
  }

  private async processSettlements() {
    try {
      // Find finished matches with unsettled bets
      const finishedMatches = await db
        .select()
        .from(enhancedMatches)
        .where(eq(enhancedMatches.status, 'finished'));

      for (const match of finishedMatches) {
        await this.settleMatchBets(match);
      }
    } catch (error) {
      console.error('Settlement processing error:', error);
      this.emit('error', error);
    }
  }

  private async settleMatchBets(match: any) {
    try {
      // Get all unsettled bets for this match
      const pendingBets = await db
        .select()
        .from(enhancedBets)
        .where(
          and(
            eq(enhancedBets.matchId, match.id),
            eq(enhancedBets.status, 'pending')
          )
        );

      if (pendingBets.length === 0) return;

      const matchResult: MatchResult = {
        matchId: match.id,
        finalScore: { home: match.score1, away: match.score2 },
        status: 'finished',
        markets: this.generateMarketResults(match)
      };

      console.log(`⚡ Settling ${pendingBets.length} bets for match ${match.team1} vs ${match.team2}`);

      for (const bet of pendingBets) {
        await this.settleBet(bet, matchResult);
      }

      this.emit('matchSettled', {
        matchId: match.id,
        betsSettled: pendingBets.length,
        match: `${match.team1} vs ${match.team2}`
      });

    } catch (error) {
      console.error(`Error settling bets for match ${match.id}:`, error);
      this.emit('settlementError', { matchId: match.id, error });
    }
  }

  private async settleBet(bet: any, matchResult: MatchResult) {
    try {
      const settlementRule = this.settlementRules.get(bet.market);
      
      if (!settlementRule) {
        console.warn(`No settlement rule for market: ${bet.market}`);
        return;
      }

      const result = settlementRule(bet, matchResult);
      
      // Update bet status
      await db
        .update(enhancedBets)
        .set({
          status: result.status,
          settledAt: new Date(),
          autoSettled: true,
          settlementData: result.settlementData
        })
        .where(eq(enhancedBets.id, bet.id));

      // If bet won, credit user account
      if (result.status === 'won' && result.winAmount && result.winAmount > 0) {
        await this.creditWinnings(bet.userId, result.winAmount, bet.id);
      }

      // Record settlement transaction
      await db.insert(transactions).values({
        userId: bet.userId,
        type: result.status === 'won' ? 'win' : 'bet_loss',
        amount: result.status === 'won' ? (result.winAmount || 0).toString() : '0',
        description: `Bet settlement: ${bet.market} - ${result.status}`,
        status: 'completed'
      });

      this.emit('betSettled', {
        betId: bet.id,
        userId: bet.userId,
        status: result.status,
        winAmount: result.winAmount || 0
      });

    } catch (error) {
      console.error(`Error settling bet ${bet.id}:`, error);
      this.emit('betError', { betId: bet.id, error });
    }
  }

  private async creditWinnings(userId: string, amount: number, betId: number) {
    try {
      // Update user balance
      await db
        .update(users)
        .set({
          balance: sql`${users.balance} + ${amount}`
        })
        .where(eq(users.id, userId));

      console.log(`💰 Credited ${amount} to user ${userId} for bet ${betId}`);
    } catch (error) {
      console.error(`Error crediting winnings:`, error);
      throw error;
    }
  }

  private generateMarketResults(match: any) {
    const { score1: home, score2: away } = match;
    const totalGoals = home + away;
    
    return {
      '1x2': {
        result: home > away ? 'home' : away > home ? 'away' : 'draw'
      },
      'over_under': {
        result: `total_${totalGoals}`,
        totalGoals
      },
      'btts': {
        result: home > 0 && away > 0 ? 'yes' : 'no'
      }
    };
  }

  // Manual settlement for edge cases
  public async manualSettlement(betId: number, status: 'won' | 'lost' | 'cancelled', winAmount?: number) {
    try {
      const bet = await db
        .select()
        .from(enhancedBets)
        .where(eq(enhancedBets.id, betId))
        .limit(1);

      if (!bet[0]) {
        throw new Error(`Bet ${betId} not found`);
      }

      await db
        .update(enhancedBets)
        .set({
          status,
          settledAt: new Date(),
          autoSettled: false,
          settlementData: {
            manualSettlement: true,
            settledAt: new Date().toISOString(),
            reason: 'Manual intervention'
          }
        })
        .where(eq(enhancedBets.id, betId));

      if (status === 'won' && winAmount && bet[0].userId) {
        await this.creditWinnings(bet[0].userId, winAmount, betId);
      }

      console.log(`📋 Manual settlement completed for bet ${betId}: ${status}`);
      
      this.emit('manualSettlement', {
        betId,
        status,
        winAmount: winAmount || 0
      });

    } catch (error) {
      console.error(`Manual settlement error:`, error);
      throw error;
    }
  }

  public getSettlementStats() {
    return {
      isRunning: this.isRunning,
      availableMarkets: Array.from(this.settlementRules.keys()),
      lastProcessed: new Date().toISOString()
    };
  }

  public stopSettlementService() {
    if (this.settlementInterval) {
      clearInterval(this.settlementInterval);
      this.settlementInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Bet Settlement Engine stopped');
  }
}

export const betSettlementEngine = new BetSettlementEngine();