import { users, sports, matches, odds, bets, transactions, } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
export class DatabaseStorage {
    // User operations (mandatory for Replit Auth)
    async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
    }
    async upsertUser(userData) {
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
    async getAllSports() {
        return await db.select().from(sports).where(eq(sports.isActive, true));
    }
    async createSport(sportData) {
        const [sport] = await db.insert(sports).values(sportData).returning();
        return sport;
    }
    // Match operations
    async getMatches(filters) {
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
    async createMatch(matchData) {
        const [match] = await db.insert(matches).values(matchData).returning();
        return match;
    }
    async updateMatchScore(matchId, scoreField, newScore) {
        await db
            .update(matches)
            .set({ [scoreField]: newScore })
            .where(eq(matches.id, matchId));
    }
    // Odds operations
    async getMatchOdds(matchId) {
        return await db
            .select()
            .from(odds)
            .where(and(eq(odds.matchId, matchId), eq(odds.isActive, true)));
    }
    async createOdds(oddsData) {
        const [odd] = await db.insert(odds).values(oddsData).returning();
        return odd;
    }
    async updateOdds(oddsId, newOdds) {
        await db
            .update(odds)
            .set({ odds: newOdds, updatedAt: new Date() })
            .where(eq(odds.id, oddsId));
    }
    // Betting operations
    async placeBet(betData) {
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
    async getUserBets(userId) {
        return await db
            .select()
            .from(bets)
            .where(eq(bets.userId, userId))
            .orderBy(desc(bets.placedAt));
    }
    // Transaction operations
    async getUserTransactions(userId) {
        return await db
            .select()
            .from(transactions)
            .where(eq(transactions.userId, userId))
            .orderBy(desc(transactions.createdAt));
    }
    async createTransaction(transactionData) {
        const [transaction] = await db.insert(transactions).values(transactionData).returning();
        return transaction;
    }
    // Admin operations
    async getAdminStats() {
        // Get today's revenue
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const revenueResult = await db
            .select({
            total: sql `COALESCE(SUM(CAST(amount AS DECIMAL)), 0)`,
        })
            .from(transactions)
            .where(and(eq(transactions.type, "bet"), sql `created_at >= ${today}`));
        // Get active users count (users who placed bets in last hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const activeUsersResult = await db
            .select({
            count: sql `COUNT(DISTINCT user_id)`,
        })
            .from(bets)
            .where(sql `placed_at >= ${oneHourAgo}`);
        // Get total bets today
        const totalBetsResult = await db
            .select({
            count: sql `COUNT(*)`,
        })
            .from(bets)
            .where(sql `placed_at >= ${today}`);
        // Calculate risk exposure (total potential payouts for pending bets)
        const riskExposureResult = await db
            .select({
            total: sql `COALESCE(SUM(CAST(potential_win AS DECIMAL)), 0)`,
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
