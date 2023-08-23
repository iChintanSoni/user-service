import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  APP_HOST,
  APP_PORT,
  ROLE_SERVICE_PORT,
  USER_SERVICE_PORT,
} from './config';
import { INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NextFunction } from 'express';
import * as fs from 'fs';

const microServicePorts = [USER_SERVICE_PORT, ROLE_SERVICE_PORT];

const startAllMicroServices = async (app: INestApplication) => {
  microServicePorts.forEach((element) => {
    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        retryAttempts: 5,
        retryDelay: 3000,
        host: APP_HOST,
        port: element,
      },
    });
  });
  await app.startAllMicroservices();
};

const enableCors = (app: INestApplication) => {
  app.enableCors();
};

const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('Manages users, roles')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
};

const setupGlobalDelay = (app: INestApplication) => {
  const delay = (milliseconds: number): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), milliseconds);
    });
  };
  const delayMiddleware = async (
    _req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    await delay(1000);
    return next();
  };
  app.use(delayMiddleware);
};

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./.cert/key.pem'),
    cert: fs.readFileSync('./.cert/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsOptions,
  });
  await startAllMicroServices(app);
  enableCors(app);
  setupSwagger(app);
  setupGlobalDelay(app);
  await app.listen(APP_PORT);
}
bootstrap();
