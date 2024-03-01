import { migrate } from 'drizzle-orm/node-postgres/migrator';
import * as path from 'path';
import { DbConfig } from './config';
import { db } from './db';
const migrateDb = () => {
  const migrationsFolder = path.join(
    DbConfig.APP_ROOT_DIR_ABSPATH,
    'packages/db/src/drizzle/migrations'
  );

  return migrate(db, {
    migrationsFolder,
  })
    .then(() => {
      console.log('Migration successful');
      return;
    })
    .catch((error) => {
      throw error;
    });
};

migrateDb()
  .then(() => {
    console.log('All migrations completed');
    return;
  })
  .catch((error) => {
    console.error('Error during migrations:', error);
    return;
  });
