import { myTsRestContract, vehicleRepository } from '@mycodingchallenge/core';
import { Controller, Get } from '@nestjs/common';
import {
  TsRestHandler,
  nestControllerContract,
  tsRestHandler,
} from '@ts-rest/nest';
import { generateOpenApi } from '@ts-rest/open-api';
import { openApiConfig, openApiOptions } from '../constants/openApi';
const c = nestControllerContract(myTsRestContract);

@Controller()
export class AppController {
  @TsRestHandler(c, { validateResponses: true })
  async handler() {
    return tsRestHandler(c, {
      getVehicles: async () => {
        const vehicles = await vehicleRepository.findAll();

        if (!vehicles) {
          return { status: 404, body: null };
        }

        return { status: 200 as const, body: vehicles };
      },
      getVehicleById: async ({ params: { id } }) => {
        const vehicle = await vehicleRepository.findById(+id);

        if (!vehicle) {
          return { status: 404, body: null };
        }
        return { status: 200, body: vehicle };
      },
      createVehicle: async ({ body }) => {
        const vehicle = await vehicleRepository.insert(body);

        if (!vehicle) {
          return { status: 404, body: null };
        }
        return { status: 201, body: vehicle };
      },
      updateVehicleById: async ({ params: { id }, body }) => {
        const vehicle = await vehicleRepository.updateById(+id, body);

        if (!vehicle) {
          return { status: 404, body: null };
        }
        return { status: 200, body: vehicle };
      },
      deleteVehicleById: async ({ params: { id } }) => {
        await vehicleRepository.deleteById(+id);
        return { status: 204, body: null };
      },
    });
  }

  @Get('/open-api')
  async openApi() {
    return generateOpenApi(myTsRestContract, openApiConfig, openApiOptions);
  }
}
