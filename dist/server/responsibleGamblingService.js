import { db } from "./db";
import { userLimits, transactions, enhancedBets, users } from "@shared/schema";
import { eq, and, sql, gte } from "drizzle-orm";
import { EventEmitter } from "events";
export class ResponsibleGamblingService extends EventEmitter {
    constructor() {
        super();
        this.activeSessions = new Map();
        this.limitCheckInterval = null;
        this.isMonitoring = false;
        this.startMonitoring();
    }
    startMonitoring() {
        if (this.isMonitoring)
            return;
        this.isMonitoring = true;
        console.log('🛡️ Responsible Gambling Service started');
        // Check limits every 5 minutes
        this.limitCheckInterval = setInterval(() => {
            this.performLimitChecks();
        }, 300000);
    }
    async performLimitChecks() {
        try {
            // Check for users approaching their limits
            const allUsers = await db.select().from(users);
            for (const user of allUsers) {
                await this.checkUserLimits(user.id);
            }
        }
        catch (error) {
            console.error('Limit checking error:', error);
            this.emit('error', error);
        }
    }
    // Set user limits
    async setUserLimits(userId, limits) {
        try {
            await db
                .insert(userLimits)
                .values({
                userId,
                dailyDepositLimit: limits.dailyDepositLimit?.toString(),
                weeklyDepositLimit: limits.weeklyDepositLimit?.toString(),
                monthlyDepositLimit: limits.monthlyDepositLimit?.toString(),
                dailyBetLimit: limits.dailyBetLimit?.toString(),
                weeklyBetLimit: limits.weeklyBetLimit?.toString(),
                monthlyBetLimit: limits.monthlyBetLimit?.toString(),
                sessionTimeLimit: limits.sessionTimeLimit,
                isActive: true
            })
                .onConflictDoUpdate({
                target: userLimits.userId,
                set: {
                    dailyDepositLimit: limits.dailyDepositLimit?.toString(),
                    weeklyDepositLimit: limits.weeklyDepositLimit?.toString(),
                    monthlyDepositLimit: limits.monthlyDepositLimit?.toString(),
                    dailyBetLimit: limits.dailyBetLimit?.toString(),
                    weeklyBetLimit: limits.weeklyBetLimit?.toString(),
                    monthlyBetLimit: limits.monthlyBetLimit?.toString(),
                    sessionTimeLimit: limits.sessionTimeLimit,
                    updatedAt: new Date()
                }
            });
            console.log(`🔒 Updated limits for user ${userId}`);
            this.emit('limitsUpdated', { userId, limits });
            return true;
        }
        catch (error) {
            console.error('Error setting user limits:', error);
            return false;
        }
    }
    // Check if deposit is allowed
    async checkDepositLimit(userId, amount) {
        const limits = await this.getUserLimits(userId);
        if (!limits) {
            return {
                userId,
                limitType: 'deposit',
                period: 'daily',
                currentAmount: 0,
                limitAmount: 0,
                remaining: amount,
                isExceeded: false
            };
        }
        // Check daily limit
        const dailyDeposits = await this.getDepositSum(userId, 'daily');
        const dailyLimit = parseFloat(limits.dailyDepositLimit || '0');
        if (dailyLimit > 0 && (dailyDeposits + amount) > dailyLimit) {
            return {
                userId,
                limitType: 'deposit',
                period: 'daily',
                currentAmount: dailyDeposits,
                limitAmount: dailyLimit,
                remaining: Math.max(0, dailyLimit - dailyDeposits),
                isExceeded: true
            };
        }
        // Check weekly limit
        const weeklyDeposits = await this.getDepositSum(userId, 'weekly');
        const weeklyLimit = parseFloat(limits.weeklyDepositLimit || '0');
        if (weeklyLimit > 0 && (weeklyDeposits + amount) > weeklyLimit) {
            return {
                userId,
                limitType: 'deposit',
                period: 'weekly',
                currentAmount: weeklyDeposits,
                limitAmount: weeklyLimit,
                remaining: Math.max(0, weeklyLimit - weeklyDeposits),
                isExceeded: true
            };
        }
        // Check monthly limit
        const monthlyDeposits = await this.getDepositSum(userId, 'monthly');
        const monthlyLimit = parseFloat(limits.monthlyDepositLimit || '0');
        if (monthlyLimit > 0 && (monthlyDeposits + amount) > monthlyLimit) {
            return {
                userId,
                limitType: 'deposit',
                period: 'monthly',
                currentAmount: monthlyDeposits,
                limitAmount: monthlyLimit,
                remaining: Math.max(0, monthlyLimit - monthlyDeposits),
                isExceeded: true
            };
        }
        return {
            userId,
            limitType: 'deposit',
            period: 'daily',
            currentAmount: dailyDeposits,
            limitAmount: dailyLimit,
            remaining: dailyLimit > 0 ? dailyLimit - dailyDeposits - amount : amount,
            isExceeded: false
        };
    }
    // Check if bet is allowed
    async checkBetLimit(userId, amount) {
        const limits = await this.getUserLimits(userId);
        if (!limits) {
            return {
                userId,
                limitType: 'bet',
                period: 'daily',
                currentAmount: 0,
                limitAmount: 0,
                remaining: amount,
                isExceeded: false
            };
        }
        // Check daily bet limit
        const dailyBets = await this.getBetSum(userId, 'daily');
        const dailyLimit = parseFloat(limits.dailyBetLimit || '0');
        if (dailyLimit > 0 && (dailyBets + amount) > dailyLimit) {
            return {
                userId,
                limitType: 'bet',
                period: 'daily',
                currentAmount: dailyBets,
                limitAmount: dailyLimit,
                remaining: Math.max(0, dailyLimit - dailyBets),
                isExceeded: true
            };
        }
        // Check weekly bet limit
        const weeklyBets = await this.getBetSum(userId, 'weekly');
        const weeklyLimit = parseFloat(limits.weeklyBetLimit || '0');
        if (weeklyLimit > 0 && (weeklyBets + amount) > weeklyLimit) {
            return {
                userId,
                limitType: 'bet',
                period: 'weekly',
                currentAmount: weeklyBets,
                limitAmount: weeklyLimit,
                remaining: Math.max(0, weeklyLimit - weeklyBets),
                isExceeded: true
            };
        }
        return {
            userId,
            limitType: 'bet',
            period: 'daily',
            currentAmount: dailyBets,
            limitAmount: dailyLimit,
            remaining: dailyLimit > 0 ? dailyLimit - dailyBets - amount : amount,
            isExceeded: false
        };
    }
    // Start user session
    startSession(userId) {
        const sessionData = {
            userId,
            startTime: new Date(),
            duration: 0,
            betsPlaced: 0,
            totalWagered: 0
        };
        this.activeSessions.set(userId, sessionData);
        this.emit('sessionStarted', { userId, startTime: sessionData.startTime });
        console.log(`🎮 Session started for user ${userId}`);
    }
    // End user session
    async endSession(userId) {
        const session = this.activeSessions.get(userId);
        if (!session)
            return;
        const endTime = new Date();
        const duration = Math.floor((endTime.getTime() - session.startTime.getTime()) / 60000); // minutes
        this.activeSessions.delete(userId);
        this.emit('sessionEnded', {
            userId,
            duration,
            betsPlaced: session.betsPlaced,
            totalWagered: session.totalWagered
        });
        console.log(`🛑 Session ended for user ${userId} - Duration: ${duration} minutes`);
    }
    // Check session time limit
    async checkSessionLimit(userId) {
        const session = this.activeSessions.get(userId);
        if (!session)
            return true; // No active session
        const limits = await this.getUserLimits(userId);
        if (!limits || !limits.sessionTimeLimit)
            return true; // No time limit set
        const currentDuration = Math.floor((Date.now() - session.startTime.getTime()) / 60000);
        if (currentDuration >= limits.sessionTimeLimit) {
            this.emit('sessionLimitExceeded', {
                userId,
                duration: currentDuration,
                limit: limits.sessionTimeLimit
            });
            await this.endSession(userId);
            return false;
        }
        return true;
    }
    // Update session with bet data
    updateSessionBet(userId, betAmount) {
        const session = this.activeSessions.get(userId);
        if (session) {
            session.betsPlaced++;
            session.totalWagered += betAmount;
            session.duration = Math.floor((Date.now() - session.startTime.getTime()) / 60000);
        }
    }
    // Get user's current limits
    async getUserLimits(userId) {
        try {
            const limits = await db
                .select()
                .from(userLimits)
                .where(and(eq(userLimits.userId, userId), eq(userLimits.isActive, true)))
                .limit(1);
            return limits[0] || null;
        }
        catch (error) {
            console.error('Error getting user limits:', error);
            return null;
        }
    }
    // Get deposit sum for period
    async getDepositSum(userId, period) {
        const startDate = this.getPeriodStartDate(period);
        try {
            const result = await db
                .select({
                total: sql `COALESCE(SUM(${transactions.amount}), 0)`
            })
                .from(transactions)
                .where(and(eq(transactions.userId, userId), eq(transactions.type, 'deposit'), eq(transactions.status, 'completed'), gte(transactions.createdAt, startDate)));
            return parseFloat(result[0]?.total?.toString() || '0');
        }
        catch (error) {
            console.error('Error getting deposit sum:', error);
            return 0;
        }
    }
    // Get bet sum for period
    async getBetSum(userId, period) {
        const startDate = this.getPeriodStartDate(period);
        try {
            const result = await db
                .select({
                total: sql `COALESCE(SUM(${enhancedBets.stake}), 0)`
            })
                .from(enhancedBets)
                .where(and(eq(enhancedBets.userId, userId), gte(enhancedBets.placedAt, startDate)));
            return parseFloat(result[0]?.total?.toString() || '0');
        }
        catch (error) {
            console.error('Error getting bet sum:', error);
            return 0;
        }
    }
    getPeriodStartDate(period) {
        const now = new Date();
        switch (period) {
            case 'daily':
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
            case 'weekly':
                const startOfWeek = new Date(now);
                startOfWeek.setDate(now.getDate() - now.getDay());
                startOfWeek.setHours(0, 0, 0, 0);
                return startOfWeek;
            case 'monthly':
                return new Date(now.getFullYear(), now.getMonth(), 1);
            default:
                return new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
    }
    // Check all user limits
    async checkUserLimits(userId) {
        try {
            const limits = await this.getUserLimits(userId);
            if (!limits)
                return;
            // Check approaching limits (80% threshold)
            const dailyDeposits = await this.getDepositSum(userId, 'daily');
            const dailyDepositLimit = parseFloat(limits.dailyDepositLimit || '0');
            if (dailyDepositLimit > 0 && dailyDeposits >= dailyDepositLimit * 0.8) {
                this.emit('limitWarning', {
                    userId,
                    type: 'deposit',
                    period: 'daily',
                    current: dailyDeposits,
                    limit: dailyDepositLimit,
                    percentage: (dailyDeposits / dailyDepositLimit) * 100
                });
            }
            // Check session time
            await this.checkSessionLimit(userId);
        }
        catch (error) {
            console.error(`Error checking limits for user ${userId}:`, error);
        }
    }
    // Get user's limit status
    async getLimitStatus(userId) {
        try {
            const limits = await this.getUserLimits(userId);
            if (!limits)
                return null;
            const status = {
                deposits: {
                    daily: {
                        current: await this.getDepositSum(userId, 'daily'),
                        limit: parseFloat(limits.dailyDepositLimit || '0')
                    },
                    weekly: {
                        current: await this.getDepositSum(userId, 'weekly'),
                        limit: parseFloat(limits.weeklyDepositLimit || '0')
                    },
                    monthly: {
                        current: await this.getDepositSum(userId, 'monthly'),
                        limit: parseFloat(limits.monthlyDepositLimit || '0')
                    }
                },
                bets: {
                    daily: {
                        current: await this.getBetSum(userId, 'daily'),
                        limit: parseFloat(limits.dailyBetLimit || '0')
                    },
                    weekly: {
                        current: await this.getBetSum(userId, 'weekly'),
                        limit: parseFloat(limits.weeklyBetLimit || '0')
                    }
                },
                session: {
                    timeLimit: limits.sessionTimeLimit,
                    currentSession: this.activeSessions.get(userId)
                }
            };
            return status;
        }
        catch (error) {
            console.error('Error getting limit status:', error);
            return null;
        }
    }
    stopMonitoring() {
        if (this.limitCheckInterval) {
            clearInterval(this.limitCheckInterval);
            this.limitCheckInterval = null;
        }
        this.isMonitoring = false;
        console.log('🛑 Responsible Gambling monitoring stopped');
    }
}
export const responsibleGamblingService = new ResponsibleGamblingService();
