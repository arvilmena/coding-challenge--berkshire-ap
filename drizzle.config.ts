import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { DrizzleConfig } from './packages/db/src/drizzle/db.ts';

export default {
  schema: './packages/db/src/drizzle/schema.ts',
  out: './packages/db/src/drizzle/migrations',
  driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: DrizzleConfig,
  verbose: true,
  strict: true,
} satisfies Config;
