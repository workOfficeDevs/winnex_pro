import axios from 'axios';

// Try different API base URLs based on the key format
const POSSIBLE_APIS = [
  'https://api.sportradar.com',
  'https://api.sportsdata.io',
  'https://api.rapidapi.com',
  'https://api.sportmonks.com',
  'https://api.football-data.org'
];

const API_KEY = 'dex_22e37bcb611beb0210ab79d1b9441973';
const API_AUTH = 'dex_22e37bcb611beb0210ab79d1b9441973:4f709c2f28618b88ec35586c218de991e2da7da60d577e41d6f55e6e3082df4e';

const oddsApiClient = axios.create({
  baseURL: ODDS_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

export interface LiveMatch {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'upcoming' | 'finished';
  startTime: string;
  currentPeriod?: string;
  timeRemaining?: string;
}

export interface OddsData {
  matchId: string;
  bookmaker: string;
  market: string;
  selection: string;
  odds: number;
  lastUpdated: string;
}

export class OddsApiService {
  
  async getUpcomingMatches(sport = 'upcoming'): Promise<LiveMatch[]> {
    try {
      // Get live odds which include upcoming matches
      const response = await oddsApiClient.get('/sports', {
        params: {
          apiKey: ODDS_API_KEY
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        const activeSports = response.data.filter((s: any) => s.active);
        const matches: LiveMatch[] = [];
        
        // Get odds for each active sport
        for (const sportData of activeSports.slice(0, 5)) { // Limit to 5 sports to manage API usage
          try {
            const oddsResponse = await oddsApiClient.get(`/sports/${sportData.key}/odds`, {
              params: {
                apiKey: ODDS_API_KEY,
                regions: 'us',
                markets: 'h2h,spreads,totals',
                oddsFormat: 'decimal'
              }
            });
            
            if (oddsResponse.data && Array.isArray(oddsResponse.data)) {
              const sportMatches = this.normalizeOddsApiData(oddsResponse.data, sportData.title);
              matches.push(...sportMatches);
            }
          } catch (sportError) {
            console.log(`Failed to fetch odds for ${sportData.key}`);
          }
        }
        
        return matches;
      }
      
      return [];
      
    } catch (error) {
      console.error('Error fetching matches from Odds API:', error);
      return [];
    }
  }

  async getLiveMatches(): Promise<LiveMatch[]> {
    try {
      const response = await oddsApiClient.get('/sports', {
        params: {
          apiKey: ODDS_API_KEY
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        const activeSports = response.data.filter((s: any) => s.active);
        const liveMatches: LiveMatch[] = [];
        
        for (const sportData of activeSports.slice(0, 3)) {
          try {
            const scoresResponse = await oddsApiClient.get(`/sports/${sportData.key}/scores`, {
              params: {
                apiKey: ODDS_API_KEY,
                daysFrom: 1
              }
            });
            
            if (scoresResponse.data && Array.isArray(scoresResponse.data)) {
              const matches = this.normalizeScoresData(scoresResponse.data, sportData.title)
                .filter(match => match.status === 'live');
              liveMatches.push(...matches);
            }
          } catch (sportError) {
            console.log(`Failed to fetch scores for ${sportData.key}`);
          }
        }
        
        return liveMatches;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching live matches from Odds API:', error);
      return [];
    }
  }

  async getMatchOdds(matchId: string): Promise<OddsData[]> {
    try {
      // For The Odds API, we need to get odds by sport and then filter by match
      const sportsResponse = await oddsApiClient.get('/sports', {
        params: {
          apiKey: ODDS_API_KEY
        }
      });
      
      if (sportsResponse.data && Array.isArray(sportsResponse.data)) {
        const activeSports = sportsResponse.data.filter((s: any) => s.active);
        
        for (const sport of activeSports) {
          try {
            const oddsResponse = await oddsApiClient.get(`/sports/${sport.key}/odds`, {
              params: {
                apiKey: ODDS_API_KEY,
                regions: 'us',
                markets: 'h2h,spreads,totals',
                oddsFormat: 'decimal'
              }
            });
            
            if (oddsResponse.data && Array.isArray(oddsResponse.data)) {
              const matchData = oddsResponse.data.find((game: any) => game.id === matchId);
              if (matchData) {
                return this.extractOddsFromGame(matchData);
              }
            }
          } catch (sportError) {
            continue;
          }
        }
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching match odds from Odds API:', error);
      return [];
    }
  }

  async getAllSports(): Promise<any[]> {
    try {
      const response = await oddsApiClient.get('/sports', {
        params: {
          apiKey: ODDS_API_KEY
        }
      });
      
      return response.data || [];
    } catch (error) {
      console.error('Error fetching sports from Odds API:', error);
      return [];
    }
  }

  async getArbitrageOpportunities(): Promise<any[]> {
    try {
      const opportunities: any[] = [];
      const sportsResponse = await this.getAllSports();
      const activeSports = sportsResponse.filter((s: any) => s.active).slice(0, 3);
      
      for (const sport of activeSports) {
        const oddsResponse = await oddsApiClient.get(`/sports/${sport.key}/odds`, {
          params: {
            apiKey: ODDS_API_KEY,
            regions: 'us',
            markets: 'h2h',
            oddsFormat: 'decimal'
          }
        });
        
        if (oddsResponse.data) {
          const arbOpps = this.calculateArbitrage(oddsResponse.data);
          opportunities.push(...arbOpps);
        }
      }
      
      return opportunities;
    } catch (error) {
      console.error('Error finding arbitrage opportunities:', error);
      return [];
    }
  }

  private normalizeOddsApiData(games: any[], sport: string): LiveMatch[] {
    return games.map((game: any) => ({
      id: game.id,
      sport: sport,
      league: sport,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      homeScore: 0,
      awayScore: 0,
      status: game.completed ? 'finished' : 'upcoming',
      startTime: game.commence_time,
      currentPeriod: undefined,
      timeRemaining: undefined
    }));
  }

  private normalizeScoresData(scores: any[], sport: string): LiveMatch[] {
    return scores.map((score: any) => ({
      id: score.id,
      sport: sport,
      league: sport,
      homeTeam: score.home_team,
      awayTeam: score.away_team,
      homeScore: score.scores ? score.scores[0]?.score || 0 : 0,
      awayScore: score.scores ? score.scores[1]?.score || 0 : 0,
      status: score.completed ? 'finished' : (score.scores ? 'live' : 'upcoming'),
      startTime: score.commence_time,
      currentPeriod: score.scores ? 'Live' : undefined,
      timeRemaining: undefined
    }));
  }

  private extractOddsFromGame(game: any): OddsData[] {
    const odds: OddsData[] = [];
    
    if (game.bookmakers) {
      game.bookmakers.forEach((bookmaker: any) => {
        if (bookmaker.markets) {
          bookmaker.markets.forEach((market: any) => {
            if (market.outcomes) {
              market.outcomes.forEach((outcome: any) => {
                odds.push({
                  matchId: game.id,
                  bookmaker: bookmaker.title,
                  market: market.key,
                  selection: outcome.name,
                  odds: outcome.price,
                  lastUpdated: bookmaker.last_update
                });
              });
            }
          });
        }
      });
    }
    
    return odds;
  }

  private calculateArbitrage(games: any[]): any[] {
    const opportunities: any[] = [];
    
    games.forEach((game: any) => {
      if (game.bookmakers && game.bookmakers.length >= 2) {
        const h2hMarkets = game.bookmakers
          .map((b: any) => b.markets?.find((m: any) => m.key === 'h2h'))
          .filter(Boolean);
          
        if (h2hMarkets.length >= 2) {
          const bestOdds = this.findBestOdds(h2hMarkets);
          const arbitrageValue = this.calculateArbitrageValue(bestOdds);
          
          if (arbitrageValue > 0) {
            opportunities.push({
              gameId: game.id,
              homeTeam: game.home_team,
              awayTeam: game.away_team,
              sport: game.sport_title,
              arbitrageValue,
              bestOdds,
              profitMargin: arbitrageValue * 100
            });
          }
        }
      }
    });
    
    return opportunities;
  }

  private findBestOdds(markets: any[]): any {
    const homeOdds = Math.max(...markets.flatMap(m => 
      m.outcomes?.filter((o: any) => o.name === markets[0].outcomes[0].name)
        .map((o: any) => o.price) || []
    ));
    
    const awayOdds = Math.max(...markets.flatMap(m => 
      m.outcomes?.filter((o: any) => o.name === markets[0].outcomes[1].name)
        .map((o: any) => o.price) || []
    ));
    
    return { homeOdds, awayOdds };
  }

  private calculateArbitrageValue(odds: any): number {
    const impliedProbSum = (1 / odds.homeOdds) + (1 / odds.awayOdds);
    return impliedProbSum < 1 ? (1 - impliedProbSum) : 0;
  }

  private normalizeOddsData(rawData: any[], matchId: string): OddsData[] {
    const odds: OddsData[] = [];
    
    rawData.forEach((oddsGroup: any) => {
      const bookmaker = oddsGroup.bookmaker || oddsGroup.site_key || 'Bookmaker';
      const markets = oddsGroup.markets || oddsGroup.outcomes || [oddsGroup];
      
      markets.forEach((market: any) => {
        const selections = market.outcomes || market.selections || [market];
        
        selections.forEach((selection: any) => {
          odds.push({
            matchId,
            bookmaker,
            market: market.key || market.market || 'moneyline',
            selection: selection.name || selection.selection || selection.outcome,
            odds: parseFloat(selection.price || selection.odds || selection.decimal || 2.0),
            lastUpdated: selection.last_update || new Date().toISOString()
          });
        });
      });
    });
    
    return odds;
  }

  private normalizeStatus(status: string): 'live' | 'upcoming' | 'finished' {
    if (!status) return 'upcoming';
    
    const lowerStatus = status.toLowerCase();
    
    if (lowerStatus.includes('live') || lowerStatus.includes('in_progress') || lowerStatus.includes('active')) {
      return 'live';
    }
    
    if (lowerStatus.includes('finished') || lowerStatus.includes('ended') || lowerStatus.includes('complete')) {
      return 'finished';
    }
    
    return 'upcoming';
  }

  private getFallbackMatches(): LiveMatch[] {
    // Enhanced fallback data that looks realistic
    return [
      {
        id: 'fb_001',
        sport: 'Football',
        league: 'NFL',
        homeTeam: 'Kansas City Chiefs',
        awayTeam: 'Buffalo Bills',
        homeScore: 14,
        awayScore: 10,
        status: 'live',
        startTime: new Date().toISOString(),
        currentPeriod: '2nd Quarter',
        timeRemaining: '08:23'
      },
      {
        id: 'bb_001',
        sport: 'Basketball',
        league: 'NBA',
        homeTeam: 'Los Angeles Lakers',
        awayTeam: 'Boston Celtics',
        homeScore: 87,
        awayScore: 92,
        status: 'live',
        startTime: new Date().toISOString(),
        currentPeriod: '4th Quarter',
        timeRemaining: '03:45'
      },
      {
        id: 'sc_001',
        sport: 'Soccer',
        league: 'Premier League',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: 1,
        awayScore: 1,
        status: 'live',
        startTime: new Date().toISOString(),
        currentPeriod: '2nd Half',
        timeRemaining: '67:30'
      }
    ];
  }

  private getFallbackOdds(matchId: string): OddsData[] {
    return [
      {
        matchId,
        bookmaker: 'Sportsbook',
        market: 'moneyline',
        selection: 'Home',
        odds: 1.85,
        lastUpdated: new Date().toISOString()
      },
      {
        matchId,
        bookmaker: 'Sportsbook',
        market: 'moneyline',
        selection: 'Away',
        odds: 2.10,
        lastUpdated: new Date().toISOString()
      }
    ];
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await oddsApiClient.get('/sports', {
        params: {
          apiKey: ODDS_API_KEY
        }
      });
      
      return response.status === 200 && Array.isArray(response.data);
    } catch (error) {
      console.error('Odds API connection test failed:', error);
      return false;
    }
  }
}

export const oddsApiService = new OddsApiService();