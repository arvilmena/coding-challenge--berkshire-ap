import { db, vehicle } from '@mycodingchallenge/db';
import { eq } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const insertVehicleSchema = createInsertSchema(vehicle, {
  id: z.never(),
});
type VehicleInsertType = z.infer<typeof insertVehicleSchema>;
export type VehicleType = VehicleInsertType['vehicleType'];
export const vehicleIdSchema = z.number().nonnegative();
export type VehicleIdType = z.infer<typeof vehicleIdSchema>;

export const selectVehicleSchema = createSelectSchema(vehicle);
export type SelectVehicle = z.infer<typeof selectVehicleSchema>;

export class VehicleRepository {
  async insert(data: VehicleInsertType) {
    const d = await db.insert(vehicle).values(data).returning();
    return d[0];
  }

  async findAll() {
    return await db.select().from(vehicle);
  }

  async deleteById(id: VehicleIdType) {
    const d = await db.delete(vehicle).where(eq(vehicle.id, id)).returning();
    return d[0];
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
    const d = await db
      .update(vehicle)
      .set(data)
      .where(eq(vehicle.id, id))
      .returning();
    return d[0];
  }
}
