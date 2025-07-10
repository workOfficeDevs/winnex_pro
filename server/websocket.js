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
exports.setupWebSocket = setupWebSocket;
function setupWebSocket(io, storage) {
    var _this = this;
    io.on("connection", function (socket) {
        console.log("Client connected:", socket.id);
        socket.on("join-sport", function (sportId) {
            socket.join("sport-".concat(sportId));
        });
        socket.on("join-match", function (matchId) {
            socket.join("match-".concat(matchId));
        });
        socket.on("leave-sport", function (sportId) {
            socket.leave("sport-".concat(sportId));
        });
        socket.on("leave-match", function (matchId) {
            socket.leave("match-".concat(matchId));
        });
        socket.on("disconnect", function () {
            console.log("Client disconnected:", socket.id);
        });
    });
    // Simulate real-time odds updates
    setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
        var liveMatches, _i, liveMatches_1, match, odds, randomOdd, currentOdds, change, newOdds, scoreUpdate, newScore, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, storage.getMatches({ live: true })];
                case 1:
                    liveMatches = _a.sent();
                    _i = 0, liveMatches_1 = liveMatches;
                    _a.label = 2;
                case 2:
                    if (!(_i < liveMatches_1.length)) return [3 /*break*/, 8];
                    match = liveMatches_1[_i];
                    return [4 /*yield*/, storage.getMatchOdds(match.id)];
                case 3:
                    odds = _a.sent();
                    if (!(Math.random() < 0.05)) return [3 /*break*/, 5];
                    randomOdd = odds[Math.floor(Math.random() * odds.length)];
                    if (!randomOdd) return [3 /*break*/, 5];
                    currentOdds = parseFloat(randomOdd.odds);
                    change = (Math.random() - 0.5) * 0.2;
                    newOdds = Math.max(1.01, currentOdds + change);
                    return [4 /*yield*/, storage.updateOdds(randomOdd.id, newOdds.toFixed(2))];
                case 4:
                    _a.sent();
                    // Emit to all clients watching this match
                    io.to("match-".concat(match.id)).emit("odds-update", {
                        matchId: match.id,
                        oddsId: randomOdd.id,
                        market: randomOdd.market,
                        selection: randomOdd.selection,
                        odds: newOdds.toFixed(2)
                    });
                    _a.label = 5;
                case 5:
                    if (!(Math.random() < 0.01)) return [3 /*break*/, 7];
                    scoreUpdate = Math.random() > 0.5 ? "score1" : "score2";
                    newScore = (match[scoreUpdate] || 0) + 1;
                    return [4 /*yield*/, storage.updateMatchScore(match.id, scoreUpdate, newScore)];
                case 6:
                    _a.sent();
                    io.to("match-".concat(match.id)).emit("score-update", {
                        matchId: match.id,
                        score1: scoreUpdate === "score1" ? newScore : match.score1,
                        score2: scoreUpdate === "score2" ? newScore : match.score2
                    });
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.error("Error in real-time updates:", error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    }); }, 3000); // Update every 3 seconds
}
