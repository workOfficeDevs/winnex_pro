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
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.pool = void 0;
var serverless_1 = require("@neondatabase/serverless");
var neon_serverless_1 = require("drizzle-orm/neon-serverless");
var ws_1 = require("ws");
var schema = require("@shared/schema");
var crmSchema = require("@shared/crmSchema");
serverless_1.neonConfig.webSocketConstructor = ws_1.default;
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}
exports.pool = new serverless_1.Pool({ connectionString: process.env.DATABASE_URL });
exports.db = (0, neon_serverless_1.drizzle)({ client: exports.pool, schema: __assign(__assign({}, schema), crmSchema) });
