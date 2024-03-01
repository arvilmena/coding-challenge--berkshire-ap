import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as pg from 'pg';
import { z } from 'zod';
import * as schema from './schema';

const { Pool } = pg;
const DrizzleConfigSchema = z.object({
  connectionString: z.string().min(1).url(),
});

export const DrizzleConfig = DrizzleConfigSchema.parse({
  connectionString: process.env['POSTGRES_DB_URL'],
});

export const drizzleDbClient = new Pool(DrizzleConfig);

export const db = drizzle(drizzleDbClient, { schema, logger: !1 });
