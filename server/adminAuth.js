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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_PERMISSIONS = exports.USER_ROLES = void 0;
exports.hasRole = hasRole;
exports.hasPermission = hasPermission;
exports.requireAdmin = requireAdmin;
exports.requireRole = requireRole;
exports.requirePermission = requirePermission;
exports.createAdminSession = createAdminSession;
exports.validateAdminSession = validateAdminSession;
exports.adminSessionAuth = adminSessionAuth;
exports.getUserPermissions = getUserPermissions;
exports.promoteUserToAdmin = promoteUserToAdmin;
exports.cleanupExpiredSessions = cleanupExpiredSessions;
var nanoid_1 = require("nanoid");
var db_1 = require("./db");
var schema_1 = require("@shared/schema");
var drizzle_orm_1 = require("drizzle-orm");
var crypto_1 = require("crypto");
// User role hierarchy
exports.USER_ROLES = {
    USER: 'user',
    MANAGER: 'manager',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};
// Permission sets for different roles
exports.ROLE_PERMISSIONS = (_a = {},
    _a[exports.USER_ROLES.USER] = ['view_own_profile', 'place_bets', 'view_own_transactions'],
    _a[exports.USER_ROLES.MANAGER] = ['view_reports', 'manage_customer_tickets', 'view_user_profiles'],
    _a[exports.USER_ROLES.ADMIN] = ['manage_users', 'access_crm', 'view_analytics', 'manage_promotions', 'manage_sports'],
    _a[exports.USER_ROLES.SUPER_ADMIN] = ['full_access', 'manage_admins', 'system_settings', 'security_logs'],
    _a);
// Check if user has required role
function hasRole(userRole, requiredRole) {
    var roleHierarchy = [exports.USER_ROLES.USER, exports.USER_ROLES.MANAGER, exports.USER_ROLES.ADMIN, exports.USER_ROLES.SUPER_ADMIN];
    var userRoleIndex = roleHierarchy.indexOf(userRole);
    var requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    return userRoleIndex >= requiredRoleIndex;
}
// Check if user has specific permission
function hasPermission(user, permission) {
    if (user.permissions.includes('full_access'))
        return true;
    return user.permissions.includes(permission);
}
// Middleware to require admin role
function requireAdmin(req, res, next) {
    var _a;
    var user = req.user;
    if (!req.isAuthenticated() || !user) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    if (!((_a = user.claims) === null || _a === void 0 ? void 0 : _a.sub)) {
        return res.status(401).json({ message: 'Invalid user session' });
    }
    // Check if user is admin
    if (!user.isAdmin && !hasRole(user.role || 'user', exports.USER_ROLES.ADMIN)) {
        return res.status(403).json({
            message: 'Admin access required',
            error: 'INSUFFICIENT_PERMISSIONS'
        });
    }
    next();
}
// Middleware to require specific role
function requireRole(requiredRole) {
    return function (req, res, next) {
        var user = req.user;
        if (!req.isAuthenticated() || !user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        var userRole = user.role || 'user';
        if (!hasRole(userRole, requiredRole)) {
            return res.status(403).json({
                message: "".concat(requiredRole, " role required"),
                error: 'INSUFFICIENT_ROLE'
            });
        }
        next();
    };
}
// Middleware to require specific permission
function requirePermission(permission) {
    var _this = this;
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var user, dbUser, adminUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = req.user;
                    if (!req.isAuthenticated() || !user) {
                        return [2 /*return*/, res.status(401).json({ message: 'Authentication required' })];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.users)
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, user.claims.sub))];
                case 2:
                    dbUser = (_a.sent())[0];
                    if (!dbUser) {
                        return [2 /*return*/, res.status(401).json({ message: 'User not found' })];
                    }
                    adminUser = {
                        id: dbUser.id,
                        email: dbUser.email || '',
                        role: dbUser.role || 'user',
                        permissions: dbUser.permissions || [],
                        firstName: dbUser.firstName || undefined,
                        lastName: dbUser.lastName || undefined,
                    };
                    if (!hasPermission(adminUser, permission)) {
                        return [2 /*return*/, res.status(403).json({
                                message: "Permission '".concat(permission, "' required"),
                                error: 'INSUFFICIENT_PERMISSIONS'
                            })];
                    }
                    req.adminUser = adminUser;
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Permission check failed:', error_1);
                    res.status(500).json({ message: 'Permission check failed' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
}
// Create admin session token
function createAdminSession(userId, ipAddress, userAgent) {
    return __awaiter(this, void 0, void 0, function () {
        var token, hashedToken, expiresAt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = (0, nanoid_1.nanoid)(64);
                    hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
                    expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
                    return [4 /*yield*/, db_1.db.insert(schema_1.adminSessions).values({
                            id: (0, nanoid_1.nanoid)(),
                            userId: userId,
                            token: hashedToken,
                            expiresAt: expiresAt,
                            ipAddress: ipAddress,
                            userAgent: userAgent,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
}
// Validate admin session token
function validateAdminSession(token) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedToken, session, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
                    return [4 /*yield*/, db_1.db
                            .select()
                            .from(schema_1.adminSessions)
                            .innerJoin(schema_1.users, (0, drizzle_orm_1.eq)(schema_1.adminSessions.userId, schema_1.users.id))
                            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.adminSessions.token, hashedToken), (0, drizzle_orm_1.gt)(schema_1.adminSessions.expiresAt, new Date())))];
                case 1:
                    session = (_a.sent())[0];
                    if (!session)
                        return [2 /*return*/, null];
                    user = session.users;
                    return [2 /*return*/, {
                            id: user.id,
                            email: user.email || '',
                            role: user.role || 'user',
                            permissions: user.permissions || [],
                            firstName: user.firstName || undefined,
                            lastName: user.lastName || undefined,
                        }];
            }
        });
    });
}
// Middleware for admin session authentication
function adminSessionAuth(req, res, next) {
    var _a, _b;
    var token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '')) || ((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.adminToken);
    if (!token) {
        return res.status(401).json({ message: 'Admin token required' });
    }
    validateAdminSession(token)
        .then(function (adminUser) {
        if (!adminUser) {
            return res.status(401).json({ message: 'Invalid or expired admin token' });
        }
        req.adminUser = adminUser;
        next();
    })
        .catch(function (error) {
        console.error('Admin session validation failed:', error);
        res.status(500).json({ message: 'Session validation failed' });
    });
}
// Get user's effective permissions based on role
function getUserPermissions(role, customPermissions) {
    if (customPermissions === void 0) { customPermissions = []; }
    var rolePermissions = exports.ROLE_PERMISSIONS[role] || [];
    return __spreadArray([], new Set(__spreadArray(__spreadArray([], rolePermissions, true), customPermissions, true)), true);
}
// Promote user to admin role
function promoteUserToAdmin(userId_1) {
    return __awaiter(this, arguments, void 0, function (userId, role, permissions) {
        var effectivePermissions;
        if (role === void 0) { role = exports.USER_ROLES.ADMIN; }
        if (permissions === void 0) { permissions = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    effectivePermissions = getUserPermissions(role, permissions);
                    return [4 /*yield*/, db_1.db
                            .update(schema_1.users)
                            .set({
                            role: role,
                            permissions: effectivePermissions,
                            isAdmin: true,
                            updatedAt: new Date(),
                        })
                            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Cleanup expired admin sessions
function cleanupExpiredSessions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.db
                        .delete(schema_1.adminSessions)
                        .where((0, drizzle_orm_1.gt)(new Date(), schema_1.adminSessions.expiresAt))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
