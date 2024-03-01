import {
  CarRepository,
  MotorcycleRepository,
  VehicleRepository,
} from '@mycodingchallenge/repository';

const vehicleRepository = new VehicleRepository();
const carRepository = new CarRepository();
const motorcycleRepository = new MotorcycleRepository();

export { carRepository, motorcycleRepository, vehicleRepository };
