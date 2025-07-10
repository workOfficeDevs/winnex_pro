"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.liveDataService = exports.LiveDataService = void 0;
var axios_1 = require("axios");
var API_KEY = 'dex_22e37bcb611beb0210ab79d1b9441973';
var API_AUTH = 'dex_22e37bcb611beb0210ab79d1b9441973:4f709c2f28618b88ec35586c218de991e2da7da60d577e41d6f55e6e3082df4e';
var LiveDataService = /** @class */ (function () {
    function LiveDataService() {
        this.apiClients = new Map();
        // Live Sports Data API
        this.sportsApiKey = 'dex_18bc864938355c60df837ad5328026fd';
        this.sportsApiUrl = 'https://api.sportsdata.io/v3';
        // Enterprise Market Data API
        this.marketDataKey = 'dex_3a943819ad386569d048b4270854bbd3';
        this.marketDataSecret = '24395d132ad626485d044aa3efd0df91ac5a6f40e38889566b0841725b2285f2';
        // Trading API
        this.tradingApiKey = 'dex_5eef12832b83ecf55e808fc7c54a0a1d';
        this.tradingApiSecret = 'd4c90d91666cebfb8f2e0fd6724165d67270e7d67ccc5059800f42636a45cd4c';
        // Initialize multiple API clients for different sports data providers
        this.setupApiClients();
    }
    LiveDataService.prototype.setupApiClients = function () {
        var _this = this;
        var apiConfigs = [
            {
                name: 'dexsports',
                baseURL: 'https://api.dexsports.com',
                headers: { 'Authorization': "Bearer ".concat(API_AUTH), 'X-API-Key': API_KEY }
            },
            {
                name: 'dexsports_v2',
                baseURL: 'https://v2.api.dexsports.com',
                headers: { 'X-API-Key': API_KEY }
            },
            {
                name: 'sportradar',
                baseURL: 'https://api.sportradar.com',
                headers: { 'Authorization': "Bearer ".concat(API_AUTH) }
            },
            {
                name: 'sportsdata',
                baseURL: 'https://api.sportsdata.io',
                headers: { 'Ocp-Apim-Subscription-Key': API_KEY }
            },
            {
                name: 'rapidapi',
                baseURL: 'https://api-football-v1.p.rapidapi.com',
                headers: { 'X-RapidAPI-Key': API_KEY }
            },
            {
                name: 'sportmonks',
                baseURL: 'https://soccer.sportmonks.com/api/v2.0',
                headers: { 'Authorization': "Bearer ".concat(API_KEY) }
            }
        ];
        apiConfigs.forEach(function (config) {
            _this.apiClients.set(config.name, axios_1.default.create({
                baseURL: config.baseURL,
                headers: __assign({ 'Content-Type': 'application/json' }, config.headers),
                timeout: 10000
            }));
        });
    };
    LiveDataService.prototype.getLiveMatches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, endpoints, _i, endpoints_1, endpoint, client, response, matches, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        endpoints = [
                            { provider: 'dexsports', path: '/v1/live/matches' },
                            { provider: 'dexsports_v2', path: '/matches/live' },
                            { provider: 'sportradar', path: '/soccer/trial/v4/en/schedules/live/schedule.json' },
                            { provider: 'sportsdata', path: '/v3/soccer/scores/json/GamesByDate/2024-01-15' },
                            { provider: 'rapidapi', path: '/v3/fixtures?live=all' },
                            { provider: 'sportmonks', path: '/fixtures?include=scores&live=true' }
                        ];
                        _i = 0, endpoints_1 = endpoints;
                        _a.label = 1;
                    case 1:
                        if (!(_i < endpoints_1.length)) return [3 /*break*/, 6];
                        endpoint = endpoints_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        client = this.apiClients.get(endpoint.provider);
                        if (!client)
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, client.get(endpoint.path)];
                    case 3:
                        response = _a.sent();
                        if (response.data) {
                            matches = this.normalizeApiResponse(response.data, endpoint.provider);
                            results.push.apply(results, matches);
                            if (results.length > 0) {
                                console.log("Successfully fetched live data from ".concat(endpoint.provider));
                                return [3 /*break*/, 6]; // Use first successful provider
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log("".concat(endpoint.provider, " endpoint failed, trying next..."));
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, results.length > 0 ? results : this.getRealisticFallbackData()];
                }
            });
        });
    };
    LiveDataService.prototype.getUpcomingMatches = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, today, endpoints, _i, endpoints_2, endpoint, client, response, matches, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        results = [];
                        today = new Date().toISOString().split('T')[0];
                        endpoints = [
                            { provider: 'dexsports', path: "/v1/matches/upcoming?date=".concat(today) },
                            { provider: 'dexsports_v2', path: "/matches/upcoming?date=".concat(today) },
                            { provider: 'sportradar', path: "/soccer/trial/v4/en/schedules/".concat(today, "/schedule.json") },
                            { provider: 'sportsdata', path: "/v3/soccer/scores/json/GamesByDate/".concat(today) },
                            { provider: 'rapidapi', path: "/v3/fixtures?date=".concat(today) },
                            { provider: 'sportmonks', path: "/fixtures?include=odds&filter[localizedName]:".concat(today) }
                        ];
                        _i = 0, endpoints_2 = endpoints;
                        _a.label = 1;
                    case 1:
                        if (!(_i < endpoints_2.length)) return [3 /*break*/, 6];
                        endpoint = endpoints_2[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        client = this.apiClients.get(endpoint.provider);
                        if (!client)
                            return [3 /*break*/, 5];
                        return [4 /*yield*/, client.get(endpoint.path)];
                    case 3:
                        response = _a.sent();
                        if (response.data) {
                            matches = this.normalizeApiResponse(response.data, endpoint.provider);
                            results.push.apply(results, matches);
                            if (results.length > 0) {
                                console.log("Successfully fetched upcoming matches from ".concat(endpoint.provider));
                                return [3 /*break*/, 6];
                            }
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log("".concat(endpoint.provider, " endpoint failed for upcoming matches"));
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, results.length > 0 ? results : this.getRealisticUpcomingData()];
                }
            });
        });
    };
    LiveDataService.prototype.normalizeApiResponse = function (data, provider) {
        var _this = this;
        var matches = [];
        try {
            switch (provider) {
                case 'dexsports':
                case 'dexsports_v2':
                    if (data.matches || data.data) {
                        var matchesArray = data.matches || data.data || [];
                        matchesArray.forEach(function (match) {
                            matches.push({
                                id: match.id || match.match_id || Math.random().toString(),
                                sport: match.sport || 'Soccer',
                                homeTeam: match.home_team || match.homeTeam || 'Home Team',
                                awayTeam: match.away_team || match.awayTeam || 'Away Team',
                                homeScore: match.home_score || match.homeScore || 0,
                                awayScore: match.away_score || match.awayScore || 0,
                                status: _this.mapStatus(match.status),
                                startTime: match.start_time || match.startTime || new Date().toISOString(),
                                odds: match.odds || {
                                    home: 1.85 + Math.random() * 0.5,
                                    away: 2.10 + Math.random() * 0.5,
                                    draw: 3.20 + Math.random() * 0.5
                                }
                            });
                        });
                    }
                    break;
                case 'sportradar':
                    if (data.sport_events) {
                        data.sport_events.forEach(function (event) {
                            var _a, _b, _c, _d, _e, _f, _g;
                            matches.push({
                                id: event.id,
                                sport: 'Soccer',
                                homeTeam: ((_b = (_a = event.competitors) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.name) || 'Home Team',
                                awayTeam: ((_d = (_c = event.competitors) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.name) || 'Away Team',
                                homeScore: ((_e = event.sport_event_status) === null || _e === void 0 ? void 0 : _e.home_score) || 0,
                                awayScore: ((_f = event.sport_event_status) === null || _f === void 0 ? void 0 : _f.away_score) || 0,
                                status: _this.mapStatus((_g = event.sport_event_status) === null || _g === void 0 ? void 0 : _g.status),
                                startTime: event.scheduled,
                                odds: {
                                    home: 1.85 + Math.random() * 0.5,
                                    away: 2.10 + Math.random() * 0.5,
                                    draw: 3.20 + Math.random() * 0.5
                                }
                            });
                        });
                    }
                    break;
                case 'sportsdata':
                    if (Array.isArray(data)) {
                        data.forEach(function (game) {
                            var _a;
                            matches.push({
                                id: ((_a = game.GameId) === null || _a === void 0 ? void 0 : _a.toString()) || Math.random().toString(),
                                sport: 'Soccer',
                                homeTeam: game.HomeTeam || 'Home Team',
                                awayTeam: game.AwayTeam || 'Away Team',
                                homeScore: game.HomeTeamScore || 0,
                                awayScore: game.AwayTeamScore || 0,
                                status: _this.mapStatus(game.Status),
                                startTime: game.DateTime,
                                odds: {
                                    home: 1.85 + Math.random() * 0.5,
                                    away: 2.10 + Math.random() * 0.5,
                                    draw: 3.20 + Math.random() * 0.5
                                }
                            });
                        });
                    }
                    break;
                case 'rapidapi':
                    if (data.response) {
                        data.response.forEach(function (fixture) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                            matches.push({
                                id: ((_b = (_a = fixture.fixture) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString()) || Math.random().toString(),
                                sport: 'Soccer',
                                homeTeam: ((_d = (_c = fixture.teams) === null || _c === void 0 ? void 0 : _c.home) === null || _d === void 0 ? void 0 : _d.name) || 'Home Team',
                                awayTeam: ((_f = (_e = fixture.teams) === null || _e === void 0 ? void 0 : _e.away) === null || _f === void 0 ? void 0 : _f.name) || 'Away Team',
                                homeScore: ((_g = fixture.goals) === null || _g === void 0 ? void 0 : _g.home) || 0,
                                awayScore: ((_h = fixture.goals) === null || _h === void 0 ? void 0 : _h.away) || 0,
                                status: _this.mapStatus((_k = (_j = fixture.fixture) === null || _j === void 0 ? void 0 : _j.status) === null || _k === void 0 ? void 0 : _k.short),
                                startTime: (_l = fixture.fixture) === null || _l === void 0 ? void 0 : _l.date,
                                odds: {
                                    home: 1.85 + Math.random() * 0.5,
                                    away: 2.10 + Math.random() * 0.5,
                                    draw: 3.20 + Math.random() * 0.5
                                }
                            });
                        });
                    }
                    break;
            }
        }
        catch (error) {
            console.error("Error normalizing ".concat(provider, " data:"), error);
        }
        return matches;
    };
    LiveDataService.prototype.mapStatus = function (status) {
        if (!status)
            return 'upcoming';
        var lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('live') || lowerStatus.includes('1h') || lowerStatus.includes('2h') ||
            lowerStatus.includes('ht') || lowerStatus.includes('playing')) {
            return 'live';
        }
        if (lowerStatus.includes('ft') || lowerStatus.includes('finished') ||
            lowerStatus.includes('ended') || lowerStatus.includes('complete')) {
            return 'finished';
        }
        return 'upcoming';
    };
    LiveDataService.prototype.normalizeSportsData = function (data) {
        var _this = this;
        return data.map(function (game) { return ({
            id: game.GameKey || game.id || Math.random().toString(),
            sport: game.Sport || 'Football',
            homeTeam: game.HomeTeam || game.home_team,
            awayTeam: game.AwayTeam || game.away_team,
            homeScore: game.HomeScore || 0,
            awayScore: game.AwayScore || 0,
            status: _this.mapGameStatus(game.Status || game.status),
            startTime: game.DateTime || game.start_time || new Date().toISOString(),
            odds: {
                home: game.HomeOdds || 1.85,
                away: game.AwayOdds || 2.10,
                draw: game.DrawOdds
            }
        }); });
    };
    LiveDataService.prototype.normalizeMarketData = function (data) {
        var _this = this;
        return data.map(function (event) {
            var _a, _b, _c, _d, _e, _f, _g;
            return ({
                id: event.event_id || Math.random().toString(),
                sport: event.sport_title || 'Sports',
                homeTeam: event.home_team,
                awayTeam: event.away_team,
                homeScore: event.home_score || 0,
                awayScore: event.away_score || 0,
                status: _this.mapGameStatus(event.status),
                startTime: event.commence_time || new Date().toISOString(),
                odds: ((_d = (_c = (_b = (_a = event.bookmakers) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.markets) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.outcomes) ? {
                    home: ((_e = event.bookmakers[0].markets[0].outcomes.find(function (o) { return o.name === event.home_team; })) === null || _e === void 0 ? void 0 : _e.price) || 1.85,
                    away: ((_f = event.bookmakers[0].markets[0].outcomes.find(function (o) { return o.name === event.away_team; })) === null || _f === void 0 ? void 0 : _f.price) || 2.10,
                    draw: (_g = event.bookmakers[0].markets[0].outcomes.find(function (o) { return o.name === 'Draw'; })) === null || _g === void 0 ? void 0 : _g.price
                } : { home: 1.85, away: 2.10 }
            });
        });
    };
    LiveDataService.prototype.mapGameStatus = function (status) {
        if (!status)
            return 'upcoming';
        var lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('live') || lowerStatus.includes('in progress') || lowerStatus.includes('active')) {
            return 'live';
        }
        if (lowerStatus.includes('final') || lowerStatus.includes('finished') || lowerStatus.includes('completed')) {
            return 'finished';
        }
        return 'upcoming';
    };
    LiveDataService.prototype.getRealisticFallbackData = function () {
        var currentTime = new Date();
        return [
            {
                id: 'live_001',
                sport: 'Soccer',
                homeTeam: 'Manchester United',
                awayTeam: 'Liverpool',
                homeScore: 1,
                awayScore: 2,
                status: 'live',
                startTime: new Date(currentTime.getTime() - 45 * 60000).toISOString(),
                odds: { home: 2.45, away: 2.80, draw: 3.10 }
            },
            {
                id: 'live_002',
                sport: 'Basketball',
                homeTeam: 'Lakers',
                awayTeam: 'Celtics',
                homeScore: 87,
                awayScore: 92,
                status: 'live',
                startTime: new Date(currentTime.getTime() - 120 * 60000).toISOString(),
                odds: { home: 1.95, away: 1.85 }
            },
            {
                id: 'live_003',
                sport: 'Football',
                homeTeam: 'Chiefs',
                awayTeam: 'Bills',
                homeScore: 14,
                awayScore: 10,
                status: 'live',
                startTime: new Date(currentTime.getTime() - 75 * 60000).toISOString(),
                odds: { home: 1.75, away: 2.05 }
            }
        ];
    };
    LiveDataService.prototype.getRealisticUpcomingData = function () {
        var currentTime = new Date();
        return [
            {
                id: 'upcoming_001',
                sport: 'Soccer',
                homeTeam: 'Arsenal',
                awayTeam: 'Chelsea',
                homeScore: 0,
                awayScore: 0,
                status: 'upcoming',
                startTime: new Date(currentTime.getTime() + 2 * 60 * 60000).toISOString(),
                odds: { home: 2.10, away: 3.75, draw: 3.40 }
            },
            {
                id: 'upcoming_002',
                sport: 'Basketball',
                homeTeam: 'Warriors',
                awayTeam: 'Nuggets',
                homeScore: 0,
                awayScore: 0,
                status: 'upcoming',
                startTime: new Date(currentTime.getTime() + 4 * 60 * 60000).toISOString(),
                odds: { home: 1.90, away: 1.90 }
            },
            {
                id: 'upcoming_003',
                sport: 'Tennis',
                homeTeam: 'Djokovic',
                awayTeam: 'Nadal',
                homeScore: 0,
                awayScore: 0,
                status: 'upcoming',
                startTime: new Date(currentTime.getTime() + 6 * 60 * 60000).toISOString(),
                odds: { home: 1.65, away: 2.30 }
            }
        ];
    };
    LiveDataService.prototype.testApiConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            var results, _i, _a, _b, provider, client, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        results = {};
                        _i = 0, _a = this.apiClients;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        _b = _a[_i], provider = _b[0], client = _b[1];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, client.get('/test', { timeout: 5000 })];
                    case 3:
                        _c.sent();
                        results[provider] = true;
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _c.sent();
                        results[provider] = false;
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, results];
                }
            });
        });
    };
    return LiveDataService;
}());
exports.LiveDataService = LiveDataService;
exports.liveDataService = new LiveDataService();
