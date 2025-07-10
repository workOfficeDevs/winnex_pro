import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";
import * as crmSchema from "@shared/crmSchema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use standard PostgreSQL pool for local development
export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  // Add some connection settings for better reliability
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema: { ...schema, ...crmSchema } });