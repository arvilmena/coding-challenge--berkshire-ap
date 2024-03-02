/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { myTsRestContract } from '@mycodingchallenge/core';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { generateOpenApi } from '@ts-rest/open-api';
import { AppModule } from './app/app.module';
import { openApiConfig, openApiOptions } from './constants/openApi';
import { port } from './constants/port';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = generateOpenApi(
    myTsRestContract,
    openApiConfig,
    openApiOptions
  );
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
