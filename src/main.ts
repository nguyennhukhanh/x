import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('X');

  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('main.apiPrefix'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Firebase
  admin.initializeApp(configService.get('firebase'));

  setupSwagger(app);

  await app.listen(configService.get('main.port'));

  logger.log(`App is running on ${configService.get('main.port')} port!`);
}
bootstrap();
