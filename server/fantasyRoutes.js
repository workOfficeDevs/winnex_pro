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
exports.registerFantasyRoutes = registerFantasyRoutes;
// Mock data for fantasy sports platform
var mockContests = [
    {
        id: 1,
        name: "NFL Sunday Showdown",
        sport: "Football",
        type: "GPP",
        entryFee: 25,
        prizePool: 50000,
        participants: 1847,
        maxEntries: 5000,
        timeLeft: "2h 15m",
        difficulty: "Beginner",
        guaranteed: true,
        featured: true
    },
    {
        id: 2,
        name: "NBA Championship Special",
        sport: "Basketball",
        type: "Tournament",
        entryFee: 50,
        prizePool: 100000,
        participants: 1234,
        maxEntries: 2000,
        timeLeft: "4h 32m",
        difficulty: "Expert",
        guaranteed: true,
        featured: true
    }
];
var mockLeaderboard = [
    {
        rank: 1,
        username: "FantasyKing",
        avatar: "👑",
        points: 2847.5,
        winnings: 12450,
        contests: 89,
        winRate: 67.4,
        badge: "Elite Player",
        tier: 'master',
        streak: 12
    },
    {
        rank: 2,
        username: "SportsGenius",
        avatar: "🧠",
        points: 2756.2,
        winnings: 11230,
        contests: 76,
        winRate: 71.1,
        badge: "Consistent Winner",
        tier: 'diamond',
        streak: 8
    }
];
var mockPlayers = [
    {
        id: 1,
        name: "Josh Allen",
        team: "BUF",
        position: "QB",
        salary: 8500,
        projectedPoints: 22.4,
        ownership: 15.2,
        trend: 'up',
        injury: null,
        news: ["Expected to have big game vs weak defense", "Weather conditions favorable"]
    },
    {
        id: 2,
        name: "Patrick Mahomes",
        team: "KC",
        position: "QB",
        salary: 9200,
        projectedPoints: 24.1,
        ownership: 18.7,
        trend: 'stable',
        injury: null,
        news: ["Home field advantage", "Top target Travis Kelce likely to play"]
    }
];
function registerFantasyRoutes(app) {
    var _this = this;
    // Fantasy contests endpoints
    app.get("/api/fantasy/contests", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // In production, this would query real contest data
                res.json(mockContests);
            }
            catch (error) {
                console.error("Error fetching fantasy contests:", error);
                res.status(500).json({ message: "Failed to fetch contests" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/leaderboard", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // In production, this would query real leaderboard data
                res.json(mockLeaderboard);
            }
            catch (error) {
                console.error("Error fetching leaderboard:", error);
                res.status(500).json({ message: "Failed to fetch leaderboard" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/players", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, sport, position_1, filteredPlayers;
        return __generator(this, function (_b) {
            try {
                _a = req.query, sport = _a.sport, position_1 = _a.position;
                filteredPlayers = mockPlayers;
                if (sport && sport !== 'all') {
                    // Filter by sport if needed
                }
                if (position_1 && position_1 !== 'all') {
                    filteredPlayers = filteredPlayers.filter(function (p) { return p.position === position_1; });
                }
                res.json(filteredPlayers);
            }
            catch (error) {
                console.error("Error fetching players:", error);
                res.status(500).json({ message: "Failed to fetch players" });
            }
            return [2 /*return*/];
        });
    }); });
    app.post("/api/fantasy/contests/:id/enter", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, lineup;
        return __generator(this, function (_a) {
            try {
                id = req.params.id;
                lineup = req.body.lineup;
                // In production, this would:
                // 1. Validate lineup
                // 2. Check salary cap
                // 3. Process entry fee
                // 4. Save lineup to database
                res.json({
                    success: true,
                    message: "Successfully entered contest",
                    entryId: Math.random().toString(36).substr(2, 9)
                });
            }
            catch (error) {
                console.error("Error entering contest:", error);
                res.status(500).json({ message: "Failed to enter contest" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/my-entries", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // In production, this would query user's contest entries
                res.json([]);
            }
            catch (error) {
                console.error("Error fetching user entries:", error);
                res.status(500).json({ message: "Failed to fetch entries" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/contest/:id/results", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            try {
                id = req.params.id;
                // In production, this would query contest results
                res.json({
                    contestId: id,
                    status: "completed",
                    winners: mockLeaderboard.slice(0, 10),
                    userRank: null,
                    userPayout: 0
                });
            }
            catch (error) {
                console.error("Error fetching contest results:", error);
                res.status(500).json({ message: "Failed to fetch results" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/live-scoring/:contestId", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var contestId;
        return __generator(this, function (_a) {
            try {
                contestId = req.params.contestId;
                // In production, this would provide real-time scoring updates
                res.json({
                    contestId: contestId,
                    lastUpdate: new Date().toISOString(),
                    leaderboard: mockLeaderboard.slice(0, 20),
                    userEntry: null
                });
            }
            catch (error) {
                console.error("Error fetching live scoring:", error);
                res.status(500).json({ message: "Failed to fetch live scoring" });
            }
            return [2 /*return*/];
        });
    }); });
    app.post("/api/fantasy/lineup/save", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, contestId, lineup;
        return __generator(this, function (_b) {
            try {
                _a = req.body, contestId = _a.contestId, lineup = _a.lineup;
                // In production, this would:
                // 1. Validate lineup against contest rules
                // 2. Check salary constraints
                // 3. Save to database
                res.json({
                    success: true,
                    lineupId: Math.random().toString(36).substr(2, 9)
                });
            }
            catch (error) {
                console.error("Error saving lineup:", error);
                res.status(500).json({ message: "Failed to save lineup" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/player/:id/stats", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            try {
                id = req.params.id;
                // In production, this would fetch detailed player statistics
                res.json({
                    playerId: id,
                    seasonStats: {
                        games: 16,
                        avgPoints: 18.4,
                        highScore: 32.1,
                        lowScore: 8.2
                    },
                    recentGames: [
                        { week: 1, points: 24.3, opponent: "MIA" },
                        { week: 2, points: 18.7, opponent: "LV" }
                    ],
                    projections: {
                        thisWeek: 22.4,
                        confidence: 85
                    }
                });
            }
            catch (error) {
                console.error("Error fetching player stats:", error);
                res.status(500).json({ message: "Failed to fetch player stats" });
            }
            return [2 /*return*/];
        });
    }); });
    app.get("/api/fantasy/achievements", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // In production, this would query user achievements
                res.json([
                    {
                        id: "first_win",
                        title: "First Victory",
                        description: "Win your first contest",
                        unlocked: true,
                        unlockedAt: "2025-01-15T10:30:00Z"
                    },
                    {
                        id: "big_winner",
                        title: "Big Winner",
                        description: "Win $1000+ in a single contest",
                        unlocked: false,
                        progress: 650
                    }
                ]);
            }
            catch (error) {
                console.error("Error fetching achievements:", error);
                res.status(500).json({ message: "Failed to fetch achievements" });
            }
            return [2 /*return*/];
        });
    }); });
}
