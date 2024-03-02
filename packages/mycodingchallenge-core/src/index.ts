import {
  CarRepository,
  MotorcycleRepository,
  VehicleRepository,
} from '@mycodingchallenge/repository';
import { myTsRestContract } from './ts-rest/myTsRestContract';

const vehicleRepository = new VehicleRepository();
const carRepository = new CarRepository();
const motorcycleRepository = new MotorcycleRepository();

export {
  carRepository,
  motorcycleRepository,
  myTsRestContract,
  vehicleRepository,
};
