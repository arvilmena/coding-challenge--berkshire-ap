import { db, vehicle } from '@mycodingchallenge/db';
import { eq } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertVehicleSchema = createInsertSchema(vehicle, {
  id: z.never(),
});
type VehicleInsertType = z.infer<typeof insertVehicleSchema>;
export type VehicleType = VehicleInsertType['vehicleType'];
const vehicleIdSchema = z.number().nonnegative();
export type VehicleIdType = z.infer<typeof vehicleIdSchema>;

export class VehicleRepository {
  async insert(data: VehicleInsertType) {
    return await db.insert(vehicle).values(data).returning();
  }

  async findAll() {
    return await db.select().from(vehicle);
  }

  async deleteById(id: VehicleIdType) {
    return await db.delete(vehicle).where(eq(vehicle.id, id)).returning();
  }

  async findById(id: VehicleIdType) {
    const r = await db
      .select()
      .from(vehicle)
      .where(eq(vehicle.id, id))
      .limit(1);
    return r ? r[0] : undefined;
  }

  async updateById(
    id: VehicleIdType,
    data: z.infer<typeof insertVehicleSchema>
  ) {
    return await db
      .update(vehicle)
      .set(data)
      .where(eq(vehicle.id, id))
      .returning();
  }
}
