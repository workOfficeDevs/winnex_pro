import { passwordAuthService } from './passwordAuth';
import { z } from 'zod';
// Validation schemas
const signupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
});
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});
export function registerAuthRoutes(app) {
    // Sign up route
    app.post('/api/auth/signup', async (req, res) => {
        try {
            const validatedData = signupSchema.parse(req.body);
            const user = await passwordAuthService.signup(validatedData);
            // Create session for the user
            if (req.session) {
                req.session.userId = user.id;
                req.session.user = user;
            }
            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailVerified: user.emailVerified,
                },
            });
        }
        catch (error) {
            console.error('Signup error:', error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors,
                });
            }
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Signup failed',
            });
        }
    });
    // Login route
    app.post('/api/auth/login', async (req, res) => {
        try {
            const validatedData = loginSchema.parse(req.body);
            const user = await passwordAuthService.login(validatedData);
            // Create session for the user
            if (req.session) {
                req.session.userId = user.id;
                req.session.user = user;
            }
            res.json({
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailVerified: user.emailVerified,
                    isAdmin: user.isAdmin,
                    role: user.role,
                    balance: user.balance,
                },
            });
        }
        catch (error) {
            console.error('Login error:', error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors,
                });
            }
            res.status(401).json({
                success: false,
                message: error instanceof Error ? error.message : 'Login failed',
            });
        }
    });
    // Logout route
    app.post('/api/auth/logout', (req, res) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Logout error:', err);
                    return res.status(500).json({
                        success: false,
                        message: 'Logout failed',
                    });
                }
                res.clearCookie('connect.sid'); // Clear session cookie
                res.json({
                    success: true,
                    message: 'Logout successful',
                });
            });
        }
        else {
            res.json({
                success: true,
                message: 'Already logged out',
            });
        }
    });
    // Get current user route
    app.get('/api/auth/me', async (req, res) => {
        try {
            const userId = req.session?.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated',
                });
            }
            const user = await passwordAuthService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            res.json({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emailVerified: user.emailVerified,
                    isAdmin: user.isAdmin,
                    role: user.role,
                    balance: user.balance,
                },
            });
        }
        catch (error) {
            console.error('Get current user error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get user information',
            });
        }
    });
    // Handle the legacy /api/auth/user route (same as /api/auth/me)
    app.get('/api/auth/user', async (req, res) => {
        try {
            const userId = req.session?.userId;
            if (!userId) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authenticated',
                });
            }
            const user = await passwordAuthService.getUserById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            // Return user in the format the frontend expects
            res.json({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                emailVerified: user.emailVerified,
                isAdmin: user.isAdmin,
                role: user.role,
                balance: user.balance,
            });
        }
        catch (error) {
            console.error('Get current user error:', error);
            res.status(401).json({
                success: false,
                message: 'Not authenticated',
            });
        }
    });
    // Serve simple login page
    app.get('/api/login', (req, res) => {
        res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Login - Winnex</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 400px; margin: 100px auto; padding: 20px; background: #1a1a1a; color: white; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; }
          input { width: 100%; padding: 10px; border: 1px solid #333; background: #2a2a2a; color: white; border-radius: 5px; }
          button { width: 100%; padding: 12px; background: #10b981; color: black; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
          button:hover { background: #059669; }
          .error { color: #ef4444; margin-top: 10px; }
          .success { color: #10b981; margin-top: 10px; }
          .switch { text-align: center; margin-top: 20px; }
          .switch a { color: #10b981; text-decoration: none; }
          .switch a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h2>Login to Winnex</h2>
        <form id="loginForm">
          <div class="form-group">
            <label>Email:</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" id="password" required>
          </div>
          <button type="submit">Login</button>
          <div id="message"></div>
        </form>
        
        <div class="switch">
          <p>Don't have an account? <a href="/api/signup">Sign up here</a></p>
        </div>

        <script>
          document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');

            try {
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
              });

              const data = await response.json();

              if (data.success) {
                messageDiv.innerHTML = '<div class="success">Login successful! Redirecting...</div>';
                setTimeout(() => window.location.href = '/', 1500);
              } else {
                messageDiv.innerHTML = '<div class="error">' + data.message + '</div>';
              }
            } catch (error) {
              messageDiv.innerHTML = '<div class="error">Login failed. Please try again.</div>';
            }
          });
        </script>
      </body>
      </html>
    `);
    });
    // Serve simple signup page
    app.get('/api/signup', (req, res) => {
        res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Sign Up - Winnex</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 400px; margin: 100px auto; padding: 20px; background: #1a1a1a; color: white; }
          .form-group { margin-bottom: 15px; }
          label { display: block; margin-bottom: 5px; }
          input { width: 100%; padding: 10px; border: 1px solid #333; background: #2a2a2a; color: white; border-radius: 5px; }
          button { width: 100%; padding: 12px; background: #10b981; color: black; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; }
          button:hover { background: #059669; }
          .error { color: #ef4444; margin-top: 10px; }
          .success { color: #10b981; margin-top: 10px; }
          .switch { text-align: center; margin-top: 20px; }
          .switch a { color: #10b981; text-decoration: none; }
          .switch a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h2>Sign Up for Winnex</h2>
        <form id="signupForm">
          <div class="form-group">
            <label>First Name:</label>
            <input type="text" id="firstName" required>
          </div>
          <div class="form-group">
            <label>Last Name:</label>
            <input type="text" id="lastName" required>
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" id="email" required>
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" id="password" required minlength="8">
          </div>
          <button type="submit">Sign Up</button>
          <div id="message"></div>
        </form>
        
        <div class="switch">
          <p>Already have an account? <a href="/api/login">Login here</a></p>
        </div>

        <script>
          document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');

            try {
              const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
              });

              const data = await response.json();

              if (data.success) {
                messageDiv.innerHTML = '<div class="success">Account created successfully! Redirecting...</div>';
                setTimeout(() => window.location.href = '/', 1500);
              } else {
                messageDiv.innerHTML = '<div class="error">' + data.message + '</div>';
              }
            } catch (error) {
              messageDiv.innerHTML = '<div class="error">Signup failed. Please try again.</div>';
            }
          });
        </script>
      </body>
      </html>
    `);
    });
    // Compatibility route for old logout links (GET /api/logout)
    app.get('/api/logout', (req, res) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Logout error:', err);
                }
                res.clearCookie('connect.sid');
                res.redirect('/'); // Redirect to home page after logout
            });
        }
        else {
            res.redirect('/');
        }
    });
    console.log('🔐 Password authentication routes registered');
}
