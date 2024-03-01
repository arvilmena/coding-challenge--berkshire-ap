import { index, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

const VEHICLE_TYPES = ['car', 'motorcycle'] as const;
export const vehicleTypes = pgEnum('vehicle_types', VEHICLE_TYPES);

export const vehicle = pgTable(
  'vehicle',
  {
    id: serial('id').primaryKey(),
    ownerName: text('owner_name').notNull(),
    vehicleType: vehicleTypes('vehicle_type').notNull(),
    model: text('model').notNull(),
    brand: text('brand').notNull(),
  },
  (table) => {
    return {
      vehicleType: index('vehicle_type_idx').on(table.vehicleType),
    };
  }
);
