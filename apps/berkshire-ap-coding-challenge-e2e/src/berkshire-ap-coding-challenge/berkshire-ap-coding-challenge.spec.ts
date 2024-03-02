/* eslint-disable no-empty */
import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

const vehicleType = ['car', 'motorcycle'] as const;
const expectedSchema = z.object({
  id: z.number().int(),
  model: z.string().min(1),
  brand: z.string().min(1),
  ownerName: z.string().min(1),
  vehicleType: z.enum(vehicleType),
});

describe('GET /vehicles', () => {
  it('should always 200 and never return an error', async () => {
    const res = await axios.get(`/vehicles`);

    expect(res.status).toBe(200);
    expect(expectedSchema.array().safeParse(res.data)).toBeTruthy();
  });
});

describe('Successful complete CRUD', () => {
  it('can get all, create a new one, find the created, confirm 1 is added, delete it, and confirm it is deleted by expecting 404 when tried to find again', async () => {
    // get the amount of the initial GET ALL request
    const {
      data: { length: _initialAmount },
    } = await axios.get(`/vehicles`);

    // confirm the obtained length is number
    const initialAmount = z.number().parse(_initialAmount);

    // create a new car
    const carPayload = {
      brand: 'BMW',
      model: 'BMW',
      ownerName: 'John',
      vehicleType: 'car',
    };
    const createCarReq = await axios.post(`/vehicles`, carPayload);

    // confirm 201 status as per spec
    expect(createCarReq.status).toEqual(201);

    // confirm it was on a Vehicle Shape
    const createdCarVehicle = expectedSchema.parse(createCarReq.data);

    // Find the Vehicle via API
    const findReq = await axios.get(`/vehicles/${createdCarVehicle.id}`);

    // confirm 200 as per spec
    expect(findReq.status).toEqual(200);

    // confirm that the vehicle data from API is same as our created one
    expect(createdCarVehicle).toEqual(findReq.data);

    console.log(`created Car Id: ${createdCarVehicle.id}`);

    // query GET ALL to confirm that the total Vehicles in API increased by 1
    const {
      data: { length: amountAfterCarCreated },
    } = await axios.get(`/vehicles`);
    expect(amountAfterCarCreated).toEqual(initialAmount + 1);

    // update Vehicle to change name and confirm 200 status code
    const updatedCarPayload = {
      ...carPayload,
      ownerName: 'John Doe',
    };
    let updateCarReq: AxiosResponse | null = null;
    updateCarReq = await axios.put(
      `/vehicles/${createdCarVehicle.id}`,
      updatedCarPayload
    );
    expect(updateCarReq?.status).toEqual(200);

    // lookup the same car with this id and confirm that the name was updated
    const lookupCardAfterUpdateReq = await axios.get(
      `/vehicles/${createdCarVehicle.id}`
    );
    expect(lookupCardAfterUpdateReq.data).toEqual({
      ...updatedCarPayload,
      id: createdCarVehicle.id,
    });
    expect(lookupCardAfterUpdateReq.data.ownerName).toEqual('John Doe');

    // delete the created Card and confirm status code 204 (no content)
    const deleteCarReq = await axios.delete(
      `/vehicles/${createdCarVehicle.id}`
    );
    expect(deleteCarReq.status).toEqual(204);

    // query the same vehicle by ID to confirm 404
    let relookupCar: AxiosResponse | null = null;
    try {
      relookupCar = await axios.get(`/vehicles/${createdCarVehicle.id}`, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(relookupCar?.status).toEqual(404);

    // query GET ALL to confirm that the total Vehicles is the same as to when we started
    const {
      data: { length: amountAfterDeletingCar },
    } = await axios.get(`/vehicles`);
    expect(amountAfterDeletingCar).toEqual(initialAmount);
  });
});

describe('Successful Motorcycle Create and Delete', () => {
  it('Create a new Motorcycle, find the created and delete', async () => {
    // create a new motor
    const motorcyclePayload = {
      brand: 'Yamaha',
      model: 'Mio i-125s',
      ownerName: 'John Doe',
      vehicleType: 'motorcycle',
    };
    const motorcycleCreateReq = await axios.post(
      `/vehicles`,
      motorcyclePayload
    );

    // confirm 201 status as per spec
    expect(motorcycleCreateReq.status).toEqual(201);

    // confirm it was on a Vehicle Shape
    const createdMotorcycleVehicle = expectedSchema.parse(
      motorcycleCreateReq.data
    );

    // Find the Vehicle via API
    const findReq = await axios.get(`/vehicles/${createdMotorcycleVehicle.id}`);

    // confirm 200 as per spec
    expect(findReq.status).toEqual(200);

    // confirm that the vehicle data from API is same as our created one
    expect(createdMotorcycleVehicle).toEqual(findReq.data);

    console.log(`created Motorcycle Id: ${createdMotorcycleVehicle.id}`);

    // delete the created Card and confirm status code 204 (no content)
    const deleteMotorcycleReq = await axios.delete(
      `/vehicles/${createdMotorcycleVehicle.id}`
    );
    expect(deleteMotorcycleReq.status).toEqual(204);

    // query the same vehicle by ID to confirm 404
    let relookupMotorcycle: AxiosResponse | null = null;
    try {
      relookupMotorcycle = await axios.get(
        `/vehicles/${createdMotorcycleVehicle.id}`,
        {
          validateStatus: function (status) {
            return status < 500;
          },
        }
      );
    } catch (error) {}
    expect(relookupMotorcycle?.status).toEqual(404);
  });
});

describe('Errors', () => {
  it('should error when there is no payload', async () => {
    const payload = undefined;
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });

  it('should error when no model param', async () => {
    const payload = {
      brand: 'BMW',
      ownerName: 'John',
      vehicleType: 'car',
    };
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });

  it('should error when no brand param', async () => {
    const payload = {
      model: 'BMW',
      ownerName: 'John',
      vehicleType: 'car',
    };
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });

  it('should error when no ownerName param', async () => {
    const payload = {
      model: 'BMW',
      brand: 'BMW',
      vehicleType: 'car',
    };
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });

  it('should error when no vehicleType param', async () => {
    const payload = {
      brand: 'BMW',
      model: 'BMW',
      ownerName: 'John',
    };
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });

  it('should error when not a valid vehicleType param', async () => {
    const payload = {
      brand: 'BMW',
      model: 'BMW',
      ownerName: 'John',
      vehicleType: 'NOT_VEHICLE',
    };
    let res: AxiosResponse | null = null;
    try {
      res = await axios.post(`/vehicles`, payload, {
        validateStatus: function (status) {
          return status < 500;
        },
      });
    } catch (error) {}
    expect(res?.status).toEqual(400);
  });
});
