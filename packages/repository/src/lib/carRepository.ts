import { db, vehicle } from '@mycodingchallenge/db';
import { asc, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { vehicleSelectSchema } from './vehicleRepository';

export const insertCarSchema = createInsertSchema(vehicle, {
  id: z.never(),
  vehicleType: undefined,
});

export const carSelectSchema = vehicleSelectSchema.extend({
  vehicleType: z.literal('car'),
  model: z.string(),
  brand: z.string(),
});

export type Car = z.infer<typeof carSelectSchema>;

export class CarRepository {
  async getAll(): Promise<Car[]> {
    const r = await db
      .select()
      .from(vehicle)
      .where(eq(vehicle.vehicleType, 'car'))
      .orderBy(asc(vehicle.id));
    return carSelectSchema.array().parse(r);
  }

  async insert(data: Omit<z.infer<typeof insertCarSchema>, 'vehicleType'>) {
    return await db.insert(vehicle).values({ ...data, vehicleType: 'car' });
  }
}
