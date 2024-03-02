import { faker } from '@faker-js/faker';
import { carRepository } from '@mycodingchallenge/core';
import 'dotenv/config';
import pLimit from 'p-limit';
import { carData } from './carData';
import { motorcycleData } from './motorcycleData';

// import { type Car, type Motorcycle } from '@mycodingchallenge/repository';
// type Vehicle = Car | Motorcycle;
// const polymorphicTest = (vehicle: Vehicle): Vehicle => {
//   switch (vehicle.vehicleType) {
//     case 'car':
//       return vehicle;
//     case 'motorcycle':
//       return vehicle;
//     default:
//       throw new Error('Invalid vehicle type');
//   }
// };

function seed() {
  const carSeedLimit = pLimit(10);

  const carsPromise = Promise.all(
    carData.map((car) =>
      carSeedLimit(() =>
        carRepository.insert({
          ...car,
          ownerName: faker.person.fullName(),
        })
      )
    )
  );

  const motorCycleSeed = motorcycleData
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [brand, model] = line.split('\t');
      return {
        brand,
        model,
      };
    });

  const motorCycleSeedLimit = pLimit(10);

  const motorcyclesPromise = Promise.all(
    motorCycleSeed.map((motorcycle) =>
      motorCycleSeedLimit(() =>
        carRepository.insert({
          ...motorcycle,
          ownerName: faker.person.fullName(),
        })
      )
    )
  );

  return Promise.all([carsPromise, motorcyclesPromise])
    .then(([cars, motorcycles]) => {
      return {
        cars,
        motorcycles,
      };
    })
    .catch((error) => {
      console.error('Error during seeding:', error);
      throw error;
    });
}

seed()
  .then((data) => {
    console.log('Seed successful');
    return data;
  })
  .catch((error) => {
    throw error;
  });
