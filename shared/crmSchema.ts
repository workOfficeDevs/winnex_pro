import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  boolean,
  decimal,
  integer,
  serial,
  index,
  uuid,
  pgEnum
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums for CRM system
export const kycStatusEnum = pgEnum('kyc_status', ['basic', 'intermediate', 'advanced', 'pending', 'rejected']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'banned', 'self_excluded']);
export const userSegmentEnum = pgEnum('user_segment', ['high_roller', 'casual', 'vip', 'new', 'at_risk', 'churned']);
export const transactionStatusEnum = pgEnum('transaction_status', ['pending', 'confirmed', 'failed', 'flagged']);
export const riskLevelEnum = pgEnum('risk_level', ['low', 'medium', 'high', 'critical']);
export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'resolved', 'closed']);
export const adminRoleEnum = pgEnum('admin_role', ['support', 'risk', 'finance', 'super_admin']);
export const complianceStatusEnum = pgEnum('compliance_status', ['clear', 'flagged', 'under_review', 'blocked']);
export const messageChannelEnum = pgEnum('message_channel', ['email', 'sms', 'telegram', 'push', 'in_app']);

// CRM User Profiles (extended from main users table)
export const crmUserProfiles = pgTable("crm_user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  kycStatus: kycStatusEnum("kyc_status").default('basic'),
  userStatus: userStatusEnum("user_status").default('active'),
  userSegment: userSegmentEnum("user_segment").default('new'),
  riskLevel: riskLevelEnum("risk_level").default('low'),
  complianceStatus: complianceStatusEnum("compliance_status").default('clear'),
  
  // Personal Information
  fullName: varchar("full_name"),
  dateOfBirth: timestamp("date_of_birth"),
  address: jsonb("address"), // {street, city, state, country, zipCode}
  phoneNumber: varchar("phone_number"),
  nationality: varchar("nationality"),
  occupation: varchar("occupation"),
  sourceOfFunds: varchar("source_of_funds"),
  
  // KYC Documents
  documentsUploaded: jsonb("documents_uploaded"), // array of document objects
  documentVerificationDate: timestamp("document_verification_date"),
  documentExpiryDate: timestamp("document_expiry_date"),
  
  // Behavioral Data
  lastLoginAt: timestamp("last_login_at"),
  loginCount: integer("login_count").default(0),
  bettingFrequency: decimal("betting_frequency", { precision: 10, scale: 2 }).default('0'),
  avgBetAmount: decimal("avg_bet_amount", { precision: 15, scale: 2 }).default('0'),
  totalDeposits: decimal("total_deposits", { precision: 15, scale: 2 }).default('0'),
  totalWithdrawals: decimal("total_withdrawals", { precision: 15, scale: 2 }).default('0'),
  totalWagered: decimal("total_wagered", { precision: 15, scale: 2 }).default('0'),
  netProfitLoss: decimal("net_profit_loss", { precision: 15, scale: 2 }).default('0'),
  lifetimeValue: decimal("lifetime_value", { precision: 15, scale: 2 }).default('0'),
  
  // Risk & Compliance
  amlRiskScore: integer("aml_risk_score").default(0), // 0-100
  fraudRiskScore: integer("fraud_risk_score").default(0), // 0-100
  pepStatus: boolean("pep_status").default(false),
  sanctionsMatch: boolean("sanctions_match").default(false),
  
  // Preferences & Settings
  communicationPreferences: jsonb("communication_preferences"),
  bettingLimits: jsonb("betting_limits"),
  selfExclusionUntil: timestamp("self_exclusion_until"),
  
  // Metadata
  tags: jsonb("tags"), // array of tags
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_user_profiles_user_id").on(table.userId),
  index("idx_crm_user_profiles_kyc_status").on(table.kycStatus),
  index("idx_crm_user_profiles_risk_level").on(table.riskLevel),
]);

// Crypto Wallet Management
export const crmWallets = pgTable("crm_wallets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  currency: varchar("currency").notNull(), // BTC, ETH, USDT, etc.
  address: varchar("address").notNull(),
  isVerified: boolean("is_verified").default(false),
  isHotWallet: boolean("is_hot_wallet").default(true),
  balance: decimal("balance", { precision: 20, scale: 8 }).default('0'),
  lastTransactionAt: timestamp("last_transaction_at"),
  riskScore: integer("risk_score").default(0),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_wallets_user_id").on(table.userId),
  index("idx_crm_wallets_currency").on(table.currency),
]);

// Transaction Monitoring
export const crmTransactions = pgTable("crm_transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  walletId: integer("wallet_id").references(() => crmWallets.id),
  type: varchar("type").notNull(), // deposit, withdrawal, bet, win
  currency: varchar("currency").notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  usdValue: decimal("usd_value", { precision: 15, scale: 2 }),
  status: transactionStatusEnum("status").default('pending'),
  txHash: varchar("tx_hash"),
  fromAddress: varchar("from_address"),
  toAddress: varchar("to_address"),
  blockNumber: varchar("block_number"),
  confirmations: integer("confirmations").default(0),
  fees: decimal("fees", { precision: 20, scale: 8 }).default('0'),
  
  // AML & Risk
  amlRiskScore: integer("aml_risk_score").default(0),
  riskFlags: jsonb("risk_flags"), // array of risk indicators
  isAmlFlagged: boolean("is_aml_flagged").default(false),
  manualReviewRequired: boolean("manual_review_required").default(false),
  reviewedBy: varchar("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  reviewNotes: text("review_notes"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_transactions_user_id").on(table.userId),
  index("idx_crm_transactions_status").on(table.status),
  index("idx_crm_transactions_aml_flagged").on(table.isAmlFlagged),
]);

// Betting Analytics
export const crmBettingHistory = pgTable("crm_betting_history", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  betId: integer("bet_id").references(() => bets.id),
  sport: varchar("sport"),
  gameType: varchar("game_type"),
  stakeCurrency: varchar("stake_currency"),
  stakeAmount: decimal("stake_amount", { precision: 15, scale: 2 }),
  stakeUsdValue: decimal("stake_usd_value", { precision: 15, scale: 2 }),
  odds: decimal("odds", { precision: 10, scale: 2 }),
  potentialWin: decimal("potential_win", { precision: 15, scale: 2 }),
  actualWin: decimal("actual_win", { precision: 15, scale: 2 }).default('0'),
  result: varchar("result"), // win, loss, push, cancelled
  profitLoss: decimal("profit_loss", { precision: 15, scale: 2 }).default('0'),
  betPlacedAt: timestamp("bet_placed_at").defaultNow(),
  betSettledAt: timestamp("bet_settled_at"),
}, (table) => [
  index("idx_crm_betting_history_user_id").on(table.userId),
  index("idx_crm_betting_history_sport").on(table.sport),
  index("idx_crm_betting_history_result").on(table.result),
]);

// Risk & Behavior Alerts
export const crmRiskAlerts = pgTable("crm_risk_alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  alertType: varchar("alert_type").notNull(), // fraud_pattern, responsible_gambling, aml_suspicious, etc.
  severity: riskLevelEnum("severity").notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  data: jsonb("data"), // supporting data for the alert
  isResolved: boolean("is_resolved").default(false),
  resolvedBy: varchar("resolved_by"),
  resolvedAt: timestamp("resolved_at"),
  resolutionNotes: text("resolution_notes"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_risk_alerts_user_id").on(table.userId),
  index("idx_crm_risk_alerts_type").on(table.alertType),
  index("idx_crm_risk_alerts_severity").on(table.severity),
  index("idx_crm_risk_alerts_resolved").on(table.isResolved),
]);

// Customer Support System
export const crmSupportTickets = pgTable("crm_support_tickets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  ticketNumber: varchar("ticket_number").notNull().unique(),
  subject: varchar("subject").notNull(),
  description: text("description"),
  status: ticketStatusEnum("status").default('open'),
  priority: riskLevelEnum("priority").default('medium'),
  category: varchar("category"), // account, payment, betting, technical, compliance
  assignedTo: varchar("assigned_to"),
  assignedAt: timestamp("assigned_at"),
  firstResponseAt: timestamp("first_response_at"),
  resolvedAt: timestamp("resolved_at"),
  closedAt: timestamp("closed_at"),
  resolutionTime: integer("resolution_time"), // minutes
  satisfactionRating: integer("satisfaction_rating"), // 1-5
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_support_tickets_user_id").on(table.userId),
  index("idx_crm_support_tickets_status").on(table.status),
  index("idx_crm_support_tickets_assigned_to").on(table.assignedTo),
]);

// Support Ticket Messages
export const crmTicketMessages = pgTable("crm_ticket_messages", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id").notNull().references(() => crmSupportTickets.id),
  senderId: varchar("sender_id").notNull(), // user_id or admin_id
  senderType: varchar("sender_type").notNull(), // user or admin
  message: text("message").notNull(),
  attachments: jsonb("attachments"), // array of file objects
  isInternal: boolean("is_internal").default(false), // internal admin notes
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_ticket_messages_ticket_id").on(table.ticketId),
]);

// Admin Users & Permissions
export const crmAdminUsers = pgTable("crm_admin_users", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  role: adminRoleEnum("role").notNull(),
  permissions: jsonb("permissions"), // array of permission strings
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  loginAttempts: integer("login_attempts").default(0),
  isLocked: boolean("is_locked").default(false),
  lockedUntil: timestamp("locked_until"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: varchar("created_by"),
}, (table) => [
  index("idx_crm_admin_users_user_id").on(table.userId),
  index("idx_crm_admin_users_role").on(table.role),
]);

// Admin Action Logs
export const crmAdminLogs = pgTable("crm_admin_logs", {
  id: serial("id").primaryKey(),
  adminId: varchar("admin_id").notNull().references(() => users.id),
  targetUserId: varchar("target_user_id"),
  action: varchar("action").notNull(),
  entityType: varchar("entity_type"), // user, transaction, bet, etc.
  entityId: varchar("entity_id"),
  details: jsonb("details"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_admin_logs_admin_id").on(table.adminId),
  index("idx_crm_admin_logs_action").on(table.action),
  index("idx_crm_admin_logs_target_user_id").on(table.targetUserId),
]);

// Notification & Messaging System
export const crmNotificationCampaigns = pgTable("crm_notification_campaigns", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  channel: messageChannelEnum("channel").notNull(),
  targetSegment: userSegmentEnum("target_segment"),
  targetFilters: jsonb("target_filters"), // complex targeting rules
  subject: varchar("subject"),
  content: text("content"),
  templateData: jsonb("template_data"),
  
  // Scheduling
  scheduledAt: timestamp("scheduled_at"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  
  // Stats
  totalTargeted: integer("total_targeted").default(0),
  totalSent: integer("total_sent").default(0),
  totalDelivered: integer("total_delivered").default(0),
  totalOpened: integer("total_opened").default(0),
  totalClicked: integer("total_clicked").default(0),
  
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_notification_campaigns_channel").on(table.channel),
  index("idx_crm_notification_campaigns_scheduled_at").on(table.scheduledAt),
]);

// Individual Notification Logs
export const crmNotificationLogs = pgTable("crm_notification_logs", {
  id: serial("id").primaryKey(),
  campaignId: integer("campaign_id").references(() => crmNotificationCampaigns.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  channel: messageChannelEnum("channel").notNull(),
  recipient: varchar("recipient"), // email, phone, telegram_id
  subject: varchar("subject"),
  content: text("content"),
  status: varchar("status").notNull(), // sent, delivered, opened, clicked, failed
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at"),
  deliveredAt: timestamp("delivered_at"),
  openedAt: timestamp("opened_at"),
  clickedAt: timestamp("clicked_at"),
}, (table) => [
  index("idx_crm_notification_logs_campaign_id").on(table.campaignId),
  index("idx_crm_notification_logs_user_id").on(table.userId),
  index("idx_crm_notification_logs_status").on(table.status),
]);

// Affiliate & Referral Management
export const crmAffiliates = pgTable("crm_affiliates", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  referralCode: varchar("referral_code").notNull().unique(),
  affiliateType: varchar("affiliate_type").default('referral'), // referral, partner, influencer
  commissionRate: decimal("commission_rate", { precision: 5, scale: 4 }).default('0.05'),
  totalReferrals: integer("total_referrals").default(0),
  activeReferrals: integer("active_referrals").default(0),
  totalCommissionEarned: decimal("total_commission_earned", { precision: 15, scale: 2 }).default('0'),
  pendingCommission: decimal("pending_commission", { precision: 15, scale: 2 }).default('0'),
  lastPayoutAt: timestamp("last_payout_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_affiliates_user_id").on(table.userId),
  index("idx_crm_affiliates_referral_code").on(table.referralCode),
]);

// Referral Tracking
export const crmReferrals = pgTable("crm_referrals", {
  id: serial("id").primaryKey(),
  referrerId: varchar("referrer_id").notNull().references(() => users.id),
  refereeId: varchar("referee_id").notNull().references(() => users.id),
  referralCode: varchar("referral_code").notNull(),
  status: varchar("status").default('pending'), // pending, qualified, completed
  conversionAt: timestamp("conversion_at"),
  firstDepositAt: timestamp("first_deposit_at"),
  firstDepositAmount: decimal("first_deposit_amount", { precision: 15, scale: 2 }),
  totalRefereeValue: decimal("total_referee_value", { precision: 15, scale: 2 }).default('0'),
  commissionPaid: decimal("commission_paid", { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_referrals_referrer_id").on(table.referrerId),
  index("idx_crm_referrals_referee_id").on(table.refereeId),
  index("idx_crm_referrals_status").on(table.status),
]);

// Compliance & AML Reports
export const crmComplianceReports = pgTable("crm_compliance_reports", {
  id: serial("id").primaryKey(),
  reportType: varchar("report_type").notNull(), // sar, ctr, kyc_audit, aml_review
  userId: varchar("user_id").references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  findings: jsonb("findings"),
  recommendations: text("recommendations"),
  riskLevel: riskLevelEnum("risk_level").notNull(),
  status: varchar("status").default('draft'), // draft, submitted, reviewed, closed
  submittedBy: varchar("submitted_by").notNull(),
  submittedAt: timestamp("submitted_at"),
  reviewedBy: varchar("reviewed_by"),
  reviewedAt: timestamp("reviewed_at"),
  dueDate: timestamp("due_date"),
  attachments: jsonb("attachments"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_crm_compliance_reports_user_id").on(table.userId),
  index("idx_crm_compliance_reports_type").on(table.reportType),
  index("idx_crm_compliance_reports_status").on(table.status),
]);

// System Settings & Configuration
export const crmSettings = pgTable("crm_settings", {
  id: serial("id").primaryKey(),
  category: varchar("category").notNull(), // risk_thresholds, notification_templates, etc.
  key: varchar("key").notNull(),
  value: jsonb("value").notNull(),
  description: text("description"),
  isSystem: boolean("is_system").default(false),
  updatedBy: varchar("updated_by"),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_crm_settings_category").on(table.category),
  index("idx_crm_settings_key").on(table.key),
]);

// Import the main schema users and bets tables for references
import { users, bets } from "./schema";

// Export types for TypeScript usage
export type CrmUserProfile = typeof crmUserProfiles.$inferSelect;
export type InsertCrmUserProfile = typeof crmUserProfiles.$inferInsert;

export type CrmWallet = typeof crmWallets.$inferSelect;
export type InsertCrmWallet = typeof crmWallets.$inferInsert;

export type CrmTransaction = typeof crmTransactions.$inferSelect;
export type InsertCrmTransaction = typeof crmTransactions.$inferInsert;

export type CrmBettingHistory = typeof crmBettingHistory.$inferSelect;
export type InsertCrmBettingHistory = typeof crmBettingHistory.$inferInsert;

export type CrmRiskAlert = typeof crmRiskAlerts.$inferSelect;
export type InsertCrmRiskAlert = typeof crmRiskAlerts.$inferInsert;

export type CrmSupportTicket = typeof crmSupportTickets.$inferSelect;
export type InsertCrmSupportTicket = typeof crmSupportTickets.$inferInsert;

export type CrmTicketMessage = typeof crmTicketMessages.$inferSelect;
export type InsertCrmTicketMessage = typeof crmTicketMessages.$inferInsert;

export type CrmAdminUser = typeof crmAdminUsers.$inferSelect;
export type InsertCrmAdminUser = typeof crmAdminUsers.$inferInsert;

export type CrmAdminLog = typeof crmAdminLogs.$inferSelect;
export type InsertCrmAdminLog = typeof crmAdminLogs.$inferInsert;

export type CrmNotificationCampaign = typeof crmNotificationCampaigns.$inferSelect;
export type InsertCrmNotificationCampaign = typeof crmNotificationCampaigns.$inferInsert;

export type CrmNotificationLog = typeof crmNotificationLogs.$inferSelect;
export type InsertCrmNotificationLog = typeof crmNotificationLogs.$inferInsert;

export type CrmAffiliate = typeof crmAffiliates.$inferSelect;
export type InsertCrmAffiliate = typeof crmAffiliates.$inferInsert;

export type CrmReferral = typeof crmReferrals.$inferSelect;
export type InsertCrmReferral = typeof crmReferrals.$inferInsert;

export type CrmComplianceReport = typeof crmComplianceReports.$inferSelect;
export type InsertCrmComplianceReport = typeof crmComplianceReports.$inferInsert;

export type CrmSetting = typeof crmSettings.$inferSelect;
export type InsertCrmSetting = typeof crmSettings.$inferInsert;

// Zod schemas for validation
export const insertCrmUserProfileSchema = createInsertSchema(crmUserProfiles);
export const insertCrmWalletSchema = createInsertSchema(crmWallets);
export const insertCrmTransactionSchema = createInsertSchema(crmTransactions);
export const insertCrmRiskAlertSchema = createInsertSchema(crmRiskAlerts);
export const insertCrmSupportTicketSchema = createInsertSchema(crmSupportTickets);
export const insertCrmAdminLogSchema = createInsertSchema(crmAdminLogs);
export const insertCrmNotificationCampaignSchema = createInsertSchema(crmNotificationCampaigns);
export const insertCrmAffiliateSchema = createInsertSchema(crmAffiliates);
export const insertCrmComplianceReportSchema = createInsertSchema(crmComplianceReports);