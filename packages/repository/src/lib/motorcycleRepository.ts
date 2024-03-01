import { db, vehicle } from '@mycodingchallenge/db';
import { and, eq } from 'drizzle-orm';
import { VehicleIdType } from './vehicleRepository';

export class MotorcycleRepository {
  async findById(id: VehicleIdType) {
    return await db
      .select()
      .from(vehicle)
      .where(and(eq(vehicle.vehicleType, 'motorcycle'), eq(vehicle.id, id)));
  }
}
