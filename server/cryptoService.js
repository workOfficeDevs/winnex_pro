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
exports.cryptoService = exports.CryptoService = void 0;
var axios_1 = require("axios");
var crypto_1 = require("crypto");
var CryptoService = /** @class */ (function () {
    function CryptoService() {
        this.priceCache = {};
        this.PRICE_CACHE_DURATION = 60000; // 1 minute
        // API configurations
        this.binanceApi = {
            key: '1600553b-7593-4278-9fa1-09124c199955',
            secret: 'T53J/Htmqp6h3mUh7wjohlk4TQjuOc1x5WK6hY17q7+WX4EuQvxbsMqx7bEKRM+msMWMhDas0sr3vUpocdFLaQ==',
            baseUrl: 'https://api.binance.com/api/v3'
        };
        this.coinbaseApi = {
            key: '1600553b-7593-4278-9fa1-09124c199955',
            secret: 'T53J/Htmqp6h3mUh7wjohlk4TQjuOc1x5WK6hY17q7+WX4EuQvxbsMqx7bEKRM+msMWMhDas0sr3vUpocdFLaQ==',
            baseUrl: 'https://api.coinbase.com/v2'
        };
        this.coinGeckoApi = {
            baseUrl: 'https://api.coingecko.com/api/v3'
        };
        this.coinApiKey = '0c64d1c0-be6c-4f85-b03c-87cab720c31e';
        this.infuraProjectId = '36af9b9545a84b478811d155d3b6601b';
    }
    // Generate unique deposit addresses for users
    CryptoService.prototype.generateDepositAddress = function (userId, currency) {
        var hash = crypto_1.default.createHash('sha256').update("".concat(userId, "_").concat(currency, "_").concat(Date.now())).digest('hex');
        switch (currency.toLowerCase()) {
            case 'btc':
                return "bc1q".concat(hash.substring(0, 40));
            case 'eth':
            case 'usdt':
                return "0x".concat(hash.substring(0, 40));
            case 'ltc':
                return "ltc1q".concat(hash.substring(0, 40));
            default:
                return "addr_".concat(hash.substring(0, 34));
        }
    };
    // Get real-time cryptocurrency prices
    CryptoService.prototype.getCryptoPrices = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get('https://api.coingecko.com/api/v3/simple/price', {
                                params: {
                                    ids: 'bitcoin,ethereum,tether,litecoin,dogecoin',
                                    vs_currencies: 'usd'
                                },
                                timeout: 10000
                            })];
                    case 1:
                        response = _f.sent();
                        return [2 /*return*/, {
                                BTC: ((_a = response.data.bitcoin) === null || _a === void 0 ? void 0 : _a.usd) || 44000,
                                ETH: ((_b = response.data.ethereum) === null || _b === void 0 ? void 0 : _b.usd) || 2600,
                                USDT: ((_c = response.data.tether) === null || _c === void 0 ? void 0 : _c.usd) || 1,
                                LTC: ((_d = response.data.litecoin) === null || _d === void 0 ? void 0 : _d.usd) || 90,
                                DOGE: ((_e = response.data.dogecoin) === null || _e === void 0 ? void 0 : _e.usd) || 0.08
                            }];
                    case 2:
                        error_1 = _f.sent();
                        console.log('Using fallback crypto prices due to API unavailability');
                        return [2 /*return*/, {
                                BTC: 44000,
                                ETH: 2600,
                                USDT: 1,
                                LTC: 90,
                                DOGE: 0.08
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get cached or fetch new prices
    CryptoService.prototype.getPrice = function (currency) {
        return __awaiter(this, void 0, void 0, function () {
            var now, cached, prices, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Date.now();
                        cached = this.priceCache[currency];
                        if (cached && (now - cached.timestamp) < this.PRICE_CACHE_DURATION) {
                            return [2 /*return*/, cached.price];
                        }
                        return [4 /*yield*/, this.getCryptoPrices()];
                    case 1:
                        prices = _a.sent();
                        price = prices[currency.toUpperCase()] || 0;
                        this.priceCache[currency] = { price: price, timestamp: now };
                        return [2 /*return*/, price];
                }
            });
        });
    };
    // Calculate USD value
    CryptoService.prototype.calculateUsdValue = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPrice(currency)];
                    case 1:
                        price = _a.sent();
                        return [2 /*return*/, amount * price];
                }
            });
        });
    };
    // Validate cryptocurrency address format
    CryptoService.prototype.validateAddress = function (address, currency) {
        var patterns = {
            BTC: /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,62}$/,
            ETH: /^0x[a-fA-F0-9]{40}$/,
            USDT: /^0x[a-fA-F0-9]{40}$/,
            LTC: /^(ltc1|[LM3])[a-zA-HJ-NP-Z0-9]{25,62}$/,
            DOGE: /^D[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}$/
        };
        var pattern = patterns[currency.toUpperCase()];
        return pattern ? pattern.test(address) : false;
    };
    // Simulate blockchain transaction verification
    CryptoService.prototype.verifyTransaction = function (txHash, currency) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // In production, this would call actual blockchain APIs
                // For now, simulate verification
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve({
                                confirmed: Math.random() > 0.1, // 90% success rate
                                amount: Math.random() * 10,
                                toAddress: 'verified_address'
                            });
                        }, 2000);
                    })];
            });
        });
    };
    // Process deposit transaction
    CryptoService.prototype.processDeposit = function (userId, txHash, currency, expectedAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var verification, usdValue, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verifyTransaction(txHash, currency)];
                    case 1:
                        verification = _a.sent();
                        if (!verification.confirmed) {
                            throw new Error('Transaction not confirmed on blockchain');
                        }
                        return [4 /*yield*/, this.calculateUsdValue(verification.amount, currency)];
                    case 2:
                        usdValue = _a.sent();
                        transaction = {
                            id: crypto_1.default.randomUUID(),
                            userId: userId,
                            type: 'deposit',
                            currency: currency.toUpperCase(),
                            amount: verification.amount,
                            usdValue: usdValue,
                            status: 'confirmed',
                            txHash: txHash,
                            address: expectedAddress,
                            timestamp: new Date().toISOString()
                        };
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    // Process withdrawal transaction
    CryptoService.prototype.processWithdrawal = function (userId, amount, currency, toAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var usdValue, txHash, transaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.validateAddress(toAddress, currency)) {
                            throw new Error('Invalid withdrawal address');
                        }
                        return [4 /*yield*/, this.calculateUsdValue(amount, currency)];
                    case 1:
                        usdValue = _a.sent();
                        txHash = crypto_1.default.createHash('sha256')
                            .update("".concat(userId, "_").concat(amount, "_").concat(currency, "_").concat(Date.now()))
                            .digest('hex');
                        transaction = {
                            id: crypto_1.default.randomUUID(),
                            userId: userId,
                            type: 'withdrawal',
                            currency: currency.toUpperCase(),
                            amount: -amount,
                            usdValue: -usdValue,
                            status: 'pending',
                            txHash: txHash,
                            address: toAddress,
                            timestamp: new Date().toISOString()
                        };
                        // In production, this would broadcast to blockchain
                        setTimeout(function () {
                            transaction.status = 'confirmed';
                        }, 30000); // Simulate 30 second confirmation
                        return [2 /*return*/, transaction];
                }
            });
        });
    };
    // Get user crypto balances
    CryptoService.prototype.getUserBalances = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var currencies, balances, _i, currencies_1, currency, balance, usdValue, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currencies = ['BTC', 'ETH', 'USDT', 'LTC'];
                        balances = [];
                        _i = 0, currencies_1 = currencies;
                        _a.label = 1;
                    case 1:
                        if (!(_i < currencies_1.length)) return [3 /*break*/, 4];
                        currency = currencies_1[_i];
                        balance = Math.random() * 10;
                        return [4 /*yield*/, this.calculateUsdValue(balance, currency)];
                    case 2:
                        usdValue = _a.sent();
                        address = this.generateDepositAddress(userId, currency);
                        balances.push({
                            currency: currency,
                            balance: balance,
                            usdValue: usdValue,
                            address: address
                        });
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, balances];
                }
            });
        });
    };
    // Convert crypto amount to betting credits
    CryptoService.prototype.convertToCredits = function (amount, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var usdValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.calculateUsdValue(amount, currency)];
                    case 1:
                        usdValue = _a.sent();
                        return [2 /*return*/, usdValue]; // 1 USD = 1 betting credit
                }
            });
        });
    };
    // Convert betting credits to crypto
    CryptoService.prototype.convertFromCredits = function (credits, currency) {
        return __awaiter(this, void 0, void 0, function () {
            var price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getPrice(currency)];
                    case 1:
                        price = _a.sent();
                        return [2 /*return*/, credits / price];
                }
            });
        });
    };
    return CryptoService;
}());
exports.CryptoService = CryptoService;
exports.cryptoService = new CryptoService();
