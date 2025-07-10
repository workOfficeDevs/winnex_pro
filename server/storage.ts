import {
  users,
  sports,
  matches,
  odds,
  bets,
  transactions,
  cryptoTransactions,
  cryptoBalances,
  type User,
  type UpsertUser,
  type Sport,
  type InsertSport,
  type Match,
  type InsertMatch,
  type Odds,
  type InsertOdds,
  type Bet,
  type InsertBet,
  type Transaction,
  type InsertTransaction,
  type CryptoTransaction,
  type InsertCryptoTransaction,
  type CryptoBalance,
  type InsertCryptoBalance,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Sports operations
  getAllSports(): Promise<Sport[]>;
  createSport(sport: InsertSport): Promise<Sport>;
  
  // Match operations
  getMatches(filters?: { sportId?: number; live?: boolean }): Promise<Match[]>;
  createMatch(match: InsertMatch): Promise<Match>;
  updateMatchScore(matchId: number, scoreField: "score1" | "score2", newScore: number): Promise<void>;
  
  // Odds operations
  getMatchOdds(matchId: number): Promise<Odds[]>;
  createOdds(odds: InsertOdds): Promise<Odds>;
  updateOdds(oddsId: number, newOdds: string): Promise<void>;
  
  // Betting operations
  placeBet(bet: InsertBet): Promise<Bet>;
  getUserBets(userId: string): Promise<Bet[]>;
  
  // Transaction operations
  getUserTransactions(userId: string): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Admin operations
  getAdminStats(): Promise<any>;
  
  // Crypto operations
  getCryptoBalances(userId: string): Promise<CryptoBalance[]>;
  updateCryptoBalance(userId: string, currency: string, amount: string): Promise<void>;
  createCryptoBalance(balance: InsertCryptoBalance): Promise<CryptoBalance>;
  getCryptoTransactions(userId: string): Promise<CryptoTransaction[]>;
  createCryptoTransaction(transaction: InsertCryptoTransaction): Promise<CryptoTransaction>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Sports operations
  async getAllSports(): Promise<Sport[]> {
    return await db.select().from(sports).where(eq(sports.isActive, true));
  }

  async createSport(sportData: InsertSport): Promise<Sport> {
    const [sport] = await db.insert(sports).values(sportData).returning();
    return sport;
  }

  // Match operations
  async getMatches(filters?: { sportId?: number; live?: boolean }): Promise<Match[]> {
    const conditions = [];
    
    if (filters?.sportId) {
      conditions.push(eq(matches.sportId, filters.sportId));
    }
    
    if (filters?.live !== undefined) {
      conditions.push(eq(matches.isLive, filters.live));
    }
    
    if (conditions.length > 0) {
      return await db.select().from(matches).where(and(...conditions)).orderBy(desc(matches.startTime));
    }
    
    return await db.select().from(matches).orderBy(desc(matches.startTime));
  }

  async createMatch(matchData: InsertMatch): Promise<Match> {
    const [match] = await db.insert(matches).values(matchData).returning();
    return match;
  }

  async updateMatchScore(matchId: number, scoreField: "score1" | "score2", newScore: number): Promise<void> {
    await db
      .update(matches)
      .set({ [scoreField]: newScore })
      .where(eq(matches.id, matchId));
  }

  // Odds operations
  async getMatchOdds(matchId: number): Promise<Odds[]> {
    return await db
      .select()
      .from(odds)
      .where(and(eq(odds.matchId, matchId), eq(odds.isActive, true)));
  }

  async createOdds(oddsData: InsertOdds): Promise<Odds> {
    const [odd] = await db.insert(odds).values(oddsData).returning();
    return odd;
  }

  async updateOdds(oddsId: number, newOdds: string): Promise<void> {
    await db
      .update(odds)
      .set({ odds: newOdds, updatedAt: new Date() })
      .where(eq(odds.id, oddsId));
  }

  // Betting operations
  async placeBet(betData: InsertBet): Promise<Bet> {
    // Start a transaction to ensure atomic operations
    return await db.transaction(async (tx) => {
      // Get user's current balance
      const userResult = await tx.select().from(users).where(eq(users.id, betData.userId));
      const user = userResult[0];
      if (!user) {
        throw new Error("User not found");
      }

      const currentBalance = parseFloat(user.balance || "0");
      const stakeAmount = parseFloat(betData.stake);

      if (currentBalance < stakeAmount) {
        throw new Error("Insufficient balance");
      }

      // Deduct stake from user balance
      await tx
        .update(users)
        .set({ balance: (currentBalance - stakeAmount).toFixed(2) })
        .where(eq(users.id, betData.userId));

      // Create bet record
      const [bet] = await tx.insert(bets).values(betData).returning();

      // Create transaction record
      await tx.insert(transactions).values({
        userId: betData.userId,
        type: "bet",
        amount: `-${betData.stake}`,
        description: `Bet placed: ${betData.selection}`,
        status: "completed",
      });

      return bet;
    });
  }

  async getUserBets(userId: string): Promise<Bet[]> {
    return await db
      .select()
      .from(bets)
      .where(eq(bets.userId, userId))
      .orderBy(desc(bets.placedAt));
  }

  // Transaction operations
  async getUserTransactions(userId: string): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .orderBy(desc(transactions.createdAt));
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const [transaction] = await db.insert(transactions).values(transactionData).returning();
    return transaction;
  }

  // Admin operations
  async getAdminStats(): Promise<any> {
    // Get today's revenue
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const revenueResult = await db
      .select({
        total: sql<number>`COALESCE(SUM(CAST(amount AS DECIMAL)), 0)`,
      })
      .from(transactions)
      .where(
        and(
          eq(transactions.type, "bet"),
          sql`created_at >= ${today}`
        )
      );

    // Get active users count (users who placed bets in last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const activeUsersResult = await db
      .select({
        count: sql<number>`COUNT(DISTINCT user_id)`,
      })
      .from(bets)
      .where(sql`placed_at >= ${oneHourAgo}`);

    // Get total bets today
    const totalBetsResult = await db
      .select({
        count: sql<number>`COUNT(*)`,
      })
      .from(bets)
      .where(sql`placed_at >= ${today}`);

    // Calculate risk exposure (total potential payouts for pending bets)
    const riskExposureResult = await db
      .select({
        total: sql<number>`COALESCE(SUM(CAST(potential_win AS DECIMAL)), 0)`,
      })
      .from(bets)
      .where(eq(bets.status, "pending"));

    return {
      revenue: {
        today: Math.abs(revenueResult[0]?.total || 0).toFixed(0),
      },
      users: {
        active: activeUsersResult[0]?.count || 0,
      },
      bets: {
        total: totalBetsResult[0]?.count || 0,
      },
      risk: {
        exposure: (riskExposureResult[0]?.total || 0).toFixed(0) + "K",
      },
    };
  }
}

export const storage = new DatabaseStorage();
