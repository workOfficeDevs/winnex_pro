import { db } from "./db";
import { crmUserProfiles, crmWallets, crmTransactions, crmRiskAlerts, crmSupportTickets, crmAdminUsers, crmAdminLogs, crmNotificationCampaigns, crmAffiliates, crmSettings } from "@shared/crmSchema";
import { users } from "@shared/schema";
export async function seedCrmData() {
    try {
        console.log("🔄 Seeding CRM demo data...");
        // Get existing users to create profiles for
        const existingUsers = await db.select().from(users).limit(10);
        if (existingUsers.length === 0) {
            console.log("No users found, skipping CRM data seeding");
            return;
        }
        // Create CRM user profiles
        const profilesData = existingUsers.map((user, index) => ({
            userId: user.id,
            fullName: `Demo User ${index + 1}`,
            kycStatus: ['basic', 'intermediate', 'advanced'][index % 3],
            userSegment: ['new', 'casual', 'vip', 'high_roller'][index % 4],
            riskLevel: ['low', 'medium', 'high'][index % 3],
            complianceStatus: 'clear',
            phoneNumber: `+1-555-0${100 + index}`,
            nationality: 'US',
            occupation: ['Engineer', 'Teacher', 'Doctor', 'Lawyer', 'Artist'][index % 5],
            totalDeposits: (Math.random() * 50000).toFixed(2),
            totalWagered: (Math.random() * 100000).toFixed(2),
            lifetimeValue: (Math.random() * 25000).toFixed(2),
            amlRiskScore: Math.floor(Math.random() * 100),
            fraudRiskScore: Math.floor(Math.random() * 50),
            lastLoginAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            loginCount: Math.floor(Math.random() * 100) + 1,
            bettingFrequency: (Math.random() * 10).toFixed(2),
            avgBetAmount: (Math.random() * 500).toFixed(2),
            tags: JSON.stringify(['demo', 'test_user']),
            communicationPreferences: JSON.stringify({
                email: true,
                sms: false,
                push: true
            }),
            address: JSON.stringify({
                street: `${100 + index} Demo Street`,
                city: 'Demo City',
                state: 'CA',
                country: 'US',
                zipCode: `9000${index}`
            })
        }));
        await db.insert(crmUserProfiles).values(profilesData).onConflictDoNothing();
        // Create demo risk alerts
        const alertsData = existingUsers.slice(0, 5).map((user, index) => ({
            userId: user.id,
            alertType: ['fraud_pattern', 'responsible_gambling', 'aml_suspicious', 'high_velocity'][index % 4],
            severity: ['low', 'medium', 'high', 'critical'][index % 4],
            title: [
                'Unusual Betting Pattern Detected',
                'Spending Limit Exceeded',
                'Suspicious Transaction Activity',
                'Multiple Account Login Attempts',
                'High-Risk Jurisdiction Activity'
            ][index],
            description: [
                'User has placed an unusually high number of bets in a short timeframe',
                'User has exceeded their daily spending limit multiple times this week',
                'Transaction patterns suggest potential money laundering activity',
                'Multiple failed login attempts from different locations detected',
                'Activity detected from high-risk jurisdiction requiring review'
            ][index],
            isResolved: index < 2,
            data: JSON.stringify({
                triggerAmount: Math.random() * 10000,
                timeframe: '24h',
                riskScore: Math.floor(Math.random() * 100)
            })
        }));
        await db.insert(crmRiskAlerts).values(alertsData).onConflictDoNothing();
        // Create demo support tickets
        const ticketsData = existingUsers.slice(0, 3).map((user, index) => ({
            userId: user.id,
            ticketNumber: `TKT-${Date.now() + index}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
            subject: [
                'Withdrawal Request Assistance',
                'Account Verification Help',
                'Betting Limit Increase Request'
            ][index],
            description: [
                'I need help processing my withdrawal request that has been pending for 2 days.',
                'I uploaded my documents but my account verification is still pending.',
                'I would like to increase my daily betting limit for upcoming games.'
            ][index],
            status: ['open', 'in_progress', 'resolved'][index],
            priority: ['medium', 'high', 'low'][index],
            category: ['payment', 'account', 'betting'][index],
            assignedTo: index === 1 ? 'admin' : null
        }));
        await db.insert(crmSupportTickets).values(ticketsData).onConflictDoNothing();
        // Create demo crypto wallets
        const walletsData = existingUsers.slice(0, 5).flatMap((user, userIndex) => ['BTC', 'ETH', 'USDT'].map((currency, currencyIndex) => ({
            userId: user.id,
            currency,
            address: `demo_${currency.toLowerCase()}_${userIndex}_${Date.now()}`,
            isVerified: Math.random() > 0.3,
            balance: (Math.random() * 10).toFixed(8),
            riskScore: Math.floor(Math.random() * 50)
        })));
        await db.insert(crmWallets).values(walletsData).onConflictDoNothing();
        // Create demo transactions
        const transactionsData = existingUsers.slice(0, 5).flatMap((user, userIndex) => Array.from({ length: 3 }, (_, transIndex) => ({
            userId: user.id,
            type: ['deposit', 'withdrawal', 'bet', 'win'][transIndex % 4],
            currency: ['BTC', 'ETH', 'USDT'][transIndex % 3],
            amount: (Math.random() * 5).toFixed(8),
            usdValue: (Math.random() * 1000).toFixed(2),
            status: ['confirmed', 'pending', 'confirmed'][transIndex % 3],
            txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
            amlRiskScore: Math.floor(Math.random() * 100),
            isAmlFlagged: Math.random() < 0.1,
            riskFlags: JSON.stringify(Math.random() < 0.2 ? ['high_amount', 'rapid_succession'] : [])
        })));
        await db.insert(crmTransactions).values(transactionsData).onConflictDoNothing();
        // Create demo affiliates
        const affiliatesData = existingUsers.slice(0, 2).map((user, index) => ({
            userId: user.id,
            referralCode: `REF${user.id.slice(-6).toUpperCase()}`,
            affiliateType: ['referral', 'partner'][index],
            commissionRate: '0.05',
            totalReferrals: Math.floor(Math.random() * 20),
            activeReferrals: Math.floor(Math.random() * 15),
            totalCommissionEarned: (Math.random() * 5000).toFixed(2),
            pendingCommission: (Math.random() * 500).toFixed(2)
        }));
        await db.insert(crmAffiliates).values(affiliatesData).onConflictDoNothing();
        // Create demo notification campaigns
        const campaignsData = [
            {
                name: 'Welcome Bonus Campaign',
                description: 'Welcome new users with bonus offers',
                channel: 'email',
                targetSegment: 'new',
                subject: 'Welcome to Winnex Pro - Claim Your Bonus!',
                content: 'Welcome to our platform! Claim your welcome bonus now.',
                totalTargeted: 100,
                totalSent: 95,
                totalDelivered: 92,
                totalOpened: 68,
                totalClicked: 23,
                createdBy: 'system'
            },
            {
                name: 'VIP User Retention',
                description: 'Retention campaign for VIP users',
                channel: 'sms',
                targetSegment: 'vip',
                subject: 'Exclusive VIP Offer',
                content: 'As a VIP member, you have exclusive access to premium features.',
                totalTargeted: 50,
                totalSent: 48,
                totalDelivered: 46,
                totalOpened: 35,
                totalClicked: 12,
                createdBy: 'admin'
            }
        ];
        await db.insert(crmNotificationCampaigns).values(campaignsData).onConflictDoNothing();
        // Create admin users
        const adminData = existingUsers.slice(0, 1).map(user => ({
            userId: user.id,
            role: 'super_admin',
            permissions: JSON.stringify(['view_all', 'edit_all', 'delete_all', 'manage_users']),
            lastLoginAt: new Date(),
            createdBy: 'system'
        }));
        await db.insert(crmAdminUsers).values(adminData).onConflictDoNothing();
        // Create demo admin logs
        const logsData = Array.from({ length: 10 }, (_, index) => ({
            adminId: existingUsers[0].id,
            action: [
                'user_profile_update',
                'risk_alert_resolved',
                'ticket_assigned',
                'user_flagged',
                'kyc_approved',
                'transaction_reviewed'
            ][index % 6],
            entityType: ['user', 'alert', 'ticket', 'transaction'][index % 4],
            entityId: (index + 1).toString(),
            details: JSON.stringify({
                action: 'demo_action',
                timestamp: new Date(),
                changes: ['field_updated']
            }),
            ipAddress: `192.168.1.${100 + index}`,
            userAgent: 'Mozilla/5.0 (Demo Browser)'
        }));
        await db.insert(crmAdminLogs).values(logsData).onConflictDoNothing();
        // Create system settings
        const settingsData = [
            {
                category: 'risk_thresholds',
                key: 'max_daily_deposit',
                value: JSON.stringify({ amount: 10000, currency: 'USD' }),
                description: 'Maximum daily deposit amount before triggering review'
            },
            {
                category: 'kyc_requirements',
                key: 'document_expiry_days',
                value: JSON.stringify(365),
                description: 'Number of days before KYC documents expire'
            },
            {
                category: 'notification_templates',
                key: 'welcome_email',
                value: JSON.stringify({
                    subject: 'Welcome to Winnex Pro',
                    template: 'welcome_template'
                }),
                description: 'Welcome email template configuration'
            },
            {
                category: 'compliance',
                key: 'aml_risk_threshold',
                value: JSON.stringify(75),
                description: 'AML risk score threshold for automatic flagging'
            }
        ];
        await db.insert(crmSettings).values(settingsData).onConflictDoNothing();
        console.log("✅ CRM demo data seeded successfully!");
        console.log(`- Created profiles for ${existingUsers.length} users`);
        console.log(`- Created ${alertsData.length} risk alerts`);
        console.log(`- Created ${ticketsData.length} support tickets`);
        console.log(`- Created ${walletsData.length} crypto wallets`);
        console.log(`- Created ${transactionsData.length} transactions`);
        console.log(`- Created ${affiliatesData.length} affiliate records`);
        console.log(`- Created ${campaignsData.length} notification campaigns`);
        console.log(`- Created ${adminData.length} admin users`);
        console.log(`- Created ${logsData.length} admin logs`);
        console.log(`- Created ${settingsData.length} system settings`);
    }
    catch (error) {
        console.error("❌ Error seeding CRM data:", error);
    }
}
