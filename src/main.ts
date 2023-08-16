import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT, USER_SERVICE_HOST, USER_SERVICE_PORT } from './config';
import { INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

type MicroService = {
  host: string;
  port: number;
};

const microservices: MicroService[] = [
  {
    host: USER_SERVICE_HOST,
    port: USER_SERVICE_PORT as unknown as number,
  },
];

const connectMicroservices = async (app: INestApplication) => {
  microservices.forEach((element) => {
    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        retryAttempts: 5,
        retryDelay: 3000,
        host: element.host,
        port: element.port,
      },
    });
  });
  await app.startAllMicroservices();
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
    await delay(1500);
    return next();
  };
  app.use(delayMiddleware);
};

const setupCors = (app: INestApplication) => {
  app.enableCors();
};

const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('User Service Api Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectMicroservices(app);
  setupGlobalDelay(app);
  setupCors(app);
  setupSwagger(app);
  await app.listen(APP_PORT);
}
bootstrap();
