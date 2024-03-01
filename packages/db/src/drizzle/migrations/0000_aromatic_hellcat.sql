DO $$ BEGIN
 CREATE TYPE "vehicle_types" AS ENUM('car', 'motorcycle');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" serial PRIMARY KEY NOT NULL,
	"owner_name" text NOT NULL,
	"vehicle_type" "vehicle_types" NOT NULL,
	"model" text NOT NULL,
	"brand" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "vehicle_type_idx" ON "vehicle" ("vehicle_type");