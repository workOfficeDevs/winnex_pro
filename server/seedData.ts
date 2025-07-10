import { storage } from "./storage";

export async function seedDatabase() {
  try {
    console.log("Seeding database with initial data...");

    // Create sports
    const sports = [
      { name: "Football", slug: "football", icon: "🏈", isActive: true },
      { name: "Basketball", slug: "basketball", icon: "🏀", isActive: true },
      { name: "Soccer", slug: "soccer", icon: "⚽", isActive: true },
      { name: "Tennis", slug: "tennis", icon: "🎾", isActive: true },
      { name: "Baseball", slug: "baseball", icon: "⚾", isActive: true }
    ];

    const createdSports = [];
    for (const sport of sports) {
      try {
        const created = await storage.createSport(sport);
        createdSports.push(created);
        console.log(`Created sport: ${sport.name}`);
      } catch (error) {
        console.log(`Sport ${sport.name} already exists, skipping...`);
      }
    }

    // Create matches
    const matches = [
      {
        sportId: 1, // Football
        team1: "Kansas City Chiefs",
        team2: "Buffalo Bills", 
        startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        isLive: false,
        score1: 0,
        score2: 0,
        status: "scheduled"
      },
      {
        sportId: 1, // Football
        team1: "Dallas Cowboys",
        team2: "Philadelphia Eagles",
        startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        isLive: false,
        score1: 0,
        score2: 0,
        status: "scheduled"
      },
      {
        sportId: 2, // Basketball
        team1: "Los Angeles Lakers",
        team2: "Boston Celtics",
        startTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        isLive: true,
        score1: 89,
        score2: 92,
        status: "live"
      },
      {
        sportId: 3, // Soccer
        team1: "Arsenal",
        team2: "Chelsea",
        startTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        isLive: false,
        score1: 0,
        score2: 0,
        status: "scheduled"
      },
      {
        sportId: 3, // Soccer
        team1: "Liverpool",
        team2: "Manchester City",
        startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        isLive: false,
        score1: 0,
        score2: 0,
        status: "scheduled"
      }
    ];

    const createdMatches = [];
    for (const match of matches) {
      try {
        const created = await storage.createMatch(match);
        createdMatches.push(created);
        console.log(`Created match: ${match.team1} vs ${match.team2}`);
      } catch (error) {
        console.log(`Match ${match.team1} vs ${match.team2} creation failed, skipping...`);
      }
    }

    // Create odds for matches
    const oddsData = [
      // Chiefs vs Bills
      { matchId: 1, market: "Moneyline", selection: "Kansas City Chiefs", odds: "1.85" },
      { matchId: 1, market: "Moneyline", selection: "Buffalo Bills", odds: "2.10" },
      { matchId: 1, market: "Point Spread", selection: "Kansas City Chiefs -3.5", odds: "1.90" },
      { matchId: 1, market: "Point Spread", selection: "Buffalo Bills +3.5", odds: "1.90" },
      { matchId: 1, market: "Total Points", selection: "Over 47.5", odds: "1.95" },
      { matchId: 1, market: "Total Points", selection: "Under 47.5", odds: "1.85" },

      // Cowboys vs Eagles
      { matchId: 2, market: "Moneyline", selection: "Dallas Cowboys", odds: "2.25" },
      { matchId: 2, market: "Moneyline", selection: "Philadelphia Eagles", odds: "1.70" },
      { matchId: 2, market: "Point Spread", selection: "Dallas Cowboys +4.5", odds: "1.90" },
      { matchId: 2, market: "Point Spread", selection: "Philadelphia Eagles -4.5", odds: "1.90" },

      // Lakers vs Celtics (Live)
      { matchId: 3, market: "Moneyline", selection: "Los Angeles Lakers", odds: "2.10" },
      { matchId: 3, market: "Moneyline", selection: "Boston Celtics", odds: "1.80" },
      { matchId: 3, market: "Point Spread", selection: "Los Angeles Lakers +2.5", odds: "1.85" },
      { matchId: 3, market: "Point Spread", selection: "Boston Celtics -2.5", odds: "1.95" },

      // Arsenal vs Chelsea
      { matchId: 4, market: "Match Result", selection: "Arsenal Win", odds: "2.10" },
      { matchId: 4, market: "Match Result", selection: "Draw", odds: "3.40" },
      { matchId: 4, market: "Match Result", selection: "Chelsea Win", odds: "3.75" },
      { matchId: 4, market: "Both Teams Score", selection: "Yes", odds: "1.72" },
      { matchId: 4, market: "Both Teams Score", selection: "No", odds: "2.20" },
      { matchId: 4, market: "Total Goals", selection: "Over 2.5", odds: "1.95" },
      { matchId: 4, market: "Total Goals", selection: "Under 2.5", odds: "1.85" },

      // Liverpool vs Man City
      { matchId: 5, market: "Match Result", selection: "Liverpool Win", odds: "2.80" },
      { matchId: 5, market: "Match Result", selection: "Draw", odds: "3.20" },
      { matchId: 5, market: "Match Result", selection: "Manchester City Win", odds: "2.50" },
      { matchId: 5, market: "Both Teams Score", selection: "Yes", odds: "1.60" },
      { matchId: 5, market: "Both Teams Score", selection: "No", odds: "2.40" },
    ];

    for (const odds of oddsData) {
      try {
        await storage.createOdds(odds);
        console.log(`Created odds: ${odds.selection} at ${odds.odds}`);
      } catch (error) {
        console.log(`Odds creation failed for ${odds.selection}, skipping...`);
      }
    }

    console.log("Database seeding completed successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
}