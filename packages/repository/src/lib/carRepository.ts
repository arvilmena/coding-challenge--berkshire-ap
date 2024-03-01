import { db, vehicle } from '@mycodingchallenge/db';
import { and, eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { VehicleIdType } from './vehicleRepository';

export const insertCarSchema = createInsertSchema(vehicle, {
  id: z.never(),
  vehicleType: undefined,
});

export class CarRepository {
  async findById(id: VehicleIdType) {
    return await db
      .select()
      .from(vehicle)
      .where(and(eq(vehicle.vehicleType, 'car'), eq(vehicle.id, id)));
  }
  async insert(data: Omit<z.infer<typeof insertCarSchema>, 'vehicleType'>) {
    return await db
      .insert(vehicle)
      .values({ ...data, vehicleType: 'car' })
      .returning();
  }
}
