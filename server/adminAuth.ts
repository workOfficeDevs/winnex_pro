import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import { db } from './db';
import { users, adminSessions } from '@shared/schema';
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';

// User role hierarchy
export const USER_ROLES = {
  USER: 'user',
  MANAGER: 'manager', 
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
} as const;

// Permission sets for different roles
export const ROLE_PERMISSIONS = {
  [USER_ROLES.USER]: ['view_own_profile', 'place_bets', 'view_own_transactions'],
  [USER_ROLES.MANAGER]: ['view_reports', 'manage_customer_tickets', 'view_user_profiles'],
  [USER_ROLES.ADMIN]: ['manage_users', 'access_crm', 'view_analytics', 'manage_promotions', 'manage_sports'],
  [USER_ROLES.SUPER_ADMIN]: ['full_access', 'manage_admins', 'system_settings', 'security_logs']
} as const;

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  permissions: string[];
  firstName?: string;
  lastName?: string;
}

// Check if user has required role
export function hasRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = [USER_ROLES.USER, USER_ROLES.MANAGER, USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN];
  const userRoleIndex = roleHierarchy.indexOf(userRole as any);
  const requiredRoleIndex = roleHierarchy.indexOf(requiredRole as any);
  
  return userRoleIndex >= requiredRoleIndex;
}

// Check if user has specific permission
export function hasPermission(user: AdminUser, permission: string): boolean {
  if (user.permissions.includes('full_access')) return true;
  return user.permissions.includes(permission);
}

// Middleware to require admin role
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = req.user as any;
  
  if (!req.isAuthenticated() || !user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (!user.claims?.sub) {
    return res.status(401).json({ message: 'Invalid user session' });
  }

  // Check if user is admin
  if (!user.isAdmin && !hasRole(user.role || 'user', USER_ROLES.ADMIN)) {
    return res.status(403).json({ 
      message: 'Admin access required',
      error: 'INSUFFICIENT_PERMISSIONS'
    });
  }

  next();
}

// Middleware to require specific role
export function requireRole(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    
    if (!req.isAuthenticated() || !user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = user.role || 'user';
    if (!hasRole(userRole, requiredRole)) {
      return res.status(403).json({ 
        message: `${requiredRole} role required`,
        error: 'INSUFFICIENT_ROLE'
      });
    }

    next();
  };
}

// Middleware to require specific permission
export function requirePermission(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    
    if (!req.isAuthenticated() || !user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    try {
      // Get user from database to check current permissions
      const [dbUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, user.claims.sub));

      if (!dbUser) {
        return res.status(401).json({ message: 'User not found' });
      }

      const adminUser: AdminUser = {
        id: dbUser.id,
        email: dbUser.email || '',
        role: dbUser.role || 'user',
        permissions: dbUser.permissions || [],
        firstName: dbUser.firstName || undefined,
        lastName: dbUser.lastName || undefined,
      };

      if (!hasPermission(adminUser, permission)) {
        return res.status(403).json({ 
          message: `Permission '${permission}' required`,
          error: 'INSUFFICIENT_PERMISSIONS'
        });
      }

      req.adminUser = adminUser;
      next();
    } catch (error) {
      console.error('Permission check failed:', error);
      res.status(500).json({ message: 'Permission check failed' });
    }
  };
}

// Create admin session token
export async function createAdminSession(userId: string, ipAddress?: string, userAgent?: string): Promise<string> {
  const token = nanoid(64);
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  await db.insert(adminSessions).values({
    id: nanoid(),
    userId,
    token: hashedToken,
    expiresAt,
    ipAddress,
    userAgent,
  });

  return token;
}

// Validate admin session token
export async function validateAdminSession(token: string): Promise<AdminUser | null> {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
  const [session] = await db
    .select()
    .from(adminSessions)
    .innerJoin(users, eq(adminSessions.userId, users.id))
    .where(
      and(
        eq(adminSessions.token, hashedToken),
        gt(adminSessions.expiresAt, new Date())
      )
    );

  if (!session) return null;

  const user = session.users;
  return {
    id: user.id,
    email: user.email || '',
    role: user.role || 'user',
    permissions: user.permissions || [],
    firstName: user.firstName || undefined,
    lastName: user.lastName || undefined,
  };
}

// Middleware for admin session authentication
export function adminSessionAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminToken;
  
  if (!token) {
    return res.status(401).json({ message: 'Admin token required' });
  }

  validateAdminSession(token)
    .then(adminUser => {
      if (!adminUser) {
        return res.status(401).json({ message: 'Invalid or expired admin token' });
      }
      
      req.adminUser = adminUser;
      next();
    })
    .catch(error => {
      console.error('Admin session validation failed:', error);
      res.status(500).json({ message: 'Session validation failed' });
    });
}

// Get user's effective permissions based on role
export function getUserPermissions(role: string, customPermissions: string[] = []): string[] {
  const rolePermissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
  return [...new Set([...rolePermissions, ...customPermissions])];
}

// Promote user to admin role
export async function promoteUserToAdmin(userId: string, role: string = USER_ROLES.ADMIN, permissions: string[] = []): Promise<void> {
  const effectivePermissions = getUserPermissions(role, permissions);
  
  await db
    .update(users)
    .set({
      role,
      permissions: effectivePermissions,
      isAdmin: true,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

// Cleanup expired admin sessions
export async function cleanupExpiredSessions(): Promise<void> {
  await db
    .delete(adminSessions)
    .where(gt(new Date(), adminSessions.expiresAt));
}

// Extend types for request object
declare global {
  namespace Express {
    interface Request {
      adminUser?: AdminUser;
    }
  }
}