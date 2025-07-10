import type { Express } from "express";
import { crmService } from "./crmService";
import { isAuthenticated } from "./replitAuth";
import { requirePermission } from "./adminAuth";
import { z } from "zod";

export function registerCrmRoutes(app: Express) {
  // CRM Analytics endpoint - requires CRM access permission
  app.get("/api/crm/analytics", requirePermission('access_crm'), async (req, res) => {
    try {
      const analytics = await crmService.getPlatformAnalytics();
      res.json(analytics);
    } catch (error: any) {
      console.error("Error fetching CRM analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics", error: error.message });
    }
  });

  // User search and listing - requires CRM access permission  
  app.get("/api/crm/users", requirePermission('access_crm'), async (req, res) => {
    try {
      const { search, segment, risk, limit = 50 } = req.query;
      
      let users;
      if (search) {
        users = await crmService.searchUsers(search as string, parseInt(limit as string));
      } else if (segment && segment !== 'all') {
        users = await crmService.getUsersBySegment(segment as string, parseInt(limit as string));
      } else {
        // Return recent users if no specific search
        users = await crmService.getUsersBySegment('all', parseInt(limit as string));
      }
      
      res.json(users);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
  });

  // User profile details
  app.get("/api/crm/users/:userId", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      const analytics = await crmService.getUserAnalytics(userId);
      res.json(analytics);
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
    }
  });

  // Risk alerts
  app.get("/api/crm/risk-alerts", isAuthenticated, async (req, res) => {
    try {
      const { userId, severity, resolved } = req.query;
      const alerts = await crmService.getRiskAlerts(
        userId as string, 
        severity as string, 
        resolved === 'true'
      );
      res.json(alerts);
    } catch (error: any) {
      console.error("Error fetching risk alerts:", error);
      res.status(500).json({ message: "Failed to fetch risk alerts", error: error.message });
    }
  });

  // Resolve risk alert
  app.post("/api/crm/resolve-alert", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        alertId: z.number(),
        notes: z.string().optional()
      });
      
      const { alertId, notes } = schema.parse(req.body);
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      
      const alert = await crmService.resolveRiskAlert(alertId, adminId, notes);
      
      // Log the admin action
      await crmService.logAdminAction({
        adminId,
        action: 'resolve_risk_alert',
        entityType: 'risk_alert',
        entityId: alertId.toString(),
        details: { notes }
      });
      
      res.json(alert);
    } catch (error: any) {
      console.error("Error resolving alert:", error);
      res.status(500).json({ message: "Failed to resolve alert", error: error.message });
    }
  });

  // Support tickets
  app.get("/api/crm/support-tickets", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.query;
      
      let tickets;
      if (userId) {
        tickets = await crmService.getTicketsByUser(userId as string);
      } else {
        tickets = await crmService.getOpenTickets();
      }
      
      res.json(tickets);
    } catch (error: any) {
      console.error("Error fetching support tickets:", error);
      res.status(500).json({ message: "Failed to fetch support tickets", error: error.message });
    }
  });

  // Create support ticket
  app.post("/api/crm/support-tickets", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        subject: z.string().min(1),
        description: z.string().min(1),
        category: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium')
      });
      
      const ticketData = schema.parse(req.body);
      const ticket = await crmService.createSupportTicket(ticketData);
      
      res.json(ticket);
    } catch (error: any) {
      console.error("Error creating support ticket:", error);
      res.status(500).json({ message: "Failed to create support ticket", error: error.message });
    }
  });

  // Flag user for AML
  app.post("/api/crm/flag-user", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        reason: z.string().min(1)
      });
      
      const { userId, reason } = schema.parse(req.body);
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      
      await crmService.flagUserForAML(userId, reason, adminId);
      
      res.json({ success: true, message: "User flagged successfully" });
    } catch (error: any) {
      console.error("Error flagging user:", error);
      res.status(500).json({ message: "Failed to flag user", error: error.message });
    }
  });

  // Update user segments
  app.post("/api/crm/update-segments", isAuthenticated, async (req, res) => {
    try {
      await crmService.updateUserSegmentation();
      
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      await crmService.logAdminAction({
        adminId,
        action: 'update_user_segments',
        entityType: 'system',
        entityId: 'segmentation',
        details: { timestamp: new Date() }
      });
      
      res.json({ success: true, message: "User segments updated successfully" });
    } catch (error: any) {
      console.error("Error updating segments:", error);
      res.status(500).json({ message: "Failed to update segments", error: error.message });
    }
  });

  // Create user profile
  app.post("/api/crm/users", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        fullName: z.string().optional(),
        dateOfBirth: z.string().optional(),
        address: z.object({
          street: z.string(),
          city: z.string(),
          state: z.string(),
          country: z.string(),
          zipCode: z.string()
        }).optional(),
        phoneNumber: z.string().optional(),
        nationality: z.string().optional(),
        occupation: z.string().optional()
      });
      
      const profileData = schema.parse(req.body);
      const profile = await crmService.createUserProfile(profileData);
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error creating user profile:", error);
      res.status(500).json({ message: "Failed to create user profile", error: error.message });
    }
  });

  // Update user profile
  app.put("/api/crm/users/:userId", isAuthenticated, async (req, res) => {
    try {
      const { userId } = req.params;
      const updateData = req.body;
      
      const profile = await crmService.updateUserProfile(userId, updateData);
      
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      await crmService.logAdminAction({
        adminId,
        targetUserId: userId,
        action: 'update_user_profile',
        entityType: 'user_profile',
        entityId: userId,
        details: updateData
      });
      
      res.json(profile);
    } catch (error: any) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update user profile", error: error.message });
    }
  });

  // Transaction monitoring
  app.get("/api/crm/transactions", isAuthenticated, async (req, res) => {
    try {
      const { userId, flagged } = req.query;
      
      if (flagged === 'true') {
        const transactions = await crmService.getFlaggedTransactions();
        res.json(transactions);
      } else if (userId) {
        const transactions = await crmService.getTransactionHistory(userId as string);
        res.json(transactions);
      } else {
        res.status(400).json({ message: "Please specify userId or use flagged=true" });
      }
    } catch (error: any) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions", error: error.message });
    }
  });

  // Create transaction record
  app.post("/api/crm/transactions", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        type: z.enum(['deposit', 'withdrawal', 'bet', 'win']),
        currency: z.string(),
        amount: z.string(),
        usdValue: z.string().optional(),
        txHash: z.string().optional(),
        fromAddress: z.string().optional(),
        toAddress: z.string().optional()
      });
      
      const transactionData = schema.parse(req.body);
      const transaction = await crmService.createTransaction(transactionData);
      
      res.json(transaction);
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      res.status(500).json({ message: "Failed to create transaction", error: error.message });
    }
  });

  // Send notifications
  app.post("/api/crm/notifications", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userIds: z.array(z.string()),
        channel: z.enum(['email', 'sms', 'telegram', 'push', 'in_app']),
        subject: z.string(),
        content: z.string(),
        campaignName: z.string().optional()
      });
      
      const { userIds, channel, subject, content, campaignName } = schema.parse(req.body);
      
      const result = await crmService.sendNotificationToUsers(
        userIds, 
        channel, 
        subject, 
        content, 
        campaignName
      );
      
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      await crmService.logAdminAction({
        adminId,
        action: 'send_notifications',
        entityType: 'notification_campaign',
        entityId: result.campaignId?.toString(),
        details: { userCount: userIds.length, channel, subject }
      });
      
      res.json(result);
    } catch (error: any) {
      console.error("Error sending notifications:", error);
      res.status(500).json({ message: "Failed to send notifications", error: error.message });
    }
  });

  // Admin action logs
  app.get("/api/crm/admin-logs", isAuthenticated, async (req, res) => {
    try {
      const { adminId, limit = 100 } = req.query;
      const logs = await crmService.getAdminLogs(adminId as string, parseInt(limit as string));
      res.json(logs);
    } catch (error: any) {
      console.error("Error fetching admin logs:", error);
      res.status(500).json({ message: "Failed to fetch admin logs", error: error.message });
    }
  });

  // KYC verification
  app.post("/api/crm/kyc-verify", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        documents: z.array(z.object({
          type: z.string(),
          fileName: z.string(),
          fileUrl: z.string(),
          documentNumber: z.string().optional()
        }))
      });
      
      const { userId, documents } = schema.parse(req.body);
      const result = await crmService.performKYCCheck(userId, documents);
      
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      await crmService.logAdminAction({
        adminId,
        targetUserId: userId,
        action: 'kyc_verification',
        entityType: 'kyc',
        entityId: userId,
        details: { documentCount: documents.length }
      });
      
      res.json(result);
    } catch (error: any) {
      console.error("Error performing KYC verification:", error);
      res.status(500).json({ message: "Failed to perform KYC verification", error: error.message });
    }
  });

  // Create risk alert
  app.post("/api/crm/risk-alerts", isAuthenticated, async (req, res) => {
    try {
      const schema = z.object({
        userId: z.string(),
        alertType: z.string(),
        severity: z.enum(['low', 'medium', 'high', 'critical']),
        title: z.string(),
        description: z.string(),
        data: z.any().optional()
      });
      
      const alertData = schema.parse(req.body);
      const alert = await crmService.createRiskAlert(alertData);
      
      res.json(alert);
    } catch (error: any) {
      console.error("Error creating risk alert:", error);
      res.status(500).json({ message: "Failed to create risk alert", error: error.message });
    }
  });

  // Assign support ticket
  app.put("/api/crm/support-tickets/:ticketId/assign", isAuthenticated, async (req, res) => {
    try {
      const { ticketId } = req.params;
      const { assignedTo } = req.body;
      
      const ticket = await crmService.assignTicket(parseInt(ticketId), assignedTo);
      
      const adminId = (req.user as any)?.claims?.sub || 'admin';
      await crmService.logAdminAction({
        adminId,
        action: 'assign_ticket',
        entityType: 'support_ticket',
        entityId: ticketId,
        details: { assignedTo }
      });
      
      res.json(ticket);
    } catch (error: any) {
      console.error("Error assigning ticket:", error);
      res.status(500).json({ message: "Failed to assign ticket", error: error.message });
    }
  });
}