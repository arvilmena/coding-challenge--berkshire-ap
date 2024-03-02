import { db, vehicle } from '@mycodingchallenge/db';
import { asc, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { vehicleSelectSchema } from './vehicleRepository';

export const insertMotorcycleSchema = createInsertSchema(vehicle, {
  id: z.never(),
  vehicleType: undefined,
});

export const motorcycleSelectSchema = vehicleSelectSchema.extend({
  vehicleType: z.literal('motorcycle'),
  model: z.string(),
  brand: z.string(),
});

export type Motorcycle = z.infer<typeof motorcycleSelectSchema>;

export class MotorcycleRepository {
  async getAll(): Promise<Motorcycle[]> {
    const r = await db
      .select()
      .from(vehicle)
      .where(eq(vehicle.vehicleType, 'motorcycle'))
      .orderBy(asc(vehicle.id));
    return motorcycleSelectSchema.array().parse(r);
  }

  async insert(
    data: Omit<z.infer<typeof insertMotorcycleSchema>, 'vehicleType'>
  ) {
    return await db
      .insert(vehicle)
      .values({ ...data, vehicleType: 'motorcycle' });
  }
}
