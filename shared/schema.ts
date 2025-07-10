import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  uuid,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  passwordHash: varchar("password_hash"), // for email/password auth
  emailVerified: boolean("email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token"),
  resetPasswordToken: varchar("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires"),
  balance: decimal("balance", { precision: 10, scale: 2 }).default("0.00"),
  isAdmin: boolean("is_admin").default(false),
  role: varchar("role", { length: 20 }).default("user"), // user, manager, admin, super_admin
  permissions: text("permissions").array(), // granular permissions
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Admin sessions for separate admin login portal
export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  token: varchar("token").unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const sports = pgTable("sports", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  icon: varchar("icon", { length: 50 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  sportId: integer("sport_id").references(() => sports.id),
  team1: varchar("team1", { length: 100 }).notNull(),
  team2: varchar("team2", { length: 100 }).notNull(),
  league: varchar("league", { length: 100 }),
  startTime: timestamp("start_time").notNull(),
  status: varchar("status", { length: 20 }).default("scheduled"), // scheduled, live, finished, cancelled
  score1: integer("score1").default(0),
  score2: integer("score2").default(0),
  isLive: boolean("is_live").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const odds = pgTable("odds", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => matches.id),
  market: varchar("market", { length: 50 }).notNull(), // 1x2, over_under, handicap, etc.
  selection: varchar("selection", { length: 50 }).notNull(), // home, away, draw, over, under, etc.
  odds: decimal("odds", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bets = pgTable("bets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  matchId: integer("match_id").references(() => matches.id),
  market: varchar("market", { length: 50 }).notNull(),
  selection: varchar("selection", { length: 50 }).notNull(),
  odds: decimal("odds", { precision: 5, scale: 2 }).notNull(),
  stake: decimal("stake", { precision: 10, scale: 2 }).notNull(),
  potentialWin: decimal("potential_win", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, won, lost, cancelled
  placedAt: timestamp("placed_at").defaultNow(),
  settledAt: timestamp("settled_at"),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type", { length: 20 }).notNull(), // deposit, withdrawal, bet, win, bonus
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 20 }).default("completed"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const cryptoTransactions = pgTable("crypto_transactions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  type: text("type").notNull(), // deposit, withdrawal, bet, win
  currency: text("currency").notNull(), // BTC, ETH, USDT, LTC
  amount: decimal("amount", { precision: 18, scale: 8 }).notNull(),
  usdValue: decimal("usd_value", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(), // pending, confirmed, failed
  txHash: text("tx_hash"),
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cryptoBalances = pgTable("crypto_balances", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  currency: text("currency").notNull(),
  balance: decimal("balance", { precision: 18, scale: 8 }).notNull().default("0"),
  depositAddress: text("deposit_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  userCurrencyIdx: uniqueIndex("user_currency_idx").on(table.userId, table.currency),
}));

// Schemas for validation
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertSportSchema = createInsertSchema(sports).omit({
  id: true,
  createdAt: true,
});
export type InsertSport = z.infer<typeof insertSportSchema>;

export const insertMatchSchema = createInsertSchema(matches).omit({
  id: true,
  createdAt: true,
});
export type InsertMatch = z.infer<typeof insertMatchSchema>;

export const insertOddsSchema = createInsertSchema(odds).omit({
  id: true,
  updatedAt: true,
});
export type InsertOdds = z.infer<typeof insertOddsSchema>;

export const insertBetSchema = createInsertSchema(bets).omit({
  id: true,
  placedAt: true,
  settledAt: true,
});
export type InsertBet = z.infer<typeof insertBetSchema>;

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export const insertCryptoTransactionSchema = createInsertSchema(cryptoTransactions);
export type InsertCryptoTransaction = z.infer<typeof insertCryptoTransactionSchema>;

export const insertCryptoBalanceSchema = createInsertSchema(cryptoBalances).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertCryptoBalance = z.infer<typeof insertCryptoBalanceSchema>;

export type Sport = typeof sports.$inferSelect;
export type Match = typeof matches.$inferSelect;
export type Odds = typeof odds.$inferSelect;
export type Bet = typeof bets.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;
export type CryptoTransaction = typeof cryptoTransactions.$inferSelect;
export type CryptoBalance = typeof cryptoBalances.$inferSelect;

// Enhanced schema for core enhancements
export const promotions = pgTable("promotions", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 20 }).notNull(), // welcome_bonus, deposit_match, free_bet, odds_boost
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  minDeposit: decimal("min_deposit", { precision: 10, scale: 2 }),
  maxBonus: decimal("max_bonus", { precision: 10, scale: 2 }),
  validFrom: timestamp("valid_from").notNull(),
  validTo: timestamp("valid_to").notNull(),
  isActive: boolean("is_active").default(true),
  usageLimit: integer("usage_limit"), // null = unlimited
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userPromotions = pgTable("user_promotions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  promotionId: integer("promotion_id").references(() => promotions.id),
  status: varchar("status", { length: 20 }).default("active"), // active, used, expired
  bonusAmount: decimal("bonus_amount", { precision: 10, scale: 2 }),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userPromotionIdx: uniqueIndex("user_promotion_idx").on(table.userId, table.promotionId),
}));

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: varchar("referrer_id").references(() => users.id),
  refereeId: varchar("referee_id").references(() => users.id),
  status: varchar("status", { length: 20 }).default("pending"), // pending, completed, paid
  bonusAmount: decimal("bonus_amount", { precision: 10, scale: 2 }),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  refereeIdx: uniqueIndex("referee_idx").on(table.refereeId),
}));

export const userLimits = pgTable("user_limits", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).unique(),
  dailyDepositLimit: decimal("daily_deposit_limit", { precision: 10, scale: 2 }),
  weeklyDepositLimit: decimal("weekly_deposit_limit", { precision: 10, scale: 2 }),
  monthlyDepositLimit: decimal("monthly_deposit_limit", { precision: 10, scale: 2 }),
  dailyBetLimit: decimal("daily_bet_limit", { precision: 10, scale: 2 }),
  weeklyBetLimit: decimal("weekly_bet_limit", { precision: 10, scale: 2 }),
  monthlyBetLimit: decimal("monthly_bet_limit", { precision: 10, scale: 2 }),
  sessionTimeLimit: integer("session_time_limit"), // minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const oddsMargins = pgTable("odds_margins", {
  id: serial("id").primaryKey(),
  sportId: integer("sport_id").references(() => sports.id),
  market: varchar("market", { length: 50 }).notNull(),
  marginPercentage: decimal("margin_percentage", { precision: 5, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => ({
  sportMarketIdx: uniqueIndex("sport_market_idx").on(table.sportId, table.market),
}));

export const userFavorites = pgTable("user_favorites", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type", { length: 20 }).notNull(), // team, sport, league
  entityId: varchar("entity_id", { length: 100 }).notNull(),
  entityName: varchar("entity_name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  userEntityIdx: uniqueIndex("user_entity_idx").on(table.userId, table.type, table.entityId),
}));

export const cashOuts = pgTable("cash_outs", {
  id: serial("id").primaryKey(),
  betId: integer("bet_id").references(() => bets.id),
  userId: varchar("user_id").references(() => users.id),
  originalStake: decimal("original_stake", { precision: 10, scale: 2 }).notNull(),
  cashOutValue: decimal("cash_out_value", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, completed, failed
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enhanced match data for better event scheduling
export const leagues = pgTable("leagues", {
  id: serial("id").primaryKey(),
  sportId: integer("sport_id").references(() => sports.id),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull(),
  country: varchar("country", { length: 50 }),
  season: varchar("season", { length: 20 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => ({
  slugIdx: uniqueIndex("league_slug_idx").on(table.slug),
}));

// Update matches table to include league reference
export const enhancedMatches = pgTable("enhanced_matches", {
  id: serial("id").primaryKey(),
  sportId: integer("sport_id").references(() => sports.id),
  leagueId: integer("league_id").references(() => leagues.id),
  team1: varchar("team1", { length: 100 }).notNull(),
  team2: varchar("team2", { length: 100 }).notNull(),
  startTime: timestamp("start_time").notNull(),
  status: varchar("status", { length: 20 }).default("scheduled"), // scheduled, live, finished, cancelled, postponed
  score1: integer("score1").default(0),
  score2: integer("score2").default(0),
  period: varchar("period", { length: 20 }), // 1st_half, 2nd_half, overtime, etc.
  timeRemaining: varchar("time_remaining", { length: 20 }),
  isLive: boolean("is_live").default(false),
  isFeatured: boolean("is_featured").default(false),
  viewCount: integer("view_count").default(0),
  betCount: integer("bet_count").default(0),
  totalVolume: decimal("total_volume", { precision: 15, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced odds with margins and boosts
export const enhancedOdds = pgTable("enhanced_odds", {
  id: serial("id").primaryKey(),
  matchId: integer("match_id").references(() => enhancedMatches.id),
  market: varchar("market", { length: 50 }).notNull(),
  selection: varchar("selection", { length: 50 }).notNull(),
  baseOdds: decimal("base_odds", { precision: 5, scale: 2 }).notNull(),
  adjustedOdds: decimal("adjusted_odds", { precision: 5, scale: 2 }).notNull(),
  margin: decimal("margin", { precision: 5, scale: 2 }).notNull(),
  isBoosted: boolean("is_boosted").default(false),
  boostPercentage: decimal("boost_percentage", { precision: 5, scale: 2 }),
  isActive: boolean("is_active").default(true),
  volume: decimal("volume", { precision: 15, scale: 2 }).default("0"),
  lastUpdate: timestamp("last_update").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced bets with settlement tracking
export const enhancedBets = pgTable("enhanced_bets", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  matchId: integer("match_id").references(() => enhancedMatches.id),
  market: varchar("market", { length: 50 }).notNull(),
  selection: varchar("selection", { length: 50 }).notNull(),
  odds: decimal("odds", { precision: 5, scale: 2 }).notNull(),
  stake: decimal("stake", { precision: 10, scale: 2 }).notNull(),
  potentialWin: decimal("potential_win", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).default("pending"), // pending, won, lost, cancelled, cashed_out
  betType: varchar("bet_type", { length: 20 }).default("single"), // single, combo, system
  isLive: boolean("is_live").default(false),
  cashOutValue: decimal("cash_out_value", { precision: 10, scale: 2 }),
  settlementData: jsonb("settlement_data"),
  placedAt: timestamp("placed_at").defaultNow(),
  settledAt: timestamp("settled_at"),
  autoSettled: boolean("auto_settled").default(false),
});

// Schema types for new tables
export const insertPromotionSchema = createInsertSchema(promotions).omit({
  id: true,
  usageCount: true,
  createdAt: true,
});
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;

export const insertUserPromotionSchema = createInsertSchema(userPromotions).omit({
  id: true,
  createdAt: true,
});
export type InsertUserPromotion = z.infer<typeof insertUserPromotionSchema>;

export const insertReferralSchema = createInsertSchema(referrals).omit({
  id: true,
  createdAt: true,
});
export type InsertReferral = z.infer<typeof insertReferralSchema>;

export const insertUserLimitsSchema = createInsertSchema(userLimits).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUserLimits = z.infer<typeof insertUserLimitsSchema>;

export const insertLeagueSchema = createInsertSchema(leagues).omit({
  id: true,
  createdAt: true,
});
export type InsertLeague = z.infer<typeof insertLeagueSchema>;

export const insertUserFavoriteSchema = createInsertSchema(userFavorites).omit({
  id: true,
  createdAt: true,
});
export type InsertUserFavorite = z.infer<typeof insertUserFavoriteSchema>;

export const insertCashOutSchema = createInsertSchema(cashOuts).omit({
  id: true,
  createdAt: true,
});
export type InsertCashOut = z.infer<typeof insertCashOutSchema>;

// Export types
export type Promotion = typeof promotions.$inferSelect;
export type UserPromotion = typeof userPromotions.$inferSelect;
export type Referral = typeof referrals.$inferSelect;
export type UserLimits = typeof userLimits.$inferSelect;
export type League = typeof leagues.$inferSelect;
export type UserFavorite = typeof userFavorites.$inferSelect;
export type CashOut = typeof cashOuts.$inferSelect;
export type EnhancedMatch = typeof enhancedMatches.$inferSelect;
export type EnhancedOdds = typeof enhancedOdds.$inferSelect;
export type EnhancedBet = typeof enhancedBets.$inferSelect;

// Export CRM schema
export * from "./crmSchema";
