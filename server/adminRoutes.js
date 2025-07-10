"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminRoutes = registerAdminRoutes;
var adminAuth_1 = require("./adminAuth");
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var storage_1 = require("./storage");
function registerAdminRoutes(app) {
    var _this = this;
    // Get current user's admin status and permissions
    app.get('/api/admin/status', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user, dbUser, userRole, isAdmin, permissions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.isAuthenticated()) {
                        return [2 /*return*/, res.json({
                                isAdmin: false,
                                role: 'user',
                                permissions: [],
                                hasAdminAccess: false
                            })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    user = req.user;
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.users)
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.claims.sub))];
                case 2:
                    dbUser = (_a.sent())[0];
                    if (!dbUser) {
                        return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                    }
                    userRole = dbUser.role || 'user';
                    isAdmin = dbUser.isAdmin || userRole === 'admin' || userRole === 'super_admin';
                    permissions = (0, adminAuth_1.getUserPermissions)(userRole, dbUser.permissions || []);
                    res.json({
                        isAdmin: isAdmin,
                        role: userRole,
                        permissions: permissions,
                        hasAdminAccess: isAdmin,
                        hasCrmAccess: permissions.includes('access_crm') || permissions.includes('full_access'),
                        canManageUsers: permissions.includes('manage_users') || permissions.includes('full_access'),
                        canViewAnalytics: permissions.includes('view_analytics') || permissions.includes('full_access')
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error checking admin status:', error_1);
                    res.status(500).json({ message: 'Failed to check admin status' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Admin panel main route - requires admin access
    app.get('/api/admin/panel', adminAuth_1.requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user, dbUser, adminUser, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.users)
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.claims.sub))];
                case 1:
                    dbUser = (_a.sent())[0];
                    if (!dbUser) {
                        return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                    }
                    adminUser = {
                        id: dbUser.id,
                        email: dbUser.email || '',
                        role: dbUser.role || 'user',
                        permissions: (0, adminAuth_1.getUserPermissions)(dbUser.role || 'user', dbUser.permissions || []),
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
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error loading admin panel:', error_2);
                    res.status(500).json({ message: 'Failed to load admin panel' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Separate admin login - creates admin session token
    app.post('/api/admin/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var user, dbUser, userRole, isAdmin, ipAddress, userAgent, adminToken, adminUser, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!req.isAuthenticated()) {
                        return [2 /*return*/, res.status(401).json({ message: 'Must be logged in to access admin portal' })];
                    }
                    user = req.user;
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.users)
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.claims.sub))];
                case 1:
                    dbUser = (_a.sent())[0];
                    if (!dbUser) {
                        return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                    }
                    userRole = dbUser.role || 'user';
                    isAdmin = dbUser.isAdmin || userRole === 'admin' || userRole === 'super_admin';
                    if (!isAdmin) {
                        return [2 /*return*/, res.status(403).json({
                                message: 'Admin access required',
                                error: 'INSUFFICIENT_PERMISSIONS'
                            })];
                    }
                    ipAddress = req.ip;
                    userAgent = req.get('User-Agent');
                    return [4 /*yield*/, (0, adminAuth_1.createAdminSession)(dbUser.id, ipAddress, userAgent)];
                case 2:
                    adminToken = _a.sent();
                    // Set admin token as HTTP-only cookie
                    res.cookie('adminToken', adminToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        maxAge: 24 * 60 * 60 * 1000, // 24 hours
                        sameSite: 'strict'
                    });
                    adminUser = {
                        id: dbUser.id,
                        email: dbUser.email || '',
                        role: userRole,
                        permissions: (0, adminAuth_1.getUserPermissions)(userRole, dbUser.permissions || []),
                        firstName: dbUser.firstName || undefined,
                        lastName: dbUser.lastName || undefined,
                    };
                    res.json({
                        success: true,
                        admin: adminUser,
                        token: adminToken,
                        message: 'Admin session created successfully'
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Admin login failed:', error_3);
                    res.status(500).json({ message: 'Admin login failed' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Admin logout - invalidate admin session
    app.post('/api/admin/logout', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var token, crypto_1, hashedToken, error_4;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.adminToken);
                    if (!token) return [3 /*break*/, 2];
                    crypto_1 = require('crypto');
                    hashedToken = crypto_1.createHash('sha256').update(token).digest('hex');
                    // Delete admin session
                    return [4 /*yield*/, db_1.db
                            .delete(schema_1.adminSessions)
                            .where((0, drizzle_orm_1.eq)(schema_1.adminSessions.token, hashedToken))];
                case 1:
                    // Delete admin session
                    _c.sent();
                    _c.label = 2;
                case 2:
                    // Clear admin token cookie
                    res.clearCookie('adminToken');
                    res.json({ success: true, message: 'Admin session ended' });
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _c.sent();
                    console.error('Admin logout failed:', error_4);
                    res.status(500).json({ message: 'Admin logout failed' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Promote user to admin (super admin only)
    app.post('/api/admin/promote-user', (0, adminAuth_1.requireRole)(adminAuth_1.USER_ROLES.SUPER_ADMIN), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, userId, _b, role, _c, permissions, validRoles, error_5;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 2, , 3]);
                    _a = req.body, userId = _a.userId, _b = _a.role, role = _b === void 0 ? 'admin' : _b, _c = _a.permissions, permissions = _c === void 0 ? [] : _c;
                    if (!userId) {
                        return [2 /*return*/, res.status(400).json({ message: 'User ID required' })];
                    }
                    validRoles = Object.values(adminAuth_1.USER_ROLES);
                    if (!validRoles.includes(role)) {
                        return [2 /*return*/, res.status(400).json({ message: 'Invalid role specified' })];
                    }
                    return [4 /*yield*/, (0, adminAuth_1.promoteUserToAdmin)(userId, role, permissions)];
                case 1:
                    _d.sent();
                    res.json({
                        success: true,
                        message: "User promoted to ".concat(role, " successfully"),
                        role: role,
                        permissions: (0, adminAuth_1.getUserPermissions)(role, permissions)
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _d.sent();
                    console.error('User promotion failed:', error_5);
                    res.status(500).json({ message: 'User promotion failed' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get admin users list (admin and above)
    app.get('/api/admin/users', adminAuth_1.requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var adminUsers, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, db_1.db
                            .select({
                            id: schema_1.users.id,
                            email: schema_1.users.email,
                            firstName: schema_1.users.firstName,
                            lastName: schema_1.users.lastName,
                            role: schema_1.users.role,
                            permissions: schema_1.users.permissions,
                            isAdmin: schema_1.users.isAdmin,
                            lastLoginAt: schema_1.users.lastLoginAt,
                            createdAt: schema_1.users.createdAt,
                        })
                            .from(schema_1.users)
                            .where((0, drizzle_orm_1.eq)(schema_1.users.isAdmin, true))];
                case 1:
                    adminUsers = _a.sent();
                    res.json(adminUsers);
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    console.error('Failed to fetch admin users:', error_6);
                    res.status(500).json({ message: 'Failed to fetch admin users' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Update user role and permissions (admin and above)
    app.put('/api/admin/users/:userId/role', adminAuth_1.requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, _a, role, _b, permissions, adminUser, currentUser, effectivePermissions, error_7;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    userId = req.params.userId;
                    _a = req.body, role = _a.role, _b = _a.permissions, permissions = _b === void 0 ? [] : _b;
                    adminUser = req.user;
                    if (!(userId === adminUser.claims.sub && role !== 'super_admin')) return [3 /*break*/, 2];
                    return [4 /*yield*/, db_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))];
                case 1:
                    currentUser = (_c.sent())[0];
                    if ((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === 'super_admin') {
                        return [2 /*return*/, res.status(400).json({ message: 'Cannot demote yourself from super admin' })];
                    }
                    _c.label = 2;
                case 2:
                    effectivePermissions = (0, adminAuth_1.getUserPermissions)(role, permissions);
                    return [4 /*yield*/, db_1.db
                            .update(schema_1.users)
                            .set({
                            role: role,
                            permissions: effectivePermissions,
                            isAdmin: role === 'admin' || role === 'super_admin',
                            updatedAt: new Date(),
                        })
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))];
                case 3:
                    _c.sent();
                    res.json({
                        success: true,
                        message: 'User role updated successfully',
                        role: role,
                        permissions: effectivePermissions
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_7 = _c.sent();
                    console.error('Role update failed:', error_7);
                    res.status(500).json({ message: 'Role update failed' });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    // Get admin activity logs
    app.get('/api/admin/activity', (0, adminAuth_1.requirePermission)('security_logs'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, limit, activities, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query.limit, limit = _a === void 0 ? 50 : _a;
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.adminSessions)
                            .innerJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.adminSessions.userId, schema_1.users.id))
                            .orderBy(schema_1.adminSessions.createdAt)
                            .limit(parseInt(limit))];
                case 1:
                    activities = _b.sent();
                    res.json(activities);
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _b.sent();
                    console.error('Failed to fetch admin activity:', error_8);
                    res.status(500).json({ message: 'Failed to fetch admin activity' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Admin dashboard statistics
    app.get('/api/admin/stats', adminAuth_1.requireAdmin, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var stats, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, storage_1.storage.getPlatformAnalytics()];
                case 1:
                    stats = _a.sent();
                    res.json({
                        success: true,
                        stats: stats,
                        timestamp: new Date().toISOString()
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_9 = _a.sent();
                    console.error('Failed to fetch admin stats:', error_9);
                    res.status(500).json({ message: 'Failed to fetch admin statistics' });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
}
