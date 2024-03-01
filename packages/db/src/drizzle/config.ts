import 'dotenv/config';
import { z } from 'zod';

const configSchema = z.object({
  APP_ROOT_DIR_ABSPATH: z.string().min(1),
});

const config = {
  APP_ROOT_DIR_ABSPATH: process.env['APP_ROOT_DIR_ABSPATH'],
};

const parsedConfig = configSchema.safeParse(config);

if (!parsedConfig.success) {
  throw new Error(JSON.stringify(parsedConfig.error, null, 2));
}

export const DbConfig = {
  ...parsedConfig.data,
};
