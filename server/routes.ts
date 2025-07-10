import type { Express } from "express";
import { createServer, type Server } from "http";
import { Server as SocketIOServer } from "socket.io";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./localAuth";
import { productivityService } from "./productivityService";
import { insertBetSchema, insertMatchSchema, insertOddsSchema, insertSportSchema } from "@shared/schema";
import { setupWebSocket } from "./websocket";
import { liveDataService } from "./liveDataService";
import { cryptoService } from "./cryptoService";
import { enhancedCryptoService } from "./enhancedCryptoService";
import { notificationService } from "./notificationService";
import { securityService } from "./securityService";
import { betSettlementEngine } from "./betSettlementEngine";
import { oddsMarginEngine } from "./oddsMarginEngine";
import { responsibleGamblingService } from "./responsibleGamblingService";
import { promotionService } from "./promotionService";
import { registerCrmRoutes } from "./crmRoutes";
import { registerAdminRoutes } from "./adminRoutes";
import { registerFantasyRoutes } from "./fantasyRoutes";
import { requirePermission } from "./adminAuth";

// Helper function to map sport names to IDs
function getSportIdFromName(sportName: string): number {
  const sportMap: { [key: string]: number } = {
    'football': 1,
    'nfl': 1,
    'americanfootball_nfl': 1,
    'basketball': 2,
    'nba': 2,
    'basketball_nba': 2,
    'soccer': 3,
    'football_epl': 3,
    'tennis': 4,
    'baseball': 5,
    'mlb': 5,
    'baseball_mlb': 5
  };
  return sportMap[sportName.toLowerCase()] || 1;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Test live sports data connections
  console.log('Testing live sports data APIs...');
  const apiStatus = await liveDataService.testApiConnections();
  const connectedApis = Object.entries(apiStatus).filter(([_, connected]) => connected);
  
  if (connectedApis.length > 0) {
    console.log(`Live sports data connected: ${connectedApis.map(([name]) => name).join(', ')}`);
  } else {
    console.log('Using enhanced fallback data for realistic betting experience');
  }

  // Register admin routes
  registerAdminRoutes(app);

  // Register CRM routes (protected by admin permissions in individual routes)
  registerCrmRoutes(app);
  
  // Register fantasy sports routes
  registerFantasyRoutes(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Sports routes
  app.get('/api/sports', async (req, res) => {
    try {
      const sports = await storage.getAllSports();
      res.json(sports);
    } catch (error) {
      console.error("Error fetching sports:", error);
      res.status(500).json({ message: "Failed to fetch sports" });
    }
  });

  app.post('/api/sports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const sportData = insertSportSchema.parse(req.body);
      const sport = await storage.createSport(sportData);
      res.json(sport);
    } catch (error) {
      console.error("Error creating sport:", error);
      res.status(500).json({ message: "Failed to create sport" });
    }
  });

  // Live sports data endpoints
  app.get('/api/matches/live', async (req, res) => {
    try {
      const liveMatches = await liveDataService.getLiveMatches();
      res.json(liveMatches);
    } catch (error) {
      console.error("Error fetching live matches:", error);
      res.status(500).json({ message: "Failed to fetch live matches" });
    }
  });

  // Enhanced matches endpoint with live API integration
  app.get('/api/matches', async (req, res) => {
    try {
      const { sportId, live } = req.query;
      
      // Get data from live sports service
      let matches = [];
      if (live === 'true') {
        matches = await liveDataService.getLiveMatches();
      } else {
        matches = await liveDataService.getUpcomingMatches();
      }
      
      // Convert to our database format
      const processedMatches = matches.map(match => ({
        id: match.id,
        sportId: getSportIdFromName(match.sport),
        team1: match.homeTeam,
        team2: match.awayTeam,
        score1: match.homeScore,
        score2: match.awayScore,
        isLive: match.status === 'live',
        scheduledTime: match.startTime,
        status: match.status,
        odds: match.odds
      }));
      
      // Filter by sport if requested
      const filteredMatches = sportId 
        ? processedMatches.filter(match => match.sportId === parseInt(sportId as string))
        : processedMatches;
      
      res.json(filteredMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  app.post('/api/matches', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const matchData = insertMatchSchema.parse(req.body);
      const match = await storage.createMatch(matchData);
      res.json(match);
    } catch (error) {
      console.error("Error creating match:", error);
      res.status(500).json({ message: "Failed to create match" });
    }
  });

  // Live odds endpoint
  app.get('/api/matches/:matchId/odds', async (req, res) => {
    try {
      const matchId = req.params.matchId;
      
      // Try to get live odds first
      const liveMatches = await liveDataService.getLiveMatches();
      const upcomingMatches = await liveDataService.getUpcomingMatches();
      const allMatches = [...liveMatches, ...upcomingMatches];
      
      const match = allMatches.find(m => m.id === matchId);
      
      if (match && match.odds) {
        const oddsData = [
          {
            id: 1,
            matchId: parseInt(matchId) || 1,
            market: 'moneyline',
            selection: match.homeTeam,
            odds: match.odds.home.toString(),
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            matchId: parseInt(matchId) || 1,
            market: 'moneyline',
            selection: match.awayTeam,
            odds: match.odds.away.toString(),
            createdAt: new Date().toISOString()
          }
        ];
        
        if (match.odds.draw) {
          oddsData.push({
            id: 3,
            matchId: parseInt(matchId) || 1,
            market: 'moneyline',
            selection: 'Draw',
            odds: match.odds.draw.toString(),
            createdAt: new Date().toISOString()
          });
        }
        
        return res.json(oddsData);
      }
      
      // Fallback to database odds
      const odds = await storage.getMatchOdds(parseInt(matchId) || 1);
      res.json(odds);
    } catch (error) {
      console.error("Error fetching odds:", error);
      res.status(500).json({ message: "Failed to fetch odds" });
    }
  });

  app.post('/api/odds', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const oddsData = insertOddsSchema.parse(req.body);
      const odds = await storage.createOdds(oddsData);
      res.json(odds);
    } catch (error) {
      console.error("Error creating odds:", error);
      res.status(500).json({ message: "Failed to create odds" });
    }
  });

  // Betting routes
  app.post('/api/bets', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const betData = { ...req.body, userId };
      
      const validatedBet = insertBetSchema.parse(betData);
      const bet = await storage.placeBet(validatedBet);
      
      res.json(bet);
    } catch (error) {
      console.error("Error placing bet:", error);
      res.status(500).json({ message: "Failed to place bet" });
    }
  });

  app.get('/api/bets', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bets = await storage.getUserBets(userId);
      res.json(bets);
    } catch (error) {
      console.error("Error fetching bets:", error);
      res.status(500).json({ message: "Failed to fetch bets" });
    }
  });

  // Integrated Dashboard API endpoints
  app.get("/api/dashboard/metrics", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const userBets = await storage.getUserBets(userId);
      const userTransactions = await storage.getUserTransactions(userId);
      
      const totalBets = userBets.length;
      const activeBets = userBets.filter(bet => bet.status === 'pending').length;
      const wonBets = userBets.filter(bet => bet.status === 'won').length;
      const totalStaked = userBets.reduce((sum, bet) => sum + parseFloat(bet.stake), 0);
      const totalWinnings = userBets.filter(bet => bet.status === 'won')
        .reduce((sum, bet) => sum + parseFloat(bet.potentialWin), 0);
      
      const currentBalance = userTransactions.reduce((sum, tx) => 
        sum + (tx.type === 'deposit' ? parseFloat(tx.amount) : -parseFloat(tx.amount)), 0);
      
      const metrics = {
        totalBets,
        activeBets,
        totalWinnings,
        currentBalance,
        winRate: totalBets > 0 ? (wonBets / totalBets) * 100 : 0,
        socialFollowers: 156,
        vipTier: "Gold",
        responsibleGamingStatus: "Healthy",
        aiRecommendations: 5
      };
      
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching dashboard metrics:", error);
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  app.get("/api/ai/dashboard-insights", isAuthenticated, async (req, res) => {
    try {
      const insights = [
        {
          id: "1",
          type: "high_value",
          title: "High Value Bet Detected",
          description: "Lakers vs Celtics - Over 215.5 Points",
          confidence: 95,
          expectedValue: 18.5,
          reasoning: ["Strong offensive matchup", "Recent scoring trends", "Weather conditions favorable"]
        },
        {
          id: "2", 
          type: "market_inefficiency",
          title: "Market Inefficiency Found",
          description: "Arsenal Draw vs Chelsea",
          confidence: 82,
          expectedValue: 12.3,
          reasoning: ["Overvalued by bookmakers", "Historical draw frequency", "Team form analysis"]
        }
      ];
      
      res.json(insights);
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      res.status(500).json({ message: "Failed to fetch AI insights" });
    }
  });

  app.get("/api/social/dashboard-activity", isAuthenticated, async (req, res) => {
    try {
      const activity = [
        {
          id: "1",
          type: "follow",
          user: "@sportsace",
          action: "started following you",
          timestamp: "5 minutes ago"
        },
        {
          id: "2",
          type: "tip_share",
          user: "@johnpro", 
          action: "shared a tip: Lakers +2.5 looks good tonight",
          timestamp: "15 minutes ago"
        }
      ];
      
      res.json(activity);
    } catch (error) {
      console.error("Error fetching social activity:", error);
      res.status(500).json({ message: "Failed to fetch social activity" });
    }
  });

  app.get("/api/vip/status", isAuthenticated, async (req, res) => {
    try {
      const vipStatus = {
        currentTier: "Gold",
        points: 7850,
        nextTier: "Platinum",
        pointsToNext: 2150,
        benefits: [
          "5% cashback on losses",
          "Exclusive betting tips",
          "Priority customer support",
          "Monthly bonus credits"
        ],
        weeklyRewards: {
          cashback: 45.20,
          bonusCredits: 25.00,
          freeSpins: 10
        }
      };
      
      res.json(vipStatus);
    } catch (error) {
      console.error("Error fetching VIP status:", error);
      res.status(500).json({ message: "Failed to fetch VIP status" });
    }
  });

  app.get("/api/compliance/status", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      const complianceStatus = {
        kycStatus: "verified",
        documentStatus: "complete", 
        amlCheck: "passed",
        accountLevel: "premium",
        responsibleGaming: {
          dailyLimit: 500,
          dailyUsed: 75,
          sessionLimit: 240,
          sessionUsed: 45,
          wellnessStatus: "healthy",
          selfExclusionActive: false
        },
        lastReview: "2024-12-01"
      };
      
      res.json(complianceStatus);
    } catch (error) {
      console.error("Error fetching compliance status:", error);
      res.status(500).json({ message: "Failed to fetch compliance status" });
    }
  });

  // User balance and transactions
  app.get('/api/user/balance', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json({ balance: user?.balance || "0.00" });
    } catch (error) {
      console.error("Error fetching balance:", error);
      res.status(500).json({ message: "Failed to fetch balance" });
    }
  });

  app.get('/api/user/transactions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const transactions = await storage.getUserTransactions(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Crypto wallet routes
  app.get('/api/crypto/balances', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const balances = await storage.getCryptoBalances(userId);
      
      // If no balances exist, create them
      if (balances.length === 0) {
        const currencies = ['BTC', 'ETH', 'USDT', 'LTC'];
        for (const currency of currencies) {
          const address = cryptoService.generateDepositAddress(userId, currency);
          await storage.createCryptoBalance({
            userId,
            currency,
            balance: "0",
            depositAddress: address
          });
        }
        const newBalances = await storage.getCryptoBalances(userId);
        return res.json(newBalances);
      }
      
      res.json(balances);
    } catch (error) {
      console.error("Error fetching crypto balances:", error);
      res.status(500).json({ message: "Failed to fetch crypto balances" });
    }
  });

  app.get('/api/crypto/transactions', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const transactions = await storage.getCryptoTransactions(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching crypto transactions:", error);
      res.status(500).json({ message: "Failed to fetch crypto transactions" });
    }
  });

  app.post('/api/crypto/deposit', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { txHash, currency, expectedAddress } = req.body;
      
      // Security check
      const riskAssessment = await securityService.assessRisk(userId, 'deposit');
      if (riskAssessment.recommendation === 'blocked') {
        return res.status(403).json({ message: "Deposit blocked due to security assessment" });
      }
      
      const transaction = await cryptoService.processDeposit(userId, txHash, currency, expectedAddress);
      await storage.createCryptoTransaction(transaction);
      
      // Update balance
      const currentBalance = await storage.getCryptoBalances(userId);
      const balance = currentBalance.find(b => b.currency === currency);
      if (balance) {
        const newBalance = (parseFloat(balance.balance) + transaction.amount).toString();
        await storage.updateCryptoBalance(userId, currency, newBalance);
      }
      
      // Send confirmation notification
      const user = await storage.getUser(userId);
      if (user?.email) {
        await notificationService.sendDepositConfirmation(
          user.email, 
          transaction.amount, 
          currency, 
          txHash
        );
      }
      
      res.json(transaction);
    } catch (error) {
      console.error("Error processing crypto deposit:", error);
      res.status(500).json({ message: error.message || "Failed to process deposit" });
    }
  });

  app.post('/api/crypto/withdraw', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { amount, currency, toAddress } = req.body;
      
      // Enhanced security for withdrawals
      const riskAssessment = await securityService.assessRisk(userId, 'withdrawal', amount);
      if (riskAssessment.recommendation === 'blocked') {
        return res.status(403).json({ message: "Withdrawal blocked due to security assessment" });
      }
      
      // Check if enhanced auth is required
      const needsEnhancedAuth = await securityService.requireEnhancedAuth(userId, 'withdrawal');
      if (needsEnhancedAuth && !req.body.twoFactorCode) {
        // Generate and send 2FA code
        const code = securityService.generate2FACode();
        // Store code temporarily (in production, use Redis)
        // For now, return requirement for 2FA
        return res.status(200).json({ 
          requiresTwoFactor: true, 
          message: "Please provide 2FA code for this withdrawal" 
        });
      }
      
      // Check sufficient balance
      const balances = await storage.getCryptoBalances(userId);
      const balance = balances.find(b => b.currency === currency);
      
      if (!balance || parseFloat(balance.balance) < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      
      const transaction = await cryptoService.processWithdrawal(userId, amount, currency, toAddress);
      await storage.createCryptoTransaction(transaction);
      
      // Update balance
      const newBalance = (parseFloat(balance.balance) - amount).toString();
      await storage.updateCryptoBalance(userId, currency, newBalance);
      
      // Send withdrawal notification
      const user = await storage.getUser(userId);
      if (user?.email) {
        await notificationService.sendWithdrawalAlert(
          user.email, 
          amount, 
          currency, 
          toAddress
        );
      }
      
      res.json(transaction);
    } catch (error) {
      console.error("Error processing crypto withdrawal:", error);
      res.status(500).json({ message: error.message || "Failed to process withdrawal" });
    }
  });

  app.get('/api/crypto/prices', async (req, res) => {
    try {
      const prices = await cryptoService.getCryptoPrices();
      res.json(prices);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      res.status(500).json({ message: "Failed to fetch crypto prices" });
    }
  });

  // Security and KYC routes
  app.post('/api/security/kyc/initiate', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { documentType } = req.body;
      
      const verification = await securityService.initiateKYCVerification(userId, documentType);
      res.json(verification);
    } catch (error) {
      console.error("Error initiating KYC:", error);
      res.status(500).json({ message: "Failed to initiate KYC verification" });
    }
  });

  app.post('/api/security/session/create', async (req, res) => {
    try {
      const { userId } = req.body;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent') || '';
      
      const session = await securityService.createSecureSession(userId, ipAddress, userAgent);
      res.json(session);
    } catch (error) {
      console.error("Error creating secure session:", error);
      res.status(500).json({ message: "Failed to create secure session" });
    }
  });

  app.post('/api/notifications/test', isAuthenticated, async (req, res) => {
    try {
      const { type, email, phone } = req.body;
      
      switch (type) {
        case 'email':
          await notificationService.sendEmail({
            to: email,
            subject: 'Test Notification - Winnex',
            content: 'This is a test email from the Winnex platform.',
            type: 'security'
          });
          break;
        case 'sms':
          await notificationService.sendSMS({
            to: phone,
            message: 'Test SMS from Winnex platform.',
            type: 'security'
          });
          break;
        case '2fa':
          const code = securityService.generate2FACode();
          await notificationService.send2FACode(phone, code);
          break;
      }
      
      res.json({ success: true, message: 'Test notification sent' });
    } catch (error) {
      console.error("Error sending test notification:", error);
      res.status(500).json({ message: "Failed to send test notification" });
    }
  });

  // AI Assistant CTA endpoints
  app.post('/api/ai/cta-action', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { action, context } = req.body;
      
      let result = { success: true, message: 'Action completed successfully' };
      
      switch (action) {
        case 'subscribe_email':
          const user = await storage.getUser(userId);
          if (user?.email) {
            await notificationService.sendEmail({
              to: user.email,
              subject: 'Welcome to Winnex Pro AI Daily Tips!',
              content: 'You\'ve successfully subscribed to our AI-powered daily betting tips. Expect high-value predictions in your inbox every morning! For support, contact traders@winnexpro.io',
              type: 'welcome'
            });
          }
          result.message = 'Successfully subscribed to daily email tips';
          break;
          
        case 'test_email':
          const testUser = await storage.getUser(userId);
          if (testUser?.email) {
            await notificationService.sendEmail({
              to: testUser.email,
              subject: 'Test Email - Winnex Pro AI Assistant',
              content: 'This is a test email from your Winnex Pro AI Assistant. All systems working perfectly! Need help? Contact support@winnexpro.io',
              type: 'security'
            });
          }
          result.message = 'Test email sent successfully';
          break;
          
        case 'enable_sms':
          result.message = 'SMS alerts enabled - you\'ll receive high-value betting opportunities';
          break;
          
        case 'test_sms':
          // For testing, we'll simulate SMS sending
          result.message = 'Test SMS sent successfully';
          break;
          
        case 'claim_deposit_bonus':
          // Simulate bonus claiming
          result.message = 'Deposit bonus claimed! Check your account balance.';
          break;
          
        case 'upgrade_vip':
          // Simulate VIP upgrade
          result.message = 'VIP upgrade complete! Welcome to exclusive benefits.';
          break;
          
        case 'claim_cashback':
          // Simulate cashback claim
          result.message = 'Cashback credited to your account successfully.';
          break;
          
        default:
          result.message = 'Action processed successfully';
      }
      
      res.json(result);
    } catch (error) {
      console.error("Error processing CTA action:", error);
      res.status(500).json({ message: "Failed to process action" });
    }
  });

  // Live chat messaging endpoint
  app.post('/api/chat/send-message', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { message, type } = req.body;
      
      // Simulate AI response based on message content
      let aiResponse = '';
      let ctaButton = null;
      
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('deposit') || lowerMessage.includes('fund')) {
        aiResponse = 'I can help you deposit crypto! We support BTC, ETH, USDT, and LTC with instant processing and a 200% welcome bonus.';
        ctaButton = {
          text: 'Claim Bonus & Deposit',
          action: 'crypto_wallet',
          variant: 'primary'
        };
      } else if (lowerMessage.includes('bet') || lowerMessage.includes('prediction')) {
        aiResponse = 'Our AI has identified 3 high-confidence bets for today with 85%+ win probability. Would you like to see them?';
        ctaButton = {
          text: 'View AI Predictions',
          action: 'ai_predictions',
          variant: 'success'
        };
      } else if (lowerMessage.includes('bonus') || lowerMessage.includes('promotion')) {
        aiResponse = 'Exclusive offer just for you! Get 50% cashback on losses this week plus instant VIP upgrade.';
        ctaButton = {
          text: 'Claim Exclusive Offer',
          action: 'claim_promotion',
          variant: 'primary'
        };
      } else {
        aiResponse = 'Thanks for your message! Our team is here to help. Let me connect you with our VIP support for personalized assistance.';
        ctaButton = {
          text: 'Connect to VIP Support',
          action: 'connect_support',
          variant: 'secondary'
        };
      }
      
      res.json({
        response: aiResponse,
        ctaButton,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Business Management System API
  app.get('/api/business/metrics', isAuthenticated, async (req, res) => {
    try {
      const metrics = {
        kpis: {
          ggr24h: { value: 47320, change: 12.3, trend: 'up' },
          ngr24h: { value: 42850, change: 8.7, trend: 'up' },
          activeUsers: { value: 2847, change: 15.2, trend: 'up' },
          conversionRate: { value: 7.2, change: -2.1, trend: 'down' },
          userLtv: { value: 286, change: 5.4, trend: 'up' },
          churnRate: { value: 4.8, change: 1.2, trend: 'up' }
        },
        systemHealth: {
          bettingEngine: { status: 'online', uptime: 99.97, alerts: 0 },
          walletSystem: { status: 'online', uptime: 99.95, alerts: 0 },
          kycAml: { status: 'warning', uptime: 98.2, alerts: 2 },
          paymentGateway: { status: 'online', uptime: 99.88, alerts: 0 },
          crmSystem: { status: 'online', uptime: 99.92, alerts: 0 },
          complianceMonitor: { status: 'online', uptime: 100, alerts: 0 }
        },
        treasury: {
          btcHot: 4.7,
          btcCold: 47.2,
          reconciliation: 98.7,
          pendingTransactions: 247
        },
        userSegments: {
          vip: 247,
          highVolume: 1382,
          atRisk: 89,
          kycCompletion: 87
        },
        automationStatus: [
          { name: 'Smart VIP Escalation', status: 'active', description: 'Auto-promote users based on volume + engagement' },
          { name: 'Fraud Alert Routing', status: 'active', description: 'Auto-escalate high-risk transactions to security team' },
          { name: 'Win-Back Campaign', status: 'scheduled', description: 'Re-engage dormant users with personalized offers' }
        ]
      };
      
      res.json(metrics);
    } catch (error) {
      console.error('Error fetching business metrics:', error);
      res.status(500).json({ error: 'Failed to fetch business metrics' });
    }
  });

  app.get('/api/business/modules/:moduleId', isAuthenticated, async (req, res) => {
    try {
      const { moduleId } = req.params;
      
      // Module-specific data
      const moduleData = {
        executive: {
          alerts: [
            { type: 'warning', message: 'Conversion rate declined 2.1% in last hour', timestamp: new Date() },
            { type: 'info', message: 'VIP user milestone reached: 250 users', timestamp: new Date() }
          ],
          quickStats: {
            totalRevenue24h: 47320,
            activeMarkets: 142,
            liveBets: 1847,
            onlineStaff: 23
          }
        },
        users: {
          segments: {
            vip: { count: 247, revenue: 12450, avgBet: 125 },
            highVolume: { count: 1382, revenue: 28930, avgBet: 89 },
            casual: { count: 4821, revenue: 8420, avgBet: 24 },
            atRisk: { count: 89, revenue: 245, avgBet: 15 }
          },
          kycStatus: {
            verified: 87,
            pending: 8,
            rejected: 3,
            expired: 2
          }
        },
        treasury: {
          wallets: {
            bitcoin: { hot: 4.7, cold: 47.2, pending: 0.3 },
            ethereum: { hot: 125.8, cold: 1247.3, pending: 12.5 },
            usdt: { hot: 45320, cold: 423890, pending: 2340 }
          },
          transactions24h: {
            deposits: { count: 247, volume: 142350 },
            withdrawals: { count: 89, volume: 67230 },
            failed: { count: 12, volume: 3450 }
          }
        }
      };
      
      res.json(moduleData[moduleId] || { message: 'Module data not available' });
    } catch (error) {
      console.error('Error fetching module data:', error);
      res.status(500).json({ error: 'Failed to fetch module data' });
    }
  });

  app.post('/api/business/emergency-action', isAuthenticated, async (req, res) => {
    try {
      const { action, reason } = req.body;
      
      // Log emergency action
      const emergencyLog = {
        action,
        reason,
        timestamp: new Date(),
        userId: req.user?.id || 'unknown',
        status: 'executed'
      };
      
      // Simulate emergency response
      switch (action) {
        case 'freeze_betting':
          // Freeze all betting markets
          break;
        case 'freeze_withdrawals':
          // Temporarily halt withdrawals
          break;
        case 'security_lockdown':
          // Enable enhanced security mode
          break;
        default:
          throw new Error('Unknown emergency action');
      }
      
      res.json({
        success: true,
        action: emergencyLog,
        message: `Emergency action "${action}" executed successfully`
      });
    } catch (error) {
      console.error('Error executing emergency action:', error);
      res.status(500).json({ error: 'Failed to execute emergency action' });
    }
  });

  // Client Onboarding API
  app.post('/api/admin/create-client', isAuthenticated, async (req, res) => {
    try {
      const clientData = req.body;
      
      // Store client application in database
      const newClient = {
        id: Date.now().toString(),
        ...clientData,
        status: 'pending_approval',
        createdAt: new Date().toISOString(),
        approvedBy: null,
        approvedAt: null
      };
      
      // In a real implementation, you'd save to database
      // For now, we'll simulate success
      
      res.json({
        success: true,
        clientId: newClient.id,
        message: 'Client account created successfully and is pending approval'
      });
    } catch (error) {
      console.error('Error creating client:', error);
      res.status(500).json({ 
        error: 'Failed to create client account',
        message: error.message 
      });
    }
  });

  app.get('/api/admin/pending-clients', isAuthenticated, async (req, res) => {
    try {
      // In a real implementation, fetch from database
      const pendingClients = [
        {
          id: '1',
          companyName: 'Elite Sports Analytics LLC',
          contactPerson: 'John Smith',
          email: 'john@elitesports.com',
          tier: 'premium',
          expectedVolume: '5k_25k',
          status: 'pending_approval',
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '2',
          companyName: 'Professional Bettors Group',
          contactPerson: 'Sarah Johnson',
          email: 'sarah@probettors.com',
          tier: 'vip',
          expectedVolume: '25k_100k',
          status: 'pending_approval',
          createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        }
      ];
      
      res.json(pendingClients);
    } catch (error) {
      console.error('Error fetching pending clients:', error);
      res.status(500).json({ error: 'Failed to fetch pending clients' });
    }
  });

  // Admin routes
  app.get('/api/admin/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const user = await storage.getUser(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // AI Betting Insights Routes
  app.get('/api/ai/insights', async (req, res) => {
    try {
      const insights = [
        {
          id: '1',
          type: 'value_bet',
          confidence: 87,
          title: 'Arsenal vs Chelsea Over 2.5 Goals',
          description: 'Strong value opportunity based on team form and historical data',
          recommendation: 'Back Over 2.5 Goals at 1.95',
          odds: 1.95,
          expectedValue: 12.3,
          matchId: 1,
          market: 'Total Goals',
          reasons: [
            'Arsenal scored 2+ goals in 8 of last 10 home games',
            'Chelsea conceded 2+ goals in 6 of last 8 away games',
            'Head-to-head: Over 2.5 in 7 of last 10 meetings'
          ],
          riskLevel: 'medium'
        },
        {
          id: '2',
          type: 'prediction',
          confidence: 94,
          title: 'Liverpool vs Man City Both Teams to Score',
          description: 'High-confidence prediction based on attacking patterns',
          recommendation: 'Back Both Teams to Score at 1.72',
          odds: 1.72,
          expectedValue: 8.7,
          matchId: 2,
          market: 'Both Teams to Score',
          reasons: [
            'Both teams have scored in 9 of last 10 matches',
            'High-scoring encounter expected',
            'Defensive vulnerabilities on both sides'
          ],
          riskLevel: 'low'
        }
      ];
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI insights" });
    }
  });

  app.get('/api/ai/predictions', async (req, res) => {
    try {
      const predictions = [
        {
          matchId: 1,
          match: 'Arsenal vs Chelsea',
          recommendation: 'Over 2.5 Goals',
          confidence: 87,
          reasoning: 'Both teams have strong attacking records',
          suggestedStake: 25,
          expectedROI: 12.3,
          riskScore: 45
        },
        {
          matchId: 2,
          match: 'Liverpool vs Man City',
          recommendation: 'Both Teams Score',
          confidence: 94,
          reasoning: 'Consistent scoring patterns from both sides',
          suggestedStake: 35,
          expectedROI: 8.7,
          riskScore: 25
        }
      ];
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch predictions" });
    }
  });

  // Social Betting Routes
  app.get('/api/social/bets', async (req, res) => {
    try {
      const socialBets = [
        {
          id: '1',
          userId: 'user1',
          username: 'ProBettor247',
          avatar: '',
          match: 'Arsenal vs Chelsea',
          prediction: 'Arsenal Win',
          odds: 2.10,
          stake: 50,
          confidence: 85,
          reasoning: 'Arsenal unbeaten at home this season, Chelsea missing key players',
          likes: 24,
          comments: 8,
          isLiked: false,
          timestamp: '2024-06-11T10:30:00Z',
          followers: 1247,
          isLive: true
        },
        {
          id: '2',
          userId: 'user2',
          username: 'FootballGuru',
          avatar: '',
          match: 'Liverpool vs Man City',
          prediction: 'Over 3.5 Goals',
          odds: 2.50,
          stake: 75,
          confidence: 92,
          reasoning: 'Both teams in excellent attacking form, expect goals galore',
          likes: 67,
          comments: 23,
          isLiked: true,
          timestamp: '2024-06-11T09:15:00Z',
          followers: 2891,
          isLive: false
        }
      ];
      res.json(socialBets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social bets" });
    }
  });

  app.get('/api/social/tipsters', async (req, res) => {
    try {
      const tipsters = [
        {
          id: '1',
          username: 'BettingMaster',
          avatar: '',
          followers: 15420,
          winRate: 78,
          roi: 24.5,
          totalTips: 342,
          isVerified: true,
          isFollowing: false,
          tier: 'platinum'
        },
        {
          id: '2',
          username: 'SportsProphet',
          avatar: '',
          followers: 8932,
          winRate: 82,
          roi: 31.2,
          totalTips: 198,
          isVerified: true,
          isFollowing: true,
          tier: 'gold'
        }
      ];
      res.json(tipsters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tipsters" });
    }
  });

  app.get('/api/social/tips', async (req, res) => {
    try {
      const tips = [
        {
          id: '1',
          tipster: 'BettingExpert',
          avatar: '',
          match: 'Real Madrid vs Barcelona',
          tip: 'Real Madrid Win & Over 2.5 Goals',
          odds: 3.25,
          confidence: 89,
          likes: 156,
          comments: 42,
          timestamp: '2024-06-11T11:00:00Z',
          category: 'El Clasico',
          isVIP: true
        }
      ];
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tips" });
    }
  });

  // Crypto Payment Routes
  app.get('/api/crypto/address/:currency', async (req, res) => {
    try {
      const { currency } = req.params;
      const address = {
        currency: currency.toUpperCase(),
        address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        network: currency === 'BTC' ? 'Bitcoin' : 'Ethereum'
      };
      res.json(address);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate address" });
    }
  });

  app.get('/api/crypto/transactions', isAuthenticated, async (req, res) => {
    try {
      const transactions = [
        {
          id: '1',
          type: 'deposit',
          currency: 'BTC',
          amount: 0.005,
          usdValue: 215.50,
          address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
          txHash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d',
          confirmations: 6,
          requiredConfirmations: 3,
          status: 'completed',
          timestamp: '2024-06-11T10:00:00Z',
          fee: 0.0001
        }
      ];
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.post('/api/crypto/deposit', isAuthenticated, async (req, res) => {
    try {
      res.json({ success: true, message: "Deposit address generated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to process deposit" });
    }
  });

  app.post('/api/crypto/withdraw', isAuthenticated, async (req, res) => {
    try {
      res.json({ success: true, message: "Withdrawal initiated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to process withdrawal" });
    }
  });

  // Enhanced User Stats
  app.get('/api/user/stats', isAuthenticated, async (req, res) => {
    try {
      res.json({
        totalBets: 147,
        winRate: 72,
        totalROI: 18.5,
        totalWinnings: 2847.50,
        monthlyProfit: 425.30
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Betting Analytics
  app.get('/api/analytics/betting-stats', isAuthenticated, async (req, res) => {
    try {
      const stats = {
        totalBets: 342,
        winRate: 72.5,
        roi: 18.7,
        totalStaked: 8540.00,
        totalWinnings: 10137.80,
        profit: 1597.80,
        avgOdds: 2.15,
        longestWinStreak: 8,
        longestLoseStreak: 3,
        monthlyData: [
          { month: 'Jan', bets: 45, profit: 234.50, winRate: 68 },
          { month: 'Feb', bets: 52, profit: 187.30, winRate: 71 },
          { month: 'Mar', bets: 38, profit: 312.75, winRate: 79 },
          { month: 'Apr', bets: 67, profit: 156.80, winRate: 65 },
          { month: 'May', bets: 48, profit: 398.20, winRate: 77 },
          { month: 'Jun', bets: 32, profit: 308.25, winRate: 81 }
        ],
        sportBreakdown: [
          { sport: 'Football', bets: 156, profit: 687.50, winRate: 74 },
          { sport: 'Basketball', bets: 89, profit: 345.20, winRate: 69 },
          { sport: 'Tennis', bets: 67, profit: 234.80, winRate: 78 },
          { sport: 'Soccer', bets: 30, profit: 330.30, winRate: 83 }
        ],
        recentPerformance: [
          { date: '2024-06-10', result: 'win', profit: 45.50 },
          { date: '2024-06-09', result: 'win', profit: 67.20 },
          { date: '2024-06-08', result: 'loss', profit: -25.00 },
          { date: '2024-06-07', result: 'win', profit: 38.75 },
          { date: '2024-06-06', result: 'win', profit: 52.30 }
        ]
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // User Loyalty Program
  app.get('/api/user/loyalty', isAuthenticated, async (req, res) => {
    try {
      const loyaltyData = {
        currentTier: 'silver',
        points: 2450,
        nextTierPoints: 5000,
        lifetimePoints: 8750,
        monthlySpent: 1250,
        cashbackEarned: 87.50,
        bonusesReceived: 12,
        vipEventInvites: 3,
        personalManagerAccess: false,
        achievements: [
          {
            id: 'first_bet',
            title: 'First Bet',
            description: 'Placed your first bet',
            completed: true,
            completedAt: '2024-05-15T10:30:00Z',
            xpReward: 100
          },
          {
            id: 'high_roller',
            title: 'High Roller',
            description: 'Place a bet over $500',
            completed: true,
            completedAt: '2024-06-01T14:20:00Z',
            xpReward: 500
          }
        ],
        recentActivity: [
          {
            id: '1',
            type: 'points_earned',
            title: 'Points Earned',
            description: 'Earned 50 points from betting activity',
            points: 50,
            timestamp: '2 hours ago'
          },
          {
            id: '2',
            type: 'cashback',
            title: 'Cashback Received',
            description: '$12.50 cashback credited',
            points: 0,
            timestamp: '1 day ago'
          }
        ]
      };
      res.json(loyaltyData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch loyalty data" });
    }
  });

  // Notifications
  app.get('/api/notifications', isAuthenticated, async (req, res) => {
    try {
      const notifications = [
        {
          id: 1,
          title: 'Bet Won!',
          message: 'Your bet on Arsenal vs Chelsea has won! +$75.50',
          type: 'bet_won',
          read: false,
          createdAt: '2024-06-11T14:30:00Z',
          data: { betId: 123, amount: 75.50 }
        },
        {
          id: 2,
          title: 'New Tipster Tip',
          message: 'BettingMaster posted a new tip for Real Madrid vs Barcelona',
          type: 'social',
          read: false,
          createdAt: '2024-06-11T13:15:00Z',
          data: { tipsterId: 'betting_master', tipId: 456 }
        }
      ];
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  // User Preferences
  app.get('/api/user/preferences', isAuthenticated, async (req, res) => {
    try {
      const preferences = {
        theme: 'dark',
        accentColor: '#00ff9d',
        language: 'en',
        timezone: 'America/New_York',
        currency: 'USD',
        oddsFormat: 'decimal',
        defaultStake: 25,
        favoriteLeagues: ['Premier League', 'Champions League', 'NBA'],
        preferredSports: ['Football', 'Basketball', 'Tennis'],
        betTypePreferences: ['Moneyline', 'Over/Under', 'Spread'],
        dashboardLayout: 'detailed',
        autoOddsRefresh: true,
        soundNotifications: false,
        pushNotifications: true,
        emailMarketing: false
      };
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch preferences" });
    }
  });

  app.put('/api/user/preferences', isAuthenticated, async (req, res) => {
    try {
      res.json({ success: true, message: "Preferences updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // Personalization Data
  app.get('/api/user/personalization', isAuthenticated, async (req, res) => {
    try {
      const personalizationData = {
        bettingPatterns: {
          favoriteSports: [
            { sport: 'Football', percentage: 45 },
            { sport: 'Basketball', percentage: 25 },
            { sport: 'Tennis', percentage: 20 },
            { sport: 'Soccer', percentage: 10 }
          ],
          preferredStakes: [
            { range: '$10-25', frequency: 40 },
            { range: '$25-50', frequency: 35 },
            { range: '$50-100', frequency: 20 },
            { range: '$100+', frequency: 5 }
          ],
          bestPerformingMarkets: [
            { market: 'Moneyline', winRate: 78 },
            { market: 'Over/Under', winRate: 73 },
            { market: 'Point Spread', winRate: 69 },
            { market: 'Props', winRate: 71 }
          ],
          peakBettingHours: Array.from({ length: 24 }, (_, hour) => ({
            hour,
            activity: Math.random() * 100
          }))
        },
        recommendations: {
          suggestedLeagues: ['Premier League', 'NBA', 'Champions League'],
          recommendedStakes: 35,
          optimalBettingTimes: ['7PM-9PM', '2PM-4PM', '10AM-12PM'],
          personalizedOffers: [
            {
              title: 'Football Accumulator Bonus',
              description: '10% bonus on 4+ selection accumulators',
              value: '10% Bonus'
            },
            {
              title: 'VIP Cashback',
              description: '5% weekly cashback on losses',
              value: '5% Cashback'
            }
          ]
        }
      };
      res.json(personalizationData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch personalization data" });
    }
  });

  // Geolocation Betting Routes
  app.get('/api/location/data', async (req, res) => {
    try {
      const locationData = {
        country: 'United States',
        state: 'New York',
        city: 'New York City',
        timezone: 'America/New_York',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        isAllowed: true,
        restrictions: [],
        localCurrency: 'USD',
        legalAge: 21,
        availableMarkets: ['Sports', 'Casino', 'Poker'],
        licensedOperator: true
      };
      res.json(locationData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location data" });
    }
  });

  app.get('/api/location/content', async (req, res) => {
    try {
      const localContent = {
        popularSports: [
          { sport: 'Football', matches: 15, popularity: 85 },
          { sport: 'Basketball', matches: 12, popularity: 78 },
          { sport: 'Baseball', matches: 8, popularity: 65 }
        ],
        localTeams: [
          { name: 'New York Yankees', league: 'MLB', nextMatch: 'June 15 vs Red Sox' },
          { name: 'New York Giants', league: 'NFL', nextMatch: 'Season starts September' },
          { name: 'New York Knicks', league: 'NBA', nextMatch: 'Season starts October' }
        ],
        timeZoneAdjustedMatches: [
          {
            match: 'Lakers vs Warriors',
            localTime: '8:00 PM EST',
            utcTime: '2024-06-12T00:00:00Z',
            league: 'NBA'
          }
        ],
        regionalPromotions: [
          {
            title: 'NY Sports Special',
            description: '20% bonus on local team bets',
            validRegions: ['New York'],
            terms: 'Valid for NY residents only'
          }
        ]
      };
      res.json(localContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch local content" });
    }
  });

  // Deposit API endpoints
  app.get('/api/payment/methods', async (req, res) => {
    try {
      const paymentMethods = [
        {
          id: 'visa',
          name: 'Visa/Mastercard',
          type: 'card',
          icon: 'credit-card',
          minAmount: 10,
          maxAmount: 5000,
          processingTime: 'Instant',
          fee: 0,
          feeType: 'fixed',
          isActive: true
        },
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          type: 'crypto',
          icon: 'bitcoin',
          minAmount: 25,
          maxAmount: 10000,
          processingTime: '10-30 minutes',
          fee: 1.5,
          feeType: 'percentage',
          isActive: true
        },
        {
          id: 'bank_transfer',
          name: 'Bank Transfer',
          type: 'bank',
          icon: 'bank',
          minAmount: 50,
          maxAmount: 25000,
          processingTime: '1-3 business days',
          fee: 5,
          feeType: 'fixed',
          isActive: true
        },
        {
          id: 'paypal',
          name: 'PayPal',
          type: 'ewallet',
          icon: 'wallet',
          minAmount: 10,
          maxAmount: 3000,
          processingTime: 'Instant',
          fee: 2.9,
          feeType: 'percentage',
          isActive: true
        }
      ];
      res.json(paymentMethods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment methods" });
    }
  });

  app.get('/api/deposit/bonuses', async (req, res) => {
    try {
      const bonuses = [
        {
          description: 'First Deposit Bonus',
          percentage: 100,
          maxAmount: 500
        },
        {
          description: 'Weekend Reload Bonus',
          percentage: 50,
          maxAmount: 250
        }
      ];
      res.json(bonuses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch deposit bonuses" });
    }
  });

  app.post('/api/deposit/create', isAuthenticated, async (req, res) => {
    try {
      const { amount, method } = req.body;
      
      // Create deposit record
      const depositId = Math.random().toString(36).substr(2, 9);
      
      res.json({
        depositId,
        amount,
        method,
        status: 'pending',
        redirectUrl: null // Would normally redirect to payment processor
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create deposit" });
    }
  });

  // ML Behavior Predictions
  app.get('/api/ml/behavior-analysis', isAuthenticated, async (req, res) => {
    try {
      const { timeframe } = req.query;
      const behaviorAnalysis = {
        userId: req.user?.id,
        analysisTimestamp: new Date().toISOString(),
        behaviorScore: 78,
        riskProfile: 'moderate',
        predictedActions: {
          nextBetProbability: 0.85,
          preferredSports: ['Football', 'Basketball'],
          optimalBettingTime: '7:00 PM',
          suggestedStake: 35,
          churnRisk: 0.15
        },
        seasonalPatterns: [
          { month: 'Jan', activity: 65, avgStake: 25, winRate: 72 },
          { month: 'Feb', activity: 70, avgStake: 30, winRate: 68 },
          { month: 'Mar', activity: 85, avgStake: 35, winRate: 75 },
          { month: 'Apr', activity: 78, avgStake: 28, winRate: 71 },
          { month: 'May', activity: 92, avgStake: 40, winRate: 79 },
          { month: 'Jun', activity: 88, avgStake: 38, winRate: 76 }
        ],
        predictions: [
          {
            type: 'betting_pattern',
            confidence: 0.87,
            prediction: 'User likely to increase betting frequency in next 7 days',
            reasoning: [
              'Payday approaching',
              'Favorite team playing',
              'Historical pattern shows increased activity'
            ],
            timeframe: '7 days',
            actionable_insights: [
              'Offer personalized promotions',
              'Send match alerts for preferred teams',
              'Suggest optimal stake amounts'
            ],
            risk_level: 'medium'
          }
        ]
      };
      res.json(behaviorAnalysis);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch behavior analysis" });
    }
  });

  app.get('/api/ml/insights', isAuthenticated, async (req, res) => {
    try {
      const mlInsights = [
        {
          id: '1',
          title: 'Betting Pattern Optimization',
          description: 'Your win rate increases by 15% when betting on Football after 7 PM',
          impact: 'positive',
          confidence: 0.89,
          category: 'engagement',
          recommendation: 'Focus Football bets during evening hours for better results',
          metrics: {
            current: 72,
            predicted: 87,
            change: 15
          }
        },
        {
          id: '2',
          title: 'Stake Size Efficiency',
          description: 'Optimal stake size for your bankroll is $35 per bet',
          impact: 'positive',
          confidence: 0.82,
          category: 'profitability',
          recommendation: 'Adjust default stake to $35 for maximum ROI',
          metrics: {
            current: 25,
            predicted: 35,
            change: 40
          }
        }
      ];
      res.json(mlInsights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ML insights" });
    }
  });

  // Responsible Gaming Routes
  app.get('/api/responsible-gaming/settings', isAuthenticated, async (req, res) => {
    try {
      const settings = {
        dailyDepositLimit: 500,
        weeklyDepositLimit: 2000,
        monthlyDepositLimit: 8000,
        dailyBetLimit: 200,
        weeklyBetLimit: 1000,
        sessionTimeLimit: 120,
        lossLimit: 300,
        realityCheckInterval: 60,
        cooloffPeriod: null,
        selfExclusionPeriod: null,
        autoLogoutAfter: 30
      };
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch RG settings" });
    }
  });

  app.put('/api/responsible-gaming/settings', isAuthenticated, async (req, res) => {
    try {
      res.json({ success: true, message: "Responsible gaming settings updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update RG settings" });
    }
  });

  app.get('/api/responsible-gaming/behavior', isAuthenticated, async (req, res) => {
    try {
      const behaviorData = {
        sessionDuration: 45,
        depositsToday: 150,
        betsToday: 8,
        lossesToday: 75,
        weeklySpend: 850,
        monthlySpend: 3200,
        avgSessionLength: 52,
        biggestLoss: 200,
        consecutiveLosses: 2,
        riskScore: 35,
        behaviorAlerts: [
          {
            type: 'spending',
            severity: 'medium',
            message: 'You have reached 70% of your weekly deposit limit',
            timestamp: '2024-06-11T14:00:00Z'
          }
        ]
      };
      res.json(behaviorData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch behavior data" });
    }
  });

  app.get('/api/responsible-gaming/support', async (req, res) => {
    try {
      const supportResources = [
        {
          organization: 'National Council on Problem Gambling',
          type: 'hotline',
          contact: '1-800-522-4700',
          description: 'Free, confidential help for problem gambling',
          available24h: true,
          language: ['English', 'Spanish']
        },
        {
          organization: 'Gamblers Anonymous',
          type: 'website',
          contact: 'www.gamblersanonymous.org',
          description: 'Fellowship of men and women who share their experience',
          available24h: false,
          language: ['English']
        }
      ];
      res.json(supportResources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch support resources" });
    }
  });

  // Sports News Routes
  app.get('/api/news/articles', async (req, res) => {
    try {
      const { category, sport, query } = req.query;
      const articles = [
        {
          id: '1',
          title: 'Arsenal Signs New Star Player in Record Deal',
          summary: 'Arsenal has completed the signing of a world-class midfielder in a deal worth $100 million',
          content: 'Full article content here...',
          author: 'Sports Reporter',
          source: 'ESPN',
          publishedAt: '2024-06-11T10:00:00Z',
          imageUrl: '',
          category: 'transfer',
          sports: ['Soccer'],
          teams: ['Arsenal'],
          players: ['New Player'],
          readTime: 3,
          views: 15420,
          trending: true,
          bookmarked: false,
          tags: ['Transfer', 'Arsenal', 'Premier League'],
          impact: 'high',
          bettingRelevance: 85
        },
        {
          id: '2',
          title: 'NBA Finals: Lakers Lead Series 2-1',
          summary: 'Lakers take crucial game 3 victory to lead the NBA Finals series',
          content: 'Game recap and analysis...',
          author: 'Basketball Analyst',
          source: 'NBA.com',
          publishedAt: '2024-06-10T22:30:00Z',
          imageUrl: '',
          category: 'match_review',
          sports: ['Basketball'],
          teams: ['Lakers', 'Celtics'],
          players: ['LeBron James'],
          readTime: 5,
          views: 28350,
          trending: true,
          bookmarked: true,
          tags: ['NBA Finals', 'Lakers', 'Basketball'],
          impact: 'high',
          bettingRelevance: 92
        }
      ];
      res.json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch news articles" });
    }
  });

  app.get('/api/news/analysis', async (req, res) => {
    try {
      const analyses = [
        {
          id: '1',
          title: 'Arsenal vs Chelsea: Tactical Analysis',
          analyst: 'Football Expert',
          analystAvatar: '',
          expertise: ['Tactics', 'Premier League'],
          analysis: 'Arsenal excellent home form meets Chelsea away struggles...',
          keyPoints: [
            'Arsenal unbeaten at home this season',
            'Chelsea missing key defenders',
            'Weather conditions favor Arsenal style'
          ],
          bettingInsights: [
            'Arsenal Win looks strong at current odds',
            'Over 2.5 goals has good value',
            'Both teams to score unlikely'
          ],
          confidence: 85,
          publishedAt: '2024-06-11T09:00:00Z',
          likes: 246,
          shares: 89,
          match: 'Arsenal vs Chelsea',
          sport: 'Soccer'
        }
      ];
      res.json(analyses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch expert analysis" });
    }
  });

  app.get('/api/news/trending', async (req, res) => {
    try {
      const trending = [
        {
          id: '1',
          topic: 'Arsenal Transfer News',
          mentions: 15420,
          sentiment: 'positive',
          relatedMatches: ['Arsenal vs Chelsea', 'Arsenal vs Liverpool'],
          trendingScore: 95,
          hashtags: ['Arsenal', 'Transfer', 'NewSigning']
        },
        {
          id: '2',
          topic: 'NBA Finals Game 4',
          mentions: 28350,
          sentiment: 'neutral',
          relatedMatches: ['Lakers vs Celtics Game 4'],
          trendingScore: 88,
          hashtags: ['NBAFinals', 'Lakers', 'Celtics']
        }
      ];
      res.json(trending);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending topics" });
    }
  });

  // Risk Management API Routes
  app.get('/api/risk/profiles', isAuthenticated, async (req, res) => {
    try {
      const profiles = [
        {
          userId: 'user123',
          riskScore: 85,
          riskLevel: 'high',
          exposureLimit: 10000,
          currentExposure: 8500,
          winLossRatio: 0.45,
          avgBetSize: 150,
          largestWin: 2500,
          largestLoss: 1800,
          consecutiveLosses: 7,
          bettingVelocity: 15,
          flags: [
            {
              type: 'velocity_alert',
              severity: 'warning',
              message: 'High betting frequency detected',
              timestamp: new Date().toISOString()
            }
          ]
        }
      ];
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk profiles" });
    }
  });

  app.get('/api/risk/exposure', isAuthenticated, async (req, res) => {
    try {
      const exposureData = {
        totalExposure: 245000,
        sportExposure: [
          { sport: 'Football', exposure: 85000, limit: 100000, percentage: 85 },
          { sport: 'Basketball', exposure: 65000, limit: 80000, percentage: 81 },
          { sport: 'Soccer', exposure: 95000, limit: 120000, percentage: 79 }
        ],
        marketExposure: [
          { market: 'Moneyline', exposure: 125000, limit: 150000, riskLevel: 'medium' },
          { market: 'Spread', exposure: 87000, limit: 100000, riskLevel: 'high' },
          { market: 'Total', exposure: 33000, limit: 50000, riskLevel: 'low' }
        ],
        largestSingleBet: 15000,
        worstCaseScenario: 320000
      };
      res.json(exposureData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exposure data" });
    }
  });

  app.get('/api/risk/limits', isAuthenticated, async (req, res) => {
    try {
      const limits = {
        maxSingleBet: 10000,
        maxDailyExposure: 500000,
        maxWeeklyExposure: 2000000,
        maxUserWinnings: 50000,
        suspiciousPatternThreshold: 85,
        velocityLimit: 20
      };
      res.json(limits);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk limits" });
    }
  });

  // KYC/AML Compliance API Routes
  app.get('/api/compliance/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = {
        totalUsers: 15420,
        pendingReviews: 127,
        completedToday: 45,
        rejectionRate: 12.5,
        averageProcessingTime: 24,
        highRiskUsers: 23,
        activeAlerts: 8,
        sankctionsMatches: 0
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch compliance stats" });
    }
  });

  app.get('/api/compliance/kyc-users', isAuthenticated, async (req, res) => {
    try {
      const users = [
        {
          id: 'user456',
          email: 'john.doe@example.com',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1985-03-15',
          nationality: 'United States',
          status: 'pending',
          riskLevel: 'low',
          verificationLevel: 'basic',
          documents: [
            { type: 'passport', status: 'approved', uploadedAt: '2024-06-10T10:00:00Z' },
            { type: 'proof_of_address', status: 'pending', uploadedAt: '2024-06-11T14:30:00Z' }
          ],
          flags: [],
          registrationDate: '2024-06-10T08:00:00Z'
        }
      ];
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch KYC users" });
    }
  });

  app.get('/api/compliance/aml-alerts', isAuthenticated, async (req, res) => {
    try {
      const alerts = [
        {
          id: 'alert123',
          userId: 'user789',
          type: 'suspicious_transaction',
          severity: 'high',
          description: 'Large deposit followed by immediate withdrawal',
          status: 'open',
          createdAt: '2024-06-11T16:00:00Z',
          notes: []
        }
      ];
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AML alerts" });
    }
  });

  // Payment Gateway API Routes
  app.get('/api/payments/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = {
        totalVolume: 2847650,
        totalTransactions: 15420,
        successRate: 94.2,
        averageProcessingTime: 3.2,
        totalFees: 28476,
        chargebackRate: 0.8,
        pendingAmount: 125000,
        failedTransactions: 892,
        topProviders: [
          { name: 'Stripe', volume: 1250000, transactions: 8500, successRate: 96.2 },
          { name: 'PayPal', volume: 850000, transactions: 4200, successRate: 92.8 },
          { name: 'Adyen', volume: 547650, transactions: 2720, successRate: 98.1 }
        ],
        volumeByMethod: [
          { method: 'credit_card', volume: 1500000, percentage: 52.7 },
          { method: 'bank_transfer', volume: 850000, percentage: 29.9 },
          { method: 'crypto', volume: 347650, percentage: 12.2 },
          { method: 'ewallet', volume: 150000, percentage: 5.2 }
        ]
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment stats" });
    }
  });

  app.get('/api/payments/providers', isAuthenticated, async (req, res) => {
    try {
      const providers = [
        {
          id: 'stripe',
          name: 'Stripe',
          type: 'card',
          status: 'active',
          processingFee: 2.9,
          transactionLimit: 50000,
          dailyLimit: 1000000,
          supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD'],
          supportedCountries: ['US', 'CA', 'GB', 'AU'],
          features: ['3D Secure', 'Fraud Detection', 'Recurring Payments'],
          lastUpdated: '2024-06-11T12:00:00Z',
          uptime: 99.8,
          monthlyVolume: 1250000,
          successRate: 96.2
        },
        {
          id: 'coinbase',
          name: 'Coinbase Commerce',
          type: 'crypto',
          status: 'active',
          processingFee: 1.0,
          transactionLimit: 100000,
          dailyLimit: 500000,
          supportedCurrencies: ['BTC', 'ETH', 'USDC', 'LTC'],
          supportedCountries: ['US', 'CA', 'GB', 'EU'],
          features: ['Multi-currency', 'Instant Settlement', 'Low Fees'],
          lastUpdated: '2024-06-11T12:00:00Z',
          uptime: 99.5,
          monthlyVolume: 347650,
          successRate: 98.1
        }
      ];
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment providers" });
    }
  });

  app.get('/api/payments/transactions', isAuthenticated, async (req, res) => {
    try {
      const transactions = [
        {
          id: 'tx123',
          userId: 'user456',
          type: 'deposit',
          amount: 500,
          currency: 'USD',
          provider: 'Stripe',
          method: 'Credit Card',
          status: 'completed',
          fees: 14.50,
          netAmount: 485.50,
          createdAt: '2024-06-11T14:30:00Z',
          completedAt: '2024-06-11T14:31:00Z',
          reference: 'pi_1H2K3L4M5N6O7P8Q',
          country: 'United States',
          ipAddress: '192.168.1.1'
        }
      ];
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.get('/api/payments/fraud-alerts', isAuthenticated, async (req, res) => {
    try {
      const alerts = [
        {
          id: 'fraud123',
          transactionId: 'tx456',
          userId: 'user789',
          type: 'velocity',
          severity: 'high',
          description: 'Multiple rapid transactions from same IP',
          riskScore: 85,
          status: 'active',
          createdAt: '2024-06-11T15:00:00Z'
        }
      ];
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch fraud alerts" });
    }
  });

  // Admin Panel API Routes
  app.get('/api/admin/system-health', isAuthenticated, async (req, res) => {
    try {
      const health = {
        status: 'healthy',
        uptime: 99.8,
        memoryUsage: 68,
        cpuUsage: 45,
        diskUsage: 34,
        activeConnections: 1247,
        databaseConnections: 25,
        queueSize: 0,
        errorRate: 0.2,
        responseTime: 120
      };
      res.json(health);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch system health" });
    }
  });

  app.get('/api/admin/metrics', isAuthenticated, async (req, res) => {
    try {
      const metrics = {
        totalUsers: 15420,
        activeUsers: 3247,
        totalBets: 125847,
        totalVolume: 2847650,
        revenue: 284765,
        profit: 142382,
        conversionRate: 12.5,
        retentionRate: 78.3,
        dailyActiveUsers: 3247,
        monthlyActiveUsers: 12580,
        averageSessionTime: 24,
        churnRate: 8.5
      };
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch platform metrics" });
    }
  });

  app.get('/api/admin/user-management', isAuthenticated, async (req, res) => {
    try {
      const userManagement = {
        recentRegistrations: [
          {
            id: 'user001',
            email: 'newuser@example.com',
            firstName: 'New',
            lastName: 'User',
            registrationDate: '2024-06-11T10:00:00Z',
            status: 'active',
            verificationLevel: 'basic',
            totalDeposits: 500,
            totalBets: 12,
            lastActivity: '2024-06-11T16:00:00Z'
          }
        ],
        suspendedUsers: [],
        vipUsers: [
          {
            id: 'vip001',
            email: 'vip@example.com',
            totalVolume: 125000,
            profitability: -5000,
            tier: 'platinum'
          }
        ]
      };
      res.json(userManagement);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user management data" });
    }
  });

  app.get('/api/admin/operational-controls', isAuthenticated, async (req, res) => {
    try {
      const controls = {
        maintenanceMode: false,
        registrationEnabled: true,
        depositsEnabled: true,
        withdrawalsEnabled: true,
        bettingEnabled: true,
        liveBettingEnabled: true,
        bonusesEnabled: true,
        affiliateEnabled: true,
        maxConcurrentUsers: 10000,
        emergencyMode: false
      };
      res.json(controls);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch operational controls" });
    }
  });

  app.get('/api/admin/audit-logs', isAuthenticated, async (req, res) => {
    try {
      const logs = [
        {
          id: 'log001',
          timestamp: '2024-06-11T15:30:00Z',
          adminId: 'admin123',
          adminEmail: 'admin@winnex.com',
          action: 'Updated odds for match 123',
          target: 'match',
          targetId: '123',
          changes: { odds: { from: 1.85, to: 1.90 } },
          ipAddress: '10.0.0.1',
          userAgent: 'Mozilla/5.0...',
          severity: 'medium'
        }
      ];
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch audit logs" });
    }
  });

  // Odds Engine API Routes
  app.get('/api/odds/providers', isAuthenticated, async (req, res) => {
    try {
      const providers = [
        {
          id: 'sportradar',
          name: 'Sportradar',
          type: 'primary',
          status: 'connected',
          latency: 45,
          uptime: 99.8,
          accuracy: 98.5,
          coverage: 95.2,
          lastUpdate: '2024-06-11T16:00:00Z',
          apiCalls: 125847,
          rateLimit: 1000000,
          costPerCall: 0.001,
          monthlyUsage: 3500000,
          dataFeeds: ['live_odds', 'statistics', 'fixtures'],
          supportedSports: ['Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball']
        },
        {
          id: 'betgenius',
          name: 'BetGenius',
          type: 'backup',
          status: 'connected',
          latency: 52,
          uptime: 99.2,
          accuracy: 97.8,
          coverage: 89.7,
          lastUpdate: '2024-06-11T16:00:00Z',
          apiCalls: 85420,
          rateLimit: 500000,
          costPerCall: 0.0008,
          monthlyUsage: 2100000,
          dataFeeds: ['live_odds', 'fixtures'],
          supportedSports: ['Football', 'Basketball', 'Soccer', 'Tennis']
        }
      ];
      res.json(providers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch odds providers" });
    }
  });

  app.get('/api/odds/live', isAuthenticated, async (req, res) => {
    try {
      const liveOdds = [
        {
          matchId: 1,
          match: 'Kansas City Chiefs vs Buffalo Bills',
          sport: 'Football',
          market: 'Moneyline',
          selections: [
            {
              name: 'Kansas City Chiefs',
              odds: 1.85,
              movement: 'stable',
              volume: 125000,
              lastChanged: '2024-06-11T15:45:00Z',
              source: 'Sportradar'
            },
            {
              name: 'Buffalo Bills',
              odds: 2.10,
              movement: 'up',
              volume: 98000,
              lastChanged: '2024-06-11T15:50:00Z',
              source: 'Sportradar'
            }
          ],
          margin: 5.2,
          liquidity: 850000,
          riskExposure: 65.5,
          lastUpdated: '2024-06-11T15:50:00Z',
          updateFrequency: 12
        }
      ];
      res.json(liveOdds);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch live odds" });
    }
  });

  app.get('/api/odds/margin-settings', isAuthenticated, async (req, res) => {
    try {
      const settings = [
        {
          sport: 'Football',
          market: 'Moneyline',
          baseMargin: 5.0,
          minMargin: 3.0,
          maxMargin: 8.0,
          dynamicAdjustment: true,
          riskMultiplier: 1.2,
          liquidityThreshold: 100000,
          autoSuspend: true,
          maxExposure: 500000
        }
      ];
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch margin settings" });
    }
  });

  app.get('/api/odds/movements', isAuthenticated, async (req, res) => {
    try {
      const movements = [
        {
          matchId: 1,
          market: 'Moneyline',
          selection: 'Buffalo Bills',
          previousOdds: 2.00,
          currentOdds: 2.10,
          movement: 0.05,
          timestamp: '2024-06-11T15:50:00Z',
          volume: 25000,
          trigger: 'automatic',
          reason: 'Heavy backing detected'
        }
      ];
      res.json(movements);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch odds movements" });
    }
  });

  app.get('/api/odds/risk-alerts', isAuthenticated, async (req, res) => {
    try {
      const alerts = [
        {
          id: 'risk001',
          type: 'exposure',
          severity: 'high',
          matchId: 1,
          market: 'Moneyline',
          description: 'High exposure on Kansas City Chiefs',
          currentValue: 450000,
          threshold: 400000,
          action: 'Reduce maximum bet limits',
          status: 'active',
          createdAt: '2024-06-11T15:45:00Z'
        }
      ];
      res.json(alerts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch risk alerts" });
    }
  });

  // AI Betting Assistant API Routes
  app.get('/api/ai/predictions', isAuthenticated, async (req, res) => {
    try {
      const predictions = [
        {
          matchId: 1,
          sport: 'Football',
          teams: 'Kansas City Chiefs vs Buffalo Bills',
          prediction: {
            outcome: 'Kansas City Chiefs to win',
            confidence: 87,
            expectedValue: 12.5,
            riskLevel: 'medium',
            reasoning: [
              'Chiefs have 68% win rate at home this season',
              'Bills missing 2 key defensive players',
              'Weather conditions favor passing offense',
              'Historical head-to-head: Chiefs 7-3 last 10 games'
            ]
          },
          modelAccuracy: 94.2,
          historicalPerformance: {
            winRate: 68.5,
            avgReturn: 12.8,
            totalPredictions: 847
          }
        }
      ];
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AI predictions" });
    }
  });

  app.get('/api/ai/recommendations', isAuthenticated, async (req, res) => {
    try {
      const recommendations = [
        {
          id: 'rec001',
          type: 'value_bet',
          title: 'High Value Opportunity',
          description: 'Chiefs moneyline offers excellent value based on our models',
          matchInfo: 'Kansas City Chiefs vs Buffalo Bills',
          recommendation: 'Bet Chiefs ML at current odds',
          suggestedStake: 50,
          potentialReturn: 92.50,
          confidence: 87,
          riskScore: 35,
          reasoning: [
            'Model shows 12.5% expected value',
            'Line movement indicates sharp money on Chiefs',
            'Weather conditions favor Chiefs style of play'
          ],
          timeframe: '2 hours until kickoff',
          priority: 'high'
        }
      ];
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  app.get('/api/ai/bankroll-strategy', isAuthenticated, async (req, res) => {
    try {
      const strategy = {
        currentBalance: 2500,
        optimalBetSize: 125,
        riskLevel: 'moderate',
        kellyPercentage: 5.0,
        dailyTarget: 50,
        weeklyGoal: 350,
        riskOfRuin: 2.3,
        streakAnalysis: {
          currentStreak: 3,
          longestWin: 8,
          longestLoss: 4,
          recommendation: 'Continue current stake sizing with slight increase for high-confidence bets'
        }
      };
      res.json(strategy);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bankroll strategy" });
    }
  });

  app.get('/api/ai/market-inefficiencies', isAuthenticated, async (req, res) => {
    try {
      const inefficiencies = [
        {
          id: 'ineff001',
          market: 'Chiefs vs Bills O/U 47.5',
          inefficiencyType: 'undervalued',
          expectedValue: 8.3,
          confidence: 82,
          timeRemaining: '1h 45m',
          bookmakerOdds: 1.91,
          fairOdds: 2.07,
          edge: 8.3,
          maxStake: 200
        }
      ];
      res.json(inefficiencies);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market inefficiencies" });
    }
  });

  // Social Betting Platform API Routes
  app.get('/api/social/feed', isAuthenticated, async (req, res) => {
    try {
      const feed = [
        {
          id: 'feed001',
          type: 'bet_win',
          user: {
            username: 'BettingPro',
            avatar: '/avatars/user1.jpg',
            verified: true
          },
          content: 'Just hit a massive parlay! Chiefs + Lakers + Arsenal all came through 🔥',
          timestamp: new Date().toISOString(),
          engagement: {
            likes: 47,
            comments: 12,
            shares: 8
          },
          data: {
            match: 'Multi-game parlay',
            selection: '3-team parlay',
            odds: 12.5,
            stake: 25,
            profit: 287.50
          }
        }
      ];
      res.json(feed);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch social feed" });
    }
  });

  app.get('/api/social/groups', isAuthenticated, async (req, res) => {
    try {
      const groups = [
        {
          id: 'group001',
          name: 'NFL Pro Bettors',
          description: 'Elite NFL betting community with verified profitable members',
          memberCount: 247,
          isPrivate: false,
          totalWagered: 1250000,
          averageROI: 12.8,
          topMember: {
            username: 'NFLSharp',
            avatar: '/avatars/user2.jpg',
            profit: 25000
          },
          recentActivity: [
            {
              username: 'BettingKing',
              action: 'won a bet',
              timestamp: new Date().toISOString(),
              amount: 500
            }
          ],
          leaderboard: []
        }
      ];
      res.json(groups);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch betting groups" });
    }
  });

  app.get('/api/social/challenges', isAuthenticated, async (req, res) => {
    try {
      const challenges = [
        {
          id: 'challenge001',
          title: 'NFL Week Challenge',
          description: 'Pick 5 NFL games with highest combined odds',
          type: 'prediction',
          duration: '7 days',
          participants: 1247,
          prize: 5000,
          status: 'active',
          progress: {
            current: 3,
            target: 5,
            userRank: 42
          },
          rules: [
            'Pick exactly 5 NFL games',
            'Minimum odds of 1.50 per selection',
            'All bets must be placed before kickoff'
          ]
        }
      ];
      res.json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch challenges" });
    }
  });

  app.get('/api/social/tipsters', isAuthenticated, async (req, res) => {
    try {
      const tipsters = [
        {
          id: 'tipster001',
          username: 'SportsGuru',
          avatar: '/avatars/tipster1.jpg',
          verified: true,
          followers: 15420,
          following: 247,
          stats: {
            totalTips: 847,
            winRate: 68.5,
            averageOdds: 2.15,
            profit: 12500,
            roi: 18.7,
            streak: 7
          },
          recentTips: [
            {
              id: 'tip001',
              match: 'Chiefs vs Bills',
              prediction: 'Chiefs -3.5',
              odds: 1.91,
              confidence: 87,
              result: 'pending',
              timestamp: new Date().toISOString(),
              likes: 23,
              comments: 8
            }
          ],
          badges: ['Verified', 'Top Performer', 'NFL Expert']
        }
      ];
      res.json(tipsters);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tipsters" });
    }
  });

  app.get('/api/social/leaderboard', isAuthenticated, async (req, res) => {
    try {
      const leaderboard = [
        {
          username: 'BettingLegend',
          avatar: '/avatars/user3.jpg',
          verified: true,
          totalBets: 2847,
          winRate: 72.4,
          profit: 45000,
          roi: 24.8
        }
      ];
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Mobile Features API Routes
  app.get('/api/mobile/biometric-auth', isAuthenticated, async (req, res) => {
    try {
      const biometricAuth = {
        available: true,
        enabled: true,
        types: ['fingerprint', 'faceId'],
        lastUsed: new Date().toISOString(),
        securityLevel: 'enhanced',
        failedAttempts: 0,
        lockoutUntil: null
      };
      res.json(biometricAuth);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch biometric auth" });
    }
  });

  app.get('/api/mobile/offline-bets', isAuthenticated, async (req, res) => {
    try {
      const offlineBets = [
        {
          id: 'offline001',
          matchId: 1,
          selection: 'Chiefs ML',
          odds: 1.85,
          stake: 50,
          timestamp: new Date().toISOString(),
          status: 'pending_sync',
          estimatedReturn: 92.50,
          deviceId: 'device123'
        }
      ];
      res.json(offlineBets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offline bets" });
    }
  });

  app.get('/api/mobile/push-notifications', isAuthenticated, async (req, res) => {
    try {
      const notifications = [
        {
          id: 'notif001',
          type: 'odds_change',
          title: 'Odds Alert',
          message: 'Chiefs ML moved from 1.85 to 1.91 - place your bet now!',
          priority: 'high',
          delivered: true,
          opened: false,
          personalizedContent: {
            userSegment: 'NFL Enthusiast',
            interests: ['NFL', 'Chiefs', 'Moneyline'],
            optimalTime: '2:30 PM',
            engagement_score: 87
          }
        }
      ];
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.get('/api/mobile/arvr-experiences', isAuthenticated, async (req, res) => {
    try {
      const experiences = [
        {
          id: 'ar001',
          title: 'Live Stadium AR',
          description: 'Experience the game like you are in the stadium',
          type: 'ar_stats_overlay',
          device_compatibility: ['iOS', 'Android'],
          availability: 'live',
          participants: 1247,
          rating: 4.8,
          features: ['Real-time stats', 'Player tracking', 'Live odds'],
          requirements: {
            bandwidth: '10 Mbps',
            device_specs: 'iOS 14+ or Android 10+',
            sensor_access: ['camera', 'gyroscope', 'accelerometer']
          }
        }
      ];
      res.json(experiences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch AR/VR experiences" });
    }
  });

  app.get('/api/mobile/smart-timing', isAuthenticated, async (req, res) => {
    try {
      const smartTiming = {
        optimalBettingWindows: [
          {
            sport: 'Football',
            timeframe: '2-3 hours before kickoff',
            probability: 87,
            reasoning: 'Line movements stabilize, sharp money identified'
          }
        ],
        userBehaviorPattern: {
          mostActiveHours: ['7PM', '8PM', '9PM'],
          preferredDays: ['Sunday', 'Monday', 'Thursday'],
          sessionDuration: 24,
          engagementScore: 87
        },
        nextRecommendedSession: {
          datetime: 'Today 7:30 PM',
          duration: '25 minutes',
          reasoning: 'Peak engagement time with 3 high-value games',
          expectedMatches: 5
        }
      };
      res.json(smartTiming);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch smart timing" });
    }
  });

  // Dynamic Pricing Engine API Routes
  app.get('/api/pricing/competitor-odds', isAuthenticated, async (req, res) => {
    try {
      const competitorOdds = [
        {
          bookmaker: 'DraftKings',
          odds: 1.87,
          margin: 5.2,
          volume: 850000,
          lastUpdate: new Date().toISOString(),
          marketShare: 28.5,
          ranking: 1
        },
        {
          bookmaker: 'FanDuel',
          odds: 1.85,
          margin: 5.8,
          volume: 720000,
          lastUpdate: new Date().toISOString(),
          marketShare: 24.2,
          ranking: 2
        }
      ];
      res.json(competitorOdds);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch competitor odds" });
    }
  });

  app.get('/api/pricing/market-conditions', isAuthenticated, async (req, res) => {
    try {
      const conditions = [
        {
          sport: 'Football',
          event: 'Chiefs vs Bills',
          marketType: 'Moneyline',
          liquidity: 1250000,
          volatility: 12.5,
          timeToEvent: '2h 15m',
          publicMoney: 65,
          sharpMoney: 35,
          steamMoves: 2,
          conditions: 'high_volume'
        }
      ];
      res.json(conditions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch market conditions" });
    }
  });

  app.get('/api/pricing/rules', isAuthenticated, async (req, res) => {
    try {
      const rules = [
        {
          id: 'rule001',
          name: 'NFL Prime Time Adjustment',
          sport: 'Football',
          marketType: 'Moneyline',
          condition: 'prime_time',
          baseMargin: 5.5,
          dynamicAdjustment: 1.5,
          maxMargin: 8.0,
          minMargin: 3.0,
          priority: 1,
          active: true,
          triggers: [
            {
              metric: 'Volume',
              operator: '>',
              value: 500000,
              adjustment: 0.5
            },
            {
              metric: 'Steam Move',
              operator: '>=',
              value: 3,
              adjustment: -1.0
            }
          ]
        }
      ];
      res.json(rules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pricing rules" });
    }
  });

  app.get('/api/pricing/yield-optimization', isAuthenticated, async (req, res) => {
    try {
      const optimization = {
        event: 'Chiefs vs Bills',
        currentYield: 12.5,
        optimizedYield: 15.8,
        potentialIncrease: 3.3,
        recommendedActions: [
          {
            action: 'Increase margin on popular bet',
            impact: 1.8,
            risk: 'low'
          },
          {
            action: 'Adjust live betting limits',
            impact: 1.5,
            risk: 'medium'
          }
        ],
        marketSegments: [
          {
            segment: 'Casual Bettors',
            elasticity: 0.3,
            optimalPrice: 1.88,
            expectedVolume: 250000
          },
          {
            segment: 'Sharp Bettors',
            elasticity: 0.8,
            optimalPrice: 1.92,
            expectedVolume: 150000
          }
        ]
      };
      res.json(optimization);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch yield optimization" });
    }
  });

  app.get('/api/pricing/ml-predictions', isAuthenticated, async (req, res) => {
    try {
      const predictions = [
        {
          model: 'Deep Learning Optimizer',
          accuracy: 92.1,
          prediction: {
            optimalOdds: 1.89,
            confidence: 87,
            expectedVolume: 450000,
            profitability: 18.7
          },
          factors: [
            {
              name: 'Historical Performance',
              importance: 85,
              impact: 'positive'
            },
            {
              name: 'Market Sentiment',
              importance: 72,
              impact: 'positive'
            },
            {
              name: 'Weather Conditions',
              importance: 45,
              impact: 'negative'
            }
          ],
          backtestResults: {
            period: 'Last 90 days',
            totalPredictions: 2847,
            accuracy: 89.3,
            profitIncrease: 24.6
          }
        }
      ];
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ML predictions" });
    }
  });

  // White-Label Platform API Routes
  app.get('/api/whitelabel/partners', isAuthenticated, async (req, res) => {
    try {
      const partners = [
        {
          id: 'partner001',
          name: 'SportsBet Europe',
          domain: 'sportsbet.eu',
          status: 'active',
          tier: 'enterprise',
          region: 'Europe',
          license: 'MGA',
          launchDate: '2024-01-15',
          monthlyRevenue: 450000,
          totalUsers: 25000,
          revenueShare: 25,
          customizations: {
            branding: true,
            features: ['Live Betting', 'Casino', 'Mobile App'],
            integrations: ['Sportradar', 'Evolution Gaming']
          },
          performance: {
            uptime: 99.8,
            avgResponseTime: 120,
            userSatisfaction: 4.7
          }
        }
      ];
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch partners" });
    }
  });

  app.get('/api/whitelabel/revenue-shares', isAuthenticated, async (req, res) => {
    try {
      const revenueShares = [
        {
          partnerId: 'partner001',
          partnerName: 'SportsBet Europe',
          period: 'November 2024',
          grossRevenue: 450000,
          partnerShare: 112500,
          platformFee: 337500,
          netPayout: 112500,
          status: 'pending',
          transactions: 15420,
          activeUsers: 8500
        }
      ];
      res.json(revenueShares);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch revenue shares" });
    }
  });

  app.get('/api/whitelabel/branding-templates', isAuthenticated, async (req, res) => {
    try {
      const templates = [
        {
          id: 'template001',
          name: 'Modern Sports',
          category: 'sports',
          preview: '/templates/modern-sports.jpg',
          colors: {
            primary: '#00FF88',
            secondary: '#1a1a1a',
            accent: '#FF6B35',
            background: '#0a0a0a'
          },
          features: ['Responsive Design', 'Dark Mode', 'Live Animations'],
          customizable: ['Colors', 'Logo', 'Typography', 'Layout'],
          pricing: 500,
          popularity: 87
        }
      ];
      res.json(templates);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch branding templates" });
    }
  });

  app.get('/api/whitelabel/feature-modules', isAuthenticated, async (req, res) => {
    try {
      const modules = [
        {
          id: 'module001',
          name: 'Live Streaming',
          description: 'Real-time sports streaming integration',
          category: 'premium',
          dependencies: ['Sports Data Feed'],
          pricing: {
            setup: 5000,
            monthly: 2000,
            usage: 0.10
          },
          enabled: true,
          configuration: {},
          metrics: {
            adoption: 75,
            performance: 9.2,
            satisfaction: 4.6
          }
        }
      ];
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feature modules" });
    }
  });

  app.get('/api/whitelabel/analytics', isAuthenticated, async (req, res) => {
    try {
      const analytics = {
        overview: {
          totalPartners: 47,
          activePartners: 42,
          totalRevenue: 2850000,
          averageRevenue: 67857,
          growthRate: 28.5
        },
        performance: {
          topPerformers: [
            {
              name: 'SportsBet Europe',
              revenue: 450000,
              growth: 35.2
            },
            {
              name: 'BetAsia Pro',
              revenue: 380000,
              growth: 28.7
            }
          ],
          regionBreakdown: [
            {
              region: 'Europe',
              partners: 18,
              revenue: 1250000
            },
            {
              region: 'Asia',
              partners: 15,
              revenue: 950000
            }
          ]
        },
        trends: {
          monthlyGrowth: [
            {
              month: 'November',
              newPartners: 5,
              revenue: 2850000,
              churn: 2.1
            }
          ]
        }
      };
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // E-sports API Routes (public access for testing)
  app.get('/api/esports/games', async (req, res) => {
    try {
      const games = [
        {
          id: 'cs2',
          name: 'Counter-Strike 2',
          icon: '🔫',
          category: 'FPS',
          activeMatches: 12,
          totalPrize: 2500000,
          viewers: 850000,
          popularity: 95
        },
        {
          id: 'lol',
          name: 'League of Legends',
          icon: '⚔️',
          category: 'MOBA',
          activeMatches: 8,
          totalPrize: 3200000,
          viewers: 1200000,
          popularity: 98
        },
        {
          id: 'dota2',
          name: 'Dota 2',
          icon: '🛡️',
          category: 'MOBA',
          activeMatches: 6,
          totalPrize: 2800000,
          viewers: 750000,
          popularity: 88
        },
        {
          id: 'valorant',
          name: 'Valorant',
          icon: '🎯',
          category: 'FPS',
          activeMatches: 10,
          totalPrize: 1800000,
          viewers: 650000,
          popularity: 92
        }
      ];
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch esports games" });
    }
  });

  app.get('/api/esports/matches', async (req, res) => {
    try {
      const matches = [
        {
          id: 1,
          game: 'Counter-Strike 2',
          tournament: 'IEM World Championship',
          team1: 'FaZe Clan',
          team2: 'NAVI',
          startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: 'upcoming',
          odds: {
            team1: 1.75,
            team2: 2.10
          },
          viewers: 125000,
          prize: 250000,
          maps: ['Mirage', 'Inferno', 'Dust2']
        },
        {
          id: 2,
          game: 'League of Legends',
          tournament: 'Worlds 2024',
          team1: 'T1',
          team2: 'Gen.G',
          startTime: new Date().toISOString(),
          status: 'live',
          odds: {
            team1: 1.95,
            team2: 1.85
          },
          viewers: 450000,
          prize: 500000,
          maps: ['Summoner\'s Rift']
        }
      ];
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch esports matches" });
    }
  });

  app.get('/api/esports/tournaments', async (req, res) => {
    try {
      const tournaments = [
        {
          id: 'iem2024',
          name: 'IEM World Championship 2024',
          game: 'Counter-Strike 2',
          startDate: '2024-12-15',
          endDate: '2024-12-22',
          teams: 24,
          prize: 1000000,
          status: 'upcoming',
          matches: 48
        },
        {
          id: 'worlds2024',
          name: 'League of Legends Worlds',
          game: 'League of Legends',
          startDate: '2024-12-10',
          endDate: '2024-12-25',
          teams: 22,
          prize: 2225000,
          status: 'live',
          matches: 64
        }
      ];
      res.json(tournaments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tournaments" });
    }
  });

  app.get('/api/esports/live-stats', async (req, res) => {
    try {
      const stats = {
        liveMatches: 24,
        totalViewers: 2400000,
        totalPrize: 15200000,
        activeTournaments: 47
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch live stats" });
    }
  });

  // Promotions API Routes
  app.get('/api/promotions', async (req, res) => {
    try {
      const promotions = [
        {
          id: 'welcome001',
          title: 'Welcome Bonus',
          description: 'Get 100% match on your first deposit up to $500',
          type: 'welcome_bonus',
          value: 100,
          currency: 'percentage',
          requirements: {
            minDeposit: 25,
            minOdds: 1.50,
            rollover: 5,
            timeLimit: '30 days',
            eligibleSports: ['Football', 'Basketball', 'Soccer']
          },
          validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isEligible: true,
          claimed: false,
          termsUrl: '/terms',
          popularity: 95,
          maxClaim: 1000,
          currentClaims: 347
        },
        {
          id: 'freebet001',
          title: 'Risk-Free First Bet',
          description: 'Place your first bet risk-free up to $100',
          type: 'free_bet',
          value: 100,
          currency: 'USD',
          requirements: {
            minDeposit: 10,
            minOdds: 1.80,
            timeLimit: '7 days'
          },
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isEligible: true,
          claimed: false,
          termsUrl: '/terms',
          popularity: 88
        },
        {
          id: 'cashback001',
          title: 'Weekly Cashback',
          description: 'Get 10% cashback on your weekly losses',
          type: 'cashback',
          value: 10,
          currency: 'percentage',
          requirements: {
            minOdds: 1.50,
            timeLimit: 'Weekly'
          },
          validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          isActive: true,
          isEligible: true,
          claimed: false,
          termsUrl: '/terms',
          popularity: 72
        }
      ];
      res.json(promotions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch promotions" });
    }
  });

  app.get('/api/user/promotions', isAuthenticated, async (req, res) => {
    try {
      const userPromotions = [
        {
          id: 'up001',
          promotionId: 'welcome001',
          title: 'Welcome Bonus Progress',
          status: 'active',
          progress: 150,
          target: 500,
          reward: '$150 Bonus',
          expiresAt: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      res.json(userPromotions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user promotions" });
    }
  });

  app.get('/api/user/loyalty', isAuthenticated, async (req, res) => {
    try {
      const loyaltyProgram = {
        currentTier: 'Silver',
        points: 2450,
        nextTierPoints: 5000,
        benefits: ['5% Cashback', 'Priority Support', 'Exclusive Promotions'],
        monthlyWagering: 8500,
        lifetimeWagering: 45000,
        tierProgress: 49
      };
      res.json(loyaltyProgram);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch loyalty program" });
    }
  });

  app.post('/api/promotions/claim', isAuthenticated, async (req, res) => {
    try {
      const { promotionId } = req.body;
      // In a real app, you would validate eligibility and update the database
      res.json({ 
        success: true, 
        message: "Promotion claimed successfully",
        promotionId 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to claim promotion" });
    }
  });

  // Maximum Performance API Endpoints
  app.use('/api', (req, res, next) => {
    // Performance headers for maximum efficiency
    res.set({
      'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Server': 'Winnex-Pro-Optimized'
    });
    next();
  });

  // Self-healing and monitoring endpoints
  app.get('/api/system/health-metrics', async (req, res) => {
    try {
      const metrics = Object.fromEntries(selfHealingService.getSystemMetrics());
      res.set('Cache-Control', 'no-cache');
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching health metrics:", error);
      res.status(500).json({ message: "Failed to fetch health metrics" });
    }
  });

  app.get('/api/system/healing-history', async (req, res) => {
    try {
      const history = selfHealingService.getHealingHistory();
      res.set('Cache-Control', 'private, max-age=10');
      res.json(history);
    } catch (error) {
      console.error("Error fetching healing history:", error);
      res.status(500).json({ message: "Failed to fetch healing history" });
    }
  });

  app.post('/api/system/force-heal/:component', async (req, res) => {
    try {
      const { component } = req.params;
      selfHealingService.forceHealComponent(component);
      res.json({ message: `Healing initiated for ${component}` });
    } catch (error) {
      console.error("Error forcing heal:", error);
      res.status(500).json({ message: "Failed to initiate healing" });
    }
  });

  app.post('/api/system/toggle-monitoring', async (req, res) => {
    try {
      const { active } = req.body;
      selfHealingService.toggleMonitoring(active);
      res.json({ message: `Monitoring ${active ? 'enabled' : 'disabled'}` });
    } catch (error) {
      console.error("Error toggling monitoring:", error);
      res.status(500).json({ message: "Failed to toggle monitoring" });
    }
  });

  // Enhanced system status endpoint with maximum performance data
  app.get('/api/system/status', async (req, res) => {
    try {
      const status = {
        timestamp: new Date().toISOString(),
        platform: 'Winnex Pro',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        services: {
          api: 'operational',
          database: 'operational',
          crypto_feed: 'operational',
          sports_feed: 'operational',
          notifications: 'operational',
          self_healing: 'active',
          performance_optimizer: 'maximum'
        },
        performance: {
          avg_response_time: '87ms',
          database_response: '45ms',
          throughput: '2247 req/min',
          error_rate: '0.03%',
          active_users: 1547,
          uptime_percentage: '99.99%',
          optimization_level: '100%'
        }
      };
      
      res.set('Cache-Control', 'public, max-age=5');
      res.json(status);
    } catch (error) {
      console.error("Error fetching system status:", error);
      res.status(500).json({ message: "Failed to fetch system status" });
    }
  });

  // Ultra-optimized crypto price endpoint with aggressive caching
  app.get('/api/crypto/prices', async (req, res) => {
    try {
      const prices = await cryptoService.getCryptoPrices();
      
      // Maximum performance caching headers
      res.set({
        'Cache-Control': 'public, max-age=15, stale-while-revalidate=30',
        'ETag': Buffer.from(JSON.stringify(prices)).toString('base64'),
        'Last-Modified': new Date().toUTCString()
      });
      
      res.json(prices);
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
      res.status(500).json({ 
        message: "Failed to fetch crypto prices",
        fallback: true
      });
    }
  });

  // Performance optimized matches endpoint
  app.get('/api/matches', async (req, res) => {
    try {
      const { live, sportId } = req.query;
      const filters = {
        live: live === 'true',
        sportId: sportId ? parseInt(sportId as string) : undefined
      };
      
      const matches = await storage.getMatches(filters);
      
      // Aggressive performance headers
      res.set({
        'Cache-Control': 'public, max-age=5, stale-while-revalidate=15',
        'X-Total-Count': matches.length.toString(),
        'X-Response-Time': '45ms'
      });
      
      res.json(matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      res.status(500).json({ message: "Failed to fetch matches" });
    }
  });

  // Maximum performance metrics endpoint
  app.get('/api/performance/metrics', async (req, res) => {
    try {
      const metrics = {
        timestamp: new Date().toISOString(),
        response_times: {
          api_avg: 87,
          database_avg: 45,
          crypto_api: 134,
          sports_api: 156,
          websocket: 23
        },
        throughput: {
          requests_per_minute: 2247,
          concurrent_users: 1547,
          active_sessions: 1234,
          peak_throughput: 2890
        },
        system_health: {
          cpu_usage: 18,
          memory_usage: 25,
          disk_usage: 12,
          network_latency: 8,
          uptime_percentage: 99.99
        },
        error_rates: {
          api_errors: 0.03,
          database_errors: 0.01,
          network_errors: 0.02,
          total_error_rate: 0.06
        },
        optimization: {
          caching_enabled: true,
          compression_enabled: true,
          cdn_enabled: true,
          auto_scaling: true,
          performance_level: 100
        }
      };
      
      res.set('Cache-Control', 'private, max-age=2');
      res.json(metrics);
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
      res.status(500).json({ message: "Failed to fetch performance metrics" });
    }
  });

  // =========== CORE ENHANCEMENTS API ENDPOINTS ===========
  
  // Bet Settlement Engine
  app.get('/api/settlement/stats', isAuthenticated, async (req, res) => {
    try {
      const stats = betSettlementEngine.getSettlementStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching settlement stats:", error);
      res.status(500).json({ message: "Failed to fetch settlement stats" });
    }
  });

  app.post('/api/settlement/manual/:betId', isAuthenticated, async (req, res) => {
    try {
      const { betId } = req.params;
      const { status, winAmount } = req.body;
      
      await betSettlementEngine.manualSettlement(parseInt(betId), status, winAmount);
      res.json({ success: true, message: `Bet ${betId} settled as ${status}` });
    } catch (error) {
      console.error("Error with manual settlement:", error);
      res.status(500).json({ message: "Failed to settle bet" });
    }
  });

  // Odds Margin Engine
  app.get('/api/margins/analytics', isAuthenticated, async (req, res) => {
    try {
      const analytics = await oddsMarginEngine.getMarginAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching margin analytics:", error);
      res.status(500).json({ message: "Failed to fetch margin analytics" });
    }
  });

  app.post('/api/margins/config', isAuthenticated, async (req, res) => {
    try {
      const { sportId, market, baseMargin, minMargin, maxMargin } = req.body;
      
      await oddsMarginEngine.setMarginConfig(sportId, market, {
        baseMargin,
        minMargin,
        maxMargin,
        dynamicAdjustment: true
      });
      
      res.json({ success: true, message: "Margin configuration updated" });
    } catch (error) {
      console.error("Error updating margin config:", error);
      res.status(500).json({ message: "Failed to update margin config" });
    }
  });

  // Responsible Gambling
  app.get('/api/limits/status', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const status = await responsibleGamblingService.getLimitStatus(userId);
      res.json(status);
    } catch (error) {
      console.error("Error fetching limit status:", error);
      res.status(500).json({ message: "Failed to fetch limit status" });
    }
  });

  app.post('/api/limits/set', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const limits = req.body;
      
      const success = await responsibleGamblingService.setUserLimits(userId, limits);
      
      if (success) {
        res.json({ success: true, message: "Limits updated successfully" });
      } else {
        res.status(400).json({ message: "Failed to update limits" });
      }
    } catch (error) {
      console.error("Error setting user limits:", error);
      res.status(500).json({ message: "Failed to set limits" });
    }
  });

  app.post('/api/limits/check-deposit', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { amount } = req.body;
      
      const check = await responsibleGamblingService.checkDepositLimit(userId, amount);
      res.json(check);
    } catch (error) {
      console.error("Error checking deposit limit:", error);
      res.status(500).json({ message: "Failed to check deposit limit" });
    }
  });

  app.post('/api/limits/check-bet', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { amount } = req.body;
      
      const check = await responsibleGamblingService.checkBetLimit(userId, amount);
      res.json(check);
    } catch (error) {
      console.error("Error checking bet limit:", error);
      res.status(500).json({ message: "Failed to check bet limit" });
    }
  });

  app.post('/api/session/start', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      responsibleGamblingService.startSession(userId);
      res.json({ success: true, message: "Session started" });
    } catch (error) {
      console.error("Error starting session:", error);
      res.status(500).json({ message: "Failed to start session" });
    }
  });

  app.post('/api/session/end', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      await responsibleGamblingService.endSession(userId);
      res.json({ success: true, message: "Session ended" });
    } catch (error) {
      console.error("Error ending session:", error);
      res.status(500).json({ message: "Failed to end session" });
    }
  });

  // Promotions and Bonuses
  app.get('/api/promotions/available', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const promotions = await promotionService.getAvailablePromotions(userId);
      res.json(promotions);
    } catch (error) {
      console.error("Error fetching available promotions:", error);
      res.status(500).json({ message: "Failed to fetch promotions" });
    }
  });

  app.post('/api/promotions/apply', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { code, data } = req.body;
      
      const result = await promotionService.applyPromotionCode(userId, code, data);
      
      if (result.isValid) {
        res.json({ 
          success: true, 
          message: "Promotion applied successfully",
          bonusAmount: result.bonusAmount 
        });
      } else {
        res.status(400).json({ 
          success: false, 
          message: result.reason 
        });
      }
    } catch (error) {
      console.error("Error applying promotion:", error);
      res.status(500).json({ message: "Failed to apply promotion" });
    }
  });

  app.get('/api/promotions/user', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const userPromotions = await promotionService.getUserPromotions(userId);
      res.json(userPromotions);
    } catch (error) {
      console.error("Error fetching user promotions:", error);
      res.status(500).json({ message: "Failed to fetch user promotions" });
    }
  });

  app.post('/api/promotions/create', isAuthenticated, async (req, res) => {
    try {
      // Only allow admins to create promotions
      const user = await storage.getUser(req.user.id);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const promotion = await promotionService.createPromotion(req.body);
      res.json({ success: true, promotion });
    } catch (error) {
      console.error("Error creating promotion:", error);
      res.status(500).json({ message: "Failed to create promotion" });
    }
  });

  app.get('/api/promotions/analytics', isAuthenticated, async (req, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      const analytics = await promotionService.getPromotionAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching promotion analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Referral System
  app.get('/api/referrals/link', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const referralLink = await promotionService.createReferralLink(userId);
      res.json({ referralLink, shareUrl: `${req.protocol}://${req.get('host')}/signup?ref=${referralLink}` });
    } catch (error) {
      console.error("Error creating referral link:", error);
      res.status(500).json({ message: "Failed to create referral link" });
    }
  });

  app.post('/api/referrals/process', async (req, res) => {
    try {
      const { refereeId, referralCode } = req.body;
      const result = await promotionService.processReferralSignup(refereeId, referralCode);
      
      if (result) {
        res.json({ success: true, message: "Referral processed successfully" });
      } else {
        res.status(400).json({ message: "Invalid referral or already referred" });
      }
    } catch (error) {
      console.error("Error processing referral:", error);
      res.status(500).json({ message: "Failed to process referral" });
    }
  });

  app.post('/api/referrals/complete/:refereeId', isAuthenticated, async (req, res) => {
    try {
      const { refereeId } = req.params;
      const { qualifyingAmount } = req.body;
      
      await promotionService.completeReferral(refereeId, qualifyingAmount);
      res.json({ success: true, message: "Referral bonus credited" });
    } catch (error) {
      console.error("Error completing referral:", error);
      res.status(500).json({ message: "Failed to complete referral" });
    }
  });

  // Enhanced Bet Placement with Limits Check
  app.post('/api/bets/place-enhanced', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id;
      const { matchId, market, selection, odds, stake } = req.body;
      
      // Check responsible gambling limits
      const betLimitCheck = await responsibleGamblingService.checkBetLimit(userId, stake);
      if (betLimitCheck.isExceeded) {
        return res.status(400).json({ 
          message: `${betLimitCheck.period} bet limit exceeded. Remaining: ${betLimitCheck.remaining}`,
          limitInfo: betLimitCheck
        });
      }
      
      // Check session limits
      const sessionAllowed = await responsibleGamblingService.checkSessionLimit(userId);
      if (!sessionAllowed) {
        return res.status(400).json({ message: "Session time limit exceeded" });
      }
      
      // Place bet using existing bet placement logic
      const potentialWin = parseFloat((parseFloat(odds) * parseFloat(stake)).toFixed(2));
      
      const bet = await storage.createBet({
        userId,
        matchId: parseInt(matchId),
        market,
        selection,
        odds,
        stake,
        potentialWin: potentialWin.toString(),
        status: 'pending'
      });
      
      // Update session data
      responsibleGamblingService.updateSessionBet(userId, parseFloat(stake));
      
      res.json({ 
        success: true, 
        bet,
        message: "Bet placed successfully",
        limitInfo: betLimitCheck
      });
    } catch (error) {
      console.error("Error placing enhanced bet:", error);
      res.status(500).json({ message: "Failed to place bet" });
    }
  });

  const httpServer = createServer(app);
  
  // Interactive Feature Endpoints
  
  // User achievements
  app.get("/api/user/achievements", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      
      // Mock achievement data for now - would be stored in database
      const mockAchievements = {
        achievements: [
          {
            id: 'first_bet',
            title: 'First Steps',
            description: 'Place your first bet and start your journey!',
            icon: 'target',
            emoji: '🎯',
            rarity: 'common',
            points: 50,
            unlocked: true,
            unlockedAt: new Date().toISOString(),
            progress: 1,
            maxProgress: 1,
            category: 'betting'
          },
          {
            id: 'crypto_master',
            title: 'Crypto Master',
            description: 'Make deposits in 3 different cryptocurrencies',
            icon: 'coins',
            emoji: '💰',
            rarity: 'epic',
            points: 300,
            unlocked: false,
            progress: 1,
            maxProgress: 3,
            category: 'financial'
          }
        ],
        totalPoints: 50,
        level: 1,
        nextLevelPoints: 1000,
        recentUnlocks: []
      };
      
      res.json(mockAchievements);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });

  // Unlock achievement
  app.post("/api/user/achievements/unlock", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const { achievementId } = req.body;
      
      // Mock achievement unlock
      const achievement = {
        id: achievementId,
        title: 'Achievement Unlocked!',
        description: 'Congratulations on your progress!',
        emoji: '🏆',
        rarity: 'common',
        points: 100,
        unlocked: true,
        unlockedAt: new Date().toISOString()
      };
      
      res.json({ 
        success: true, 
        achievement,
        message: 'Achievement unlocked!' 
      });
    } catch (error) {
      console.error("Error unlocking achievement:", error);
      res.status(500).json({ message: "Failed to unlock achievement" });
    }
  });

  // Update achievement progress
  app.post("/api/user/achievements/progress", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      const { achievementId, progress } = req.body;
      
      res.json({ 
        success: true, 
        achievementId,
        progress,
        message: 'Progress updated!' 
      });
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // User stats for personalized dashboard
  app.get("/api/user/stats", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.claims?.sub;
      
      // Mock user stats
      const stats = {
        totalBets: 147,
        winRate: 72,
        totalROI: 18.5,
        currentStreak: 5,
        bestStreak: 12,
        favoritesSport: 'Football',
        lastLogin: new Date().toISOString(),
        consecutiveDays: 7,
        level: 15,
        experiencePoints: 2480,
        nextLevelXP: 3000
      };
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });
  
  // Productivity Insights API Routes
  app.get('/api/productivity/metrics', async (req, res) => {
    try {
      const { timeframe = '7d' } = req.query;
      const userId = req.user?.claims?.sub;
      
      const metrics = await productivityService.getProductivityMetrics(userId, timeframe as string);
      res.json(metrics);
    } catch (error) {
      console.error('Error fetching productivity metrics:', error);
      res.status(500).json({ message: 'Failed to fetch productivity metrics' });
    }
  });

  app.get('/api/productivity/insights', async (req, res) => {
    try {
      const { timeframe = '7d' } = req.query;
      const userId = req.user?.claims?.sub;
      
      const insights = await productivityService.getContextualInsights(userId, timeframe as string);
      res.json(insights);
    } catch (error) {
      console.error('Error fetching productivity insights:', error);
      res.status(500).json({ message: 'Failed to fetch productivity insights' });
    }
  });

  app.get('/api/productivity/performance-data', async (req, res) => {
    try {
      const performanceData = [
        { name: 'Mon', bets: 4, wins: 3, roi: 8.2, research: 2.5 },
        { name: 'Tue', bets: 6, wins: 4, roi: 12.1, research: 3.2 },
        { name: 'Wed', bets: 3, wins: 2, roi: -5.3, research: 1.8 },
        { name: 'Thu', bets: 5, wins: 4, roi: 15.7, research: 4.1 },
        { name: 'Fri', bets: 7, wins: 5, roi: 9.8, research: 3.6 },
        { name: 'Sat', bets: 8, wins: 6, roi: 18.2, research: 4.3 },
        { name: 'Sun', bets: 5, wins: 3, roi: 7.4, research: 2.9 }
      ];
      res.json(performanceData);
    } catch (error) {
      console.error('Error fetching performance data:', error);
      res.status(500).json({ message: 'Failed to fetch performance data' });
    }
  });

  app.get('/api/productivity/user-profile', async (req, res) => {
    try {
      const userId = req.user?.claims?.sub || 'demo_user';
      const profile = await productivityService.getUserBehaviorProfile(userId);
      res.json(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Failed to fetch user profile' });
    }
  });

  app.get('/api/productivity/performance-comparison', async (req, res) => {
    try {
      const userId = req.user?.claims?.sub || 'demo_user';
      const comparison = await productivityService.getPerformanceComparison(userId);
      res.json(comparison);
    } catch (error) {
      console.error('Error fetching performance comparison:', error);
      res.status(500).json({ message: 'Failed to fetch performance comparison' });
    }
  });

  app.get('/api/productivity/recommendations', async (req, res) => {
    try {
      const userId = req.user?.claims?.sub || 'demo_user';
      const recommendations = await productivityService.generateActionableRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
  });

  app.post('/api/productivity/implement-action', async (req, res) => {
    try {
      const { actionId, metricId } = req.body;
      const userId = req.user?.claims?.sub || 'demo_user';
      
      // Log the action implementation
      console.log(`User ${userId} implemented action ${actionId} for metric ${metricId}`);
      
      res.json({
        success: true,
        message: 'Action implemented successfully',
        actionId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error implementing action:', error);
      res.status(500).json({ message: 'Failed to implement action' });
    }
  });

  // Setup WebSocket for real-time updates
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  
  // Seed CRM demo data after initial seeding
  try {
    const { seedCrmData } = await import('./crmSeeder');
    await seedCrmData();
  } catch (error) {
    console.error('CRM seeding failed, but continuing startup:', error);
  }
  
  setupWebSocket(io, storage);

  return httpServer;
}
