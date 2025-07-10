import type { Express } from "express";
import { db } from "./db";

// Mock data for fantasy sports platform
const mockContests = [
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

const mockLeaderboard = [
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

const mockPlayers = [
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

export function registerFantasyRoutes(app: Express) {
  // Fantasy contests endpoints
  app.get("/api/fantasy/contests", async (req, res) => {
    try {
      // In production, this would query real contest data
      res.json(mockContests);
    } catch (error) {
      console.error("Error fetching fantasy contests:", error);
      res.status(500).json({ message: "Failed to fetch contests" });
    }
  });

  app.get("/api/fantasy/leaderboard", async (req, res) => {
    try {
      // In production, this would query real leaderboard data
      res.json(mockLeaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  app.get("/api/fantasy/players", async (req, res) => {
    try {
      const { sport, position } = req.query;
      
      let filteredPlayers = mockPlayers;
      
      if (sport && sport !== 'all') {
        // Filter by sport if needed
      }
      
      if (position && position !== 'all') {
        filteredPlayers = filteredPlayers.filter(p => p.position === position);
      }
      
      res.json(filteredPlayers);
    } catch (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ message: "Failed to fetch players" });
    }
  });

  app.post("/api/fantasy/contests/:id/enter", async (req, res) => {
    try {
      const { id } = req.params;
      const { lineup } = req.body;
      
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
    } catch (error) {
      console.error("Error entering contest:", error);
      res.status(500).json({ message: "Failed to enter contest" });
    }
  });

  app.get("/api/fantasy/my-entries", async (req, res) => {
    try {
      // In production, this would query user's contest entries
      res.json([]);
    } catch (error) {
      console.error("Error fetching user entries:", error);
      res.status(500).json({ message: "Failed to fetch entries" });
    }
  });

  app.get("/api/fantasy/contest/:id/results", async (req, res) => {
    try {
      const { id } = req.params;
      
      // In production, this would query contest results
      res.json({
        contestId: id,
        status: "completed",
        winners: mockLeaderboard.slice(0, 10),
        userRank: null,
        userPayout: 0
      });
    } catch (error) {
      console.error("Error fetching contest results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  app.get("/api/fantasy/live-scoring/:contestId", async (req, res) => {
    try {
      const { contestId } = req.params;
      
      // In production, this would provide real-time scoring updates
      res.json({
        contestId,
        lastUpdate: new Date().toISOString(),
        leaderboard: mockLeaderboard.slice(0, 20),
        userEntry: null
      });
    } catch (error) {
      console.error("Error fetching live scoring:", error);
      res.status(500).json({ message: "Failed to fetch live scoring" });
    }
  });

  app.post("/api/fantasy/lineup/save", async (req, res) => {
    try {
      const { contestId, lineup } = req.body;
      
      // In production, this would:
      // 1. Validate lineup against contest rules
      // 2. Check salary constraints
      // 3. Save to database
      
      res.json({ 
        success: true,
        lineupId: Math.random().toString(36).substr(2, 9)
      });
    } catch (error) {
      console.error("Error saving lineup:", error);
      res.status(500).json({ message: "Failed to save lineup" });
    }
  });

  app.get("/api/fantasy/player/:id/stats", async (req, res) => {
    try {
      const { id } = req.params;
      
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
    } catch (error) {
      console.error("Error fetching player stats:", error);
      res.status(500).json({ message: "Failed to fetch player stats" });
    }
  });

  app.get("/api/fantasy/achievements", async (req, res) => {
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
    } catch (error) {
      console.error("Error fetching achievements:", error);
      res.status(500).json({ message: "Failed to fetch achievements" });
    }
  });
}