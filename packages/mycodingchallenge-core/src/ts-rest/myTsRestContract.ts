import { extendZodWithOpenApi } from '@anatine/zod-openapi';
import {
  insertVehicleSchema,
  vehicleSelectSchema,
} from '@mycodingchallenge/repository';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

extendZodWithOpenApi(z);
const c = initContract();

export const myTsRestContract = c.router({
  getVehicles: {
    method: 'GET',
    path: `/vehicles`,
    responses: {
      200: vehicleSelectSchema.array().openapi({
        title: 'Vehicles',
        description: 'All vehicles',
      }),
    },
    description:
      'Retrieve all vehicles. Should never error. If empty, returns a empty array, otherwise an array of Vehicle objects.',
    summary: 'Retrieve all vehicles.',
  },
  getVehicleById: {
    method: 'GET',
    path: `/vehicles/:id`,
    pathParams: z.object({
      id: z.coerce.number().openapi({
        description: "The vehicle's ID",
      }),
    }),
    responses: {
      200: vehicleSelectSchema.nullable(),
      404: z.null().openapi({
        title: '404 Error',
        description: 'Vehicle with the supplied ID is not found.',
      }),
    },
    description:
      'Retrieve a specific vehicle by ID. If found, return the vehicle, otherwise return 404.',
    summary: 'Retrieve a specific vehicle by ID.',
  },
  createVehicle: {
    method: 'POST',
    path: '/vehicles',
    responses: {
      201: vehicleSelectSchema,
      400: z.undefined().openapi({
        title: 'Bad Request',
        description:
          'The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.',
      }),
    },
    body: insertVehicleSchema,
    description:
      'Create a new vehicle. Returns 201 (created) if successful and the Vehicle content.',
    summary: 'Create a new vehicle',
  },
  updateVehicleById: {
    method: 'PUT',
    path: '/vehicles/:id',
    pathParams: z.object({
      id: z.coerce.number().openapi({
        description: "The vehicle's ID",
      }),
    }),
    responses: {
      200: vehicleSelectSchema,
    },
    body: insertVehicleSchema,
    description:
      'Update an existing vehicle by ID. Will always return 204 (no content).',
    summary: 'Update an existing vehicle by ID.',
  },
  deleteVehicleById: {
    method: 'DELETE',
    path: '/vehicles/:id',
    pathParams: z.object({
      id: z.coerce.number().openapi({
        description: "The vehicle's ID",
      }),
    }),
    responses: {
      204: z.null(),
    },
    body: z.any().optional(),
    description: 'Delete a vehicle by ID. Always return 204 (no content).',
    summary: 'Delete a vehicle by ID.',
  },
});
