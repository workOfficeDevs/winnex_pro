import { db } from "./db";
import { promotions, userPromotions, referrals, users, transactions } from "@shared/schema";
import { eq, and, sql, gte, lte } from "drizzle-orm";
import { EventEmitter } from "events";
import { nanoid } from "nanoid";
export class PromotionService extends EventEmitter {
    constructor() {
        super();
        this.validationRules = new Map();
        this.initializeValidationRules();
        console.log('🎁 Promotion Service initialized');
    }
    initializeValidationRules() {
        // Welcome bonus validation
        this.validationRules.set('welcome_bonus', async (userId, promotion) => {
            // Check if user already used a welcome bonus
            const existingBonus = await db
                .select()
                .from(userPromotions)
                .where(and(eq(userPromotions.userId, userId), eq(userPromotions.promotionId, promotion.id)))
                .limit(1);
            if (existingBonus.length > 0) {
                return { isValid: false, reason: 'Welcome bonus already claimed' };
            }
            return {
                isValid: true,
                bonusAmount: parseFloat(promotion.value),
                promotion
            };
        });
        // Deposit match validation
        this.validationRules.set('deposit_match', async (userId, promotion, data) => {
            if (!data?.depositAmount) {
                return { isValid: false, reason: 'Deposit amount required' };
            }
            const minDeposit = parseFloat(promotion.minDeposit || '0');
            if (data.depositAmount < minDeposit) {
                return { isValid: false, reason: `Minimum deposit required: ${minDeposit}` };
            }
            // Calculate bonus amount (percentage of deposit)
            const bonusPercentage = parseFloat(promotion.value);
            let bonusAmount = (data.depositAmount * bonusPercentage) / 100;
            // Apply max bonus cap
            const maxBonus = parseFloat(promotion.maxBonus || '0');
            if (maxBonus > 0) {
                bonusAmount = Math.min(bonusAmount, maxBonus);
            }
            return {
                isValid: true,
                bonusAmount,
                promotion
            };
        });
        // Free bet validation
        this.validationRules.set('free_bet', async (userId, promotion) => {
            // Check usage limit
            const currentUsage = await db
                .select({ count: sql `COUNT(*)` })
                .from(userPromotions)
                .where(eq(userPromotions.promotionId, promotion.id));
            const usageLimit = promotion.usageLimit;
            if (usageLimit && currentUsage[0].count >= usageLimit) {
                return { isValid: false, reason: 'Promotion usage limit reached' };
            }
            return {
                isValid: true,
                bonusAmount: parseFloat(promotion.value),
                promotion
            };
        });
        // Odds boost validation
        this.validationRules.set('odds_boost', async (userId, promotion, data) => {
            if (!data?.betAmount || !data?.odds) {
                return { isValid: false, reason: 'Bet amount and odds required' };
            }
            const minBet = parseFloat(promotion.minDeposit || '0'); // Reusing minDeposit as min bet
            if (data.betAmount < minBet) {
                return { isValid: false, reason: `Minimum bet required: ${minBet}` };
            }
            // Calculate boosted odds value
            const boostPercentage = parseFloat(promotion.value);
            const boostedOdds = data.odds * (1 + boostPercentage / 100);
            const additionalValue = data.betAmount * (boostedOdds - data.odds);
            return {
                isValid: true,
                bonusAmount: additionalValue,
                promotion
            };
        });
    }
    // Create new promotion
    async createPromotion(promotionData) {
        try {
            const promotion = await db
                .insert(promotions)
                .values({
                code: promotionData.code.toUpperCase(),
                title: promotionData.title,
                description: promotionData.description,
                type: promotionData.type,
                value: promotionData.value.toString(),
                minDeposit: promotionData.minDeposit?.toString(),
                maxBonus: promotionData.maxBonus?.toString(),
                validFrom: promotionData.validFrom,
                validTo: promotionData.validTo,
                usageLimit: promotionData.usageLimit,
                isActive: true
            })
                .returning();
            console.log(`🎉 Created promotion: ${promotionData.code} - ${promotionData.title}`);
            this.emit('promotionCreated', promotion[0]);
            return promotion[0];
        }
        catch (error) {
            console.error('Error creating promotion:', error);
            throw error;
        }
    }
    // Validate and apply promotion code
    async applyPromotionCode(userId, code, data) {
        try {
            // Find active promotion
            const promotion = await db
                .select()
                .from(promotions)
                .where(and(eq(promotions.code, code.toUpperCase()), eq(promotions.isActive, true), lte(promotions.validFrom, new Date()), gte(promotions.validTo, new Date())))
                .limit(1);
            if (!promotion[0]) {
                return { isValid: false, reason: 'Invalid or expired promotion code' };
            }
            // Check if user already used this promotion
            const existingUsage = await db
                .select()
                .from(userPromotions)
                .where(and(eq(userPromotions.userId, userId), eq(userPromotions.promotionId, promotion[0].id)))
                .limit(1);
            if (existingUsage.length > 0) {
                return { isValid: false, reason: 'Promotion already used' };
            }
            // Validate promotion type-specific rules
            const validator = this.validationRules.get(promotion[0].type);
            if (!validator) {
                return { isValid: false, reason: 'Unsupported promotion type' };
            }
            const validation = await validator(userId, promotion[0], data);
            if (validation.isValid) {
                // Apply promotion
                await this.grantPromotion(userId, promotion[0], validation.bonusAmount);
            }
            return validation;
        }
        catch (error) {
            console.error('Error applying promotion code:', error);
            return { isValid: false, reason: 'System error' };
        }
    }
    // Grant promotion to user
    async grantPromotion(userId, promotion, bonusAmount) {
        try {
            // Record user promotion
            await db.insert(userPromotions).values({
                userId,
                promotionId: promotion.id,
                status: 'active',
                bonusAmount: bonusAmount.toString(),
                usedAt: new Date()
            });
            // Credit bonus to user account
            await db
                .update(users)
                .set({
                balance: sql `${users.balance} + ${bonusAmount}`
            })
                .where(eq(users.id, userId));
            // Record transaction
            await db.insert(transactions).values({
                userId,
                type: 'bonus',
                amount: bonusAmount.toString(),
                description: `Promotion bonus: ${promotion.title}`,
                status: 'completed'
            });
            // Update promotion usage count
            await db
                .update(promotions)
                .set({
                usageCount: sql `${promotions.usageCount} + 1`
            })
                .where(eq(promotions.id, promotion.id));
            console.log(`💰 Granted ${bonusAmount} bonus to user ${userId} for promotion ${promotion.code}`);
            this.emit('promotionGranted', {
                userId,
                promotionCode: promotion.code,
                bonusAmount
            });
        }
        catch (error) {
            console.error('Error granting promotion:', error);
            throw error;
        }
    }
    // Create referral link
    async createReferralLink(userId) {
        const referralCode = nanoid(8).toUpperCase();
        // Store referral code in user data (we could extend users table or create referral_codes table)
        console.log(`🔗 Created referral link for user ${userId}: REF-${referralCode}`);
        return `REF-${referralCode}`;
    }
    // Process referral signup
    async processReferralSignup(refereeId, referralCode) {
        try {
            // Extract referrer ID from referral code (simplified - in production, store mapping)
            const referrerId = await this.getReferrerFromCode(referralCode);
            if (!referrerId) {
                return null;
            }
            // Check if referee already has a referrer
            const existingReferral = await db
                .select()
                .from(referrals)
                .where(eq(referrals.refereeId, refereeId))
                .limit(1);
            if (existingReferral.length > 0) {
                return null; // Already referred
            }
            const bonusAmount = 25.00; // $25 referral bonus
            // Create referral record
            const referral = await db
                .insert(referrals)
                .values({
                referrerId,
                refereeId,
                status: 'pending',
                bonusAmount: bonusAmount.toString()
            })
                .returning();
            console.log(`👥 Processed referral: ${referrerId} → ${refereeId}`);
            this.emit('referralCreated', {
                referrerId,
                refereeId,
                bonusAmount
            });
            return {
                referrerId,
                refereeId,
                bonusAmount,
                status: 'pending'
            };
        }
        catch (error) {
            console.error('Error processing referral signup:', error);
            return null;
        }
    }
    // Complete referral (when referee makes first deposit/bet)
    async completeReferral(refereeId, qualifyingAmount = 50) {
        try {
            const referral = await db
                .select()
                .from(referrals)
                .where(and(eq(referrals.refereeId, refereeId), eq(referrals.status, 'pending')))
                .limit(1);
            if (!referral[0])
                return;
            const bonusAmount = parseFloat(referral[0].bonusAmount || '0');
            // Credit bonus to referrer
            await db
                .update(users)
                .set({
                balance: sql `${users.balance} + ${bonusAmount}`
            })
                .where(eq(users.id, referral[0].referrerId));
            // Update referral status
            await db
                .update(referrals)
                .set({
                status: 'completed',
                paidAt: new Date()
            })
                .where(eq(referrals.id, referral[0].id));
            // Record transaction
            await db.insert(transactions).values({
                userId: referral[0].referrerId,
                type: 'bonus',
                amount: bonusAmount.toString(),
                description: `Referral bonus for ${refereeId}`,
                status: 'completed'
            });
            console.log(`🎁 Completed referral bonus: ${bonusAmount} to ${referral[0].referrerId}`);
            this.emit('referralCompleted', {
                referrerId: referral[0].referrerId,
                refereeId,
                bonusAmount
            });
        }
        catch (error) {
            console.error('Error completing referral:', error);
        }
    }
    // Get user's active promotions
    async getUserPromotions(userId) {
        try {
            const userPromos = await db
                .select({
                id: userPromotions.id,
                bonusAmount: userPromotions.bonusAmount,
                status: userPromotions.status,
                usedAt: userPromotions.usedAt,
                promotion: promotions
            })
                .from(userPromotions)
                .leftJoin(promotions, eq(userPromotions.promotionId, promotions.id))
                .where(eq(userPromotions.userId, userId));
            return userPromos;
        }
        catch (error) {
            console.error('Error getting user promotions:', error);
            return [];
        }
    }
    // Get available promotions
    async getAvailablePromotions(userId) {
        try {
            const currentDate = new Date();
            let availablePromos = await db
                .select()
                .from(promotions)
                .where(and(eq(promotions.isActive, true), lte(promotions.validFrom, currentDate), gte(promotions.validTo, currentDate)));
            // Filter out already used promotions for specific user
            if (userId) {
                const usedPromos = await db
                    .select({ promotionId: userPromotions.promotionId })
                    .from(userPromotions)
                    .where(eq(userPromotions.userId, userId));
                const usedIds = usedPromos.map(up => up.promotionId);
                availablePromos = availablePromos.filter(promo => !usedIds.includes(promo.id));
            }
            return availablePromos;
        }
        catch (error) {
            console.error('Error getting available promotions:', error);
            return [];
        }
    }
    // Get promotion analytics
    async getPromotionAnalytics(promotionId) {
        try {
            if (promotionId) {
                // Single promotion analytics
                const analytics = await db
                    .select({
                    promotionId: userPromotions.promotionId,
                    totalUsage: sql `COUNT(*)`,
                    totalBonusAmount: sql `SUM(${userPromotions.bonusAmount})`,
                    activeUsers: sql `COUNT(DISTINCT ${userPromotions.userId})`
                })
                    .from(userPromotions)
                    .where(eq(userPromotions.promotionId, promotionId))
                    .groupBy(userPromotions.promotionId);
                return analytics[0];
            }
            else {
                // All promotions analytics
                const analytics = await db
                    .select({
                    promotionId: userPromotions.promotionId,
                    promotionCode: promotions.code,
                    promotionTitle: promotions.title,
                    totalUsage: sql `COUNT(*)`,
                    totalBonusAmount: sql `SUM(${userPromotions.bonusAmount})`,
                    activeUsers: sql `COUNT(DISTINCT ${userPromotions.userId})`
                })
                    .from(userPromotions)
                    .leftJoin(promotions, eq(userPromotions.promotionId, promotions.id))
                    .groupBy(userPromotions.promotionId, promotions.code, promotions.title);
                return analytics;
            }
        }
        catch (error) {
            console.error('Error getting promotion analytics:', error);
            return [];
        }
    }
    // Simplified referrer lookup (in production, implement proper mapping)
    async getReferrerFromCode(referralCode) {
        // This is a simplified implementation
        // In production, store referral codes in a separate table
        return 'sample_referrer_id'; // Placeholder
    }
    // Deactivate promotion
    async deactivatePromotion(promotionId) {
        try {
            await db
                .update(promotions)
                .set({ isActive: false })
                .where(eq(promotions.id, promotionId));
            console.log(`🚫 Deactivated promotion ${promotionId}`);
            this.emit('promotionDeactivated', { promotionId });
        }
        catch (error) {
            console.error('Error deactivating promotion:', error);
            throw error;
        }
    }
}
export const promotionService = new PromotionService();
