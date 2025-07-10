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
exports.seedDatabase = seedDatabase;
var storage_1 = require("./storage");
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var sports, createdSports, _i, sports_1, sport, created, error_1, matches, createdMatches, _a, matches_1, match, created, error_2, oddsData, _b, oddsData_1, odds, error_3, error_4;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 19, , 20]);
                    console.log("Seeding database with initial data...");
                    sports = [
                        { name: "Football", slug: "football", icon: "🏈", isActive: true },
                        { name: "Basketball", slug: "basketball", icon: "🏀", isActive: true },
                        { name: "Soccer", slug: "soccer", icon: "⚽", isActive: true },
                        { name: "Tennis", slug: "tennis", icon: "🎾", isActive: true },
                        { name: "Baseball", slug: "baseball", icon: "⚾", isActive: true }
                    ];
                    createdSports = [];
                    _i = 0, sports_1 = sports;
                    _c.label = 1;
                case 1:
                    if (!(_i < sports_1.length)) return [3 /*break*/, 6];
                    sport = sports_1[_i];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, storage_1.storage.createSport(sport)];
                case 3:
                    created = _c.sent();
                    createdSports.push(created);
                    console.log("Created sport: ".concat(sport.name));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.log("Sport ".concat(sport.name, " already exists, skipping..."));
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    matches = [
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
                    createdMatches = [];
                    _a = 0, matches_1 = matches;
                    _c.label = 7;
                case 7:
                    if (!(_a < matches_1.length)) return [3 /*break*/, 12];
                    match = matches_1[_a];
                    _c.label = 8;
                case 8:
                    _c.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, storage_1.storage.createMatch(match)];
                case 9:
                    created = _c.sent();
                    createdMatches.push(created);
                    console.log("Created match: ".concat(match.team1, " vs ").concat(match.team2));
                    return [3 /*break*/, 11];
                case 10:
                    error_2 = _c.sent();
                    console.log("Match ".concat(match.team1, " vs ").concat(match.team2, " creation failed, skipping..."));
                    return [3 /*break*/, 11];
                case 11:
                    _a++;
                    return [3 /*break*/, 7];
                case 12:
                    oddsData = [
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
                    _b = 0, oddsData_1 = oddsData;
                    _c.label = 13;
                case 13:
                    if (!(_b < oddsData_1.length)) return [3 /*break*/, 18];
                    odds = oddsData_1[_b];
                    _c.label = 14;
                case 14:
                    _c.trys.push([14, 16, , 17]);
                    return [4 /*yield*/, storage_1.storage.createOdds(odds)];
                case 15:
                    _c.sent();
                    console.log("Created odds: ".concat(odds.selection, " at ").concat(odds.odds));
                    return [3 /*break*/, 17];
                case 16:
                    error_3 = _c.sent();
                    console.log("Odds creation failed for ".concat(odds.selection, ", skipping..."));
                    return [3 /*break*/, 17];
                case 17:
                    _b++;
                    return [3 /*break*/, 13];
                case 18:
                    console.log("Database seeding completed successfully!");
                    return [2 /*return*/, true];
                case 19:
                    error_4 = _c.sent();
                    console.error("Error seeding database:", error_4);
                    return [2 /*return*/, false];
                case 20: return [2 /*return*/];
            }
        });
    });
}
