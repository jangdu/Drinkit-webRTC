import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { redis } from './redis';
import { HttpExceptionFilter } from './common/exceptions/http.exceptions.filter';
import { urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Redis
  redis.init();

  await app.listen(8080);
}
bootstrap();
