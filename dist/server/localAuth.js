import session from "express-session";
import { storage } from "./storage";
import { registerAuthRoutes } from "./authRoutes";
import { passwordAuthService } from "./passwordAuth";
// Simple mock user for local development (fallback)
const mockUser = {
    id: "local_dev_user",
    email: "dev@localhost.com",
    firstName: "Dev",
    lastName: "User",
    claims: {
        sub: "local_dev_user",
        email: "dev@localhost.com",
        first_name: "Dev",
        last_name: "User"
    },
    isAdmin: true,
    role: "admin",
    expires_at: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year from now
};
export async function setupAuth(app) {
    // Setup express session
    app.use(session({
        secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true in production with HTTPS
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    }));
    // Create/update the mock user in database as fallback
    try {
        await storage.upsertUser({
            id: mockUser.id,
            email: mockUser.email,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            profileImageUrl: null,
        });
        console.log("✅ Local dev user created/updated");
    }
    catch (error) {
        console.log("❌ Failed to create dev user:", error);
    }
    // Register password authentication routes
    registerAuthRoutes(app);
    // Enhanced middleware to support both session-based and mock authentication
    app.use(async (req, res, next) => {
        // Check if user is authenticated via session
        if (req.session?.userId) {
            try {
                const user = await passwordAuthService.getUserById(req.session.userId);
                if (user) {
                    req.user = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        isAdmin: user.isAdmin,
                        role: user.role,
                        claims: {
                            sub: user.id,
                            email: user.email,
                            first_name: user.firstName,
                            last_name: user.lastName
                        },
                        expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
                    };
                    req.isAuthenticated = () => true;
                    return next();
                }
            }
            catch (error) {
                console.error("Error loading user from session:", error);
            }
        }
        // List of API routes that should work without authentication (for development)
        const publicApiRoutes = [
            '/api/auth/', // All auth routes
            '/api/sports', // Sports data
            '/api/matches', // Match data
            '/api/crypto/prices', // Crypto prices
            '/api/system/status' // System status
        ];
        // List of API routes that need mock user for development functionality
        const mockUserApiRoutes = [
            '/api/bets',
            '/api/user/', // User-specific routes that need a user context
            '/api/admin',
            '/api/crm'
        ];
        const isPublicRoute = publicApiRoutes.some(route => req.path.startsWith(route));
        const needsMockUser = mockUserApiRoutes.some(route => req.path.startsWith(route));
        if (req.path.startsWith('/api/')) {
            if (isPublicRoute) {
                // Public API routes - no authentication required
                req.isAuthenticated = () => false;
                req.user = null;
            }
            else if (needsMockUser) {
                // Development routes that need a user context - use mock user
                req.isAuthenticated = () => true;
                req.user = mockUser;
            }
            else {
                // Other API routes - no authentication
                req.isAuthenticated = () => false;
                req.user = null;
            }
        }
        else {
            // Non-API routes - no authentication
            req.isAuthenticated = () => false;
            req.user = null;
        }
        next();
    });
    console.log("🔧 Enhanced authentication setup complete with password auth support");
}
// Enhanced authentication middleware
export const isAuthenticated = async (req, res, next) => {
    // Check session authentication first
    if (req.session?.userId) {
        try {
            const user = await passwordAuthService.getUserById(req.session.userId);
            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isAdmin: user.isAdmin,
                    role: user.role,
                    claims: {
                        sub: user.id,
                        email: user.email,
                        first_name: user.firstName,
                        last_name: user.lastName
                    }
                };
                return next();
            }
        }
        catch (error) {
            console.error("Auth middleware error:", error);
        }
    }
    // For API routes that require authentication, fall back to mock user (development)
    if (req.path.startsWith('/api/')) {
        req.user = mockUser;
        return next();
    }
    // For non-API routes, return 401 if not authenticated
    return res.status(401).json({
        success: false,
        message: 'Authentication required'
    });
};
