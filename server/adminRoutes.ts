import { Express } from 'express';
import { 
  requireAdmin, 
  requireRole, 
  requirePermission, 
  createAdminSession, 
  promoteUserToAdmin,
  getUserPermissions,
  USER_ROLES,
  AdminUser
} from './adminAuth';
import { db } from './db';
import { users, adminSessions } from '@shared/schema';
import { eq, and, gt } from 'drizzle-orm';
import { storage } from './storage';

export function registerAdminRoutes(app: Express) {
  
  // Get current user's admin status and permissions
  app.get('/api/admin/status', async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.json({ 
        isAdmin: false, 
        role: 'user', 
        permissions: [],
        hasAdminAccess: false
      });
    }

    try {
      const user = req.user as any;
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.claims.sub));

      if (!dbUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRole = dbUser.role || 'user';
      const isAdmin = dbUser.isAdmin || userRole === 'admin' || userRole === 'super_admin';
      const permissions = getUserPermissions(userRole, dbUser.permissions || []);

      res.json({
        isAdmin,
        role: userRole,
        permissions,
        hasAdminAccess: isAdmin,
        hasCrmAccess: permissions.includes('access_crm') || permissions.includes('full_access'),
        canManageUsers: permissions.includes('manage_users') || permissions.includes('full_access'),
        canViewAnalytics: permissions.includes('view_analytics') || permissions.includes('full_access')
      });
    } catch (error) {
      console.error('Error checking admin status:', error);
      res.status(500).json({ message: 'Failed to check admin status' });
    }
  });

  // Admin panel main route - requires admin access
  app.get('/api/admin/panel', requireAdmin, async (req, res) => {
    try {
      const user = req.user as any;
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.claims.sub));

      if (!dbUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const adminUser: AdminUser = {
        id: dbUser.id,
        email: dbUser.email || '',
        role: dbUser.role || 'user',
        permissions: getUserPermissions(dbUser.role || 'user', dbUser.permissions || []),
        firstName: dbUser.firstName || undefined,
        lastName: dbUser.lastName || undefined,
      };

      res.json({
        success: true,
        admin: adminUser,
        modules: {
          crm: adminUser.permissions.includes('access_crm') || adminUser.permissions.includes('full_access'),
          userManagement: adminUser.permissions.includes('manage_users') || adminUser.permissions.includes('full_access'),
          analytics: adminUser.permissions.includes('view_analytics') || adminUser.permissions.includes('full_access'),
          promotions: adminUser.permissions.includes('manage_promotions') || adminUser.permissions.includes('full_access'),
          sports: adminUser.permissions.includes('manage_sports') || adminUser.permissions.includes('full_access'),
          security: adminUser.permissions.includes('security_logs') || adminUser.permissions.includes('full_access'),
          systemSettings: adminUser.permissions.includes('system_settings') || adminUser.permissions.includes('full_access'),
        }
      });
    } catch (error) {
      console.error('Error loading admin panel:', error);
      res.status(500).json({ message: 'Failed to load admin panel' });
    }
  });

  // Separate admin login - creates admin session token
  app.post('/api/admin/login', async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Must be logged in to access admin portal' });
      }

      const user = req.user as any;
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.claims.sub));

      if (!dbUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRole = dbUser.role || 'user';
      const isAdmin = dbUser.isAdmin || userRole === 'admin' || userRole === 'super_admin';

      if (!isAdmin) {
        return res.status(403).json({ 
          message: 'Admin access required',
          error: 'INSUFFICIENT_PERMISSIONS'
        });
      }

      // Create admin session
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent');
      const adminToken = await createAdminSession(dbUser.id, ipAddress, userAgent);

      // Set admin token as HTTP-only cookie
      res.cookie('adminToken', adminToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: 'strict'
      });

      const adminUser: AdminUser = {
        id: dbUser.id,
        email: dbUser.email || '',
        role: userRole,
        permissions: getUserPermissions(userRole, dbUser.permissions || []),
        firstName: dbUser.firstName || undefined,
        lastName: dbUser.lastName || undefined,
      };

      res.json({
        success: true,
        admin: adminUser,
        token: adminToken,
        message: 'Admin session created successfully'
      });
    } catch (error) {
      console.error('Admin login failed:', error);
      res.status(500).json({ message: 'Admin login failed' });
    }
  });

  // Admin logout - invalidate admin session
  app.post('/api/admin/logout', async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminToken;
      
      if (token) {
        const crypto = require('crypto');
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        
        // Delete admin session
        await db
          .delete(adminSessions)
          .where(eq(adminSessions.token, hashedToken));
      }

      // Clear admin token cookie
      res.clearCookie('adminToken');
      
      res.json({ success: true, message: 'Admin session ended' });
    } catch (error) {
      console.error('Admin logout failed:', error);
      res.status(500).json({ message: 'Admin logout failed' });
    }
  });

  // Promote user to admin (super admin only)
  app.post('/api/admin/promote-user', requireRole(USER_ROLES.SUPER_ADMIN), async (req, res) => {
    try {
      const { userId, role = 'admin', permissions = [] } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'User ID required' });
      }

      // Validate role
      const validRoles = Object.values(USER_ROLES);
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified' });
      }

      await promoteUserToAdmin(userId, role, permissions);

      res.json({ 
        success: true, 
        message: `User promoted to ${role} successfully`,
        role,
        permissions: getUserPermissions(role, permissions)
      });
    } catch (error) {
      console.error('User promotion failed:', error);
      res.status(500).json({ message: 'User promotion failed' });
    }
  });

  // Get admin users list (admin and above)
  app.get('/api/admin/users', requireAdmin, async (req, res) => {
    try {
      const adminUsers = await db
        .select({
          id: users.id,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          role: users.role,
          permissions: users.permissions,
          isAdmin: users.isAdmin,
          lastLoginAt: users.lastLoginAt,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.isAdmin, true));

      res.json(adminUsers);
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
      res.status(500).json({ message: 'Failed to fetch admin users' });
    }
  });

  // Update user role and permissions (admin and above)
  app.put('/api/admin/users/:userId/role', requireAdmin, async (req, res) => {
    try {
      const { userId } = req.params;
      const { role, permissions = [] } = req.body;
      const adminUser = req.user as any;

      // Prevent self-demotion for super admins
      if (userId === adminUser.claims.sub && role !== 'super_admin') {
        const [currentUser] = await db.select().from(users).where(eq(users.id, userId));
        if (currentUser?.role === 'super_admin') {
          return res.status(400).json({ message: 'Cannot demote yourself from super admin' });
        }
      }

      const effectivePermissions = getUserPermissions(role, permissions);
      
      await db
        .update(users)
        .set({
          role,
          permissions: effectivePermissions,
          isAdmin: role === 'admin' || role === 'super_admin',
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));

      res.json({ 
        success: true, 
        message: 'User role updated successfully',
        role,
        permissions: effectivePermissions
      });
    } catch (error) {
      console.error('Role update failed:', error);
      res.status(500).json({ message: 'Role update failed' });
    }
  });

  // Get admin activity logs
  app.get('/api/admin/activity', requirePermission('security_logs'), async (req, res) => {
    try {
      const { limit = 50 } = req.query;
      
      const activities = await db
        .select()
        .from(adminSessions)
        .innerJoin(users, eq(adminSessions.userId, users.id))
        .orderBy(adminSessions.createdAt)
        .limit(parseInt(limit as string));

      res.json(activities);
    } catch (error) {
      console.error('Failed to fetch admin activity:', error);
      res.status(500).json({ message: 'Failed to fetch admin activity' });
    }
  });

  // Admin dashboard statistics
  app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getPlatformAnalytics();
      
      res.json({
        success: true,
        stats,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to fetch admin stats:', error);
      res.status(500).json({ message: 'Failed to fetch admin statistics' });
    }
  });
}