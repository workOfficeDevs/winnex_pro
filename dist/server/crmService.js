import { db } from "./db";
import { eq, and, desc, count, sql, gte } from "drizzle-orm";
import { crmUserProfiles, crmTransactions, crmBettingHistory, crmRiskAlerts, crmSupportTickets, crmAdminLogs, crmNotificationCampaigns, crmNotificationLogs } from "@shared/crmSchema";
import { users } from "@shared/schema";
export class CrmService {
    // User Profile Management
    async getUserProfile(userId) {
        const profiles = await db
            .select()
            .from(crmUserProfiles)
            .where(eq(crmUserProfiles.userId, userId))
            .limit(1);
        return profiles[0] || null;
    }
    async createUserProfile(profileData) {
        const [profile] = await db
            .insert(crmUserProfiles)
            .values(profileData)
            .returning();
        // Log the admin action
        await this.logAdminAction({
            adminId: 'system',
            action: 'create_user_profile',
            entityType: 'user_profile',
            entityId: profile.id.toString(),
            details: { userId: profileData.userId }
        });
        return profile;
    }
    async updateUserProfile(userId, updates) {
        const [profile] = await db
            .update(crmUserProfiles)
            .set({ ...updates, updatedAt: new Date() })
            .where(eq(crmUserProfiles.userId, userId))
            .returning();
        return profile;
    }
    async getUsersBySegment(segment, limit = 100) {
        const query = db
            .select({
            id: crmUserProfiles.id,
            userId: crmUserProfiles.userId,
            email: users.email,
            fullName: crmUserProfiles.fullName,
            userSegment: crmUserProfiles.userSegment,
            kycStatus: crmUserProfiles.kycStatus,
            riskLevel: crmUserProfiles.riskLevel,
            complianceStatus: crmUserProfiles.complianceStatus,
            totalDeposits: crmUserProfiles.totalDeposits,
            lifetimeValue: crmUserProfiles.lifetimeValue,
            lastLoginAt: crmUserProfiles.lastLoginAt
        })
            .from(crmUserProfiles)
            .leftJoin(users, eq(users.id, crmUserProfiles.userId))
            .limit(limit);
        // Only add segment filter if not 'all'
        if (segment === 'all') {
            return await query;
        }
        return await query.where(eq(crmUserProfiles.userSegment, segment));
    }
    // Risk & Alert Management
    async createRiskAlert(alertData) {
        const [alert] = await db
            .insert(crmRiskAlerts)
            .values(alertData)
            .returning();
        return alert;
    }
    async getRiskAlerts(userId, severity, resolved = false) {
        let query = db.select().from(crmRiskAlerts);
        const conditions = [];
        if (userId)
            conditions.push(eq(crmRiskAlerts.userId, userId));
        if (severity)
            conditions.push(eq(crmRiskAlerts.severity, severity));
        if (resolved !== undefined)
            conditions.push(eq(crmRiskAlerts.isResolved, resolved));
        if (conditions.length > 0) {
            query = query.where(and(...conditions));
        }
        return await query.orderBy(desc(crmRiskAlerts.createdAt));
    }
    async resolveRiskAlert(alertId, resolvedBy, notes) {
        const [alert] = await db
            .update(crmRiskAlerts)
            .set({
            isResolved: true,
            resolvedBy,
            resolvedAt: new Date(),
            resolutionNotes: notes
        })
            .where(eq(crmRiskAlerts.id, alertId))
            .returning();
        return alert;
    }
    // Transaction Monitoring
    async createTransaction(transactionData) {
        const [transaction] = await db
            .insert(crmTransactions)
            .values(transactionData)
            .returning();
        // Check for suspicious patterns
        await this.checkTransactionRisk(transaction);
        return transaction;
    }
    async getTransactionHistory(userId, limit = 50) {
        return await db
            .select()
            .from(crmTransactions)
            .where(eq(crmTransactions.userId, userId))
            .orderBy(desc(crmTransactions.createdAt))
            .limit(limit);
    }
    async getFlaggedTransactions() {
        return await db
            .select({
            transaction: crmTransactions,
            userProfile: crmUserProfiles
        })
            .from(crmTransactions)
            .leftJoin(crmUserProfiles, eq(crmUserProfiles.userId, crmTransactions.userId))
            .where(eq(crmTransactions.isAmlFlagged, true))
            .orderBy(desc(crmTransactions.createdAt));
    }
    async checkTransactionRisk(transaction) {
        const risks = [];
        // Check for rapid transaction pattern
        const recentTransactions = await db
            .select()
            .from(crmTransactions)
            .where(and(eq(crmTransactions.userId, transaction.userId), gte(crmTransactions.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))));
        if (recentTransactions.length > 10) {
            risks.push('high_frequency_transactions');
        }
        // Check for large amounts
        const usdValue = parseFloat(transaction.usdValue?.toString() || '0');
        if (usdValue > 10000) {
            risks.push('large_transaction');
        }
        // Create risk alert if needed
        if (risks.length > 0) {
            await this.createRiskAlert({
                userId: transaction.userId,
                alertType: 'transaction_risk',
                severity: 'medium',
                title: 'Suspicious Transaction Pattern',
                description: `Transaction flagged for: ${risks.join(', ')}`,
                data: { transactionId: transaction.id, risks }
            });
        }
    }
    // Support Ticket Management
    async createSupportTicket(ticketData) {
        // Generate ticket number
        const ticketNumber = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        const [ticket] = await db
            .insert(crmSupportTickets)
            .values({ ...ticketData, ticketNumber })
            .returning();
        return ticket;
    }
    async getTicketsByUser(userId) {
        return await db
            .select()
            .from(crmSupportTickets)
            .where(eq(crmSupportTickets.userId, userId))
            .orderBy(desc(crmSupportTickets.createdAt));
    }
    async getOpenTickets() {
        return await db
            .select({
            ticket: crmSupportTickets,
            userProfile: crmUserProfiles
        })
            .from(crmSupportTickets)
            .leftJoin(crmUserProfiles, eq(crmUserProfiles.userId, crmSupportTickets.userId))
            .where(eq(crmSupportTickets.status, 'open'))
            .orderBy(desc(crmSupportTickets.createdAt));
    }
    async assignTicket(ticketId, assignedTo) {
        const [ticket] = await db
            .update(crmSupportTickets)
            .set({
            assignedTo,
            assignedAt: new Date(),
            status: 'in_progress'
        })
            .where(eq(crmSupportTickets.id, ticketId))
            .returning();
        return ticket;
    }
    // Admin Action Logging
    async logAdminAction(actionData) {
        const [log] = await db
            .insert(crmAdminLogs)
            .values(actionData)
            .returning();
        return log;
    }
    async getAdminLogs(adminId, limit = 100) {
        let query = db.select().from(crmAdminLogs);
        if (adminId) {
            query = query.where(eq(crmAdminLogs.adminId, adminId));
        }
        return await query
            .orderBy(desc(crmAdminLogs.createdAt))
            .limit(limit);
    }
    // Analytics & Reporting
    async getUserAnalytics(userId) {
        const profile = await this.getUserProfile(userId);
        const transactions = await this.getTransactionHistory(userId, 100);
        const bettingHistory = await db
            .select()
            .from(crmBettingHistory)
            .where(eq(crmBettingHistory.userId, userId))
            .orderBy(desc(crmBettingHistory.betPlacedAt))
            .limit(50);
        const riskAlerts = await this.getRiskAlerts(userId);
        return {
            profile,
            transactions: {
                total: transactions.length,
                volume: transactions.reduce((sum, t) => sum + parseFloat(t.usdValue?.toString() || '0'), 0),
                recent: transactions.slice(0, 10)
            },
            betting: {
                totalBets: bettingHistory.length,
                totalWagered: bettingHistory.reduce((sum, b) => sum + parseFloat(b.stakeUsdValue?.toString() || '0'), 0),
                totalWon: bettingHistory.reduce((sum, b) => sum + parseFloat(b.actualWin?.toString() || '0'), 0),
                recent: bettingHistory.slice(0, 10)
            },
            risks: {
                totalAlerts: riskAlerts.length,
                openAlerts: riskAlerts.filter(a => !a.isResolved).length,
                highRiskAlerts: riskAlerts.filter(a => a.severity === 'high' || a.severity === 'critical').length
            }
        };
    }
    async getPlatformAnalytics() {
        // Get user counts by segment
        const usersBySegment = await db
            .select({
            segment: crmUserProfiles.userSegment,
            count: count()
        })
            .from(crmUserProfiles)
            .groupBy(crmUserProfiles.userSegment);
        // Get KYC status distribution
        const kycDistribution = await db
            .select({
            status: crmUserProfiles.kycStatus,
            count: count()
        })
            .from(crmUserProfiles)
            .groupBy(crmUserProfiles.kycStatus);
        // Get risk level distribution
        const riskDistribution = await db
            .select({
            level: crmUserProfiles.riskLevel,
            count: count()
        })
            .from(crmUserProfiles)
            .groupBy(crmUserProfiles.riskLevel);
        // Get recent transaction volume
        const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const recentTransactionVolume = await db
            .select({
            totalVolume: sql `SUM(CAST(${crmTransactions.usdValue} AS DECIMAL))`,
            transactionCount: count()
        })
            .from(crmTransactions)
            .where(gte(crmTransactions.createdAt, last30Days));
        // Get open alerts count
        const openAlertsCount = await db
            .select({ count: count() })
            .from(crmRiskAlerts)
            .where(eq(crmRiskAlerts.isResolved, false));
        // Get open tickets count
        const openTicketsCount = await db
            .select({ count: count() })
            .from(crmSupportTickets)
            .where(eq(crmSupportTickets.status, 'open'));
        return {
            users: {
                bySegment: usersBySegment,
                kycDistribution,
                riskDistribution
            },
            transactions: recentTransactionVolume[0] || { totalVolume: 0, transactionCount: 0 },
            alerts: openAlertsCount[0]?.count || 0,
            support: openTicketsCount[0]?.count || 0
        };
    }
    // Compliance & AML Functions
    async flagUserForAML(userId, reason, adminId) {
        // Update user profile
        await this.updateUserProfile(userId, {
            complianceStatus: 'flagged',
            riskLevel: 'high'
        });
        // Create risk alert
        await this.createRiskAlert({
            userId,
            alertType: 'aml_flag',
            severity: 'high',
            title: 'AML Flag Applied',
            description: reason,
            data: { flaggedBy: adminId, timestamp: new Date() }
        });
        // Log admin action
        await this.logAdminAction({
            adminId,
            targetUserId: userId,
            action: 'flag_user_aml',
            entityType: 'user',
            entityId: userId,
            details: { reason }
        });
    }
    async performKYCCheck(userId, documents) {
        const profile = await this.getUserProfile(userId);
        if (!profile)
            throw new Error('User profile not found');
        // Simulate KYC verification process
        const kycResult = {
            status: 'verified',
            documents: documents.map(doc => ({
                ...doc,
                verifiedAt: new Date(),
                status: 'approved'
            }))
        };
        // Update user profile
        await this.updateUserProfile(userId, {
            kycStatus: 'advanced',
            documentsUploaded: kycResult.documents,
            documentVerificationDate: new Date()
        });
        return kycResult;
    }
    // Notification Management
    async sendNotificationToUsers(userIds, channel, subject, content, campaignName) {
        // Create campaign if provided
        let campaignId;
        if (campaignName) {
            const [campaign] = await db
                .insert(crmNotificationCampaigns)
                .values({
                name: campaignName,
                channel: channel,
                subject,
                content,
                totalTargeted: userIds.length,
                createdBy: 'system'
            })
                .returning();
            campaignId = campaign.id;
        }
        // Create notification logs for each user
        const notifications = userIds.map(userId => ({
            campaignId,
            userId,
            channel: channel,
            subject,
            content,
            status: 'sent',
            sentAt: new Date()
        }));
        await db.insert(crmNotificationLogs).values(notifications);
        return { sent: userIds.length, campaignId };
    }
    // Utility Functions
    async searchUsers(query, limit = 50) {
        return await db
            .select({
            id: crmUserProfiles.id,
            userId: crmUserProfiles.userId,
            email: users.email,
            fullName: crmUserProfiles.fullName,
            userSegment: crmUserProfiles.userSegment,
            kycStatus: crmUserProfiles.kycStatus,
            riskLevel: crmUserProfiles.riskLevel
        })
            .from(crmUserProfiles)
            .leftJoin(users, eq(users.id, crmUserProfiles.userId))
            .where(sql `${users.email} ILIKE ${'%' + query + '%'} OR ${crmUserProfiles.fullName} ILIKE ${'%' + query + '%'}`)
            .limit(limit);
    }
    async updateUserSegmentation() {
        // Get all users and their activity
        const users = await db
            .select({
            userId: crmUserProfiles.userId,
            totalDeposits: crmUserProfiles.totalDeposits,
            totalWagered: crmUserProfiles.totalWagered,
            lastLoginAt: crmUserProfiles.lastLoginAt,
            bettingFrequency: crmUserProfiles.bettingFrequency
        })
            .from(crmUserProfiles);
        // Update segments based on activity
        for (const user of users) {
            let newSegment = 'casual';
            const totalDeposits = parseFloat(user.totalDeposits?.toString() || '0');
            const totalWagered = parseFloat(user.totalWagered?.toString() || '0');
            const daysSinceLogin = user.lastLoginAt ?
                Math.floor((Date.now() - user.lastLoginAt.getTime()) / (24 * 60 * 60 * 1000)) : 999;
            // Segmentation logic
            if (totalDeposits > 50000 || totalWagered > 100000) {
                newSegment = 'high_roller';
            }
            else if (totalDeposits > 10000 || totalWagered > 25000) {
                newSegment = 'vip';
            }
            else if (daysSinceLogin > 30) {
                newSegment = 'churned';
            }
            else if (daysSinceLogin > 7) {
                newSegment = 'at_risk';
            }
            else if (totalDeposits < 100) {
                newSegment = 'new';
            }
            await this.updateUserProfile(user.userId, {
                userSegment: newSegment
            });
        }
    }
}
export const crmService = new CrmService();
